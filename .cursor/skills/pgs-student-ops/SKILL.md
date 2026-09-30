---
name: pgs-student-ops
description: >-
  LOCKED Student Operations plan (READY 02b). Assigned-student home (Mine/All),
  per-student overview and tabs (Dashboard Data, Comments thread, Review & Notes,
  Documents), university shortlist from CMS, View as Student, Kanban import later.
  Comments: workspace_comments Reply vs Private Note, Super on any thread,
  @mention helpers proposed. Same staff id as Ops/CMS. Student Profile hub
  (FB-style · lock · sync) = Batch 02c PARKED — skill pgs-student-profile.
  Use when planning or wiring /ops/students, workspace API, mentor scope,
  or staff↔student one-truth.
---

# PGS Student Operations (LOCKED)

**Series status:** **LOCKED for series** — owner READY 02b · **2026-09-21**.  
Plan lock ≠ build. Implement only with named `GO AHEAD SO-…`.

**Living MDs:**

| Doc | Role |
|---|---|
| [`docs/PGS-STUDENT-OPS.md`](../../docs/PGS-STUDENT-OPS.md) | Quick locks · gates |
| [`docs/SITE-PLAN-02b-STUDENT-OPS.md`](../../docs/SITE-PLAN-02b-STUDENT-OPS.md) | **Visual plan** · comments deep · refs · honesty |
| Refs | `docs/site-plan-refs/hostinger-student-ops-dashboard-data.png` · `ref-student-ops-inbox-chatwoot-style.jpg` |
| Kanban | Owner builds separately → import gate **SO-K** |
| Profile hub | [`PGS-STUDENT-PROFILE.md`](../../docs/PGS-STUDENT-PROFILE.md) · skill `pgs-student-profile` — **PARKED** |
| Ops / CMS | `pgs-admin-ops` · `pgs-cms` |

Series: [`docs/SITE-BACKEND-PLAN.md`](../../docs/SITE-BACKEND-PLAN.md) → **02c Profile PARKED** · Popups (03) · or first `GO AHEAD SO-n`.

---

## Product picture (do not invent)

```text
HOME = assigned students (group/sort) · Super sees All
  → student overview → tabs
      Dashboard Data (metrics · checklist · feedback · shortlist from CMS)
      Comments (thread · Reply / Private · @helpers)
      Review & Notes · Documents
      Profile = Batch 02c PARKED (FB hub · stream/year lock · sync cards)
      Kanban = IMPORT later
    → View as Student = real student dashboard
SAME staff Auth · mentor_assignments scope
```

**REJECT:** second student DB · fake dashboard clone · second comments table · install Chatwoot · invent Kanban now · password View-as · building Profile hub UI before `pgs-student-profile` SP-0/SP-1.

---

## Comments (concentrate)

| Rule | Detail |
|---|---|
| Truth | `workspace_comments` only |
| Thread | `parent_id` |
| Reply | `visibility = student_visible` |
| Private note | `visibility = staff_only` (student never sees) |
| Super | Any student thread |
| Mentor | Assigned students |
| @helpers | **GAP** — propose participants/mentions before migrate |
| Bank | **RB-05** Chatwoot patterns · **RB-04** notifications |

---

## Reference Bank

RB-05 Chatwoot · RB-04 · RB-01 Twenty · RB-06 Plane (after import) · RB-07 · RB-08 · RB-02 · RB-09 CMS unis · Hostinger + inbox refs.

Full catalog: `.cursor/rules/pgs-v3-reference-bank.mdc`.

---

## Game plan (one gate each)

```text
SO-0 → SO-1 home → SO-2 shell/tabs → SO-3 dashboard+unis
→ SO-4 comments → SO-5 @helpers → SO-6 notes/docs
→ SO-7 View as Student → SO-K Kanban import → groups/perf
```

---

## Key URLs

| Surface | URL |
|---|---|
| Home / registry | `/ops/students` |
| Workspace | `/ops/students/[id]` |
| API | `/api/staff/students/[id]/workspace/[resource]` |
| Preview | `POST /api/staff/preview` |
| Premium grant | `/admin/access` (Admin — not invent here) |

---

## Agent checklist

- [ ] Read locked `SITE-PLAN-02b-STUDENT-OPS.md` visuals + comments  
- [ ] Propose → `GO AHEAD SO-n` one gate (plan lock ≠ build)  
- [ ] Kanban only under **SO-K** / owner import  
- [ ] Comments: one table · no student-visible private notes  
- [ ] @helpers: propose schema — no silent migrate  
- [ ] Unis from CMS master only  
- [ ] Same staff id · mentor scope · no IDOR oracle  
- [ ] Profile hub / lock / feed sync → skill `pgs-student-profile` (not invent inside SO gates)
- [ ] Update living MD after gate 
