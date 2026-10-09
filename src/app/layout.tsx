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
  const skipLegacyChromeScripts = isPreviewLab || isWorkspaceSurface;

  return (
    <html lang="en" className="no-js">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="/assets/css/vendors.min.css" />
        <link rel="stylesheet" href="/assets/css/icon.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/responsive.css" />
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
