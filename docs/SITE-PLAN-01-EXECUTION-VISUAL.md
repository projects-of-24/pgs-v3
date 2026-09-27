# Site plan Batch 01 — Visual execution plan (roles)

**Series:** [`SITE-BACKEND-PLAN.md`](./SITE-BACKEND-PLAN.md) · Roles: [`SITE-PLAN-01-ADMIN-ROLES.md`](./SITE-PLAN-01-ADMIN-ROLES.md)  
**Full Admin inventory (every Ops/CMS module + FE→BE):** [`SITE-PLAN-ADMIN-INVENTORY.md`](./SITE-PLAN-ADMIN-INVENTORY.md)  
**Status:** DRAFT — planning only · no product code  
**Date:** 2026-09-21  

Owner ask: **references + execution plan + screenshot-wise how it works** before build.

---

## References (steal, don’t invent)

| Source | What we steal | Path / ID |
|---|---|---|
| **Hostinger / legacy** | One staff app (`pgs_admin`) · `Users/login` · CMS + `Users/*` ops + `Admins/*` behind same session | `docs/legacy-admin-map.md`, `docs/legacy-route-map.md` |
| **V3 certified** | Supabase Auth · `staff_*` · `/login?surface=operations` · `/ops` shell · People & Access | `staff-auth.ts`, `admin-shell.tsx`, OPS-04 |
| **Domain contracts** | ONE STAFF IDENTITY · permission ≠ role name · no `ops_users`/`cms_users` | `.cursor/rules/pgs-v3-domain-contracts.mdc` |
| **RB-02 ACCESS** | Org/team membership · role vs permission · grant/revoke · least privilege | Reference Bank |
| **Architecture** | Actor contexts · role map | `docs/pgs-v3-architecture/04-identity-rbac-permission-model.md` |

---

## How it works (screenshot storyboard)

These are **wireframe screens** of the intended click path — not Figma pixel builds.  
Today’s V3 already matches most of this; gaps called out.

### Screen 0 — Two doors (not two password databases)

```text
╔══════════════════════════════════════════════════════════════╗
║  PUBLIC SITE                          STAFF ENTRY            ║
║  purpleguide.study (example)          /login?surface=ops     ║
║                                                              ║
║  ┌────────────────────┐             ┌────────────────────┐   ║
║  │  STUDENT LOGIN UI  │             │  STAFF LOGIN UI    │   ║
║  │  (main /login)     │             │  email + password  │   ║
║  │  students only     │             │  same Auth pool    │   ║
║  └────────────────────┘             └────────────────────┘   ║
║           │                                   │              ║
║           ▼                                   ▼              ║
║     Student feed /                    Ops / CMS / Team       ║
║     dashboard                         (by permission)        ║
╚══════════════════════════════════════════════════════════════╝
```

**Later (DEFERRED):** concentrated student/guardian host e.g. `feed.purpleguide.study` — still one Auth, dashboard-focused chrome.

---

### Screen 1 — Staff signs in (one id)

```text
┌─────────────────────────────────────────┐
│  PGS Operations login                   │
│  ─────────────────────────────────      │
│  Email     [________________]           │
│  Password  [________________]           │
│           [  Sign in  ]                 │
│                                         │
│  After success → /ops (or redirect)     │
└─────────────────────────────────────────┘
```

**Ref:** `/login?surface=operations` · `POST /api/auth/login` · then `getStaffContext()`.  
**Fail:** no `staff_profiles` / assignment → bounce to student dashboard (not into Ops).

---

### Screen 2 — Operations home (domain A) — searchable + overview

Owner product (EXISTS in V3): `/ops` is not an empty landing. Staff get a **searchable dashboard** and an **overview of operational implications** (what needs attention), still behind the same staff id and `overview.read`.

