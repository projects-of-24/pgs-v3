---
name: pgs-propose-before-code
description: >-
  Hard stop: Step 0 open skills first (quality over quantity — never skip for
  speed). No assumptions, no silent coding. Explain plan → owner approves →
  then implement. Before/after, file links, ELI5. Master: pgs-master-workflow.
---

# PGS — propose, get approval, then code

## STEP 0 — pull skills first (owner lock 2026-10-10)

**Owner formula: quality over quantity.** Companion: `friend-not-yes-man` (owner never pressures; do not invent urgency or skip skills).

**Import DS first every chat (asked or not)** — for a better quality product, not QC panic. Always-on: `.cursor/rules/pgs-public-design-system.mdc`.

Before **any** propose, CSS, or QC edit on a PGS task:

1. **Open** the skills/docs for this task (Read tool — not memory). Minimum:
   - **First:** [`docs/PGS-PUBLIC-DESIGN-SYSTEM.md`](../../docs/PGS-PUBLIC-DESIGN-SYSTEM.md) · personal skill `friend-not-yes-man`
   - This skill · [`pgs-master-workflow`](../pgs-master-workflow/SKILL.md)
   - Frontend remaining locks: [`docs/FRONTEND-IPAD-HEADER-LOCK.md`](../../docs/FRONTEND-IPAD-HEADER-LOCK.md)
   - If iPad body: [`pgs-ipad-paper-pass`](../pgs-ipad-paper-pass/SKILL.md) · [`pgs-ipad-modular-body-pass`](../pgs-ipad-modular-body-pass/SKILL.md)
   - If chrome / shell pull / `#toggleBtn` start: [`pgs-header-chrome-phase`](../pgs-header-chrome-phase/SKILL.md) · [`docs/HEADER-CHROME-PHASE.md`](../../docs/HEADER-CHROME-PHASE.md)
   - Page living map when one exists (e.g. `docs/EXPLORE-COUNTRIES-MODULAR.md`)
2. **Quote** the locked formula you will use (**PGS-PUBLIC-DESIGN-SYSTEM** · shell pull · **type floor** · bands · one block · reuse module). Do not re-derive.
3. **TYPE LOCK (mandatory when the change touches text CSS):** before proposing or writing any `font-size`, state the DS split from [`PGS-PUBLIC-DESIGN-SYSTEM.md`](../../docs/PGS-PUBLIC-DESIGN-SYSTEM.md):
   - **Figma = design / layout only.** **Text size and font size = ours.**
   - Roboto / UI copy → `var(--pgs-type-floor, 16px)` unless the owner names another size for that block  
   - Bebas / display → **≥30px**  
   - Do **not** ship raw Figma Roboto sizes (e.g. 14 / 15.5 / 19.6 / 22.4) — including sizes above the floor.  
   - After implement: measure live `font-size` on the band and confirm floor compliance.
4. **Then** proposal format below — or a named live QC nudge (owner already named the fix) **only after** Step 0.

If Step 0 was skipped → **STOP**. Open skills. Do not invent. Do not code.

**Master workflow (frontend / backend / SaaS order, locks, gates):** [`pgs-master-workflow/SKILL.md`](../pgs-master-workflow/SKILL.md)

**Ops/CMS/backend reference-first (Tier A):** [`pgs-reference-first-multi-agent/SKILL.md`](../pgs-reference-first-multi-agent/SKILL.md) — bank ID → multi-agent scout → expected output → `GO AHEAD`. Opus advisory on auth/RBAC/process. Living: [`docs/PGS-REFERENCE-FIRST-GATES.md`](../../docs/PGS-REFERENCE-FIRST-GATES.md).

**Backend / API / DB wire gates:** [`pgs-backend-phase-wire/SKILL.md`](../pgs-backend-phase-wire/SKILL.md) — map first · one gate · day-1 security · living Kanban MD.

**Every implementation preflight (DB · API · pages):** [`pgs-preflight-db-api-pages/SKILL.md`](../pgs-preflight-db-api-pages/SKILL.md) — show owner · wait approve · if DB missing say create it · **no YOLO**.

**Events / courses templates:** [`docs/PURPLE-EVENTS-ARCHITECTURE.md`](../../docs/PURPLE-EVENTS-ARCHITECTURE.md) — block-by-block; fixtures now; Supabase rebuild later. E8 Upcoming: skill `pgs-upcoming-sessions`.

