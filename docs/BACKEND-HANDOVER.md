# PGS V3 — Backend / full-stack handover

**Who this is for:** a new backend or full-stack developer who has never seen PGS.  
**What this is:** the one teaching document for how the backend is supposed to work, what already exists, what is only planned, and what you must never invent.  
**What this is not:** permission to build. Plans can be locked and still wait for a named `GO AHEAD`.  
**Written:** 2026-09-28 from the owner’s backend planning series + the live V3 repo. If a later owner decision contradicts this file, the later decision wins — update this file.

Read this top to bottom once. Then keep it open while you work.

---

## 0. How to use this document

### Status words (do not blur them)

| Word | Meaning |
|---|---|
| **EXISTS** | In the live V3 repo and/or database today. You can click it or query it. |
| **PARTIAL** | Some of it exists. The missing piece is named. |
| **LOCKED PLAN** | Owner approved the *idea*. That is **not** build approval. |
| **PARKED** | Captured so we do not forget. Do not build from the note alone. |
| **MISSING** | Not built. A plan may or may not exist. |
| **DEFERRED** | Later on purpose. Do not sneak it into the current gate. |
| **REJECT** | Never do this. Not “later.” Never. |
| **OWNER DECISION** | You cannot guess this. Stop and ask. |

### The one rule that keeps this product sane

**You do not invent.**  
You follow owner decisions, these contracts, and the existing V3 tables/APIs. If something is unclear (student vs staff, which table, which permission, which upload path), you **stop and ask**. You do not pick a “reasonable default” and ship it.

### How work is allowed to happen

```text
1. Map the connection first
   screen / button → API route → actor + permission + scope → parent table → child rows
2. Write a short proposal (what / why / before→after / files / what is NOT in this change)
3. STOP. Wait for the owner to say GO AHEAD or GO AHEAD <gate-id>
4. Build exactly that one gate
5. Day-1 security in the same gate (not “we’ll lock it later”)
6. Update the living Kanban / map for that family
7. Owner clicks it live. STOP. Wait for the next GO AHEAD
```

**Plan lock ≠ build.**  
Student Ops, Popups, and Admin living maps can say **LOCKED for series**. That means “do not re-derive the idea.” It does **not** mean “start coding.”

---

## 1. What PGS is (ELI5)

PGS (Purple Guide Study) helps students plan study-abroad / medical-pathway journeys.

Think of it as **one school building** with four kinds of rooms:

```text
PUBLIC ROOMS     Anyone can walk in. Country pages, events, courses, marketing.
STUDENT ROOMS    A student with a login. Feed, profile, saves. Premium unlocks more rooms.
STAFF ROOMS      Mentors and admins. Three offices, one staff badge:
                   • Operations  = “how is the school doing?”
                   • CMS         = “what content is on the walls?”
                   • Student Ops = “work on this one student”
GUARDIAN ROOM    A parent/teacher who may see a little of one linked child. Not staff.
```

There is **one login system** (Supabase Auth).  
A person is not “a Premium account” or “an Ops account.” They are **one Auth user**. What they can do comes from **rows in the database**:

- a `profiles` row → they can be a student
- a `staff_profiles` + role assignment → they can be staff
- an active `premium_entitlements` row → that student is Premium right now
- an active `mentor_assignments` row → that staff member may touch that student
- an active Viewer / guardian relationship → they may see only what was explicitly granted

**Frontend and backend are different jobs.**  
Student/public screens follow owner Figma. Staff screens use the locked internal stack (shadcn). Both talk to the **same** student data. Never make a second “staff copy” of the student database.

---

## 2. The two truths (never mix them)

| Layer | Who is boss | What that means |
|---|---|---|
| **Product / visual** | Latest owner decision → PGS Flow → approved Figma → existing approved frontend → legacy Hostinger as evidence | How it looks and what the workflow *intends* |
| **Engineering / security** | Current V3: Supabase Auth, Postgres, RLS, RPCs, canonical permissions, the one-truth tables | How it is allowed to happen |

Legacy PHP/MySQL may tell you **what the business wanted**.  
It must **never** tell you how to store passwords, authorize, or serve private files.

---

## 3. The house picture (whole product)

```text
                         Supabase Auth
                    (one identity pool)
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
   STUDENT login      STAFF login         GUARDIAN login
   /login             /login?surface=     /login?surface=
                      operations          guardian
        │                   │                   │
        ▼                   ▼                   ▼
  profiles row        staff_profiles      viewer / guardian
                      + role grants       relationship
        │                   │                   │
        │         ┌─────────┼─────────┐         │
        │         │         │         │         │
        │      /ops      /admin    /ops/       limited
        │   Operations    CMS     students     child data
        │                         (Student Ops)
        │
        ├── no Premium  → authenticated_standard
        │                 (locked / purchase-directed student shell)
        └── active Premium → authenticated_premium
                              (workspace, docs, board, mentor tools)
```

**Shared login is not shared data.**  
Same staff door. Mentor only sees assigned students. Super Admin can see all. The database enforces this, not React.

---

## 4. Actors (who a request is)

A request is never “the user is Admin because the URL says /ops.”  
Every request picks **one actor context** and proves it.

### 4.1 The three student faces (student UI only)

The server function `resolveStudentExperience()` in `src/lib/student-experience.ts` returns exactly one of:

| Kind | Plain English | What they see |
|---|---|---|
| `anonymous` | Not logged in | Public site. Locked student pages / fixtures where designed. |
| `authenticated_standard` | Logged-in student, **no** active Premium | Student shell. Premium rooms stay locked / purchase-directed. |
| `authenticated_premium` | Logged-in student + **active unexpired** entitlement | Unlocked Premium workspace. |

There is no fourth student UI state.  
Do **not** use `?premium=1` to fake Premium. Do **not** put “is Premium” in the JWT as authority.

**How Premium is decided (live code):**  
`resolvePremiumValidity()` in `src/lib/premium-entitlement.ts` looks at `premium_entitlements` rows.

Active means **all** of:

1. `status = 'active'`
2. `starts_at <= now()`
3. `ends_at > now()`

If none match: latest row may be `revoked` or `expired`, or there is `none`.  
Missing / revoked / expired Premium is **not** “kick them out of the student shell.” They stay a normal logged-in student.

### 4.2 Staff roles (product language)

| Role key | Badge says | Job in one line |
|---|---|---|
| `super_admin` | Super Admin | Run Ops + CMS + **who may be staff** |
| `admin` | Admin | Run Ops + CMS for the org. **Cannot** invite/change roles. |
| `mentor` | Mentor | Work **assigned** students only. No catalog edit. No People invite. |
| `read_only_staff` | Read-only staff | Look at permitted Ops data. Do not change it. |

**Role name is not authority.**  
Authority = **permission keys** on that role **plus** a **scope** (whole org vs this assigned student) **plus** resource state (published? clean file? active Premium?).

Old DB key `viewer` (global staff) is being renamed to `read_only_staff`. Live TypeScript already maps `viewer` → `read_only_staff` in `src/lib/staff-auth.ts`. Do not confuse this with **Student Viewer** (a parent/teacher linked to one student).

### 4.3 Premium is not a staff role

Premium is a **capability on a student**.  
Staff grant/revoke it. Students do not “apply” for it in V3.  
Legacy `purplepremium_applications` is **REJECT** as the live truth.

### 4.4 Student Viewer / guardian is not read-only staff

| Thing | What it is | Scope |
|---|---|---|
| `read_only_staff` | A **staff** role | Org (or restricted) **read** of Operations |
| Student Viewer | A **relationship** to one student | Only granted data classes + explicit document shares |
| Guardian portal | The Viewer-family **surface** | `/login?surface=guardian` · limited linked-child data |

Viewer/guardian never becomes “see every student.”  
A document grant never means “see every document.” Each shared file needs its own share row + a **clean** scan.

### 4.5 One person can wear more than one hat

One Auth user may have a student `profiles` row **and** a staff assignment.  
That is allowed. Every API still chooses **one context** for that request (student acting on self, or staff acting on a student). Do not invent a “switcher product” unless the owner asks.

### 4.6 The authorization equation (memorize this)

```text
ALLOW =
    they are logged in
AND their account / staff status is valid
AND they have the permission key for this operation
    (or they own the row, if they are the student)
AND the scope predicate passes
    (own row  OR  active mentor_assignments  OR  privileged read_all)
AND if the resource is Premium-only, entitlement is active
AND if it is a file, the version security state is clean
AND the resource lifecycle allows the move (draft vs live, review vs approved, …)
```

