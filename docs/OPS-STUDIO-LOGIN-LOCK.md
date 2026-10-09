# Studio login — LOCKED (owner QC 2026-10-01)

**Do not restyle or change auth/redirect behavior** unless the owner opens a new gate.

| Item | Locked value |
|---|---|
| Route | `/studio/login` |
| Forgot | `/studio/forgot-password` · [`STAFF-FORGOT-PASSWORD-LOCK.md`](./STAFF-FORGOT-PASSWORD-LOCK.md) |
| UI | `StudioLogin` + `studio-login.module.css` |
| Staff only | API `surface: "studio"` + page session gate |
| Student on Studio | Error on page; no bounce to student frontend |
| Success | Direct `/ops` |
| Logout (staff) | Direct from Ops menu — `surface: studio` → `/studio/login` (**no** `/logout` confirm page) |
| Type | 15px min; mobile/iPad stack login top; desktop brand left |
| Card shadow | Notification-style hard offset `8px 8px 0 #000` |
| Data | Read-only connected DB for auth checks |

**Preview QC:** [http://localhost:7000/studio/login](http://localhost:7000/studio/login)

Next work: post-login Ops UI — see [`OPS-POST-LOGIN-UI-PASSES.md`](./OPS-POST-LOGIN-UI-PASSES.md).
