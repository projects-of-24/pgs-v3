# WS-DESK-WS — Workspace Student Desk LOCK

**Gate:** WS-DESK-WS · after WS-SIDEBAR-2 + WS-REG · 2026-10-08  
**URL:** `/workspace/students/[id]` on current domain  
**Contract:** Same desk as Ops [`WS-DESK-LOCK.md`](./WS-DESK-LOCK.md) — one CRM + Premium workspace truth (no second desk DB)

| Item | Value |
|---|---|
| Entry | Registry **Open Desk** |
| Header | Name · Premium/Standard · PGS · Mentor · Stream · Year · Stage · ← Back · View as Student |
| Tabs | Dashboard Data · Comments · Alerts · Reviews · Notes · Documents · Guardians / CRM — Comments+Alerts **LOCKED** (QC reconfirm 2026-10-08) [`WS-COMMENTS-1-LOCK.md`](./WS-COMMENTS-1-LOCK.md) · Reviews/Notes/Docs **LOCKED** (QC reconfirm 2026-10-08) [`WS-DESK-REVIEW-DOCS-LOCK.md`](./WS-DESK-REVIEW-DOCS-LOCK.md) · GCRM [`WS-DESK-GCRM-LOCK.md`](./WS-DESK-GCRM-LOCK.md) |
| Back | `/workspace/students` |
| Ops desk | Untouched at `/ops/students/[id]` |
| Chrome | **Gmail-stable** — Workspace header + sidebar + footer stay on every desk view; desk body must not `position:fixed` cover the shell |

## Owner QC

1. Workspace login → Students → Open Desk  
2. Confirm five tabs; only one panel visible  
3. Premium student: Dashboard / Comments / Review / Documents populate  
4. Guardians / CRM edits identity + guardians  
5. Sidebar stays light tree while desk is open  

## Accessibility postflight

- Semantic HTML: PASS (nav, h1, tablist/tab/tabpanel)  
- Accessible names: PASS  
- Contrast: PASS target  
- Keyboard: PASS  
- Focus: PASS  
- Forms/labels: PASS (shared panels)  
- Zoom/reflow: PASS intent  
- Automated accessibility scan: NOT RUN  
- Known exceptions: desk body reuses Ops `operations.css` scoped under `.operations-root`  

## Files

- `src/app/workspace/(shell)/students/[studentId]/page.tsx`  
- Shared: `student-detail-tabs.tsx`, `staff-workspace-panels.tsx`, CRM/guardians panels  
