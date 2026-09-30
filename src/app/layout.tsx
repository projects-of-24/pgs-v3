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
  /** Preview labs: chrome HTML only — no Hostinger main.js / anime driver. */
  const isPreviewLab = pathname.startsWith("/preview");
  /**
   * OWN-LINK: routes on the owned split (1:1 copy of Hostinger style.css +
   * responsive.css, decisions 27/32). Every route not listed stays on Hostinger.
   * Add a route here only inside that route's H-R gate.
   *   /preview/header  — chrome lab (OWN-LINK-H)
   *   /preview/about   — About H-R pass 2
   *   /about           — About LIVE cutover (2026-09-27, owner QC passed + locked)
   *   /preview/error-404 — Error 404 H-R step 2 (HR-404-2, 2026-09-27; vendor scan: 0 new P0 rules)
   *   /error_404       — Error 404 LIVE cutover (HR-404-3, 2026-09-27). The not-found boundary
   *                      (any unknown URL) cannot be matched here: it keeps Hostinger CSS until
   *                      the final flip removes this switch (OWNED-CHROME-UNLINKED.md exception).
   */
  const OWNED_SPLIT_ROUTES = new Set([
    "/preview/header",
    "/preview/about",
    "/about",
    "/preview/error-404",
    "/error_404"
  ]);
  const isOwnedSplitRoute = OWNED_SPLIT_ROUTES.has(pathname);
  /** Hostinger vendors.min.js + main.js: skipped on labs and on H-R done routes (React chrome, same as the QC'd lab). */
  const skipHostingerJs = isPreviewLab || isOwnedSplitRoute;

  return (
    <html lang="en" className="no-js">
      <head>
        <link rel="icon" href="/favicon.png" />
        {/* V-1 step 3 (2026-09-27): Bootstrap + plugin bundle only where string chrome still
            lives. Owned-split routes carry the rules they use in P0 (pgs-owned-000-vendor-used.css). */}
        {!isOwnedSplitRoute ? <link rel="stylesheet" href="/assets/css/vendors.min.css" /> : null}
        {/* V-1 step 2 (2026-09-27): icon font (Bootstrap Icons + Font Awesome) only where
            string chrome still lives. React chrome draws its icons inline (pgs-icon.tsx). */}
        {!isOwnedSplitRoute ? <link rel="stylesheet" href="/assets/css/icon.min.css" /> : null}
        {isOwnedSplitRoute ? (
          <link rel="stylesheet" href="/preview/owned-split" />
        ) : (
          <>
            <link rel="stylesheet" href="/assets/css/style.css" />
            <link rel="stylesheet" href="/assets/css/responsive.css" />
          </>
        )}
      </head>
      <body data-mobile-nav-style="classic" className="custom-cursor" data-pgs-preview={isPreviewLab ? "1" : undefined}>
        <StudentSidebarStateProvider>{children}</StudentSidebarStateProvider>
        {/* V-1 step 4 (2026-09-27): jQuery only where main.js / vendors.min.js still run.
            legacy-page.tsx guards both of its jQuery uses (appear, isotope) with `if (!jQuery) return`. */}
        {!skipHostingerJs ? <Script src="/assets/js/jquery.js" strategy="beforeInteractive" /> : null}
        {!skipHostingerJs ? (
          <>
            <Script src="/assets/js/vendors.min.js" strategy="afterInteractive" />
            {/* Stub only when main.js loads — preview labs skip both */}
            <Script src="/assets/js/pgs-anime-stub.js" strategy="beforeInteractive" />
            <Script src="/assets/js/main.js" strategy="afterInteractive" />
          </>
        ) : null}
        {/* V-1 (2026-09-27): legacy string-search autocomplete. It binds to ANY
            input.search-control, so on React chrome it was silently double-binding
            the React search fields. Loaded only where the string strip still lives. */}
        {!skipHostingerJs ? <Script src="/assets/js/pgs-autocomplete.js" strategy="lazyOnload" /> : null}
      </body>
    </html>
  );
}
