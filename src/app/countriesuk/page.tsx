/**
 * /countriesuk — shared country compose (slug `uk`).
 * Engine: `composeCountryPublicPage` — not a UK-only template.
 */
import { composeCountryPublicPage } from "@/features/countries/compose-country-public-page";
import { cmsMetadata } from "@/lib/cms-metadata";

export async function generateMetadata() {
  return cmsMetadata("countriesuk");
}

export const dynamic = "force-dynamic";

export default async function CountriesUkPage() {
  return composeCountryPublicPage("countriesuk");
}
