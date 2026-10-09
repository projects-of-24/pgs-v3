# Ops post-login UI — desktop-first passes (living)

Owner lock **2026-10-01** (revised same day: **chrome first**).  
Studio login: [`OPS-STUDIO-LOGIN-LOCK.md`](./OPS-STUDIO-LOGIN-LOCK.md).  
**Header chrome LOCKED:** [`OPS-HEADER-LOCK.md`](./OPS-HEADER-LOCK.md).  
**Sidetab chrome LOCKED:** [`OPS-SIDETAB-LOCK.md`](./OPS-SIDETAB-LOCK.md).  
**Sidetab scout (history):** [`OPS-SIDETAB-SCOUT.md`](./OPS-SIDETAB-SCOUT.md).  
**Design language / footer:** [`OPS-STAFF-DESIGN-LANGUAGE.md`](./OPS-STAFF-DESIGN-LANGUAGE.md).  
**Backend/API park lot:** [`OPS-BACKEND-UI-API-UPDATES.md`](./OPS-BACKEND-UI-API-UPDATES.md).  
**LOCKED pages checklist:** [`OPS-LOCKED-PAGES.md`](./OPS-LOCKED-PAGES.md).  
**Dashboard / Scoreboard LOCK:** [`OPS-DASHBOARD-LOCK.md`](./OPS-DASHBOARD-LOCK.md).  
**Logout LOCK:** [`OPS-STUDIO-LOGOUT-LOCK.md`](./OPS-STUDIO-LOGOUT-LOCK.md).

**Stack:** semantic HTML + **owned CSS**. Shell chrome LOCK before more body work.

**Backend:** step-by-step; existing staff/student data OK for test (owner flushes before live). Mutations only in named wire gates.

**Reference-first:** Tier A → Bank ID + scout (`pgs-reference-first-multi-agent`). CMS study = Payload (RB-09/10), not invented logic.

---

## Corrected sequence

```text
Studio login LOCKED
  → C0 design language (docs) + owner GO AHEAD
  → C1 header · C2 sidetab · C3 footer · C4 LOCK chrome
  → Body passes by context (Scoreboard · Profile · User Mgmt · Permissions · …)
  → CMS Payload gates when Ops chrome stable
```

---

## Chrome passes (do these next)

| Pass | Scope | NOT in pass |
|---|---|---|
| **C1** | Topbar: search · bell · name+role · avatar menu (owned CSS) | Body widgets |
| **C2** | Sidetab to **corrected** owner crop — live links where backend exists; **stub pages** where not; log stubs in MD | Header · deep UM/Permissions product · Payload invent |
| **C3** | Footer **none** + nested main scroll + section tabs allowed | Marketing footer; inventing tabs everywhere |
| **C4** | Desktop QC → mark chrome **LOCKED** | Tablet/mobile until owner asks |

---

## Body tracks (after chrome LOCK)

| Track | Context | Bank | Passes |
|---|---|---|---|
| **A** | Scoreboard `/ops` | RB-03 | **DASH1 LOCKED** — [`OPS-DASHBOARD-LOCK.md`](./OPS-DASHBOARD-LOCK.md) |
| **P** | My Profile | RB-02 | **LOCKED** — [`OPS-STAFF-PROFILE-LOCK.md`](./OPS-STAFF-PROFILE-LOCK.md) · P2 email/mobile later |
| **N** | Notifications `/ops/notifications` | RB-04 | **LOCKED** — [`OPS-NOTIFICATIONS-LOCK.md`](./OPS-NOTIFICATIONS-LOCK.md) |
| **ACT** | Activity `/ops/activity` | RB-02 / audit | **LOCKED** — [`OPS-ACTIVITY-LOCK.md`](./OPS-ACTIVITY-LOCK.md) |
| **STU** | Students `/ops/students` | RB-01 | **LOCKED** — [`OPS-STUDENT-REGISTRY-STU1.md`](./OPS-STUDENT-REGISTRY-STU1.md) |
| **B** | User Management | RB-01+02 | **LOCKED** — [`OPS-USER-MANAGEMENT-LOCK.md`](./OPS-USER-MANAGEMENT-LOCK.md) · UM3 overrides later |
| **R** | Roles & Permissions | RB-02 | R1 roles table · R2 permission tree · R3 wire |
| **CMS** | Creating/Editing | RB-09/10 | Deferred Soon until Payload/CMS gate |

