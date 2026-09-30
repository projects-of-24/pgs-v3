#!/usr/bin/env node
/**
 * Owned CSS split verifier (all passes).
 *
 * Checks that the owned split file(s) (+ optional parked file(s)) are a 1:1 copy of a
 * line range of a Hostinger source stylesheet, in the same order.
 *
 * Usage:
 *   node scripts/owned-css-split-verify.mjs \
 *     --source public/assets/css/style.css \
 *     --lines 1-228,33264-33268 \
 *     --owned src/features/owned-css/split/a.css,src/features/owned-css/split/b.css \
 *     [--parked src/features/owned-css/split/parked/p.css]
 *     [--media-map "max-width: 767px=max-width: 600px"]   (repeatable)
 *
 * Checks:
 *   - rule / at-rule / declaration / !important counts: owned + parked == source
 *   - ordered (selector, prop, value, important) sequence: owned == source minus parked
 *   - normalization: whitespace collapsed, comments ignored,
 *     url(../images/X) == url(/assets/images/X), url(../fonts/X) == url(/assets/fonts/X)
 *   - --media-map "<source params>=<owned params>": on the OWNED/PARKED side only, @media at-rules whose
 *     params equal <owned params> are treated as <source params> before comparison (rewrite count is printed).
 *   - wrapper split: if the number of root-level @media wrappers differs (source = one wrapper, owned = the
 *     same wrapper repeated once per file), wrappers are compared by their params only and reported
 *     separately; every rule/decl still carries its media params in the ordered sequence. When the wrapper
 *     counts are equal (all earlier passes) behaviour is unchanged.
 * Exit code 1 on FAIL. Uses the postcss already in node_modules (never installs).
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import process from 'node:process';

const require = createRequire(import.meta.url);

function loadPostcss() {
  try {
    return require('postcss');
  } catch {
    // pnpm layout: node_modules/.pnpm/postcss@x.y.z/node_modules/postcss
    const pnpmDir = path.resolve(process.cwd(), 'node_modules/.pnpm');
    if (existsSync(pnpmDir)) {
      const candidates = readdirSync(pnpmDir)
        .filter((d) => /^postcss@\d/.test(d))
        .sort()
        .reverse();
      for (const dir of candidates) {
        const p = path.join(pnpmDir, dir, 'node_modules/postcss');
        if (existsSync(p)) return require(p);
      }
    }
    console.error('FAIL: postcss not found in node_modules (do not install; check pnpm store).');
    process.exit(1);
  }
}

function parseArgs(argv) {
  const out = { source: null, lines: null, owned: [], parked: [], mediaMap: new Map() };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    const next = () => argv[++i];
    if (a === '--source') out.source = next();
    else if (a === '--lines') out.lines = next();
    else if (a === '--owned') out.owned = next().split(',').filter(Boolean);
    else if (a === '--parked') out.parked = next().split(',').filter(Boolean);
    else if (a === '--media-map') {
      const m = next().match(/^(.+?)=(.+)$/);
      if (!m) {
        console.error('Bad --media-map, expected "<source params>=<owned params>"');
        process.exit(1);
      }
      // accept the params with or without their outer parentheses
      const from = ws(m[2]).replace(/^\((.*)\)$/, '$1');
      const to = ws(m[1]).replace(/^\((.*)\)$/, '$1');
      out.mediaMap.set(from, to);
      out.mediaMap.set(`(${from})`, `(${to})`);
    } else if (a === '--help' || a === '-h') {
      console.log(readFileSync(new URL(import.meta.url)).toString().split('*/')[0]);
      process.exit(0);
    } else {
      console.error(`Unknown arg: ${a}`);
      process.exit(1);
    }
  }
  if (!out.source || !out.lines || out.owned.length === 0) {
    console.error('Required: --source <file> --lines <a-b[,c-d]> --owned <file[,file]>');
    process.exit(1);
  }
  return out;
}

function extractLines(file, spec) {
  const lines = readFileSync(file, 'utf8').split('\n');
  const chunks = [];
  for (const range of spec.split(',')) {
    const m = range.trim().match(/^(\d+)-(\d+)$/);
    if (!m) throw new Error(`Bad range: ${range}`);
    const a = Number(m[1]);
    const b = Number(m[2]);
    if (a < 1 || b < a || b > lines.length) throw new Error(`Range out of bounds: ${range} (file has ${lines.length} lines)`);
    chunks.push(lines.slice(a - 1, b).join('\n'));
  }
  return chunks.join('\n');
}

