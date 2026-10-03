---
name: pgs-propose-before-code
description: >-
  Hard stop: no assumptions, no silent coding. Explain plan → owner approves →
  then implement. Always include before/after, file links, and ELI5 code
  explanation. Full project order: pgs-master-workflow. Use on every PGS task.
---

# PGS — propose, get approval, then code

**Master workflow (frontend / backend / SaaS order, locks, gates):** [`pgs-master-workflow/SKILL.md`](../pgs-master-workflow/SKILL.md)

**Backend / API / DB wire gates:** [`pgs-backend-phase-wire/SKILL.md`](../pgs-backend-phase-wire/SKILL.md) — map first · one gate · day-1 security · living Kanban MD.

**Events / courses templates:** [`docs/PURPLE-EVENTS-ARCHITECTURE.md`](../../docs/PURPLE-EVENTS-ARCHITECTURE.md) — block-by-block; fixtures now; Supabase rebuild later. E8 Upcoming: skill `pgs-upcoming-sessions`.

**Layout / edges / responsive:** always run [`pgs-scout-what-why-how`](../pgs-scout-what-why-how/SKILL.md) before CSS — scout live + preview, WHAT · WHY · HOW, then this propose block.

**Chrome:** body gates must not drive-by chrome. Header remount phase is **reopened 2026-09-25** — only via skill `pgs-header-chrome-phase` + `docs/HEADER-CHROME-PHASE.md`, after `GO AHEAD`, one gate. **Never call chrome “done” while pages still DSIH the header/footer string.** For each new chrome block: **Hostinger/legacy CSS reference → owned CSS pass → then UI** (do not invent floating-menu CSS from scratch).

## Rule (verbatim)

**i dont care about hostinger i am implemneting now, dont make your own assumption, you explain me what you planning i approve, also before after, and what codes you changing to make this happen with links and eli5 code explanation too.**

## Hard stops

1. **Do not make your own assumptions.** If something is unclear (breakpoint, Hostinger parity, which surface, invent vs keep), ask. Do not invent a constraint the owner did not state.
2. **Owner is implementing now.** Do **not** treat Hostinger / legacy freeze as a default blocker unless the owner says so for that task. Hostinger CSS is **reference only** for public chrome — port into `src/app/globals.css` (see `pgs-modular-public-chrome` / `docs/MODULAR-PUBLIC-FRONTEND.md`).
3. **Opus writes the architect plan. Sonnet 5.5 or this agent implements it after `GO AHEAD`.** Plan only — Opus does not edit files. A live QC nudge the owner already named stays a direct edit. Full path: `pgs-master-workflow` → Architect, then implement.
4. **Explain that plan → wait for owner approval (`GO AHEAD` / yes) → then change code.** Never silently edit, “quick fix,” or ship CSS/JS/HTML before approval.
5. **Content pass, then code.** On a position or layout correction: assess the named content relationship first (under which card, which edge, which band). No CSS in that pass. Code only after the owner confirms the assessment. One relationship per edit. See `pgs-master-workflow`.
6. If you already started editing without approval: **revert immediately**, then propose.

## Required proposal format (every code change)

Before any file edit, return this block:

### WHAT I FOUND
- Bug / gap in plain English (1–3 bullets). Evidence if useful (e.g. computed style).

### PLAN
- Exact steps you will take. No hidden extras.

### BEFORE → AFTER
- BEFORE: what the user experiences / what the code does now  
- AFTER: what they will get after the change  

### FILES / CODE TO CHANGE
- Full paths as repo links (e.g. `src/app/globals.css`) with the specific rule/function  
- Short snippet of what you will add or change  

### ELI5
- Explain the change like to a non-engineer: what was broken, why clicks fail, what one line of CSS/JS does.

### NOT IN THIS CHANGE
- Explicitly list what you will **not** touch (so no surprise scope).

### RESPONSIVE ALTERNATIVE (when owner scouts DevTools)
Owner edits in DevTools then asks to lock values. For **position / size / spacing that must work across widths**:

1. Still show the **exact hard px** they scouted (per band if they gave bands).
2. **Always** also suggest a better responsive option when one exists — e.g. `clamp(min, vw/%, max)`, `%` of parent, `min()` / `max()`, container-relative — with a one-line why (stops jump, fewer breakpoints, scales mid-band).
3. Owner picks: hard px **or** the fluid formula. Do not silently replace their px with clamp.
4. Modular chrome bands are **>1366 / 801–1366 / 601–800 / ≤600** (middle two = iPad); ignore `hostingerPhoneMax` 767 for that chrome.

Then **STOP**. Wait for owner approval.

## After approval only

1. Implement exactly the approved plan.  
2. If the plan must change mid-flight: stop, re-propose, wait again.  
3. Brief vomit: DONE · files touched · how to Preview QC.

## Failure modes

- Coding first, explaining later  
- Assuming “Hostinger says hide / don’t touch” without owner saying so for this task  
- Changing extra files “while we’re here”  
- Vague “I’ll fix search” with no file links / no before-after / no ELI5  
