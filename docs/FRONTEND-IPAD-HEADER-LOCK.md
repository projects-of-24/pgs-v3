# Frontend lock — iPad + header formulas

Owner lock inventory **2026-10-10**. Carry across chats. Do **not** reinvent breakpoints or recipes per page.

**Public design system (type · gap · height · Figma split):** [`PGS-PUBLIC-DESIGN-SYSTEM.md`](./PGS-PUBLIC-DESIGN-SYSTEM.md) — open with `friend-not-yes-man` before body CSS.

**Canvas (this machine):** Cursor canvas `frontend-ipad-header-lock`  
**Numbers authority:** [`src/features/shell/pgs-breakpoints.ts`](../src/features/shell/pgs-breakpoints.ts)  
**Chrome living:** [`HEADER-CHROME-PHASE.md`](./HEADER-CHROME-PHASE.md) · skill `pgs-header-chrome-phase`  
**H-R template:** [`HR-PAGE-PROMPT.md`](./HR-PAGE-PROMPT.md)  
**Medical north star:** [`PREMIUM-MEDICAL-MODULAR.md`](./PREMIUM-MEDICAL-MODULAR.md) · `/preview/purpleusmle-2`

**Model routing:** Opus plans responsive / multi-band work · execute after `GO AHEAD` · [`MODEL-ROUTING.md`](./MODEL-ROUTING.md)

---

## Which iPad recipe wins (do not mix)

| Job | Skill | Ignore |
|---|---|---|
| Remaining pages: chrome import + iPad body QC | `pgs-ipad-paper-pass` → `pgs-ipad-modular-body-pass` | phone×1.4 |
| Mauve-panel hero cards only (About / Scholarship / Premium panel family) | `pgs-ipad-hero-body` (copy once ×1.4 → freeze → optional 80% height) | Shared iPad React component; live `calc(×1.4)` |
| Locked chrome DNA | `pgs-modular-public-chrome` | Hostinger edits to “win” |

North star for Premium/medical body patterns: **`/preview/purpleusmle-2`**.

---

## Four bands (never 767)

| Band | Width | Header | Body default |
|---|---|---|---|
| Desktop | **>1366** | Full bar, no hamburger | Desk Figma — do not touch unless opened |
| Wide iPad | **801–1366** | Figma `19072:15812` — logo · `#feed` · join #PGS · bell · login · hamburger | Desktop body / wide 2-col |
| Compact iPad | **601–800** | Join #PGS in menu, not on bar | Stack + clamp — **~750** lives here |
| Phone | **≤600** | Figma `19073:13319` | Phone Figma — do not touch unless opened |

Measure: H-R **1500 · 1100 · 700 · 390** · body QC also **750 · 1024 · 1440**.

Extra tokens (not body bands): `headerDesktopLogoMin` 981 · `mobileHandoverMax` 980 · `hostingerPhoneMax` 600 (countries — not modular chrome).

---

## Agent Step 0 (owner 2026-10-10)

**Quality over quantity.** Before any frontend invent/CSS/QC edit: open this file + `pgs-propose-before-code` (+ iPad/chrome skills if relevant) → quote the formula below → then propose. Do not re-derive. Do not skip because QC “feels urgent.”

## Formulas (do not re-derive)

