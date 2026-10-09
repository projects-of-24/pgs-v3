---
name: pgs-reference-first-multi-agent
description: >-
  Meaningful Ops/CMS/backend/auth gates: four-source + Reference Bank study via
  multi-agent scout when the scope tier requires it; expected output for owner
  GO AHEAD; then implement. Use before new Ops/CMS/API capability, auth/RBAC/
  session/redirect changes, or new tables/RLS/RPC. Skip scout for tiny CSS/
  copy on approved screens (propose still required).
---

# PGS — reference-first multi-agent gate

Owner lock 2026-10-01: **do not implement Ops/CMS/backend from vibes.** Peer-reviewed **Reference Bank** study + scoped multi-agent scout **before** code when the tier requires it. Owner sees **expected output** → `GO AHEAD` → implement.

Companions (do not replace):
- [`pgs-propose-before-code`](../pgs-propose-before-code/SKILL.md)
- [`pgs-v3-reference-bank.mdc`](../../rules/pgs-v3-reference-bank.mdc) — bank IDs only
- [`pgs-v3-product-recovery.mdc`](../../rules/pgs-v3-product-recovery.mdc) — sources A–D
- [`pgs-backend-phase-wire`](../pgs-backend-phase-wire/SKILL.md)
- [`pgs-master-workflow`](../pgs-master-workflow/SKILL.md)

Living notes: [`docs/PGS-REFERENCE-FIRST-GATES.md`](../../docs/PGS-REFERENCE-FIRST-GATES.md)

## Authority (bank is lowest)

OWNER DECISION → PGS FLOW / FIGMA → existing PGS V3 architecture → developer legacy evidence → Reference Bank.

A reference may **never** override: owner product logic, PGS frontend design, Supabase RLS, canonical RBAC, `mentor_assignments`, `premium_entitlement`, Phase 4D document security, `audit_events`.

## Scope tiers

| Tier | When | Scout + bank study | Propose + GO AHEAD |
|---|---|---|---|
| **A — Full gate** | New Ops/CMS/API capability; auth / RBAC / session / redirect; new tables / RLS / RPC; cross-module wire | **Required** (multi-agent) | Required |
| **B — Propose only** | Copy, CSS, spacing on an already-approved screen; single-file bug with **no** auth/data effect | Not required | Required |
| **Out of scope** | Student/public frontend visual work | Bank does not restyle these — use Figma/legacy skills | Per those skills |

Expected output + owner `GO AHEAD` are **always** required for Tier A and B. Scout depends on the tier — do not ritual-scout one-line CSS.

## Hard rules

1. **Bank ID first** (Tier A). Map to RB-01…RB-15. If none fits → `REFERENCE BANK GAP — <problem>` and stop. Do **not** pick Medusa/Monday/Salesforce/etc. as substitutes unless the owner adds them to the bank.
2. **Study only that row’s** mature app + OSS + approved framework. Return APP / OSS / FRAMEWORK + ADOPT / ADAPT / REJECT.
3. **OSS = inspect, never dump.** AGPL/GPL = pattern study only unless owner approves.
4. **Multi-agent scout (Tier A):** only the **top-level agent** launches scouts / Opus review. Parallel agents as useful:
   - current V3 routes/API/DB for this domain
   - bank OSS/app architecture lessons (cite paths; no code dumps)
5. **Expected output before code.** WHAT · BEFORE → AFTER · files · ELI5 · NOT IN SCOPE · **EXPECTED QC**. Stop for `GO AHEAD`.
6. **Opus review (advisory)** for: new skill/process, auth/logout/RBAC surface split, cross-module API rebuild. Prefer latest available Opus model for the Task tool. **Opus never replaces the owner’s `GO AHEAD`.**
7. **Connected data = read-only** unless owner picks flush. Read-only means: **no** inserts/updates/deletes/seeds/migrations/Auth user changes on the connected DB for “convenience.” If real/business/test user data needs keep/delete/migrate → **STOP** and ask KEEP / DELETE / MIGRATE.

## Per-feature sequence (Tier A)

```text
1. Name feature + Bank ID (or GAP stop) + scope tier
2. Multi-agent scout: Source D (V3) + Source C (bank lessons)
3. Fold Sources A/B as needed — owner authority wins
4. Draft propose + EXPECTED QC
5. Auth/RBAC/process → Opus advisory review → fix MUST-FIX
6. Owner synopsis + expected output → wait GO AHEAD
7. Implement one gate → tests → Vomit → owner Preview QC
```

## Anti-patterns

- Skipping expected-output / GO AHEAD
- Ritual multi-agent scout for Tier B CSS
- Shopping GitHub outside the bank row
- Client-supplied logout/login redirect paths echoed by the server (use fixed **surface** maps)
- Treating fixture DB as production truth while building gates
