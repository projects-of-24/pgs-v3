---
name: pgs-face-card-pass
description: >-
  Purple Events / listing face cards: desk pass then mob pass, one state at a
  time, shared preview lab, full Figma size (no transform scale). Use when
  building or QC'ing face cards, upcoming rails, or /preview/purpleevents-face.
---

# PGS face card pass (locked pattern)

Owner lock **2026-09-17** (event face). Inventory + pair contract **2026-09-20**.

## Product contract (do not invent)

```text
ONE catalog row (event OR course)
  → face_layout = ONE layout id
  → renders as ONE desk+mob pair (same layout, two bands)
  → tags[] for search/sort · badge/urgency chip (not a face type)
  → Learn More → that row's detail template page
```

Staff do **not** pick separate desk vs mob faces.

### Fixture → live process (owner lock 2026-09-21 · fixtures bank 2026-09-22)

```text
1. Face UI pair-by-pair on /preview/purpleevents-face (Figma pgs-facecards)
2. FACE-FIXTURES DONE — 5 events + 5 courses per face_layout
   → `face-fixtures.ts` · `listFaceFixtures()` · /preview/face-fixtures
3. Temporary listing rails (CV Ready · programs · saved · …) consume face components + fixtures
4. Later: replace with real catalog rows · flush fixture / seed data
```

**OK / ADOPT.** Do not invent a second listing product. Same `face_layout` field when B\* rebuilds. Fixtures ≠ production truth.

Living map: [`docs/PURPLE-EVENTS-ARCHITECTURE.md`](../../docs/PURPLE-EVENTS-ARCHITECTURE.md) → Face cards (T6).  
B\* management: [`docs/CATALOG-B-STAR.md`](../../docs/CATALOG-B-STAR.md).

## V1 face inventory