**Never:** fetch all rows in React and hide the ones they should not see.  
Unauthorized data must not leave Postgres RLS / the server.

**Never:** different error text for “this id does not exist” vs “this id exists but you may not see it.” Same 404 / deny. That stops IDOR fishing.

---

## 5. Surfaces (the doors)

### 5.1 Login doors

| Who | URL | After login |
|---|---|---|
| Students | `/login` | Student / public app |
| Staff | `/login?surface=operations` | `/ops`, `/admin/…` if they are staff |
| Guardian | `/login?surface=guardian` | Guardian portal |

Same Auth pool. Different **UI** and **post-login routing**.  
`/mentor` is only a bookmark into Ops students. **Not** a second login.

Staff with no `staff_profiles` / no role assignment must **not** land in Ops. Bounce them out.

### 5.2 Staff work domains (one badge, three offices)

| Domain | URL family | Job |
|---|---|---|
| Operations | `/ops` | Health, search, team, targets, activity |
| Student registry | `/ops/students` | Find a student |
| Student Operations | `/ops/students/[id]` (also older `/admin/students/[id]`) | Work **that** student |
| People & Access | `/ops/team` | Invite / assign / revoke staff roles |
| Premium + mentor assign | `/admin/access` | Grant/revoke Premium; assign/end mentor |
| CMS catalog | `/admin/catalog` | Events, courses, programs, unis, tags |
| CMS content | `/admin/content` | Page slots, testimonials, FAQs, meeting slots, … |
| CMS media | `/admin/media` | Marketing pics/videos — **not** student private docs |
| Leads | `/admin/leads` | Enquiries / journeys / deadline subs |
| Activity | `/ops/activity` | Privileged audit (`audit_events`) |

### 5.3 Student / public (same data, different face)

| Surface | URL | Notes |
|---|---|---|
| Public marketing / countries / events | many public routes | Read **published** catalog/CMS only |
| Student profile | `/student/profile` | EXISTS as a developer form — Facebook hub is PARKED |
| Feed | student feed routes | Identity card chrome is LOCKED; some data still fixture |
| Track Your Progress | `/feed_track_progress` | Family A vs Family B doorman (see §11) |
| Upload docs | Premium document routes | Phase 4D private Storage |
| View as Student | staff starts preview → **real** student routes | Read-only banner. Never take the student’s password. |

### 5.4 Preview vs live (say which one you changed)

Owner QC often uses `/preview/…` labs first.  
**Lab / preview** = safe sandbox, often fixtures or `@pgs.lab` users.  
**Live route** = real students can hit it.

Always say: “preview only” or “live route changed.”  
Prefer lab until the owner pulls a feature live.

### 5.5 Future host split — DEFERRED

Owner idea: a concentrated student/guardian host (example `feed.purpleguide.study`) so the dashboard is not mixed with the full public chrome.

Rules if that phase ever opens:

- Still **one Auth**. No new student password database.
- Staff stay on Ops/CMS hosts.
- Exact subdomain names = owner deploy decision.

**Not a current build.**

---

## 6. One truth per domain (the north star)

If you remember nothing else, remember this table.

| Domain | The one truth | What you must never create |
|---|---|---|
| Student identity | `profiles` (+ `student-avatars`) | A second “CRM student” table that copies name/phone |
| Staff identity | `staff_profiles` + `staff_role_assignments` | `ops_users`, `cms_users`, mentor-only password tables |
| Premium | `premium_entitlements` + `premium_entitlement_events` | Application queue as live entitlement |
| Mentor relationship | `mentor_assignments` | Trusting `users.mentor_admin_id` or a body `student_id` |
| Comments | `workspace_comments` | A second feed-comments product |
| Loopboard / Kanban | `student_board_columns` → `student_tasks` | A staff board and a student board as two datasets |
| Documents | Phase 4D private Storage + document tables | Hostinger public filesystem paths |
| Audit | `audit_events` | A second “general log” that staff treat as the audit |
| Notifications | `notifications` (recipient inbox) | Mixing audit into the student’s bell |
| Catalog masters | `countries`, `universities`, `programs`, `courses`, `events`, tags | Copying a university into page JSON as the master |
| CMS page copy | `cms_pages` + revisions | A page builder / free HTML layout CMS |
| Student 360 | A **read model** over the tables above | A giant `student_360` dump table |

**Notifications ≠ audit ≠ runtime logs.**

| Kind | Question it answers | Table / system |
|---|---|---|
| Notification | “Does this person need to know or act?” | `notifications` |
| Audit | “Who did what, forever?” | `audit_events` |
| Runtime logs | “What broke in the app?” | Sentry / server logs — not product history |

---

## 7. Parent → child map (the whole school notebook)

Read this as: **the parent owns the children.** A child row always belongs to exactly one parent. When you write a child, the **server** fills `student_id` from the URL / actor — never from a client field you blindly trust.

```text
auth.users                        ← the login (email/password). Not a role.
    │
    ├── profiles                  ← “this user is a student”
    │     ├── avatar in bucket student-avatars
    │     ├── premium_entitlements            (current Premium state)
    │     │     └── premium_entitlement_events (immutable ledger)
    │     ├── premium_workspace_profiles      (dashboard counts / pathway / notes_html)
    │     ├── student_university_selections   → universities (CMS catalog)
    │     ├── saved_programs / saved_courses  → catalog rows
    │     ├── workspace_comments              (thread via parent_id)
    │     ├── counselor_notes
    │     ├── review_queue_items
    │     ├── student_alerts
    │     ├── student_document_requirements
    │     │     └── student_documents (+ versions / reviews / shares — Phase 4D)
    │     ├── student_board_columns
    │     │     └── student_tasks
    │     ├── notifications                   (inbox for this recipient)
    │     └── student_viewer_relationships    (guardian/teacher)
    │           ├── permission grant rows
    │           ├── invitations (hashed tokens)
    │           └── document share rows
    │
    └── staff_profiles            ← “this user is staff”
          ├── staff_role_assignments → staff_roles
          │                              └── staff_role_permissions → staff_permissions
          └── mentor_assignments (staff user ↔ student profiles)
```

**Catalog / CMS live beside this. They are not student children.**

```text
countries
  └── universities
        ├── programs
        └── courses  (also course_categories)
events (+ event_categories, event_facilitators)
catalog_tags + tag-links
catalog_filter_facets + catalog_filter_options
cms_pages + revisions          ← typed slots, not layout
content modules                ← testimonials, faqs, articles, meeting_slots, …
media_assets                   ← marketing files (separate from student docs)
```

**Ops / platform extras**

```text
leads / enquiry source tables
staff targets
audit_events
private.integration_outbox     ← later Zoho/payments workers
site_settings
```

---

## 8. Identity, roles, and permissions (Batch 01)

**Plan:** [`SITE-PLAN-01-ADMIN-ROLES.md`](./SITE-PLAN-01-ADMIN-ROLES.md) — **DRAFT**  
**Living map:** [`PGS-ADMIN-OPS.md`](./PGS-ADMIN-OPS.md)  
**Inventory bible:** [`SITE-PLAN-ADMIN-INVENTORY.md`](./SITE-PLAN-ADMIN-INVENTORY.md)  
**Architecture:** [`pgs-v3-architecture/04-identity-rbac-permission-model.md`](./pgs-v3-architecture/04-identity-rbac-permission-model.md)

### 8.1 ELI5

A staff badge is like a **keychain**.

- The **role** is a labeled keychain (`mentor`, `admin`, …).
- Each **permission key** is one key (`catalog.publish`, `roles.manage`).
- **Scope** is which doors that key opens (all students vs only Ayush).

You can have the “read students” key and still be refused if Ayush is not assigned to you.

### 8.2 How a staff request is built (EXISTS)

```text
Browser hits /ops or /admin
  → session cookie
  → getStaffContext() in src/lib/staff-auth.ts
       1. load staff_profiles (must be status = active)
       2. load staff_role_assignments
       3. join staff_roles → staff_role_permissions → staff_permissions
       4. keep only keys in the TypeScript allowlist
  → route calls requireStaffPermission("some.key")
  → API hits Postgres
  → RLS / private.has_staff_permission('some.key')
  → if the row is a student child: also mentor_assignments or read_all
```

