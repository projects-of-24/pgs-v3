# Ops backend UI + API updates (living backlog)

Owner-facing parking lot for **Ops/CMS chrome and body UI** that needs a later **backend / API / Storage / RPC** gate.  
UI may LOCK first; wiring waits for an explicit `GO AHEAD` wire gate.

Companions: [`OPS-POST-LOGIN-UI-PASSES.md`](./OPS-POST-LOGIN-UI-PASSES.md) · [`OPS-HEADER-LOCK.md`](./OPS-HEADER-LOCK.md) · [`OPS-STAFF-DESIGN-LANGUAGE.md`](./OPS-STAFF-DESIGN-LANGUAGE.md) · skill `pgs-backend-phase-wire`.

**Rule:** do not invent tables, Storage buckets, or fake metrics to “finish” a locked UI. Mark **DEFERRED** here instead.

---

## Status keys

| Status | Meaning |
|---|---|
| **PARKED** | Owner said later; do not start |
| **READY** | UI exists; waiting wire `GO AHEAD` |
| **IN GATE** | Named wire gate in progress |
| **DONE** | Wired + owner QC |

---

## Backlog

| ID | Area | UI status | Backend / API need | Status | Notes |
|---|---|---|---|---|---|
| **BE-H1** | Header avatar | C1 **LOCKED** look | Real staff avatar via `staff-avatars` + `staff_profiles.avatar_path` | **READY** (bucket live; SQL migration still needed) | Interim path pointer in Auth metadata until `20261001143000_ops_staff_avatar.sql` is run |
| **BE-H2** | Header search copy | C1 **LOCKED** | Align placeholder/capability with real `/api/staff/search` domains (or narrow copy to truth) | **PARKED** | Screenshot copy used for chrome; D5 capability check later |
| **BE-H3** | Notification badge | C1 **LOCKED** | Confirm unread count source stays permission-shaped; no fake “3” | **PARKED** | UI shows badge only when `notificationUnreadCount` > 0 |
| **BE-H4** | Ask PGS topbar | Removed from C1 | Re-entry point + `/api/ai/ops` product placement when owner asks | **PARKED** | Not in locked header |
| **BE-S1** | Sidetab nav chrome | C2 next | Collapsible Ops/CMS + Admin block over existing routes; stubs where missing | **READY** (UI) | Corrected scout: [`OPS-SIDETAB-SCOUT.md`](./OPS-SIDETAB-SCOUT.md) |
| **BE-S2** | CMS Creating/Editing | Sidetab | Payload/CMS gates; stub pages until then | **PARKED** | Log stubs as created |
| **BE-S3** | Admin Panel hub | Stub in C2 | Future admin landing | **PARKED** until stub ships |
| **BE-S4** | Permissions (roles UI) | **Removed from sidetab** (owner 2026-10-02) | Real roles/permissions product — not `/admin/access` | **PARKED** | Stub URL may remain; do not re-add nav without Track R gate |
| **BE-B1** | User Management deep UI | **UM LOCKED** | List + Edit Permissions + menu grants API | **DONE** (owner QC) | [`OPS-USER-MANAGEMENT-LOCK.md`](./OPS-USER-MANAGEMENT-LOCK.md) · Track R still PARKED |
| **BE-DOM1** | Single staff domain | Living | One shell for **Ops + CMS + Student Operations** | **LOCKED intent** | Domain contracts · `pgs-admin-ops` |
| **BE-A1** | Scoreboard body | **DASH1 LOCKED** | Real KPI contracts only; no fake sparklines/% | **UI LOCKED** | Backend stays existing contracts — see [`OPS-DASHBOARD-LOCK.md`](./OPS-DASHBOARD-LOCK.md) |
| **BE-P1** | Staff profile | **LOCKED** UI | Multi email/phone (D8) only if owner expands | **DONE** (owner QC) | See [`OPS-STAFF-PROFILE-LOCK.md`](./OPS-STAFF-PROFILE-LOCK.md) |
| **BE-CP1** | Change Password (Ops) | **LOCKED** UI | `/studio/change-password` → admin page; API `surface:studio` | **DONE** (owner QC) | See [`OPS-CHANGE-PASSWORD-LOCK.md`](./OPS-CHANGE-PASSWORD-LOCK.md) |
| **BE-NAV1** | Sidetab role visibility | **LOCKED** | Grant `audit.read` to mentor + read_only_staff; hide SA-only admin nav for others | **DONE** (owner QC) | [`OPS-NAV1-ROLE-VISIBILITY-LOCK.md`](./OPS-NAV1-ROLE-VISIBILITY-LOCK.md) · migration `20261001160000_nav1_activity_audit_read_common_roles.sql` |

---

## Domain note (owner 2026-10-01)

Ops staff chrome sits on a **single evolving backend domain** for:

1. **Operations** (students, targets, team, notifications, activity, scoreboard)
2. **CMS** (creating/editing catalog — Payload later)
3. **Student Operations** (assigned-student workspace — same staff identity)

Do **not** create separate staff identity systems. Sidetab dropdowns expose existing capability groups. **User Management** = future pass (**BE-B1**), not chrome invent.

---

## Gate log

| Date | Change |
|---|---|
| 2026-10-01 | Doc created. Header UI LOCKED; **BE-H1…H4 PARKED** (owner returns later; backend read-only from current). |
| 2026-10-01 | C2 **LOCKED**; SA primary QC avatar added; Admin no longer primary. |
| 2026-10-01 | **P1a** Staff Profile page chrome (breadcrumb/title/card); owner chose real fields only. |
| 2026-10-01 | **P1-photo** staff avatar Storage + `/api/admin/avatar`; password removed from My Profile; display name stays editable. |
| 2026-10-01 | Created `staff-avatars` bucket on connected project; API message → “Unable to upload image.”; metadata fallback until SQL migration applied. |
| 2026-10-02 | **BE-B1** User Management **LOCKED** (owner QC) · [`OPS-USER-MANAGEMENT-LOCK.md`](./OPS-USER-MANAGEMENT-LOCK.md). |
