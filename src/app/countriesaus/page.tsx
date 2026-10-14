/**
 * Live `/countriesaus` — **own** template copy `@/features/countries-destination-aus`
 * (forked from USA QC template 2026-10-10). Content pass later.
 */
import { composeCountriesDestinationLivePage } from "@/features/countries-destination-aus/compose-countries-destination-live-page";
import { cmsMetadata } from "@/lib/cms-metadata";

export async function generateMetadata() {
  return cmsMetadata("countriesaus");
}

export const dynamic = "force-dynamic";

export default async function CountriesPage() {
  return composeCountriesDestinationLivePage();
}
