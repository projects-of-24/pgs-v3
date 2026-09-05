/**
 * /countriesusa — shared country compose (slug `usa`).
 */
import { composeCountryPublicPage } from "@/features/countries/compose-country-public-page";
import { cmsMetadata } from "@/lib/cms-metadata";

export async function generateMetadata() {
  return cmsMetadata("countriesusa");
}

export const dynamic = "force-dynamic";

export default async function CountriesUsaPage() {
  return composeCountryPublicPage("countriesusa");
}
