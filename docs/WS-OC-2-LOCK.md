# WS-OC-2 — Overall Comments live table LOCK

**Gate:** WS-OC-2 · owner QC passed · **LOCKED** 2026-10-09  
**URL:** `/workspace/overall-comments`  
**Truth:** Same `workspace_comments` as Desk → Comments  

| Item | Value |
|---|---|
| Columns | Student name · Student ID (`pgs_code`) · Comment · Timing |
| Scope | Mentor = assigned only · Admin/Super = authorized + RLS |
| Reply | **Not on this page** — Desk Comments only |
| Chrome | No inner “Comments / N shown” bar |
| Pagination | **10 per page** (registry-style) |
| Limit | Newest 100 comments · paginated in UI |

## Owner QC (passed)

1. Live rows match Desk Comments  
2. Table + search + pagination  
3. No reply panel  

## Files

- `src/features/workspace-overall-comments/load-overall-comments.ts`  
- `src/components/workspace-overall-comments.tsx` + `.module.css`  
- `src/app/workspace/(shell)/overall-comments/page.tsx`  

## Do not

Restyle / rewire without a **new** named gate.  
