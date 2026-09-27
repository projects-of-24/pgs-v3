/**
 * Live `/error_404` — purified modular body (Hostinger-free cutover).
 * Same shell as `/preview/error-404` with `live`.
 * Hostinger `error404Html` is not served. Locked chrome CSS stays.
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
