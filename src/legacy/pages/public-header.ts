/**
 * Shared public header (Figma V6 responsive + drawer + dropslides).
 *
 * Edit `public-header.html` — one file for all pages that import it.
 * Breakpoints: `src/features/shell/pgs-breakpoints.ts` (authority)
 * Overlay: `src/features/shell/legacy-header-breakpoints.css`
 *   >1366 desktop · ≤1366 tablet · ≤600 compact mobile.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

let cached: string | null = null;

export function getPublicHeaderHtml(): string {
  // Always re-read in dev so public-header.html edits show up without restart.
  if (process.env.NODE_ENV !== "development" && cached) return cached;
  cached = readFileSync(join(process.cwd(), "src/legacy/pages/public-header.html"), "utf8");
  return cached;
}

/** Balance a `<div…>` opened at `openIndex` and return the index after its matching `</div>`. */
function endOfBalancedDiv(html: string, openIndex: number): number | null {
  const tags = /<\/?div\b[^>]*>/gi;
  tags.lastIndex = openIndex;
  let depth = 0;
  let match: RegExpExecArray | null;
  while ((match = tags.exec(html))) {
    if (/^<div\b/i.test(match[0])) depth += 1;
    else depth -= 1;
    if (depth === 0) return tags.lastIndex;
  }
  return null;
}

/**
 * Replace page drawer (`#drawer`) with the shared drawer block.
 * Works for country pages (`countriesUSA`) and every other legacy shell shape.
 */
function replaceSharedDrawer(pageHtml: string, sharedDrawerBlock: string): string {
  const drawerOpen = /<div\b[^>]*\bid=["']drawer["'][^>]*>/i.exec(pageHtml);
  if (!drawerOpen || drawerOpen.index === undefined) return pageHtml;

  const end = endOfBalancedDiv(pageHtml, drawerOpen.index);
  if (end == null) return pageHtml;

  let start = drawerOpen.index;
  const before = pageHtml.slice(Math.max(0, start - 80), start);
  const comment = /<!--\s*Drawer\s*-->\s*$/i.exec(before);
  if (comment) start = start - comment[0].length;

  return `${pageHtml.slice(0, start)}${sharedDrawerBlock}\n\n${pageHtml.slice(end)}`;
}

/**
 * Replace embedded `<header>…</header>` and Drawer with the shared file.
 * Page-specific chrome (cursor, toast, student strip, etc.) is left alone.
 */
export function applySharedPublicHeader(pageHtml: string): string {
  const shared = getPublicHeaderHtml().trim();
  const headerMatch = shared.match(/<header\b[\s\S]*?<\/header>/i);
  if (!headerMatch) {
    throw new Error("public-header.html must contain a <header>…</header> block");
  }

  let out = pageHtml.replace(/<header\b[\s\S]*?<\/header>/i, headerMatch[0]);

  const drawerMatch = shared.match(/<!--\s*Drawer\s*-->[\s\S]*$/i);
  if (drawerMatch) {
    out = replaceSharedDrawer(out, drawerMatch[0].trim());
  }

  return out;
}
