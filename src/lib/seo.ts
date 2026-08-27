/**
 * Title composition for <title> tags.
 *
 * Search engines truncate the displayed title around 60 characters. The blog
 * used to append ' — Blog Graduacions.cat' (25 chars) to every article title,
 * which pushed all 12 posts past that limit on its own.
 *
 * The brand suffix is therefore optional: it is appended only when the result
 * still fits. The article title itself is never cut — Google indexes the whole
 * <title> element and only the *display* is clipped, so amputating it would
 * drop indexable keywords in exchange for a cosmetic win. Titles that exceed
 * the budget by themselves are a content problem, to be solved in the CMS.
 */

const TITLE_MAX_LENGTH = 60;

const BRAND_SUFFIX = 'Graduacions.cat';

/**
 * Returns `base` with the brand suffix appended, or `base` alone when the
 * combined string would exceed the display budget.
 */
export function buildPageTitle(base: string, suffix: string = BRAND_SUFFIX): string {
  const withSuffix = `${base} | ${suffix}`;
  return withSuffix.length <= TITLE_MAX_LENGTH ? withSuffix : base;
}
