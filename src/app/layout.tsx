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
   */
  const OWNED_SPLIT_ROUTES = new Set(["/preview/header", "/preview/about", "/about"]);
  const isOwnedSplitRoute = OWNED_SPLIT_ROUTES.has(pathname);
  /** Hostinger vendors.min.js + main.js: skipped on labs and on H-R done routes (React chrome, same as the QC'd lab). */
  const skipHostingerJs = isPreviewLab || isOwnedSplitRoute;

  return (
    <html lang="en" className="no-js">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="/assets/css/vendors.min.css" />
        <link rel="stylesheet" href="/assets/css/icon.min.css" />
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
        <Script src="/assets/js/jquery.js" strategy="beforeInteractive" />
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
