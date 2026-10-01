/**
 * Unknown-address 404 (any URL that matches no page, e.g. /abcxyz) — H-R cutover (2026-10-01).
 * Next.js `global-not-found` (experimental flag in next.config.ts) skips the shared layout,
 * so this file builds its own <html>: owned CSS only (no Hostinger CSS/JS), same React chrome
 * and same 404 body as live /error_404. Next adds <meta robots noindex> and the 404 status.
 * Staff/parent record-missing 404s (notFound() inside admin/portal) still use src/app/not-found.tsx.
 */
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { StudentSidebarStateProvider } from "@/components/student-sidebar-state-provider";
import { composeError404Page } from "@/features/error-404/compose-error-404-page";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page not found | #PGS",
  description: "This page could not be found."
};

export const dynamic = "force-dynamic";

export default async function GlobalNotFound(): Promise<ReactNode> {
  const page = await composeError404Page({ live: true, page: "error-404", reactChrome: true });
  return (
    <html lang="en" className="no-js">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="/preview/owned-split" />
      </head>
      <body data-mobile-nav-style="classic" className="custom-cursor">
        <StudentSidebarStateProvider>{page}</StudentSidebarStateProvider>
      </body>
    </html>
  );
}
