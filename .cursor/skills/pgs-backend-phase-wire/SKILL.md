---
name: pgs-backend-phase-wire
description: >-
  PGS backend/feature wiring: no assumptions, targeted phase-by-phase builds with
  FE↔BE↔DB flowchart first, day-1 security measures + known-gap log, living Kanban
  MD after each gate, live interactive QC. Use on Loopboard, documents, Ops APIs,
  workspace routes, migrations, RLS/RPC wiring, or any backend job the owner wants
  step-by-step. Complements pgs-propose-before-code and pgs-owner-teach-map.
---

# PGS — backend phase wire (no assumptions · targeted)

**Owner lock (Loopboard W1, 2026-09-07):** this is how backend jobs stay happy —
flowchart → small gate → security from day 1 → living doc → live click QC → next gate.

Companions: [`pgs-propose-before-code`](../pgs-propose-before-code/SKILL.md) · [`pgs-owner-teach-map`](../pgs-owner-teach-map/SKILL.md) · [`pgs-never-invent`](../pgs-never-invent/SKILL.md) · [`pgs-master-workflow`](../pgs-master-workflow/SKILL.md)

---

## Owner rule (verbatim)

any backend job we do like this, only no assumptions, targeted building is what make me happy and pamper you.

**Lab-first wire (Loopboard lock 2026-09-07):** interactive `/preview/…` sandbox → pass-check features (Ops edit → Student see) → only then pull to live Student/Ops. Prefer no-login lab APIs scoped to a fixed sandbox identity over forcing staff login for wire QC.

---

## When to use

- Wiring a product feature into real API / DB / RLS (not pixel-only CSS)
- Phase gates like W1 / W2 / rung N after UI QC passed
- Owner asks how frontend ↔ backend ↔ database connect
- Owner wants a living Kanban / troubleshooting MD updated after each implementation
- Day-1 security (cross-student, forge, IDOR) before a later full security pass

**Do not** use this to invent features, jump phases, or “finish the whole backend” in one shot.

---

## Hard stops

1. **No assumptions.** If student vs staff, table, permission, or upload path is unclear → **STOP** and ask.
2. **Propose → wait for `GO AHEAD` / `GO AHEAD W#` → then code.** Same as `pgs-propose-before-code`.
3. **One gate only.** Never silently start W2 while finishing W1.
4. **Targeted diff.** Touch only files required for this gate. No drive-by refactors.
5. **Preview vs live:** say which URL changes. Prefer lab/fixtures until owner pulls live.
6. **Do not invent** second domains, forever URLs, or duplicate tables when one truth exists.

---

## Method (every backend gate)

```text
0. Map first (before code)
   FE → request helper → /api/... route → actor/scope → table/RPC → child rows
   Parent → child ASCII (who owns whom)

1. Propose (required block below) + day-1 security + known gaps
2. STOP — wait for GO AHEAD Wn
3. Implement exactly that gate
4. Tests for the new path (happy + out-of-scope / forge if relevant)
5. Update living Kanban MD (phase log + security section)
6. Owner brief + how to operate / click QC live
7. STOP — wait for next GO AHEAD
```

---

## Required proposal extras (backend)

On top of `pgs-propose-before-code` (WHAT · PLAN · BEFORE→AFTER · FILES · ELI5 · NOT IN THIS):

### CONNECTION MAP
- ASCII: UI control → fetch/route → permission → tables (parents/children)
- Which resource string / RPC / migration (if any)

### DAY-1 SECURITY (this gate)
| Risk | Measure in this gate |
|---|---|
| Cross-student / wrong parent | … |
| Client forge (ids, types, URLs) | … |
| Probe / IDOR oracle | same error for missing vs wrong scope |

### KNOWN GAPS (deferred)
| Gap | Why not now | Later gate / full security pass |
|---|---|---|

### LIVING DOC
- Path to update (e.g. `docs/<FEATURE>-KANBAN.md`)
- What row to append after implement

### LIVE SAFETY
- Preview vs live URL
- Migration / RLS yes/no
- What cannot break yet

---

## Day-1 security checklist (minimum)

Apply the smallest correct controls **in the same gate** that introduces the write:

- Scope every lookup/write to the **URL/actor student** (or mentor assignment), never trust body student_id alone
- Force server-derived fields the client must not choose (e.g. reserved `document_type`)
- Same 404/deny message for missing vs cross-tenant (no oracle)
- Audit deny/fail with a stable `reason_code` when probing matters
- Unique / FK constraints as the last line of defense
- Document what is **not** done yet (rate limit, signed URLs, full RBAC pass)

Full security analysis = later explicit owner pass — do not pretend day-1 is complete.

---

## Living Kanban MD

Create or append one living doc per product family (example: [`docs/LOOPBOARD-KANBAN.md`](../../docs/LOOPBOARD-KANBAN.md), [`docs/FEED-TRACK-PROGRESS-KANBAN.md`](../../docs/FEED-TRACK-PROGRESS-KANBAN.md)).

**Owner lock (Track Progress, 2026-09-08):** every backend gate must update that MD for **later QC analysis** — not only a one-line phase log.

Must include:

- One-board / one-truth parent→child diagram
- FE ↔ BE call table (`resource` → table)
- Surfaces (preview vs live)
- Wire phase log (status per gate)
- Phase-1 security mitigated + known gaps
- Files that matter
- How owner operates / QC this gate

**After each gate — append a QC block:**

```markdown
### <Gate id> — <short title>
| | |
|---|---|
| **WHAT** | … |
| **WHY** | … |
| **HOW (code)** | plain flow + key files / functions |
| **FILES** | … |
| **LIVE SAFETY** | preview vs live · empty behavior · migration? |
| **HOW YOU QC** | exact login + URL + clicks |
```

Update **after each gate**, not every CSS nudge.

---

## Owner happiness pattern (Loopboard template)

```text
UI QC pass (desktop)
  → flowchart of connections
  → GO AHEAD W1 (slot / requirement only)
  → day-1 security + Kanban MD
  → live Ops click QC
  → GO AHEAD W2 (bytes / upload)
  → …
  → pull live student last
  → mobile last (if applicable)
```

Reuse this shape for any backend feature: **empty contract/slot → write bytes → bind → consumer face → pull → polish.**

---

## Failure modes

- Coding the whole pipeline because “we’ll need it anyway”
- Skipping the connection map and hoping the owner follows
- Security “later” with no known-gap list
- Forgetting the living MD so the owner has no troubleshooting map
- Mixing preview fixture work with live DB writes without saying so
- Assumptions about Hostinger / mobile / Ops DnD without owner saying so

---

## After implement (short)

```markdown
### OWNER BRIEF
- WHAT / WHY / HOW (plain)
- FILES
- LIVE SAFETY
- HOW YOU OPERATE (exact clicks / URL)
- NEXT GATE (wait for GO AHEAD)
```

Deep teach when architecture/API/RLS changed (`pgs-owner-teach-map`).
