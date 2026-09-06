# PGS modular public frontend

Owner lock (2026-09-04). Agents: read `.cursor/skills/pgs-master-workflow/SKILL.md` first, then `pgs-modular-public-chrome`.

## One-liner

**Shared chrome is LOCKED. Sort legacy page body sizes / responsiveness next; swap bodies route by route later. Hostinger CSS = reference only.**

## Now

| Layer | What |
|--------|------|
| **Page bodies** | Legacy HTML (`src/legacy/pages/…`) via `PublicLegacyPage` — **active work:** sizes + responsiveness |
| **Shared chrome** | Header, sidebar, drawer, footer, strip tools — **LOCKED** (do not retouch) |
| **Canonical CSS (chrome)** | `src/app/globals.css` → section **PGS MODULAR PUBLIC CHROME** — **LOCKED**; other globals sections editable with GO AHEAD |
| **Hostinger** | `public/assets/css/*` = **reference only** — read intent; never patch Hostinger to win |
| **Breakpoints** | `>1366` desktop · `601–1366` iPad · `≤600` mobile — **never 767** for modular chrome |

### Shared chrome — OWNER LOCKED 2026-09-04 (do not touch)

Do **not** edit these unless the owner explicitly reopens them by name:

| File | Role |
|------|------|
| `src/legacy/pages/public-footer.html` (+ `.ts`) | Shared footer markup |
| `src/legacy/pages/public-header.html` (+ `.ts`) | Shared header markup |
| `src/app/globals.css` → **PGS MODULAR PUBLIC CHROME** | Sticky header, footer bands, strip, `#toggleBtn`, univMeet/search, body pull |
| `src/features/shell/legacy-header-breakpoints.css` | Header bar visuals (pill, logo, login, bell, menu) |
| `src/features/shell/legacy-hello-aspirant.css` | Hello failsafe hide |

Also locked inside that chrome (behavior): sticky header `top: 0` all bands; ≤600 pill `#ffffff`; strip / `#toggleBtn` / `#univMeet` / search / strip-tied body `clamp` pull; footer mobile ≤600 + iPad 601–1366 + desktop >1366 as last QC’d.

### Active work (not chrome)

- **Template / body roadmap:** [`docs/PUBLIC-BODY-TEMPLATE-INVENTORY.md`](PUBLIC-BODY-TEMPLATE-INVENTORY.md) (junior scout, cards, gates, swap order)
- **Legacy page bodies** — section widths, heroes, cards, typography, reflow at **>1366 / 601–1366 / ≤600** until each family is swapped
- Propose → `GO AHEAD` → change **body** files / page-scoped CSS only — never shared chrome files above

## Later

1. Replace **page body only** by template family after Preview QC + `GO AHEAD /route` (see inventory + `src/features/FIGMA_PORT_PARKED.md`). Shared shell stays locked.  
2. Drop legacy HTML + Hostinger CSS/JS as each surface is fully owned by the new stack.  
   **Move-out plan (countries → Purple Premium → feed → site clear):** [`PUBLIC-MOVE-OUT-PLAN.md`](./PUBLIC-MOVE-OUT-PLAN.md) · skill `pgs-public-move-out`.

## Workflow

Propose → owner `GO AHEAD` → edit **body** (or page-scoped CSS), **not** locked shared chrome / not Hostinger → Preview QC desktop / iPad / phone.

## Backend (separate track)

Sellable Ops / roles / docs / lag → [`docs/BACKEND-10-10-PLAN.md`](./BACKEND-10-10-PLAN.md). Do not mix backend drive-bys into Hostinger frontend QC. Chrome lock lesson: shared CSS foundations are expensive — same discipline applies to backend spine.
