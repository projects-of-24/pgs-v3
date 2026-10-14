/**
 * Reusable CSS fork-scope audit + incremental fix.
 * Opus plan 2026-10-10 — countries-destination first; other families join via FAMILIES.
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

export const MARK = "/* pgs-country-scoped */";

export const COUNTRIES_DESTINATION_FAMILY = {
  family: "countries-destination",
  dirPattern: "countries-destination-{slug}",
  attr: "data-country",
  slugs: [
    "usa",
    "uk",
    "aus",
    "canada",
    "europe",
    "france",
    "germany",
    "mauritius",
    "nz",
    "others"
  ],
  rootClass: ".countries-destination-preview-shell"
};

/** @type {typeof COUNTRIES_DESTINATION_FAMILY[]} */
export const FAMILIES = [COUNTRIES_DESTINATION_FAMILY];

export function loadPostcss() {
  try {
    return require("postcss");
  } catch {
    const pnpm = path.join(root, "node_modules/.pnpm");
    if (!fs.existsSync(pnpm)) throw new Error("postcss not found");
    const matches = fs
      .readdirSync(pnpm)
      .filter(
        (d) =>
          d.startsWith("postcss@") &&
          fs.existsSync(path.join(pnpm, d, "node_modules/postcss"))
      )
      .sort((a, b) => compareSemver(a.slice("postcss@".length), b.slice("postcss@".length)));
    const match = matches[matches.length - 1];
    if (!match) throw new Error("postcss not found under node_modules/.pnpm");
    return require(path.join(pnpm, match, "node_modules/postcss"));
  }
}

function compareSemver(a, b) {
  const pa = a.split(".").map((x) => Number.parseInt(x, 10) || 0);
  const pb = b.split(".").map((x) => Number.parseInt(x, 10) || 0);
  const n = Math.max(pa.length, pb.length);
  for (let i = 0; i < n; i += 1) {
    const da = pa[i] ?? 0;
    const db = pb[i] ?? 0;
    if (da !== db) return da - db;
  }
  return 0;
}

const postcss = loadPostcss();

function whereAttr(family, slug) {
  return `:where([${family.attr}="${slug}"])`;
}

function inExemptAtRule(rule) {
  let p = rule.parent;
  while (p) {
    if (
      p.type === "atrule" &&
      /^(keyframes|-webkit-keyframes|font-face)$/i.test(p.name || "")
    ) {
      return true;
    }
    p = p.parent;
  }
  return false;
}

/**
 * R1 — selector starts with :where([attr="slug"]) or rootClass:where(...)
 */
export function isScopedSelector(selector, family, slug) {
  const s = selector.trim();
  if (!s) return true;
  const where = whereAttr(family, slug);
  const rootCompound = `${family.rootClass}${where}`;

  if (s === where || s.startsWith(`${where} `) || startsWithCombinator(s, where)) {
    return true;
  }
  if (
    s === rootCompound ||
    s.startsWith(`${rootCompound} `) ||
    startsWithCombinator(s, rootCompound)
  ) {
    return true;
  }
  return false;
}

function startsWithCombinator(selector, prefix) {
  // prefix followed by combinator or compound continuation without space
  if (!selector.startsWith(prefix)) return false;
  const next = selector[prefix.length];
  return next === ">" || next === "+" || next === "~" || next === "." || next === ":" || next === "[";
}

/** R3 — bare global element at selector start */
export function isGlobalElSelector(selector) {
  const s = selector.trim();
  return /^(html|body|:root|\*)($|[\s.:>+~\[#,])/.test(s);
}

/** R2 — carries another slug from the same family */
export function foreignSlugsInSelector(selector, family, slug) {
  const found = [];
  for (const other of family.slugs) {
    if (other === slug) continue;
    const needle = `[${family.attr}="${other}"]`;
    if (selector.includes(needle)) found.push(other);
  }
  return found;
}

export function scopeSelector(selector, family, slug) {
  const s = selector.trim();
  if (!s) return s;
  const where = whereAttr(family, slug);
  const root = family.rootClass;

  if (
    s === root ||
    s.startsWith(`${root}.`) ||
    s.startsWith(`${root}:`) ||
    s.startsWith(`${root}[`)
  ) {
    return s.replace(root, `${root}${where}`);
  }
  if (
    s.startsWith(`${root} `) ||
    s.startsWith(`${root}>`) ||
    s.startsWith(`${root}+`) ||
    s.startsWith(`${root}~`)
  ) {
    return s.replace(root, `${root}${where}`);
  }
  return `${where} ${s}`;
}

function rewriteForeignSlug(selector, family, slug) {
  let s = selector;
  for (const other of family.slugs) {
    if (other === slug) continue;
    const foreignWhere = whereAttr(family, other);
    const ownWhere = whereAttr(family, slug);
    if (s.includes(foreignWhere)) {
      s = s.split(foreignWhere).join(ownWhere);
    }
    // bare attribute form inside compounds
    const foreignAttr = `[${family.attr}="${other}"]`;
    const ownAttr = `[${family.attr}="${slug}"]`;
    if (s.includes(foreignAttr)) {
      s = s.split(foreignAttr).join(ownAttr);
    }
  }
  return s;
}

/**
 * @returns {{ unscoped: string[], foreign: { selector: string, slugs: string[] }[], globalEl: string[] }}
 */
export function auditCss(css, family, slug) {
  const unscoped = [];
  const foreign = [];
  const globalEl = [];
  const rootAst = postcss.parse(css);

  rootAst.walkRules((rule) => {
    if (inExemptAtRule(rule)) return;
    for (const sel of rule.selectors) {
      const s = sel.trim();
      if (!s) continue;
      const foreignList = foreignSlugsInSelector(s, family, slug);
      if (foreignList.length) {
        foreign.push({ selector: s, slugs: foreignList });
      }
      if (isGlobalElSelector(s)) {
        globalEl.push(s);
      }
      if (!isScopedSelector(s, family, slug)) {
        unscoped.push(s);
      }
    }
  });

  return { unscoped, foreign, globalEl };
}

/**
 * Scope only unscoped / foreign selectors. Idempotent when already clean.
 * @returns {{ css: string, changed: boolean }}
 */
export function scopeCssIncremental(css, family, slug) {
  const rootAst = postcss.parse(css);
  let changed = false;

  rootAst.walkRules((rule) => {
    if (inExemptAtRule(rule)) return;
    const next = rule.selectors.map((sel) => {
      let s = sel.trim();
      if (!s) return sel;
      const rewritten = rewriteForeignSlug(s, family, slug);
      if (rewritten !== s) {
        s = rewritten;
        changed = true;
      }
      if (!isScopedSelector(s, family, slug)) {
        s = scopeSelector(s, family, slug);
        changed = true;
      }
      return s;
    });
    if (next.some((n, i) => n !== rule.selectors[i])) {
      rule.selectors = next;
    }
  });

  let out = rootAst.toString();
  if (!out.includes(MARK)) {
    out = `${MARK}\n${out}`;
    changed = true;
  }

  if (!changed) {
    return { css, changed: false };
  }
  return { css: out, changed: true };
}

export function walkCssFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walkCssFiles(full, out);
    else if (name.endsWith(".css")) out.push(full);
  }
  return out;
}

export function familyForkDir(family, slug) {
  return path.join(
    root,
    "src/features",
    family.dirPattern.replace("{slug}", slug)
  );
}

export { root as repoRoot };