Effective permissions come from **DB grant rows**, not from a string you put in React.

### 8.3 Live permission keys (what the code allowlists today)

From `src/lib/staff-auth.ts` — this is the **live** list:

```text
overview.read
students.read
student_workspace.read
student_workspace.read_all
student_workspace.manage
student_workspace.manage_all
premium.manage
mentor_assignments.manage
document_shares.manage
staff_targets.read
staff_targets.manage
staff_targets.manage_all
catalog.read          catalog.manage          catalog.publish
cms.read              cms.manage              cms.publish
content.read          content.manage          content.publish
media.read            media.manage
leads.read            leads.manage
staff.read            roles.manage
audit.read
settings.read         settings.manage
```

### 8.4 Who can do what today (simplified, EXISTS)

| Role | Ops | CMS mutate / publish | Invite staff (`roles.manage`) | Student rows |
|---|---|---|---|---|
| Super Admin | Full | Yes | **Yes** | Global |
| Admin | Full | Yes (today equal to Super for catalog/CMS) | **No** | Global |
| Mentor | Assigned workspace | No (typically `media.read` only) | No | Assigned only |
| Read-only | Narrow read (overview + `students.read` in OPS-04) | No | No | N/A / minimized |

**Important drift:** Super and Admin are **equal for CMS mutate today**. Super’s extra is mainly **role governance**.  
Owner has **not** locked whether Super-only publish / Super-only face-template change should happen (decision D1).

### 8.5 Architecture catalog vs live keys (do not “fix” silently)

The architecture doc lists a **target** vocabulary (`student_comments.write`, `scoreboard.read`, `student_documents.review`, …).  
Live DB + TypeScript still lean on migration-era keys (`student_workspace.*`, …).

**ADAPT later** in a named reconcile gate.  
Do **not** rename keys in a random PR. Tests, RLS, and grants will break.

### 8.6 People & Access (EXISTS)

```text
Super Admin (roles.manage)
  → /ops/team
  → invite / assign role / revoke
  → POST /api/admin/staff → manage_staff_access + Auth invite
  → staff_role_assignments (history-oriented)
  → next request sees new permissions
```

**Production launch blocker (not a current coding blocker):** real invite email delivery (Resend / custom SMTP) is not certified. Until then, invitation resend UI must not fake “email sent.” See [`pgs-v3-architecture/17-owner-decisions-required.md`](./pgs-v3-architecture/17-owner-decisions-required.md).

### 8.7 Owner decisions still open (Batch 01)

| ID | Question |
|---|---|
| D1 | Admin vs Super for CMS / publish / face templates — keep equal, or Super-only? |
| D2 | How wide is read-only staff? Minimal Ops, or also CMS peek? |
| D3 | Confirm mentor hard stops: no catalog edit, no invite, no unassigned students |
| D4 | Same Auth user as student+staff — confirm OK |
| D5 | What does the product word **“unlock”** mean? Publish live vs Premium unlock vs other |
| D6 | Concentrated feed host — leave DEFERRED? |

### 8.8 REJECT forever (identity)

- `ops_users` / `cms_users`
- Separate mentor or CMS passwords
- Treating a display string on `staff_profiles` as authority
- JWT role as the only check
- Hide-unauthorized-in-React

---

## 9. Premium (the paid key)

**Table (EXISTS):** `premium_entitlements`  
**Ledger (EXISTS):** `premium_entitlement_events`  
**Staff UI (EXISTS):** `/admin/access`  
**API (EXISTS):** `POST /api/staff/premium` → RPC `set_premium_entitlement`  
**Permission:** `premium.manage`

### 9.1 ELI5

Premium is a **time-bounded key** hanging on a student, not a new login.

Staff (Admin / Super) can:

- grant
- revoke
- reactivate

A real payment webhook (later, Track C) must also write **this same table**.  
Never invent `is_premium` on the student row as the source of truth.

### 9.2 Live entitlement fields (code)

`PremiumEntitlementRecord` includes:

- `status`: `active` | `revoked` | `expired`
- `source`: `admin_grant` | `payment` | `legacy_purchase`
- `plan_code`, `duration_months`
- `approved_at`, `starts_at`, `ends_at`, `revoked_at`

Owner business rules also talk about event sources like `admin_revoke` / `admin_reactivate`. Those belong on the **events ledger**. Do not flatten history into one mutable flag.

### 9.3 What Premium unlocks (product)

Active Premium unlocks the student workspace: dashboard metrics, progress, documents, mentor conversation, shared Kanban, etc.

Standard students still have a real account. They see the **locked / purchase-directed** version of those rooms.

### 9.4 REJECT

- Bring back Purple Premium **applications** as the live workflow
- A second Premium table for “staff view”
- Client-set `premium=true`

---

## 10. Mentors (the assigned-student key)

**Table (EXISTS):** `mentor_assignments`  
**Invariant:** one **active** mentor per student; ended rows stay as history  
**API (EXISTS):** `POST /api/staff/assignments` → `set_mentor_assignment`  
**Permission:** `mentor_assignments.manage` (Admin / Super assign; mentor may read own)

### 10.1 ELI5

Assignment is a **named pairing**: Meera mentors Ayush.

- While the row is active, Meera may open Ayush’s Student Ops and those Premium student rooms.
- If you guess another student’s UUID, you get the same deny as “not found.”
- Ending the assignment is a lifecycle, not a silent overwrite with no history.

### 10.2 Scope rule (every student-child write)

```text
staff actor
  + permission (e.g. student_workspace.manage)
  + (student_workspace.manage_all / Super-style global
     OR active mentor_assignments for that student_id)
  + Premium predicate when the workspace is Premium-gated
```

The workspace API forces `student_id` from the URL actor.  
See §12.

---

## 11. Student experience doorman (Family A vs Family B)

**Skill:** `.cursor/skills/pgs-student-family-doorman/SKILL.md`  
**Living backend map:** [`FEED-TRACK-PROGRESS-KANBAN.md`](./FEED-TRACK-PROGRESS-KANBAN.md)

### 11.1 ELI5

Track Your Progress has **two different bodies**:

| Family | Who | Data |
|---|---|---|
| **A** | Anonymous + standard students | **Locked Figma fixtures.** No backend wire. Owner lock 2026-09-08. |
| **B** | Premium students | Real tables, one gate at a time. |

They are **two shells**, not one page with a toggle.  
CMS later needs two shapes. Mixing them with `?premium=` will rot the product.

### 11.2 Live doorman (EXISTS)

```text
/feed_track_progress
  → resolveStudentExperience()
       anonymous | authenticated_standard
         → FeedTrackProgressPreviewShell     (Family A fixtures)
       authenticated_premium
         → requirePremiumActor()
         → loadProgressAlerts(studentSubjectId)   ← B1 wired
         → FeedTrackProgressPremiumShell
            meters / board / tips still fixtures until later B gates
```

### 11.3 Wire status (Progress)

| Block | Table | Gate | Status |
|---|---|---|---|
| Important Alerts | `student_alerts` | B1 | **done** (Family B) |
| #draftMeter | `student_document_requirements` | B2 | **queued** — needs owner answers first |
| #reviewQueue | `review_queue_items` | B3 | **DEFERRED** — owner said wrong wiring; do not implement |
| #counselorNotes | `counselor_notes` | B4 | queued (UI window of 4 fixtures exists as N1) |
| Pathway chips | `premium_workspace_profiles.pathway_label` | B5 | queued |
| Loopboard | `student_board_columns` / `student_tasks` | B6 | queued — `docs/LOOPBOARD-KANBAN.md` is **referenced but the file is not in the repo** |
| Useful Tips / Resource Drop | **no table yet** | B7+ | queued — do not invent a table |

### 11.4 Progress lab pair (EXISTS, lab only)

| Role | Email | UUID |
|---|---|---|
| Premium student | `progress-lab-premium@pgs.lab` | `c1000000-0000-4000-8000-000000000001` |
| Super Admin | `progress-lab-superadmin@pgs.lab` | `c2000000-0000-4000-8000-000000000002` |

Seed:

```bash
PROGRESS_LAB_SEED=I_UNDERSTAND_LAB_ONLY \
PGS_PREVIEW_PROJECT_REF=<project-ref> \
pnpm lab:progress-seed
```

Password comes from `PGS_PREVIEW_FIXTURE_PASSWORD` in `.env.local`.  
**Lab only.** Do not point this at production students.

