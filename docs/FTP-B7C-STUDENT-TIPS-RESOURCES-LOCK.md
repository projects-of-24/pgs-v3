# FTP-B7c — Student Track Progress live Tips + Resource Drop

**Gate:** FTP-B7c · owner `GO AHEAD FTP-B7c` · 2026-10-09  
**Status:** **LOCKED** (owner QC passed 2026-10-09)  
**Truth:** Same shared pack as Mentor Assigns (`progress_tips` · `progress_resources`)  
**Surfaces:** Premium Family B only · Family A keeps fixtures  

| Item | Value |
|---|---|
| Tips | Useful Tips carousel ← active `progress_tips` |
| Resources | Resource Drop ← active `progress_resources` (URL → new tab when set) |
| Loader | `loadProgressTips` · `loadProgressResources` |
| Auth | RLS: Premium student read · staff overview / library manage |
| DB | Requires B7b migration applied |

## Behavior

| State | Tips / Drop |
|---|---|
| Family A (anon / standard) | Figma fixtures (omit props) |
| Premium · DB applied · rows | Live slides / links |
| Premium · DB applied · empty | Honest empty copy |
| Premium · DB not applied | Fixtures (`wired: false`) |
| Preview Premium | Same as live when session can read |

## Owner QC — PASSED 2026-10-09

1. ~~Confirm B7b migration applied; Mentor Assigns Save works~~  
2. ~~Premium student `/feed_track_progress` → Useful Tips matches Mentor Assigns Tips~~  
3. ~~Resource Drop labels match; rows with URL open in new tab~~  
4. ~~Edit Tips/Resources in Mentor Assigns → Save → reload student page → updated~~  
5. ~~Family A `/feed_track_progress` (standard) still shows fixture Tips/Drop~~  
6. ~~Preview `/preview/feed-track-progress-premium` with Premium session shows live~~  

## Files

- `src/features/feed-track-progress/load-progress-tips-resources.ts`  
- `src/features/feed-track-progress/feed-track-progress-tips.tsx` + `.css`  
- `src/features/feed-track-progress/feed-track-progress-resource-drop.tsx` + `.css`  
- `src/features/feed-track-progress/feed-track-progress-premium-shell.tsx`  
- `src/app/feed_track_progress/page.tsx`  
- `src/app/preview/feed-track-progress-premium/page.tsx`  

## Security (day-1)

- Student SELECT only via RLS (`has_active_premium` or staff read)  
- No student write path  
- Shared library (not per-student Desk)  
- External URLs: `rel="noopener noreferrer"` · `target="_blank"`  

## Known gaps

- Inactive rows hidden in student UI (staff editor still sees all via Mentor Assigns)  
- Empty `url` stays label-only (fixture look) — intentional until staff adds link  