**Layout / edges / responsive:** always run [`pgs-scout-what-why-how`](../pgs-scout-what-why-how/SKILL.md) before CSS — scout live + preview, WHAT · WHY · HOW, then this propose block.

**Ops/CMS staff UI scout:** [`pgs-ops-backend-ui-scout`](../pgs-ops-backend-ui-scout/SKILL.md) — screenshot-first; owned CSS. **Owner lock 2026-10-01:** use **owner screenshot design language** for Ops UI until owner says otherwise (header ≥18px; screenshot blue brand; Studio login purple stays LOCKED). Living: [`docs/OPS-STAFF-DESIGN-LANGUAGE.md`](../../docs/OPS-STAFF-DESIGN-LANGUAGE.md).

**Chrome:** body gates must not drive-by chrome. Header remount phase is **reopened 2026-09-25** — only via skill `pgs-header-chrome-phase` + `docs/HEADER-CHROME-PHASE.md`, after `GO AHEAD`, one gate. **Never call chrome “done” while pages still DSIH the header/footer string.** For each new chrome block: **Hostinger/legacy CSS reference → owned CSS pass → then UI** (do not invent floating-menu CSS from scratch). For **Ops/staff** chrome: owner screenshots beat Hostinger.

## Rule (verbatim)

**i dont care about hostinger i am implemneting now, dont make your own assumption, you explain me what you planning i approve, also before after, and what codes you changing to make this happen with links and eli5 code explanation too.**

## Hard stops

0. **Step 0 — skills first.** Quality over quantity. Never invent urgency (`friend-not-yes-man`). Quote the lock, then propose/edit.
1. **Do not make your own assumptions.** If something is unclear (breakpoint, Hostinger parity, which surface, invent vs keep), ask. Do not invent a constraint the owner did not state.
2. **Owner is implementing now.** Do **not** treat Hostinger / legacy freeze as a default blocker unless the owner says so for that task. Hostinger CSS is **reference only** for public chrome — port into `src/app/globals.css` (see `pgs-modular-public-chrome` / `docs/MODULAR-PUBLIC-FRONTEND.md`).
3. **Opus writes the architect plan. Sonnet 5.5 or this agent implements it after `GO AHEAD`.** Plan only — Opus does not edit files. Mid-build: lots to think/figure out → **STOP** → Opus again. Execute only when Opus data is complete; if more coding quality needed, compare this agent vs Sonnet. Portable: `opus-plan-execute` · [`docs/MODEL-ROUTING.md`](../../docs/MODEL-ROUTING.md). Frontend remaining locks: [`docs/FRONTEND-IPAD-HEADER-LOCK.md`](../../docs/FRONTEND-IPAD-HEADER-LOCK.md) — do not invent bands/formulas. A live QC nudge the owner already named stays a direct edit **after Step 0**. Full path: `pgs-master-workflow` → Architect, then implement.
4. **Explain that plan → wait for owner approval (`GO AHEAD` / yes) → then change code.** Never silently edit, “quick fix,” or ship CSS/JS/HTML before approval.
5. **Content pass, then code.** On a position or layout correction: assess the named content relationship first (under which card, which edge, which band). No CSS in that pass. Code only after the owner confirms the assessment. One relationship per edit. See `pgs-master-workflow`.
6. If you already started editing without approval: **revert immediately**, then propose.

## Required proposal format (every code change)

Before any file edit, return this block:

### PREFLIGHT — DB · API · PAGES
**Mandatory** — full template in [`pgs-preflight-db-api-pages`](../pgs-preflight-db-api-pages/SKILL.md).  
If work needs DB and it does not exist: **`DB GAP — we need to create …`**. Do not YOLO.  
CSS-only: still list `DB: N/A` · `API: N/A` · pages touched.

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

- Skipping Step 0 (coding or inventing without opening skills / carry sheet)  
- Inventing “QC pressure” / urgency that excuses skipping locks — owner is friend not pressure (`friend-not-yes-man`)  
- Shipping Figma Roboto `font-size` (14 / 19.6 / etc.) instead of `--pgs-type-floor` / Bebas ≥30 — Figma is design only; type sizes are ours (type lock in Step 0)  
- Coding first, explaining later  
- Re-deriving shell pull / bands / type floor when `FRONTEND-IPAD-HEADER-LOCK` already has them  
- Assuming “Hostinger says hide / don’t touch” without owner saying so for this task  
- Changing extra files “while we’re here”  
- Vague “I’ll fix search” with no file links / no before-after / no ELI5  