Pass test the owner cares about: Super Admin edits alerts for the lab student in Ops → that Premium student sees the same ≤3 alerts on `/feed_track_progress`.

### 11.5 B2 is proposed, not approved

B2 would bind #draftMeter to `student_document_requirements`.  
Owner still must pick gauge art (decorative Figma SVGs vs old meter image vs invent mapping), whether status appears in the label, and whether to seed lab requirements.

---

## 12. Student Operations (the per-student workbench)

**Plan:** [`SITE-PLAN-02b-STUDENT-OPS.md`](./SITE-PLAN-02b-STUDENT-OPS.md) — **LOCKED PLAN**  
**Living map:** [`PGS-STUDENT-OPS.md`](./PGS-STUDENT-OPS.md)  
**Architecture:** [`pgs-v3-architecture/07-student360-model.md`](./pgs-v3-architecture/07-student360-model.md)

### 12.1 ELI5

Student Ops is **not** a second student app for staff.  
It is the staff desk that edits the **same notebooks** the Premium student reads.

If Meera ticks “visa applied” here, Ayush’s dashboard must show the same tick.  
If they disagree, someone invented a second truth.

**Super Admin sees all students. Mentors/Admins see assigned students only.**

### 12.2 Intended screens (LOCKED PLAN — layout not all built)

```text
HOME  [ Mine ] [ Mentions* ] [ All** ]
  → open one student OVERVIEW
  → tabs:
       Dashboard Data
       Comments
       Review & Notes
       Documents
       Kanban   ← IMPORT later (owner building board separately)
       Profile  ← Batch 02c PARKED
  → [ View as Student ] → real student UI, read-only banner
```

\* Mentions = proposed @helper queue. **MISSING**  
\*\* All = Super / `student_workspace.read_all` only

**Today (honesty):** `/ops/students` registry **EXISTS**. One-student page **EXISTS** as stacked panels (`src/app/admin/students/[studentId]/page.tsx`), not the Hostinger tab shell yet. **ADAPT** layout later under `GO AHEAD SO-…`.

### 12.3 The one workspace API (EXISTS)

```text
/api/staff/students/[studentId]/workspace/[resource]
```

Staff only. `requirePremiumActor(studentId, "manage")`.  
`student_id` is forced from the actor. Students cannot POST here.

| `resource` | Table | What it is |
|---|---|---|
| `comments` | `workspace_comments` | Thread. `visibility` = `student_visible` or `staff_only` |
| `tasks` | `student_tasks` | Kanban cards (need `column_id`) |
| `alerts` | `student_alerts` | Important Alerts (max 3 active, short text) |
| `reviews` | `review_queue_items` | Review queue |
| `notes` | `counselor_notes` | Longer memos. Default `staff_only` |
| `requirements` | `student_document_requirements` | “Please upload X” |
| `universities` | `student_university_selections` | Shortlist → CMS `universities` |
| `documents` | `student_documents` | Document rows (review path; not a casual create) |
| `profile` | `premium_workspace_profiles` | Dashboard metrics / pathway / checklists (PATCH only) |

**This `profile` resource is the Premium dashboard summary. It is not the student’s Facebook identity.** Identity is `profiles`. Do not merge them.

University stages the API already allows:

`selected` · `shortlisted` · `application_started` · `applied` · `offer_received` · `finalized` · `declined`

Alert severities: `info` · `important` · `urgent`.

### 12.4 Connection map (one truth)

```text
CMS universities master
        │
        ▼
Student Ops shortlist ──► student_university_selections
Student Ops dashboard ──► premium_workspace_profiles
Student Ops docs      ──► Phase 4D student_documents
Student Ops comments  ──► workspace_comments
Student Ops notes     ──► counselor_notes
Student Ops reviews   ──► review_queue_items
Student Ops alerts    ──► student_alerts
Student Ops board     ──► student_board_columns / student_tasks
        │
        ▼
Student Premium dashboard / feed / upload_your_doc / progress
        (SAME rows)
```

### 12.5 Comments (hard locks)

1. **One table:** `workspace_comments`. Threads use `parent_id`.
2. **`student_visible`** = Reply. The student may see it. Notify them when wired.
3. **`staff_only`** = Private note. The student **never** sees it. Guardians default **no**.
4. Super Admin may open **any** student thread.
5. Mentor = assigned only, until an @helper grant exists.
6. **No second comments system** for the feed.

**EXISTS:** table, visibility, staff write path, notify-on-visible-comment trigger (as planned/wired in V3).  
**PARTIAL:** student-facing comments UI may still be fixture. Staff compose is not yet Chatwoot Reply / Private tabs.  
**MISSING:** @mention helpers, Mentions inbox.

**Proposed (needs owner + migrate, do not invent):**

- mention rows or `workspace_comment_participants`
- a helper is a **participant on that student only**, not a second mentor assignment and not org-wide access

Owner also asked: are private chat notes only `workspace_comments.staff_only`, or are long memos `counselor_notes`?  
**Recommend in the plan:** chat private = comments; long memos = counselor_notes. Not locked.

### 12.6 View as Student (EXISTS, env PARTIAL)

```text
Staff clicks View as Student
  → short-lived preview cookie  (POST /api/staff/preview)
  → REAL student Premium / feed routes
  → banner: staff preview, read-only
  → Exit → Student Ops  (POST /api/admin/preview/exit)
```

**REJECT:** ask for the student’s password · become the student · a fake staff-only copy of the dashboard · mutate while previewing.

### 12.7 Kanban / Loopboard

**One student = one board.**  
Student UI and staff UI are two **renderers**. Same `student_board_columns` + `student_tasks`.

Owner is building a board separately. Student Ops plan says **import when ready** (`GO AHEAD SO-K`).  
Do not redesign board complexity inside early SO gates.  
`StaffKanbanBoard` in V3 is a **placeholder** until that import.

A dedicated `docs/LOOPBOARD-KANBAN.md` is mentioned by the Progress Kanban and the backend skill. **The file is not in the repo today.** If you open Loopboard work, create/update that living map in the same gate — do not start a second board doc family.

### 12.8 Student Ops build gates (plan only)

```text
SO-0  Plan QC
SO-1  Home = assigned list · Mine / All
SO-2  Student shell: overview rail + Hostinger tabs
SO-3  Dashboard Data + university shortlist (CMS picker)
SO-4  Comments deep — Reply / Private · Super on any
SO-5  @mention helpers + Mentions (schema propose first)
SO-6  Review & Notes · Documents QC
SO-7  View as Student harden
SO-K  Kanban IMPORT (only when owner board is ready)
SO-8  Groups / folders on home (optional)
SO-9  Load shape / lazy tabs (perf)
```

Build only with `GO AHEAD SO-n`.

### 12.9 Student Ops owner decisions still open

1. Super’s home default: All or Mine?
2. @mention = notification only, or a real participant grant?
3. Private notes: comments vs counselor_notes split (see recommend above)
4. Tab set v1 confirmation
5. When to import Kanban relative to comments

---

## 13. Student Profile (Facebook-style hub) — PARKED

**Plan:** [`SITE-PLAN-02c-STUDENT-PROFILE.md`](./SITE-PLAN-02c-STUDENT-PROFILE.md)  
**Living map:** [`PGS-STUDENT-PROFILE.md`](./PGS-STUDENT-PROFILE.md)

### 13.1 ELI5

The student’s **face and facts** live in `profiles`.  
Feed card, Track Progress strip, Profile page, and Student Ops must all read that **same row**.

This is **not** `premium_workspace_profiles` (that is dashboard meters / pathway chips / HTML notes).

### 13.2 Owner product locks (captured)

1. Feels like Facebook / Instagram (pic + identity facts), not only a staff form.
2. **UI not built yet** — after backend + agreed field list.
3. Then sync to feed identity card + Track Your Progress.
4. At signup / completion: everything editable.
5. Once **stream** and/or **target year** lock: student cannot change; **only Admin** can (exact who = still a decision).

### 13.3 Fields that exist today on `profiles`

From live student loaders (`src/lib/student-data.ts` + registry/CRM):

