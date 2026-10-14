import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import type { ReactNode } from "react";
import { StudentSidebarStateProvider } from "@/components/student-sidebar-state-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "#PGS", template: "%s | #PGS" },
  description: "PurpleGuide parity-proof migration"
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = (await headers()).get("x-pathname") ?? "";
  /** Preview labs + Workspace shell: no Hostinger main.js / anime driver. */
  const isPreviewLab = pathname.startsWith("/preview");
  const isWorkspaceSurface = pathname === "/workspace" || pathname.startsWith("/workspace/");
  /**
   * OWN-LINK: routes on the owned split (1:1 copy of Hostinger style.css +
   * responsive.css, decisions 27/32). Every route not listed stays on Hostinger.
   * Add a route here only inside that route's H-R gate.
   *   /preview/header  — chrome lab (OWN-LINK-H)
   *   /preview/about   — About H-R pass 2
   *   /about           — About LIVE cutover (2026-09-27, owner QC passed + locked)
   *   /preview/finance — Finance H-R pass 2
   *   /finance         — Finance LIVE cutover (2026-09-30)
   *   /preview/error-404 — Error 404 H-R pass 2 (live /error_404 + unknown-URL 404 join at step 4)
   *   /error_404       — Error 404 LIVE cutover (2026-10-01); unknown URLs use src/app/global-not-found.tsx
   *   /purpleusmle     — USMLE lab-2 LIVE cutover (2026-10-03 Gate 1)
   *   /preview/purpleplab-2 — PLAB lab-2 preview QC (2026-10-03 Gate 2a)
   *   /purpleplab      — PLAB lab-2 LIVE cutover (2026-10-03 Gate 2b)
   *   /preview/purpleamc-2 — AMC lab-2 preview QC (2026-10-03 Gate 3a)
   *   /purpleamc       — AMC lab-2 LIVE cutover (2026-10-03 Gate 3b)
   *   /preview/purplenonmedical-2 — non-medical lab-2 chrome + OWNED_SPLIT (2026-10-03 N-G0)
   *   /preview/purplemedical* — medical iPad labs (Paper / Figma / ipad)
   *   /preview/student-feed-ipad-* — feed iPad A/B labs (Figma / Paper)
   *   /preview/explorecountries — Explore H-R pass 2 (2026-10-10 HR-explore-2)
   *   /explorecountries — Explore LIVE chrome cutover (2026-10-10)
   *   /preview/countries — Country destination LOCKED narrow (Figma 26:2456 · 2026-10-10)
   *   /preview/countries-2 — Country destination wide rails (Figma 27:2999 · 2026-10-10)
   *   /preview/cvreadyprogram — CV Ready H-R pass 2 OWNED_SPLIT (2026-10-11)
   */
  const OWNED_SPLIT_ROUTES = new Set([
    "/preview/header",
    "/preview/about",
    "/about",
    "/preview/finance",
    "/finance",
    "/preview/error-404",
    "/error_404",
    "/preview/scholarship",
    "/scholarship",
    "/preview/purpleusmle",
    "/preview/purpleusmle-2",
    /* USMLE lab-2 LIVE cutover (2026-10-03) — same tree as /preview/purpleusmle-2 */
    "/purpleusmle",
    /* PLAB lab-2 preview QC (2026-10-03 Gate 2a) */
    "/preview/purpleplab-2",
    /* PLAB lab-2 LIVE cutover (2026-10-03 Gate 2b) */
    "/purpleplab",
    /* AMC lab-2 preview QC (2026-10-03 Gate 3a) */
    "/preview/purpleamc-2",
    /* AMC lab-2 LIVE cutover (2026-10-03 Gate 3b) */
    "/purpleamc",
    /* Non-medical lab-2 chrome + OWNED_SPLIT (2026-10-03 N-G0) — body iPad later */
    "/preview/purplenonmedical-2",
    /* Purple Medical iPad labs — React chrome + owned split */
    "/preview/purplemedical",
    "/preview/purplemedical-figma",
    "/preview/purplemedical-paper",
    /* Student feed iPad A/B labs — React chrome + owned split */
    "/preview/student-feed-ipad-figma",
    "/preview/student-feed-ipad-paper",
    /* Explore Countries H-R pass 2 + LIVE chrome cutover (2026-10-10) */
    "/preview/explorecountries",
    "/explorecountries",
    /* Country destination — LOCKED narrow + wide clamp lab (2026-10-10) */
    "/preview/countries",
    "/preview/countries-2",
    /* Country destination LIVE cutover (2026-10-10) — same template as /preview/countries-2 */
    "/countriesusa",
    "/countriesuk",
    "/countriesaus",
    "/countriescanada",
    "/countrieseurope",
    "/countriesfrance",
    "/countriesgermany",
    "/countriesmauritius",
    "/countriesnz",
    "/countriesothers",
    /* CV Ready H-R pass 2 (2026-10-11) — preview only; live joins at HR-cvready-3 */
    "/preview/cvreadyprogram"
  ]);
  const isOwnedSplitRoute = OWNED_SPLIT_ROUTES.has(pathname);
  /** Hostinger vendors.min.js + main.js: skipped on labs, owned-split routes, and workspace. */
  const skipLegacyChromeScripts = isPreviewLab || isOwnedSplitRoute || isWorkspaceSurface;

  return (
    <html lang="en" className="no-js">
      <head>
        <link rel="icon" href="/favicon.png" />
        {/* V-1: Bootstrap + icon font only where string chrome still lives. */}
        {!isOwnedSplitRoute ? (
          <link rel="stylesheet" href="/assets/css/vendors.min.css" />
        ) : null}
        {!isOwnedSplitRoute ? (
          <link rel="stylesheet" href="/assets/css/icon.min.css" />
        ) : null}
        {isOwnedSplitRoute ? (
          <link rel="stylesheet" href="/preview/owned-split" />
        ) : (
          <>
            <link rel="stylesheet" href="/assets/css/style.css" />
            <link rel="stylesheet" href="/assets/css/responsive.css" />
          </>
        )}
      </head>
        <body
          data-mobile-nav-style="classic"
          className="custom-cursor"
          data-pgs-preview={isPreviewLab ? "1" : undefined}
          data-pgs-workspace={isWorkspaceSurface ? "1" : undefined}
        >
        <StudentSidebarStateProvider>{children}</StudentSidebarStateProvider>
        {!skipLegacyChromeScripts ? (
          <>
            <Script src="/assets/js/jquery.js" strategy="beforeInteractive" />
            <Script src="/assets/js/vendors.min.js" strategy="afterInteractive" />
            {/* Stub only when main.js loads — preview labs + workspace skip */}
            <Script src="/assets/js/pgs-anime-stub.js" strategy="beforeInteractive" />
            <Script src="/assets/js/main.js" strategy="afterInteractive" />
            <Script src="/assets/js/pgs-autocomplete.js" strategy="lazyOnload" />
          </>
        ) : null}
      </body>
    </html>
  );
}
