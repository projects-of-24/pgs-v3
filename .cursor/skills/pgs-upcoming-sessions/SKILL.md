---
name: pgs-upcoming-sessions
description: >-
  Purple Events E8 Upcoming Sessions rail: import locked face cards, 6
  fixtures for scroll QC, phase gates E8a–E8e (logic → desk → mob → interact →
  lock). Use when building or QC'ing the upcoming block on
  /preview/purpleevents-lite#pe-e8.
---

# PGS Upcoming Sessions rail (E8)

Owner lock **2026-09-17**. Replaces old “two upcoming sessions” Figma with the **face-card rail**.

**Status: LOCKED** — owner QC desk + mob passed 2026-09-17.

Living map: [`docs/PURPLE-EVENTS-ARCHITECTURE.md`](../../docs/PURPLE-EVENTS-ARCHITECTURE.md) → E8 Upcoming.

Face cards: [`pgs-face-card-pass`](../pgs-face-card-pass/SKILL.md) — **do not redesign** cards inside this rail.

## Figma (authority)

| Band | Node | What you see |
|---|---|---|
| Desk | [`17071:13481`](https://www.figma.com/design/7WFrAbx3cvXReZxtTiQ76r/all-pages-v6?node-id=17071-13481) | Centered heading · left stacked arrows · ~3× desk face (383×592) · gap 43 · 1326 rail |
| Mob | [`1248:7623`](https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/cas-v6---mobile?node-id=1248-7623) | Heading · ~2× mob face (176×761) · bottom arrow pair |

**Deprecated for this block:** mob `551:6872` (old two-up) — do not build from it.

## Preview

| | |
|---|---|
| **Session lab** | [/preview/purpleevents-lite#pe-e8](/preview/purpleevents-lite#pe-e8) |
| **Face lab** (card-only QC) | [/preview/purpleevents-face](/preview/purpleevents-face) |

## Data (UI fixtures only · B* links DB later)

| Now (E8a–E8e) | Later (B*) |
|---|---|
| **6** fake events in TypeScript fixtures only — **no database, no Supabase** | Real catalog / upcoming rows |
| Rail maps array → `PurpleEventsFaceCard` | Staff set **show N** (1, 2, 3, …) — same rail |
| Paint + scroll QC only | Publish fail-closed |

**Replace:** old two-up / legacy upcoming compositions (owner old screenshots + deprecated `551:6872`) → new desk `18961:12017` + mob `1248:7623`. Do not keep both.

**Why 6:** Desk window ≈ 3, mob ≈ 2 — extras prove scroll/arrows.

## Pattern (owner lock)

Same idea as **modular highlights** photo strip:

- Horizontal **track** scrolls (swipe / trackpad / arrows)
- **Face cards** sit in the track (where highlights puts photos)
- **No visible scrollbar** (`scrollbar-width: none` + webkit hide)
- Desk: left stacked arrows · Mob: bottom arrow pair

## Phase gates (logic first — one `GO AHEAD` each)

```
GO AHEAD E8a  → Logic: 6 fixtures + types + #pe-e8 stub mount
GO AHEAD E8b / E8c → Desk + mob highlights-style rail (may ship together)
GO AHEAD E8d  → Interact polish if needed
GO AHEAD E8e  → Owner QC → mark E8 DONE in architecture MD
```

Stop after each gate for owner Preview QC. No silent jump.

## Files (target)

| Piece | Path |
|---|---|
| Rail | `src/features/purple-events/upcoming/purple-events-upcoming.tsx` |
| CSS | `src/features/purple-events/upcoming/purple-events-upcoming.css` |
| Fixtures | `src/features/purple-events/upcoming/content.ts` (or `FACE_CARD_RAIL[]` on face content) |
| Mount | `purple-events-preview-shell.tsx` → `#pe-e8` |
| Card | `face-card/purple-events-face-card.tsx` (**import only**) |

## Rules

1. **Import** locked `PurpleEventsFaceCard` — full Figma size, **no** `transform: scale`.
2. Propose → wait for the **named** gate (`E8a` … `E8e`).
3. Content pass on spacing/edges if owner scouts (`pgs-content-pass-then-code`).
4. Do **not** invent a second upcoming card or revive Hostinger two-up markup.
5. Heart / live DB / show-N CMS = **not** E8 — B* / named GO AHEAD.

## Checklist (agent)

- [ ] Read architecture E8 section + this skill  
- [ ] Correct gate only (`E8a` before `E8b`, …)  
- [ ] Six fixtures for scroll; Figma window ≠ fixture count  
- [ ] Desk + mob QC after interact gate  
- [ ] Update architecture phase log on E8e  
