/**
 * Shared "Hello Aspirant" strip (.avatar-box.w-12).
 *
 * Owner 2026-09-03: REMOVED from pages (layout mess). applySharedHelloAspirant
 * strips the node. Variants in `hello-aspirant.html` kept for a later restore.
 * Hostinger source: sidebar.php avatar-box next to #toggleBtn.
 * Figma: 18732:10920 / 17056:20463.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { StudentExperienceKind } from "@/lib/student-experience";

export type HelloAspirantVariant = "unsigned" | "signed" | "signed-premium";

export type HelloAspirantFields = {
  name?: string | null;
  avatarUrl?: string | null;
};

/**
 * Anonymous / unsigned placebo avatar (owner 2026-09-07 shrug crop).
 * Same asset as feed identity anonymous: `identity-avatar-anonymous.jpg`.
 * Modular pages (feed, countries, USMLE, …) use this for anonymous chrome.
 */
export const HELLO_ASPIRANT_DEFAULT_AVATAR =
  "/assets/img/figma-feed/identity-avatar-anonymous.jpg";

const DEFAULT_AVATAR = HELLO_ASPIRANT_DEFAULT_AVATAR;

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character
  );
}

export function helloAspirantVariantForState(state: StudentExperienceKind): HelloAspirantVariant {
  if (state === "authenticated_premium") return "signed-premium";
  if (state === "authenticated_standard") return "signed";
  return "unsigned";
}

function loadVariantsFile(): string {
  return readFileSync(join(process.cwd(), "src/legacy/pages/hello-aspirant.html"), "utf8");
}

function extractVariant(source: string, variant: HelloAspirantVariant): string {
  const marker = `data-pgs-hello-variant="${variant}"`;
  const start = source.indexOf(`<div class="avatar-box w-12" ${marker}`);
  if (start < 0) {
    throw new Error(`hello-aspirant.html missing variant: ${variant}`);
  }
  const tags = /<\/?div\b[^>]*>/gi;
  tags.lastIndex = start;
  let depth = 0;
  let match: RegExpExecArray | null;
  while ((match = tags.exec(source))) {
    depth += /^<div\b/i.test(match[0]) ? 1 : -1;
    if (depth === 0) return source.slice(start, tags.lastIndex);
  }
  throw new Error(`hello-aspirant.html unclosed variant: ${variant}`);
}

export function buildHelloAspirantHtml(
  variant: HelloAspirantVariant,
  fields: HelloAspirantFields = {}
): string {
  const name = escapeHtml((fields.name || "Aspirant").trim() || "Aspirant");
  const avatarUrl = escapeHtml(fields.avatarUrl || DEFAULT_AVATAR);
  return extractVariant(loadVariantsFile(), variant)
    .replaceAll("{{name}}", name)
    .replaceAll("{{avatarUrl}}", avatarUrl);
}

function replaceFirstAvatarBox(source: string, nextBox: string): string {
  const opening = /<div\b[^>]*\bclass=["'][^"']*\bavatar-box\b[^"']*["'][^>]*>/i.exec(source);
  if (!opening || opening.index === undefined) return source;
  const tags = /<\/?div\b[^>]*>/gi;
  tags.lastIndex = opening.index;
  let depth = 0;
  let match: RegExpExecArray | null;
  while ((match = tags.exec(source))) {
    depth += /^<div\b/i.test(match[0]) ? 1 : -1;
    if (depth === 0) {
      return source.slice(0, opening.index) + nextBox + source.slice(tags.lastIndex);
    }
  }
  return source;
}

/** Remove page `.avatar-box.w-12` Hello strip (owner: off the page). */
function removeHelloAspirantStrip(source: string): string {
  const opening =
    /<div\b[^>]*\bclass=["'][^"']*\bavatar-box\b[^"']*\bw-12\b[^"']*["'][^>]*>/i.exec(source) ??
    /<div\b[^>]*\bclass=["'][^"']*\bw-12\b[^"']*\bavatar-box\b[^"']*["'][^>]*>/i.exec(source);
  if (!opening || opening.index === undefined) return source;
  const tags = /<\/?div\b[^>]*>/gi;
  tags.lastIndex = opening.index;
  let depth = 0;
  let match: RegExpExecArray | null;
  while ((match = tags.exec(source))) {
    depth += /^<div\b/i.test(match[0]) ? 1 : -1;
    if (depth === 0) {
      return source.slice(0, opening.index) + source.slice(tags.lastIndex);
    }
  }
  return source;
}

/**
 * Owner 2026-09-03: strip Hello Aspirant from the page (do not inject).
 * `state` / `fields` kept for call-site compatibility until restore.
 */
export function applySharedHelloAspirant(
  pageHtml: string,
  _state: StudentExperienceKind,
  _fields: HelloAspirantFields = {}
): string {
  if (!/\bavatar-box\b/i.test(pageHtml)) return pageHtml;
  return removeHelloAspirantStrip(pageHtml);
}
