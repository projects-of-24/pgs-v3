# Ops Change Password — LOCKED (owner QC 2026-10-01)

**Do not restyle or rewire Ops Change Password** unless the owner opens a new gate.

Staff Profile LOCKED: [`OPS-STAFF-PROFILE-LOCK.md`](./OPS-STAFF-PROFILE-LOCK.md).  
Master list: [`OPS-LOCKED-PAGES.md`](./OPS-LOCKED-PAGES.md).

| Item | Locked value |
|---|---|
| Public URL | **`/studio/change-password`** |
| App route | `/admin/change-password` (rewrite) |
| Pass | **CP1** |
| Shell | Ops product chrome (same family as Staff Profile) |
| Menu | Account → Change Password → `/studio/change-password` (**not** public `/change_password`) |
| Form | Old · New · Confirm · show/hide · strength bars · checklist · Cancel → **`/studio/profile`** · Save Change |
| Same-as-old rule | New password must differ from old — inline error + checklist + submit blocked |
| API | `POST /api/auth/change-password` with `surface: "studio"` |
| Student page | `/change_password` unchanged (student surface) |
| Card width | **50%** of Ops body (100% ≤800px) |
| Body type floor | **≥18px** (Ops body; header/sidetab stay ≥18px) — TYPE18 |

**Preview QC:** [http://localhost:7000/studio/change-password](http://localhost:7000/studio/change-password)
