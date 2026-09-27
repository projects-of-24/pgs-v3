---
name: pgs-scout-what-why-how
description: >-
  Hard stop before UI/CSS/layout changes: scout live + current preview, measure
  edges/ratios, explain WHAT · WHY · HOW, wait for GO AHEAD. No vibe coding.
  Use with pgs-propose-before-code on every public/frontend layout task.
---

# PGS — scout WHAT / WHY / HOW (no vibe coding)

**Owner rule (verbatim intent):** Before implementing a change, show what is happening, why it works that way, and how we will change it. Scout Hostinger / live / current code first. Do not spray CSS and hope.

Companion: [`pgs-propose-before-code`](../pgs-propose-before-code/SKILL.md) · [`pgs-master-workflow`](../pgs-master-workflow/SKILL.md)

Bands (locked, four): **>1366 desktop · 801–1366 wide iPad · 601–800 compact iPad · ≤600 mobile**. Middle two = iPad. Never treat Hostinger **767** as our product cut.

Hostinger / live = **reference to learn**. Build new under preview / modular CSS. Do not edit `public/assets/css/style.css` to “win.”

---

## When this skill applies

Any task that touches:

- page / section **width**, **margins**, **padding**, **gutters**
- **responsive** layout (flex wrap, columns, stack)
- comparing preview to **live** or **Figma**
- “it looks the same” / “still broken” after a CSS pass

---

## Hard stops

1. **No implement before scout.** If you have not measured live (if relevant) and current preview at the owner’s bands, you may not edit CSS/layout.
2. **No silent no-ops.** If global CSS already does what you planned (e.g. `.wrapper-content { width: 75% }`), say so — do not claim a fix.
3. **No Hostinger breakpoint adoption.** Learn ratios; remap to **600 / 1366**.
4. **Hero ≠ body** unless owner explicitly chooses to align them. Different edge systems are normal.

---

## Required order (every layout change)

```
1. SCOUT
   - Live URL and/or Hostinger CSS (reference)
   - Current preview / target file
   - Measure at ≥1 desktop width (e.g. 1440) and ≤600 (e.g. 390); iPad mid (e.g. 869) if relevant
   - Record: selector, % of viewport or px left/right, winning CSS rule (file + selector)

2. WHAT
   - What the user sees / what is broken
   - What the reference does (numbers)
   - What our code does now (numbers + winning rule)

3. WHY
   - Why it looks that way (cascade, fixed px, wrong band, hero vs body, etc.)
   - Why a previous change failed (e.g. duplicated existing 75%)

4. HOW
   - Exact target after change (per band)
   - Files / selectors
   - BEFORE → AFTER
   - NOT IN THIS CHANGE

5. STOP — wait for GO AHEAD (and any A/B choice)

6. IMPLEMENT smallest diff

7. RE-MEASURE same viewports — prove numbers moved; report table
```

---

## Output template (before GO AHEAD)

```markdown
### WHAT
- Live/reference: …
- Preview now: …
- Gap: …

### WHY
- …

### HOW (proposed)
- Desktop (>1366): …
- iPad (601–1366): …
- Mobile (≤600): …
- Files: …
- BEFORE → AFTER: …
- NOT IN THIS CHANGE: …

Waiting for GO AHEAD.
```

---

## After implement (required)

```markdown
### PROOF
| Viewport | Metric | Before | After | Live ref |
|----------|--------|--------|-------|----------|
| 1440 | … | … | … | … |
| 390 | … | … | … | … |
```

If After ≈ Before and that was not intentional → **failed**; re-scout, do not insist it worked.

---

## Project vs Cursor preferences

| Place | Path | Scope |
|-------|------|--------|
| **This repo (default)** | `.cursor/skills/pgs-scout-what-why-how/` | All agents on PGS V3 |
| **All your projects** | `~/.cursor/skills/pgs-scout-what-why-how/` (copy) | Personal global skill |
| **User Rules / Preferences** | Cursor Settings → Rules | Short pointer: “Always scout WHAT/WHY/HOW before layout CSS; use pgs-scout-what-why-how” |

Prefer **project skill** for PGS so the team shares it. Add a **one-line User Rule** if you want every chat (even other repos) to remember the habit. Preferences alone do not replace a skill file with the full checklist.
