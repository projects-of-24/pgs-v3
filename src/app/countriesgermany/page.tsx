/**
 * /countriesgermany — own Photoshop file (@/features/countries-germany).
 * Header and footer stay shared. Body edits here do not change the other countries.
 */
import { CountryBodyShell } from "@/features/countries-germany/country-body-shell";
import { buildCountryHeroFigmaHtml } from "@/features/countries-germany/country-hero-figma";
import { getCountryContent } from "@/features/countries-germany/content";
import { composeCountryPublicPage } from "@/features/countries/compose-country-public-page";
import { cmsMetadata } from "@/lib/cms-metadata";

export async function generateMetadata() {
  return cmsMetadata("countriesgermany");
}

export const dynamic = "force-dynamic";

export default async function CountriesGermanyPage() {
  return composeCountryPublicPage("countriesgermany", {
    Body: CountryBodyShell,
    getContent: getCountryContent,
    buildHero: buildCountryHeroFigmaHtml,
  });
}
