# WS-DESK — Student Desk shell LOCK

**Gate:** WS-DESK · owner `GO AHEAD WS-DESK` · made live 2026-10-08  
**URL:** `/ops/students/[id]` on **current domain** (local or deployed). Subdomain `workspace.purpleguide.study` = later port (WS-HOST) — not required for desk QC.  
**Supersedes tab chrome of:** [`OPS-STUDENT-DETAIL-STU2.md`](./OPS-STUDENT-DETAIL-STU2.md) STU2-T (CRM \| Guardian) — body contracts (CRM APIs, guardians, Premium workspace) unchanged.

| Item | Value |
|---|---|
| Header | Name · Premium/Standard badge · PGS · Mentor · Stream · Year · Stage · ← Back · **View as Student** |
| Tabs | **Dashboard Data** · **Comments** · **Alerts** · **Reviews** · **Notes** · **Documents** · **Guardians / CRM** — Comments+Alerts [`WS-COMMENTS-1-LOCK.md`](./WS-COMMENTS-1-LOCK.md) · Reviews/Notes/Docs [`WS-DESK-REVIEW-DOCS-LOCK.md`](./WS-DESK-REVIEW-DOCS-LOCK.md) · GCRM [`WS-DESK-GCRM-LOCK.md`](./WS-DESK-GCRM-LOCK.md) |
| Palette | Studio purple via `--operations-brand` (WS-CHROME-1) |
| Data | Existing CRM + guardians + Premium workspace panels — no new tables |
| Deferred | Rich fill editors (WS-FILL-*), dual-column Comments chrome polish, Loopboard global nav (WS-LOOP), `/workspace` host |

## Files

- `src/app/admin/students/[studentId]/page.tsx`
- `src/components/student-detail-tabs.tsx`
- `src/components/staff-workspace-panels.tsx` (split Comments / Review&Notes / Documents)
- `src/app/admin/operations.css` (`.ops-ws-desk-*`)

## Owner QC

1. Studio login → `/ops/students` → Open Desk  
2. Confirm five tabs; only one panel visible  
3. Premium student: Dashboard Data + Comments + Review + Documents populate  
4. Guardians / CRM still edits identity + guardians  
5. View as Student opens real feed (when configured + in scope)  
6. Keyboard: tablist + focus ring on Studio purple CTA  

## Accessibility postflight

- Semantic HTML: PASS (nav, h1, tablist/tab/tabpanel, sections)  
- Accessible names: PASS (tab labels, VAS button, breadcrumb)  
- Contrast: PASS target (brand purple on white; Standard badge on gray ≥4.5)  
- Keyboard: PASS (native buttons; tabIndex 0/−1 on tabs)  
- Focus: PASS (`:focus-visible` on tabs + VAS)  
- Forms/labels: PASS (unchanged workspace forms)  
- Zoom/reflow: PASS intent (wrap tablist + title row)  
- Automated accessibility scan: NOT RUN  
- Known exceptions: none this gate  
