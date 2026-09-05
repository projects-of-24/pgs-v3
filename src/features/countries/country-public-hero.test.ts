import { describe, expect, it } from "vitest";
import { COUNTRY_HERO_FIGMA_USA_DEFAULTS } from "./country-hero-figma";
import {
  countrySlugFromPublicRoute,
  COUNTRY_SLUG_TO_PUBLIC_ROUTE,
  defaultCountryHeroImages,
  PUBLIC_ROUTE_TO_COUNTRY_SLUG,
  resolveCountryHeroFromRow,
  toCountryHeroFigmaImages,
} from "./country-public-hero";

describe("country-public-hero", () => {
  it("maps public routes to country slugs", () => {
    expect(countrySlugFromPublicRoute("countriesuk")).toBe("uk");
    expect(countrySlugFromPublicRoute("countriesusa")).toBe("usa");
    expect(countrySlugFromPublicRoute("unknown")).toBeNull();
  });

  it("round-trips slug to public route", () => {
    for (const [route, slug] of Object.entries(PUBLIC_ROUTE_TO_COUNTRY_SLUG)) {
      expect(COUNTRY_SLUG_TO_PUBLIC_ROUTE[slug]).toBe(route);
    }
  });

  it("uses page_content.hero when row is present", () => {
    const resolved = resolveCountryHeroFromRow(
      {
        slug: "uk",
        name: "UK",
        page_content: {
          slug: "uk",
          name: "UK",
          hero: {
            flagImage: "/cms/uk-flag.png",
            badgeImage: "/cms/uk-badge.jpg",
            desktopImage: "/cms/uk-hero-desktop.jpg",
            mobileImage: "/cms/uk-hero-mobile.jpg",
          },
        },
      },
      "uk",
    );
    expect(resolved.flagImage).toBe("/cms/uk-flag.png");
    expect(resolved.badgeImage).toBe("/cms/uk-badge.jpg");
    expect(resolved.desktopImage).toBe("/cms/uk-hero-desktop.jpg");
    expect(resolved.mobileImage).toBe("/cms/uk-hero-mobile.jpg");
  });

  it("falls back to template defaults when hero URLs are empty", () => {
    const defaults = defaultCountryHeroImages("uk");
    const resolved = resolveCountryHeroFromRow(
      {
        slug: "uk",
        name: "UK",
        page_content: {
          slug: "uk",
          name: "UK",
          hero: {
            flagImage: "",
            desktopImage: "",
            mobileImage: "",
          },
        },
      },
      "uk",
    );
    expect(resolved).toEqual(defaults);
  });

  it("maps hero rows to Figma module images with badge default", () => {
    const mapped = toCountryHeroFigmaImages(
      {
        flagImage: "/cms/uk-flag.png",
        desktopImage: "/cms/uk-desktop.jpg",
        mobileImage: "/cms/uk-mobile.jpg",
      },
      "Study in the UK",
    );
    expect(mapped.flagImage).toBe("/cms/uk-flag.png");
    expect(mapped.desktopImage).toBe("/cms/uk-desktop.jpg");
    expect(mapped.mobileImage).toBe("/cms/uk-mobile.jpg");
    expect(mapped.badgeImage).toBe(COUNTRY_HERO_FIGMA_USA_DEFAULTS.badgeImage);
    expect(mapped.destinationName).toBe("Study in the UK");
  });

  it("passes CMS badge through to Figma module images", () => {
    const mapped = toCountryHeroFigmaImages(
      {
        flagImage: "/cms/uk-flag.png",
        badgeImage: "/cms/uk-grad.jpg",
        desktopImage: "/cms/uk-desktop.jpg",
        mobileImage: "/cms/uk-mobile.jpg",
      },
      "Study in the UK",
    );
    expect(mapped.badgeImage).toBe("/cms/uk-grad.jpg");
  });
});
