# Scholarship (#purpleScholarships) — modular body map

Living map for the owner. Update only at **phase ends**, not every pixel tweak.

Branch: `feat/finance-modular` (shared public modular lane until owner splits)

---

## Two surfaces

| Surface | URL | What it is |
|---|---|---|
| **Preview (QC lab)** | `/preview/scholarship` | Locked chrome + modular body (no black banner). |
| **Live** | `/scholarship` | **CUTOVER DONE** — modular React body, Hostinger-free. |

Legacy Hostinger HTML (`src/legacy/generated/scholarship/*`) kept on disk for rollback; **not** served by live.

---

## Figma authority

| Band | Frame | Node |
|---|---|---|
| Desktop | `#purpleScholarships` | `17041:18349` (file `all-pages-v6`) |
| Mobile | `#purpleScholarships` | `323:3396` (file `cas-v6---mobile`) |

---

## Responsive bands

| Band | Width | Status |
|---|---|---|
| Desktop | **>1366** | Active |
| Mobile | **≤600** | Active |
| iPad | **601–1366** | **Deferred** |

---

## Section order (body)

Chrome = LOCKED. Do not rebuild.

| # | Block | Gate | Status |
|---|---|---|---|
| — | Empty preview shell | **P0** | **PASSED** |
| 1 | Hero (headline + Book CTA + #purplepremium card) | **S1** | **PASSED** |
| 2 | Intro + example awards + Myth/Truth | **S2** | **PASSED** |
| 3 | Scenario cards (6 mini visual cards) | **S3** | **PASSED** |
| 4 | Plan strip + process checklist | **S4** | **READY — owner QC** |
| 5 | Steps 1–3 + testimonial + Find CTA | **S5** | **READY — owner QC** |
| 6 | FAQ “Things you should know” (tabs + accordion) | **S6** | **READY — owner QC** |
| 7 | Batch stats carousel | **S7** | **READY — owner QC** |
| — | Motion (batch arrows + CSS) | **SM** | **READY — owner QC** |
| — | Live Hostinger-free cutover | **CUTOVER** | **DONE** |

**Mobile rail:** ≤600 reading blocks = **85%** width, centered — **except S4** (owner lock: Figma-exact: strip 290 / copy 252 / checklist 309).

**No black preview banner (owner lock):** body uses shared `--pgs-premium-shell-pull` clamp so content starts near closed toggle.

**Premium panel lock (owner 2026-09-09):** sizes/page position live in `src/features/premium-panel/premium-panel-lock.css` (**fluid clamp**). Reuse on `#purplepremium` section pages — import that file; do not re-hardcode Scholarship px.

| Band | Locked tokens (clamp → scouted max) |
|---|---|
| Desktop | panel max 877 · min-h 490 · media 629×343 · univ gap ~74 (≈20px under `#univMeet`) |
| Mobile | opening 151 centered · panel 290×450 · media h 357 · hero pad-top clamp · rail 85% · text floor 14px |

Hero photo: `public/assets/img/scholarship/hero-premium.jpg`

---

## DEFERRED — popup pass

| Item | Note |
|---|---|
| **Book Your Free Scholarship Call** / apply CTAs | Legacy `SCHOapplicantPremiumModal*`. **Do not wire now.** Buttons visual-only until popup pass. |
| iPad band | 601–1366 deferred. |
| Type floor | Final-draft only. Minimum text now at 13/14 lifts to 16 on phone, iPad, desktop. 20px+ left alone unless visual QC. Do not sweep during fast QC. |
| CMS copy slots | Later content wire if needed. |

---

## Phase log

| Date | Note |
|---|---|
| 2026-09-09 | **P0** empty preview shell `/preview/scholarship`; live Hostinger untouched |
| 2026-09-09 | **S1** hero (headline + Book CTA visual-only + premium panel); a11y bump CTA/hint size |
| 2026-09-09 | S1 QC: desktop start = univMeet bottom + 20px; mobile card overlay per Figma |
| 2026-09-09 | Fixed hero image; locked premium panel tokens (fluid clamp) for Premium reuse |
| 2026-09-09 | Panel copy stacked under photo (no image-over-text) desktop + mobile |
| 2026-09-09 | **S2** intro copy + examples + Myth/Truth |
| 2026-09-09 | S1 typography lock: title/lead clamps · mobile text floor 14px |
| 2026-09-09 | S2 mobile type 16px via `--sch-intro-*` vars (DevTools-friendly) |
| 2026-09-09 | **S3** scenario heading + 6 mini visual cards + arrow note |
| 2026-09-09 | S3 note+arrow centered on desktop |
| 2026-09-09 | **S4** plan strip + process copy + 8-step checklist (Find CTA → S5) |
| 2026-09-09 | S4 mobile widths Figma-exact (290 / 252 / 309) |
| 2026-09-09 | **S5** steps 1–3 + Raina testimonial + Find CTA (visual-only; pager decorative) |
| 2026-09-09 | **S6** FAQ tabs + Basics accordion (Q2 answer + Process/Timeline empty — no invent) |
| 2026-09-09 | **S7** Find Premium disclaimer+arrow · batch tips carousel (visual-only pager) |
| 2026-09-09 | **SM** batch arrows/dots work · CSS slide/fade · slides 2–3 = Figma slide 1 until owner copy |
| 2026-09-09 | **CUTOVER** live `/scholarship` → modular shell (`live`); Hostinger HTML unhooked |

---

## QC

- Preview: chrome OK · body under closed toggle · no black strip · desktop + mobile.
- **S1:** headline + black Book CTA (does **not** open modal) · mauve premium panel + trust line · mobile 85% rail.
- **S2:** intro (2nd sentence italic semibold) · For example - + 3 green checks · Myth/Truth yellow cards · mobile 16px.
- **S3:** Bebas heading · 6 scenario cards (3×2 desk / 2×3 mob) · arrow note centered · tip ≥14px.
- **S4:** black/yellow plan strip · process copy · 8 green-check steps · mobile 16px · **mobile widths Figma-exact** (strip 290 / copy 252 / checklist 309 — not 85% rail).
- **S5:** Bebas steps heading · 3 bordered Step cards · Raina testimonial + decorative pager · Find CTA visual-only · mob steps horizontal scroll (474 track) · bullet a11y ≥14px.
- **S6:** Things you should know · 3 tabs · Basics accordion (Q1 open) · Q2 + Process/Timeline deferred empty · answer ≥14px.
- **S7:** Find disclaimer + arrow · batch card (2025 Batch) · arrows/dots visual-only · mob “Useful Tips…” heading.
- **SM:** batch prev/next + dots work · CSS enter animation · `prefers-reduced-motion` · slide 2/3 same Figma copy until replaced.
- **Live `/scholarship`:** modular body (Hostinger unhooked) · CTAs visual-only · same as preview.