const ws = (s) => s.replace(/\s+/g, ' ').trim();

function normUrl(v) {
  return v
    .replace(/url\((['"]?)\.\.\/images\//g, 'url($1/assets/images/')
    .replace(/url\((['"]?)\.\.\/fonts\//g, 'url($1/assets/fonts/');
}

/**
 * Flatten a postcss root into an ordered list of comparable keys.
 * mediaMap (owned/parked side only): Map<ownedParams, sourceParams> applied to @media params.
 * Root-level @media wrappers are keyed `wrapper …` so they can be compared separately when split.
 */
function flatten(root, mediaMap = new Map(), stats = { mediaRewrites: 0, wrappers: [] }) {
  const seq = [];
  const counts = { rules: 0, atrules: 0, decls: 0, important: 0 };
  const params = (at) => {
    const p = ws(at.params);
    return at.name === 'media' && mediaMap.has(p) ? mediaMap.get(p) : p;
  };
  const ctxOf = (node) => {
    const parts = [];
    let p = node.parent;
    while (p && p.type !== 'root') {
      if (p.type === 'rule') parts.unshift(ws(p.selector));
      else if (p.type === 'atrule') parts.unshift(`@${p.name} ${params(p)}`.trim());
      p = p.parent;
    }
    return parts.join(' > ');
  };
  root.walk((node) => {
    if (node.type === 'comment') return;
    if (node.type === 'rule') {
      counts.rules += 1;
      const ctx = ctxOf(node);
      seq.push(`rule ${ctx ? `${ctx} > ` : ''}${ws(node.selector)}`);
    } else if (node.type === 'atrule') {
      counts.atrules += 1;
      const ctx = ctxOf(node);
      const p = params(node);
      if (node.name === 'media' && p !== ws(node.params)) stats.mediaRewrites += 1;
      const isWrapper = node.name === 'media' && node.parent && node.parent.type === 'root';
      if (isWrapper) stats.wrappers.push(p);
      seq.push(`${isWrapper ? 'wrapper' : 'atrule'} ${ctx ? `${ctx} > ` : ''}@${node.name} ${normUrl(p)}`.trim());
    } else if (node.type === 'decl') {
      counts.decls += 1;
      if (node.important) counts.important += 1;
      seq.push(`decl ${ctxOf(node)} :: ${ws(node.prop)}: ${normUrl(ws(node.value))}${node.important ? ' !important' : ''}`);
    }
  });
  return { seq, counts, stats };
}

function parseFiles(postcss, files, label, mediaMap) {
  let seq = [];
  const counts = { rules: 0, atrules: 0, decls: 0, important: 0 };
  const stats = { mediaRewrites: 0, wrappers: [] };
  for (const f of files) {
    const css = readFileSync(f, 'utf8');
    const root = postcss.parse(css, { from: f });
    const r = flatten(root, mediaMap, stats);
    seq = seq.concat(r.seq);
    for (const k of Object.keys(counts)) counts[k] += r.counts[k];
  }
  return { seq, counts, stats, label };
}

function addCounts(a, b) {
  const out = {};
  for (const k of Object.keys(a)) out[k] = a[k] + b[k];
  return out;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const postcss = loadPostcss();

  const sourceCss = extractLines(args.source, args.lines);
  const source = flatten(postcss.parse(sourceCss, { from: `${args.source}[${args.lines}]` }));
  const owned = parseFiles(postcss, args.owned, 'owned', args.mediaMap);
  const parked = parseFiles(postcss, args.parked, 'parked', args.mediaMap);

  const failures = [];

  // 0. wrapper split mode: source has N root-level @media wrappers, owned+parked has a different number
  //    (one source wrapper repeated per owned file). Wrappers then compared by params only.
  const srcWrappers = source.stats.wrappers;
  const outWrappers = owned.stats.wrappers.concat(parked.stats.wrappers);
  const splitMode = srcWrappers.length !== outWrappers.length;
  const isWrapper = (k) => k.startsWith('wrapper ');
  if (splitMode) {
    const allowed = new Set(srcWrappers);
    for (const p of new Set(outWrappers)) {
      if (!allowed.has(p)) failures.push(`wrapper params not in source: @media ${p} (source wrappers: ${[...allowed].map((s) => `@media ${s}`).join(', ') || 'none'})`);
    }
  }
  const dropWrappers = (seq) => (splitMode ? seq.filter((k) => !isWrapper(k)) : seq);
  const srcSeq = dropWrappers(source.seq);
  const ownedSeq = dropWrappers(owned.seq);
  const parkedSeq = dropWrappers(parked.seq);

  // 1. counts
  const combined = addCounts(owned.counts, parked.counts);
  for (const k of Object.keys(source.counts)) {
    let s = source.counts[k];
    let c = combined[k];
    if (splitMode && k === 'atrules') {
      s -= srcWrappers.length;
      c -= outWrappers.length;
    }
    if (c !== s) {
      failures.push(`count ${k}${splitMode && k === 'atrules' ? ' (excluding wrappers)' : ''}: source=${s} owned+parked=${c} (owned=${owned.counts[k]}, parked=${parked.counts[k]})`);
    }
  }

  // 2. order: owned == source minus parked (parked entries removed in order, first occurrence)
  const parkedPool = new Map();
  for (const k of parkedSeq) parkedPool.set(k, (parkedPool.get(k) ?? 0) + 1);
  const expected = [];
  for (const k of srcSeq) {
    const n = parkedPool.get(k) ?? 0;
    if (n > 0) parkedPool.set(k, n - 1);
    else expected.push(k);
  }
  const unconsumed = [...parkedPool.entries()].filter(([, n]) => n > 0);
  for (const [k, n] of unconsumed) failures.push(`parked entry not found in source (x${n}): ${k}`);

  const mismatches = [];
  const max = Math.max(expected.length, ownedSeq.length);
  for (let i = 0; i < max; i += 1) {
    if (expected[i] !== ownedSeq[i]) {
      mismatches.push({ i, expected: expected[i] ?? '<none>', owned: ownedSeq[i] ?? '<none>' });
      if (mismatches.length >= 10) break;
    }
  }
  if (mismatches.length) {
    failures.push(`ordered sequence mismatch (expected ${expected.length} entries, owned has ${ownedSeq.length})`);
  }

  // report
  const fmt = (c) => `rules=${c.rules} at-rules=${c.atrules} decls=${c.decls} !important=${c.important}`;
  console.log('Owned CSS split verifier');
  console.log(`  source : ${args.source} [${args.lines}]  ${fmt(source.counts)}`);
  console.log(`  owned  : ${args.owned.join(', ')}  ${fmt(owned.counts)}`);
  console.log(`  parked : ${args.parked.length ? args.parked.join(', ') : '(none)'}  ${fmt(parked.counts)}`);
  console.log(`  owned+parked : ${fmt(combined)}`);
  if (args.mediaMap.size) {
    const maps = [...args.mediaMap.entries()]
      .filter(([o]) => o.startsWith('('))
      .map(([o, s]) => `owned @media ${o} counted as source @media ${s}`)
      .join('; ');
    console.log(`  media-map : ${maps}  rewrote ${owned.stats.mediaRewrites + parked.stats.mediaRewrites} at-rule(s) (owned=${owned.stats.mediaRewrites}, parked=${parked.stats.mediaRewrites})`);
  }
  if (splitMode) {
    console.log(`  wrapper split : source root @media wrappers=${srcWrappers.length} owned=${owned.stats.wrappers.length} parked=${parked.stats.wrappers.length} — wrappers compared by params only`);
  }
  console.log(`  ordered entries: source=${srcSeq.length} owned=${ownedSeq.length} parked=${parkedSeq.length} expected(owned)=${expected.length}`);

  if (failures.length === 0) {
    console.log('RESULT: PASS');
    process.exit(0);
  }
  console.log('RESULT: FAIL');
  for (const f of failures) console.log(`  - ${f}`);
  for (const m of mismatches) {
    console.log(`  @${m.i}\n     expected: ${m.expected}\n     owned   : ${m.owned}`);
  }
  process.exit(1);
}

main();