| Field | Student may edit today? | Notes |
|---|---|---|
| `id` | Never | Same as Auth user id |
| `pgs_code` | Never | Server-assigned PGS id (registry uses it; not on the small StudentProfile type) |
| `full_name` | Yes | |
| `dial_code`, `phone`, `whatsapp` | Yes | |
| `citizenship_country` | Yes | |
| `preferred_study_country` | Yes | **Single** text today. Multi-country = owner decision |
| `study_level` | Yes | |
| `crm_stream` | Yes (no lock yet) | Will lock later |
| `crm_target_year` | Yes (no lock yet) | Will lock later |
| `field_interest` | Yes | Maybe reuse as “goal” — owner decision |
| `work_experience` | Yes | |
| `referral_code` | Signup-ish | Maybe freeze later |
| `avatar_path` | Yes via `/api/student/avatar` | Private bucket `student-avatars`, signed read, type/size/magic bytes EXIST |
| `profile_completed_at` | Server | |
| Email | Read-only | Comes from Auth |
| Premium badge | Never | Comes from `premium_entitlements` |

**GAPS / decisions:** `@handle`, goal/headline, one vs many countries, lock trigger, who may override.

### 13.4 APIs that exist

- `PUT` (or student update) `/api/student/profile` — own row only
- `POST /api/student/avatar` — own avatar
- Ops CRM panel can edit stream/year **operationally** — that is **not** the lock engine and **not** the Facebook hub

### 13.5 Phase order (do not skip)

```text
SP-0  Owner locks field list + lock trigger
SP-1  Backend validation + lock + staff override + audit
SP-2  Profile page UI (Figma / visual plan first)
SP-3  Sync feed card · track progress · Ops
```

**REJECT:** build the hub UI now · second profile table · restyle the locked feed identity card to “look more Facebook” · let the student API change locked stream/year just because the UI hid the field.

---

## 14. Documents — Phase 4D (the locked filing cabinet)

**Architecture:** [`pgs-v3-architecture/08-document-domain-and-security-lifecycle.md`](./pgs-v3-architecture/08-document-domain-and-security-lifecycle.md)  
**Storage:** [`pgs-v3-architecture/09-storage-and-upload-architecture.md`](./pgs-v3-architecture/09-storage-and-upload-architecture.md)  
**Go-live blocker:** [`pgs-v3-implementation/phase4d-pre-go-live-blocker.md`](./pgs-v3-implementation/phase4d-pre-go-live-blocker.md)

### 14.1 ELI5

Student files are **not** “a file sitting in `public/`.”

They live in a **private locker**.  
PGS asks for a document (requirement) → student uploads bytes into quarantine → a scanner must say **clean** → only then may anyone preview or download.

**Workflow** (mentor says “approved”) is a different stamp from **security** (scanner says “clean”).  
A mentor hearting a file does not make a virus safe.

### 14.2 Four lifecycles (do not smash into one status)

| Lifecycle | Lives on | States (target contract) |
|---|---|---|
| Upload session | the in-progress upload | `initiated → uploading → uploaded → finalized` (or `failed` / `expired`) |
| File security | the **version** | `uploaded → scanning → clean` or `infected` / `rejected` / `scan_failed` |
| Business workflow | the **logical document** | `submitted → in_review → needs_changes` or `approved` / `rejected` / `archived` |
| Requirement fulfillment | `student_document_requirements` | `open` / `satisfied` / `waived` / `cancelled` |

### 14.3 Clean gate (non-negotiable)

No ordinary preview, download, or signed URL unless the version security state is **`clean`**.

Enforce on the server and in Storage/RLS where practical.  
Frontend hiding a button is not security.

### 14.4 APIs that exist

| Route | Job |
|---|---|
| `/api/premium/documents` | List / create document records |
| `/api/premium/documents/upload-session` | Start authorized upload |
| `/api/premium/documents/finalize` | Finalize after bytes are in |
| `/api/premium/documents/[id]` | Metadata / authorized access |
| `/api/premium/documents/[id]/shares` | Explicit shares |
| Staff workspace `documents` | Staff review path |

CMS `/api/admin/media` is a **different locker** (marketing assets). Never store student passports there.

### 14.5 Production honesty

Application + DB Phase 4D may exist in Preview while uploads stay fail-closed at `scan_status = 'pending'`.  
That is **not** “Phase 4D certified.”

Before production: real ClamAV worker, EICAR blocked, benign file → `clean`, outage never yields `clean`.  
See the pre-go-live blocker doc.

### 14.6 Target vs current table names

Architecture wants a split:

- `student_document_records` (stable business identity)
- `student_document_versions` (immutable bytes metadata) — migrate/rename from today’s `student_documents` after cutover
- `student_document_reviews`, `student_document_previews`, `student_document_shares`

Live code and the workspace API still talk to **`student_documents`**.  
When you touch this domain, map first. Do not create a parallel document product.

Comments about a file attach through `workspace_comments.document_id` — still the **same** comments table.

---

## 15. CMS and catalog (Batch 02)

**Plan:** [`SITE-PLAN-02-CMS.md`](./SITE-PLAN-02-CMS.md) — **DRAFT** (owner mental model locked; not all owner checklist boxes ticked)  
**Living map:** [`PGS-CMS.md`](./PGS-CMS.md)  
**Field authority today:** `src/lib/admin-registry.ts`

### 15.1 ELI5

CMS is the **supply closet** for public content.  
Staff add an event, a university, a testimonial, a page sentence.  
The public site only shows rows that are **published**. Unpublished = pretend it does not exist (fail closed).

CMS is **not** a page builder.  
Figma/code owns layout. CMS owns **typed slots** (this heading, that image, that booking URL).

**Picks rails do not invent new courses.** They point at **existing published** catalog rows.

### 15.2 Mental model (owner picture)

```text
CMS
 ├── Events master     (+ booking_url for Zoho)
 ├── Courses master
 ├── Programs / Universities
 ├── Popups            (later — Batch 03)
 ├── Testimonials
 ├── PGS picks / Top picks   (membership of existing rows)
 ├── Page writing      (countries, USMLE, … typed slots)
 ├── Media             (pics / videos)
 ├── Tags
 └── Blogs / articles  (light EXISTS; deepen only if named)
```

### 15.3 Catalog entities (EXISTS — registry)

| Key | Table | Notes |
|---|---|---|
| `countries` | `countries` | Lookup. Editorial country **pages** stay on CMS page slots. Adding a country row does **not** create a public URL. |
| `universities` | `universities` | Master list. Student shortlists are `student_university_selections`. |
| `programs` | `programs` | `featured` = Most Wanted style |
| `course_categories` | `course_categories` | |
| `courses` | `courses` | `featured` = Top pick style |
| `event_categories` | `event_categories` | |
| `events` | `events` | `booking_url` = Zoho / webinar **EXISTS** |
| `facilitators` | `event_facilitators` | |
| `tags` | `catalog_tags` | One vocabulary |
| `facets` / `filter_options` | filter tables | Extensible filters |

Country add → live page is a **parked** backend pass (gates C1–C4 in the backend skill). Do not copy the UK page as a template unless the owner says so. Unpublished / unknown slug = 404.

### 15.4 Content modules (EXISTS — registry)

Examples: `articles`, `faqs`, `testimonials`, `weekly_wall`, `key_dates`, `deadlines`, `facts`, `stats`, `people`, `finance_partner_logos`, `notices`, `legal`, `social`, `meeting_slots` (`university_meeting_slots.booking_url` EXISTS), `premium_settings`, …

**PARTIAL:** admin CRUD often exists; some public pages still read static fixtures. CMS-3 is the “public reads DB” gate.

### 15.5 Page writing (EXISTS)

`/admin/content/pages/[slug]` → `cms_pages` + revisions + Next.js **Draft Mode** preview.  
`cms.publish` to go live. Preview cookie is not a public bypass.

### 15.6 Permissions

| Keys | What they guard |
|---|---|
| `catalog.*` | Events, courses, programs, unis, tags |
| `cms.*` | Typed page slots |
| `content.*` | Testimonials, FAQs, meeting slots, articles, … |
| `media.*` | Marketing library |

Mentor typically has **no** catalog manage.

### 15.7 Honesty (CMS)

| Want | Status |
|---|---|
| Events/courses list, draft/publish | **EXISTS** |
| Archive as its own state | **PARTIAL** — today often just `published: false` |
| Tags | **EXISTS** |
| Admin calendar of events | **MISSING** |
| `detail_template` + `face_layout` on the row | **MISSING** DB/UI (see [`CATALOG-B-STAR.md`](./CATALOG-B-STAR.md)) |
| Zoho `booking_url` on events/slots | **EXISTS** |
| Media library | **EXISTS** |
| Testimonials admin | **EXISTS**; public wire **PARTIAL** |
| PGS picks rails as real membership + admin UI | **PARTIAL** / **MISSING** certified column |
| Popup CMS module | **MISSING** |
| Page builder | **REJECT** |
| Install Payload / embed Payload admin | **REJECT** |
| Junior Canva editors as forever CMS | **REJECT** |

