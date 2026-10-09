# WS-DESK-GCRM — Guardians / CRM (Workspace Desk) LOCK

**Gate:** WS-DESK-GCRM · owner `GO AHEAD WS-DESK-GCRM` · 2026-10-08  
**Status:** **LOCKED** (owner QC passed 2026-10-08)  
**URL:** `/workspace/students/[id]` → tab **Guardians / CRM**  
**Reference:** Owner screenshot (CRM Identity + Guardians / Parents)  
**Contract:** Same STU2 CRM + guardians APIs — **no second DB** ([`OPS-STUDENT-DETAIL-STU2.md`](./OPS-STUDENT-DETAIL-STU2.md))

| Item | Value |
|---|---|
| Sub-tabs | **CRM** · **Guardian** (click to view; default CRM) |
| Panels | **CRM Identity** · **Guardians / Parents** (existing components) |
| Desk tabs | Icons: Home · Chat · Doc · Folder · People (screenshot) |
| Card chrome | STU2 cards enabled under `[data-ws-desk="true"]` (was Ops `.ops-system-body` only) |
| Purple soft UI | Icon chips · Premium pill · Invite callout · Send invitation = brand purple |
| APIs | `POST …/crm` · `GET/POST …/guardians` unchanged |
| Ops desk | STU2 body **untouched** (no redesign) |

## Owner QC

1. Open Desk → **Guardians / CRM** → sub-tabs **CRM** · **Guardian**  
2. CRM tab: facts · derived groups · manual tags · Edit / Save / Attach / Create  
3. Guardian tab: empty or list · Invite form · Send invitation  
4. Desk top tabs show icons; active tab has purple underline  
5. Saves still work (facts / tags / invite)

## Files

- `src/components/workspace-desk-guardians-crm.tsx` + `.module.css` — CRM · Guardian sub-tabs  
- `src/components/student-detail-tabs.tsx` — tab icons  
- `src/app/admin/operations.css` — ws-desk card + purple soft chrome  
- Shared: `student-crm-identity-panel.tsx` · `student-guardians-panel.tsx`  
