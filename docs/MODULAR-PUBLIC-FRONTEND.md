# PGS modular public frontend

Owner lock (2026-09-04). Agents: read `.cursor/skills/pgs-master-workflow/SKILL.md` first, then `pgs-modular-public-chrome`.

**Header chrome phase (2026-09-25):** owner reopened chrome for React remount + drop DSIH — [`HEADER-CHROME-PHASE.md`](./HEADER-CHROME-PHASE.md) · skill `pgs-header-chrome-phase`. Outside that phase, chrome stays locked.

## One-liner

**Shared chrome is one source for all modular pages. Bodies swap route by route. Hostinger CSS = reference only. Header phase: React mount, no chrome DSIH — see HEADER-CHROME-PHASE.md.**

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

1. Finish header chrome **H-R**, then **marquee / announcement bar** (admin add/remove; legacy Marquee → `site_notices`) — see [`HEADER-CHROME-PHASE.md`](./HEADER-CHROME-PHASE.md).  
2. Replace **page body only** by template family after Preview QC + `GO AHEAD /route` (see inventory + `src/features/FIGMA_PORT_PARKED.md`). Shared shell stays locked.  
3. **OWNED MODULAR CHROME CSS (OWN-\*)** — same shape as React body modular: new owned CSS (Hostinger = reference) → header → toggle/strip → footer → per-page body UI flush. **Unlink Hostinger page by page** during that page’s **final UI audit**. Zoom bake: `owned_px = Hostinger_raw_px × 0.9` (Hostinger `html{zoom:0.9}`). Contract: [`HEADER-CHROME-PHASE.md`](./HEADER-CHROME-PHASE.md) § OWN-0.  
   - **OWN-H done:** link [`src/features/shell/pgs-owned-header.css`](../src/features/shell/pgs-owned-header.css) via `PublicHeader` (lab `/preview/header`).  
   - **OWN-T done:** link [`src/features/shell/pgs-owned-strip.css`](../src/features/shell/pgs-owned-strip.css) (`#toggleBtn` + strip + univMeet).  
   - **OWN-F:** [`pgs-owned-footer.css`](../src/features/shell/pgs-owned-footer.css) (workshop).  
   - **OWN-UNLINK done:** barrels not imported on pages; see [`OWNED-CHROME-UNLINKED.md`](../src/features/shell/OWNED-CHROME-UNLINKED.md).  
   - **OWNED-CSS-LAB done:** main barrel [`pgs-owned-css.css`](../src/features/owned-css/pgs-owned-css.css) + generic empty lab `/preview/owned-css` (`?block=`). Not UK-specific. See [`owned-css/README.md`](../src/features/owned-css/README.md).  
   - Next: block-by-block bake → lab QC → **OWN-LINK** per page.  
4. Drop residual legacy HTML + Hostinger CSS/JS after enough pages opted out.  
   **Move-out plan (countries → Purple Premium → feed → site clear):** [`PUBLIC-MOVE-OUT-PLAN.md`](./PUBLIC-MOVE-OUT-PLAN.md) · skill `pgs-public-move-out`.

## Workflow

Propose → owner `GO AHEAD` → edit **body** (or page-scoped CSS), **not** locked shared chrome / not Hostinger → Preview QC desktop / iPad / phone.

## Backend (separate track)

Sellable Ops / roles / docs / lag → [`docs/BACKEND-10-10-PLAN.md`](./BACKEND-10-10-PLAN.md). Do not mix backend drive-bys into Hostinger frontend QC. Chrome lock lesson: shared CSS foundations are expensive — same discipline applies to backend spine.
