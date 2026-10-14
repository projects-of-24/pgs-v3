# Frontend gap analysis — desk · iPad · phone

Owner lock. Carry across chats. Do **not** invent a new rhythm per page.

**Companion:** [`FRONTEND-IPAD-HEADER-LOCK.md`](./FRONTEND-IPAD-HEADER-LOCK.md) · H-R measure snippet in [`HR-PAGE-PROMPT.md`](./HR-PAGE-PROMPT.md) §H  
**Numbers live in page shells** as `--<page>-hero-gap` + `--<page>-section-gap` (same everywhere).

---

## When (gate order — do not jump)

| Step | Rule |
|---|---|
| During Figma→code | **Do not** tighten inter-block gaps mid-build (owner 2026-09-13) |
| After body blocks mounted | One **GAP** pass — inventory + rhythm — before mark LOCK |
| H-R body QC | Apply **GAP LOCK** token + measure with §H snippet · then owner named nudges |
| iPad / phone | Same pass covers all three bands — Opus plans four bands; gap values are two roles (hero · rest) |

Never open a “spacing only” rewrite of QC’d blocks while building another section.

---

## GAP LOCK (owner 2026-10-10) — current truth

**CSS px** (content-to-content). Same on desk · iPad · phone:

| Seam | Gap |
|---|---|
| **Hero → first body section** | **60px** |
| **Every later section → section** | **80px** |

**Total = content-to-content.** `margin-top` alone. Sections must **lose padding-block** (no pad-top/pad-bottom stacking on the gap). Hero top / univMeet untouched.

```css
/* Pattern — every modular page shell */
.<page>-preview-shell {
  --<page>-hero-gap: 60px;
  --<page>-section-gap: 80px;
}
/* Every section after hero: */
.<page>-preview-shell__body > :not(.__univ-gap):not(.hero) {
  margin-top: var(--<page>-section-gap); /* 80 */
}
/* Must beat :not():not(.hero) specificity or hero seam stays 80 */
.<page>-preview-shell .<page>-preview-shell__body > .hero + * {
  margin-top: var(--<page>-hero-gap); /* 60 */
}
/* Sections lose outer padding-block. Hero top / univMeet gap untouched. */
```

**Already shipped on this lock:** Finance · Scholarship · Explore · Uni Tie-up · Purple Events · Programs/Courses · About · Premium Home · CV Ready · Premium USMLE / PLAB / AMC (lab + lab-2) · Non-medical.

### Superseded (do not use for new pages)

| Older | Status |
|---|---|
| About option A (2026-09-27): on screen **100 · 100 · 72** | **Superseded** |
| GAP LOCK desk **100** / iPad 60 / phone 80 (2026-10-03) | **Superseded** |
| Flat desk **60** everywhere (brief 2026-10-10) | **Superseded** by hero **60** · rest **80** |
| Per-block mid-build gap tweaks | Forbidden until GAP gate |

---

## How to run the pass

1. **Inventory** — list body blocks top→bottom (Figma order). Structure parity PASS/FAIL.
2. **Rhythm table** — for each pair, Figma Y gap vs lab measured gap @ **1500 · ~768–1100 · 390** (desk · iPad · phone).
3. **Apply GAP LOCK** — hero→next **60** · rest **80**. Zero section `padding-block` so total stays content-to-content.
4. **Measure** with HR-PAGE-PROMPT §H gap snippet (content box edges, not padding fluff).
5. **Correct only pairs that miss** — overhanging badges (add overhang to that block’s margin) · empty reserved room at block bottom (trim, scoped per band).
6. **Leave on purpose and report:** toggled panels that reserve taller height · body→footer chrome margin · intentional hangs / pull-ups (e.g. USMLE student block). **Do not** invent fixed `height` on stages to “fit” a hang — owner lock **`height: auto` only** ([`PREMIUM-MEDICAL-MODULAR.md`](./PREMIUM-MEDICAL-MODULAR.md)).
7. Owner Preview QC → freeze. Do not reopen for a later flex pass.

### Named exceptions (keep)

| Exception | Rule |
|---|---|
| Scholarship hero → intro | **Half** section gap → **40** (all bands) |
| Explore S2 leftovers | Huge air pairs deferred to final UI QC + iPad — fix only on owner batch, page-local CSS |
| Shared-module margins | Do not drive-by edit Highlights / Picks / Expense shared CSS for one page’s gap — override in page shell |

---

## Explore Countries — worked example

Hero CTA (“Set Up a Quick Call” / trust line) → country switcher = **60**. Switcher → bento → univ → expense → hub → picks = **80** each.

- Shell on GAP LOCK hero **60** / rest **80** (`explore-countries-preview-shell.css`).
- Desk **+ iPad + phone**: padding-block killed on seams; shared modules forced to `var(--ec-section-gap)` (not USMLE-frame 110/237/294).
- Phone E3: stage `height: auto` · hang in-flow under checks (was absolute in fixed 579).
- Also locked in portable skill **`friend-not-yes-man`** — do not re-negotiate mid-QC.

---

## Premium medical

[`PREMIUM-MEDICAL-MODULAR.md`](./PREMIUM-MEDICAL-MODULAR.md): gate **GAP** = after Figma-to-code, before LOCK. Lab-2 shells already carry GAP LOCK **hero 60 · rest 80**. Do not invent a fourth rhythm for PLAB/AMC — copy USMLE.
