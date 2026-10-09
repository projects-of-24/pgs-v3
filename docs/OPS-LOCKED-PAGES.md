# Ops LOCKED pages & chrome — owner checklist

Living index of **owner QC LOCKED** Ops/Studio staff surfaces.  
**Do not restyle or rewire** a LOCKED item unless the owner opens a **new** named gate.

Last updated: **2026-10-02** (ACC1 Access LOCKED · STU1 · UM · TYPE18 · Dashboard · Activity · NAV1 · Notifications).

---

## How to use

1. Before editing Ops UI, check this table.
2. Open the lock doc for exact values.
3. If the page is not listed → it is **not** product-LOCKED (may be draft / stub / next gate).

---

## LOCKED — pages (body)

| # | Surface | URL | Lock doc | QC actor note |
|---|---|---|---|---|
| 1 | **Studio login** | `/studio/login` | [`OPS-STUDIO-LOGIN-LOCK.md`](./OPS-STUDIO-LOGIN-LOCK.md) | Staff only; purple login stays |
| 2 | **Staff Profile** | **`/studio/profile`** | [`OPS-STAFF-PROFILE-LOCK.md`](./OPS-STAFF-PROFILE-LOCK.md) | URL QC LOCKED; rewrite → `/admin/profile`; display name + photo |
| 3 | **Change Password** | `/studio/change-password` | [`OPS-CHANGE-PASSWORD-LOCK.md`](./OPS-CHANGE-PASSWORD-LOCK.md) | Ops shell; not public `/change_password` |
| 4 | **Notifications** | `/ops/notifications` | [`OPS-NOTIFICATIONS-LOCK.md`](./OPS-NOTIFICATIONS-LOCK.md) | Title **Notifications**; pills · search · pagination; no checkboxes / Recent |
| 5 | **Activity** | `/ops/activity` | [`OPS-ACTIVITY-LOCK.md`](./OPS-ACTIVITY-LOCK.md) | KPIs · filters · table · pagination 10; existing RPC; body type ≥18px |
| 6 | **Dashboard / Scoreboard** | **`/ops`** | [`OPS-DASHBOARD-LOCK.md`](./OPS-DASHBOARD-LOCK.md) | DASH1 · real KPIs · Analytics/Catalog · drag kept · no fake % |
| 7 | **User Management** | `/ops/admin/users` (+ `/permissions`) | [`OPS-USER-MANAGEMENT-LOCK.md`](./OPS-USER-MANAGEMENT-LOCK.md) | UM1+UM2+UM2b+UM2c+UM-M1 · SA-only · menus-only editor · Manage on list |
| 8 | **Student Registry** | `/ops/students` | [`OPS-STUDENT-REGISTRY-STU1.md`](./OPS-STUDENT-REGISTRY-STU1.md) | STU1 · KPIs · filters · 10/page · height fill · Premium CTA |
| 9 | **Premium & mentor Access** | `/admin/access` | [`OPS-ACCESS-ACC1.md`](./OPS-ACCESS-ACC1.md) | ACC1 · 2×2 forms+history · scroll · Back to Students · `premium.manage` |
| 10 | **Open student desk** | `/ops/students/[id]` | [`OPS-STUDENT-DETAIL-STU2.md`](./OPS-STUDENT-DETAIL-STU2.md) · [`WS-DESK-LOCK.md`](./WS-DESK-LOCK.md) | STU2 body + **WS-DESK** tabs · Back · TYPE18 |

---

## LOCKED — chrome & session

