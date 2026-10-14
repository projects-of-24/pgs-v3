---
name: pgs-header-chrome-phase
description: >-
  Next-phase shared public chrome: React header/footer (no chrome DSIH), Figma
  IA, safe-area cascade, iPad=mobile header. CSS pass first (Hostinger/legacy
  reference → owned pgs-header-* → then UI). Living doc
  docs/HEADER-CHROME-PHASE.md. No code until GO AHEAD. Owner lock 2026-09-25.
---

# PGS — header / chrome phase (reopened)

**Living doc (findings + map + gates):** [`docs/HEADER-CHROME-PHASE.md`](../../docs/HEADER-CHROME-PHASE.md)  
**Formulas + remaining H-R pages:** [`docs/FRONTEND-IPAD-HEADER-LOCK.md`](../../docs/FRONTEND-IPAD-HEADER-LOCK.md)

**Master:** `pgs-master-workflow` · **Chrome DNA:** `pgs-modular-public-chrome` · **Propose:** `pgs-propose-before-code` · **Own CSS:** `figma-modular-own-css`

## Owner pain — do not repeat

Last time chrome work was called “done” but pages still mounted header via **`dangerouslySetInnerHTML` (DSIH)** from an HTML string. Owner discovered that in code and lost trust.

**Definition of done this phase:** React `<PublicHeader />` / `<PublicFooter />` (or one shared frame) **actually mounted** on modular pages · chrome DSIH **gone** · Figma IA · safe-area stack · Preview QC. React files that nothing imports = **not done**.

## Rule (verbatim intent)

**Rebuild shared chrome as React + owned CSS from my Figma. Wire it so every modular page uses it. Drop chrome DSIH. Do not call it done while HTML string inject remains. Propose → GO AHEAD → one gate. Stubs for pages I will build later.**

## Owner reopened (2026-09-25)

These were LOCKED; this phase may edit them **after `GO AHEAD`**, gate by gate:

- `src/legacy/pages/public-header.html` / footer (temporary until H-R cutover)
- `src/app/globals.css` → **PGS MODULAR PUBLIC CHROME** (safe-area + bands)
- `src/features/shell/legacy-header-breakpoints.css`
- New: `src/features/shell/public-header.tsx`, `public-footer.tsx`, nav map, owned header CSS

Do **not** delete Hostinger `style.css` / `responsive.css` in this phase.

## CSS from now (owner 2026-09-25 → H1c → H6a-CSS → OWN-0 → **SPLIT done 2026-09-26**)

**Hostinger→owned split (P1–P15) is COMPLETE** under `src/features/owned-css/split/` (1:1 copy, `zoom:0.9` kept, **no ×0.9 bake**). **OWN-LINK-H:** `/preview/header` only. Live pages still on Hostinger. See `src/features/owned-css/README.md` · decisions 27–32 in HEADER-CHROME-PHASE.md. **Bake ×0.9 (OWN-0 rows 20–23 / BAKE-H1) is retired** — superseded by the split.

### Owner QC / OWN-LINK order (locked 2026-09-26) — do not reverse

1. **Chrome header** — QC against Figma + lab `/preview/header`; then OWN-LINK header (owned split + React header) on chosen routes.  
2. **Toggle box** (`#toggleBtn` + strip).  
3. **Footer**.  
4. **univMeet** (and related strip search).  
5. **Then pages one by one** — body UI audit + Hostinger unlink per page (OWN-BODY).  

Propose → `GO AHEAD` per piece. Do **not** jump to page bodies before chrome pieces are QC’d.

**Still true:**
- No new Hostinger class names on React chrome.
- Do **not** sitewide-delete Hostinger. Unlink = **chrome piece → then page-by-page**.
- Detail: [`docs/HEADER-CHROME-PHASE.md`](../../docs/HEADER-CHROME-PHASE.md)

## Figma

- **Old header chrome** + more links/dropdowns — not a full redesign  
- Desk interaction trio: **`19075:13853`** default logged-in · **`19073:13328`** expanded · **`19070:15287`** logged-out + `#me`/notif panels  
- Also **`19072:15812`** ipad · **`19073:13319`** mobile  
- **`#me`**, **`#cvReadyPrograms`**, **`#cvForMedical`** = admin/CMS-managed lists (add/change/remove) + audit logs later — FE shells + starters/fixtures in chrome gates  
- Notification dropdown = **new text UI**  
- Login → profile pic → Logout  
- **Marquee / announcement bar** (legacy admin Marquee · `marquee_tbl` → `site_notices`) = **later pass only**, after chrome **H-R** is done — admin can add/edit/enable/disable/remove scrolling promo lines above the header. **Do not build during H1–H7.**  
- Living detail: [`docs/HEADER-CHROME-PHASE.md`](../../docs/HEADER-CHROME-PHASE.md)

## Gates (phase by phase)

`H0` map → `H1` / `H1b` desk bar → **`H1c` CSS pass** (Hostinger ref → owned tokens + drop recipe; **no UI**) → `H2` dropdowns **one-by-one** (UI mounts owned recipe) → `H3` `#me` shell → `H4` notif UI → `H5` login/avatar → `H6` iPad/mob → `H7` safe-area → **`H-R` wire + drop chrome DSIH`**

Never ship all gates in one go. Never call done while chrome DSIH remains.

**Before any new header UI block:** run (or confirm) the CSS pass for that block. Example: Premium menu → port `#ppDropdown` recipe to `.pgs-header-drop*` → then wire Premium UI.

## Safe-area + body pull

- Notch pads header; strip, `#toggleBtn`, body, footer **all push down together** (`--pgs-safe-top`).
- Body shell pull = **aesthetic**: hero start uses toggle **height** as composition ruler — not “toggle shifting.”
- Update shell pull token with safe-area when header pads.

## Hard px

No sitewide purge. Page-by-page in later UI pass. Prefer `clamp` for layout that must work on big monitors **and** Windows laptops.

## Accidental WIP

`header-nav.ts`, `public-header.tsx`, `public-footer.tsx`, `public-strip.css`, partial `public-header.html` edits = **rewrite against Figma** or delete on owner pick — not finished work.

## Agent checklist

- [ ] **Post-split QC order:** header → toggle → footer → univMeet → **then** pages (OWN-LINK). No page-body jump ahead.
- [ ] Owned split stays off live pages. **OWN-LINK-H done:** `/preview/header` only, via `/preview/owned-split`. Next piece needs its own `GO AHEAD`
- [ ] Chrome bands: >1366 desk · 801–1366 wide iPad (Figma 19072:15812, hamburger after login) · 601–800 compact iPad · ≤600 phone (Figma 19073:13319). Middle two = iPad. Never 767. One Opus plan across all four before building.
- [ ] Do not invent join #PGS / contactCounsellor destinations — stubs until Figma pages exist
- [ ] Do not invent floating-menu CSS; port proven dropslide first
- [ ] **No marquee/announcement bar in H1–H-R** — deferred until after chrome rework; admin CRUD then
- [ ] Will owner still see DSIH for chrome after this gate? If yes and gate claimed “done” → **STOP**, you are repeating the last failure
- [ ] Lab first: `/preview/header` before sitewide H-R
- [ ] Propose gate → wait `GO AHEAD` (no silent chrome coding)
- [ ] Read `docs/HEADER-CHROME-PHASE.md`
