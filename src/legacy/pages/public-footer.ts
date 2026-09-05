/**
 * Shared public footer (.footer-bg + copyright strip).
 *
 * Edit `public-footer.html`.
 * Hostinger source: `application/views/footer.php` (visual chrome only — not modals/scripts).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

let cached: string | null = null;

export function getPublicFooterHtml(): string {
  if (cached) return cached;
  const raw = readFileSync(join(process.cwd(), "src/legacy/pages/public-footer.html"), "utf8");
  const start = raw.indexOf('<div class="footer-bg">');
  if (start < 0) {
    throw new Error("public-footer.html must contain a .footer-bg block");
  }
  cached = extractBalancedDiv(raw, start);
  return cached;
}

function extractBalancedDiv(source: string, start: number): string {
  const tags = /<\/?div\b[^>]*>/gi;
  tags.lastIndex = start;
  let depth = 0;
  let match: RegExpExecArray | null;
  while ((match = tags.exec(source))) {
    depth += /^<div\b/i.test(match[0]) ? 1 : -1;
    if (depth === 0) return source.slice(start, tags.lastIndex);
  }
  throw new Error("public-footer.html unclosed .footer-bg");
}

function replaceFirstFooterBg(source: string, nextFooter: string): string {
  const opening = /<div\b[^>]*\bclass=["'][^"']*\bfooter-bg\b[^"']*["'][^>]*>/i.exec(source);
  if (!opening || opening.index === undefined) return source;
  const tags = /<\/?div\b[^>]*>/gi;
  tags.lastIndex = opening.index;
  let depth = 0;
  let match: RegExpExecArray | null;
  while ((match = tags.exec(source))) {
    depth += /^<div\b/i.test(match[0]) ? 1 : -1;
    if (depth === 0) {
      return source.slice(0, opening.index) + nextFooter + source.slice(tags.lastIndex);
    }
  }
  return source;
}

/** Swap page `.footer-bg` for the shared footer (no-op if absent). */
export function applySharedPublicFooter(pageHtml: string): string {
  if (!/\bfooter-bg\b/i.test(pageHtml)) return pageHtml;
  return replaceFirstFooterBg(pageHtml, getPublicFooterHtml());
}
