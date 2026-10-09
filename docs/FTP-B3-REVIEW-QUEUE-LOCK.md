# FTP-B3 — Track Progress #reviewQueue live

**Gate:** FTP-B3 · owner `GO AHEAD` (next-step #1 after desk LOCK) · 2026-10-08  
**Status:** **WIRED** (await owner Preview QC → LOCK)  
**Truth:** Same `review_queue_items` as Desk **Reviews** tab  
**Student surface:** `/feed_track_progress` Premium `#reviewQueue`  
**Preview:** `/preview/feed-track-progress-premium` when logged-in student subject exists

| Item | Value |
|---|---|
| Load | `loadProgressReviews` — `student_visible = true` · `sort_order` |
| Done | `status === completed` → green switch |
| Empty | Honest empty copy (no fixtures when wired) |
| Family A | Still fixtures (locked meters) |
| Desk | Unchanged WS-DESK-REVIEW-DOCS |

## Owner QC

1. Desk → student → **Reviews** → Post a review (student visible)  
2. Mark one **Completed** · Save  
3. Student login Premium → `/feed_track_progress` → `#reviewQueue` shows same titles · completed = tick  
4. Staff-only review (`student_visible` false) does **not** appear  
5. Family A / anonymous still fixture  

## Files

- `src/features/feed-track-progress/load-progress-reviews.ts`  
- `src/features/feed-track-progress/feed-track-progress-review-queue.tsx`  
- `src/features/feed-track-progress/feed-track-progress-premium-shell.tsx`  
- `src/app/feed_track_progress/page.tsx`  
- `src/app/preview/feed-track-progress-premium/page.tsx`  

## Next

**B4** — `#counselorNotes` ← `counselor_notes` — **WIRED** · [`FTP-B4-COUNSELOR-NOTES-LOCK.md`](./FTP-B4-COUNSELOR-NOTES-LOCK.md)  
**Documents** — Desk `required` vs Additional wire  
