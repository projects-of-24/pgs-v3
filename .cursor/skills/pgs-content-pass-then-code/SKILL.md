---
name: pgs-content-pass-then-code
description: >-
  Assess a named content relationship before any code. Use on visual, position,
  spacing, Figma, or layout corrections, and before starting the next page
  block. Content pass, then assess, then code. One relationship per edit.
---

# Content pass, then code

Owner lock 2026-09-12. A visual correction is not a license to edit.

Do not stack guesses. The capsule misses came from coding the next number (screen edge, then 177px, then grey pull-up) before the relationship was named.

## Pass 1 — content (no code)

Look at the named content only. Say where it sits in Figma, and where it sits now.

Name the relationship in plain words: under the heart card, on the timeline card, 38px off the screen edge. Not a layer x until that relationship is clear. A raw Figma x can be the unrotated origin.

If the live row is not the Figma frame width (zoom, 85% rail), say that. Do not apply a 390px left as a fixed margin on a wider row.

### Stack check (before crop / size math)

When Figma shows a still, card, or overlay on a panel, check these **before** `object-fit`, export crop, or box `min()` guesses:

1. **Hang-out** — negative `top` / `left` (e.g. still at `top: -37.6` on a grey window) means the child sits **out** past the parent edge.
2. **Overflow** — does Figma clip (`overflow: hidden` / clip content on) or leave hang-out visible? Do not default to `overflow: hidden` on the grey/panel.
3. **Z-index / paint order** — which layer sits on top (advantage bar, lime unlock, still)? Match order, not only position.
4. **Asset** — prefer Figma **node export** of the framed still when the fill is cropped; raw image fill ≠ framed crop.

Owner lesson 2026-09-15 (H5 desk): crop looked wrong because grey used `overflow: hidden` while Figma lets the dashboard still sit out on top. Overflow + z-index first; then size.

## Pass 2 — assess

Measure only that relationship. Report the gap in one sentence. No file edits.

## Then code

One change for that relationship, only after the owner confirms the assessment. Re-measure it. Stop for owner QC. Do not start the next relationship in the same edit.

## Output

CONTENT: what sits where, in Figma and now.
ASSESS: the one gap. No code.
WAIT: stop until the owner confirms.
