---
name: pgs-student-profile
description: >-
  PARKED Student Profile hub (Facebook/Instagram-style): display pic, PGS id,
  stream, target year, country/countries, goal; signup fully editable; later
  stream/year lock = Admin only. UI after backend + field list; then sync to
  feed identity card + Track Progress + Student Ops. Same profiles truth — no
  second DB. Use when planning or wiring /student/profile, avatar, lock rules,
  or identity sync to feed/track/Ops.
---

# PGS Student Profile (PARKED findings)

**Status:** **PARKED** — owner capture **2026-09-22**.  
Plan note ≠ build. Implement only with named `GO AHEAD SP-…` after field list + lock trigger lock.

**Living MDs:**

| Doc | Role |
|---|---|
| [`docs/PGS-STUDENT-PROFILE.md`](../../docs/PGS-STUDENT-PROFILE.md) | Quick locks · phases · honesty |
| [`docs/SITE-PLAN-02c-STUDENT-PROFILE.md`](../../docs/SITE-PLAN-02c-STUDENT-PROFILE.md) | Full findings · fields · lock · sync · decisions |
| Feed card | [`docs/STUDENT-FEED-MODULAR.md`](../../docs/STUDENT-FEED-MODULAR.md) §1 — chrome LOCKED · data from Profile later |
| Student Ops | skill `pgs-student-ops` · staff view/override |
| Series | [`docs/SITE-BACKEND-PLAN.md`](../../docs/SITE-BACKEND-PLAN.md) |

---

## Product picture (do not invent)

```text
Profile hub ≈ Facebook / Instagram
  pic · id · stream · target year · country(ies) · goal · …
  OPEN at signup → student edits all
  LOCK stream/year → student blocked · Admin only

ONE truth = profiles + student-avatars
  → hub UI (later) · feed card · track progress · Ops
```

**REJECT:** second profile DB · hub UI before SP-0/SP-1 · redesign locked feed identity chrome · client-only lock.

---

## Phase order

```text
SP-0 field list + lock trigger
SP-1 backend lock + Admin override + audit
SP-2 Profile hub UI (Figma → GO AHEAD)
SP-3 sync feed · track progress · Ops
```

---

## Exists / gaps (short)

| | |
|---|---|
| **EXISTS** | `profiles` · avatar APIs · form at `/student/profile` · feed card chrome |
| **MISSING** | stream/year lock · FB hub UI · full staff profile/avatar · goal/handle/multi-country decisions |

---

## Open decisions (must resolve on reopen)

1. Lock trigger  
2. @handle  
3. One vs multi country  
4. Goal field  
5. Who overrides (Admin only vs mentor)  
6. Ops IA (tab vs rail)  

---

## Agent checklist

- [ ] Read `PGS-STUDENT-PROFILE.md` + `SITE-PLAN-02c-STUDENT-PROFILE.md`  
- [ ] Do **not** build hub UI until SP-0/SP-1 locked and `GO AHEAD SP-2`  
- [ ] Feed/Track Progress: wire **data** only — keep Section 1 chrome locked  
- [ ] One `profiles` truth — CRM tags/stage stay separate  
- [ ] Lock = server reject on student path, not hide-in-React  
- [ ] Propose → `GO AHEAD SP-n` one gate · update living MD after  
- [ ] Family A/B doorman unchanged (`pgs-student-family-doorman`)  
