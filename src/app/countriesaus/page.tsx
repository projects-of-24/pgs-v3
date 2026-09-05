/**
 * /countriesaus — shared country compose (slug `aus`).
 */
import { composeCountryPublicPage } from "@/features/countries/compose-country-public-page";
import { cmsMetadata } from "@/lib/cms-metadata";

export async function generateMetadata() {
  return cmsMetadata("countriesaus");
}

export const dynamic = "force-dynamic";

export default async function CountriesAusPage() {
  return composeCountryPublicPage("countriesaus");
}
