import type { Lang } from './translations';

/**
 * Explicit CA ↔ ES route pairs.
 *
 * hreflang must never be derived by string manipulation. The slugs are
 * translated, so appending '/es' to '/graduacions-eso' yields
 * '/es/graduacions-eso' — a URL that does not exist and returns 404.
 * Every pair is declared by hand. A route missing from this map emits no
 * hreflang at all, which is always better than emitting a broken one.
 *
 * Only the blog *index* is listed. Individual posts cannot be: their slugs are
 * authored per locale in Strapi, so each post page resolves its own pair from
 * the article's `localizations` and passes it to <SEO> as `alternatePath`.
 */
const ROUTE_PAIRS: ReadonlyArray<readonly [ca: string, es: string]> = [
  ['/', '/es/'],
  ['/privacitat/', '/es/privacidad/'],
  ['/blog/', '/es/blog/'],
  ['/graduacions-eso/', '/es/graduaciones-eso/'],
  ['/graduacions-batxillerat/', '/es/graduaciones-bachillerato/'],
  ['/graduacions-universitat/', '/es/graduaciones-universidad/'],
  ['/graduacions-barcelona/', '/es/graduaciones-barcelona/'],
  ['/graduacions-girona/', '/es/graduaciones-girona/'],
];

/**
 * Canonical URL shape for the whole site: always a trailing slash.
 * Internal links, canonical tags and hreflang must all agree on this,
 * otherwise crawlers treat '/blog' and '/blog/' as two competing URLs.
 */
export function withTrailingSlash(path: string): string {
  return path.endsWith('/') ? path : `${path}/`;
}

/** Counterpart path in the other language, or null when the pair is unknown. */
export function getAlternatePath(path: string, lang: Lang): string | null {
  const current = withTrailingSlash(path);
  for (const [ca, es] of ROUTE_PAIRS) {
    if (lang === 'ca' && ca === current) return es;
    if (lang === 'es' && es === current) return ca;
  }
  return null;
}
