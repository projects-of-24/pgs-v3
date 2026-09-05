/**
 * /countrieseurope — shared country compose (slug `europe`).
 */
import { composeCountryPublicPage } from "@/features/countries/compose-country-public-page";
import { cmsMetadata } from "@/lib/cms-metadata";

export async function generateMetadata() {
  return cmsMetadata("countrieseurope");
}

export const dynamic = "force-dynamic";

export default async function CountriesEuropePage() {
  return composeCountryPublicPage("countrieseurope");
}
