# Ops footer / overflow / body scroll — LOCKED (owner QC 2026-10-01)

**Do not restyle** Ops footer rail or C3-scroll body dock unless the owner opens a new gate.  
Header + sidetab chrome stay LOCKED.

Design language: [`OPS-STAFF-DESIGN-LANGUAGE.md`](./OPS-STAFF-DESIGN-LANGUAGE.md).  
Passes: [`OPS-POST-LOGIN-UI-PASSES.md`](./OPS-POST-LOGIN-UI-PASSES.md).  
Owner ref: [`/preview/ops-staff-plan/v2/c3-overflow-owner-ref.jpg`](../public/preview/ops-staff-plan/v2/c3-overflow-owner-ref.jpg)

| Item | Locked value |
|---|---|
| Pass | **C3** / **C3-fix** / **C3-scroll** |
| Shell footer | Sidebar tint `#f4f7fc` · **100px** · flush bottom · top stroke = header/sidetab |
| Scroll model | Nested full-bleed `.ops-system-main` inside `.ops-system-main-wrap` |
| Scrollbar | Hidden (scroll still works) |
| Body width | **80%** after sidebar · centered |
| Gap under header | **40px** body top padding |
| Wheel | **Motion** `animate` smooth scrollTop |
| ◀ ▶ dock | Side-by-side overlay · does **not** scroll with body · **Motion `drag` + `useDragControls`** (grip) · constrained to wrap · **refresh restores default** |
| Dock shadow | Dropslide `8px 8px 0 #000` **only while** arrow `:active` — **no shadow while dragging** — never permanent after click |
| Reduced motion | Instant / native — no tween |
| Section tabs | Allowed later on multi-block body pages |
| Table / form footers | Body card patterns only |

## Component

`src/components/ops-product-main.tsx` · dep: `motion`

## Preview

[http://localhost:7000/ops](http://localhost:7000/ops)

Next: **C4** desktop + a11y chrome QC → full chrome LOCK.
