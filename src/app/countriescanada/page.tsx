/**
 * /countriescanada — own Photoshop file (@/features/countries-canada).
 * Header and footer stay shared. Body edits here do not change the other countries.
 */
import { CountryBodyShell } from "@/features/countries-canada/country-body-shell";
import { buildCountryHeroFigmaHtml } from "@/features/countries-canada/country-hero-figma";
import { getCountryContent } from "@/features/countries-canada/content";
import { composeCountryPublicPage } from "@/features/countries/compose-country-public-page";
import { cmsMetadata } from "@/lib/cms-metadata";

export async function generateMetadata() {
  return cmsMetadata("countriescanada");
}

export const dynamic = "force-dynamic";

export default async function CountriesCanadaPage() {
  return composeCountryPublicPage("countriescanada", {
    Body: CountryBodyShell,
    getContent: getCountryContent,
    buildHero: buildCountryHeroFigmaHtml,
  });
}
