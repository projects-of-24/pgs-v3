import { countryToDetail, type CountryDraft } from "@/features/admin-cms/country-preview-map";
import { getSupabasePublicConfig } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  getCountryContent,
  isCountrySlug,
  USA_CONTENT,
  type CountrySlug,
} from "@/features/countries/content";
import {
  COUNTRY_HERO_FIGMA_USA_DEFAULTS,
  type CountryHeroFigmaImages,
} from "@/features/countries/country-hero-figma";

/** Public App Router paths → countries.slug (junior CMS). */
export const PUBLIC_ROUTE_TO_COUNTRY_SLUG = {
  countriesusa: "usa",
  countriesuk: "uk",
  countriesaus: "aus",
  countriescanada: "canada",
  countrieseurope: "europe",
  countriesfrance: "france",
  countriesgermany: "germany",
  countriesmauritius: "mauritius",
  countriesnz: "nz",
  countriesothers: "others",
} as const satisfies Record<string, CountrySlug>;

export type PublicCountryRoute = keyof typeof PUBLIC_ROUTE_TO_COUNTRY_SLUG;

export const COUNTRY_SLUG_TO_PUBLIC_ROUTE = Object.fromEntries(
  Object.entries(PUBLIC_ROUTE_TO_COUNTRY_SLUG).map(([route, slug]) => [slug, route]),
) as Record<CountrySlug, PublicCountryRoute>;

export type CountryHeroImages = {
  flagImage: string;
  desktopImage: string;
  mobileImage: string;
  /** Right badge — modular Figma hero only; optional until CMS slot exists */
  badgeImage?: string;
};

export function countrySlugFromPublicRoute(route: string): CountrySlug | null {
  const slug = PUBLIC_ROUTE_TO_COUNTRY_SLUG[route as PublicCountryRoute];
  return slug && isCountrySlug(slug) ? slug : null;
}

export function defaultCountryHeroImages(slug: CountrySlug | null): CountryHeroImages {
  const content = slug ? getCountryContent(slug) : null;
  const hero = content?.hero ?? USA_CONTENT.hero;
  return {
    flagImage: hero.flagImage,
    desktopImage: hero.desktopImage,
    mobileImage: hero.mobileImage,
  };
}

/** Resolve hero URLs from a countries row (published or draft preview shape). */
export function resolveCountryHeroFromRow(
  row: CountryDraft | null | undefined,
  slug: CountrySlug,
): CountryHeroImages {
  const defaults = defaultCountryHeroImages(slug);
  if (!row) return defaults;

  const template = getCountryContent(slug) ?? USA_CONTENT;
  const rawContent = row.page_content;
  const pageContent =
    rawContent && typeof rawContent === "object" && !Array.isArray(rawContent)
      ? {
          ...template,
          ...rawContent,
          hero: {
            ...template.hero,
            ...((rawContent as { hero?: Partial<CountryHeroImages> }).hero ?? {}),
          },
        }
      : template;

  const detail = countryToDetail({
    ...row,
    slug,
    name: typeof row.name === "string" && row.name.trim() ? row.name : template.name,
    page_content: pageContent,
  });

  return {
    flagImage: detail.hero.flagImage || defaults.flagImage,
    desktopImage: detail.hero.desktopImage || defaults.desktopImage,
    mobileImage: detail.hero.mobileImage || defaults.mobileImage,
  };
}

/** Published countries-table hero for a public route (e.g. countriesuk → uk). */
export async function getPublishedCountryHero(route: string): Promise<CountryHeroImages> {
  const slug = countrySlugFromPublicRoute(route);
  const defaults = defaultCountryHeroImages(slug);
  if (!slug) return defaults;

  // Public destinations must render fixture/Figma defaults when Auth/CMS env is absent (e.g. CI smoke).
  if (!getSupabasePublicConfig()) return defaults;

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("countries")
    .select("name, slug, page_content, published")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error || !data) return defaults;

  return resolveCountryHeroFromRow(data as CountryDraft, slug);
}

/**
 * Modular Figma hero images for live country body modules.
 * Defaults = Figma USA pack; CMS overlays when published hero URLs exist.
 */
export function toCountryHeroFigmaImages(
  hero: CountryHeroImages,
  destinationName?: string,
): CountryHeroFigmaImages {
  const defaults = COUNTRY_HERO_FIGMA_USA_DEFAULTS;
  return {
    desktopImage: hero.desktopImage || defaults.desktopImage,
    mobileImage: hero.mobileImage || defaults.mobileImage,
    flagImage: hero.flagImage || defaults.flagImage,
    badgeImage: hero.badgeImage || defaults.badgeImage,
    destinationName: destinationName ?? defaults.destinationName,
  };
}

/** Published CMS hero shaped for `CountryHeroFigma` (badge falls back to Figma default). */
export async function getPublishedCountryHeroFigma(
  route: string,
  destinationName?: string,
): Promise<CountryHeroFigmaImages> {
  const hero = await getPublishedCountryHero(route);
  const defaults = COUNTRY_HERO_FIGMA_USA_DEFAULTS;

  // Prefer modular pack when CMS still returns legacy Hostinger placeholder paths.
  const legacyDefaults = defaultCountryHeroImages(countrySlugFromPublicRoute(route));
  const pickModularImage = (cms: string, legacy: string, modular: string) =>
    !cms || cms === legacy ? modular : cms;

  return {
    desktopImage: pickModularImage(hero.desktopImage, legacyDefaults.desktopImage, defaults.desktopImage),
    mobileImage: pickModularImage(hero.mobileImage, legacyDefaults.mobileImage, defaults.mobileImage),
    flagImage: pickModularImage(hero.flagImage, legacyDefaults.flagImage, defaults.flagImage),
    badgeImage: hero.badgeImage || defaults.badgeImage,
    destinationName: destinationName ?? defaults.destinationName,
  };
}