### 15.8 CMS gates

```text
CMS-0  Plan QC / owner decisions
CMS-1  Events + Courses master list UX
CMS-2  Media attach/replace QC
CMS-3  Testimonials (+ FAQ) public wire
CMS-4  Picks rails
CMS-5  Calendar (only if owner says P0)
CMS-6  Page slots deepen
CMS-7  Tags / sort / archive polish
FACE   detail_template + face_layout (coordinate CATALOG-B-STAR)
CMS-P  Popups
CMS-B  Blogs — only if named
```

### 15.9 CMS owner decisions still open

1. Is `published: false` enough for archive, or do we need `archived`?
2. Picks: one multi-select UI or separate screens?
3. Popups now or after catalog master + picks?
4. Calendar P0 or later?

---

## 16. Popups and Zoho links (Batch 03) — LOCKED PLAN

**Plan:** [`SITE-PLAN-03-POPUPS.md`](./SITE-PLAN-03-POPUPS.md)  
**Living map:** [`PGS-POPUPS.md`](./PGS-POPUPS.md)

### 16.1 ELI5

Zoho (or Google Meet) stays **outside** PGS.  
Staff paste an `https://` URL into CMS. A public button or popup CTA opens that URL.  
PGS does **not** become a webinar registration database unless the owner later asks.

Framer-style layout CMS = **REJECT**.

### 16.2 Four click patterns

| Pattern | What happens | Status |
|---|---|---|
| **A** Button → Zoho | Button `href` is the CMS URL | Use where no modal is needed |
| **B** Button → PGS popup → Zoho | SoftLock / marketing popup; CTA inside is the Zoho URL | Popup CMS **MISSING**; many buttons are `data-popup-deferred` |
| **C** Event / UnivMeet card → Zoho | `events.booking_url` or `university_meeting_slots.booking_url` | **EXISTS** |
| **D** Zoho API sync | OAuth / webhooks / registrants | Track C later. Do not mix into paste-URL work |

### 16.3 Connection map

```text
Staff CMS
  → sanitize https (reject javascript:)
  → store on events / meeting_slots / future popup row
  → publish
  → public FE reads published URL only
  → <a href rel="noopener"> or popup CTA
  → Zoho hosts register/join
```

### 16.4 Popup gates

```text
POP-0  Plan QC + Figma when ready
POP-1  Inventory data-popup-deferred + SoftLock triggers
POP-2  CMS popup module (copy, CTA URL, trigger key, publish)
POP-3  SoftLock runtime + wire 1–2 triggers
POP-4  Remaining deferred CTAs
POP-5  booking_url QC (already EXISTS)
POP-Z  Zoho OAuth (optional, later)
```

**One popup system.** ADAPT SoftLock / BumpPremium. Do not install a second popup SaaS.

Owner still must pick: new-tab default, which popup types first, Figma before POP-2/3, whether Pattern A is required on some buttons.

---

## 17. Operations home — scoreboard, search, Ask PGS

**Inventory:** [`SITE-PLAN-ADMIN-INVENTORY.md`](./SITE-PLAN-ADMIN-INVENTORY.md)  
**Wiring teach:** [`SITE-PLAN-REFERENCES-AND-WIRING.md`](./SITE-PLAN-REFERENCES-AND-WIRING.md)

### 17.1 ELI5

`/ops` is the **staff cockpit**: how is PGS doing, and where do I jump?

It already **EXISTS**: KPI scoreboard, header search, Ask PGS panel, links to students / team / activity.

### 17.2 How it is wired (EXISTS)

```text
/login?surface=operations
  → POST /api/auth/login → Auth cookie

/ops
  → must be staff (getStaffContext)
  → loadOperationsScoreboard()
       → RPC staff_operations_scoreboard
       → + activity / roster slices
  → permission overview.read
  → Mentor sees assigned implications, not an org dump

Header search
  → GET /api/staff/search?q=…
  → students | courses | events | programs | universities
    | pages | staff | work
  → each adapter respects RLS + permissions

Ask PGS
  → POST /api/ai/ops
  → 503 / empty if AI env is not configured
  → facts must stay permission-shaped
  → do not expand AI until core data is fast and stable (RB-15 is locked later)
```

### 17.3 Scoreboard rules

Metrics must be **real**, permission-shaped, and traceable.  
**No fake** percentage changes, trend arrows, sparklines, or org totals without a contract.

Mentor scoreboard idea: WHAT HAPPENED · WHAT IS PENDING · WHY · NEXT ACTION.  
Do not fabricate those until the data contract exists.

### 17.4 Lag (honesty, not a rewrite)

Ops can feel slow. Existing audit says **measure first**.

Likely piles: scoreboard home (many fetches), search adapters per keystroke, Ask PGS on top, Student Ops over-fetch, CMS lists without tight pagination.

Owner lock:

```text
1. Finish knowing WHAT (this handover / site-plan series)
2. LAG-BASELINE gate: measure /ops cold+warm
3. ONE fix gate (e.g. scoreboard query only)
```

Do **not** “rebuild Ops like Twenty” to chase speed.

Legacy Hostinger “Premium applications” widgets = **REJECT** as live truth. Use grant/revoke + entitlement events.

---

## 18. Guardian / Student Viewer

**Architecture:** [`pgs-v3-architecture/06-student-viewer-relationship-model.md`](./pgs-v3-architecture/06-student-viewer-relationship-model.md)  
**Migration evidence:** `supabase/migrations/20260818074055_guardian_portal_v1.sql` and Phase 4C viewer migrations.

### 18.1 ELI5

A parent is handed a **small window** into one child.  
The window only shows tiles someone explicitly switched on.  
For files, each file needs its own share. Broad “documents” never means the whole cabinet.

### 18.2 Authorization invariant

```text
Viewer allow =
    auth.uid() = relationship.viewer_user_id
AND relationship.student_id = the student you asked for
AND relationship.status = active
AND not expired
AND an active grant exists for that data class
AND (for files) an active share on that record
AND the version is clean
```

Invite tokens are hashed. Raw tokens are never stored.

### 18.3 Allowlisted grant keys (target)

- `progress.read`
- `milestones.read`
- `academic_status.read`
- `shareable_comments.read`
- `shared_documents.read`

No `can_view_everything`. No JSON blob of permissions.

Many Viewer **policy** questions are still owner decisions (O-06 … O-12): who invites, default grants, expiry, whether Premium revoke kills old shares, etc. Safe default until answered: **deny extra access**.

---

## 19. Leads, notifications, audit, integrations

### 19.1 Leads (EXISTS, deepen later)

Public forms (enquiry, study journey, deadline subscribe) land in lead / intake tables.  
Staff triage at `/admin/leads`.  
Architecture wants a canonical `leads` row plus immutable source payloads. Do not auto-merge duplicates until the owner defines rules (O-16).

Zoho lead sync is **PARTIAL** / Track C.

### 19.2 Notifications (EXISTS as inbox projection)

- Student: `/api/student/notifications`
- Staff: `/api/staff/notifications/[id]`

Long-term: **one recipient-aware domain** (student and staff).  
Do not build a second bell.

Which events notify whom (email/SMS) = owner decision O-19. Safe default: in-app only.

### 19.3 Audit (EXISTS / consolidating)

Privileged actions write `audit_events`.  
Older `admin_audit_logs` / `premium_audit_logs` were the consolidation base.  
`premium_entitlement_events` stays the **Premium business ledger**, not a disposable duplicate.

Need `audit.read` to see the staff activity surface.

### 19.4 Integrations outbox

`private.integration_outbox` is the worker queue for provider calls (calendar, payments, email).  
Do not call Zoho/Stripe **inside** the same transaction that writes the domain row if the architecture says to emit-then-deliver. Payments, when opened, update **`premium_entitlements`** from a **server-side webhook**. Test mode first.

---

## 20. Staff + student API map (what you will actually hit)

### 20.1 Auth

| Route | Who |
|---|---|
| `POST /api/auth/login` | Student or staff (same pool) |
| `POST /api/auth/logout` | Sign out then fresh navigation |
| `POST /api/auth/register` | Student signup |
| `POST /api/auth/forgot-password` · `reset-password` · `change-password` | Auth recovery |

