---
name: pgs-owner-lock-claude
description: >-
  Owner locks captured during the Cursor → Claude Code handover (2026-09-27),
  updated after the About H-R pilot. Read on every PGS task, after pgs-master-workflow.
  QC'd context is untouchable; one UI across four bands; PGS type scale over Figma px;
  fake context in backend shape; preview labs first; file links in every report;
  H-R per page = chrome → CSS → body QC → cutover → one PR checked by CI/CodeQL/CodeRabbit.
---

# PGS — owner lock (Claude Code era, updated 2026-09-27 after the About pilot)

Repo: `/Users/24potatoes/Documents/GitHub/pgs-v3`. Read first: `.cursor/skills/pgs-master-workflow/SKILL.md`, then `.cursor/skills/pgs-owner-lock-claude/SKILL.md` (repo copy of this), then `docs/HR-PAGE-PROMPT.md` (§A prompt, §G page lifecycle, §H console snippets), then the page's living map (`docs/*-MODULAR.md`, `docs/HEADER-CHROME-PHASE.md`). Project memory: `claude/pgs-v3-cursor-handover-memory.md` in the "pgs be live" Project.

## 0. Answer the question asked
- When the owner asks a direct question, answer **Yes / No / Maybe first**, then one or two lines of context for that answer only. Do not widen the answer to neighbouring topics the owner did not ask about. A caveat that changes the yes/no goes in those lines; anything else waits until asked.
- Work with the owner, step by step: one step, report, stop. No artifacts or HTML boards unless asked; give context in chat plus a Chrome console snippet the owner can run.

## 1. QC'd context is untouchable
- The owner spent months QC'ing the chrome and every React page body. When a block changes, ADD or REPLACE only the named piece; touch only what that piece affects. Never restyle the rest while in the file.
- Measure the QC'd rendering first (positions, sizes, gaps, fonts at 1500 · 1100 · 700 · 390); prove parity after on everything not named.
- New styling goes under its own scope/media query, never onto shared QC'd selectors or shared tokens (e.g. `--pgs-premium-desk-univ-gap` is shared with Premium; About's +30 went on About's own spacer). If parity needs a QC'd rule to change, STOP and ask.
- Import steps are import only: no font, UI or size changes. The owned CSS carries the look.

## 2. State sheet before every change
- The owned split is a 1:1 copy of Hostinger, so inherited behaviour (hover opacity, transitions, focus, active, sticky touch hover) comes with it. Before implementing a new piece, write a state sheet: rest · hover · pressed/active · focus · open · closed · touch (sticky hover) · disabled/loading — with "what the 1:1 copy does today" and "what the owner will see after", per band. Owner approves, then build.
- Inherited behaviour that is wrong for the new piece is overridden on the new piece only (scoped selector), never by editing the 1:1 copy.

## 3. One UI across four bands
- `>1366` desktop · `801–1366` wide iPad · `601–800` compact iPad · `≤600` mobile. Never 767 (`src/features/shell/pgs-breakpoints.ts`). Known: the owned split renders desktop rules at 601–767 (decision 28) — record, don't fix.
- Same UI everywhere; only arrangement, font size, UI sizes change. If a band cannot be derived, STOP and ask.
- On 801–1366 the React compact header shows at its proportional (larger) size while bodies still render at desktop size: iPad body sizes are an owner QC item per page.

## 4. Type = PGS scale, Figma = visual reference
- Sizes the owner names per band win over Figma px. `html{zoom:.9}` stays on: CSS 30px = 27px on screen; `getBoundingClientRect` reports on-screen px. When the owner names a px without "as seen", apply it in CSS and state the on-screen value.
- Floor `--pgs-type-floor` 16px; a site-wide type scale is a later final-draft pass, not mid-QC.

## 5. Fake context in backend shape
- Backend context exists → use it. Doesn't → ask, then fake rows in the exact backend contract shape (field names, limits, ranking). Every fake row = a case the backend must answer later.
- Bell (decision 50): logged out → bell only, no badge, no dropdown. Logged in with 0 → bell only. Logged in with N → unread badge + real rows. Lab fake login → fixtures.

## 6. Preview labs first
- Build/QC on `/preview/<lab>` (`/preview/header` = chrome truth); live routes only on the cutover gate. Live pages may be opened read-only as a ruler; say so.

## 7. File links in every build report
- List the CSS file and the page/component file for every change, as repo paths with selector or line, so the owner can nudge in VS Code without tokens. Preview link for every step. Terminal commands one at a time with what to expect, and say they run in the owner's Mac Terminal from the `pgs-v3` folder.
- The standing "where to nudge" table lives in `docs/HR-PAGE-PROMPT.md` §C.

## 8. Gate, model and PR discipline
- Propose → `GO AHEAD <gate>` → one gate → measure → owner Preview QC → stop. Named QC nudge = direct edit.
- Opus plans new bands, blocks, contracts, audits, CSS splits. Sonnet 5.5 or this agent builds/nudges/docs. **The H-R per-page pass needs no Opus plan**: About is the worked example; `docs/HR-PAGE-PROMPT.md` is the universal prompt. State the model call at every block.
- **One page = one branch = one PR** (`feat/hr-<page>` from `main`). Owner commits (author `project-mtfbwu <project.mtfbwu@gmail.com>`), pushes and opens the PR. GitHub checks it: CI `.github/workflows/ci.yml` (lint · typecheck · vitest · RLS · secret scan · audit · build · Playwright smoke), CodeQL `codeql.yml`, CodeRabbit `.coderabbit.yaml`. Owner pastes red checks / findings back; fixes land on the same PR; owner merges; next page branches from `main`.
- **No local test runs per page.** Typecheck/lint/tests/snapshots are the PR's job; the full QA + security pass runs once after all pages, before backend work. Don't ask the owner to run them per page. Per-page Playwright tests may be written in parallel by another agent (tests only, no UI edits).
- Claude's Mac-side shell cannot delete files, commit or push; a `git status` from it may leave a stale `.git/index.lock` — tell the owner to `rm -f .git/index.lock`.

