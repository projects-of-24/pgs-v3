---
name: pgs-ops-backend-ui-scout
description: >-
  Ops/CMS/backend staff UI scout: reuse frontend WHAT·WHY·HOW method against
  owner screenshots, learn readings on dashboard landing, reuse on later Ops
  pages. Prefer simplest HTML+owned CSS over shadcn/TanStack unless owner
  re-approves. Use on /ops, /cms, staff admin, Payload-adapt CMS work.
---

# PGS — Ops / backend UI scout (screenshot-first)

**Parent method:** [`pgs-scout-what-why-how`](../pgs-scout-what-why-how/SKILL.md) (WHAT · WHY · HOW · GO AHEAD · re-measure).  
**Companions:** [`pgs-never-invent`](../pgs-never-invent/SKILL.md) · [`pgs-backend-phase-wire`](../pgs-backend-phase-wire/SKILL.md) · [`pgs-propose-before-code`](../pgs-propose-before-code/SKILL.md) · [`pgs-admin-ops`](../pgs-admin-ops/SKILL.md)

**Owner locks (2026-09-30):**

1. Steal like an artist — **screenshots / approved references first**. Do not invent Ops UI.
2. Frontend scout skill was public/CSS-oriented; **this skill applies the same discipline to staff backend pages**.
3. Owner **QC failed on shadcn look** — do **not** default to shadcn/TanStack for Ops UI.
4. CMS = Payload as **reference**; adapt / fork / migrate patterns into PGS needs — not dump whole Payload as Ops.
5. **Pilot page = Operations dashboard landing (`/ops`)**. Pass UI check → record readings → reuse on next Ops pages.

---

## When to use

- `/ops` dashboard, notifications, activity, team, students, targets, profile, admin panel
- Later `/cms` Payload-adapted screens
- Any staff UI where owner shares a **reference screenshot**
- After a backend gate, when UI must match screenshot before wiring more APIs

**Do not** use this to invent SaaS dashboards or reintroduce shadcn “because the bank said so.”

---

## Easiest UI stack (Ops) — preferred until owner says otherwise

| Layer | Use | Avoid (unless owner re-approves) |
|---|---|---|
| App | Next.js App Router · React · TypeScript | — |
| Auth / data | Supabase Auth · RLS · existing `/api/staff` · `/api/admin` | Payload Auth for Ops |
| Markup | Semantic HTML (`table`, `nav`, `form`, `button`, `a`) | Generic card grids for inventing layout |
| Style | **Owned CSS** / CSS modules under Ops scope (same idea as modular public CSS) | Default shadcn theme as product look |
| Icons | Lucide OK if needed | Icon-only unlabeled controls |
| Lists | Native `<table>` + server sort/filter query params | TanStack Table by default |
| Charts | Only with **real** scoreboard contracts | Fake % / sparklines from mockups as truth |

**Port formula:** `Owner screenshot` + `existing Ops route/API/RLS` → smallest ADAPT → `GO AHEAD` → ship → Preview QC.

---

## Method (every Ops UI page)

```text
1. REFERENCE
   Owner screenshot(s) for this page (path or chat attach)
   Note: login / shell / dashboard / profile / user-mgmt / etc.

2. SCOUT CURRENT
   Live or local URL (e.g. http://localhost:7000/ops)
   Files: page + shell + CSS
   Structure: sidebar groups, header, main blocks (names only)

3. WHAT (from pgs-scout-what-why-how)
   Screenshot shows: …
   Current /ops shows: …
   Gap: …

4. WHY
   Wrong chrome? shadcn default density? Missing blocks?
   Fake KPI art vs real scoreboard contracts?
   CMS menu deferred vs live?

5. HOW
   Exact blocks to add/remove/restyle
   Owned CSS selectors (no drive-by shell restyle)
   BEFORE → AFTER
   NOT IN THIS CHANGE (no Payload install, no student UI, no invent metrics)

6. STOP — wait GO AHEAD for this page

7. IMPLEMENT smallest visual ADAPT onto existing data contracts

8. UI CHECK PASS
   Desktop + one narrow band if ops shell collapses
   Readings table (below) → append to living MD

9. REUSE
   Next Ops page starts from the same shell readings (header/sidebar)
   Only re-scout page-specific main content
```

---

## Dashboard landing pilot (required first pass)

**URL:** `/ops` (rewrite → `/admin`)  
**Reference gallery:** `/preview/ops-staff-plan/v2/` (login · dashboard · profile · user management)  
**Living readings:** [`docs/OPS-DASHBOARD-UI-READINGS.md`](../../docs/OPS-DASHBOARD-UI-READINGS.md)

Pilot order:

1. Shell chrome (header + sidebar groups) — readings shared by all Ops pages  
2. Dashboard main (KPI row, notifications, activity, quick actions) — **real metrics only**  
3. Then unlock next page (profile → user management → …) using the same shell readings  

Do **not** paint CMS Payload UI into Ops until CMS gate; sidebar CMS links may stay deferred.

---

## Output template (before GO AHEAD)

```markdown
### OPS UI SCOUT — <page>

**Reference:** <screenshot / preview path>
**Current URL:** /ops…

### WHAT
- Screenshot: …
- Current: …
- Gap: …

### WHY
- …

### HOW
- Stack: owned CSS + semantic HTML (no shadcn/TanStack unless approved)
- Files: …
- BEFORE → AFTER: …
- NOT IN THIS CHANGE: …

### READINGS TO REUSE (shell)
- Sidebar width / groups: …
- Header height / search / profile: …
- Content max-width / padding: …

Waiting for GO AHEAD.
```

---

## After implement (required)

```markdown
### UI CHECK PASS — <page>
| Band | Check | Pass? |
|------|--------|-------|
| Desktop ~1440 | Matches screenshot structure (named blocks) | Y/N |
| Narrow / mobile ops | Nav reachable; no clipped primary actions | Y/N |
| Data | No fake % / invented KPIs | Y/N |
| A11y smoke | Labels on icon buttons; tables real | Y/N |

Append shell readings to docs/OPS-DASHBOARD-UI-READINGS.md for later pages.
```

---

## Failure modes

1. Restyling with shadcn defaults after owner QC failed  
2. Adding TanStack “because tables” when a plain table + query params is enough  
3. Inventing dashboard widgets not in the screenshot  
4. Treating mockup fake trends as product truth  
5. Skipping scout and porting Payload admin chrome into Ops wholesale  
6. Changing shared shell without recording readings for other pages  

---

## Related

| Skill / doc | Role |
|---|---|
| `pgs-scout-what-why-how` | Frontend/public layout scout method (parent) |
| `pgs-backend-phase-wire` | API/DB gates after UI check |
| `pgs-never-invent` | Screenshots + junior/reference before invent |
| `pgs-cms` | CMS / Payload reference track |
| `docs/OPS-CMS-DEPLOYMENT.md` | Ops vs CMS deploy contract |
| `docs/OPS-DASHBOARD-UI-READINGS.md` | Living shell + dashboard readings |
