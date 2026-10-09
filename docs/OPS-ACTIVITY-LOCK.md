# Ops Activity — LOCKED (owner QC 2026-10-01)

**Do not restyle or rewire Ops Activity** unless the owner opens a new activity body gate.

Companions: [`OPS-POST-LOGIN-UI-PASSES.md`](./OPS-POST-LOGIN-UI-PASSES.md) · [`OPS-LOCKED-PAGES.md`](./OPS-LOCKED-PAGES.md) · [`OPS-NAV1-ROLE-VISIBILITY-LOCK.md`](./OPS-NAV1-ROLE-VISIBILITY-LOCK.md) (Activity **role** access) · [`OPS-STAFF-DESIGN-LANGUAGE.md`](./OPS-STAFF-DESIGN-LANGUAGE.md)

| Item | Locked value |
|---|---|
| Public URL | **`/ops/activity`** (rewrite → `/admin/audit`) |
| Pass | **ACT1** |
| Title | **Activity** (breadcrumb `Operations › Activity`) |
| Header → content gap | **20px** below description (Notifications parity) |
| KPI cards | From loaded list only (Total / Today / Successful / Failed) |
| Filters | Search · domain (`?domain=` existing RPC) · date range · outcome · Filter |
| Table | Time · Domain · Event · Target · Actor · Outcome |
| Pagination | **10** per page |
| Backend | `loadOperationsActivity` / `staff_operations_activity` — **no API change** |
| ⋮ menu | **None** |
| Body type floor | **≥18px** on Ops body pages (header/sidetab stay ≥18px) — TYPE18 |
| Viewport height | Shell **100dvh** · no window scroll · Activity table scrolls inside panel (TYPE18 QC 2026-10-02) |
| Toolbar / filters | Search sits **next to** filter pills (no `space-between` gap). Hostinger `section` padding killed on Ops body |
| Panel head padding | **10px** top inset above search/filters (owner QC 2026-10-01) |

**Preview QC:** [http://localhost:7000/ops/activity](http://localhost:7000/ops/activity)
