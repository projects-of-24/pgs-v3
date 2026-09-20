# explore Countries — modular body map

Living map for the owner. Update only at **phase ends**, not every pixel tweak.

Route: hub for `#exploreCountries` (not a single destination page). Individual country routes (`/countriesusa`, `/countriesuk`, …) stay separate.

---

## Two surfaces

| Surface | URL | What it is |
|---|---|---|
| **Preview (QC lab)** | `/preview/explorecountries` | Locked chrome + modular body (no black banner). |
| **Live** | `/explorecountries` | **CUTOVER DONE** — modular React body, Hostinger-free. |

Legacy Hostinger HTML (`src/legacy/generated/explorecountries/*`) kept on disk for rollback; **not** served by live.

---

## Figma authority

| Band | Frame | Node | File |
|---|---|---|---|
| Desktop | `explore Countries` | `17056:19508` | `all-pages-v6` |
| Mobile | `explore Countries` | `466:7315` | `cas-v6---mobile` |

---

## Responsive bands

| Band | Width | Status |
|---|---|---|
| Desktop | **>1366** | Shell ready |
| Mobile | **≤600** | Shell ready |
| iPad | **601–1366** | Deferred (hero is not mauve-panel; no `pgs-ipad-hero-body` recall) |

---

## Section order (body)

Chrome = LOCKED. Do not rebuild.

| # | Block | Gate | Status |
|---|---|---|---|
| — | Empty preview shell | **P0** | **PASSED** |
| 1 | Hero headline + “Set Up a Quick Call” | **E1** | **READY — owner QC** |
| 2 | Country photo card + country chips + deep-link CTA | **E2** | **READY — owner QC** — one switcher (5 primary). CTA label Figma/legacy “UK 101…”; href swaps. |
| 3 | Bento “Simple, clear, useful” | **E3** | **READY — owner QC** — desk + mob. |
| 4 | Mauritius stack (ger/fra/mur/europe/others) | **E2b** | **READY — owner QC** — desk+mob · CTA `{CODE} 101…` swaps · title swaps. |
| 5 | Second bento (after Mauritius stack) | **E3b** | **READY — owner QC** — desk+mob · no lilac · same copy/cards as E3. |
| 6 | Universities discovery (copy + logos + collage) | **E4** | **READY — owner QC** — remounted after E3b · desk `17056:19761` · mob `473:4836`. |
| 7 | Expense request | **E5** | **READY — owner QC** — shared `premium-expense` (import, not copy). |
| 8 | Support hub | **E6** | **READY — owner QC** — shared `support-hub`. |
| 9 | #Pgs picks | **E7** | **READY — owner QC** — shared `pgs-picks` · fixture cards until CMS `pgs_picks` wired on route. |
| — | Frontend body (Figma-to-code) | **FE** | **COMPLETE** in preview lab — E1–E7 mounted · per-gate owner QC still open. |
| — | Gap analysis | **GAP** | **PASSED — sorted** (2026-09-16) — inventory + rhythm notes below · spacing fixes = separate owner batch. |
| — | Motion (entrances, chip swap, E3 arrow nudge) | **EM** | **PASSED** — `explore-countries-motion.css` · `prefers-reduced-motion` · live untouched. |
| — | Live Hostinger-free cutover | **CUTOVER** | **DONE** — `/explorecountries` modular · Hostinger unhooked. Spacing / iPad = later final UI QC. |

**Mobile width:** Figma inset first. 85% rail only if owner says too edgy.

**No black preview banner (owner lock):** body uses shared `--pgs-premium-shell-pull` clamp so content starts near closed toggle.

**Own CSS only:** feature CSS under `src/features/explore-countries/`. Do not patch Hostinger `style.css` / `responsive.css` / theme JS for this body. Junior parked body = DNA only — never copy.

---

## Shared modules (import, do not copy)

| Block | Folder | Notes |
|---|---|---|
| Expense request | `src/features/shared/premium-expense` | Same module as Premium Home / USMLE |
| Call and email hub | `src/features/shared/support-hub` | Locked email spelling |
| #Pgs picks | `src/features/shared/pgs-picks` | CMS surface `pgs_picks` when wired |

Hero, country switcher, bento, and univ collage stay page-local.

**Not on this page (Figma `17056:19508`):** `outro-cta` — USMLE/Home have it; explore Countries goes **expense → support hub → picks** only. Do not add.

---

## GAP analysis (sorted)

Figma desktop frame `17056:19508` vs `/preview/explorecountries` body. Chrome (header, strip, sidebar, footer) = locked legacy — out of scope.

### Figma node map (body order)

