/**
 * Live `/error_404` — H-R cutover (2026-10-01).
 * React chrome (<PublicHeader/> · <PublicStrip/> · body · <PublicFooter/>) + owned CSS
 * (layout.tsx OWNED_SPLIT_ROUTES). No Hostinger CSS/JS, no chrome strings, no staff fallback
 * (public site is student-only). Told to search engines: do not index (it is an error page).
 * Unknown addresses use src/app/global-not-found.tsx (same body, same chrome).
 */
import { composeError404Page } from "@/features/error-404/compose-error-404-page";
import { cmsMetadata } from "@/lib/cms-metadata";

export async function generateMetadata() {
  const base = await cmsMetadata("error-404");
  return { ...base, robots: { index: false, follow: false } };
}

export const dynamic = "force-dynamic";

export default async function Error404Page() {
  return composeError404Page({ live: true, page: "error-404", reactChrome: true });
}
