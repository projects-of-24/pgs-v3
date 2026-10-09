# WS-LOGIN-1 — `/workspace/login` LOCK

**Gate:** WS-LOGIN-1 · owner plan execute 2026-10-08 · **corrected:** land on `/workspace` (not `/ops`)

| Item | Value |
|---|---|
| Who | Super Admin, Admin, Mentor, Staff only |
| Students | **Rejected** (API 403 + sign-out; session on page → 404) |
| Grants | Studio/Ops **User Management** unchanged (Google Workspace–style) |
| Keep | `/studio/login` → `/ops` · student `/login` unchanged |
| Forgot | `/workspace/forgot-password` · [`STAFF-FORGOT-PASSWORD-LOCK.md`](./STAFF-FORGOT-PASSWORD-LOCK.md) |
| After Workspace login | **`/workspace` only** (hard-coded — ignores `?redirect=/ops`) · empty shell |
| Auth | Same Supabase Auth · `surface: "workspace"` (staff check; workspace redirect) |

## Product split

| Door | Lands on |
|---|---|
| `/studio/login` | `/ops` (Ops / CMS / User Management) |
| `/workspace/login` | `/workspace` (mentor–student workspace · build chrome later) |
| `/login` | student feed |

## Files

- `src/app/workspace/login/page.tsx`
- `src/app/workspace/page.tsx` (empty home)
- `src/components/studio-login.tsx` (copy + surface props)
- `src/app/api/auth/login/route.ts`
- `src/lib/auth.ts` (`isStaffDoorPath` includes `/workspace`)
- `src/proxy.ts` (protect `/workspace` · login door public)

## Owner QC

1. `/workspace/login` — staff → **empty `/workspace`** (not Ops)
2. Student credentials → rejected
3. `/studio/login` still → `/ops`
4. Unauthenticated `/workspace` → `/workspace/login`