| # | Piece | Pass | Lock doc | Applies on |
|---|---|---|---|---|
| 4 | **Header / topbar** | C1 | [`OPS-HEADER-LOCK.md`](./OPS-HEADER-LOCK.md) | `/ops`, `/ops/*`, studio profile/password |
| 5 | **Sidetab** | C2 | [`OPS-SIDETAB-LOCK.md`](./OPS-SIDETAB-LOCK.md) | Same Ops product shell |
| 6 | **Footer / overflow / body scroll** | C3 | [`OPS-FOOTER-OVERFLOW-LOCK.md`](./OPS-FOOTER-OVERFLOW-LOCK.md) | Nested main · 80% body · Motion dock |
| 7 | **Ops Logout** | LO1 | [`OPS-STUDIO-LOGOUT-LOCK.md`](./OPS-STUDIO-LOGOUT-LOCK.md) | Direct → `/studio/login` (no `/logout` middle page) |
| 8 | **Sidetab role visibility + Activity check** | NAV1 | [`OPS-NAV1-ROLE-VISIBILITY-LOCK.md`](./OPS-NAV1-ROLE-VISIBILITY-LOCK.md) | **Activity QC lock** · Admin Panel SA-only · Dashboard·Notifications·Activity all roles |

---

## LOCKED — design language (not a page)

| # | Item | Lock / authority |
|---|---|---|
| 8 | **Screenshot design language** (C0) | [`OPS-STAFF-DESIGN-LANGUAGE.md`](./OPS-STAFF-DESIGN-LANGUAGE.md) — blue chrome · type floors · Studio purple separate |

---

## NOT LOCKED yet (do not treat as frozen)

