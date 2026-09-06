---
name: pgs-modular-public-chrome
description: >-
  Locked modular public chrome vs editable globals.css; body work on page CSS.
  Full order (frontend/backend/SaaS): pgs-master-workflow. Hostinger reference only.
  Bands 1366/600 — never 767 for chrome. Owner lock 2026-09-04.
---

# PGS — modular public chrome (canonical)

**Master workflow:** [`pgs-master-workflow/SKILL.md`](../pgs-master-workflow/SKILL.md) — read first.

Companion to `pgs-propose-before-code`, `pgs-never-invent`, `pgs-no-touch-unapproved-ui`.  
Owner doc: [`docs/MODULAR-PUBLIC-FRONTEND.md`](../../docs/MODULAR-PUBLIC-FRONTEND.md).

## Rule (verbatim)

**Hostinger and legacy CSS are reference only. Shared chrome is OWNER LOCKED — do not retouch. Canonical chrome lives in `src/app/globals.css` under `PGS MODULAR PUBLIC CHROME`. Do not patch Hostinger to win. Breakpoints are 1366 and 600 only — everything between is iPad. Never use 767 for this chrome. Next work = page body sizes / responsiveness only.**

## How the site is programmed (do not make the owner repeat this)

**One-liner:** Shared shell is locked; fix legacy page bodies next; swap bodies route by route later.

### Now

1. **Pages** still render **legacy HTML bodies** (`src/legacy/pages/…`), wrapped by shared chrome via `PublicLegacyPage`.
2. **Shared chrome = LOCKED** (header, footer, strip, drawer tools, modular footer/header CSS). See file table below.
3. **Active work:** body sizes / responsiveness on legacy page HTML + **page-scoped** CSS only. Do **not** edit locked chrome files.
4. **Bands:** `>1366` desktop · `601–1366` iPad · `≤600` mobile — **no 767** for modular chrome.
5. **Workflow:** propose → `GO AHEAD` → edit body / page CSS → owner Preview QC.

### Later (roadmap)

1. **Replace page bodies one route at a time** after Preview QC + explicit `GO AHEAD /route` (parked junior/Figma bodies — see `src/features/FIGMA_PORT_PARKED.md`). Shared shell stays locked.  
2. Eventually **drop legacy HTML + Hostinger CSS/JS** as each surface is fully owned by the new stack.

## `globals.css` — locked section vs editable file

| Part of `src/app/globals.css` | Rule |
|---|---|
| Section **`PGS MODULAR PUBLIC CHROME — CANONICAL`** | **LOCKED** — sticky header, footer bands, strip, `#toggleBtn`, univMeet/search, body pull |
| **Rest of globals.css** (Ops, student footer bands, etc.) | **Editable** with propose → `GO AHEAD` — do not casually touch locked section “while you’re there” |
| New body styling | **Default:** page-scoped CSS (`countries.css`, feature css). Globals only when owner approves |

## LOCKED shared chrome files (owner 2026-09-04)

**STOP** if the task would edit any of these unless the owner explicitly reopens them by name:

| Concern | File |
|--------|------|
| Shared footer markup | `src/legacy/pages/public-footer.html` (+ `.ts`) |
| Shared header markup | `src/legacy/pages/public-header.html` (+ `.ts`) |
| Modular chrome CSS section | [`src/app/globals.css`](../../src/app/globals.css) — **`PGS MODULAR PUBLIC CHROME` only** |
| Header bar visuals | `src/features/shell/legacy-header-breakpoints.css` |
| Hello failsafe | `src/features/shell/legacy-hello-aspirant.css` |
| Hostinger `style.css` / `responsive.css` | **REFERENCE ONLY** — never edit to “win” |

Architecture write-up: [`docs/MODULAR-PUBLIC-FRONTEND.md`](../../docs/MODULAR-PUBLIC-FRONTEND.md).

## Breakpoints (locked)

| Band | Width | Mode |
|------|-------|------|
| Desktop | **>1366** | desktop |
| iPad | **601–1366** | iPad |
| Mobile | **≤600** | mobile |

**Forbidden for modular chrome:** `767`, `hostingerPhoneMax`, Bootstrap-ish phone floors, or inventing a fourth band.

`pgs-breakpoints.ts` may still document `hostingerPhoneMax: 767` for **country/page** Hostinger floors — that is **not** modular chrome.

## Do not touch (chrome — locked)

Unless the owner message explicitly names them:

- Entire **PGS MODULAR PUBLIC CHROME** section in globals
- Sticky header `top: 0`; ≤600 pill `#ffffff`
- Strip / `#toggleBtn` / `#univMeet` / search / body strip-tied `clamp` pull
- Shared footer mobile / iPad / desktop rules already QC’d
- `public-header.html` / `public-footer.html` / `legacy-header-breakpoints.css` / `legacy-hello-aspirant.css`

## Workflow (body work)

1. Follow **propose → `GO AHEAD` → implement** (`pgs-propose-before-code`).
2. Change **legacy page bodies** or **page-scoped** CSS only.
3. If Hostinger shows a useful body value: **cite as reference**, propose a **page-scoped** port (prefer `clamp` / bands 1366·600 when owner wants fluid) — do **not** unlock chrome or edit Hostinger.
4. After implement: brief vomit + owner Preview QC on desktop / iPad / phone.

## Quick checklist (agent)

- [ ] Am I about to edit a **LOCKED shared chrome** file? → **STOP** unless owner reopened it by name.
- [ ] Am I about to use **767** for modular chrome? → **STOP**, use 600 / 1366.
- [ ] Am I editing Hostinger `style.css` / `responsive.css`? → **STOP**.
- [ ] Am I wiring a parked junior body without `GO AHEAD /route`? → **STOP**.
- [ ] Did I propose and wait for `GO AHEAD`? → required.

## Related skills

- `pgs-propose-before-code` — approval gate + responsive alternative (`clamp`)
- `pgs-never-invent` — no invented UX
- `pgs-no-touch-unapproved-ui` — approved Student/Public UI freeze (includes locked chrome)
