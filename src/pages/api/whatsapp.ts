export const prerender = false;

import type { APIRoute } from 'astro';

const WHATSAPP_API_VERSION = 'v22.0';

// ---------------------------------------------------------------------------
// Antispam — rate limiting en memòria
// Funciona perfectament en mode Node standalone.
// En entorns serverless (Vercel, Netlify Edge) la memòria no és persistent
// entre invocacions fredes, però el camp honeypot segueix protegint.
// ---------------------------------------------------------------------------

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// Per telèfon: màxim 1 WhatsApp per número cada 24 hores
const phoneRateMap = new Map<string, RateLimitEntry>();
const PHONE_MAX = 1;
const PHONE_WINDOW_MS = 24 * 60 * 60 * 1000; // 24h

// Per IP: màxim 5 peticions per hora
const ipRateMap = new Map<string, RateLimitEntry>();
const IP_MAX = 25;
const IP_WINDOW_MS = 60 * 60 * 1000; // 1h

function checkRateLimit(map: Map<string, RateLimitEntry>, key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = map.get(key);

  if (!entry || now > entry.resetAt) {
    map.set(key, { count: 1, resetAt: now + windowMs });
    return true; // permès
  }

  if (entry.count >= max) {
    return false; // bloquejat
  }

  entry.count++;
  return true; // permès
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatSpanishPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '');
  // Ja inclou prefix internacional (34 + 9 dígits = 11 caràcters)
  if (digits.startsWith('34') && digits.length === 11) return digits;
  // 9 dígits espanyols (mòbils 6xx/7xx, fixos 8xx/9xx)
  if (digits.length === 9 && /^[6789]/.test(digits)) return `34${digits}`;
  return null;
}

function getClientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  );
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export const POST: APIRoute = async ({ request }) => {
  // 1. Validar Content-Type
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid content type' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 2. Parsejar body
  let body: { phone?: unknown; lang?: unknown; _hp?: unknown };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 3. Honeypot — el camp _hp ha d'arribar buit.
  //    Els bots ompleran tots els camps; els humans no veuen aquest camp.
  if (body._hp !== '' && body._hp !== undefined) {
    // Resposta 200 falsa per no alertar el bot
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 4. Validar i formatar telèfon
  const rawPhone = typeof body.phone === 'string' ? body.phone : '';
  const lang = typeof body.lang === 'string' ? body.lang : 'ca';

  const phone = formatSpanishPhone(rawPhone);
  if (!phone) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid phone number' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 5. Rate limit per IP
  const ip = getClientIp(request);
  if (!checkRateLimit(ipRateMap, ip, IP_MAX, IP_WINDOW_MS)) {
    return new Response(JSON.stringify({ ok: false, error: 'Too many requests' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json', 'Retry-After': '3600' },
    });
  }

  // 6. Rate limit per telèfon (evita enviar 2 WhatsApps al mateix número)
  if (!checkRateLimit(phoneRateMap, phone, PHONE_MAX, PHONE_WINDOW_MS)) {
    // Retornem 200 per no confondre l'usuari — el lead ja estava registrat
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 7. Llegir credencials privades (mai arriben al client)
  const token = import.meta.env.WHATSAPP_TOKEN;
  const phoneNumberId = import.meta.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    console.error('[whatsapp] Falten les variables WHATSAPP_TOKEN o WHATSAPP_PHONE_NUMBER_ID');
    return new Response(JSON.stringify({ ok: false, error: 'Server configuration error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 8. Seleccionar plantilla per idioma
  // Noms han de coincidir exactament amb els creats al Meta dashboard
  const templateName = lang === 'es' ? 'welcome_lead' : 'benvinguda_lead';
  const templateLanguage = lang === 'es' ? 'es' : 'ca';

  // 9. Crida a Meta WhatsApp Cloud API
  const apiUrl = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${phoneNumberId}/messages`;

  let metaResponse: Response;
  try {
    metaResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: phone,
        type: 'template',
        template: {
          name: templateName,
          language: { code: templateLanguage },
        },
      }),
    });
  } catch (err) {
    console.error('[whatsapp] Error de xarxa cridant Meta API:', err);
    return new Response(JSON.stringify({ ok: false, error: 'Network error' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!metaResponse.ok) {
    const errBody = await metaResponse.text();
    console.error('[whatsapp] Error de Meta API:', metaResponse.status, errBody);
    return new Response(JSON.stringify({ ok: false, error: 'WhatsApp API error' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
