# WS-DESK-REVIEW-DOCS — Reviews · Notes · Documents LOCK

**Gate:** WS-DESK-REVIEW-DOCS · owner QC passed · **LOCKED** 2026-10-08  
**Reconfirm:** owner `qc is passed lock reviews, notes, … documents` · 2026-10-08  
**URL:** `/workspace/students/[id]` · `/ops/students/[id]`  
**Same desk card flow as:** [`WS-COMMENTS-1-LOCK.md`](./WS-COMMENTS-1-LOCK.md)

| Item | Value |
|---|---|
| Tabs | **Reviews** · **Notes** · **Documents** (separate top tabs) |
| UI | Composer + cards · Reviews grow with details (not Comments reply-slot height) |
| Reviews create/edit | Title · Details · Status · Visibility · Order · Post/Save |
| Reviews display | Card body shows `details` (honest “No details.” when empty) |
| Body ◀ grip ▶ | Pages active `data-ws-body-scroll` panel · drag reposition |
| DB / API | `review_queue_items` · `counselor_notes` · requirements · documents |
| Student Track Progress | `#reviewQueue` FTP-B3 · `#counselorNotes` FTP-B4 (wired · separate QC) |
| Student Upload Your Docs | Resource list = **`required` only** · Desk “Post requirement” defaults to **`additional`** |

## Owner QC (passed)

1. Reviews / Notes / Documents separate tabs · card UI  
2. Post / Edit / Delete on each  
3. Reviews: Details visible on card after Save (not only in Edit)  
4. Reviews: Status / Visibility / Order on New + Edit  
5. Documents QC after student upload + clean scan  

## Files

- `src/components/workspace-desk-review-docs-panels.tsx`  
- `src/components/student-detail-tabs.tsx`  
- `src/components/staff-workspace-panels.tsx`  
- `src/components/workspace-desk-comments.module.css`  
- `src/components/workspace-body-scroll-nav.tsx`  
- `src/app/api/staff/students/[studentId]/workspace/[resource]/route.ts`  

## Next (student surfaces — not desk)

FTP-B2 / B3 / B4 await student Preview QC → LOCK.  
Documents `required` vs Additional student list — separate gate.  
