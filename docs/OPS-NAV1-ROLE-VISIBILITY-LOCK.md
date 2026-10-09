# Ops sidetab role visibility + Activity check — LOCKED (owner QC 2026-10-01)

**This MD is the Activity check QC lock** (who may open Activity) **and** the Admin Panel / primary-nav role-visibility lock.

**Do not change Admin Panel / primary nav role visibility or Activity role access** unless the owner opens a new NAV / Activity gate.

Companions: [`OPS-SIDETAB-LOCK.md`](./OPS-SIDETAB-LOCK.md) · [`OPS-LOCKED-PAGES.md`](./OPS-LOCKED-PAGES.md) · [`OPS-POST-LOGIN-UI-PASSES.md`](./OPS-POST-LOGIN-UI-PASSES.md)

| Item | Locked value |
|---|---|
| Pass | **NAV1** (option **A**) |
| **Activity check QC lock** | **Yes — this document** |
| Admin Panel · User Management | **Super Admin only** — hidden for Admin / Mentor / Read-only (no lock icons) |
| Dashboard · Notifications · Activity | **All staff roles** — enabled links |
| Edit Profile | **All staff roles** |
| Activity permission | `audit.read` for mentor + `read_only_staff` via `20261001160000_nav1_activity_audit_read_common_roles.sql` |

### Activity check (owner QC LOCKED)

| Era | Who could open Activity |
|---|---|
| Before NAV1 | **Super Admin + Admin only** (`audit.read`) |
| **NAV1 LOCKED** | **All staff roles** — owner Option A expansion (not legacy parity) |

**Preview:** [http://localhost:7000/ops](http://localhost:7000/ops) · [http://localhost:7000/ops/activity](http://localhost:7000/ops/activity) — compare Super Admin vs Mentor.
