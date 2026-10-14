---
name: pgs-ipad-paper-pass
description: >-
  iPad page pass (owner 2026-10-03). Copy design from owner iPad reference
  (Paper or Figma — whichever they share). Import locked React chrome. Detach
  Hostinger CSS → owned split. Then body: min 85% rail clamp, follow design
  block-by-block. Ignore all old iPad skills (no phone×1.4). Propose → GO AHEAD.
---

# iPad page pass — chrome · CSS · design body

**Owner lock 2026-10-03.**  
**Carry sheet (formulas · bands · page status · H-R order):** [`docs/FRONTEND-IPAD-HEADER-LOCK.md`](../../docs/FRONTEND-IPAD-HEADER-LOCK.md) — read before inventing breakpoints.  
**Gap analysis (desk · iPad · phone):** [`docs/FRONTEND-GAP-ANALYSIS.md`](../../docs/FRONTEND-GAP-ANALYSIS.md) — GAP LOCK CSS **100 / 60 / 80**; after Figma→code, before LOCK.  
**IGNORE all old iPad skills** (`pgs-ipad-hero-body` and any phone×1.4 / “saved mobile card” recipe). That path failed; QC never passed. Do not mention it in proposals.

## What the owner does

1. Reorganise the page on an **iPad reference** (Figma and/or Paper).
2. Share the file (Paper **or** Figma — whichever is easier for that page).
3. Cursor builds against that reference only. No inventing.

## What Cursor does (order — always)

### Pass A — Chrome (import only — LOCKED)

Chrome is **locked**. Here we **import** it — we do not redesign chrome or open chrome size/font gates.

Mount exactly what `/preview/header` / H-R pages use:

- `<PublicHeader/>` · `<PublicStrip/>` · body · `<PublicFooter/>`

No chrome HTML strings / DSIH. No font or chrome size inventing.

### Pass B — Detach Hostinger CSS · attach owned CSS

- Add the preview (then live, on cutover) route to `OWNED_SPLIT_ROUTES` in `src/app/layout.tsx`.
- Page loads `/preview/owned-split` — **not** Hostinger `style.css` / `responsive.css`.
- Body styling lives in **owned page CSS** under `src/features/<page>/`.
- Do not edit Hostinger files to “win.”
- **Immediately QC chrome clicks** (before body gates): hamburger opens drawer (≤1366) · `#toggleBtn` opens sidebar. If dead → check `pgs-ipad-modular-body-pass` “Chrome click QC” (visibility transition · LegacyPage `children` dep · toggle z-index). Do not start body QC on a broken chrome page.

### Pass C — Body from iPad reference (block-by-block)

Desk / iPad / phone = **same content rearranged**. North star for patterns: `/preview/purpleusmle-2` + skill `pgs-ipad-modular-body-pass`.

1. **Content match QC first:** report whether each block’s content matches desk or phone — then how the owner rearranged it. Do not code yet.
2. **Opus plan:** ask Opus for a top→bottom plan from north-star findings + this Figma/Paper. Then propose → `GO AHEAD`.
3. **Minimum rail:** `85%` clamp (centered) unless the owner’s design or a named nudge says otherwise.
4. **Type floors (hard — quote in Step 0):** Roboto = `var(--pgs-type-floor, 16px)` unless owner names another size · Bebas ≥30px. **Figma = design/layout only; text/font size = ours** — never ship raw Figma Roboto px (14 / 19.6 / etc.). Measure after implement.
5. **Reuse vs rebuild:** prefer shared modular (hero family · Highlights · Picks) and existing page CSS; rebuild only when the reference requires it. **No inventing.**
6. Build **one block at a time**: propose → `GO AHEAD` → implement → measure → owner QC → next block.
7. Desk and phone CSS stay until the owner opens those bands.

## Bands

`>1366` desktop · `801–1366` / `601–800` iPad · `≤600` phone. Never 767.

## Hard stops

- No phone×1.4, no “frozen mobile card” scale, no old iPad skill recall.
- No inventing layout when the reference is unclear — STOP and ask.
- No bulk rewrite of a whole QC’d page in one gate.
- No Hostinger CSS as the body implementation.
- Chrome = import only (separate pass already done).

## Body QC speed (after chrome + owned split)

For Premium/medical modular bodies (USMLE lab-2 lessons → PLAB/AMC): use **`pgs-ipad-modular-body-pass`**.

That skill owns: compact **601–800** vs wide **801–1366**, freeze QC’d blocks, DevTools → shared modular, clamp/flex so ~750 does not crush. Do not re-learn it from chat.

## After body QC

Cutover / PR follows `docs/HR-PAGE-PROMPT.md` when the owner opens that gate — same tree on live + owned split.
