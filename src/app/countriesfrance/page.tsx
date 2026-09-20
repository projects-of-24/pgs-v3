/**
 * /countriesfrance — own Photoshop file (@/features/countries-france).
 * Header and footer stay shared. Body edits here do not change the other countries.
 */
import { CountryBodyShell } from "@/features/countries-france/country-body-shell";
import { buildCountryHeroFigmaHtml } from "@/features/countries-france/country-hero-figma";
import { getCountryContent } from "@/features/countries-france/content";
import { composeCountryPublicPage } from "@/features/countries/compose-country-public-page";
import { cmsMetadata } from "@/lib/cms-metadata";

export async function generateMetadata() {
  return cmsMetadata("countriesfrance");
}

export const dynamic = "force-dynamic";

export default async function CountriesFrancePage() {
  return composeCountryPublicPage("countriesfrance", {
    Body: CountryBodyShell,
    getContent: getCountryContent,
    buildHero: buildCountryHeroFigmaHtml,
  });
}
