---
name: pgs-owner-lock-claude
description: >-
  Owner locks captured during the Cursor → Claude Code handover (2026-09-27).
  Read on every PGS task, after pgs-master-workflow. QC'd context is untouchable;
  one UI across four bands; PGS type scale over Figma px; fake context in backend
  shape; preview labs first; every build hands the owner the exact file links.
---

# PGS — owner lock (Claude Code era, 2026-09-27)

Companion to `pgs-master-workflow`, `pgs-propose-before-code`, `pgs-never-invent`.
Living chrome map: `docs/HEADER-CHROME-PHASE.md`. Claude roadmap: `docs/CLAUDE-ARCHITECT-PLAN.md`.

## 1. QC'd context is untouchable

The owner spent months in Cursor QC'ing the chrome and every React page body.

- When a block changes, **ADD or REPLACE only the named piece** ("remove one link, add `#exploreCountries` with a dropdown"). Touch only what that piece affects.
- **Never restyle the rest** while you are in the file. No "cleanups", no re-spacing, no type sweeps.
- Before editing, **measure the QC'd rendering** (positions, sizes, gaps, fonts) at 1500 · 1100 · 700 · 390. After editing, **prove parity** on everything you did not name.
- New band-specific styling goes under its own media query and its own scope (e.g. `[data-pgs-sidebar="react"]`), never onto the shared QC'd selectors.
- If parity needs a QC'd rule to change, STOP and ask.

## 2. One UI across four bands

- Bands: `>1366` desktop · `801–1366` wide iPad · `601–800` compact iPad · `≤600` mobile. Never 767. Authority `src/features/shell/pgs-breakpoints.ts`.
- What the owner sees on desktop is what they see on iPad and mobile; only arrangement, font size and UI sizes change. Never a separate UI per band.
- Build the band the Figma frame shows first (often mobile), then scale. If a band cannot be derived from the shared UI, STOP and say so; the owner decides or draws that Figma.
- Responsive ask = ONE plan across all four bands, ONE build.

## 3. Type = PGS scale, Figma = visual reference

- Figma px are the look, not the law. Sizes the owner names per band win.
- `html { zoom: 0.9 }` stays on (owned split, decision 27). CSS 18px paints as 16px. When the owner names a size "as seen", convert.
- Floor token `--pgs-type-floor` (16px) exists; the owner may name smaller for dense UI (search results 14, dropdown 18 CSS).

## 4. Fake context in backend shape

- If a backend context exists, use it. If not, ASK, then build fake rows in the **exact backend contract shape** (field names, limits, ranking) so the backend gate flushes fakes for real data without touching the UI.
- Reference: `src/features/shell/search-contract.ts` mirrors `src/lib/public-search.ts`; `search-index.ts` carries fake rows with a `search_document` stand-in. Every fake row is a case the backend must answer.

## 5. Preview labs first, live on a named gate

- Build and QC on `/preview/<lab>`; reuse an existing lab when one covers the block (`/preview/header` covers all chrome). Live routes change only on a named cutover gate.
- Lab-done ≠ live-done: on the H-R import each page gets an audit.
- Live pages may be opened READ-ONLY as a ruler for parity; say so.

## 6. Hand the owner the file links

Every build report lists, as repo paths the owner can open in VS Code, **which CSS file and which page/component file** carry the change, with the selector or line, so the owner can nudge values directly without spending tokens. Preview link for every step. Copy-paste terminal commands one at a time, with what to expect.

## 7. Gate and model discipline

- Propose → owner `GO AHEAD <gate>` → one gate → measure → owner Preview QC → stop. A named QC nudge is a direct edit.
- Fable plans (bands, blocks, contracts, audits); Opus builds (files + numbers known), nudges, docs, git. Pick model per chat. New chat starts by reading this skill, `pgs-master-workflow`, and the gate's living map.
- Git author `project-mtfbwu <project.mtfbwu@gmail.com>`. Claude cannot push or run vitest from its shell; the owner runs `git push` and `pnpm test`.

## 8. Wiring facts (do not re-derive)

- Chrome today on live = HTML strings (`src/legacy/pages/*.html`, `public-strip.ts`) via DSIH + Hostinger CSS. Chrome on the lab = React (`public-header.tsx`, `drawer-search.tsx`, `public-sidebar.tsx`, `search-results.tsx`) + owned split (`owned-css/split/pgs-owned-split.css`). H-R flips pages one by one; lab portals (`*-portal.tsx`) die at H-R.
- Shared chrome and shared blocks (`src/features/shared/*`) propagate to every page that mounts them. Per-family folders do not: each `src/features/countries-<x>/` is its own copy (own `countries.css`, hero, why); only `countries/compose-country-public-page.tsx` is shared. A CSS pass on one country page does NOT reach the others until the family is consolidated onto the shared template (owner decision).
- `legacy-page.tsx` has a click router on `<main>` that navigates sidebar `<a>`s; React handlers that must win use the capture phase.

## 9. State sheet before every change (owner lock 2026-09-27)

The owned split is a 1:1 copy of Hostinger, so every inherited behaviour (hover opacity, transitions, focus, active, sticky touch hover) comes with it. Before implementing a change, write a **state sheet** for the piece:

| State | What the 1:1 copy does today | What the owner will see after |
|---|---|---|
| rest · hover · pressed/active · focus · open · closed · touch (sticky hover) · disabled/loading | measured from the live/lab rendering + the matching rules | the intended result, per band |

Owner approves the sheet, then build. Any inherited behaviour that is wrong for the new piece is overridden **on the new piece only** (scoped selector), never by editing the 1:1 copy.

## 10. Answer the question asked (owner lock 2026-09-27)

When the owner asks a direct question, answer **Yes / No / Maybe first**, then one or two lines of context for that answer only. Do not widen the answer to neighbouring topics the owner did not ask about. If a caveat changes the yes/no, it belongs in those lines; otherwise it waits until asked.

## Failure modes

- Restyling a QC'd panel to "match Figma" when only one row changed.
- Inventing a band UI instead of asking.
- Fake data with invented field names.
- "Done" without the file paths the owner needs to nudge it.
- Answering a yes/no question with a tour of the architecture.
- Shipping a piece without its state sheet (the greyed `#exploreCountries` row: inherited `a:hover { opacity:.6 }`).
