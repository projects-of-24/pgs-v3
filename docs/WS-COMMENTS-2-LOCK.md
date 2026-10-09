# WS-COMMENTS-2 — Student #FEED Comments live LOCK

**Gate:** WS-COMMENTS-2 · owner `GO AHEAD WS-COMMENTS-2` · 2026-10-08  
**Status:** **WIRED** (await owner Preview QC → LOCK)  
**Truth:** Same `workspace_comments` as Desk Comments (RB-05)  
**Student surface:** `/student/dashboard` Premium #FEED Comments  
**API:** `POST /api/premium/comments` (student only · `student_visible`)

| Item | Value |
|---|---|
| Load | `loadFeedComments` — `visibility = student_visible` only |
| Post | Student Comment button → API → reload |
| Staff-only notes | Never shown on student feed |
| Preview labs | Still fixtures when `comments` omitted |
| View as Student | Read-only composer (no student POST) |
| Desk | Unchanged WS-COMMENTS-1 |

## Owner QC

1. Login `progress-lab-premium@pgs.lab` → `/student/dashboard` → Comments  
2. Post a comment → appears on feed after reload  
3. Staff Desk → same student → Comments → see that comment  
4. Staff post on Desk → student feed shows it (student_visible)  
5. `/preview/student-feed-premium` still fixture (no live wire)

## Files

- `src/features/student-feed/load-feed-comments.ts`  
- `src/features/student-feed/student-feed-comments.tsx`  
- `src/features/student-feed/premium/student-feed-premium-comments.tsx`  
- `src/features/student-feed/premium/student-feed-premium-shell.tsx`  
- `src/app/student/dashboard/page.tsx`  

## Next

**WS-COMMENTS-3** — reply notifications (RB-04)  
