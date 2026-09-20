/**
 * Modular country hero + badge strip — Figma V6 USA nodes only.
 *
 * Live: `/countriesuk` via `buildCountryHeroFigmaHtml()` (one HTML document).
 * Preview: `/preview/country-hero-figma-canada` uses `<CountryHeroFigma />`.
 * Nodes: desktop 18753:11539+11562 · iPad 18753:11835+11837 · mobile 18753:12020+12022
 * Badges = two separate images (flag + graduation thumb), not one composite.
 * iPad reuses desktop hero; CSS covers 716×194.
 */
import "./country-hero-figma-canada.css";

export type CountryHeroFigmaImages = {
  /** Landscape banner — desktop + iPad */
  desktopImage: string;
  /** Portrait banner — ≤600 only */
  mobileImage: string;
  /** Left badge — destination flag */
  flagImage: string;
  /** Right badge — small rounded photo (Figma: graduation) */
  badgeImage: string;
  destinationName?: string;
};

export const COUNTRY_HERO_FIGMA_USA_DEFAULTS: CountryHeroFigmaImages = {
  desktopImage: "/assets/img/countries/usa/hero-desktop.jpg",
  mobileImage: "/assets/img/countries/usa/hero-mobile.png",
  flagImage: "/assets/img/countries/usa/badge-us-flag.png",
  badgeImage: "/assets/img/countries/usa/badge-graduation.jpg",
  destinationName: "Study in the USA",
};

type CountryHeroFigmaProps = {
  images?: Partial<CountryHeroFigmaImages>;
};

function resolveHeroImages(images?: Partial<CountryHeroFigmaImages>): CountryHeroFigmaImages {
  return { ...COUNTRY_HERO_FIGMA_USA_DEFAULTS, ...images };
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

/** HTML string for live country routes (LegacyPage single-document compose). */
export function buildCountryHeroFigmaHtml(images?: Partial<CountryHeroFigmaImages>): string {
  const src = resolveHeroImages(images);
  const alt = escapeAttr(src.destinationName ?? "Study destination");
  const flagImage = escapeAttr(src.flagImage);
  const badgeImage = escapeAttr(src.badgeImage);
  const desktopImage = escapeAttr(src.desktopImage);
  const mobileImage = escapeAttr(src.mobileImage);

  return `<div class="country-hero-figma-canada" data-pgs-module="country-hero-figma-canada" role="region" aria-label="${alt} hero">
  <div class="country-hero-figma-canada__stack">
    <div class="country-hero-figma-canada__badges" aria-hidden="true">
      <img class="country-hero-figma-canada__flag" src="${flagImage}" alt="" width="46" height="24" decoding="async">
      <img class="country-hero-figma-canada__badge" src="${badgeImage}" alt="" width="62" height="42" decoding="async">
    </div>
    <div class="country-hero-figma-canada__banner">
      <img class="country-hero-figma-canada__hero country-hero-figma-canada__hero--desktop" src="${desktopImage}" alt="${alt}" width="1366" height="303" decoding="async">
      <img class="country-hero-figma-canada__hero country-hero-figma-canada__hero--mobile" src="${mobileImage}" alt="${alt}" width="210" height="357" decoding="async">
    </div>
  </div>
</div>`;
}

export function CountryHeroFigma({ images }: CountryHeroFigmaProps) {
  const src = resolveHeroImages(images);
  const alt = src.destinationName ?? "Study destination";

  return (
    <div
      className="country-hero-figma-canada"
      data-pgs-module="country-hero-figma-canada"
      role="region"
      aria-label={`${alt} hero`}
    >
      <div className="country-hero-figma-canada__stack">
        <div className="country-hero-figma-canada__badges" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="country-hero-figma-canada__flag"
            src={src.flagImage}
            alt=""
            width={46}
            height={24}
            decoding="async"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="country-hero-figma-canada__badge"
            src={src.badgeImage}
            alt=""
            width={62}
            height={42}
            decoding="async"
          />
        </div>

        <div className="country-hero-figma-canada__banner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="country-hero-figma-canada__hero country-hero-figma-canada__hero--desktop"
            src={src.desktopImage}
            alt={alt}
            width={1366}
            height={303}
            decoding="async"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="country-hero-figma-canada__hero country-hero-figma-canada__hero--mobile"
            src={src.mobileImage}
            alt={alt}
            width={210}
            height={357}
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}