| Gate | Block | Desktop node | Mobile node (where set) | Preview module |
|---|---|---|---|---|
| E1 | Hero | `17056:19552` | `466:7910` | `explore-countries-hero` |
| E2 | Primary switcher | `17056:19694` | card `466:7966` | `explore-countries-switcher` |
| E3 | First bento | `17056:19564` | `470:4751` | `explore-countries-bento` |
| E2b | Mauritius stack | `17056:19615` | `471:4755` | `explore-countries-switcher-secondary` |
| E3b | Second bento | `17056:19720` | `471:4781` | `explore-countries-bento-secondary` |
| E4 | Universities | `17056:19761` | `473:4836` | `explore-countries-univ` |
| E5 | Expense | `17056:19813` | shared `433:5205` family | `premium-expense` |
| E6 | Support hub | `17056:21222` | shared `433:4717` family | `support-hub` |
| E7 | #Pgs picks | `17056:20005` | shared `433:4740` family | `pgs-picks` |

**Structure parity:** all nine body blocks present in Figma order — **PASS**.

### Owner-locked deviations (not bugs)

| Item | Rule |
|---|---|
| E2 primary CTA label | Stays **“UK 101: What to Know”**; only `href` swaps with chip. |
| E2b secondary CTA | **Desk authority:** `{CODE} 101: What to Know` + title + href swap on chip. |
| E3 / E3b mob apps card | Owner **A** — **Fast-tracked** copy (not Figma duplicate shortlist on bottom card). |
| E3 desk | Lilac explore cluster + phone; **E3b** has no lilac strip. |
| Shared E5–E7 | Imported modules — USMLE-tuned margins until page-local overrides approved. |

### Vertical rhythm (desktop — Figma Y vs lab @ 1440)

Approximate **gap between block boxes** (Figma from frame Y/heights · lab = DOM sibling measure 2026-09-16):

| Between | Figma ~px | Lab ~px | Sort |
|---|---:|---:|---|
| E1 → E2 | 29 | 0 | **S2** — tighten hero/switcher if owner wants Figma air |
| E2 → E3 | 24 | 0 | **S2** |
| E3 → E2b | ~150–310* | 1 | **S2** — E3 lilac hang affects Figma measurement |
| E2b → E3b | 24 | 0 | OK |
| E3b → E4 | **265** | **~265** | **S1 DONE** — `explore-countries-spacing.css` |
| E4 → E5 | **195** | **214** | OK (shared expense `margin-top`) |
| E5 → E6 | **195** | **~195** | **S1 DONE** — explore-scoped support-hub margin |
| E6 → E7 | **195** | **265** | **S2** — picks `margin-top: 294px` is USMLE-frame math |

\*E3 Group 316 is taller than 280px rect because of lilac/phone overflow.

**Spacing policy:** do not drive-by tweak shared module CSS. Fixes = **`explore-countries-preview-shell.css` or page wrapper overrides** only, one owner batch (**S1** then **S2**).

### KNOWN GAPS (priority)

| P | Gap | Action |
|---|---|---|
| **QC** | E1–E7 not owner-signed | Live click QC on lab URL · gate-by-gate PASS or punch list. |
| ~~**S1**~~ | E3b→E4 · E5→E6 | **Done** 2026-09-16 — `explore-countries-spacing.css`. |
| **S2 / final UI QC** | Huge / remaining inter-block air (hero, E6→E7, etc.) | **Deferred** — owner checks in later final UI QC + **iPad** phase. Do not mid-cutover. |
| **iPad** | 601–1366 band | **Deferred** — with final UI QC. |
| **CMS** | `#Pgs picks` on route | Wire `picks` prop on preview/live like Premium Home (`getPublished…` / `pgs_picks`). |
| **CMS** | Body copy / country assets | Fixtures in `content.ts` — CMS slots later if owner wants. |
| **Wire** | Hero “Set Up a Quick Call” | Visual only · **popup pass**. |
| **Wire** | Expense “Request it here” | Visual only until expense/popup backend pass. |
| **Band** | iPad 601–1366 | **Deferred** — not mauve-panel hero. |
| **Surf** | Live `/explorecountries` | **CUTOVER DONE** — Hostinger unhooked. |
| **EM** | ~~Motion~~ | **Done** — see EM gate row. Picks carousel scroll unchanged (shared). Swipe = GIF asset. |
| **A11y** | Type floor sweep | Final-draft pass · per-block adaptations already noted in CSS. |

### LOCK checklist (after QC + optional S1)

1. Owner PASS on E1–E7 (or written punch list).
2. ~~**S1**~~ — done 2026-09-16.
3. ~~**EM**~~ — done 2026-09-16.
4. ~~**CUTOVER**~~ — done 2026-09-16. Spacing / iPad = later final UI QC.

---

## DEFERRED

| Item | Note |
|---|---|
| Live cutover | **DONE** — Hostinger archive kept, not served |
| iPad band + final UI spacing QC | Deferred — owner: huge gaps check later with iPad phase |
| Popup / “Set Up a Quick Call” deep wire | Visual-only until popup pass |
| CTA label always “UK 101…” | **Primary E2 only.** Secondary E2b swaps `{CODE} 101…` (desk authority). |
| Inter-block spacing (Figma Y) | **GAP S1/S2** — sorted in GAP section · fix only on owner batch |
| Motion | **EM passed** — page-local CSS only |
| Type floor sweep | Final-draft only · do not mid-build |
| CMS copy slots | Later if needed |

