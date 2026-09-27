# Uni Tie-up — modular body map

Living map for the owner. Update only at **phase ends**, not every pixel tweak.

**Rule:** Preview first → owner Preview QC → live `/unitieup`.

---

## Two surfaces (do not confuse)

| Surface | URL | What it is |
|---|---|---|
| **Preview (QC mirror)** | `/preview/unitieup` | Same modular body as live (side-test banner). |
| **Live (cutover DONE)** | `/unitieup` | Purified modular React body. Hostinger `uniTieUpHtml` archive kept, **not served**. |

Chrome aesthetic polish / iPad = later shared pass.

---

## Responsive bands

| Band | Width | Status |
|---|---|---|
| Desktop | **>1366** | Built / QC’d UT1–UT4 |
| iPad | **601–1366** | Deferred |
| Mobile | **≤600** | Built / QC’d where noted |

Ignore Hostinger 767 for this modular family.

---

## Section order (shell)

Source: `src/features/uni-tieup/uni-tieup-preview-shell.tsx`

| Gate | Section | Module | Main files |
|---|---|---|---|
| UT1 | Intro | `uni-tieup-intro` | `uni-tieup-intro.*` |
| UT2 | Hero + Partnership Impact | `uni-tieup-hero` | `uni-tieup-hero.*` |
| UT3 | Co-Developed Initiatives | `uni-tieup-initiatives` | `uni-tieup-initiatives.*` |
| UT4 | `#higlights` | `uni-tieup-highlights` → shared `PremiumHighlights` | `uni-tieup-highlights.*` |

Figma: desk `17067:11021` · mob `524:6634`.  
Partner CTA removed from Figma (no mob) — not on this page.  
Copy/constants: `src/features/uni-tieup/content.ts`  
Assets: `public/assets/img/uni-tieup/`

---

## Locked owner decisions

- Body ends at UT4 `#higlights` → footer (locked chrome)
- Face Pair 9 `program_compact_sm` (80% desk shell) kept; Pair 10 rejected/deleted
- Highlights: shared modular + wheel capture + drag pan desk/mob; no focus ring

---

## Gate log

| Date | Gate | Note |
|---|---|---|
| 2026-09-22 | **UT1–UT4** | Intro → Hero → Initiatives → Highlights in preview lab. |
| 2026-09-22 | **CUTOVER** | Live `/unitieup` → modular shell (`live`). Hostinger unhooked (archive kept). Generator entry retired. |

---

## Preview

- Lab: http://localhost:7100/preview/unitieup  
- Live: http://localhost:7100/unitieup  
