# Ops sidetab chrome — LOCKED (owner QC 2026-10-01)

**Do not restyle the Ops sidetab** unless the owner opens a new sidetab gate.

Scout / IA: [`OPS-SIDETAB-SCOUT.md`](./OPS-SIDETAB-SCOUT.md).  
Header LOCKED: [`OPS-HEADER-LOCK.md`](./OPS-HEADER-LOCK.md).  
Design language: [`OPS-STAFF-DESIGN-LANGUAGE.md`](./OPS-STAFF-DESIGN-LANGUAGE.md).  
Backend park: [`OPS-BACKEND-UI-API-UPDATES.md`](./OPS-BACKEND-UI-API-UPDATES.md).

| Item | Locked value |
|---|---|
| Pass | **C2** |
| Type floor | **≥18px** sidetab labels, group summaries, Stub badges |
| IA | Dashboard · Notifications · Activity · Operations ▾ · CMS ▾ · Admin block (role-shaped) |
| Role visibility (**NAV1**) | **Admin Panel · User Management** = **Super Admin only** (hidden for other roles, not lock icons). **Dashboard · Notifications · Activity** = all staff roles (enabled). **Edit Profile** = all roles |
| Activity permission | `audit.read` granted to **mentor** + **read_only_staff** (migration `20261001160000_nav1_activity_audit_read_common_roles.sql`) |
| Live vs stub | Existing backend routes live; missing = stub pages logged in scout/BE MD |
| Events | **Omitted** from Creating (crop) |
| User Management | `/ops/admin/users` — **LOCKED** [`OPS-USER-MANAGEMENT-LOCK.md`](./OPS-USER-MANAGEMENT-LOCK.md) |
| Permissions sidetab | **Removed** (owner 2026-10-02) — unused stub; Track R roles UI stays PARKED / not in nav |
| Domain | One staff shell for Ops + CMS + Student Operations |

## QC actor

Owner **2026-10-01:** primary chrome QC = **Progress Lab Super Admin**  
Email: `progress-lab-superadmin@pgs.lab` · avatar `/assets/img/ops/fixture-super-admin-avatar.jpg`  
(Also mapped: `pgs-v3-fixture+super-admin@example.test`. Admin fixture retained, not primary.)

**Preview:** [http://localhost:7000/ops](http://localhost:7000/ops) (sign in as Super Admin)

Footer / overflow: **LOCKED** — [`OPS-FOOTER-OVERFLOW-LOCK.md`](./OPS-FOOTER-OVERFLOW-LOCK.md).  
**NAV1** role visibility + **Activity check QC LOCK:** [`OPS-NAV1-ROLE-VISIBILITY-LOCK.md`](./OPS-NAV1-ROLE-VISIBILITY-LOCK.md) — Admin Panel SA-only · primary trio all roles · Activity open to all staff.  
Next chrome: **C4** desktop + a11y → full chrome LOCK.
