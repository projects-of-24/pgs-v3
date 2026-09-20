/**
 * /countriesusa — own Photoshop file (@/features/countries).
 * Header and footer stay shared. Body edits here do not change the other countries.
 */
import { CountryBodyShell } from "@/features/countries/country-body-shell";
import { buildCountryHeroFigmaHtml } from "@/features/countries/country-hero-figma";
import { getCountryContent } from "@/features/countries/content";
import { composeCountryPublicPage } from "@/features/countries/compose-country-public-page";
import { cmsMetadata } from "@/lib/cms-metadata";

export async function generateMetadata() {
  return cmsMetadata("countriesusa");
}

export const dynamic = "force-dynamic";

export default async function CountriesUsaPage() {
  return composeCountryPublicPage("countriesusa", {
    Body: CountryBodyShell,
    getContent: getCountryContent,
    buildHero: buildCountryHeroFigmaHtml,
  });
}
