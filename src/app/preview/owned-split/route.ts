import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * OWN-LINK-H — lab stylesheet for /preview/header only.
 * Concatenates the unlinked 1:1 split in barrel order so the browser
 * gets one sheet (same cascade as Hostinger style.css + responsive.css).
 * Parked files are never included. Live pages do not link this route.
 */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const SPLIT_DIR = path.join(process.cwd(), "src/features/owned-css/split");
const BARREL = "pgs-owned-split.css";
const OWNED_FILE = /^pgs-owned-[a-z0-9.-]+\.css$/;

export function GET() {
  const barrel = readFileSync(path.join(SPLIT_DIR, BARREL), "utf8");
  const files = [...barrel.matchAll(/@import\s+['"]\.\/([^'"]+)['"]\s*;/g)].map((match) => match[1]);
  if (files.length === 0) {
    return new Response("owned split barrel has no imports", { status: 500 });
  }

  const parts: string[] = [];
  // `@import url(...)` (Google Fonts: Bebas Neue, Roboto, Caveat…) is only honoured at the very
  // top of a stylesheet. P1 carried them and used to be first; since P0 (vendor-used) sits before
  // it, hoist every @import out of the files and emit them first (V-1 fix, 2026-09-27).
  const hoisted: string[] = [];
  const IMPORT_RE = /^\s*@import\s+url\([^)]*\)[^;\n]*;[ \t]*$/gm; // url() may contain ";" (Roboto axes)
  for (const file of files) {
    if (!OWNED_FILE.test(file) || file.includes("parked") || file.includes("/")) {
      return new Response(`refused import ${file}`, { status: 500 });
    }
    const full = path.join(SPLIT_DIR, file);
    if (path.dirname(full) !== SPLIT_DIR) {
      return new Response(`refused import ${file}`, { status: 500 });
    }
    const css = readFileSync(full, "utf8").replace(IMPORT_RE, (line) => {
      hoisted.push(line.trim());
      return "";
    });
    parts.push(`/* === ${file} === */`);
    parts.push(css);
  }

  const out = [
    ...hoisted,
    "/* OWN-LINK-H · owned-split routes · 1:1 split concatenated in barrel order · parked files excluded */",
    ...parts
  ];

  return new Response(out.join("\n"), {
    headers: {
      "content-type": "text/css; charset=utf-8",
      "cache-control": "no-store",
      "x-pgs-owned-split": "header-lab"
    }
  });
}
