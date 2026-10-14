/**
 * Guard: Premium Medical tracks (USMLE / PLAB / AMC) keep separate class
 * prefixes — no countries-style fork needed (Opus 2026-10-10).
 */
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { loadPostcss } from "../../scripts/lib/css-fork-scope.mjs";

const postcss = loadPostcss();
const featuresRoot = path.join(process.cwd(), "src/features");

const SHARED_BLOCKS = [
  ".premium-expense",
  ".premium-enroll",
  ".premium-questions",
  ".premium-faq",
  ".premium-highlights",
  ".support-hub",
  ".pgs-picks",
  ".outro-cta"
] as const;

const TRACKS = [
  {
    id: "usmle",
    dirs: ["premium-usmle", "premium-usmle-2"],
    own: [".premium-usmle", ".premium-usmle-2"] as const,
    foreign: [".premium-plab", ".premium-amc"] as const
  },
  {
    id: "plab",
    dirs: ["premium-plab", "premium-plab-2"],
    own: [".premium-plab", ".premium-plab-2"] as const,
    foreign: [".premium-usmle", ".premium-amc"] as const
  },
  {
    id: "amc",
    dirs: ["premium-amc", "premium-amc-2"],
    own: [".premium-amc", ".premium-amc-2"] as const,
    foreign: [".premium-usmle", ".premium-plab"] as const
  }
] as const;

function walkCss(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walkCss(full, out);
    else if (name.endsWith(".css")) out.push(full);
  }
  return out;
}

function inExemptAtRule(rule: { parent?: unknown }): boolean {
  let p = rule.parent as { type?: string; name?: string; parent?: unknown } | undefined;
  while (p) {
    if (
      p.type === "atrule" &&
      /^(keyframes|-webkit-keyframes|font-face)$/i.test(p.name || "")
    ) {
      return true;
    }
    p = p.parent as typeof p;
  }
  return false;
}

function startsWithOwn(selector: string, own: readonly string[]): boolean {
  const s = selector.trim();
  return own.some(
    (prefix) =>
      s === prefix ||
      s.startsWith(`${prefix}-`) ||
      s.startsWith(`${prefix}.`) ||
      s.startsWith(`${prefix}:`) ||
      s.startsWith(`${prefix}[`) ||
      s.startsWith(`${prefix} `) ||
      s.startsWith(`${prefix}>`) ||
      s.startsWith(`${prefix}+`) ||
      s.startsWith(`${prefix}~`)
  );
}

function mentionsPrefix(selector: string, prefix: string): boolean {
  // Word-ish class match: .premium-plab or .premium-plab-2… not .premium-plabber
  const re = new RegExp(
    `${prefix.replace(/\./g, "\\.")}(?![a-zA-Z0-9])`
  );
  return re.test(selector);
}

function touchesShared(selector: string): boolean {
  return SHARED_BLOCKS.some((block) => mentionsPrefix(selector, block));
}

function auditTrackCss(css: string, own: readonly string[], foreign: readonly string[]) {
  const unscoped: string[] = [];
  const foreignHits: string[] = [];
  const bareShared: string[] = [];
  const root = postcss.parse(css);

  root.walkRules((rule: { parent?: unknown; selectors: string[] }) => {
    if (inExemptAtRule(rule)) return;
    for (const sel of rule.selectors) {
      const s = sel.trim();
      if (!s) continue;
      if (!startsWithOwn(s, own)) {
        unscoped.push(s);
      }
      for (const f of foreign) {
        if (mentionsPrefix(s, f)) foreignHits.push(s);
      }
      if (touchesShared(s) && !startsWithOwn(s, own)) {
        bareShared.push(s);
      }
    }
  });

  return { unscoped, foreignHits, bareShared };
}

describe("premium medical CSS isolation", () => {
  for (const track of TRACKS) {
    it(`${track.id}: selectors own-prefixed; no foreign track; shared overrides wrapped`, () => {
      const files = track.dirs.flatMap((d) =>
        walkCss(path.join(featuresRoot, d))
      );
      expect(files.length, `${track.id} css files`).toBeGreaterThan(0);

      for (const file of files) {
        const css = fs.readFileSync(file, "utf8");
        const { unscoped, foreignHits, bareShared } = auditTrackCss(
          css,
          track.own,
          track.foreign
        );
        expect(unscoped, file).toEqual([]);
        expect(foreignHits, file).toEqual([]);
        expect(bareShared, file).toEqual([]);
      }
    });
  }

  it("audit rejects bare shared override and foreign prefix", () => {
    const bare = auditTrackCss(
      ".premium-expense{color:red}",
      [".premium-plab", ".premium-plab-2"],
      [".premium-usmle", ".premium-amc"]
    );
    expect(bare.unscoped.length).toBeGreaterThan(0);
    expect(bare.bareShared.length).toBeGreaterThan(0);

    const foreign = auditTrackCss(
      ".premium-plab-2-shell .premium-usmle-hero{color:red}",
      [".premium-plab", ".premium-plab-2"],
      [".premium-usmle", ".premium-amc"]
    );
    expect(foreign.foreignHits.length).toBeGreaterThan(0);
  });
});