Canonical Figma: [`pgs-facecards`](https://www.figma.com/design/reEbIrfkffyoIzXQyVm09z/pgs-facecards?node-id=0-1) (`reEbIrfkffyoIzXQyVm09z`).

| Layout id | Figma pair | Status | Module |
|---|---|---|---|
| `event_session` | Pair 2 | **LOCKED** desk + mob | `purple-events-face-card.tsx` |
| `cvready` | Pair 1 | **LOCKED** desk + mob | `cvready-face-card.tsx` |
| `program_full` | Pair 3 | **LOCKED** desk · mob open cas-v6 `91:2908` (closed mob deferred) | `program-full-face-card.tsx` |
| `program_compact` | Pair 6 | **LOCKED** desk + mob | `program-compact-face-card.tsx` |
| `program_compact_sm` | Pair 9 | **LOCKED** desk + mob · Pair 6 shell @ 80%, type full size | `program-compact-face-card.tsx` (`size="sm"`) |
| `program_compact_sm_desk` | Pair 10 | **LOCKED** desk Pair 9 @ 80% · default `min-height` 474 · grows · mob Pair 6 full | `program-compact-face-card.tsx` (`size="sm_desk"`) |
| `promo` | Pair 5 | **LOCKED** desk + mob | `promo-face-card.tsx` |
| `internship` | Pair 4 | **LOCKED** desk + mob | `internship-face-card.tsx` |
| `calendar_session` | Pair 7 | **LOCKED** desk + mob · **calendar surface only** | `calendar-session-face-card.tsx` |
| `calendar_session_photo` | Pair 11 | **LOCKED** desk + mob · Pair 7 + fixed photo · no Mode · **calendar surface only** | `calendar-session-photo-face-card.tsx` |

Registry: `src/features/purple-events/face-card/face-layouts.ts`  
Lab: **all face UI locked** (listing pairs 1–6 + Pair 9 `program_compact_sm` + Pair 10 `program_compact_sm_desk` + calendar Pair 7 + Pair 11 `calendar_session_photo`).

## Preview (chrome shell)

| | |
|---|---|
| **Lab** | [/preview/purpleevents-face](/preview/purpleevents-face) |
| **Local** | `http://localhost:7100/preview/purpleevents-face` (or current `next` port) |
| **Mount** | Locked modular chrome + `PurpleEventsFaceLab` |
| **Import** | `PurpleEventsFaceCard` from `src/features/purple-events/face-card/` |

## Files

| Piece | Path |
|---|---|
| Layout inventory | `src/features/purple-events/face-card/face-layouts.ts` |
| Card (`event_session`) | `src/features/purple-events/face-card/purple-events-face-card.tsx` |
| Card (`cvready` Pair 1) | `src/features/purple-events/face-card/cvready-face-card.tsx` |
| Card (`internship` Pair 4) | `src/features/purple-events/face-card/internship-face-card.tsx` |
| Card (`promo` Pair 5) | `src/features/purple-events/face-card/promo-face-card.tsx` |
| Card (`calendar_session` Pair 7) | `src/features/purple-events/face-card/calendar-session-face-card.tsx` |
| Card (`calendar_session_photo` Pair 11) | `src/features/purple-events/face-card/calendar-session-photo-face-card.tsx` |
| CSS | `purple-events-face-card.css` · `cvready-face-card.css` · `program-full-face-card.css` · `internship-face-card.css` · `promo-face-card.css` · `program-compact-face-card.css` · `calendar-session-face-card.css` · `calendar-session-photo-face-card.css` |
| Fixtures | `content.ts` · `cvready-content.ts` · `program-full-content.ts` · `internship-content.ts` · `promo-content.ts` · `program-compact-content.ts` · `calendar-session-content.ts` · `calendar-session-photo-content.ts` |
| **FACE-FIXTURES bank** | `face-fixtures.ts` · `listFaceFixtures()` · lab `face-fixtures-lab.tsx` |
| Lab | `src/features/purple-events/face-card/purple-events-face-lab.tsx` |
| Preview route | `src/app/preview/purpleevents-face/page.tsx` |
| Fixtures explorer | `/preview/face-fixtures` |
| Figma | `pgs-facecards` · fileKey `reEbIrfkffyoIzXQyVm09z` |
## Size / bands (`event_session` — do not invent)

| Band | Layout | Artboard |
|---|---|---|
| **≤600** | Mobile portrait | **176×761** |
| **>1367** | Desktop side-photo | **383×592** |
| **601–1366** | Deferred (iPad) | — |

Other layouts: use **their** Figma artboard sizes when that gate opens. Still: **no** `transform: scale(...)`. Lab stage: **centered**.

## Workflow (every new face)

```
1. GO AHEAD FACE <layout_id>  + desk + mob Figma nodes
2. Desk open only — one card on lab
3. Owner QC desk open
4. Desk closed only (if layout has closed) → QC
5. Show desk open + closed together (centered)
6. Mobile pass — mob open + closed
7. Owner QC mob
8. Lock variant → update architecture MD + face-layouts.ts status
9. Next variant → same lab page, same passes
```

**One at a time.** Do not invent chrome for “awaiting Figma” rows.

### Content / visual rules (`event_session`)

| Topic | Lock |
|---|---|
| Closed plate fill | `#C1F177` (not wash grey) |
| Wash | `#D9D9D9` · desk `mix-blend-mode: hue` · mob `saturation` |
| Learn More | **16px**; stays **inside** the plate |
| Dates | Day large; month+year **one line** (`Dec 25`); one time line under each date |
| Mob speaker chip | Hangs below photo — **reserve padding** on media |
| A11y | Body/meta ≥14–16px where Figma was 11–12; report `FIGMA ACCESSIBILITY ADAPTATION` |
| Heart / saved | Figma `heart mobile` `12:310` — **filled** now; outline + saved boolean later |
| **Tags / pills** | **No clip overflow.** If a tag does not fit the remaining row width → wrap to the next line (`flex-wrap: wrap`). Never clip at the card edge. If a wrapped row needs height, grow the panel (`height: auto` / `overflow: visible`) — do not hide the tag. **Row gap (vertical between wrapped tag lines): 2px.** **Gap from yellow perk / scholarship block → tags: `margin-bottom: 10px` on perk** (owner-measured). |

### Figma nodes (`event_session` — locked)

| State | Desk | Mob |
|---|---|---|
| Pair | [`18961:13084`](https://www.figma.com/design/7WFrAbx3cvXReZxtTiQ76r/all-pages-v6?node-id=18961-13084) | [`1242:7585`](https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/cas-v6---mobile?node-id=1242-7585) |
| Open | `18961:12995` | `1242:7586` |
| Closed | `18961:13038` | `1242:7587` |

## Consumers (later)

- **E8** Upcoming imports `PurpleEventsFaceCard` — skill `pgs-upcoming-sessions` (**LOCKED**)
- Listings / purpleboard / saved — B\* + face imports when gates open

## Checklist (agent)

- [ ] Propose → wait for `GO AHEAD FACE <layout_id>` + Figma nodes  
- [ ] Desk open → QC → desk closed → QC → pair → mob  
- [ ] Full artboard size (no scale)  
- [ ] Lab centered; chrome shell on preview  
- [ ] Update `face-layouts.ts` + architecture phase log  
- [ ] Stop for owner Preview QC before next variant  
