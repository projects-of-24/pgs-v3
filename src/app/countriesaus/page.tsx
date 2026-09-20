/**
 * /countriesaus — own Photoshop file (@/features/countries-aus).
 * Header and footer stay shared. Body edits here do not change the other countries.
 */
import { CountryBodyShell } from "@/features/countries-aus/country-body-shell";
import { buildCountryHeroFigmaHtml } from "@/features/countries-aus/country-hero-figma";
import { getCountryContent } from "@/features/countries-aus/content";
import { composeCountryPublicPage } from "@/features/countries/compose-country-public-page";
import { cmsMetadata } from "@/lib/cms-metadata";

export async function generateMetadata() {
  return cmsMetadata("countriesaus");
}

export const dynamic = "force-dynamic";

export default async function CountriesAusPage() {
  return composeCountryPublicPage("countriesaus", {
    Body: CountryBodyShell,
    getContent: getCountryContent,
    buildHero: buildCountryHeroFigmaHtml,
  });
}