Google OAuth is deployment-gated until configured. Disabled state = normal login UI, no raw provider JSON.

### 20.2 Student

| Route | Truth |
|---|---|
| `/api/student/profile` | `profiles` own row |
| `/api/student/avatar` | `student-avatars` |
| `/api/student/saved/[kind]/[id]` | `saved_programs` / `saved_courses` |
| `/api/student/notifications` | inbox |
| `/api/premium/comments` | `workspace_comments` as the student |
| `/api/premium/documents*` | Phase 4D |
| `/api/ai/student` | student AI — permission/data rules still apply |

### 20.3 Staff (also listed in the Admin inventory)

See §8, §9, §10, §12, §15, §17.  
Pattern is always: UI → `/api/staff/*` or `/api/admin/*` → permission again → RPC or table under RLS → audit/notifications when wired.

---

## 21. How a write must be done (day-1 security)

Copy this onto every backend gate.

| Risk | What you do in the same gate |
|---|---|
| Cross-student write | Scope by URL / actor `student_id`. Ignore a body `student_id` if it disagrees. |
| Client forge | Server sets author, visibility defaults, reserved `document_type`, timestamps, Premium source, etc. |
| IDOR oracle | Same error for missing and out-of-scope |
| Unpublished leak | Public reads `published = true` only |
| Dirty file | No signed URL unless `clean` |
| Probe noise | Audit deny with a stable `reason_code` when it matters |
| Last line of defense | Unique / FK constraints in Postgres |

Then list **known gaps** you did *not* do (rate limit, full RBAC rename, ClamAV, …).

---

## 22. What is built vs what is paper

This is the honesty map a new hire needs on week one.

### 22.1 Already a real spine (EXISTS)

- Supabase Auth + student `profiles` + staff RBAC tables + `getStaffContext`
- Premium entitlements + grant/revoke API
- Mentor assignments + assign API
- Student workspace API for comments, tasks, alerts, notes, reviews, requirements, universities, dashboard profile, documents
- Phase 4D upload/finalize/share **application** path (scan certification still a prod blocker)
- Ops scoreboard, staff search, Ask PGS (env-dependent), People & Access, registry
- View as Student (env PARTIAL)
- CMS catalog + content + media + Draft Mode
- Event / meeting-slot `booking_url`
- Progress Family A/B doorman + B1 alerts
- Guardian / Viewer migrations present (product depth still policy-heavy)
- `audit_events`, notifications, leads triage

### 22.2 Planned, owner-locked as *ideas*, not builds

| Batch | Status | Build phrase |
|---|---|---|
| 01 Admin roles | DRAFT plan | after owner READY 01 + named gate |
| Admin inventory | DRAFT QC bible | `GO AHEAD` Admin gate |
| 02 CMS | DRAFT plan | `GO AHEAD CMS-n` |
| 02b Student Ops | **LOCKED PLAN** | `GO AHEAD SO-n` |
| 02c Profile | **PARKED** | `GO AHEAD SP-n` after SP-0 |
| 03 Popups | **LOCKED PLAN** | `GO AHEAD POP-n` + Figma |
| 04 Operations deepen | **Not started** as its own MD — may fold into Admin + 02b | |
| 05 Security spine | **Not started** as its own MD | |
| Track C payments / Zoho API | DEFERRED | `GO AHEAD popups\|zoho\|payments` |
| Add Country → live page | Parked C1–C4 | `GO AHEAD Cn` |
| Loopboard import | Parked SO-K / B6 | owner board first |
| Feed concentrated host | DEFERRED | |

### 22.3 Documents that are named but missing as files

| Named in skills / Kanban | Reality |
|---|---|
| `docs/BACKEND-10-10-PLAN.md` | **Not in the repo.** Rungs 0–8 live in `.cursor/skills/pgs-master-workflow/SKILL.md` instead. |
| `docs/LOOPBOARD-KANBAN.md` | **Not in the repo.** Progress Kanban points at it. Create it when Loopboard work opens. |
| `docs/SITE-PLAN-04-OPERATIONS.md` | Never written |
| `docs/SITE-PLAN-05-SECURITY.md` | Never written |

Do not invent those plans mid-feature. If you need them, propose the doc first.

---

## 23. The 10/10 backend rungs (Track B)

From the master workflow. Open **only** with `GO AHEAD rung N`.

| Rung | Target |
|---|---|
| 0 | Honesty map (docs / invite / fixtures) |
| 1 | Docs Phase 4D live-certified **or** honest v1 scope |
| 2 | People & Access + invite email |
| 3 | Ops student page lag |
| 4 | Mentor daily loop (assigned-only) |
| 5 | Search + notifications |
| 6 | Fixture / e2e trust (skipped ≠ passed) |
| 7 | Scoreboard polish (no fake metrics) |
| 8 | Calendar / guardian — after core |

Typical shape the owner likes (Loopboard lesson):

```text
UI QC pass
  → flowchart
  → GO AHEAD W1 (empty contract / slot only)
  → day-1 security + living MD
  → live click QC
  → GO AHEAD W2 (bytes / bind)
  → …
  → pull live student last
```

Empty slot → write bytes → bind → consumer face → pull live.  
Never “finish the whole pipeline because we’ll need it.”

CMS junior visual editors: **leave alone** unless the owner reopens them by name. Do not rebuild CMS to chase Ops 10/10.

---

## 24. Locked engineering stack

| Layer | Choice | Do not |
|---|---|---|
| App | Next.js App Router, React, TypeScript, Vercel | A toy Express app “to learn” |
| DB / Auth / files | Supabase Postgres, Auth, Storage, RLS, RPCs | Ad-hoc tables only in the SQL editor |
| Staff UI | shadcn, Lucide, TanStack Table, Recharts, RHF + Zod | Dump Twenty / Payload / Chatwoot into the repo |
| Student / public UI | Owner Figma + retained/owned CSS | Restyle from HubSpot / Linear |
| Kanban UI | dnd-kit **after** import | A second board library |
| CMS preview | Next.js Draft Mode | Preview cookie as public bypass |
| Rich text | Lexical **only** where a named field needs it | Page-builder HTML |
| Live updates | Supabase Realtime only when it truly helps | Realtime for decoration |
| Tests | Playwright, Vitest, RLS/security suites | Green tests = product approved (owner still QCs) |
| Observability | Sentry / OTel later | Using Sentry as `audit_events` |

Schema changes: **`supabase/migrations`** + owner GO AHEAD for prod-connected work.  
Owner may **SELECT** in the SQL editor. Agents own migration files.

Historical architecture said “migrations 001–009 are frozen; next is 010+.” The repo then grew **timestamped** migrations (`20260814…`, `20260815…`, Phase 4D, guardian, …). **Add a new timestamped migration.** Do not rewrite old ones.

---

## 25. Reference Bank (lowest authority)

Full catalog: `.cursor/rules/pgs-v3-reference-bank.mdc`

You may **study** only the named row for that job. You may not pick a random GitHub star.

| ID | When you are working on | Study feel | Study repo | Build on |
|---|---|---|---|---|
| RB-01 | Registry, filters, lists | HubSpot CRM | `twentyhq/twenty` | shadcn + TanStack Table |
| RB-02 | Roles, invite, RLS | GitHub Orgs | `supabase/supabase` | existing `staff_*` |
| RB-03 | Scoreboard | HubSpot Reporting | PostHog | real metrics only |
| RB-04 | Inboxes | Linear Inbox | Chatwoot | `notifications` |
| RB-05 | Comments | Intercom | Chatwoot | `workspace_comments` |
| RB-06 | Loopboard | Linear | Plane | existing board tables + dnd-kit later |
| RB-07 | Review / attention | Linear | Plane | `review_queue_items`, targets |
| RB-08 | Doc review UX | Google Drive | paperless-ngx | **Phase 4D stays storage boss** |
| RB-09 / 10 | CMS | Contentful | Payload | existing `/admin/catalog` — **never install Payload** |
| RB-11 | Named rich fields | Contentful | Payload/Lexical | never a page builder |
| RB-12 | Later analytics | PostHog | PostHog | only with real event truth |
| RB-13 | Lag / errors | Sentry | Sentry | not product audit |
| RB-14 | Guardian UX | Canvas-like | study only | Viewer contracts |
| RB-15 | AI analyst | locked | locked | **do not pick an AI stack** |

