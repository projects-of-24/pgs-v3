/**
 * /countriesfrance — shared country compose (slug `france`).
 */
import { composeCountryPublicPage } from "@/features/countries/compose-country-public-page";
import { cmsMetadata } from "@/lib/cms-metadata";

export async function generateMetadata() {
  return cmsMetadata("countriesfrance");
}

export const dynamic = "force-dynamic";

export default async function CountriesFrancePage() {
  return composeCountryPublicPage("countriesfrance");
}
