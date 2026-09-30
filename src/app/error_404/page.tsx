/**
 * Live `/error_404` — H-R DONE (decision 54, 2026-09-27).
 * Same tree as `/preview/error-404` (via compose-error-404-page.tsx) with `live`:
 * React chrome + owned split (layout.tsx OWNED_SPLIT_ROUTES); no Hostinger CSS/JS, no chrome strings.
 */
import { composeError404Page } from "@/features/error-404/compose-error-404-page";
import { cmsMetadata } from "@/lib/cms-metadata";

export async function generateMetadata() {
  return cmsMetadata("error-404");
}

export const dynamic = "force-dynamic";

export default async function Error404Page() {
  return composeError404Page({ live: true, page: "error-404" });
}
