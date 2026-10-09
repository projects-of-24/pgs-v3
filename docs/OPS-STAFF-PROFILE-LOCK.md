# Ops Staff Profile — LOCKED (owner QC 2026-10-01)

**Do not restyle or rewire Staff Profile** unless the owner opens a new profile gate.  
**Do not change the public URL off `/studio/profile`** unless the owner opens a new URL gate.

Companions: [`OPS-POST-LOGIN-UI-PASSES.md`](./OPS-POST-LOGIN-UI-PASSES.md) · [`OPS-STAFF-DESIGN-LANGUAGE.md`](./OPS-STAFF-DESIGN-LANGUAGE.md) · [`OPS-BACKEND-UI-API-UPDATES.md`](./OPS-BACKEND-UI-API-UPDATES.md) · [`OPS-LOCKED-PAGES.md`](./OPS-LOCKED-PAGES.md)

| Item | Locked value |
|---|---|
| Public URL | **`/studio/profile`** — owner QC passed 2026-10-01 (**not** `/admin/profile` in the browser) |
| App route | `/admin/profile` (rewrite only) |
| Passes | **P1a** chrome · **P1b/P1c** form layout · **P1-photo** camera/files · **URL** → `/studio/profile` |
| Card width | **50%** of Ops body (100% ≤800px) |
| Fields | Display name (editable) · Email (read-only) · **no** password on this page |
| Photo | Camera menu → Take photo (webcam dialog) · Choose from files → Save uploads |
| Header menu | My Profile → **`/studio/profile`**; Change Password → **`/studio/change-password`** |
| Sidetab | Edit Profile → **`/studio/profile`** |
| Cancel (Change Password) | → **`/studio/profile`** |
| Public `/change_password` | **Not** used from Ops account menu |
| API | `/api/admin/profile` (unchanged) |
| Body type floor | **≥18px** (Ops body; header/sidetab stay ≥18px) — TYPE18 |

**Preview QC:** [http://localhost:7000/studio/profile](http://localhost:7000/studio/profile)
