# WS-CHROME-FIX — LOCK

**Gate:** WS-CHROME-FIX · owner `GO AHEAD WS-CHROME-FIX` · 2026-10-08  
**QC fix:** match `/ops` brand chrome (owner screenshots)  
**Status:** **WIRED** (await owner Preview QC → LOCK)  
**Was:** [`WS-CHROME-FIX-PENDING.md`](./WS-CHROME-FIX-PENDING.md)

## Done

| Fix | Result |
|---|---|
| Brand placement | **Ops/Studio pattern** — graduation cap + **PGS** + **Purple Guide Study** in sidebar lavender band. **No brand in header.** |
| Header | Centered search **popup** (`OperationsStaffSearch` surface=workspace) · student click → Open Desk · Ops-size profile · bell |
| My Profile | `/workspace/profile` (not `/studio/profile`) |
| Logout | `surface: workspace` → `/workspace/login` |
| Pagination | Ops-style ◀ · grip · ▶ body scroll dock (`WorkspaceBodyScrollNav`) |
| Students scroll | Shell 100dvh · **table scrolls inside** · no outward browser scrollbar |
| Student Desk nest | **Removed** |
| Students nav | Flat **Students** → `/workspace/students`. Open Desk tabs unchanged. |

## Keep

- Sidebar: brand · Dashboard · Students · Overall Comments · Loopboard · My Profile · Logout  
- Desk body tabs on student open  

## Files

- `src/app/workspace/(shell)/layout.tsx` — header inside main column  
- `src/components/workspace-sidebar.tsx` + `.module.css`  
- `src/components/workspace-header.tsx` + `.module.css`  
- `src/app/workspace/(shell)/workspace-shell.module.css`  

## Owner QC

1. `/workspace` — brand only in left rail (like `/ops`), **not** in the top bar  
2. Click header search → popup; type student → click → `/workspace/students/[id]` Desk  
3. Registry pagination = Ops style (`1–10 of N` · numbered pages)  
4. Profile larger (Ops 18px)  
5. My Profile → `/workspace/profile` (stays in Workspace shell)  
6. Logout → `/workspace/login`  
7. Body page controls (◀ · grip · ▶) visible and scroll the body  
8. No Student Desk tree; Open Desk still works  
9. `/workspace/profile` — no branded bottom footer (Studio/Ops profile look)  

## Deferred

- `/workspace/students/desk/*` stub routes remain for deep links (not in nav)  

