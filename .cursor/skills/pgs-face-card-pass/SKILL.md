---
name: pgs-face-card-pass
description: >-
  Purple Events / listing face cards: desk pass then mob pass, one state at a
  time, shared preview lab, full Figma size (no transform scale). Use when
  building or QC'ing face cards, upcoming rails, or /preview/purpleevents-face.
---

# PGS face card pass (locked pattern)

Owner lock **2026-09-17**. First face (event listing face) is **LOCKED**. Future face variants follow this same workflow and can populate the **same** preview page.

## Preview (chrome shell)

| | |
|---|---|
| **Lab** | [/preview/purpleevents-face](/preview/purpleevents-face) |
| **Local** | `http://localhost:7100/preview/purpleevents-face` (or current `next` port) |
| **Mount** | Locked modular chrome + `PurpleEventsFaceLab` (same pattern as session lab) |
| **Import** | `PurpleEventsFaceCard` from `src/features/purple-events/face-card/` |

Living map: [`docs/PURPLE-EVENTS-ARCHITECTURE.md`](../../docs/PURPLE-EVENTS-ARCHITECTURE.md) → Face card module.

## Files

| Piece | Path |
|---|---|
| Card | `src/features/purple-events/face-card/purple-events-face-card.tsx` |
| CSS | `src/features/purple-events/face-card/purple-events-face-card.css` |
| Fixtures | `src/features/purple-events/face-card/content.ts` |
| Lab | `src/features/purple-events/face-card/purple-events-face-lab.tsx` |
| Preview route | `src/app/preview/purpleevents-face/page.tsx` |

## Size / bands (do not invent)

| Band | Layout | Artboard |
|---|---|---|
| **≤600** | Mobile portrait | **176×761** |
| **>1367** | Desktop side-photo | **383×592** |
| **601–1366** | Deferred (iPad) | — |

- **Full Figma size.** No `transform: scale(...)`.
- Desk CSS lives under `@media (min-width: 1367px)`. Mob is default.
- Lab stage: **centered** (`justify-content: center`).

## Workflow we followed (repeat for every new face)

```
1. GO AHEAD FACE (or GO AHEAD FACE <variant>)
2. Desk open only — one card on lab — Figma desk open node
3. Owner QC desk open (size, fonts, CTA inside plate, dates)
4. Desk closed only — same card + wash + closed plate
5. Owner QC desk closed (plate color, wash, non-interactive CTA)
6. Show desk open + closed together (centered)
7. Mobile pass — mob open + closed (same fixtures / same preview URL)
8. Owner QC mob (hang clearance, badges, share, closed plate)
9. Lock variant → document Figma nodes in architecture MD
10. Next variant → same lab page (new fixture row / section), same passes
```

**One at a time.** Do not ship open+closed+desk+mob in one blind diff. Owner said: desktop first, one face, then closed, then mobile.

### Content / visual rules learned

| Topic | Lock |
|---|---|
| Closed plate fill | `#C1F177` (not wash grey) |
| Wash | `#D9D9D9` · desk `mix-blend-mode: hue` · mob `saturation` |
| Learn More | **16px**; stays **inside** the plate |
| Dates | Day large; month+year **one line** (`Dec 25`); one time line under each date |
| Mob speaker chip | Hangs below photo — **reserve padding** on media so headline does not overlap |
| A11y | Body/meta ≥14–16px where Figma was 11–12; report `FIGMA ACCESSIBILITY ADAPTATION` |
| Heart / saved | Deferred until named GO AHEAD |

### Figma nodes (event face v1 — locked)

| State | Desk | Mob |
|---|---|---|
| Pair | [`18961:13084`](https://www.figma.com/design/7WFrAbx3cvXReZxtTiQ76r/all-pages-v6?node-id=18961-13084) | [`1242:7585`](https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/cas-v6---mobile?node-id=1242-7585) |
| Open | `18961:12995` | `1242:7586` |
| Closed | `18961:13038` | `1242:7587` |

## Future faces on the same preview

1. Add fixtures in `content.ts` (or sibling fixture file).
2. Mount another centered row/section in `purple-events-face-lab.tsx` (label the variant).
3. Reuse `PurpleEventsFaceCard` if layout matches; else new module under `face-card/` with same desk→mob pass.
4. Do **not** invent a second preview URL unless the owner asks.

## Consumers (later)

- **E8** Upcoming sessions rail imports `PurpleEventsFaceCard` — skill `pgs-upcoming-sessions`, gates **E8a→E8e** (logic first), **6** fixtures for scroll, Figma desk `18961:12017` · mob `1248:7623`
- Listings / purpleboard / saved — same import when those gates open

## Checklist (agent)

- [ ] Propose → wait for `GO AHEAD FACE` / variant name  
- [ ] Desk open → QC → desk closed → QC → pair → mob  
- [ ] Full artboard size (no scale)  
- [ ] Lab centered; chrome shell on preview  
- [ ] Update `docs/PURPLE-EVENTS-ARCHITECTURE.md` phase log + Figma nodes  
- [ ] Stop for owner Preview QC before next variant  
