---
name: pgs-ipad-modular-body-pass
description: >-
  Speed playbook for Premium/medical (and similar) iPad body QC after chrome is
  imported. Two iPad bands 601–800 / 801–1366, never 767. Shared modular CSS for
  reusable blocks; freeze QC’d sections; clamp/flex so ~750 does not crush;
  owner DevTools → modular sync. Use on purpleusmle-2 / PLAB / AMC / next iPad
  body passes. Companions: pgs-ipad-paper-pass · pgs-propose-before-code ·
  pgs-no-touch-unapproved-ui · figma-modular-own-css.
---

# iPad modular body pass — speed playbook (USMLE lab-2 lessons)

**Owner lock 2026-10-03.** Built on `/preview/purpleusmle-2`. Goal: next medical iPad pages in hours, not days.

**IGNORE** `pgs-ipad-hero-body` phone×1.4 for these bodies. Use `pgs-ipad-paper-pass` for chrome + owned-split setup; **this skill** for the body QC loop.

Living map: `docs/PREMIUM-MEDICAL-MODULAR.md`

---

## North star (owner 2026-10-03 — all three bands QC passed)

**`/preview/purpleusmle-2` is the north star.** Desk · iPad · phone = **the same content rearranged**, not three different pages. Cutover and every next iPad body learn from findings here — **do not rebuild from scratch**.

| Locked | Rule |
|---|---|
| Chrome | **LOCKED** — import only. Do not redesign chrome on body gates. |
| Chrome click QC | After OWNED_SPLIT / cutover: **hamburger + #toggleBtn must open** (see below) |
| Body clamp | Page body uses the clamp / rail recipes proven on this page |
| Roboto (body / UI) | Minimum **15–16px** (`--pgs-type-floor` → 16 unless owner names 15 for a block) |
| Bebas (display) | Minimum **30px** — do not ship Bebas titles under 30 |
| Invent | **Never** invent layout/copy/components. Only what owner / Figma / Paper / this north star already proved |

### Chrome click QC (owner 2026-10-03 — cutover finding)

On every OWNED_SPLIT lab and live flip, before calling body QC done:

| Control | Band | Must |
|---|---|---|
| Hamburger (`.pgs-header-menu`) | ≤1366 | Opens `#drawer.pgs-header-drawer` (visible, not invisible fade) |
| Toggle box (`#toggleBtn`) | all bands | Opens `#sidebar.active` |

**Do not break again:**

1. `pgs-header-chrome-reset.css` — transition **opacity only**, never `visibility` (visibility transition kept the drawer computed-hidden while “open”).
2. `legacy-page.tsx` — interaction `useEffect` must **not** depend on `children` (rewire thrash on heavy bodies kills clicks).
3. `#toggleBtn` z-index above pulled-up body shells (`z-index: 5` in globals + `pgs-owned-strip.css`).

Files: `src/features/shell/pgs-header-chrome-reset.css` · `src/components/legacy-page.tsx` · `src/app/globals.css` · `src/features/shell/pgs-owned-strip.css`

### Next iPad page — order (body only)

```
1. Chrome already locked — skip redesign
2. Owner shares Figma or Paper rearrange
3. Cursor QC first: do contents match desk or phone? Report to owner
4. Read how owner rearranged vs purpleusmle-2 north-star patterns
5. Ask Opus for a top→bottom plan from: north-star findings + this Figma/Paper
6. Execute one gate at a time — decide per block:
   · reuse existing React/CSS (shared modular or page module)
   · adapt north-star recipe
   · rebuild only when owner / reference requires it
7. Never invent beyond what owner asked
```

### Already modular (reuse — do not rebuild)

| Block | Where |
|---|---|
| Hero pattern (this mauve / card family) | Shared / repeated across many pages — mount, do not reinvent |
| Highlights | `src/features/shared/premium-highlights` |
| #PGS picks | `src/features/shared/pgs-picks` |

**Page-specific sorting** = everything else on that track (why, comes, path, know, expense hang, etc.) — still prefer north-star CSS patterns over a fresh design system.

---

## Bands (locked)

| Band | Width | Role |
|---|---|---|
| Desktop | `>1366` | Desk Figma — do not touch unless owner opens |
| Wide iPad | `801–1366` | Figma iPad / 2-col recipes |
| Compact iPad | `601–800` | Stack / clamp — **~750 lives here** (iPad Mini, big-phone landscape, foldables, split view) |
| Phone | `≤600` | Phone Figma — do not touch unless owner opens |

**Never Hostinger `767`.** That cut is why layouts “break at 750.”

Devices ~600–750 CSS px: small tablets portrait · Pro Max / Ultra landscape · foldables · resized browser. iPad Mini ~744–768.

---

## Order every gate (do not skip)

