# WS-DASH-3 — OG Dashboard LOCK (reference sorted)

**Gate:** WS-DASH-3 · owner reference image 2026-10-08  
**URL:** `/workspace`  
**Chrome:** Sidebar active = solid purple (ref). Header/footer otherwise [`WS-CHROME-SHELL-LOCK.md`](./WS-CHROME-SHELL-LOCK.md).

| Item | Value |
|---|---|
| Header | Welcome back + wave · overview line · date-range **button chrome** (display month only, disabled) |
| KPI cards | Icons · My students · Premium (+ real % when same scope) · Review / Events quiet (— · coming next) |
| Panels | Recent Activity · My Tasks · **View all →** links · honest empty rows |
| Rejected | Fake +2 this month · fake queue/event counts · fake Aarav activity rows |

## Owner QC

1. `/workspace` matches reference rhythm (welcome · date · 4 cards · 2 panels)  
2. Counts are real; deferred cards show — not invented numbers  
3. Solid purple Dashboard active in sidebar  
4. Then **WS-FILL-1** Student Desk → Dashboard Data  

## Accessibility

- Semantic HTML: PASS  
- Accessible names: PASS (disabled date button; View all links)  
- Contrast: PASS target (white on solid purple active ≥4.5)  
- Keyboard: PASS  
- Focus: PASS  
- Forms/labels: N/A  
- Zoom/reflow: PASS intent  
- Automated scan: NOT RUN  
- Known: date control disabled until filter contract  

## Files

- `src/app/workspace/(shell)/page.tsx`  
- `src/components/workspace-dashboard.tsx` + `.module.css`  
- `src/components/workspace-sidebar.module.css` (active only)  