---

## Expected output before each pass

WHAT · BEFORE → AFTER · files · BE sources · EXPECTED QC · NOT IN PASS → `GO AHEAD`

---

## Gate log

| Date | Pass | Status |
|---|---|---|
| 2026-10-01 | Studio login LOCK | **LOCKED** |
| 2026-10-01 | A1 Scoreboard KPI (body draft) | Engineering only — **not product LOCK**; re-QC after chrome |
| 2026-10-01 | **C0** design language defaults | **LOCKED** |
| 2026-10-01 | **C1** header chrome | **LOCKED** — [`OPS-HEADER-LOCK.md`](./OPS-HEADER-LOCK.md) · backend parked in [`OPS-BACKEND-UI-API-UPDATES.md`](./OPS-BACKEND-UI-API-UPDATES.md) |
| 2026-10-01 | Screenshot design language | **LOCKED** in `OPS-STAFF-DESIGN-LANGUAGE.md` + scout/propose skills |
| 2026-10-01 | C2 sidetab | **LOCKED** — [`OPS-SIDETAB-LOCK.md`](./OPS-SIDETAB-LOCK.md) |
| 2026-10-01 | Header first-name | Topbar shows first token only; full name stays in account menu |
| 2026-10-01 | QC actor | Primary = **Super Admin** fixture (+ avatar) — not Admin |
| 2026-10-01 | C3 footer / overflow | **LOCKED** — sidebar tint · 100px · stroke · 80% body · hidden scrollbar ([`OPS-FOOTER-OVERFLOW-LOCK.md`](./OPS-FOOTER-OVERFLOW-LOCK.md)) |
| 2026-10-01 | C3-scroll | **LOCKED** — motion smooth wheel + ◀ ▶ Motion drag dock · press/drag-only dropslide shadow |
| 2026-10-01 | C4 chrome QC | Next — desktop + a11y → full chrome LOCK |
| 2026-10-01 | C4 chrome QC | Next — desktop + a11y → full chrome LOCK |
| 2026-10-01 | Single domain + UM later | Ops+CMS+Student Ops one shell; User Mgmt → Track B / BE-B1 |
| 2026-10-01 | **P1a** Staff Profile page chrome | **DONE** — breadcrumb · title · subtitle · card shell; real fields only (no DOB/gender/geo invent) |
| 2026-10-01 | **P1b/P1c** QC fail fix | Circular avatar + camera · role/status pills · equal-width Display Name / Email |
| 2026-10-01 | **P1-photo** | Staff can change photo (camera or files) + display name; password removed from My Profile (header menu keeps Change Password) |
| 2026-10-01 | **P1-photo QC** | Take photo uses in-browser webcam dialog (`getUserMedia`), not file-manager `capture` |
| 2026-10-01 | **Staff Profile** | **LOCKED** — owner QC passed · [`OPS-STAFF-PROFILE-LOCK.md`](./OPS-STAFF-PROFILE-LOCK.md) |
| 2026-10-01 | **LO1** Ops logout | **LOCKED** — direct → `/studio/login` · [`OPS-STUDIO-LOGOUT-LOCK.md`](./OPS-STUDIO-LOGOUT-LOCK.md) |
| 2026-10-01 | Profile URL | **LOCKED** — owner QC passed · public **`/studio/profile`** (rewrite `/admin/profile`) · [`OPS-STAFF-PROFILE-LOCK.md`](./OPS-STAFF-PROFILE-LOCK.md) |
| 2026-10-01 | **N1** Notification page | Screenshot body · title **Notifications** · All/Unread/Read pills · search · pagination (10) · no checkboxes · no Recent sort · reuse `staff_notifications_list` + PATCH `/api/staff/notifications/[id]` |
| 2026-10-01 | **N1** Notifications | **LOCKED** — owner QC passed · [`OPS-NOTIFICATIONS-LOCK.md`](./OPS-NOTIFICATIONS-LOCK.md) |
| 2026-10-01 | **NAV1** Sidetab roles | Admin Panel/UM/Permissions = Super Admin only (hidden). Dashboard·Notifications·Activity enabled for all roles. Option **A**: grant `audit.read` to mentor + read_only_staff |
| 2026-10-01 | **NAV1** Sidetab roles | **LOCKED** — owner QC passed · **Activity check QC lock** · [`OPS-NAV1-ROLE-VISIBILITY-LOCK.md`](./OPS-NAV1-ROLE-VISIBILITY-LOCK.md) |
| 2026-10-01 | **ACT1** Activity page | Screenshot body · title **Activity** · KPI from loaded list · search/date/outcome client filters · domain via existing RPC · pagination (10) · no API change |
| 2026-10-01 | **ACT1** Activity | **LOCKED** — owner QC passed · [`OPS-ACTIVITY-LOCK.md`](./OPS-ACTIVITY-LOCK.md) · body type floor **≥15px** (header stays ≥18px) |
| 2026-10-01 | Body type floor | **LOCKED** — ≥15px on Activity · Notifications · Profile · Change Password · D9c in [`OPS-STAFF-DESIGN-LANGUAGE.md`](./OPS-STAFF-DESIGN-LANGUAGE.md) |
| 2026-10-01 | **A / Dashboard** prep | Baseline `/ops` captures for all staff roles → [`public/preview/ops-scoreboard-by-role/`](../public/preview/ops-scoreboard-by-role/README.md) — wait for owner target screenshots before UI |
| 2026-10-01 | **DASH1** Scoreboard + Analytics | Visual restyle of `/ops` first page to owner screenshots — real KPIs only · no fake % · floating ◀⠿▶ drag **kept** · refs in `public/preview/ops-scoreboard-by-role/owner-target-*` |
| 2026-10-01 | **DASH1** Dashboard | **LOCKED** (owner QC) — [`OPS-DASHBOARD-LOCK.md`](./OPS-DASHBOARD-LOCK.md) · no Current-state chip · Hostinger `section` padding killed on Ops body |
| 2026-10-02 | **DASH2** Analytics cards | **LOCKED** (owner QC) — white cards · pastel icon chips · soft rows · Catalog themes |
| 2026-10-02 | **TEAM1** People & Access | **LOCKED** (owner QC) — `/ops/team` · role badges · Manage · 10/page · no Open staff targets |
| 2026-10-02 | **INVITE1** Invite staff | **LOCKED** (owner QC) — icon chips · no Effective access summary · redirect `/ops/team` |
| 2026-10-02 | **CONFIRM1** Confirm invite | **LOCKED** (owner QC) — screenshot dialog · no Access after this change |
| 2026-10-02 | **MANAGE1** Manage staff | **LOCKED** (owner QC) — Details/History/Access tabs · same APIs as Team Manage |
| 2026-10-02 | **UM-M1** UM Manage link | **LOCKED** (owner QC) — Manage → `/ops/team/[id]?from=um` |
| 2026-10-02 | **UM2c** Edit Permissions trim | **LOCKED** (owner QC) — no Staff role / Suspend; footer Cancel + Save Menus only |
| 2026-10-02 | **TARGET1** Staff Targets | **LOCKED** (owner QC) — tabs · edit modal · Action = select + Update status · [`OPS-TARGETS-TARGET1.md`](./OPS-TARGETS-TARGET1.md) |
| 2026-10-02 | **UNI1** Universities CMS | **LOCKED** (owner QC) · [`OPS-UNIVERSITIES-UNI1.md`](./OPS-UNIVERSITIES-UNI1.md) |
| 2026-10-02 | **COURSE1** Courses CMS | **LOCKED** (owner QC) · [`OPS-COURSES-COURSE1.md`](./OPS-COURSES-COURSE1.md) |
| 2026-10-02 | **UNI1b** Universities toolbar | Search + state + Filter in one row (match Courses) — wait Preview QC |
| 2026-10-01 | **N1 + ACT1** panel head | **LOCKED** — card head padding **10px** above search/filters (QC fix) |
| 2026-10-01 | **UM1** User Management list | `/ops/admin/users` · existing `staff_people_directory` · SA-only · + Add User → invite · Back/invite success → UM list · Edit Permissions → `/ops/admin/users/[id]/permissions` |
| 2026-10-01 | **UM2** Edit Permissions | Screenshot page · module tree = effective role perms (read-only checkboxes) · Save = role via existing `/api/admin/staff` · no migration · Assigned Groups / Login Activity deferred · UM3 overrides later |
| 2026-10-01 | **UM2b** Menu grants | Remove top identity dup · remove right Courses pane · clickable menu tree · Save Menus via `staff_nav_grants` + `/api/admin/staff/nav-grants` · Change role / Suspend restored · migration `20261001183000_um2b_staff_nav_grants.sql` |
| 2026-10-02 | **UM1+UM2+UM2b** | **LOCKED** — owner QC passed · [`OPS-USER-MANAGEMENT-LOCK.md`](./OPS-USER-MANAGEMENT-LOCK.md) |
| 2026-10-02 | **TYPE18** Body type floor | **LOCKED** — ≥18px on all Ops body pages (header unchanged) · D9c in [`OPS-STAFF-DESIGN-LANGUAGE.md`](./OPS-STAFF-DESIGN-LANGUAGE.md) |
| 2026-10-02 | **TYPE18 height QC** | Shell **100dvh** · no window scroll · Activity table scrolls inside panel |
| 2026-10-02 | **UM height QC** | **LOCKED** — User Management card fills body · table scrolls inside panel |
| 2026-10-02 | Sidetab **Permissions** | **Removed** — unused stub; Track R stays PARKED (not in nav) |
| 2026-10-02 | **Permissions remove QC** | **LOCKED** (owner QC passed) |
| 2026-10-02 | **STU1** Student Registry | Screenshot body · height fill · **10**/page · real KPIs · [`OPS-STUDENT-REGISTRY-STU1.md`](./OPS-STUDENT-REGISTRY-STU1.md) — wait owner Preview QC to LOCK |
| 2026-10-02 | **STU1** Student Registry | **LOCKED** (owner QC passed) |
| 2026-10-02 | **ACC1** Premium & mentor Access | **LOCKED** (owner QC) — 2×2 · padded cards · history scroll · Back to Students · [`OPS-ACCESS-ACC1.md`](./OPS-ACCESS-ACC1.md) |
| 2026-10-02 | **STU1-M1** Change mentor dialog | **LOCKED** (owner QC) — Ops blue · TYPE18 ≥18px · same assignment API · [`OPS-STUDENT-REGISTRY-STU1.md`](./OPS-STUDENT-REGISTRY-STU1.md) |
| 2026-10-02 | **STU2** Open student CRM detail | **LOCKED** (owner QC) — Back · CRM/Guardians screenshot · [`OPS-STUDENT-DETAIL-STU2.md`](./OPS-STUDENT-DETAIL-STU2.md) |
| 2026-10-02 | **VAS1** View as Student | **LOCKED** (owner QC) — new tab · no Ops banner · Assign actions stay · no Exit · cookie TTL |
| 2026-10-02 | **STU2-T** Student detail tabs | **LOCKED** (owner QC) — **CRM** · **Guardian** · no stacked scroll · [`OPS-STUDENT-DETAIL-STU2.md`](./OPS-STUDENT-DETAIL-STU2.md) |
| 2026-10-02 | **ACC1-T** Access tabs | **LOCKED** (owner QC) — Assignments · History · pinned tablist · Assignments no card scroll · History full height |