## 9. H-R per-page lifecycle (universal, one fresh Sonnet 5.5 / implementer chat per page) — `docs/HR-PAGE-PROMPT.md` §A/§G
- Pre-flight (§B): MAP says body CUTOVER DONE; BEFORE numbers at four bands on live + lab + `/preview/header`; grep body folder for `top-space-margin|top-space-padding|nav.navbar` (must be empty); previous PR merged.
- **Step 1 CHROME** (preview): mount exactly what `/preview/header` mounts — `<PublicHeader/>` (signedIn · notifications · unreadCount · avatarUrl · univMeet) · `<PublicStrip/>` (`public-strip-react.tsx`) · body · `<PublicFooter/>`. Delete every chrome string builder and `dangerouslySetInnerHTML` from the page file. Allowed delta: stack moving by the header-height change (≤600 ≈ −13). Owner QC.
- **Step 2 CSS** (preview): route on `OWNED_SPLIT_ROUTES` in `src/app/layout.tsx`. Expected delta 0 (601–767 recorded). Owner QC.
- **Step 3 BODY QC** (owner-led, preview), using the §H snippets:
  - Gap pass (GAP LOCK 2026-10-03): CSS **desk 100 · iPad 60 · phone 80**. Living: `docs/FRONTEND-GAP-ANALYSIS.md`. Shell token `--<page>-section-gap`; sections lose outer `padding-block`; `margin-top` on every section after the hero; hero top untouched. Correct only pairs that miss (overhanging badges, empty reserved room); leave and report toggled panels that reserve height and the footer's own chrome margin. Do not tighten gaps mid Figma→code build.
  - Leak check: bare tags inside blocks (`footer`, `section`, `header`, `nav`, `article`) that still take a Hostinger element value → reset on the block's own class, all bands. Type leaks (`h1–h6` letter-spacing, `p` margin) → list only.
  - iPad hero card → 80% of its rendered height, photo takes the cut (About: card 681 → 545, photo 500 → 364).
  - Then the owner's named nudges, band by band.
- **Step 4 CUTOVER**: same tree on the live route + route on `OWNED_SPLIT_ROUTES` (also skips Hostinger `vendors.min.js` + `main.js` via `skipHostingerJs`). Verify 200, no overlay, CSS = owned-split only, no main.js, bell rule, gaps + page height = preview. Docs: decision row in `HEADER-CHROME-PHASE.md`, MAP "Two surfaces", `OWNED-CHROME-UNLINKED.md` exceptions. Then the PR loop (§8). Page = LOCKED.
- Never edit: LOCKED chrome files (`public-header.tsx`, `public-strip-react.tsx`, `public-footer.tsx`, `public-sidebar.tsx`, `search-results.tsx`, their `pgs-*.css`), `owned-css/split/**`, `globals.css`, Hostinger CSS, `src/legacy/pages/*.html`. The body folder only for owner-named nudges in step 3. STOP and ask instead.
- Countries: steps 1–4 on the pilot country only, then slug-swap propagation to the other 8 with the normalised-diff guard (zero diff or STOP), its own GO AHEAD.
- Page order (Track A): About ✓ → Explore → Finance → Scholarship → Premium Home → Medical (USMLE/PLAB/AMC) → Non-medical → USMLE Rotation → CV Ready → Uni Tie-up → Feed → Track Progress → Upload Docs → Error 404 → pilot country → propagation.

## 10. Wiring facts
- Lab and H-R-done routes: React chrome (`public-header.tsx` + drawer, `public-strip-react.tsx` with `<PublicSidebar/>` + search inline, `public-footer.tsx`) + owned split. Other live routes: HTML strings via DSIH (`public-strip.ts` etc.) + Hostinger CSS + `main.js` until their H-R. The React chrome is ONE set of files: a change on the lab shows on every page imported onto it. The two portal files are unused since About and go in final cleanup.
- `src/app/layout.tsx`: `OWNED_SPLIT_ROUTES` picks `/preview/owned-split` vs Hostinger `style.css` + `responsive.css`; `skipHostingerJs` (labs + owned routes) drops `vendors.min.js` + `main.js`. Still global on every route: `vendors.min.css` (Bootstrap 5.3.2), `icon.min.css` (Font Awesome 6.5.1 + Bootstrap Icons), `jquery.js`, `pgs-autocomplete.js` (ours) — removal = later chrome gates (icons → inline SVG; Bootstrap trim into owned CSS after all pages; jQuery with the last string page).
- Hostinger element rules still apply through the 1:1 split (`section { padding }`, `footer { padding }`, `h1–h6 { letter-spacing }`, `p { margin-bottom }`); About blocks override `section` on their own classes.
- `legacy-page.tsx` click router on `<main>` navigates sidebar `<a>`s; React handlers that must win use the capture phase. The header's `sticky` does not hold on lab or About (matches lab; a chrome gate if wanted).
