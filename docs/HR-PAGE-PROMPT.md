# H-R per-page pass — universal prompt (owner lock 2026-09-27)

One prompt for every page. No Fable plan per page: the About pilot (`docs/ABOUT-HR-PILOT-PLAN.md`) is the worked example; this file is the template. Model: **Opus** in a fresh chat per page.

---

## A. Paste this into the new chat (fill the four `<…>`)

```
Read, in this order: the "pgs be live" project memory; the skill pgs-owner-lock; docs/HR-PAGE-PROMPT.md (this template); docs/ABOUT-HR-PILOT-PLAN.md (the worked example — its page-file code and measuring snippet are the reference). Then wait.

PAGE: <live route, e.g. /finance>
LAB:  <preview route, e.g. /preview/finance>
BODY: <body component + folder, e.g. FinancePreviewShell in src/features/finance/>
MAP:  <living map, e.g. docs/FINANCE-MODULAR.md>

Job = one page, one branch, one PR. Body is QC'd; the shell changes, and the body only gets the owner's named nudges in step 3. Workflow = §G. One GO AHEAD per step.

STEP 1 — CHROME (gate HR-<page>-1, preview only)
Mount exactly what /preview/header mounts: <PublicHeader/> (signedIn, notifications, unreadCount, avatarUrl, univMeet) · <PublicStrip/> · <Body/> · <PublicFooter/>. Delete every chrome string builder from the page file (getPublicHeaderHtml, getPublicFooterHtml, buildPublicStripHtml, applyUnivMeetToHeaderHtml, applyAuthenticatedShell, applySharedPublicSidebar, applySharedHelloAspirant, dangerouslySetInnerHTML). Import only: no font/UI/size change. Measure 1500·1100·700·390 against the live ruler: only allowed delta = stack moving by the header-height change (≤600 ≈ −13). Report → my QC.

STEP 2 — CSS (gate HR-<page>-2, preview only)
Add LAB to OWNED_SPLIT_ROUTES in src/app/layout.tsx. Import only. Expected delta 0 except 601–767 (owned split renders desktop rules there, decision 28) — record it, don't fix. Report → my QC.

STEP 3 — BODY QC (owner-led, preview)
Run the §H snippets (gaps, leaks) and do the §G body items: gap pass, leak reset, iPad hero card 80%, then my named nudges band by band. Only the named piece, scoped to the named band, in the page family's CSS. Report → my QC.

STEP 4 — CUTOVER (gate HR-<page>-3)
Same tree on PAGE + PAGE on OWNED_SPLIT_ROUTES (that also skips Hostinger vendors.min.js + main.js via skipHostingerJs). Check: 200, no error overlay, CSS = owned-split only, no main.js, bell has no badge logged out, gaps + page height = preview at the four bands. Docs: decision row in docs/HEADER-CHROME-PHASE.md, MAP "Two surfaces", OWNED-CHROME-UNLINKED.md exception list. Then I commit + push and open the PR; CI (lint · typecheck · vitest · RLS · secrets · audit · build · Playwright smoke), CodeQL and CodeRabbit check it. I paste red checks / CodeRabbit findings back; we fix on the same PR; I merge.

No local test runs per page (owner 2026-09-27): the PR checks cover them; the final QA + security pass runs after all pages.

Rules that override everything: pgs-owner-lock §0 (answer the question asked), §1 (QC'd context untouchable), §2 (state sheet), §7 (file links in every report). Never edit the LOCKED chrome files, the owned split, globals.css or Hostinger CSS; the body folder only for my named nudges in step 3. If parity needs any of those, STOP and ask. Terminal commands for me one at a time, with what to expect, and a preview link for every step. No artifacts; give me context + console snippets.

Start with the pre-flight in HR-PAGE-PROMPT.md §B, then say "ready for GO AHEAD HR-<page>-1".
```

---

## B. Pre-flight (Opus does this before asking for GO AHEAD)

1. `MAP` says the body is CUTOVER DONE (live = modular React body). If not, the page is not ready for H-R — say so and stop.
2. Open the live page, the lab and `/preview/header` in the built-in browser; run the measuring snippet at 1500·1100·700·390; fill the BEFORE table (pilot plan §9.1 layout). Screenshots per band.
3. `grep -rn "top-space-margin\|top-space-padding\|nav.navbar" src/features/<body folder>` → must be empty (main.js hooks). Non-empty = STOP.
4. Read the current page file and list, line by line, what it does to the header/footer strings that React props must carry (login href, avatar, unreadCount, univMeet). Anything the string pipeline does that React chrome cannot (today: real notification rows → fixtures) goes in the report as a decision for the owner.
5. `git status -sb` (owner runs) must be clean; previous page's PR merged; branch `feat/hr-<page>` cut from `main`.

## C. Report shape — every pass ends with this, always with links

