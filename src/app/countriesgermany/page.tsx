/**
 * /countriesgermany — shared country compose (slug `germany`).
 */
import { composeCountryPublicPage } from "@/features/countries/compose-country-public-page";
import { cmsMetadata } from "@/lib/cms-metadata";

export async function generateMetadata() {
  return cmsMetadata("countriesgermany");
}

export const dynamic = "force-dynamic";

export default async function CountriesGermanyPage() {
  return composeCountryPublicPage("countriesgermany");
}