| Surface | Status | Notes |
|---|---|---|
| Full chrome **C4** (desktop + a11y stamp) | Next | C1–C3 locked; C4 still open |
| Premium & mentor controls | **LOCKED** | [`OPS-ACCESS-ACC1.md`](./OPS-ACCESS-ACC1.md) |
| Change mentor dialog (STU1-M1) | **LOCKED** | Assign/Change/Unassign modal · TYPE18 · Ops blue · [`OPS-STUDENT-REGISTRY-STU1.md`](./OPS-STUDENT-REGISTRY-STU1.md) |
| Open student CRM detail (STU2) | **LOCKED** | [`OPS-STUDENT-DETAIL-STU2.md`](./OPS-STUDENT-DETAIL-STU2.md) |
| View as Student new tab (VAS1) | **LOCKED** | New tab · no Ops banner · Assign stays · cookie TTL |
| VAS1-WRITE (staff writes + cookie) | **LOCKED** | Cookie never freezes `/api/staff` / Desk manage · [`VAS1-WRITE-LOCK.md`](./VAS1-WRITE-LOCK.md) |
| Access Assignments/History tabs (ACC1-T) | **LOCKED** | Assignments · History · pinned tabs · [`OPS-ACCESS-ACC1.md`](./OPS-ACCESS-ACC1.md) |
| Dashboard Analytics card themes (DASH2) | **LOCKED** | White cards · pastel icon chips · [`OPS-DASHBOARD-LOCK.md`](./OPS-DASHBOARD-LOCK.md) |
| Team People & Access (TEAM1) | **LOCKED** | Screenshot table · 10/page · no Open staff targets · [`OPS-TEAM-TEAM1.md`](./OPS-TEAM-TEAM1.md) |
| Invite staff (INVITE1) | **LOCKED** | Icon fields · no Effective access summary · [`OPS-TEAM-INVITE1.md`](./OPS-TEAM-INVITE1.md) |
| Confirm invitation (CONFIRM1) | **LOCKED** | No Access-after box · [`OPS-TEAM-CONFIRM1.md`](./OPS-TEAM-CONFIRM1.md) |
| Manage staff (MANAGE1) | **LOCKED** | Tabs · no Effective access · [`OPS-TEAM-MANAGE1.md`](./OPS-TEAM-MANAGE1.md) |
| Staff Targets (TARGET1) | **LOCKED** | Tabs · edit modal · Update status button · [`OPS-TARGETS-TARGET1.md`](./OPS-TARGETS-TARGET1.md) |
| Universities (UNI1) | **LOCKED** | List 10/page · create/edit 2-col · [`OPS-UNIVERSITIES-UNI1.md`](./OPS-UNIVERSITIES-UNI1.md) |
| Courses (COURSE1) | **LOCKED** | List 10/page · create/edit · [`OPS-COURSES-COURSE1.md`](./OPS-COURSES-COURSE1.md) |
| Student desk tabs (WS-DESK) | **LIVE** (shell) | Tab set below · Dashboard Data / GCRM separate · [`WS-DESK-LOCK.md`](./WS-DESK-LOCK.md) |
| Desk Guardians / CRM (WS-DESK-GCRM) | **LOCKED** | CRM · Guardian sub-tabs · screenshot · [`WS-DESK-GCRM-LOCK.md`](./WS-DESK-GCRM-LOCK.md) |
| Desk Comments + Alerts (WS-COMMENTS-1) | **LOCKED** | QC reconfirm 2026-10-08 · [`WS-COMMENTS-1-LOCK.md`](./WS-COMMENTS-1-LOCK.md) |
| Desk Reviews · Notes · Documents (WS-DESK-REVIEW-DOCS) | **LOCKED** | QC reconfirm 2026-10-08 · details on display · [`WS-DESK-REVIEW-DOCS-LOCK.md`](./WS-DESK-REVIEW-DOCS-LOCK.md) |
| Overall Comments fixture (WS-OC-1) | Superseded by WS-OC-2 | Table-only fixture amend · [`WS-OC-1-LOCK.md`](./WS-OC-1-LOCK.md) |
| Overall Comments live (WS-OC-2) | **LOCKED** | Live table · 10/page · [`WS-OC-2-LOCK.md`](./WS-OC-2-LOCK.md) |
| Mentor Assigns (FTP-B7a) | **WIRED** | Shell + tabs · [`FTP-B7A-MENTOR-ASSIGNS-LOCK.md`](./FTP-B7A-MENTOR-ASSIGNS-LOCK.md) |
| Mentor Assigns DB (FTP-B7b) | **WIRED** (apply migration + QC) | `progress_tips` / `progress_resources` · [`FTP-B7B-MENTOR-ASSIGNS-DB-LOCK.md`](./FTP-B7B-MENTOR-ASSIGNS-DB-LOCK.md) |
| Track Progress #draftMeter (FTP-B2) | **WIRED** (await QC) | Live requirements · [`FTP-B2-DRAFT-METER-LOCK.md`](./FTP-B2-DRAFT-METER-LOCK.md) |
| Track Progress #reviewQueue (FTP-B3) | **WIRED** (await QC) | Live `review_queue_items` · [`FTP-B3-REVIEW-QUEUE-LOCK.md`](./FTP-B3-REVIEW-QUEUE-LOCK.md) |
| Track Progress #counselorNotes (FTP-B4) | **WIRED** (await QC) | Live `counselor_notes` · [`FTP-B4-COUNSELOR-NOTES-LOCK.md`](./FTP-B4-COUNSELOR-NOTES-LOCK.md) |
| Student feed Comments (WS-COMMENTS-2) | **WIRED** (await QC) | Same `workspace_comments` · [`WS-COMMENTS-2-LOCK.md`](./WS-COMMENTS-2-LOCK.md) |
| Permissions / Roles UI | **Removed from sidetab**; Track R PARKED | Stub route may remain; not nav-linked until owner opens Track R |
| CMS Creating/Editing | Deferred | Payload gates later |
| Public student `/change_password` | Student surface | Out of Ops lock list |

---

## Companion docs

| Doc | Role |
|---|---|
| [`OPS-POST-LOGIN-UI-PASSES.md`](./OPS-POST-LOGIN-UI-PASSES.md) | Pass order + gate log |
| [`OPS-BACKEND-UI-API-UPDATES.md`](./OPS-BACKEND-UI-API-UPDATES.md) | Parked / wired backend rows |
| [`OPS-DASHBOARD-UI-READINGS.md`](./OPS-DASHBOARD-UI-READINGS.md) | Shell readings |

---

## Gate log (this index)

