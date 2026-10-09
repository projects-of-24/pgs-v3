# WS-OC-1 — Overall Comments fixture table

**Gate:** WS-OC-1 · owner `GO AHEAD WS-OC-1` · 2026-10-09  
**Owner amend:** table only — **no reply panel** (2026-10-09)  
**Status:** **WIRED** (await owner Preview QC → LOCK)  
**URL:** `/workspace/overall-comments`  
**Bank:** RB-05 COMMENTS (inbox list) — ADAPT; reply stays on Desk

| Item | Value |
|---|---|
| Columns | **Student name** · **Student ID** · **Comment** · **Timing** |
| Scope story | Mentor caseload only (fixture) — not all PGS students |
| Reply | **Not on this page** — use Student Desk → Comments |
| Writes | **None** |
| Rejected | Side thread · Send reply · fake KPIs · comment types |

## Owner QC

1. Workspace → **Overall Comments**  
2. Table shows name · PGS ID · comment · timing  
3. No reply box / thread panel  
4. Search filters fixture rows  
5. Desk Comments LOCKED UI unchanged  

## Files

- `src/app/workspace/(shell)/overall-comments/page.tsx`  
- `src/components/workspace-overall-comments.tsx`  
- `src/components/workspace-overall-comments.module.css`  
- `src/features/workspace-overall-comments/fixtures.ts`  

## Next

**WS-OC-2** — live table from `workspace_comments` · `mentor_assignments` scope  
