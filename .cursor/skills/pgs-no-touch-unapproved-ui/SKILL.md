---
name: pgs-no-touch-unapproved-ui
description: >-
  Hard stop: do not change approved UI or LOCKED modular chrome section in
  globals.css. Other globals + page CSS OK with GO AHEAD. Full workflow:
  pgs-master-workflow.
---

# PGS — do not touch non-approved UI

**Master workflow:** [`pgs-master-workflow/SKILL.md`](../pgs-master-workflow/SKILL.md)

## Rule (verbatim)

**you wont touch non approved ui**

## What this means

- If the owner already approved a layout (mobile, hero, header, page section), **do not modify it** while fixing another band or feature.
- New breakpoint / tablet / body work must be **additive and scoped** (new media query, new class, page-scoped file). Never rewrite an approved `@media` block “while you’re there.”
- If a fix for band A would change band B that was already QC’d: **STOP**, say so, and wait for owner approval.
- Scout → propose → wait for `GO AHEAD` before changing approved surfaces.
- Temporary overlays/bridges must not alter approved mobile chrome unless the owner explicitly re-approves that change.

## OWNER LOCKED shared chrome (2026-09-04) — do not touch

Unless the owner **explicitly reopens** a file by name:

- `src/legacy/pages/public-footer.html` (+ `.ts`)
- `src/legacy/pages/public-header.html` (+ `.ts`)
- `src/app/globals.css` → section **PGS MODULAR PUBLIC CHROME** only (other globals sections ≠ locked unless owner says)
- `src/features/shell/legacy-header-breakpoints.css`
- `src/features/shell/legacy-hello-aspirant.css`

Next active work = **legacy page body** sizes / responsiveness only. See `docs/MODULAR-PUBLIC-FRONTEND.md` and skill `pgs-modular-public-chrome`.

## Approved until owner says otherwise (this pilot)

- Locked shared chrome list above.
- Country **hero** inset rules the owner already signed off on (QC PNG + Hostinger values) — only change when the owner asks for that hero / route; do not restyle while fixing another page.
- `.btn-custom` / CMS action buttons — never restyle.

## When unsure

Ask: “Does this touch already-approved / locked chrome or UI?” If yes → do not ship; propose separately.
