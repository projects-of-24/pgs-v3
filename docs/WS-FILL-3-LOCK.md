# WS-FILL-3 — Top Picks / Assigned (mentor per student)

**Gate:** WS-FILL-3 · owner `GO AHEAD WS-FILL-3` · D4 = mentor-assign per student · 2026-10-08  
**Status:** **LOCKED** (owner QC 2026-10-08 · Top Picks hang UX QC 2026-10-09)  
**Desk:** `/workspace/students/[id]` → Dashboard Data → **Top Picks / Assigned**  
**Student:** Premium `#FEED` Top picks (`student-feed-top-picks`)

| Item | Value |
|---|---|
| Source | Published `courses` only (events later) |
| Storage | `student_feed_top_picks` |
| Staff API | `/api/staff/students/[id]/workspace/top-picks` |
| Student read | `loadFeedTopPicks` → live `/student/dashboard` |
| Desk picker | Type-to-search combobox (no native select) · **LOCKED** 2026-10-09 |
| Preview lab | `/preview/student-feed-premium` keeps fixture until wired with a student |

## Migration (required before assign works)

File: `supabase/migrations/20261008140000_ws_fill3_student_feed_top_picks.sql`

Paste in **Supabase → SQL Editor → Run**, then retry Desk assign.

## Owner QC

1. Apply migration  
2. Desk (Premium student) → **Choose** course → **Assign Top pick** (not select alone) → list shows it  
3. Repeat choose → Assign for multiple courses  
4. Student `#FEED` / View as Student → Top picks shows assigned courses (not fixture)  
5. Remove on Desk → feed list updates (empty if none)  
6. Mentor without assignment cannot manage out-of-scope student  

## TOP-PICKS-UX — **LOCKED** (owner QC passed 2026-10-09)

Native course dropdown hung on long titles → **type-to-search combobox** + **Assign Top pick**. Repeat for multiple.

Files: `src/components/workspace-desk-top-picks.tsx` · `workspace-desk-dashboard-data.module.css`

## Security (day-1)

- `requirePremiumActor(..., "manage")` · student_id from URL only  
- RLS `can_access_premium_student` / `can_manage_premium_student`  
- Insert forces `assigned_by = auth.uid()`  
- Unique `(student_id, course_id)` · max 40 picks  

## Deferred

Events · pathway auto-tags (B1) · drag reorder UI  

**Next gate:** WS-FILL-4 Where You Stand (wait `GO AHEAD WS-FILL-4`).
