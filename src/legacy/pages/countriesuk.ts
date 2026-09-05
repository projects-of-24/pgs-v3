/**
 * UK country page body — strip + tabs + modals only.
 *
 * Shared chrome is composed at route time (not swapped):
 * `public-header.html` + this file + `public-footer.html`
 *
 * Hero: `buildCountryHeroFigmaHtml()` on the route.
 * Body: `CountryUkBodyShell` (CountryPage + country-body-shell).
 * Title + tabs HTML retired on this route.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

type UkBodySections = {
  stripHtml: string;
  tabsHtml: string;
  modalsHtml: string;
};

const MARKERS = {
  stripStart: "<!-- PGS-UK-STRIP-START -->",
  stripEnd: "<!-- PGS-UK-STRIP-END -->",
  tabsStart: "<!-- PGS-UK-TABS-START -->",
  tabsEnd: "<!-- PGS-UK-TABS-END -->",
  modalsStart: "<!-- PGS-UK-MODALS-START -->",
  modalsEnd: "<!-- PGS-UK-MODALS-END -->",
} as const;

function sliceBetween(source: string, startMarker: string, endMarker: string): string {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker);
  if (start < 0 || end < 0 || end <= start) {
    throw new Error(`countriesuk.html missing ${startMarker} … ${endMarker}`);
  }
  return source.slice(start + startMarker.length, end).trim();
}

function loadUkBodySections(): UkBodySections {
  const raw = readFileSync(join(process.cwd(), "src/legacy/pages/countriesuk.html"), "utf8");
  return {
    stripHtml: sliceBetween(raw, MARKERS.stripStart, MARKERS.stripEnd),
    tabsHtml: sliceBetween(raw, MARKERS.tabsStart, MARKERS.tabsEnd),
    modalsHtml: sliceBetween(raw, MARKERS.modalsStart, MARKERS.modalsEnd),
  };
}

let cachedSections: UkBodySections | null = null;

function getSections(): UkBodySections {
  if (process.env.NODE_ENV !== "development" && cachedSections) return cachedSections;
  cachedSections = loadUkBodySections();
  return cachedSections;
}

/** Strip under header: sidebar slot, #toggleBtn, #univMeet, search, login popup. */
export function countriesUkStripHtml(): string {
  return getSections().stripHtml;
}

/** Tab panels through main content closes (hero/title injected separately). */
export function countriesUkTabsHtml(): string {
  return getSections().tabsHtml;
}

/** Page-local modals (premium overlay, etc.). */
export function countriesUkModalsHtml(): string {
  return getSections().modalsHtml;
}

/** Full editable body file (all sections). */
export function countriesUkBodyHtml(): string {
  const { stripHtml, tabsHtml, modalsHtml } = getSections();
  return `${stripHtml}\n${tabsHtml}\n${modalsHtml}`;
}