```
DONE HR-<page>-<n> — <one line: what changed, preview or live>
Preview: http://localhost:7100/<lab>   Ruler (read-only): http://localhost:7100/<route>   Chrome truth: http://localhost:7100/preview/header
Measured 1500·1100·700·390: <table>   Expected deltas: <…>   Unexpected: none/<list>
State sheet: all ✓ / <list>   typecheck ✓ lint ✓ (pass 3: test ✓ build ✓ e2e ✓ console ✓)
Decision needed: <none / …>
Owner next: QC the preview link → GO AHEAD HR-<page>-<n+1>

Where to nudge (VS Code):
| Piece | CSS file (selector) | Page / component file |
| header bar, tabs, drops | src/features/shell/public-header.css · legacy-header-breakpoints.css (header.pgs-figma-header …) | src/features/shell/public-header.tsx + *-nav-drop.tsx |
| drawer (≤1366) | src/features/shell/pgs-header-chrome-reset.css · public-header.css (.pgs-header-drawer) | src/features/shell/public-header.tsx |
| strip: #toggleBtn, #univMeet, search field | src/app/globals.css "PGS MODULAR PUBLIC CHROME" (#toggleBtn.arrow-box, --pgs-chrome-strip-pull) · src/features/shell/pgs-univmeet-search.css (.pgs-strip-tools) | src/features/shell/public-strip.ts (string) |
| open toggle box | src/features/shell/pgs-sidebar.css | src/features/shell/public-sidebar.tsx · sidebar-nav.ts |
| search results card | src/features/shell/pgs-search-results.css | src/features/shell/search-results.tsx · search-index.ts |
| footer | owned split: src/features/owned-css/split/pgs-owned-20-pgs-chrome-desk.css · 30a-pgs-mobile.css · 43-resp-elements-footer.css (.footer-bg, .copyrght) · src/app/globals.css @media (601–800) .card-bg-pruple.w-210px | src/features/shell/public-footer.tsx |
| body start / pull-up | src/features/<family>/<shell>.css (margin-top: var(--pgs-premium-shell-pull) or equivalent) | src/features/<family>/<shell>.tsx |
| body blocks | src/features/<family>/*.css (one file per block) | src/features/<family>/*.tsx |
| which CSS the page loads | src/app/layout.tsx OWNED_SPLIT_ROUTES · src/features/owned-css/split/pgs-owned-split.css (barrel order) | src/app/preview/owned-split/route.ts |
| page tree | — | src/app/<route>/page.tsx · src/app/preview/<lab>/page.tsx |
```

The table above is the standing map; the report keeps every row and adds the exact selector or line for anything that changed in this pass.

## D. Owner nudges after a report

- "This is 30px, make it 24" on a named piece = direct edit by Opus in the file the table names, then re-measure that piece only.
- A nudge that needs a LOCKED chrome file or a QC'd body rule = Opus says so and waits; the owner may edit it in VS Code/DevTools and tell Opus the value to lock.
- Owner edits in VS Code are fine; tell Opus which file so the next measurement starts from the new truth.

## E. Countries

Run passes 1–3 on the pilot country only. Then the slug-swap propagation (owner decision 2026-09-27: diff pilot → swap slug → apply to the other 8 → normalised-diff check must be zero, else STOP). Propagation is a separate GO AHEAD.

## F. Page order (Track A)

About (pilot, plan file) → Explore → Finance → Scholarship → Premium Home → Medical (USMLE/PLAB/AMC) → Non-medical → USMLE Rotation → CV Ready → Uni Tie-up → Feed → Track Progress → Upload Docs → Error 404 → pilot country → propagation. Not-modular pages (Home, Profile, Purpleboard, studentresources, …) wait for their body pass first.

## G. Page lifecycle (owner, 2026-09-27 — About pilot)

