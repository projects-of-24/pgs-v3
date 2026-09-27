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

Job = three passes on this page, one GO AHEAD each. The body is QC'd and untouchable; only the shell around it changes.

PASS 1 — CHROME (gate HR-<page>-1, preview only)
Replace the string chrome on LAB with the React chrome from /preview/header: <PublicHeader/> (header + drawer), string strip with <div data-pgs-sidebar-slot> + <PublicSidebarPortal/> (toggle box) + <SearchResultsStripPortal/> (search card), <PublicFooter/>. Remove getPublicHeaderHtml / getPublicFooterHtml / applyUnivMeetToHeaderHtml from the page file. Hostinger CSS stays on for this pass. Measure before/after at 1500·1100·700·390 (snippet in the pilot plan, step 1). Only allowed delta: the whole stack (strip → toggle → body → footer) moving by the header-height change (≤600 ≈ −12px, note 42). State sheet "same as /preview/header?" for tabs, bell, login/avatar, hamburger drawer, strip search, toggle box, footer button. Report, then STOP for my Preview QC.

PASS 2 — CSS (gate HR-<page>-2, preview only)
Add LAB to OWNED_SPLIT_ROUTES in src/app/layout.tsx so it loads /preview/owned-split instead of Hostinger style.css + responsive.css. Nothing else changes. Measure again at the four bands: expected delta = 0 everywhere (the split is a 1:1 copy; the only known difference is 601–767 now renders desktop rules, decision 28 — record it if the body shows it, do not fix). Footer computed-style parity snippet (pilot plan step 7) at 1500 and 390. Report, then STOP for my Preview QC.

PASS 3 — LIVE (gate HR-<page>-3)
Same page tree on PAGE + PAGE on OWNED_SPLIT_ROUTES. Live loads main.js (labs do not): check the console at 1500 and 390, sticky header on scroll, drawer, toggle box, footer button. Owner runs pnpm typecheck, pnpm lint, pnpm test, pnpm build, public-pages e2e; refresh only this page's visual-parity snapshot after my QC. Docs: decision row in docs/HEADER-CHROME-PHASE.md, MAP "Two surfaces" row, exception list in src/features/shell/OWNED-CHROME-UNLINKED.md. Commit with author project-mtfbwu <project.mtfbwu@gmail.com>; I push.

Rules that override everything: pgs-owner-lock §1 (QC'd context untouchable), §2 (state sheet), §7 (file links in every report). Never edit src/features/<body folder>/**, the LOCKED chrome files, the owned split, globals.css or Hostinger CSS. If parity needs one of those, STOP and ask. Terminal commands for me one at a time, with what to expect, and a preview link for every step.

Start with the pre-flight in HR-PAGE-PROMPT.md §B, then say "ready for GO AHEAD HR-<page>-1".
```

---

## B. Pre-flight (Opus does this before asking for GO AHEAD)

1. `MAP` says the body is CUTOVER DONE (live = modular React body). If not, the page is not ready for H-R — say so and stop.
2. Open the live page, the lab and `/preview/header` in the built-in browser; run the measuring snippet at 1500·1100·700·390; fill the BEFORE table (pilot plan §9.1 layout). Screenshots per band.
3. `grep -rn "top-space-margin\|top-space-padding\|nav.navbar" src/features/<body folder>` → must be empty (main.js hooks). Non-empty = STOP.
4. Read the current page file and list, line by line, what it does to the header/footer strings that React props must carry (login href, avatar, unreadCount, univMeet). Anything the string pipeline does that React chrome cannot (today: real notification rows → fixtures) goes in the report as a decision for the owner.
5. `git status -sb` (owner runs) must be clean; branch `feat/track-a-hr-<page>` cut from the current Track A branch.

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
