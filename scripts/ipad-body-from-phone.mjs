#!/usr/bin/env node
// Generates the iPad (601-1366) body CSS from everything that styles a 600px phone: top-level base rules + @media blocks that apply at 600px.
// Usage: node scripts/ipad-body-from-phone.mjs --scope ".x" --out out.css [--skip-shell-gap shell.css] a.css b.css ...
import fs from "node:fs";

const args = process.argv.slice(2);
let scope = "", out = "", shell = "", fixedRef = 0;
const files = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--scope") scope = args[++i];
  else if (args[i] === "--out") out = args[++i];
  else if (args[i] === "--skip-shell-gap") shell = args[++i];
  else if (args[i] === "--fixed-ref") fixedRef = parseFloat(args[++i]);
  else files.push(args[i]);
}
if (!scope || !out || !files.length) {
  console.error("usage: --scope <sel> --out <file> [--skip-shell-gap <file>] <css files...>");
  process.exit(1);
}
const norm = (p) => p.replace(/^\.\//, "");

const K = (n) => `${parseFloat((n * 100 / 666.67).toFixed(3))}cqi`;
const SKIP = /^(border(?!-radius$)|outline|box-shadow|text-shadow|letter-spacing|transition|animation|z-index|opacity|content)/;

function convertValue(prop, value) {
  if (fixedRef) {
    // fixed phone-size mode: px unchanged, vw -> px at the ref width, cqi/%/em/rem unchanged, no font floor
    return value.replace(/(?<![\w.])(-?\d*\.?\d+)vw(?![\w])/g, (m, num) => `${parseFloat((parseFloat(num) * fixedRef / 100).toFixed(2))}px`);
  }
  if (SKIP.test(prop)) return value;
  let changed = false;
  value = value.replace(/var\(\s*--pgs-type-floor\s*,\s*(\d*\.?\d+)px\s*\)/g, (m, num) => {
    const n = parseFloat(num);
    if (n <= 2) return `${num}px`;
    changed = true;
    return K(n);
  });
  const v = value.replace(/(?<![\w.])(-?)(\d*\.?\d+)px(?![\w])/g, (m, sign, num) => {
    const n = parseFloat(num);
    if (n <= 2) return m;
    changed = true;
    return (sign ? "-" : "") + K(n);
  }).replace(/(?<![\w.])(-?\d*\.?\d+)vw(?![\w])/g, (m, num) => {
    changed = true;
    return `${num}cqi`;
  });
  if (prop === "font-size" && changed) {
    const imp = /\s*!important\s*$/.exec(v);
    const core = imp ? v.slice(0, imp.index) : v;
    return `max(15px, ${core})${imp ? " !important" : ""}`;
  }
  return v;
}

function stripComments(s) { return s.replace(/\/\*[\s\S]*?\*\//g, ""); }

// split on a separator char at paren/bracket/quote depth 0
function splitTop(s, sep) {
  const parts = []; let d = 0, q = null, cur = "";
  for (const c of s) {
    if (q) { cur += c; if (c === q) q = null; continue; }
    if (c === '"' || c === "'") { q = c; cur += c; continue; }
    if (c === "(" || c === "[") d++;
    if (c === ")" || c === "]") d--;
    if (c === sep && d === 0) { parts.push(cur); cur = ""; continue; }
    cur += c;
  }
  parts.push(cur);
  return parts;
}

function matchBrace(s, open) { // index of the } matching s[open] === "{"
  let d = 0;
  for (let i = open; i < s.length; i++) {
    if (s[i] === "{") d++;
    else if (s[i] === "}" && --d === 0) return i;
  }
  throw new Error("unbalanced braces");
}

// Does a @media prelude apply at a 600px-wide screen? Only (max-width: N>=600) / (min-width: N<=600) joined by "and".
function appliesAt600(prelude) {
  const q = prelude.replace(/^@media\s*/i, "").trim();
  if (!q || q.includes(",")) return false;
  for (const part of q.split(/\s+and\s+/i)) {
    const m = /^\(\s*(max|min)-width\s*:\s*(\d+(?:\.\d+)?)px\s*\)$/i.exec(part.trim());
    if (!m) return false;
    const n = parseFloat(m[2]);
    const REF = fixedRef || 600;
    if (m[1].toLowerCase() === "max" ? n < REF : n > REF) return false;
  }
  return true;
}

// Top-level items in source order: style rules, and @media blocks (other at-rules are skipped).
function topLevel(css) {
  const items = []; let i = 0;
  while (i < css.length) {
    while (i < css.length && /\s/.test(css[i])) i++;
    if (i >= css.length) break;
    if (css[i] === "}") { i++; continue; }
    const semi = css.indexOf(";", i), open = css.indexOf("{", i);
    if (css[i] === "@" && semi >= 0 && (open < 0 || semi < open)) { i = semi + 1; continue; }
    if (open < 0) break;
    const prelude = css.slice(i, open).trim();
    const close = matchBrace(css, open);
    if (prelude.startsWith("@")) {
      if (/^@media\b/i.test(prelude)) items.push({ type: "media", prelude, query: prelude.replace(/^@media\s*/i, "").trim(), inner: css.slice(open + 1, close) });
    } else {
      items.push({ type: "rule", prelude, body: css.slice(open + 1, close) });
    }
    i = close + 1;
  }
  return items;
}

function parseRules(inner, file) {
  const rules = []; let i = 0;
  while (i < inner.length) {
    const open = inner.indexOf("{", i);
    if (open < 0) break;
    const prelude = inner.slice(i, open).trim();
    const close = matchBrace(inner, open);
    if (prelude.startsWith("@")) { console.error(`${file}: skipped nested at-rule in media block: ${prelude}`); i = close + 1; continue; }
    const body = inner.slice(open + 1, close);
    if (body.includes("{")) throw new Error(`${file}: nested block in rule: ${prelude}`);
    rules.push({ prelude, body });
    i = close + 1;
  }
  return rules;
}

const scopeName = scope.replace(/^\./, "");
function isShellSelector(sel) {
  sel = sel.trim();
  return sel === scope || sel.endsWith(`${scope}__body`) || sel.endsWith(`${scope}__univ-gap`) || sel.includes(`${scope}__body >`);
}
function prefixSel(sel) {
  if (sel.startsWith(scope) && !/[\w-]/.test(sel[scope.length] ?? " ")) return sel;
  return `${scope} ${sel}`;
}

function emit(rule) {
  const sels = splitTop(rule.prelude, ",").map((s) => s.trim()).filter(Boolean).map(prefixSel);
  const decls = splitTop(rule.body, ";").map((d) => d.trim()).filter(Boolean).map((d) => {
    const k = d.indexOf(":");
    const prop = d.slice(0, k).trim(), val = d.slice(k + 1).trim();
    return `    ${prop}: ${convertValue(prop.toLowerCase(), val)};`;
  });
  return `  ${sels.join(",\n  ")} {\n${decls.map((l) => "  " + l.slice(0)).join("\n").replace(/^ {6}/gm, "    ")}\n  }`;
}

let total = 0;
const sections = [], report = [], excluded = [], skippedMedia = [];
for (const f of files) {
  const css = stripComments(fs.readFileSync(f, "utf8"));
  const isShell = shell && norm(f) === norm(shell);
  let firstPhoneSeen = false;
  const chunks = []; // { label, rules }
  let baseChunk = null;
  for (const it of topLevel(css)) {
    if (it.type === "rule") {
      if (!baseChunk) { baseChunk = { label: "(base)", kind: "base", rules: [] }; chunks.push(baseChunk); }
      baseChunk.rules.push({ prelude: it.prelude, body: it.body });
      continue;
    }
    baseChunk = null;
    const is600 = /^\(\s*max-width\s*:\s*600px\s*\)$/.test(it.query);
    if (isShell) {
      if (!(is600 && !firstPhoneSeen)) { skippedMedia.push(`${f} ${it.query}`); continue; }
      firstPhoneSeen = true;
    } else if (!appliesAt600(it.prelude)) { skippedMedia.push(`${f} ${it.query}`); continue; }
    chunks.push({ label: it.query, kind: "media", rules: parseRules(it.inner, f) });
  }
  let base = 0, media = 0;
  for (const c of chunks) {
    const kept = [];
    for (const r of c.rules) {
      const sels = splitTop(r.prelude, ",").map((x) => x.trim()).filter(Boolean);
      const bad = sels.filter(isShellSelector);
      if (bad.length) { excluded.push(`${f} ${c.label}: ${r.prelude.replace(/\s+/g, " ")}`); continue; }
      kept.push(r);
    }
    if (!kept.length) continue;
    total += kept.length;
    if (c.kind === "base") base += kept.length; else media += kept.length;
    sections.push(`  /* --- ${f} ${c.label} --- */\n${kept.map(emit).join("\n\n")}`);
  }
  report.push({ f, base, media });
}

const header = fixedRef ? `/*
 * iPad 601-1366 body — GENERATED by scripts/ipad-body-from-phone.mjs (fixed phone-size mode, ref ${fixedRef}) from everything that styles the approved phone pass (base rules + phone media that apply at ${fixedRef}px). Phone layout at phone size (px unchanged, vw -> px at ${fixedRef}), placed/rearranged by premium-usmle-preview-shell.css (owner rule iPad-C, 2026-10-02). Do not hand-edit: re-run the script. Source files: ${report.filter((r) => r.base + r.media).map((r) => r.f).join(", ")}. Generated: ${new Date().toISOString()}.
 */
` : `/*
 * iPad 601-1366 body — GENERATED by scripts/ipad-body-from-phone.mjs from everything that styles the approved phone pass (base rules + phone media) (owner rule iPad-B, 2026-10-02). Each block is the phone layout at 600px wide, enlarged uniformly with the block width (px and vw -> cqi of the block; block width = min(100%, 933.33px), i.e. 1.0x to 1.4x the phone). Same positions and gaps as the phone, just bigger. Borders/outlines/shadows/letter-spacing and <=2px values not scaled; font-size never below 15px. Do not hand-edit: re-run the script. Source files: ${report.filter((r) => r.base + r.media).map((r) => r.f).join(", ")}. Generated: ${new Date().toISOString()}.
 */
`;
fs.writeFileSync(out, `${header}@media (min-width: 601px) and (max-width: 1366px) {\n${sections.join("\n\n")}\n}\n`);
for (const r of report) console.log(`${r.f}: base ${r.base}, media ${r.media}`);
console.log(`total rules: ${total}`);
console.log(`excluded (shell selectors): ${excluded.length}`); for (const e of excluded) console.log("  " + e);
console.log(`skipped @media: ${skippedMedia.length}`); for (const e of skippedMedia) console.log("  " + e);
