# Ops User Management — LOCKED (owner QC 2026-10-02)

**Do not restyle or rewire User Management** unless the owner opens a new UM gate.

Companions: [`OPS-POST-LOGIN-UI-PASSES.md`](./OPS-POST-LOGIN-UI-PASSES.md) · [`OPS-LOCKED-PAGES.md`](./OPS-LOCKED-PAGES.md) · [`OPS-STAFF-DESIGN-LANGUAGE.md`](./OPS-STAFF-DESIGN-LANGUAGE.md) · RB-01 + RB-02

| Item | Locked value |
|---|---|
| Passes | **UM1** list · **UM2** Edit Permissions · **UM2b** menu grants · **UM2c** trim · **UM-M1** Manage link |
| List URL | **`/ops/admin/users`** (rewrite → `/admin/users`) |
| Edit Permissions URL | **`/ops/admin/users/[id]/permissions`** |
| Access | **Super Admin only** (directory + editor + Save Menus) |
| List source | Existing `staff_people_directory` — Super Admin not listed |
| + Add User | → invite; Back / invite success → UM list |
| Menu grants | `staff_nav_grants` + `/api/admin/staff/nav-grants` · migrations `20261001183000_um2b_staff_nav_grants.sql` + `20261001184500_um2b_common_nav_not_grantable.sql` |
| Role vs menus | **Edit Permissions** = sidetab menu checkboxes only (**Save Menus** → nav-grants). No Staff role / Suspend on editor. Staff role · suspend · reactivate → **Manage** (`/ops/team/[id]?from=um`) |
| Editor footer | **Cancel** + **Save Menus** only (**UM2c LOCKED**) |
| Always-on nav | Dashboard · Notifications · Activity are **not** grantable (always on when permitted) |
| Body type floor | **≥18px** (TYPE18; header stays LOCKED C1) |
| Viewport height | Shell **100dvh** · UM list card fills body · table scrolls inside panel · pagination pinned in card — **LOCKED** (owner QC 2026-10-02) |
| Sidetab | Admin Panel · User Management · Edit Profile — **Permissions** link **removed** (unused stub) |
| UM-M1 (2026-10-02) | Actions: **Edit Permissions** then **Manage** → `/ops/team/[id]?from=um` (same MANAGE1 page/APIs; back → UM list) |
| Deferred | UM3 per-user permission overrides · Assigned Groups · Login Activity · Track R roles UI (not in sidetab) |

**Preview QC:** [http://localhost:7000/ops/admin/users](http://localhost:7000/ops/admin/users)
