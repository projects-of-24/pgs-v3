# Ops Studio logout — LOCKED (owner QC 2026-10-01)

**Do not put Ops Logout back through the `/logout` confirm middle page** unless the owner opens a new gate.

| Item | Locked value |
|---|---|
| Pass | **LO1** |
| Trigger | Account menu **Logout** (and staff no-student-context Sign out) |
| Flow | `POST /api/auth/logout` with `surface: "studio"` → **`/studio/login`** |
| Middle page | **None** — never `/logout?surface=studio&next=/ops` from Ops menu |
| Student/public | `/logout` confirm page may remain for student surface |

Component: `src/components/ops-studio-logout-button.tsx`  
Companion: [`OPS-STUDIO-LOGIN-LOCK.md`](./OPS-STUDIO-LOGIN-LOCK.md) · [`OPS-LOCKED-PAGES.md`](./OPS-LOCKED-PAGES.md)
