# About Us — modular body map

Living map for the owner. Update only at **phase ends**, not every pixel tweak.

Branch: `feat/finance-modular` (shared public modular lane until owner splits)

---

## Two surfaces

| Surface | URL | What it is |
|---|---|---|
| **Preview (QC lab)** | `/preview/about` | React chrome (`PublicHeader` · `PublicStrip` · `PublicFooter`) + owned split + modular body. Same tree as live. |
| **Live** | `/about` | **H-R DONE + LOCKED (2026-09-27)** — React chrome, owned split, no Hostinger main.js, no chrome strings. First Hostinger-free page. |

---

## Figma authority

| Band | Frame | Node |
|---|---|---|
| Desktop | `About Us` | `17057:13203` (file `all-pages-v6`) |
| Mobile | `About Us` | `508:8361` (file `cas-v6---mobile`) |

---

## Responsive bands

| Band | Width | Status |
|---|---|---|
| Desktop | **>1366** | Active |
| Mobile | **≤600** | Active |
| iPad | **601–1366** | **Hero only** — saved card (copied once from the QC'd phone card). Not a live ×1.4. Rest of body still deferred. |

---

## Section order (body)

Chrome = LOCKED. Do not rebuild.

| # | Block | Gate | Status |
|---|---|---|---|
| — | Empty preview shell | **P0** | **PASSED** |
| 1 | Hero (about / purpleguide.study + mauve panel + trust + #PGS note/arrow) | **A1** | **READY — owner QC** |
| 2 | Intro (desktop) + Live Activity strip | **A2** | **READY — owner QC** |
| 3 | Why 98% accepted (stat containers) | **A3** | **READY — owner QC** |
| 4 | Who / What comparison + yes switches | **A4** | **READY — owner QC** |
| 5 | USP strip + online-first | **A5** | **READY — owner QC** |
| 6 | Since 2006 note + history intro | **A6** | **READY — owner QC** |
| 7 | Evolution Timeline | **A7** | **READY — owner QC** |
| 8 | Meet The Founder | **A8** | **READY — owner QC** |
| 9 | our advisory team | **A9** | **READY — owner QC** |
| 10 | #PGS in the news | **A10** | **READY — owner QC** |
| 11 | The #PGS Ecosystem | **A11** | **READY — owner QC** |
| 12 | Outro CTA (Ready to get started?) | **A12** | **READY — owner QC** |
| 13 | FAQ (tabs + accordion) | **A13** | **READY — owner QC** |
| — | Motion | **AM** | Pending (after visual lock) |
| — | Live Hostinger-free cutover | **CUTOVER** | **DONE** |

**Mobile rail:** ≤600 reading blocks = **85%** width, centered.

**No black preview banner (owner lock):** body uses shared `--pgs-premium-shell-pull` clamp so content starts near closed toggle.

**Premium panel lock:** Phone and desktop hero sizes still come from `premium-panel-lock.css`. Do not edit that file for iPad. **iPad hero sizes are saved in `about-hero.css`** (406×630 card, 499.8 photo, 211.4 opening column). A later phone or CMS edit must not rewrite them.

**Desk type lock (owner 2026-09-11):** A1–A6 (hero local clamps · intro · why · audience · usp · online · history) desk `font-size` = `calc(clamp(…) * 0.8)`. Do **not** retune without owner reopen. Untouched by this lock: Live Activity · Timeline/Gantt (A7+) · mobile `≤600` · shell · `--pgs-premium-desk-*` tokens.

**A1 notes:** Mobile opening = hub intro copy (`508:8370`); desktop same intro deferred to **A2**. Hero photo: Figma MCP asset was empty → used Scholarship hero bytes (same pexels shoot) at `public/assets/img/about/hero-about.jpg`.

---

## DEFERRED

| Item | Note |
|---|---|
| Popup / CTA deep wires | Visual-only until popup pass. |
| iPad band | 601–1366: hero is its own saved card. Other About sections still deferred. |
| CMS copy slots | Later if needed. |
| FAQ Learning / Refund + Q2 answer | Empty until owner supplies About-real copy (no invent). |
| Live cutover | **DONE** — `/about` serves the modular body. Hostinger `aboutHtml` is archive only. |

---

## Gate log

| Date | Gate | Note |
|---|---|---|
| 2026-09-09 | **P0** | Empty preview shell `/preview/about`; live `/about` Hostinger untouched. |
| 2026-09-09 | **A1** | Hero panel + trust + #PGS note/arrow; mobile opening; live untouched. |
| 2026-09-09 | **A2** | Desktop intro + Live Activity strip (CSS marquee autoscroll 112s/88s; pause on hover). |
| 2026-09-09 | **A3** | Why 98% — 5 stat cards (desk row · mob 3+2 grid). |
| 2026-09-09 | **A4** | Who is #PGS for / What we do — 5 rows + visual yes switches. |
| 2026-09-09 | **A4 fix** | Mobile Figma-exact: 348px stage · switches left of Who rows · note/arrow rail · What offset 131px. |
| 2026-09-09 | **A5** | USP grey strip + yellow subway arrows · Online-first 3D switch + headline + footnote. Live untouched. |
| 2026-09-11 | **A5 toggle** | Switch interactive: ON Figma · OFF Hostinger `#offlineContent`; stacked panels keep height stable. Preview only. |
| 2026-09-11 | **A6** | Since 2006 sticky NOTE + history intro. Timeline deferred to A7. Preview only. |
| 2026-09-11 | **A7** | Evolution Timeline — desk year matrix + yellow chips · mob horizontal-scroll Gantt. Preview only. |
| 2026-09-11 | **A7 fix** | Mob: keep full Gantt (not stacked); swipe sideways to see all years. |
| 2026-09-11 | **A8** | Meet The Founder — photo + name/title/email + bio. Preview only. |
| 2026-09-11 | **A9** | Advisory team — 3 folder cards; purple darkened #7a4ff0 for AA. Preview only. |
| 2026-09-11 | **A10** | News strip — desk 3 static · mob Figma carousel (1 card + arrows, 212.4px). Preview only. |
| 2026-09-11 | **A11** | Ecosystem 10-point checklist — desk 2 cols · mob stack 85% rail. Subtitle #b070f5 (AA). Preview only. |
| 2026-09-11 | **A12** | Outro CTA — Let’s Go / Ready to get started? / Start Your Journey (visual-only). Preview only. |
| 2026-09-11 | **A13** | FAQ tabs + accordion — Figma Programme Details only; Learning/Refund empty; Q2 answer empty. Preview only. |
| 2026-09-11 | **Desk type QC** | A1–A6 desk `font-size` = `calc(clamp(…) * 0.8)`. Live Activity / Gantt / mob / shell untouched. |
| 2026-09-11 | **Desk type LOCK** | Owner QC pass — lock `×0.8` on A1–A6. Reopen by name only. |
| 2026-09-11 | **iPad hero** | 601–1366 = mobile hero composition ×1.4. A2 intro hidden ≤1366. Shell/body/lock file untouched. |
| 2026-09-12 | **iPad type floor** | 601–1366 body text floor 16px. Desk ×0.8 lock and ≤600 unchanged. Timeline excluded. |
| 2026-09-12 | **Type floor (later)** | Final-draft only. Minimum text now at 13/14 lifts to 16 on phone, iPad, desktop. 20px+ left alone unless visual QC. Do not sweep during fast QC. |
| 2026-09-12 | **iPad hero freeze** | Saved the QC'd iPad card as its own sizes. No live phone token ×1.4. Phone and desktop untouched. |
| 2026-09-12 | **CUTOVER** | Live `/about` serves the modular shell (`data-cutover=LIVE`). Hostinger `aboutHtml` not served. Locked chrome still uses shared shell CSS. |

---

## Preview

- Lab: http://localhost:7100/preview/about  
- Live: http://localhost:7100/about  
