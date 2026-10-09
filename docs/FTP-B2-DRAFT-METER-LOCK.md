# FTP-B2 — Track Progress #draftMeter live

**Gate:** FTP-B2 · owner `GO AHEAD B2` · 2026-10-08  
**Status:** **WIRED** (await owner Preview QC → LOCK)  
**Truth:** Same `student_document_requirements` as Desk **Documents**  
**Student surface:** `/feed_track_progress` Premium `#draftMeter`  
**Preview:** `/preview/feed-track-progress-premium` when logged-in student subject exists

| Item | Value |
|---|---|
| Rows | Not approved / not waived · ≤3 · label `document_type · status` |
| `+N completed` | Count where `status === approved` |
| Gauges | Figma SVGs **decorative only** (option A) |
| Empty | Honest empty (no fake Figma rows when wired) |
| Family A | Still fixtures |

## Owner QC

1. Desk → **Documents** → requirements with mixed statuses  
2. Set one requirement status **Approved** → Save  
3. Premium student → `/feed_track_progress` → `#draftMeter`  
   - Pending rows ≤3 with real names  
   - `+N completed` = approved count (not static 3)  
4. All approved → empty pending copy · `+N` still shows  

## Files

- `src/features/feed-track-progress/load-progress-draft-meter.ts`  
- `src/features/feed-track-progress/feed-track-progress-draft-meter.tsx`  
- `src/features/feed-track-progress/feed-track-progress-premium-shell.tsx`  
- `src/app/feed_track_progress/page.tsx`  
- `src/app/preview/feed-track-progress-premium/page.tsx`  

## Next

**B4** — `#counselorNotes` ← `counselor_notes`  
