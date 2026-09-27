# PGS Student Operations — living map

**Status:** **LOCKED for series** (owner READY 02b · 2026-09-21)  
**Skill:** `.cursor/skills/pgs-student-ops/SKILL.md`  
**Full visual + comments + gates:** [`SITE-PLAN-02b-STUDENT-OPS.md`](./SITE-PLAN-02b-STUDENT-OPS.md)  
**Refs:** [`site-plan-refs/hostinger-student-ops-dashboard-data.png`](./site-plan-refs/hostinger-student-ops-dashboard-data.png) · [`site-plan-refs/ref-student-ops-inbox-chatwoot-style.jpg`](./site-plan-refs/ref-student-ops-inbox-chatwoot-style.jpg)  
**Student 360:** [`pgs-v3-architecture/07-student360-model.md`](./pgs-v3-architecture/07-student360-model.md)  
**Student Profile (PARKED):** [`PGS-STUDENT-PROFILE.md`](./PGS-STUDENT-PROFILE.md) · [`SITE-PLAN-02c-STUDENT-PROFILE.md`](./SITE-PLAN-02c-STUDENT-PROFILE.md) · skill `pgs-student-profile`  
**Series:** [`SITE-BACKEND-PLAN.md`](./SITE-BACKEND-PLAN.md)

Build only with named `GO AHEAD SO-…`. Plan lock ≠ build approval.

---

## What it is

Assigned-student workbench. Super Admin sees **all**. Staff edit the **same** dashboard truth students see.

```text
HOME (Mine / Mentions / All)
  → student OVERVIEW
  → tabs: Dashboard Data · Comments · Review & Notes · Documents
       (+ Profile hub = Batch 02c PARKED — FB-style identity · lock · sync)
  → Kanban = IMPORT later (owner building separately)
  → View as Student → real student UI
```

Universities shortlist = pick from **CMS** master.  
Comments = one `workspace_comments` thread · Reply vs Private Note · Super on any · @helpers (propose).

---

## Locked stack

Next.js · Supabase · RLS · `mentor_assignments` · `premium_entitlement` · Phase 4D · shadcn · dnd-kit **after** Kanban import.

---

## References (patterns only)

| Bank | Steal |
|---|---|
| **RB-05** Chatwoot | Thread · Reply/Private · @mentions · Mine/Mentions/All |
| **RB-04** | Mention notifications |
| **RB-01** Twenty | Assigned list · tags |
| **RB-06** Plane | Kanban after import |
| **RB-07** | Review · alerts |
| **RB-08** Paperless | Doc review UX |
| **RB-02** Supabase | Scope · helpers |
| **RB-09** | CMS universities master |
| Hostinger PNG | Tab IA · metrics · uni picker |

---

## Comments (hard locks)

1. One table: `workspace_comments` (`parent_id` thread).  
2. `student_visible` = Reply · `staff_only` = Private note (student never sees).  
3. Super Admin can open **any** student thread.  
4. Mentor = assigned only until @helper grant exists.  
5. No second comments system for feed.  
6. @mention helpers = **propose schema** before migrate.

---

## Game plan

`SO-0` → home `SO-1` → shell/tabs `SO-2` → dashboard+unis `SO-3` → **comments** `SO-4` → @helpers `SO-5` → notes/docs `SO-6` → View as `SO-7` → **Kanban import `SO-K`** → groups/perf later.

---

## How to continue

| You say | What happens |
|---|---|
| Picture change | Re-propose · owner re-locks if contract moves |
| `GO AHEAD SO-n` | One build gate only |
| Profile later | Batch **02c PARKED** — [`PGS-STUDENT-PROFILE.md`](./PGS-STUDENT-PROFILE.md) |
| Next series | Batch **03 Popups LOCKED** — [`PGS-POPUPS.md`](./PGS-POPUPS.md) |
