# FTP-B4 — Track Progress #counselorNotes live

**Gate:** FTP-B4 · owner `GO AHEAD B4` · 2026-10-08  
**Status:** **WIRED** (await owner Preview QC → LOCK)  
**Truth:** Same `counselor_notes` as Desk **Notes** tab  
**Student surface:** `/feed_track_progress` Premium `#counselorNotes`  
**Preview:** `/preview/feed-track-progress-premium` when logged-in student subject exists  

| Item | Value |
|---|---|
| Load | `loadProgressCounselorNotes` — `visibility = student_visible` · `created_at` asc |
| Window | 4 notes · up/down arrows when total > 4 |
| Empty | Honest empty copy (no fixtures when wired) |
| Family A | Still fixtures (N1 arrow QC) |
| Desk | Unchanged WS-DESK-REVIEW-DOCS |
| Not | Feed purple `premium_workspace_profiles.notes_html` |

## Owner QC

1. Desk → student → **Notes** → Post a note with **Visible to student**  
2. Student login Premium → `/feed_track_progress` → `#counselorNotes` shows that body  
3. Staff-only note (`staff_only`) does **not** appear  
4. Post 5+ student-visible notes → arrows step the window of 4 · `+N notes` updates  
5. Family A / anonymous still fixture  

## Files

- `src/features/feed-track-progress/load-progress-counselor-notes.ts`  
- `src/features/feed-track-progress/feed-track-progress-counselor-notes.tsx`  
- `src/features/feed-track-progress/feed-track-progress-counselor-notes.css`  
- `src/features/feed-track-progress/feed-track-progress-premium-shell.tsx`  
- `src/app/feed_track_progress/page.tsx`  
- `src/app/preview/feed-track-progress-premium/page.tsx`  

## Next

**Documents** — Desk `required` vs Additional wire  
**B5+** — Pathway · Loopboard · Tips / Resource Drop (queued)  