1. **Chrome import** — replace the string shell with the React shell exactly as `/preview/header` mounts it (`<PublicHeader/>` · `<PublicStrip/>` · body · `<PublicFooter/>`). Import only; no font/UI/size changes. Owner QCs.
2. **CSS** — page route on `OWNED_SPLIT_ROUTES`. Import only. Owner QCs.
3. **Body QC (owner-led)** — owner audits the body band by band and names low-level nudges (gaps, block sizes, iPad sizes). Opus edits only the named piece, scoped to the named band, in the page family's CSS; never shared tokens, chrome or the owned split. Known carry-overs to expect:
   - **801–1366 (iPad):** React compact header shows at its proportional (larger) size while the body still renders at desktop size → iPad body sizes are an owner QC item per page.
   - **Hostinger element-selector leaks** into body tags (e.g. a `<footer>` inside a block inherits `footer { padding: 90/110px 0 }`) → reset on the block's own class, per band.
   - **Gap pass (About 2026-09-27, option A):** one section gap per band, measured content to content: on screen **100 desk · 100 iPad · 72 mobile** (CSS 112 · 112 · 80, zoom .9). Implementation in the page shell CSS: token `--<page>-section-gap` per band; sections lose outer `padding-block`; `margin-top: var(gap)` on every section after the hero; hero top (univMeet gap) untouched. Then measure (snippet §H) and correct only pairs that miss: overhanging badges (add their overhang to that block's margin), empty reserved room at a block's bottom (trim it, scoped per band). Leave on purpose and report: toggled panels that reserve the taller panel's height (About online), chrome gaps (body → footer = footer's own margin).
   - **Leak check:** run snippet §H at 1500 · 1100 · 700 · 390. Structural tags (`section`, `header`, `footer`, `nav`, `article`) that still take a Hostinger element value → reset on the block's own class, all bands. Type leaks (Hostinger `h1–h6 { letter-spacing:-.5px }`, `p { margin-bottom:25px }`) → list only; they belong to the type pass.
   - **iPad hero card (About 2026-09-27):** owner cut the iPad hero card to **80% of its height** (681 → 545 CSS; width 406, text and spacing unchanged; photo 500 → 364). Tokens `--about-ipad-card-h: 545px` · `--about-ipad-media-h: 364px` in `about-hero.css` iPad block. Offer the same 80% cut on every page with the saved iPad hero card.
   - **Per page = UI only (owner 2026-09-27).** Page by page: chrome import → CSS → body QC → cutover → commit + push. No test runs per page (typecheck · lint · vitest · build · e2e · visual-parity snapshots). Those run once, in the **final QA + security pass after every page is done**, before backend work. Each page ships as its own PR (`feat/hr-<page>` → `main`): GitHub CI (`.github/workflows/ci.yml`: lint · typecheck · vitest · RLS · secrets · audit · build · Playwright smoke), CodeQL (`codeql.yml`) and CodeRabbit (`.coderabbit.yaml`) review it; owner pastes red checks / findings back, fixes land on the same PR, owner merges, next page branches from `main`. Per-page Playwright tests may be written in parallel by another agent (tests only, from the finished page + its MODULAR map; no UI edits).
4. **Done** — no Hostinger CSS, no DSIH, no `legacy/pages` string builders, no portal/string-strip references left on the page → mark page DONE, then cut over: live route gets the same tree + allowlist (pass 3).

## H. Body QC snippets (paste in Chrome console on the preview route)

**Section gaps (content to content, on-screen px):**
```js
(()=>{const body=document.querySelector('[class$="-preview-shell__body"],[class*="-preview-shell__body "]');const secs=[...body.children].filter(e=>e.getBoundingClientRect().height>0&&!/univ-gap/.test(e.className));
const vis=e=>{const cs=getComputedStyle(e),bg=cs.backgroundColor;return [...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())||/^(IMG|svg)$/.test(e.tagName)||(bg!=='rgba(0, 0, 0, 0)'&&bg!=='rgb(255, 255, 255)')||cs.borderTopWidth!=='0px'||cs.backgroundImage!=='none'};
const box=s=>{let t=1e9,b=-1e9;for(const e of s.querySelectorAll('*')){const r=e.getBoundingClientRect(),cs=getComputedStyle(e);if(r.height<1||r.width<1||cs.visibility==='hidden'||cs.opacity==='0'||!vis(e))continue;t=Math.min(t,r.top);b=Math.max(b,r.bottom)}return[s.className.split(' ')[0],t,b]};
const r=secs.map(box);console.table(r.slice(1).map((x,i)=>({pair:r[i][0]+' > '+x[0],gap:Math.round(x[1]-r[i][2])})))})()
```

**Hostinger element leaks (owned split rules on bare tags that still win):**
```js
(()=>{const sh=[...document.styleSheets].find(s=>(s.href||'').includes('owned-split'));const rules=[];const walk=(l,m)=>{for(const r of l){if(r.media){if(matchMedia(r.media.mediaText).matches)walk(r.cssRules,r.media.mediaText);continue}if(r.selectorText)rules.push([r.selectorText,m,r.style])}};walk(sh.cssRules,'');
const tag=/^(section|header|footer|article|nav|aside|h[1-6]|p|ul|ol|li|a|button|figure)$/,props=['padding-top','padding-bottom','margin-top','margin-bottom','font-size','line-height','letter-spacing'];const out=new Set();
for(const e of document.querySelectorAll('[class*="-preview-shell"] *')){const cs=getComputedStyle(e);for(const [sel,m,st] of rules){if(!sel.split(',').map(s=>s.trim()).filter(s=>tag.test(s)).some(s=>e.matches(s)))continue;for(const p of props){const v=st.getPropertyValue(p);if(v&&!v.includes('var(')&&cs.getPropertyValue(p)===v)out.add(`${e.className.toString().split(' ')[0]} <${e.tagName.toLowerCase()}> ${p}:${v} [${sel.slice(0,30)}${m?' @'+m:''}]`)}}}console.log([...out].join('\n')||'no leaks')})()
```
