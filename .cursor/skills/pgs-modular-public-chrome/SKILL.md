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

**Hostinger and legacy CSS are reference only. Shared chrome DNA (bands, strip, `#toggleBtn`, body pull aesthetic, footer bands) stays canonical in `src/app/globals.css` under `PGS MODULAR PUBLIC CHROME`. Do not patch Hostinger to win. Four bands: above 1366 · 801–1366 · 601–800 · 600 and below. The middle two are iPad. Never use 767 for this chrome.**

**Owner reopen 2026-09-25 — header chrome phase:** chrome files may be edited **only** under skill `pgs-header-chrome-phase` + living doc [`docs/HEADER-CHROME-PHASE.md`](../../docs/HEADER-CHROME-PHASE.md), after `GO AHEAD`, gate by gate. Goal: **React chrome mount, drop chrome DSIH**. Outside that phase, chrome stays locked.

## How the site is programmed (do not make the owner repeat this)

**One-liner:** Shared shell is one source for all modular pages; bodies swap route by route; chrome phase rebuilds header as React (no DSIH).

### Now

1. **Many pages** already use **React modular bodies** inside `LegacyPage` / shared chrome host; some routes still legacy HTML bodies.
2. **Shared chrome mount today** = HTML string (`public-header.html` / footer) → **`dangerouslySetInnerHTML` (DSIH)**. That is the pain to retire in the header phase.
3. **Active work (2026-09-25):** header chrome phase — see `pgs-header-chrome-phase`. Body work otherwise = page-scoped CSS only; do not drive-by chrome.
4. **Bands (four):** `>1366` desktop · `801–1366` wide iPad (Figma `19072:15812`) · `601–800` compact iPad · `≤600` mobile — middle two reserved for iPad · **no 767** for modular chrome. Responsive asks: one Fable plan across all four (`pgs-master-workflow`). **iPad body = desktop body** where owner said so.
5. **Workflow:** propose → `GO AHEAD` → one gate → owner Preview QC.

### Later (roadmap)

1. Finish header phase **H-R** (React mount, no chrome DSIH).  
2. **Owned CSS split P1–P15 DONE** (`src/features/owned-css/split/`, 1:1 + zoom kept, **no bake**). Still unlinked.  
3. **OWN-LINK QC order (owner 2026-09-26):** **header → toggle → footer → univMeet → then pages one by one.** Do not start page bodies before chrome pieces.  
4. **Marquee / announcement bar** — admin CRUD. **Only after H-R.**  
5. Stub destinations when owner shares Figma.  
6. Residual Hostinger unlink (**OWN-CLEAR**) after enough pages opted out.

## `globals.css` — locked section vs editable file

| Part of `src/app/globals.css` | Rule |
|---|---|
| Section **`PGS MODULAR PUBLIC CHROME — CANONICAL`** | **LOCKED** — sticky header, footer bands, strip, `#toggleBtn`, univMeet/search, body pull |
| **Rest of globals.css** (Ops, student footer bands, etc.) | **Editable** with propose → `GO AHEAD` — do not casually touch locked section “while you’re there” |
| New body styling | **Default:** page-scoped CSS (`countries.css`, feature css). Globals only when owner approves |

## LOCKED shared chrome files (owner 2026-09-04)

**STOP** if the task would edit any of these unless the owner explicitly reopens them by name — **or** the task is the active **header chrome phase** (`pgs-header-chrome-phase` + `GO AHEAD` gate):

| Concern | File |
|--------|------|
| Shared footer markup | `src/legacy/pages/public-footer.html` (+ `.ts`) |
| Shared header markup | `src/legacy/pages/public-header.html` (+ `.ts`) |
| Modular chrome CSS section | [`src/app/globals.css`](../../src/app/globals.css) — **`PGS MODULAR PUBLIC CHROME` only** |
| Header bar visuals | `src/features/shell/legacy-header-breakpoints.css` |
| Hello failsafe | `src/features/shell/legacy-hello-aspirant.css` |
| Hostinger `style.css` / `responsive.css` | **REFERENCE ONLY** — never edit to “win” |
| React chrome (phase) | `src/features/shell/public-header.tsx` / `public-footer.tsx` — only after H0 `GO AHEAD` |

Architecture: [`docs/MODULAR-PUBLIC-FRONTEND.md`](../../docs/MODULAR-PUBLIC-FRONTEND.md) · phase: [`docs/HEADER-CHROME-PHASE.md`](../../docs/HEADER-CHROME-PHASE.md).

## Breakpoints (locked)

| Band | Width | Mode |
|------|-------|------|
| Desktop | **>1366** | desktop header |
| Wide iPad | **801–1366** | Figma `19072:15812` — logo, `#feed`, join #PGS, bell, login. Hamburger next pass. |
| Compact iPad | **601–800** | current bar: logo, `#feed`, bell, auth, menu |
| Mobile | **≤600** | mobile |

**Forbidden for modular chrome:** `767`, `hostingerPhoneMax`, Bootstrap-ish phone floors, or inventing a fourth band.

`pgs-breakpoints.ts` may still document `hostingerPhoneMax: 767` for **country/page** Hostinger floors — that is **not** modular chrome.

## Do not touch (chrome — locked)

Unless the owner message explicitly names them **or** you are on an approved **header chrome phase** gate:

- Entire **PGS MODULAR PUBLIC CHROME** section in globals
- Sticky header `top: 0`; ≤600 pill `#ffffff`
- Strip / `#toggleBtn` / `#univMeet` / search / body strip-tied `clamp` pull (aesthetic hero start)
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

- `pgs-header-chrome-phase` — React remount · no chrome DSIH · Figma IA (active 2026-09-25)
- `pgs-propose-before-code` — approval gate + responsive alternative (`clamp`)
- `pgs-never-invent` — no invented UX
- `pgs-no-touch-unapproved-ui` — approved Student/Public UI freeze (includes locked chrome outside reopen)