---

## Gate log

| Date | Gate | Note |
|---|---|---|
| 2026-09-15 | **P0** | Empty preview shell `/preview/explorecountries`; live `/explorecountries` Hostinger untouched. |
| 2026-09-15 | **E1** | Hero headline + CTA; desk center 560.8 · mob 151 opening; type floor on CTA/hint/lead/subtitle. Live untouched. |
| 2026-09-15 | **E2** | Country card + chips switcher; default nz; Figma photo + swipe GIF; CTA Link href swaps, label stays “UK 101…”. Second stack deferred. Live untouched. |
| 2026-09-16 | **E2 mob fix** | Phone: country lines space-joined (Figma one text); body 109 @339; CTA absolute y=77; no CTA/swipe overlap. Desk unchanged. |
| 2026-09-16 | **E3** | Desk bento Group 316; phone hidden. Icons + grad exported. Live untouched. |
| 2026-09-16 | **E3 desk overflow** | Restored Figma `17056:19564`: apps 112.8 · checks@132 · lilac `overflow:clip` only · label+arrow stage siblings · tip/copy 14px a11y note · checklist 16. Overlaps cleared (copy/checks, icon/chip). Lilac hang-below visible. Phone still hidden. |
| 2026-09-16 | **E3 mob** | Figma `470:4751`: 2-col · no grey · tip `&` · check order Clinical→Suggested→QBanks · owner **A** Fast-tracked on apps card. Desk unchanged. Live untouched. |
| 2026-09-16 | **E4** | Univ discovery desk+mob · page-local · assets from `premium-home/univ`. Live untouched. |
| 2026-09-16 | **E4 unmount + E2b** | Univ unmounted (skipped Mauritius stack). E2b Mauritius switcher desk+mob · title+CTA swap on chip · default mur. Second bento next. |
| 2026-09-16 | **E3b** | Second bento `17056:19720` / mob `471:4781` after E2b · no explore lilac · apps Fast-tracked (owner A). E4 still unmounted. |
| 2026-09-16 | **E4 remount** | Owner `GO AHEAD E4` — `ExploreCountriesUniv` after E3b in preview shell · live Hostinger untouched. |
| 2026-09-16 | **E5–E7** | Shared `PremiumExpense` → `SupportHub` → `PgsPicks` after E4 in preview shell · picks prop ready · live untouched. |
| 2026-09-16 | **GAP** | Figma `17056:19508` inventory PASS · rhythm table · KNOWN GAPS sorted P/QC/S1/S2/CMS · FE complete in lab. |
| 2026-09-16 | **EM** | Owner `GO AHEAD EM` — entrances E1–E7 · chip/title swap · E3 explore-arrow nudge · reduced-motion off. |
| 2026-09-16 | **S1** | E3b→E4 + E5→E6 rhythm · desk+mob · spacing CSS · lab gap QC below. |
| 2026-09-16 | **CUTOVER** | Owner `GO AHEAD CUTOVER` — live `/explorecountries` → modular shell (`live`). Hostinger unhooked (archive kept). Huge gaps / S2 / iPad deferred to later final UI QC. |

---

## Per-gate QC (engineering verify — 2026-09-16)

Lab: http://localhost:7100/preview/explorecountries · Live: http://localhost:7100/explorecountries · Owner product PASS + spacing/iPad final QC still open.

| Gate | Engineering | Owner |
|---|---|---|
| P0 | Shell pull, no black banner, gate attrs | Pending |
| E1 | Hero copy, CTA visual, type floor, `466:7910` band | Pending |
| E2 | 5 chips, default nz, CTA label lock, href swap, swipe GIF | Pending |
| E3 | Desk lilac/overflow, mob 2-col, check order, Fast-tracked **A** | Pending |
| E2b | 5 secondary chips, mur default, dynamic `{CODE} 101…` | Pending |
| E3b | No lilac, 280/432 stage, same cards as E3 | Pending |
| E4 | Copy, logo rows, collage picture, a11y type floor | Pending |
| E5–E7 | Shared imports render; picks fixture carousel | Pending |
| S1 | Desk @1440: E3b→E4 **262px**, E5→E6 **194px**; mob @390: E3b→E4 **~99px** | Eng **PASS** · owner Pending |
| EM | Entrances, chip swap, E3 arrow nudge, reduced-motion | Eng **PASS** · owner Pending |
| E2 | Primary CTA href swap + label lock (lab script) | Eng **PASS** · owner Pending |
| E3/E3b | Lilac on E3 only (lab script) | Eng **PASS** · owner Pending |
| E5–E7 | Three shared modules in DOM | Eng **PASS** · owner Pending |
| CUTOVER | Live route serves modular shell | Eng **PASS** · spacing/iPad later |

---

## Preview

- Lab: http://localhost:7100/preview/explorecountries  
- Live (modular, Hostinger unhooked): http://localhost:7100/explorecountries  
