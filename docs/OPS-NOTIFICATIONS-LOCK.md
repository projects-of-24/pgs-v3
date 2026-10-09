# Ops Notifications — LOCKED (owner QC 2026-10-01)

**Do not restyle or rewire Ops Notifications** unless the owner opens a new notifications body gate.

Companions: [`OPS-POST-LOGIN-UI-PASSES.md`](./OPS-POST-LOGIN-UI-PASSES.md) · [`OPS-LOCKED-PAGES.md`](./OPS-LOCKED-PAGES.md) · RB-04

| Item | Locked value |
|---|---|
| Public URL | **`/ops/notifications`** (rewrite → `/admin/notifications`) |
| Pass | **N1** |
| Title | **Notifications** (breadcrumb + h1) |
| Filters | Pills **All / Unread / Read** with real counts |
| Search | Client filter on loaded list · sits **next to** pills (no large space-between gap) |
| Panel head padding | **10px** top inset above pills/search (owner QC 2026-10-01) |
| Sort dropdown | **Removed** (no Recent select) |
| Table | Icon · title/body · Student/Scope · Received · Status · Open / Archive |
| Checkboxes | **None** |
| Pagination | **10** per page · Showing X–Y of Z |
| Backend | `staff_notifications_list` + `PATCH /api/staff/notifications/[id]` |
| Chrome | Header/sidetab LOCKED elsewhere — do not restyle in this lock |

| Body type floor | **≥18px** on Ops body pages (header/sidetab stay ≥18px) — TYPE18 |

**Preview QC:** [http://localhost:7000/ops/notifications](http://localhost:7000/ops/notifications)
