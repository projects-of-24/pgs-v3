# Ops dashboard UI readings (living)

Pilot for skill [`pgs-ops-backend-ui-scout`](../.cursor/skills/pgs-ops-backend-ui-scout/SKILL.md).  
Parent method: [`pgs-scout-what-why-how`](../.cursor/skills/pgs-scout-what-why-how/SKILL.md).

**Owner locks:** screenshot-first · no invent · **ignore shadcn / TanStack by default** · easiest = semantic HTML + owned Ops CSS + existing Supabase APIs · CMS = Payload reference later.

**Reference gallery:** `/preview/ops-staff-plan/v2/`  
**Current landing:** `/ops` → [`src/app/admin/page.tsx`](../src/app/admin/page.tsx)  
**Shell:** [`src/components/admin-shell.tsx`](../src/components/admin-shell.tsx)

---

## OPS UI SCOUT — dashboard landing (2026-09-30)

### WHAT

| Source | Structure |
|---|---|
| **Screenshot / v2 dashboard** | Sidebar: Dashboard · Notifications · Activity · Operations (Students/Targets/Team) · CMS groups · Admin Panel. Header: search · bell · profile. Main: KPI cards · growth chart · recent notifications · upcoming events · latest activity · quick actions |
| **Current `/ops`** | Shell: flat nav Scoreboard · Students · Targets · Team · Notifications · Activity (permission-filtered). Header: section title · Ask PGS · search · bell · actor menu. Main: Operations Scoreboard panels + optional analytics from real RPCs |
| **Gap** | Screenshot has grouped Ops/CMS/Admin nav + richer dashboard chrome; current has flat Ops-only nav and scoreboard/analytics contracts (good for **real metrics**, not fake trends). Profile / User Management screens exist only as planning previews, not screenshot-parity UI |

### WHY

- Early Ops shell used internal shadcn-style primitives; owner QC prefers **screenshot look**, not default shadcn.
- Scoreboard correctly prefers **real** `staff_operations_scoreboard` / analytics — reject painting fake % from mockups as truth.
- CMS sidebar groups are **design intent**; Payload CMS not installed yet (`docs/OPS-CMS-DEPLOYMENT.md`).
- TanStack Table not required for landing; lists elsewhere can stay native `<table>` until proven otherwise.

### HOW (proposed — not implemented until GO AHEAD)

1. **Pass 1 — shell readings** (this file): lock header/sidebar rhythm from screenshot; owned CSS, not shadcn theme restyle of the whole design system.
2. **Pass 2 — dashboard main:** map screenshot blocks to **existing** scoreboard metrics only; mark CMS/events widgets DEFERRED if no contract.
3. **Pass 3 — reuse shell** on Profile / User Management after dashboard UI CHECK PASS.
4. **Stack:** Next.js + semantic HTML + Ops-scoped CSS modules/owned CSS. **No** new TanStack. **No** shadcn look-first. Payload only for `/cms` later.

### NOT IN THIS DOC PASS

- No Payload install  
- No student frontend changes  
- No inventing KPI trends  
- No full dashboard restyle until owner `GO AHEAD` for Pass 1/2  

---

## Shell readings to reuse on other Ops pages

| Token / area | Current (code) | Screenshot target (learn) | Reuse? |
|---|---|---|---|
| Sidebar width | `ops:w-64` fixed left | Grouped sections + Admin Panel footer | Yes — keep width; ADAPT grouping later |
| Brand | Purple Guide + Operations under logo | PGS Purple Guide Study | ADAPT label when shell pass approved |
| Default nav | Scoreboard, Notifications, Activity always meaningful for staff | Same intent | ADOPT |
| Gated nav | Students / Targets / Team via permissions | Lock icons until Super Admin enables | ADAPT permission UX to screenshot |
| CMS group | Not present | Creating / Editing children | DEFERRED until CMS gate |
| Admin Panel | Not present as group | User Management / Permissions / Edit Profile | ADAPT after dashboard pass |
| Topbar height | `ops:h-[72px]` | Search + bell + named profile | Reuse 72px; ADAPT profile chip text |
| Content pad | `ops:p-4 sm:p-6 lg:p-8` max `1440` | Card grid padding | Reuse max-width; tune pad in Pass 2 |
| Tables | N/A on landing | User mgmt later | Prefer native `<table>` |

Update this table after each UI CHECK PASS.

---

## UI CHECK PASS — dashboard (status)

| Band | Check | Pass? |
|------|--------|-------|
| Desktop ~1440 | Matches screenshot **structure** (named blocks) | **NOT RUN** — scout only; waiting `GO AHEAD` Pass 1 |
| Narrow ops | Nav reachable | NOT RUN |
| Data | No fake % | **PASS** (current scoreboard uses real contracts) |
| A11y smoke | Shell has nav label / avatar name | PARTIAL (needs full pass after visual ADAPT) |

---

## Next pages (after dashboard pass)

1. My Profile (Zoho-style) — v2 `step-3-profile.jpg`  
2. User Management + permissions — v2 `step-4-user-management.jpg`  
3. Login surface polish — v2 `step-1-login.jpg` (staff-only harden = backend W1)

Each page: reuse **shell readings** above; only re-scout **main** content.

---

## History

| Date | Change |
|---|---|
| 2026-09-30 | Initial scout + readings; skill `pgs-ops-backend-ui-scout` added; leftover skills restored |