| Formula | Value | Notes |
|---|---|---|
| Type floor | Roboto **15–16px** (`--pgs-type-floor` → 16) · Bebas **≥30px** | **Hard lock on every body CSS gate** — quote in Step 0. **Figma = design/layout only; text/font size = ours** (owner 2026-10-10). Never ship raw Figma Roboto px (14 / 19.6 / etc.), even if larger than the floor. Final sitewide type sweep later. |
| Mobile rail | Figma inset first → **85%** only if owner says too edgy | Paper-pass body default rail often 85% clamp |
| Mauve iPad hero | Mobile card × **1.4** once → save sizes (406×630 · photo 500 · col 211) | Not live `calc()`. Then **80% height** cut (About: 681→545, photo 500→364) |
| Gap pass | **GAP LOCK: hero→next 60 · rest 80** (all bands) | Content-to-content (no padding-block on the gap). [`FRONTEND-GAP-ANALYSIS.md`](./FRONTEND-GAP-ANALYSIS.md). Hero top untouched. Scholarship hero→intro = half section gap (40). |
| Block height | **`height: auto` only** (every segment / hero / stage) | Owner 2026-10-10 — designed that way. No fixed stage that reserves white under content; hang in-flow + overflow visible. USMLE protocol: [`PREMIUM-MEDICAL-MODULAR.md`](./PREMIUM-MEDICAL-MODULAR.md). |
| Shell pull | `calc(-1 * clamp(88px, 11vw, 157px))` / `--pgs-premium-shell-pull` | Closed `#toggleBtn` height = aesthetic ruler. No black preview banners |
| Zoom bake ×0.9 | **Superseded** (decision 27) | Owned split = 1:1 + `html{zoom:0.9}` kept — no bake |
| Compact vs wide | **601–800** stack + `clamp` / kill hangs · **801–1366** keep QC’d 2-col | Prefer one clamp on the named box |

Clamp cheat: `width: clamp(200px, 90%, 351px)` · copy rail `clamp(240px, 100%, 440px)` + `margin-inline: auto`.

---

## Per-page workflow (remaining frontend)

```text
1 CHROME  HR-*-1  PublicHeader · PublicStrip · body · PublicFooter (= /preview/header). No DSIH. Import only.
2 CSS     HR-*-2  OWNED_SPLIT_ROUTES. Delta 0 except 601–767 (decision 28 — record, don’t fix).
3 BODY    owner   Content match → Figma/Paper rearrange → Opus plan (all bands) → one block → freeze.
4 CUTOVER HR-*-3  Same tree live + OWNED_SPLIT. Chrome click QC first.
```

### Chrome click QC (must not break)

1. `pgs-header-chrome-reset` — transition **opacity only**, never `visibility`
2. `legacy-page` `useEffect` must **not** depend on `children`
3. `#toggleBtn` `z-index: 5` above pulled-up bodies

---

## Page status (2026-10-10)

**H-R live + OWNED_SPLIT:** `/about` · `/finance` · `/scholarship` · `/error_404` · `/purpleusmle` · `/purpleplab` · `/purpleamc`

**Partial / labs:** nonmedical-2 (chrome; body iPad later) · student-feed iPad labs · purplemedical labs · **Countries destination** `/preview/countries` LOCKED narrow · `/preview/countries-2` wide · **LIVE all `/countries*`** (same template · content pass later · 2026-10-10)

**H-R LIVE done:** About · Finance · Scholarship · Error 404 · USMLE/PLAB/AMC · **Explore Countries** (2026-10-10)

**Track A still pending H-R** (from `HR-PAGE-PROMPT`): Premium Home → Non-medical → USMLE Rotation → CV Ready → Uni Tie-up · Feed · Track Progress · Upload Docs · **countries live propagation** (template first). Non-modular bodies wait for body pass first.

---

## Shared modules (reuse — do not rebuild)

`src/features/shared/`: Highlights · #PGS picks · Expense · Enroll · Questions · FAQ · Outro CTA · Support hub. Hero mauve family mounts; page shell only spacing + track rearrange.

---

## Opus vs execute on this work

| Turn | Model |
|---|---|
| New page band plan / rearrange / multi-block iPad | **Opus** (one plan × four bands) |
| Mid-build “lots to figure out” | **STOP → Opus** |
| Approved plan + `GO AHEAD` | This agent or Sonnet execute |
| Named live QC nudge (“30px → 24”) | Direct edit — no second Opus plan |

Update this file when a page finishes H-R or a formula changes. Do not leave durable locks only in chat.
