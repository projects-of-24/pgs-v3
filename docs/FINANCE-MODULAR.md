# Finance (#purpleFinance) — modular body map

Living map for the owner. Update only at **phase ends**, not every pixel tweak.

Branch: `feat/finance-modular`

---

## Two surfaces

| Surface | URL | What it is |
|---|---|---|
| **Preview (QC lab)** | `/preview/finance` | Same modular body + side-test banner. |
| **Live** | `/finance` | **CUTOVER DONE** — modular React body, Hostinger-free. |
| **CMS logos** | `/admin/content/modules/finance_partner_logos` | Swap partner logo images (W1). |

Legacy Hostinger HTML (`src/legacy/generated/finance/*`) is **no longer served** by `/finance`. Keep files as archive until owner deletes.

---

## Figma authority

| Band | Frame | Node |
|---|---|---|
| Desktop | `#purpleFinance` | `17041:17378` (file `all-pages-v6`) |
| Mobile | `#purpleFinance` | `217:5249` (file `cas-v6---mobile`) |

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
| 1 | Hero (card + title + bullets + eligibility CTA) | **F1** | **PASSED** |
| 2 | Partner logos strip | **F2** | **PASSED** |
| 3 | Funding story + checklist + stats | **F3** | **PASSED** |
| 4 | Talk CTA (“Not sure where to begin?”) | **F4** | **PASSED** |
| 5 | FAQ’s accordion | **F5** | **PASSED** |
| — | Motion (logo marquee + entrances + FAQ ease) | **FM** | **PASSED** |
| — | Partner logos CMS image swap | **W1** | **PASSED** |
| — | Live Hostinger-free cutover | **CUTOVER** | **DONE** |

**Visual lock:** body F1–F5 **LOCKED**.

**Mobile rail:** ≤600 reading blocks = **85%** width, centered.

**No black preview banner (owner lock):** never show a side-test strip. Body uses `margin-top: calc(-1 * clamp(88px, 11vw, 157px))` so content starts at the closed toggle on desktop + mobile (preview and live).

---

## DEFERRED — popup pass

| Item | Note |
|---|---|
| **Check Your Eligibility** | Hostinger opened `#applicantPremiumModal` (loan-check form). **Do not wire in backend gates.** Ship in dedicated **popup pass**. Button stays visual-only until then. |
| Talk CTA deep wire | Still visual `button` (was `href="#"`). Optional later — not a modal in Figma. |
| Logo click URLs | Owner: image swap only (W1). |
| iPad band | 601–1366 deferred. |
| CMS copy slots | `cms_pages` finance string slots exist; modular body still uses fixtures for text. |

---

## Backend Kanban

### CONNECTION MAP (W1 logos)

```text
Admin CMS → finance_partner_logos.image_asset_id → media_assets
Live/Preview → getFinancePartnerLogos() → FinanceLogos <img>
```

### DAY-1 SECURITY (W1)

| Risk | Measure |
|---|---|
| Public write | RLS published select only; writes need `content.manage` |
| Forge media path | UUID FK only; URL from `marketingMediaUrl()` |
| Delete media in use | media DELETE checks this table |

### KNOWN GAPS

| Gap | Later |
|---|---|
| Eligibility popup | **Popup pass** |
| Talk CTA destination | Optional wire |
| FAQ / hero copy from `cms_pages` | Content wire |

### Suggested logo image size

**280×80 px** PNG/WebP (or 140×40 @2x), transparent, under ~100 KB.

---

## Phase log

| Date | Note |
|---|---|
| 2026-09-09 | **P0–F5** modular body + **FM** motion + visual lock |
| 2026-09-09 | Mobile **85%** rail locked in skills |
| 2026-09-09 | **W1** `finance_partner_logos` CMS image swap |
| 2026-09-09 | **Eligibility popup DEFERRED** to popup pass (not W2a) |
| 2026-09-09 | **CUTOVER** live `/finance` → modular shell (`live`); Hostinger HTML unhooked |
| 2026-09-09 | Removed black preview banner; body align = closed toggle clamp (desktop + mobile) |

---

## QC

- Live: http://localhost:7100/finance  
- Preview: http://localhost:7100/preview/finance  
- CMS logos: `/admin/content/modules/finance_partner_logos`  
- Eligibility button: must **not** open a modal yet (popup pass later).
