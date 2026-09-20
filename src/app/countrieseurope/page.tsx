/**
 * /countrieseurope — own Photoshop file (@/features/countries-europe).
 * Header and footer stay shared. Body edits here do not change the other countries.
 */
import { CountryBodyShell } from "@/features/countries-europe/country-body-shell";
import { buildCountryHeroFigmaHtml } from "@/features/countries-europe/country-hero-figma";
import { getCountryContent } from "@/features/countries-europe/content";
import { composeCountryPublicPage } from "@/features/countries/compose-country-public-page";
import { cmsMetadata } from "@/lib/cms-metadata";

export async function generateMetadata() {
  return cmsMetadata("countrieseurope");
}

export const dynamic = "force-dynamic";

export default async function CountriesEuropePage() {
  return composeCountryPublicPage("countrieseurope", {
    Body: CountryBodyShell,
    getContent: getCountryContent,
    buildHero: buildCountryHeroFigmaHtml,
  });
}
