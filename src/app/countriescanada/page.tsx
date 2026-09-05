/**
 * /countriescanada — shared country compose (slug `canada`).
 * Pilot rollout from Hostinger HTML → modular engine.
 * Engine: `composeCountryPublicPage` — independent of UK; content via CMS/slug.
 */
import { composeCountryPublicPage } from "@/features/countries/compose-country-public-page";
import { cmsMetadata } from "@/lib/cms-metadata";

export async function generateMetadata() {
  return cmsMetadata("countriescanada");
}

export const dynamic = "force-dynamic";

export default async function CountriesCanadaPage() {
  return composeCountryPublicPage("countriescanada");
}
