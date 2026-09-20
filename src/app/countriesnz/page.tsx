/**
 * /countriesnz — own Photoshop file (@/features/countries-nz).
 * Header and footer stay shared. Body edits here do not change the other countries.
 */
import { CountryBodyShell } from "@/features/countries-nz/country-body-shell";
import { buildCountryHeroFigmaHtml } from "@/features/countries-nz/country-hero-figma";
import { getCountryContent } from "@/features/countries-nz/content";
import { composeCountryPublicPage } from "@/features/countries/compose-country-public-page";
import { cmsMetadata } from "@/lib/cms-metadata";

export async function generateMetadata() {
  return cmsMetadata("countriesnz");
}

export const dynamic = "force-dynamic";

export default async function CountriesNzPage() {
  return composeCountryPublicPage("countriesnz", {
    Body: CountryBodyShell,
    getContent: getCountryContent,
    buildHero: buildCountryHeroFigmaHtml,
  });
}
