/**
 * Helper client per notificar l'API route de WhatsApp.
 * Fire-and-forget: mai llança, sempre resol.
 * @returns true si el servidor ha confirmat l'enviament, false en qualsevol error.
 */
export async function notifyWhatsApp(phone: string, lang: string, honeypot: string = ''): Promise<boolean> {
  try {
    const res = await fetch('/api/whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, lang, _hp: honeypot }),
    });
    if (!res.ok) return false;
    const data: { ok?: boolean } = await res.json();
    return data.ok === true;
  } catch {
    return false;
  }
}
