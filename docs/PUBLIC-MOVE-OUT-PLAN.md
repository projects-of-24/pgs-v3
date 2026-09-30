# PGS public move-out plan

Owner plan (2026-09-05). Agents: `.cursor/skills/pgs-public-move-out/SKILL.md`.

## One-liner

**Build new page families one by one. Old global CSS may still load until the end — never design from it. Own every new module’s spacing. Fully clear only when root layout drops the old stylesheets.**

## What “out” means

| Level | Meaning |
|---|---|
| **Module clear** | This component owns its layout (`padding` / width / bands). Global `section {…}` and similar cannot push it around. |
| **Family clear** | That template family’s live routes use owned body modules (e.g. countries hero), Preview QC passed. |
| **Site clear** | Nothing needs `public/assets/css/style.css` + `responsive.css` anymore → remove those `<link>`s from `src/app/layout.tsx`. |

Until **site clear**, old CSS still loads for every page. That is expected. It is **not** design authority.

## Hard rules (do not make the owner repeat)

1. **Never use old global CSS as product/visual authority.** Reference only if needed for intent; do not patch it to “win.”
2. **Do not tell the owner they must keep saying “ignore Hostinger.”** It is already policy.
3. **New modules own spacing from the top** — desktop base → iPad → mobile on **>1366 / 601–1366 / ≤600** only (never 767 for this work).
4. Prefer **not** bare `<section>` for new public modules if global `section` rules still load; use a scoped root (e.g. `div` + `role="region"`) and set `padding-top` / `padding-bottom` yourself.
5. Propose → `GO AHEAD` → implement → owner Preview QC.

## Family order (owner)

Move out **one family at a time**:

1. **Countries** (in progress — modular hero preview, then pull into live country pages)
2. **Purple Premium** (pathway / premium public bodies)
3. **Feed** (and related feed surfaces)
4. Then remaining public/student bodies per [`PUBLIC-BODY-TEMPLATE-INVENTORY.md`](./PUBLIC-BODY-TEMPLATE-INVENTORY.md)

Do not jump families mid-pass. Finish Preview QC on the current family before opening the next.

## How each family moves out

```
1. Modular piece in isolation (preview route) — own CSS, 1366/600 bands
2. Owner Preview QC desktop / iPad / mobile
3. GO AHEAD pull into live route(s) for that family
4. Mark family body as owned (legacy HTML body shrinks / replaced)
5. Next family
```

Shared chrome (header / footer / strip) stays **LOCKED** — see [`MODULAR-PUBLIC-FRONTEND.md`](./MODULAR-PUBLIC-FRONTEND.md). Move-out is **page bodies**, not chrome.

## When global CSS finally leaves

Remove from `src/app/layout.tsx` only after owner confirms no remaining live public/student surface depends on:

- `/assets/css/style.css`
- `/assets/css/responsive.css`

(Other assets such as icons/vendors may leave on a separate pass.)

Until that removal: every new module must still **own** its box so leakage cannot restyle it.

## Related

- Skill: `.cursor/skills/pgs-public-move-out/SKILL.md`
- Chrome lock: [`MODULAR-PUBLIC-FRONTEND.md`](./MODULAR-PUBLIC-FRONTEND.md)
- Body inventory / swap order: [`PUBLIC-BODY-TEMPLATE-INVENTORY.md`](./PUBLIC-BODY-TEMPLATE-INVENTORY.md)
- Master workflow: `.cursor/skills/pgs-master-workflow/SKILL.md`