```text
┌──────────┬────────────────────────────────────────────────────────────┐
│ OPS      │  Operations Scoreboard          [ Ask PGS ]  [ Search… ] │
│          │────────────────────────────────────────────────────────────│
│ Scoreboard│  KPI cards (total / premium / assigned / …)               │
│ Students │  Mix charts · join trend · recent activity · roster peek │
│ Targets  │  Operate links → Students / Team / Work                    │
│ Team *   │                                                            │
│ Notifs   │  SEARCH (header): students · courses · events · programs │
│ Activity*│            universities · CMS pages · staff · work         │
│          │  → deep-link into Ops OR CMS (same session)                │
│ [Avatar] │                                                            │
│ Admin    │  ASK PGS: “What needs attention?” · facts + next step      │
└──────────┴────────────────────────────────────────────────────────────┘
  * Team + Activity: hide for mentor-preview; need staff.read / audit.read
```

| Piece | Path | Role gate |
|---|---|---|
| Scoreboard overview | `/ops` · `OperationsScoreboardView` | `overview.read` + scope (org vs assigned) |
| Cross-product search | `OperationsStaffSearch` → `/api/staff/search` | `overview.read`; results permission-shaped |
| Ask PGS overview | `AskPgsPanel` in shell | `overview.read` |

**Search domains (live):** `students` · `courses` · `events` · `programs` · `universities` · `pages` · `staff` · `work` — this is how one login reaches **Ops + CMS + Student Ops** without a second password.

| Role | Scoreboard | Search | Ask PGS | Team | Activity | CMS via search |
|---|---|---|---|---|---|---|
| Super Admin | org | ✓ | ✓ | ✓ + invite | ✓ | ✓ if grants |
| Admin | org | ✓ | ✓ | ✓ (no invite) | ✓ | ✓ if grants |
| Mentor | assigned / restricted | ✓ scoped | ✓ scoped | ✗ | ✗ | no catalog manage |
| Read-only | narrow | if `overview.read` | if allowed | ✗ | ✗ | read only if any |

**Ref:** `AdminShell` nav items · permissions filter.

---

### Screen 3 — Same id opens CMS (domain B)

No second login. Staff with `catalog.*` / `cms.*` goes to CMS URLs (⌘K or bookmark). Same session cookie.

```text
┌──────────────────────────────────────────────────────────────┐
│  CMS — Catalog / Content                                      │
│  /admin/catalog/events · /admin/content/pages · /cms          │
│                                                              │
│  [ Events ] [ Courses ] [ Programs ] [ Tags ] …              │
│                                                              │
│  List → edit draft → preview → publish                       │
│  (Batch 02 owns depth; roles only gate who may enter)        │
└──────────────────────────────────────────────────────────────┘
```

**Screenshot idea:** Admin edits an event; Mentor hitting the same URL → denied / no manage UI.

---

### Screen 4 — Student Operations (domain C)

Same Ops shell → Students → one student.

```text
┌──────────┬──────────────────────────────────────────────────┐
│ OPS      │  Student: Priya  ·  Premium  ·  Mentor: Anjay    │
│ Students │──────────────────────────────────────────────────│
│  ▸ Priya │  [ Profile ] [ Loopboard ] [ Comments ] [ Docs ] │
│  ▸ …     │                                                  │
│          │  Comments = workspace_comments (one truth)       │
│          │  (Batch 04 depth)                                │
└──────────┴──────────────────────────────────────────────────┘
```

| Actor | Sees Priya? |
|---|---|
| Admin / Super | Yes (org scope) |
| Mentor assigned to Priya | Yes |
| Mentor **not** assigned | No (same error as missing — no oracle) |
| Read-only | Registry peek only — no mutate |

---

### Screen 5 — People & Access (Super Admin)

```text
┌──────────┬──────────────────────────────────────────────────┐
│ OPS      │  Team                                            │
│ Team     │  [ Directory ]     [ Invite staff ]              │
│          │                                                  │
│          │  Name          Role            Status            │
│          │  Anjay         Mentor          Active            │
│          │  Meera         Admin           Active            │
│          │                                                  │
│          │  Invite: email + role → staff_role_assignments   │
└──────────┴──────────────────────────────────────────────────┘
```

**Only Super Admin** has `roles.manage` → Invite.  
Admin can see Team (`staff.read`) but cannot hand out roles (today’s V3).

---

### Screen 6 — Future concentrated student host (DEFERRED)

