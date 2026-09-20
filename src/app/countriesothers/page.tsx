/**
 * /countriesothers — own Photoshop file (@/features/countries-others).
 * Header and footer stay shared. Body edits here do not change the other countries.
 */
import { CountryBodyShell } from "@/features/countries-others/country-body-shell";
import { buildCountryHeroFigmaHtml } from "@/features/countries-others/country-hero-figma";
import { getCountryContent } from "@/features/countries-others/content";
import { composeCountryPublicPage } from "@/features/countries/compose-country-public-page";
import { cmsMetadata } from "@/lib/cms-metadata";

export async function generateMetadata() {
  return cmsMetadata("countriesothers");
}

export const dynamic = "force-dynamic";

export default async function CountriesOthersPage() {
  return composeCountryPublicPage("countriesothers", {
    Body: CountryBodyShell,
    getContent: getCountryContent,
    buildHero: buildCountryHeroFigmaHtml,
  });
}
