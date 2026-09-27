/**
 * V-1 · vendors.min.css "used rules" extractor + in-page A/B parity check.
 * Paste into DevTools console on a page that STILL loads /assets/css/vendors.min.css
 * (any live string route) or on an owned-split route (the A/B check injects it).
 *
 * 1) __pgsVendorScan()      — marks every vendors.min.css rule whose selector matches
 *                             the current DOM (open drawer / sidebar / popup / search
 *                             first, run once per state + band). Union kept in
 *                             localStorage "pgsVendorUsed".
 * 2) __pgsVendorEmit()      — returns the CSS text for the union, original order,
 *                             @media/@supports wrappers kept, unused @font-face /
 *                             @keyframes dropped. Diff it into
 *                             src/features/owned-css/split/pgs-owned-000-vendor-used.css
 * 3) __pgsVendorAB(label)   — on an owned-split route: injects vendors.min.css just
 *                             before /preview/owned-split, snapshots computed styles of
 *                             every element, removes it, snapshots again, returns diffs.
 *                             Expected: [] (ignore `.pp-mobile-link · visibility` —
 *                             stylesheet insertion itself retriggers that transition).
 */
(() => {
  const PROPS = ['display','position','top','left','right','bottom','width','height','margin','padding','border','borderRadius','background','backgroundColor','color','fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','textAlign','textDecoration','textTransform','verticalAlign','opacity','visibility','overflow','zIndex','flex','flexDirection','flexWrap','justifyContent','alignItems','gap','boxShadow','transform','transition','cursor','maxWidth','minWidth','boxSizing','appearance','outline','textSizeAdjust','scrollBehavior'];
  const vendorsSheet = () => [...document.styleSheets].find((s) => (s.href || '').includes('vendors.min.css'));
  const strip = (s) => s.replace(/::?-?[a-z-]+(\([^)]*\))?/gi, (m) => (/^:(first-child|last-child|nth-child|nth-of-type|first-of-type|last-of-type|only-child|not|is|where|root|empty)/i.test(m) ? m : ''));
  const matches = (sel) => {
    for (const part of sel.split(/,(?![^(]*\))/)) {
      const p = part.trim(); if (!p) continue;
      try { if (document.querySelector(p)) return true; } catch (e) { /* unsupported selector */ }
      const s = strip(p).trim().replace(/[\s>+~]+$/, '');
      if (!s) return false;
      try { if (document.querySelector(s)) return true; } catch (e) { /* ignore */ }
    }
    return false;
  };
  window.__pgsVendorScan = () => {
    const sheet = vendorsSheet(); if (!sheet) return { error: 'vendors.min.css not loaded on this page' };
    const used = new Set(JSON.parse(localStorage.getItem('pgsVendorUsed') || '[]'));
    let scanned = 0, hit = 0;
    const walk = (rules, prefix) => { for (let i = 0; i < rules.length; i++) { const r = rules[i], key = prefix + i; if (r.type === CSSRule.STYLE_RULE) { scanned++; if (matches(r.selectorText)) { used.add(key); hit++; } } else if (r.type === CSSRule.MEDIA_RULE || r.type === CSSRule.SUPPORTS_RULE) walk(r.cssRules, key + '/'); else used.add(key); } };
    walk(sheet.cssRules, '');
    localStorage.setItem('pgsVendorUsed', JSON.stringify([...used]));
    return { scanned, hit, unionSize: used.size, page: location.pathname, width: innerWidth };
  };
  window.__pgsVendorEmit = () => {
    const sheet = vendorsSheet(); if (!sheet) return { error: 'vendors.min.css not loaded on this page' };
    const used = new Set(JSON.parse(localStorage.getItem('pgsVendorUsed') || '[]'));
    const styleTexts = [], others = [];
    const walk = (rules, prefix) => { let out = ''; for (let i = 0; i < rules.length; i++) { const r = rules[i], key = prefix + i; if (r.type === CSSRule.STYLE_RULE) { if (used.has(key)) { out += r.cssText + '\n'; styleTexts.push(r.cssText); } } else if (r.type === CSSRule.MEDIA_RULE || r.type === CSSRule.SUPPORTS_RULE) { const inner = walk(r.cssRules, key + '/'); if (inner) out += (r.type === CSSRule.MEDIA_RULE ? `@media ${r.media.mediaText}` : `@supports ${r.conditionText}`) + ' {\n' + inner + '}\n'; } else others.push(r); } return out; };
    const css = walk(sheet.cssRules, ''); const all = styleTexts.join('\n'); const keep = [];
    for (const o of others) {
      if (o.type === CSSRule.FONT_FACE_RULE) { const fam = (o.cssText.match(/font-family:\s*"?([^;"]+)"?/) || [])[1]; if (fam && all.includes(fam)) keep.push(o.cssText); }
      else if (o.type === CSSRule.KEYFRAMES_RULE) { if (new RegExp('(^|[\\s,:;])' + o.name + '([\\s,;]|$)').test(all)) keep.push(o.cssText); }
    }
    return (keep.join('\n') + '\n' + css).split('\n').filter((l) => !/^(:host|\.atropos-highlight|::slotted\()/.test(l)).join('\n');
  };
  const snapshot = () => [...document.querySelectorAll('body *')].filter((e) => !/^(SCRIPT|STYLE|LINK|NOSCRIPT)$/.test(e.tagName)).map((e) => { const c = getComputedStyle(e), r = e.getBoundingClientRect(); const o = { k: e.tagName + '#' + (e.id || '') + '.' + [...e.classList].join('.'), r: [r.x, r.y, r.width, r.height].map((v) => +v.toFixed(1)) }; for (const p of PROPS) o[p] = c[p]; return o; });
  window.__pgsVendorAB = async (label = 'ab') => {
    const owned = document.querySelector('link[href="/preview/owned-split"]'); if (!owned) return { error: 'not an owned-split route' };
    const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = '/assets/css/vendors.min.css';
    owned.parentNode.insertBefore(link, owned); await new Promise((r) => { link.onload = r; setTimeout(r, 3000); }); await document.fonts.ready; await new Promise((r) => setTimeout(r, 1500));
    const a = snapshot(); link.remove(); await new Promise((r) => setTimeout(r, 1500)); const b = snapshot();
    const diffs = []; const n = Math.min(a.length, b.length); if (a.length !== b.length) diffs.push(`count ${a.length} -> ${b.length}`);
    for (let i = 0; i < n; i++) { const x = a[i], y = b[i]; for (const p of Object.keys(x)) { if (p === 'k') continue; const xv = JSON.stringify(x[p]), yv = JSON.stringify(y[p]); if (xv !== yv) { if (p === 'r' && Math.max(...x.r.map((v, j) => Math.abs(v - y.r[j]))) <= 0.5) continue; diffs.push(`${x.k} · ${p}: ${xv} -> ${yv}`); } } if (diffs.length > 40) break; }
    return { label, elements: n, diffs };
  };
  console.log('PGS vendor tools ready: __pgsVendorScan() · __pgsVendorEmit() · __pgsVendorAB(label)');
})();
