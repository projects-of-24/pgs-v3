/**
 * /countriesmauritius — own Photoshop file (@/features/countries-mauritius).
 * Header and footer stay shared. Body edits here do not change the other countries.
 */
import { CountryBodyShell } from "@/features/countries-mauritius/country-body-shell";
import { buildCountryHeroFigmaHtml } from "@/features/countries-mauritius/country-hero-figma";
import { getCountryContent } from "@/features/countries-mauritius/content";
import { composeCountryPublicPage } from "@/features/countries/compose-country-public-page";
import { cmsMetadata } from "@/lib/cms-metadata";

export async function generateMetadata() {
  return cmsMetadata("countriesmauritius");
}

export const dynamic = "force-dynamic";

export default async function CountriesMauritiusPage() {
  return composeCountryPublicPage("countriesmauritius", {
    Body: CountryBodyShell,
    getContent: getCountryContent,
    buildHero: buildCountryHeroFigmaHtml,
  });
}
