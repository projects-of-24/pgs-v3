/**
 * /countriescanada — modular country compose (slug `canada`).
 * Hostinger HTML retired on this route. CMS content editable later.
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
