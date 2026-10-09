# FTP-B7b — Mentor Assigns DB + Save

**Gate:** FTP-B7b · owner `GO AHEAD FTP-B7b` · 2026-10-09  
**Status:** **LOCKED** (owner QC passed with FTP-B7c · 2026-10-09)  
**Editor:** `/workspace/mentor-assigns`  
**Product:** Shared Tips + Resources for **all** Premium students  

| Item | Value |
|---|---|
| Tables | `progress_tips` · `progress_resources` |
| Migration | `supabase/migrations/20261009120000_ftp_b7b_progress_tips_resources.sql` |
| APIs | `GET/PUT /api/staff/mentor-assigns/tips` · `…/resources` |
| Write auth | Mentors / manage staff / privileged (RLS `can_manage_progress_library`) |
| Student read | RLS + UI = **FTP-B7c** · [`FTP-B7C-STUDENT-TIPS-RESOURCES-LOCK.md`](./FTP-B7C-STUDENT-TIPS-RESOURCES-LOCK.md) |

## Apply DB (required)

On the connected Supabase project, apply:

`20261009120000_ftp_b7b_progress_tips_resources.sql`

Until applied, Mentor Assigns shows **DB not applied** and Save stays disabled.

## Owner QC

1. Apply migration  
2. Mentor Assigns → edit Tips → **Save tips** → reload → persisted  
3. Resource tab → label + `https://…` → **Save resources** → reload  
4. Empty list Save clears pack  

## Files

- `supabase/migrations/20261009120000_ftp_b7b_progress_tips_resources.sql`  
- `src/app/api/staff/mentor-assigns/tips/route.ts`  
- `src/app/api/staff/mentor-assigns/resources/route.ts`  
- `src/features/workspace-mentor-assigns/load-mentor-assigns.ts`  
- `src/lib/mentor-assigns-auth.ts`  
- `src/components/workspace-mentor-assigns.tsx`  
- `src/app/workspace/(shell)/mentor-assigns/page.tsx`  

## Next

**FTP-B7c** — student Track Progress Tips + Resource Drop · **LOCKED**  