| Date | Change |
|---|---|
| 2026-10-01 | Index created. Listed Studio login · Header · Sidetab · Footer · Staff Profile · Change Password · design language. |
| 2026-10-01 | **LO1** Logout LOCKED. Profile URL **LOCKED** (owner QC) → **`/studio/profile`**. |
| 2026-10-01 | **N1** Notifications **LOCKED** (owner QC) · [`OPS-NOTIFICATIONS-LOCK.md`](./OPS-NOTIFICATIONS-LOCK.md). |
| 2026-10-01 | **NAV1** role visibility + **Activity check QC** **LOCKED** · [`OPS-NAV1-ROLE-VISIBILITY-LOCK.md`](./OPS-NAV1-ROLE-VISIBILITY-LOCK.md). |
| 2026-10-01 | **ACT1** Activity **LOCKED** (owner QC) · [`OPS-ACTIVITY-LOCK.md`](./OPS-ACTIVITY-LOCK.md). Body type floor **≥15px** (not header). |
| 2026-10-01 | Body type floor **≥15px** **LOCKED** (owner QC) — Activity · Notifications · Profile · Change Password · [`OPS-STAFF-DESIGN-LANGUAGE.md`](./OPS-STAFF-DESIGN-LANGUAGE.md) D9c. |
| 2026-10-01 | **DASH1** Dashboard / Scoreboard **LOCKED** (owner QC) · [`OPS-DASHBOARD-LOCK.md`](./OPS-DASHBOARD-LOCK.md). |
| 2026-10-01 | Notifications + Activity panel head padding **10px** QC fix **LOCKED** (N1 + ACT1) · Hostinger `section` padding kill kept. |
| 2026-10-02 | **UM1+UM2+UM2b** User Management **LOCKED** (owner QC) · [`OPS-USER-MANAGEMENT-LOCK.md`](./OPS-USER-MANAGEMENT-LOCK.md). |
| 2026-10-02 | **UM2c + UM-M1** Edit Permissions trim + UM Manage link **LOCKED** (owner QC). |
| 2026-10-02 | **TYPE18** body type floor **≥18px** (all Ops body pages; header unchanged) · D9c updated in [`OPS-STAFF-DESIGN-LANGUAGE.md`](./OPS-STAFF-DESIGN-LANGUAGE.md). |
| 2026-10-02 | **UM height QC** LOCKED — list card fills body · table scrolls inside panel. |
| 2026-10-02 | Sidetab **Permissions** removed (unused) · Admin block = Admin Panel · User Management · Edit Profile. |
| 2026-10-02 | **Permissions remove QC** **LOCKED** (owner QC passed). |
| 2026-10-02 | **STU1** Student Registry shipped — height fill · 10/page · screenshot body · wait Preview QC. |
| 2026-10-02 | **STU1** Student Registry **LOCKED** (owner QC). |
| 2026-10-02 | **ACC1** Access shipped — new 2×2 design · height fill · history 10/page. |
| 2026-10-02 | **ACC1** Premium & mentor Access **LOCKED** (owner QC) · [`OPS-ACCESS-ACC1.md`](./OPS-ACCESS-ACC1.md). |
| 2026-10-02 | **ACC1-T** Access Assignments/History tabs **LOCKED** (owner QC) · [`OPS-ACCESS-ACC1.md`](./OPS-ACCESS-ACC1.md). |
| 2026-10-02 | **DASH2** Analytics card themes **LOCKED** (owner QC) · [`OPS-DASHBOARD-LOCK.md`](./OPS-DASHBOARD-LOCK.md). |
| 2026-10-02 | **MANAGE1** Manage staff **LOCKED** (owner QC) · [`OPS-TEAM-MANAGE1.md`](./OPS-TEAM-MANAGE1.md). |
| 2026-10-02 | **TARGET1** Staff Targets **LOCKED** (owner QC) · [`OPS-TARGETS-TARGET1.md`](./OPS-TARGETS-TARGET1.md). |
| 2026-10-02 | **UNI1** Universities CMS **LOCKED** (owner QC) · [`OPS-UNIVERSITIES-UNI1.md`](./OPS-UNIVERSITIES-UNI1.md). |
| 2026-10-02 | **COURSE1** Courses CMS **LOCKED** (owner QC) · [`OPS-COURSES-COURSE1.md`](./OPS-COURSES-COURSE1.md). |
| 2026-10-02 | **INVITE1** Invite staff **LOCKED** (owner QC) · [`OPS-TEAM-INVITE1.md`](./OPS-TEAM-INVITE1.md). |
| 2026-10-02 | **CONFIRM1** Confirm invitation **LOCKED** (owner QC) · [`OPS-TEAM-CONFIRM1.md`](./OPS-TEAM-CONFIRM1.md). |
| 2026-10-02 | **STU1-M1** Change mentor dialog **LOCKED** (owner QC) · TYPE18 · Ops blue. |
| 2026-10-02 | **STU2** Open student CRM detail **LOCKED** (owner QC) · [`OPS-STUDENT-DETAIL-STU2.md`](./OPS-STUDENT-DETAIL-STU2.md). |
| 2026-10-02 | **VAS1** View as Student **LOCKED** (owner QC) — new tab · no Exit button. |
| 2026-10-02 | **STU2-T** CRM \| Guardian tabs **LOCKED** (owner QC) · [`OPS-STUDENT-DETAIL-STU2.md`](./OPS-STUDENT-DETAIL-STU2.md). |
| 2026-10-02 | **VAS1** View as Student QC fix **LOCKED** (owner QC) — Assign visible with preview cookie. |
| 2026-10-08 | **WS-DESK** Student Desk tabs **LIVE** (await owner QC) · supersedes STU2-T chrome · [`WS-DESK-LOCK.md`](./WS-DESK-LOCK.md). |
| 2026-10-08 | **VAS1-WRITE** preview cookie must not freeze staff writes **LOCKED** · [`VAS1-WRITE-LOCK.md`](./VAS1-WRITE-LOCK.md). |
| 2026-10-08 | **WS-FILL-3** Top Picks mentor-assign **LIVE** (apply migration) · [`WS-FILL-3-LOCK.md`](./WS-FILL-3-LOCK.md). |
| 2026-10-08 | **WS-FILL-3** Top Picks **LOCKED** (owner QC passed) · [`WS-FILL-3-LOCK.md`](./WS-FILL-3-LOCK.md). |
| 2026-10-08 | **WS-FILL-4** Where You Stand **WIRED** (await QC) · 1A·2A·3A · [`WS-FILL-4-LOCK.md`](./WS-FILL-4-LOCK.md). |
| 2026-10-08 | **WS-FILL-4B** Finalized Uni List + CMS images **WIRED** (await QC) · [`WS-FILL-4-LOCK.md`](./WS-FILL-4-LOCK.md). |
| 2026-10-08 | **WS-CHROME-FIX** **WIRED** (await QC) — Ops brand in rail · header search-only · no Desk nest · [`WS-CHROME-FIX-LOCK.md`](./WS-CHROME-FIX-LOCK.md). |
| 2026-10-08 | **WS-COMMENTS-1** + **WS-DESK-REVIEW-DOCS** owner QC reconfirm **LOCKED** — Comments · Alerts · Reviews · Notes · Documents. |
| 2026-10-09 | **WS-OC-1** Overall Comments fixture inbox **WIRED** · [`WS-OC-1-LOCK.md`](./WS-OC-1-LOCK.md). |
| 2026-10-09 | **WS-OC-2** Overall Comments live table from `workspace_comments` **WIRED** · [`WS-OC-2-LOCK.md`](./WS-OC-2-LOCK.md). |
| 2026-10-09 | **WS-OC-2** owner QC **LOCKED**. |
| 2026-10-09 | **FTP-B7a** Mentor Assigns Tips/Resource fixture tabs **WIRED** · [`FTP-B7A-MENTOR-ASSIGNS-LOCK.md`](./FTP-B7A-MENTOR-ASSIGNS-LOCK.md). |
| 2026-10-09 | **FTP-B7b** Mentor Assigns DB + Save APIs **WIRED** · [`FTP-B7B-MENTOR-ASSIGNS-DB-LOCK.md`](./FTP-B7B-MENTOR-ASSIGNS-DB-LOCK.md). |
