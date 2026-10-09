# Ops dashboard UI readings (living)

Pilot for skill [`pgs-ops-backend-ui-scout`](../.cursor/skills/pgs-ops-backend-ui-scout/SKILL.md).  
Parent method: [`pgs-scout-what-why-how`](../.cursor/skills/pgs-scout-what-why-how/SKILL.md).

## Ops header — **LOCKED** (owner QC 2026-10-01)

Full lock: [`OPS-HEADER-LOCK.md`](./OPS-HEADER-LOCK.md). Backend park: [`OPS-BACKEND-UI-API-UPDATES.md`](./OPS-BACKEND-UI-API-UPDATES.md).

| Rule | Detail |
|---|---|
| UI | Topbar C1 locked — do not restyle without new gate |
| Backend | **Read-only from current** for header chrome; owner returns later (BE-H1…H4) |
| Next | **C2 sidetab** |

---

## Studio login — **LOCKED** (owner QC 2026-10-01)

Full lock doc: [`OPS-STUDIO-LOGIN-LOCK.md`](./OPS-STUDIO-LOGIN-LOCK.md). Post-login passes: [`OPS-POST-LOGIN-UI-PASSES.md`](./OPS-POST-LOGIN-UI-PASSES.md).

| Rule | Detail |
|---|---|
| Student `/login` | **Students only** — staff accounts rejected (403 + signOut) |
| Studio `/studio/login` | **SA / Admin / Mentor / Staff only** — students rejected **on Studio** (403 + signOut + form error) |
| Existing student session on Studio | **Sign out**, stay on `/studio/login`, show error — **never** bounce to student frontend |
| After Studio login | **Direct to `/ops`** — no intermediate page |
| Unauthenticated `/ops` | Redirect `/studio/login?redirect=%2Fops` |
| Legacy `?surface=operations` | Redirects to `/studio/login` |
| Backend data (this gate) | **Read-only** — existing Auth/`staff_profiles` used only to verify staff vs student; no flush |

Preview: [http://localhost:7000/studio/login](http://localhost:7000/studio/login)

---

## OPS UI SCOUT — dashboard landing (2026-09-30)

### WHAT

| Source | Structure |
|---|---|
| **Screenshot / v2 dashboard** | Sidebar: Dashboard · Notifications · Activity · Operations (Students/Targets/Team) · CMS groups · Admin Panel. Header: search · bell · profile. Main: KPI cards · growth chart · recent notifications · upcoming events · latest activity · quick actions |
| **Current `/ops` after Pass 1** | Grouped shell: primary Scoreboard/Notifications/Activity · Operations (Students/Targets/Team with lock when no permission) · CMS Creating/Editing **Soon** deferred · Admin Panel (User Management / Permissions SA-only, Edit Profile). Header: search · bell · name+role · avatar menu (My Profile / Change Password / Logout). Main: unchanged scoreboard (Pass 2) |
| **Gap remaining** | Main dashboard widgets vs screenshot (Pass 2). User Management / Permissions deep UI still `/ops/team` interim. CMS still deferred |

### WHY

- Early Ops shell used flat shadcn-ish nav; owner screenshots want **grouped** Ops / CMS / Admin.
- CMS Payload not installed — show deferred “Soon”, do not invent CMS screens.
- Scoreboard label kept (tests + same intent as screenshot “Dashboard”).

### HOW — Pass 1 DONE (shell)

1. Grouped nav + locks + CMS deferred badges + Admin Panel — **DONE**  
2. Brand → Purple Guide Study — **DONE**  
3. Header profile chip + Zoho-like account menu — **DONE**  
4. Owned CSS under `.ops-nav-*` — **DONE**  
5. Pass 2 dashboard main — **waiting next GO AHEAD**

### NOT IN PASS 1

- No Payload install  
- No dashboard main restyle  
- No inventing KPI trends  
- No TanStack  

---

## Shell readings (Pass 1 — interim until chrome C4 LOCK)

| Token / area | Pass 1 reading | Status |
|---|---|---|
| Sidebar width | 240px / `ops:w-64` | Interim — restyle under C2 |
| Brand | PGS · Purple Guide Study | Keep |
| Nav groups | Scoreboard · Ops · CMS Soon · Admin | Keep IA; visual C1–C2 |
| Topbar | search · bell · name+role · menu | Restyle C1 |
| Marker | `data-ops-shell-pass="1"` | Becomes chrome LOCK marker at C4 |

**Canon for chrome:** [`OPS-STAFF-DESIGN-LANGUAGE.md`](./OPS-STAFF-DESIGN-LANGUAGE.md) — chrome-first; Studio login untouched.


---

## UI CHECK PASS — shell (Pass 1)

| Band | Check | Pass? |
|------|--------|-------|
| Desktop ~1440 | Grouped sidebar + header profile chip structure | **ENGINEERING** — owner Preview QC required |
| Narrow ops | Menu button opens same grouped nav | **ENGINEERING** — owner Preview QC required |
| Data | No fake % on shell | **PASS** |
| A11y | Nav landmark; locked/deferred have sr-only text; account menu labeled | **PASS** (smoke) |
| Automated a11y | NOT RUN this gate | NOT RUN |

**Owner Preview:** open `/ops` logged in as Super Admin and as Mentor — confirm groups, locks, CMS Soon, Admin Panel visibility.

---

## Next pages (after owner shell QC)

1. **Pass 2** — dashboard main (real metrics only)  
2. My Profile screenshot parity  
3. User Management + permissions tree (beyond `/ops/team` interim)  

---

## History

| Date | Change |
|---|---|
| 2026-09-30 | Initial scout + readings |
| 2026-09-30 | **Pass 1 shell ADAPT** — grouped nav, locks, CMS deferred, profile chip/menu, owned CSS |
| 2026-09-30 | **L1 Studio login** — `/studio/login` screenshot UI; staff-only; direct `/ops`; student `/login` reserved |
| 2026-10-01 | **DASH1** — `/ops` scoreboard + analytics visual restyle (owner screenshots); drag pager kept; no fake % |
| 2026-10-01 | **DASH1 LOCKED** (owner QC) — [`OPS-DASHBOARD-LOCK.md`](./OPS-DASHBOARD-LOCK.md) |

**Owner Preview:** `/ops` Dashboard **LOCKED** — do not restyle without a new gate.