```text
╔════════════════════════════════════╗
║  feed.purpleguide.study (example)  ║
║  ────────────────────────────────  ║
║  Student / Guardian login only     ║
║  → Dashboard / feed focus          ║
║  No full public marketing chrome   ║
║  Still ONE Auth — not new passwords║
╚════════════════════════════════════╝
```

Not in Batch 01 build. Recorded so execution later doesn’t invent a second student DB.

---

## One click path (mentor example)

```text
1. Open /login?surface=operations
2. Sign in (same email as always)
3. Land /ops — Scoreboard overview + Search + Ask PGS (no Team in nav)
4. Search a student or course → jump to Ops or CMS link (same session)
5. Open Students → only assigned rows
6. Open student → Comments / Loopboard / Docs (assigned scope)
7. Try catalog manage → no catalog.manage → cannot edit
8. Logout
```

```text
Admin same steps 1–2, then:
3. Sees Team (no Invite) + Activity
4. Can open /admin/catalog and publish if catalog.publish
5. Can open any student in org scope
```

```text
Super same as Admin, plus:
→ /ops/team/invite → grant Mentor role to new staff
```

---

## Execution plan (when owner says build — still after Batches 02–05 rough plans)

**Do not start until** site series has a rough idea and owner picks a gate.  
Below is the **roles-only** build sequence for later.

| Step | Gate id | What you will *see* / QC | Code touch (later) | Day-1 security |
|---|---|---|---|---|
| **E0** | `GO AHEAD ROLES-E0` | Living MD locked (this + Batch 01) | Docs only | — |
| **E1** | `GO AHEAD ROLES-E1` | Click matrix: 4 roles × Screens 1–5 | Tests / fixtures if missing; no invent perms | Mentor cannot see unassigned; invite Super-only |
| **E2** | `GO AHEAD ROLES-E2` | Honesty fix: doc keys ↔ DB ↔ TS allowlist | Reconcile permission catalog | No silent grant widen |
| **E3** | `GO AHEAD ROLES-E3` | Owner D1–D5 applied (Admin vs Super publish, etc.) | Grant matrix migration if needed | Fail closed |
| **E4** | — | Hand off to Batch 02/04 execution | CMS / Ops plans | — |

**Lab first:** prefer preview / test staff accounts · say preview vs live · one gate at a time (`pgs-backend-phase-wire`).

---

## Screenshot QC checklist (owner — when E1 runs)

Capture or click through (desktop):

| # | Shot | Pass if |
|---|---|---|
| S1 | Student `/login` | Looks like student door, not Ops chrome |
| S2 | Staff `/login?surface=operations` | Ops login UI |
| S3 | Super → `/ops` | Team + Activity · search · Ask PGS · org scoreboard |
| S3b | Type search “MBA” / student name | Groups: students + courses/events/pages as permitted |
| S3c | Ask PGS “What needs my attention?” | Facts + suggested next step; no data outside role scope |
| S4 | Mentor → `/ops` nav | No Team / Activity; scoreboard scoped |
| S5 | Mentor → unassigned student URL | Denied, no data leak |
| S6 | Admin → `/admin/catalog` | Can manage (if grants say so) |
| S7 | Mentor → `/admin/catalog` | Cannot manage |
| S8 | Super → `/ops/team/invite` | Invite works |
| S9 | Admin → invite | Blocked |

---

## What we are **not** executing in Batch 01

- Face card UI · tags · Filling Fast schema  
- CMS editor redesign · Canva port  
- `feed.purpleguide.study` host cutover  
- Popup system  
- Security full pass (Batch 05)  

---

## Owner next

1. Walk the storyboard Screens 0–5 — does this match your head?  
2. **Full module list + Premium grant/revoke + CMS:** QC [`SITE-PLAN-ADMIN-INVENTORY.md`](./SITE-PLAN-ADMIN-INVENTORY.md) against live `/ops`  
3. Finish D1–D6 on [`SITE-PLAN-01-ADMIN-ROLES.md`](./SITE-PLAN-01-ADMIN-ROLES.md)  
4. Say **`READY 01`** / **`READY ADMIN-INVENTORY`** → next batch (CMS storyboard)  
5. Or ask for live lab captures beside these wires — still no build