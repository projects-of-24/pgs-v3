/**
 * Guard: every CSS rule in a country fork must be scoped to that country's
 * data-country attribute. Also: no route-reachable import of old unscoped
 * countries CSS modules (Opus harden 2026-10-10).
 */
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  COUNTRIES_DESTINATION_FAMILY,
  auditCss,
  familyForkDir,
  scopeCssIncremental,
  walkCssFiles
} from "../../scripts/lib/css-fork-scope.mjs";

const family = COUNTRIES_DESTINATION_FAMILY;
const featuresRoot = path.join(process.cwd(), "src/features");
const srcRoot = path.join(process.cwd(), "src");

const ALLOWED_COUNTRIES_MODULES = new Set([
  "content",
  "viewport-width-overlay",
  "country-public-hero"
]);

const OLD_COUNTRY_SLUGS = new Set(family.slugs);

function isExcludedImportScanPath(file: string): boolean {
  const rel = path.relative(srcRoot, file).replace(/\\/g, "/");
  if (rel.startsWith("legacy/")) return true;
  if (rel.startsWith("features/countries/")) return true;
  if (/^features\/countries-[a-z]+\//.test(rel)) {
    // countries-destination-* is the new family — still scan it
    if (rel.startsWith("features/countries-destination-")) return false;
    return true;
  }
  return false;
}

function walkSourceFiles(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".next") continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walkSourceFiles(full, out);
    else if (/\.(ts|tsx)$/.test(name) && !name.endsWith(".test.ts") && !name.endsWith(".test.tsx")) {
      out.push(full);
    }
  }
  return out;
}

function collectForbiddenImports(file: string): string[] {
  const text = fs.readFileSync(file, "utf8");
  const hits: string[] = [];

  const fromCountries =
    /from\s+["']@\/features\/countries\/([^"'/]+)["']/g;
  let m: RegExpExecArray | null;
  while ((m = fromCountries.exec(text))) {
    const mod = m[1];
    if (!ALLOWED_COUNTRIES_MODULES.has(mod)) {
      hits.push(`@/features/countries/${mod}`);
    }
  }

  const cssImport =
    /import\s+["']@\/features\/countries\/[^"']+\.css["']/g;
  while ((m = cssImport.exec(text))) {
    hits.push(m[0]);
  }

  const oldFork =
    /from\s+["']@\/features\/countries-([a-z]+)(\/[^"']*)?["']/g;
  while ((m = oldFork.exec(text))) {
    const slug = m[1];
    if (slug === "destination") continue; // countries-destination-*
    if (OLD_COUNTRY_SLUGS.has(slug) || slug === "uk") {
      hits.push(`@/features/countries-${slug}${m[2] ?? ""}`);
    }
  }

  return hits;
}

describe("countries-destination CSS isolation", () => {
  for (const slug of family.slugs) {
    it(`${slug}: every selector scoped; no foreign slug; no bare globals`, () => {
      const fork = familyForkDir(family, slug);
      expect(fs.existsSync(fork)).toBe(true);
      const files = walkCssFiles(fork);
      expect(files.length).toBeGreaterThan(0);

      for (const file of files) {
        const css = fs.readFileSync(file, "utf8");
        const { unscoped, foreign, globalEl } = auditCss(css, family, slug);
        expect(unscoped, file).toEqual([]);
        expect(foreign, file).toEqual([]);
        expect(globalEl, file).toEqual([]);
      }
    });
  }

  it("audit rejects unscoped, foreign, and nested unscoped rules", () => {
    const badBare = auditCss(".hero{color:red}", family, "uk");
    expect(badBare.unscoped.length).toBeGreaterThan(0);

    const badForeign = auditCss(
      ':where([data-country="usa"]) .x{color:red}',
      family,
      "uk"
    );
    expect(badForeign.foreign.length).toBeGreaterThan(0);

    const badMedia = auditCss(
      "@media (max-width:600px){.x{color:red}}",
      family,
      "uk"
    );
    expect(badMedia.unscoped.length).toBeGreaterThan(0);
  });

  it("incremental scope is idempotent on already-scoped CSS", () => {
    const file = path.join(
      featuresRoot,
      "countries-destination-usa",
      "countries-destination-hero.css"
    );
    const before = fs.readFileSync(file, "utf8");
    const { css, changed } = scopeCssIncremental(before, family, "usa");
    expect(changed).toBe(false);
    expect(css).toBe(before);
  });

  it("R4: no route-reachable import of old unscoped countries CSS modules", () => {
    const files = [
      ...walkSourceFiles(path.join(srcRoot, "app")),
      ...walkSourceFiles(path.join(srcRoot, "components")),
      ...walkSourceFiles(path.join(srcRoot, "features")).filter(
        (f) => !isExcludedImportScanPath(f)
      )
    ];

    const offenders: string[] = [];
    for (const file of files) {
      if (isExcludedImportScanPath(file)) continue;
      const hits = collectForbiddenImports(file);
      for (const hit of hits) {
        offenders.push(`${path.relative(process.cwd(), file)} → ${hit}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
