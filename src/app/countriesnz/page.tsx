/**
 * /countriesnz — shared country compose (slug `nz`).
 */
import { composeCountryPublicPage } from "@/features/countries/compose-country-public-page";
import { cmsMetadata } from "@/lib/cms-metadata";

export async function generateMetadata() {
  return cmsMetadata("countriesnz");
}

export const dynamic = "force-dynamic";

export default async function CountriesNzPage() {
  return composeCountryPublicPage("countriesnz");
}