If no row fits: write `REFERENCE BANK GAP — <problem>` and stop. Do not substitute.

**OSS = inspect.** Do not paste their codebase. AGPL/GPL = pattern study only unless the owner says otherwise.

Authority order:

```text
Owner decision
  → PGS Flow / Figma
  → existing PGS V3 architecture
  → legacy developer evidence (business intent)
  → Reference Bank (lowest)
```

---

## 26. How you start a backend job (checklist)

1. Read this handover § for that domain.
2. Open the living map (Admin / CMS / Student Ops / Popups / Progress Kanban).
3. Draw FE → API → permission → parent → child.
4. Check the table already exists. If you want a new table, you need owner GO AHEAD and a reason the old one cannot be the truth.
5. Propose: WHAT · PLAN · BEFORE→AFTER · FILES · ELI5 · NOT IN THIS CHANGE · DAY-1 SECURITY · KNOWN GAPS · PREVIEW vs LIVE.
6. Wait for `GO AHEAD` / `GO AHEAD Wn` / `GO AHEAD SO-n` / `CMS-n` / `POP-n` / `SP-n` / `rung N`.
7. Implement one gate. Targeted diff. No drive-by refactors.
8. Tests: happy path + out-of-scope / forge if you added a write.
9. Gate stack when the job is real:

   | Gate | Command |
   |---|---|
   | Syntax | `pnpm typecheck` · `pnpm lint` · `pnpm build` · `pnpm test` |
   | Security | `pnpm test:rls` · `pnpm test:security` |
   | Use | `pnpm test:e2e` / smoke + owner click |
   | Review | CodeRabbit when the owner asks |

   **Skipped ≠ passed.** Write the skips down.
10. Update the living MD with WHAT · WHY · HOW · FILES · LIVE SAFETY · HOW YOU QC.
11. Stop. Owner clicks. Next gate only when they say so.

Frontend CSS / Figma bodies are a **different track**. Do not “quickly wire Ops” during a country-page visual gate.

---

## 27. Open owner decisions (complete list from planning)

Do not silently answer these.

### Roles (Batch 01)

D1 Admin vs Super CMS/publish/face · D2 read-only breadth · D3 mentor hard stops · D4 dual student+staff Auth · D5 meaning of “unlock” · D6 feed host deferred

### CMS (Batch 02)

Archive flag vs unpublish · picks UI shape · popups timing · calendar P0

### Student Ops (02b)

Home default All vs Mine · @mention notify vs participant · private note table split · tab set v1 · Kanban import timing

### Profile (02c)

Lock trigger · @handle · one vs multi country · goal field · who overrides locked stream/year · Ops Profile tab vs rail

### Popups (03)

New-tab CTA · which popup types first · Figma before build · deep Zoho API parked? · which buttons stay Pattern A

### Progress B2

Gauge art A/B/C · status in label · seed lab requirements

### Architecture O-01 … O-26 (policy)

Documents: scanner disposition, file types/size, retention/purge, workflow actors, comment edit/delete.  
Viewer: invite who, consent, default grants, expiry, download vs view, Premium-revoke effect, shareable fields.  
Roles: `read_only_staff` rename window, mentor upload/review rights, who gets `staff.manage`.  
Leads merge rules.  
KPI definitions. Search-log retention. Notification channels. AI may **not** eat private notes/docs until O-20.  
CMS rich-text fields. Dormant legacy content.  
Invite email / Resend = **production launch blocker**.

Full write-up: [`pgs-v3-architecture/17-owner-decisions-required.md`](./pgs-v3-architecture/17-owner-decisions-required.md).

Until answered, use the **safe default in that doc** (usually deny / do not migrate / do not claim a KPI).

---

## 28. Never-do list (print this)

1. Invent a second identity, Ops, CMS, comments, board, Premium, or document system.
2. Trust the client for role, `student_id`, Premium flag, or file path.
3. Fetch-all-then-hide in React.
4. Return different errors for missing vs forbidden.
5. Issue a signed URL for a non-`clean` document.
6. Ask for a student’s password to “view as them.”
7. Let a student see `staff_only` comments or counselor private notes.
8. Put unpublished catalog/CMS rows on the public site or on a picks rail.
9. Install Payload, Twenty, Chatwoot, Plane, or a page builder.
10. Create product tables only in the Supabase UI.
11. Start W2 while finishing W1. Start SO-5 during SO-4. “While we’re here.”
12. Fake scoreboard metrics or AI facts the staff cannot drill.
13. Wire Family A (anon/standard progress) to the database without a new owner lock.
14. Implement B3 review-queue on Track Progress (owner: wrong wiring).
15. Build Profile hub UI before SP-0/SP-1.
16. Redesign locked student chrome because the backend changed.
17. Treat Hostinger PHP, plaintext passwords, or public upload paths as something to port.
18. Call tests green “product verified.” Owner Preview QC still required.
19. Commit `.env`, SQL dumps, student files, or credentials.
20. Work directly on `main`. Feature branch + draft PR.

---

## 29. Files that matter (first week)

| Role | Path |
|---|---|
| This handover | `docs/BACKEND-HANDOVER.md` |
| Series index | `docs/SITE-BACKEND-PLAN.md` |
| How we work | `.cursor/skills/pgs-master-workflow/SKILL.md` |
| Backend gate ritual | `.cursor/skills/pgs-backend-phase-wire/SKILL.md` |
| Propose → GO AHEAD | `.cursor/skills/pgs-propose-before-code/SKILL.md` |
| Never invent | `.cursor/skills/pgs-never-invent/SKILL.md` |
| Domain contracts | `.cursor/rules/pgs-v3-domain-contracts.mdc` |
| Staff context | `src/lib/staff-auth.ts` |
| Student three states | `src/lib/student-experience.ts` |
| Premium validity | `src/lib/premium-entitlement.ts` |
| Workspace API | `src/app/api/staff/students/[studentId]/workspace/[resource]/route.ts` |
| CMS field list | `src/lib/admin-registry.ts` |
| Progress doorman | `src/app/feed_track_progress/page.tsx` |
| Progress living map | `docs/FEED-TRACK-PROGRESS-KANBAN.md` |
| Migrations | `supabase/migrations/` |

Deeper architecture (frozen Phase 2 contract, still the security/data north star):

`docs/pgs-v3-architecture/00-architecture-overview.md` through `17-owner-decisions-required.md`

Especially: `02` data model · `04` RBAC · `05` RLS matrix · `06` Viewer · `07` Student 360 · `08` documents · `10` CMS · `11` mini-CRM · `12` scoreboard/search.

Owner business overrides vs legacy: [`owner-business-rules.md`](./owner-business-rules.md).

---

## 30. Glossary (plain words)

| Word | Means |
|---|---|
| **Auth user** | The login row. Not a role. |
| **Actor / context** | The hat this *request* is wearing (student self, staff, viewer). |
| **Permission key** | One named operation, e.g. `catalog.publish`. |
| **Scope** | Whose rows: self / assigned / org / explicit share. |
| **Entitlement** | Time-bounded Premium key on a student. |
| **RLS** | Postgres row-level security. Second lock after the API. |
| **RPC** | A Postgres function the API calls (scoreboard, grant Premium, …). |
| **Fail closed** | If unsure or unpublished/unclean, show nothing / deny. |
| **IDOR** | Guessing another id to steal data. We return the same deny. |
| **Fixture** | Hardcoded demo content. Not the database. |
| **Living map** | The MD you update after each gate so QC has a trail. |
| **GO AHEAD** | Owner’s explicit build permission for one named slice. |
| **SoftLock** | Existing PGS popup/lock pattern to ADAPT — not a new popup product. |
| **DSIH** | `dangerouslySetInnerHTML` — how some public chrome is still mounted. Frontend, not your first backend job. |
| **Family A / B** | Progress: fixtures vs Premium-wired. |
| **Student 360** | Staff aggregate *view* of one student. Not a table. |
| **Clean** | Scanner said this file version is safe to preview/download. |

---

## 31. If you get lost

Ask with this shape:

```text
SOURCE:   which doc / table / screen I looked at
ISSUE:    what is unclear (student vs staff, which table, which gate)
OPTIONS:  the two smallest interpretations I see
ASK:      which one should I use?
```

Do not pick one and hope.

Welcome to PGS. Map first. One gate. Same truth. Fail closed. No inventions.