```
1. Scout live width (owner’s px) + winning CSS rule
2. WHAT / WHY / HOW (one relationship)
3. Propose → wait GO AHEAD
4. Implement ONE block (or one named compact-band pass)
5. Measure at 750 + mid wide iPad (e.g. 1024)
6. Owner Preview QC
7. Freeze that block — do not reopen while fixing another
```

Companions: `pgs-propose-before-code` · `pgs-scout-what-why-how` · `pgs-no-touch-unapproved-ui` · `pgs-content-pass-then-code`.

---

## Where CSS lives

| Kind | Put it here | Example |
|---|---|---|
| Reusable block (every importer) | Shared modular `src/features/shared/<module>/` | `pgs-picks`, highlights title bands |
| Page spacing / one-page stack | Lab shell `premium-*-2-shell.css` (or page feature CSS) | Comes stack only on USMLE lab-2 |
| Desk / phone | Existing module media — **leave alone** | |

**Owner DevTools on iPad → immediately lock into shared modular** so PLAB/AMC/About sync. Do not leave values only in one shell.

Lab shell after modular owns layout: **margin / gap only** for that block.

---

## Compact vs wide (the #1 speed lesson)

Fixed Figma widths (`flex: 0 0 257`, grid `452 + 370`, pull `-65px`) work on **wide** iPad and **crush** on compact.

**Default compact (601–800) recipe:**

1. Stack desk rows → column (`flex-direction: column` / `grid-template-columns: 1fr`)
2. Replace fixed child widths with `clamp(min, 100%, figmaMax)` or `min(figma, 100%)`
3. Center stacked rails with `margin-inline: auto` / `justify-self: center`
4. Kill side hangs (`margin-left: -65px`) on compact; restore only on wide if Figma needs hang
5. Right-align multi-line cues to the **same end edge** as the segment below (match copy rail width)

**Wide (801–1366):** keep the approved 2-col / hang recipe. Do not “fix” hang photos that QC already passed (Expense doctor hang = intentional).

---

## Freeze list (do not spoil)

Once owner says QC passed on a block:

- **Do not** reopen it for a later flex pass
- **Do not** change shared CSS that block owns unless owner names that block
- If a page-wide pass is needed: **list SKIP blocks** in the propose (e.g. Highlights · Expense · Picks)

Spoiling QC’d blocks costs a day. Skipping them costs a minute.

---

## Shared interaction patterns

| Pattern | Where | Rule |
|---|---|---|
| Horizontal rail drag + wheel | Highlights, Picks | Same bind pattern; suppress link click after drag; no mandatory scroll-snap fighting drag |
| Carousel arrows | Picks | Still step by card; drag is free pan |
| Type floor | All bands | Roboto **15–16px** min · Bebas **30px** min · token `--pgs-type-floor` |

---

## Clamp cheat sheet (owner asks “clamp here”)

```css
/* Box capped at Figma max, fluid below */
width: clamp(200px, 90%, 351px);
max-width: 100%;

/* Copy rail matching desk max */
width: clamp(240px, 100%, 440px);
margin-inline: auto;
```

Prefer **one clamp on the named box** over inventing a new breakpoint.

---

## Mount vs QC

| Phase | Do |
|---|---|
| Mount | Import shared module · page margin · show block · stop |
| QC | Owner nudges (width %, font, align, arrow px) → modular or compact band only |
| Cutover | Separate gate — lab preview first |

Do not mount and “also flex the whole page” in one gate.

---

## Template propose (copy)

```
### WHAT I FOUND
- Block · band · winning rule · what crushes at ~750

### PLAN
- Compact 601–800: …
- Wide 801–1366: unchanged / …
- Shared modular: … (or none)

### SKIP (frozen)
- Highlights · Expense · … (name them)

### FILES
- src/features/...

### NOT IN THIS CHANGE
- Desk >1366 · phone ≤600 · frozen blocks
```

Wait for `GO AHEAD`.

---

## Hard stops

- No 767 media queries
- No rewriting QC’d Highlights / Expense / (named frozen) while fixing Comes/Path/Know
- No phone×1.4 scale recipes on these bodies
- No Hostinger CSS as implementation
- No inventing layout — Figma / owner DevTools / Paper only
- No desk/phone edits unless owner opens those bands
- No OWNED_SPLIT cutover without chrome click QC (hamburger + `#toggleBtn`)

---

## After this page

Next iPad body copies the **same** shared modules + this compact/wide split + north-star type floors. Page shell only adjusts spacing and track-specific rearrange from owner Figma/Paper.

**Cutover:** apply lab-2 body + OWNED_SPLIT + React chrome — do not redo the body QC from zero. Learn here → plan top→bottom → execute. After cutover: chrome click QC first.

Do not redesign per track.
