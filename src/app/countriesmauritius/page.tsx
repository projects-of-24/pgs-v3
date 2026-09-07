/**
 * /countriesmauritius — modular country compose (slug `mauritius`).
 * Hostinger HTML retired on this route. CMS content editable later.
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
