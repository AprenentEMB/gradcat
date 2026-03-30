/**
 * Strapi REST API client
 *
 * Usage:
 *   import { fetchStrapi } from '@/lib/strapi';
 *   const data = await fetchStrapi<ArticleListResponse>('/articles?populate=coverImage');
 *
 * Compatible with Strapi v5 (flat attributes).
 * For Strapi v4 each item has an `attributes` wrapper — adjust StrapiItem accordingly.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface StrapiImage {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

// Strapi Blocks format — each block is a paragraph, heading, list, etc.
export interface StrapiBlock {
  type: string;
  children: { type: string; text: string }[];
}

export interface Article {
  id: number;
  documentId: string; // Strapi v5 unique identifier
  title: string;
  slug: string;
  description: string;       // the field is "description" in Strapi, not "excerpt"
  content: StrapiBlock[];    // Rich text (Blocks) — array of block objects
  image: StrapiImage | null;
  publishedAt: string;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

// ─── Client ──────────────────────────────────────────────────────────────────

// PUBLIC_STRAPI_URL is safe to expose; STRAPI_TOKEN stays server-only.
const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = import.meta.env.STRAPI_TOKEN;

/**
 * Fetches any Strapi REST endpoint.
 * @param path  Path after /api, e.g. '/articles?populate=coverImage'
 */
export async function fetchStrapi<T>(path: string): Promise<T> {
  if (!STRAPI_URL) throw new Error('PUBLIC_STRAPI_URL is not defined in .env');
  if (!STRAPI_TOKEN) throw new Error('STRAPI_TOKEN is not defined in .env');

  const url = `${STRAPI_URL}/api${path}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Strapi request failed [${res.status}]: ${url}`);
  }

  return res.json() as Promise<T>;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Returns the full absolute URL for a Strapi media file.
 * Strapi v5 returns relative paths (/uploads/...) for local provider.
 */
export function getStrapiMediaUrl(url: string): string {
  if (url.startsWith('http')) return url; // already absolute (e.g. Cloudinary)
  return `${STRAPI_URL}${url}`;
}

/**
 * Converts Strapi Blocks (Rich text v2) to an HTML string.
 * Handles the most common block types: paragraph, headings, lists, quotes, code.
 * Use with Astro's `set:html` directive — content comes from your own CMS so it's trusted.
 */
export function blocksToHtml(blocks: StrapiBlock[]): string {
  return blocks.map((block) => {
    const inner = renderChildren(block.children);

    switch (block.type) {
      case 'paragraph':
        return `<p>${inner}</p>`;
      case 'heading': {
        const lvl = (block as any).level ?? 2;
        return `<h${lvl}>${inner}</h${lvl}>`;
      }
      case 'list': {
        const tag = (block as any).format === 'ordered' ? 'ol' : 'ul';
        const items = ((block as any).children as any[])
          .map((item: any) => `<li>${renderChildren(item.children)}</li>`)
          .join('');
        return `<${tag}>${items}</${tag}>`;
      }
      case 'quote':
        return `<blockquote>${inner}</blockquote>`;
      case 'code':
        return `<pre><code>${inner}</code></pre>`;
      case 'image': {
        const img = (block as any).image;
        if (!img) return '';
        const src = getStrapiMediaUrl(img.url);
        const alt = img.alternativeText ?? '';
        return `<img src="${src}" alt="${alt}" loading="lazy" />`;
      }
      default:
        return `<p>${inner}</p>`;
    }
  }).join('\n');
}

function renderChildren(children: { type: string; text?: string; bold?: boolean; italic?: boolean; underline?: boolean; strikethrough?: boolean; code?: boolean; url?: string; children?: any[] }[]): string {
  return children.map((node) => {
    if (node.type === 'link') {
      const href = node.url ?? '#';
      const label = renderChildren(node.children ?? []);
      return `<a href="${href}">${label}</a>`;
    }
    let text = escapeHtml(node.text ?? '');
    if (node.bold)          text = `<strong>${text}</strong>`;
    if (node.italic)        text = `<em>${text}</em>`;
    if (node.underline)     text = `<u>${text}</u>`;
    if (node.strikethrough) text = `<s>${text}</s>`;
    if (node.code)          text = `<code>${text}</code>`;
    return text;
  }).join('');
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
