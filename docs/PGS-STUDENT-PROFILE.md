# PGS Student Profile — living map

**Status:** **PARKED findings** (owner 2026-09-22) — return later · **no product UI/build from this note alone**  
**Skill:** `.cursor/skills/pgs-student-profile/SKILL.md`  
**Full findings:** [`SITE-PLAN-02c-STUDENT-PROFILE.md`](./SITE-PLAN-02c-STUDENT-PROFILE.md)  
**Series:** [`SITE-BACKEND-PLAN.md`](./SITE-BACKEND-PLAN.md) · Student Ops [`PGS-STUDENT-OPS.md`](./PGS-STUDENT-OPS.md)  
**Sync surfaces:** [`STUDENT-FEED-MODULAR.md`](./STUDENT-FEED-MODULAR.md) §1 identity card · Track Progress · Ops workspace

Build only with named `GO AHEAD SP-…` after field list + lock trigger are owner-locked.

---

## What it is

Facebook / Instagram–style **student identity hub** — display pic, PGS id, stream, target year, country/countries, goal, and related details.

```text
ONE truth = profiles (+ student-avatars)
  → Profile page (UI later, post backend + field list)
  → Feed identity card (LOCKED chrome — data only)
  → Track Your Progress identity strip
  → Staff Student Ops (view / edit / override locked fields)
```

**Not:** second student DB · redesigning locked feed card layout in this batch · building FB UI before fields + lock rules.

---

## Owner product locks (captured)

1. Profile feels like **Facebook / Instagram** (display pic + identity facts), not only a staff form.  
2. **UI not deliberate yet** — after backend + agreed field list.  
3. Then **sync** to feed student card + Track Your Progress.  
4. At signup / completion: **everything editable**.  
5. Once **stream** and/or **target year** are locked in → **student cannot change**; **only Admin** can.

---

## Phase order (do not skip)

```text
SP-0  Field list + lock trigger decisions (owner)
SP-1  Backend / validation / lock + staff override (+ audit)
SP-2  Profile page UI (Figma / visual plan → GO AHEAD)
SP-3  Wire sync: feed card · track progress · Ops
```

---

## Exists today (honesty)

| Piece | Status |
|---|---|
| `profiles` + avatar Storage | **EXISTS** |
| `/student/profile` form (developer shell) | **EXISTS** — not FB hub |
| Student PUT profile / POST avatar APIs | **EXISTS** |
| Feed identity card chrome | **LOCKED** — data often fixture |
| Stream / target year **lock** | **MISSING** |
| Goal / multi-country / @handle as profile truth | **GAP / owner decide** |
| Staff full profile + avatar edit | **PARTIAL / GAP** (CRM ≠ full profile) |

---

## Open owner decisions (before build)

See full list in [`SITE-PLAN-02c-STUDENT-PROFILE.md`](./SITE-PLAN-02c-STUDENT-PROFILE.md) § Owner decisions.

Short list: lock trigger · @handle · one vs multi country · goal field · who overrides (Admin only vs mentor too).

---

## How to continue

| You say | What happens |
|---|---|
| Reopen Profile | Read this + 02c · resolve decisions · re-propose |
| `GO AHEAD SP-0` | Lock field list + rules in MD (still no UI) |
| `GO AHEAD SP-n` | One backend/UI/sync gate only |
