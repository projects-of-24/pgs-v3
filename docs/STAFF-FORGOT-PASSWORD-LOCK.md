# Staff forgot password — Studio + Workspace

**Gate:** owner `GO AHEAD` · 2026-10-09  
**Status:** **LOCKED** (owner QC passed 2026-10-09)

| Surface | Login | Forgot page |
|---|---|---|
| Student | `/login` | `/forgot_password` (legacy · unchanged) |
| Studio | `/studio/login` | **`/studio/forgot-password`** |
| Workspace | `/workspace/login` | **`/workspace/forgot-password`** |

| Item | Value |
|---|---|
| API | `POST /api/auth/forgot-password` (shared Auth recovery) |
| UI | `StaffForgotPassword` + `studio-login.module.css` |
| Proxy | Public staff doors: login + forgot (Studio + Workspace) |
| Reset email land | Still `/reset_password` via auth callback (**deferred** staff-aware return) |

## Owner QC — PASSED 2026-10-09

1. ~~`/studio/login` → Forgot → `/studio/forgot-password`~~  
2. ~~`/workspace/login` → Forgot → `/workspace/forgot-password` (stays on forgot · no bounce)~~  
3. ~~Back link returns to matching login~~  
4. ~~Student `/login` → Forgot still `/forgot_password`~~  
5. ~~Submit staff email → success message (no student feed chrome)~~  

## Files

- `src/components/staff-forgot-password.tsx`  
- `src/app/studio/forgot-password/page.tsx`  
- `src/app/workspace/forgot-password/page.tsx`  
- `src/components/studio-login.tsx` (forgot hrefs)  
- `src/proxy.ts` (public staff forgot doors)  

<!-- ci retrigger 2026-10-09T18:43:07.6234316+05:30 -->

