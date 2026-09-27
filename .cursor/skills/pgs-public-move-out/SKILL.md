---
name: pgs-public-move-out
description: >-
  Route-by-route move-out from old global public CSS. Families: countries →
  Purple Premium → feed → rest. Modules own spacing; never design from Hostinger.
  Site clear only when layout drops style.css/responsive.css. Use on public
  frontend, leakage, section padding, move-out, or “ignore Hostinger” tasks.
---

# PGS — public move-out (leave old global CSS behind)

**Owner doc:** [`docs/PUBLIC-MOVE-OUT-PLAN.md`](../../docs/PUBLIC-MOVE-OUT-PLAN.md)  
Companions: `pgs-master-workflow`, `pgs-modular-public-chrome`, `pgs-propose-before-code`, `pgs-never-invent`.

## Rule (verbatim)

**we never ever use hostinger we are building new — do not make the owner say this every turn.**

Old `public/assets/css/style.css` / `responsive.css` may still **load** until site clear. That is infrastructure debt, not authority. Never design from them. Never patch them to win.

## What “out” means

| Level | Clear when |
|---|---|
| **Module** | Component owns padding/width/bands; global `section {…}` cannot move it |
| **Family** | That family’s live routes use owned body modules; Preview QC passed |
| **Site** | `style.css` + `responsive.css` removed from `src/app/layout.tsx` |

## Family order (owner 2026-09-05)

1. **Countries** (current)
2. **Purple Premium**
3. **Feed**
4. Remaining bodies per `docs/PUBLIC-BODY-TEMPLATE-INVENTORY.md`

One family at a time. Do not open the next family mid-pass.

## Agent checklist (every new public body module)

- [ ] Page-scoped CSS only (or approved feature CSS) — not locked chrome, not Hostinger files
- [ ] Bands **>1366 / 801–1366 / 601–800 / ≤600** only (middle two = iPad) — never 767 for this work
- [ ] Desktop base → iPad overrides → mobile (“from the top”)
- [ ] Root owns `padding-top` / `padding-bottom` (prefer scoped `div` + `role="region"` over bare `<section>` while globals still load)
- [ ] Preview / modular QC before pull into live route
- [ ] Propose → wait for `GO AHEAD` → implement

## Do not

- Ask the owner again whether to ignore Hostinger
- Restyle from global `section` / `767` rules
- Touch locked modular chrome to “fix” body leakage
- Remove `layout.tsx` stylesheet links until owner confirms **site clear**

## When site clear is allowed

Only after owner says the remaining public/student surfaces no longer need those globals — then remove the `<link>`s for `style.css` and `responsive.css` from `src/app/layout.tsx` in an approved pass.
