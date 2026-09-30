# Error 404 — modular map (living doc)

Family: `src/features/error-404/` · Figma desktop `18153:10852` · mobile `1285:7623`.
Body = **VISUAL LOCKED** (owner 2026-09-22). H-R per `docs/HR-PAGE-PROMPT.md` §A/§G (About = worked example).

## Surfaces

| Surface | URL / file | What it is |
|---|---|---|
| **Preview (QC lab)** | `/preview/error-404` → `src/app/preview/error-404/page.tsx` | Same compose, no `live`; login return to the lab. |
| **Live route** | `/error_404` (proxy map `error_404 → /error_404`; folder `src/app/Error_404/page.tsx`) | Modular body, `live`. Pre-flight: confirm which URL renders and the exact `x-pathname` layout sees. |
| **Not-found boundary** | `src/app/not-found.tsx` (any unknown URL) | Same compose, `live` + `authenticatedActorFallback` (staff/auth user without student state still gets a signed-in chrome). |

Status: **H-R DONE + LOCKED (2026-09-27, decision 54).** Lab + `/error_404` = React chrome + owned split (no `/assets/` files). Not-found (unknown URLs) = same React tree on Hostinger CSS + `main.js` until the final flip.

## Files

| Piece | File |
|---|---|
| **Page tree (all 3 surfaces)** | `src/features/error-404/compose-error-404-page.tsx` — the one place chrome is mounted; H-R step 1 edits this, not the route files |
| Shell | `error-404-preview-shell.tsx` + `.css` (`margin-top: var(--pgs-premium-shell-pull)` = body pull to closed #toggleBtn) |
| Body (one block) | `error-404-body.tsx` + `.css` — `<section class="error-404-body">`: bg "404", dino, heading, two lines, home CTA |
| Copy | `content.ts` |
| Banners (kept) | `ContentPreviewBanner`, `StaffPreviewBanner` (student preview) — outside `LegacyPage`, not chrome |

## H-R notes for the next chat (pre-flight inputs)

1. **One composer, three routes.** Mount the React chrome in `compose-error-404-page.tsx`; lab, `/error_404` and not-found all follow.
2. **Staff fallback** (not-found only): the string pipeline gave signed-in staff a chrome with name, `accountHref/profileHref = /ops` (or `/`), `savedHref`, unread 0. `<PublicHeader/>` / `<PublicStrip/>` props may not cover account/profile hrefs → list it as an owner decision, don't invent props.
3. **Owned-CSS allowlist vs not-found.** `OWNED_SPLIT_ROUTES` + `skipHostingerJs` in `src/app/layout.tsx` match by exact pathname. `/preview/error-404` and `/error_404` can be listed; a not-found render happens at *any* URL, so it would still get Hostinger CSS + main.js. Needs a small layout decision at step 2 (e.g. a route-independent signal from not-found) — owner/Fable call, not an improvised fix.
4. **Body QC:** single section → gap pass is only hero-top / body-to-footer; leak check still applies (`<section>` takes Hostinger `section { padding }` unless `.error-404-body` sets its own — it sets `padding: 32px 24px 64px` base, `72px 0 120px` in a media block; verify per band with §H).
5. iPad: body has its own 601–1366 handling to verify; no hero card, so the 80% card rule does not apply.

## Log

| Date | Gate | Note |
|---|---|---|
| 2026-09-22 | CUTOVER | Live `/error_404` + not-found serve the modular body; visual locked. |
| 2026-09-27 | MAP | This map created for H-R (after About H-R DONE, decision 52). |
| 2026-09-27 | HR-404-1 | Lab on React chrome (compose file only). Delta: ≤600 −13 (header 77→64); others 0. Staff on not-found → logged-out chrome (owner). |
| 2026-09-27 | HR-404-2 | Lab on OWNED_SPLIT_ROUTES. Vendor scan 87 rules, 0 new for P0; __pgsVendorAB [] at 1500/700/390; no /assets/ files. Found + fixed V-1 regression: P0 first in the barrel made the browser drop all Google Fonts @import (Roboto, Roboto Mono, Bebas Neue, Caveat) on every owned route incl. /about → `src/app/preview/owned-split/route.ts` hoists line-start `@import url()` to the top. 700: desktop rules at 601–767 (decision 28) → body 505→514, page 1599→1863 — recorded, not fixed. |
| 2026-09-27 | HR-404-3 | Live cutover: `/error_404` on OWNED_SPLIT_ROUTES. 200, no /assets/, bell no badge logged out, sticky header holds; numbers = lab at 1500/1100/700/390. Unknown URL: 404 status, same numbers, Hostinger CSS (exception). Body QC waived by owner. |
| 2026-09-30 | HR-404-BODY | Owner: desktop drawing ≥801, mobile drawing ≤800 (media ranges only, values verbatim; temporary iPad 601–1366 block removed). Drawing identical per mode (stage 619 desk / 283 mob on screen); no side scroll 601–1500. Found: bare `<section>` still takes Hostinger `section{padding}` 90 / 75 / 50 by band → body 781 (≥992) · 754 (801–991) · 418 (601–800) · 373 (≤600). Owner QC PASS as-is (padding left to Hostinger copy) 2026-09-30. Page LOCKED. |
