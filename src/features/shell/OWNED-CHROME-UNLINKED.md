# Owned chrome CSS — UNLINKED workshop

**Gate: OWN-UNLINK → OWNED-CSS-LAB (2026-09-25).**

**Owner model:** one **main CSS** ([`../owned-css/pgs-owned-css.css`](../owned-css/pgs-owned-css.css)) holds all conversion blocks. Generic lab [`/preview/owned-css`](../../app/preview/owned-css/page.tsx) is empty by default; `?block=` QC’s one fixture. Live pages do not import the barrel until OWN-LINK.

## Do not import on live (until OWN-LINK)

| File | Role |
|------|------|
| [`../owned-css/pgs-owned-css.css`](../owned-css/pgs-owned-css.css) | **Main barrel** (lab only for now) |
| [`pgs-owned-header.css`](./pgs-owned-header.css) | Header bake drafts |
| [`pgs-owned-strip.css`](./pgs-owned-strip.css) | Toggle + strip + univMeet |
| [`pgs-owned-footer.css`](./pgs-owned-footer.css) | Shared footer |

## Still linked (intentional)

| File | Why |
|------|-----|
| [`pgs-header-chrome-reset.css`](./pgs-header-chrome-reset.css) | H6a drawer fix via `legacy-header-breakpoints.css` (`reset on`) |
| [`public-header.css`](./public-header.css) | React header recipes for `/preview/header` |
| Hostinger `style.css` / `responsive.css` | Global landlord until page OWN-LINK. **Exception:** `/preview/header` (OWN-LINK-H), `/preview/about`, `/about`, `/preview/error-404`, `/error_404` (H-R done) load `/preview/owned-split` instead (list = `OWNED_SPLIT_ROUTES` in `src/app/layout.tsx`). **Not-found boundary** (`src/app/not-found.tsx`, any unknown URL) renders the same React 404 tree but keeps Hostinger CSS + `main.js` — the exact-path switch cannot match it; resolved by the final flip (switch removed) |
| `globals.css` PGS MODULAR PUBLIC CHROME | Strip/footer live recipes until owned pass replaces them |

Detail: [`../owned-css/README.md`](../owned-css/README.md)
