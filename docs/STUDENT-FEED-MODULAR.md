# Student #feed — modular body map

Living map for the owner. Update only at **phase ends**, not every pixel tweak.

**Rule:** Preview first → owner Preview QC → only then pull to live `/student/dashboard`.

Same method as [`docs/USMLE-ROTATION-MODULAR.md`](./USMLE-ROTATION-MODULAR.md) (on `feat/countries-modular-compose`).

---

## Two surfaces (do not confuse)

| Surface | URL | What it is |
|---|---|---|
| **Preview (side-test)** | `/preview/student-feed` | Modular React body under **locked chrome** (header / strip / sidebar / footer composed, not edited). Safe to break while building. |
| **Live (Hostinger)** | `/student/dashboard` | Still legacy Hostinger for non-Premium + existing Premium React. **Unchanged** until an explicit live pull. |

---

## Responsive bands (this family)

| Band | Width | Status |
|---|---|---|
| Desktop | **>1366** | Active — identity card + shell |
| Mobile | **≤600** | Active — identity card + shell |
| iPad | **601–1366** | **Deferred** (no Figma iPad feed yet — separate pass) |

Ignore Hostinger 767 for this modular family.

---

## Section order (preview shell)

Source: `src/features/student-feed/student-feed-preview-shell.tsx`

| # | Section | Module `data-pgs-module` | Status | Figma (when known) |
|---|---|---|---|---|
| 1 | Identity card | `student-feed-identity-card` | **IN QC** — center + edge clamp + from-top | Desktop `18657:10454` · Mobile `207:2217` |
| 2 | Quick Dashboard | `student-feed-quick-dashboard` | Slot + lock | TBD next |
| 3 | Top picks | `student-feed-top-picks` | Slot | TBD |
| 4 | Notes + actions | `student-feed-notes-actions` | Slot | TBD |
| 5 | Help Hub / unlock copy | `student-feed-help-hub` | Slot | TBD |
| 6 | Where You Stand (+ finalized / tasks) | `student-feed-where-you-stand` | Slot + lock | TBD |
| 7 | Comments | `student-feed-comments` | Slot + lock | TBD |
| 8 | Upcoming Events | `student-feed-upcoming-events` | Slot | TBD |

Assets: `public/assets/img/figma-feed/`

---

## How we work

1. **Propose → GO AHEAD → implement → Preview QC**
2. Fill **one Figma section at a time** into an existing slot (desktop + mobile)
3. Do **not** edit locked chrome files unless owner reopens by name
4. Hostinger CSS = reference only — never design authority
5. **iPad** = separate pass after desktop + mobile complete
6. Live Hostinger cutover = separate owner-approved step

Skills (this branch): `.cursor/skills/pgs-master-workflow`, `pgs-modular-public-chrome`, `pgs-propose-before-code`, `pgs-no-touch-unapproved-ui`, `pgs-never-invent`, `pgs-scout-what-why-how`, `pgs-public-move-out`, `pgs-owner-teach-map`

---

## Deferred

- iPad mid-band Figma + QC
- Premium unlocked feed body
- Live `/student/dashboard` pull
- CMS wiring for feed cards / metrics
