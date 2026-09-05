/**
 * Shared student sidebar (#sidebar lavender panel).
 *
 * Edit variants in `public-sidebar.html` (unsigned | signed | signed-premium).
 * Hostinger source: `application/views/sidebar.php`.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { StudentExperienceKind } from "@/lib/student-experience";

export type PublicSidebarVariant = "unsigned" | "signed" | "signed-premium";

export type PublicSidebarFields = {
  name?: string | null;
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character
  );
}

export function publicSidebarVariantForState(state: StudentExperienceKind): PublicSidebarVariant {
  if (state === "authenticated_premium") return "signed-premium";
  if (state === "authenticated_standard") return "signed";
  return "unsigned";
}

function loadVariantsFile(): string {
  return readFileSync(join(process.cwd(), "src/legacy/pages/public-sidebar.html"), "utf8");
}

function extractVariant(source: string, variant: PublicSidebarVariant): string {
  const marker = `data-pgs-sidebar-variant="${variant}"`;
  const start = source.indexOf(`<div class="arrow-box sidebar-box" id="sidebar" ${marker}`);
  if (start < 0) {
    throw new Error(`public-sidebar.html missing variant: ${variant}`);
  }
  const tags = /<\/?div\b[^>]*>/gi;
  tags.lastIndex = start;
  let depth = 0;
  let match: RegExpExecArray | null;
  while ((match = tags.exec(source))) {
    depth += /^<div\b/i.test(match[0]) ? 1 : -1;
    if (depth === 0) return source.slice(start, tags.lastIndex);
  }
  throw new Error(`public-sidebar.html unclosed variant: ${variant}`);
}

export function buildPublicSidebarHtml(
  variant: PublicSidebarVariant,
  fields: PublicSidebarFields = {}
): string {
  const name = escapeHtml((fields.name || "User").trim() || "User");
  return extractVariant(loadVariantsFile(), variant).replaceAll("{{name}}", name);
}

function replaceFirstSidebar(source: string, nextSidebar: string): string {
  const opening = /<div\b[^>]*\bid=["']sidebar["'][^>]*>/i.exec(source);
  if (!opening || opening.index === undefined) {
    // also match class-first markup
    const alt = /<div\b[^>]*\bclass=["'][^"']*\bsidebar-box\b[^"']*["'][^>]*\bid=["']sidebar["'][^>]*>/i.exec(source)
      ?? /<div\b[^>]*\bid=["']sidebar["'][^>]*\bclass=["'][^"']*\bsidebar-box\b[^"']*["'][^>]*>/i.exec(source);
    if (!alt || alt.index === undefined) return source;
    return replaceBalancedDiv(source, alt.index, nextSidebar);
  }
  return replaceBalancedDiv(source, opening.index, nextSidebar);
}

function replaceBalancedDiv(source: string, start: number, next: string): string {
  const tags = /<\/?div\b[^>]*>/gi;
  tags.lastIndex = start;
  let depth = 0;
  let match: RegExpExecArray | null;
  while ((match = tags.exec(source))) {
    depth += /^<div\b/i.test(match[0]) ? 1 : -1;
    if (depth === 0) {
      return source.slice(0, start) + next + source.slice(tags.lastIndex);
    }
  }
  return source;
}

/** Swap page `#sidebar` for the shared variant (no-op if absent). */
export function applySharedPublicSidebar(
  pageHtml: string,
  state: StudentExperienceKind,
  fields: PublicSidebarFields = {}
): string {
  if (!/\bid=["']sidebar["']/i.test(pageHtml)) return pageHtml;
  const variant = publicSidebarVariantForState(state);
  return replaceFirstSidebar(pageHtml, buildPublicSidebarHtml(variant, fields));
}
