# WS-COMMENTS-1 — Desk Comments + Alerts LOCK

**Gate:** WS-COMMENTS-1 · owner QC passed · **LOCKED** 2026-10-08  
**Reconfirm:** owner `qc is passed lock … comments, alerts` · 2026-10-08  
**URL:** `/workspace/students/[id]` · `/ops/students/[id]`  
**Student #FEED Comments:** [`WS-COMMENTS-2-LOCK.md`](./WS-COMMENTS-2-LOCK.md) (separate gate)

| Item | Value |
|---|---|
| Top tabs | **Comments** · **Alerts** (separate — not sub-tabs) |
| Comments UI | Card composer · fixed cards · ~5 replies then scroll · 4 / row · min-height 3 card-rows · **Comments only** |
| Alerts UI | Own **Alerts** tab only |
| DB / API | `workspace_comments` · `student_alerts` · migration `20261008170000_ws_comments_delete_rls` |
| Student Important Alerts | **`/feed_track_progress`** · **`/upload_your_doc`** (Premium · active ≤3) |
| Rich composer (B/I/emoji) | Deferred |

## Owner QC (passed)

1. Comments + Alerts top tabs (Alerts not under Comments)  
2. Fixed card height · replies scroll inside  
3. Post / Reply / Edit / Delete comments  
4. Alerts: Post / Edit / Delete  

## Files

- `src/components/student-detail-tabs.tsx`  
- `src/components/workspace-desk-comments-panels.tsx`  
- `src/components/workspace-desk-comments.module.css`  
- `src/app/workspace/(shell)/workspace-shell.module.css`  
- `src/components/staff-workspace-panels.tsx`  

## Next

**WS-COMMENTS-2** — Student #FEED Comments (WIRED · await student-surface QC)  
**WS-COMMENTS-3** — Reply notifications (RB-04)  
