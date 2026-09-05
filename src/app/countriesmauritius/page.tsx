/**
 * /countriesmauritius — shared country compose (slug `mauritius`).
 */
import { composeCountryPublicPage } from "@/features/countries/compose-country-public-page";
import { cmsMetadata } from "@/lib/cms-metadata";

export async function generateMetadata() {
  return cmsMetadata("countriesmauritius");
}

export const dynamic = "force-dynamic";

export default async function CountriesMauritiusPage() {
  return composeCountryPublicPage("countriesmauritius");
}
