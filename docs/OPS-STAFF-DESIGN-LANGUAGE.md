# PGS Staff design language — chrome first (living)

Owner draft **2026-10-01** (Opus proofread applied). Screenshots: login · dashboard · profile · user management · permissions · roles · planning board.

**Authority (highest → lowest for post-login chrome):**  
Owner decision → **owner Ops screenshots** (design language until owner says otherwise) → this design language doc → **existing Pass 1 shell** (restyle/re-QC, not rebuild from zero) → Reference Bank.

**Studio login is OUTSIDE this chrome and stays LOCKED** — [`OPS-STUDIO-LOGIN-LOCK.md`](./OPS-STUDIO-LOGIN-LOCK.md). Accent/chrome choices **do not** restyle `/studio/login` unless the owner opens a **new** login gate.

**Companions:** [`OPS-POST-LOGIN-UI-PASSES.md`](./OPS-POST-LOGIN-UI-PASSES.md) · [`OPS-DASHBOARD-UI-READINGS.md`](./OPS-DASHBOARD-UI-READINGS.md) · `pgs-ops-backend-ui-scout` · `pgs-reference-first-multi-agent` · CMS: Payload RB-09/10 (`docs/OPS-CMS-DEPLOYMENT.md`, `pgs-cms`)

**UI stack:** owned CSS (owner 2026-09-30) — not shadcn-as-product-skin.

---

## Screenshot design language — **LOCKED** (owner 2026-10-01)

Until the owner says otherwise, **Ops / staff post-login UI** (header · sidetab · body cards) follows the **owner screenshots / planning gallery**, not invented SaaS purple chrome.

| Rule | Locked value |
|---|---|
| Visual authority | Owner screenshots (header crop, dashboard v2, profile, user mgmt) |
| Header type floor | **18px minimum** for all header text (brand, search, name, role) |
| Sidetab type floor | **18px minimum** for nav labels, group summaries, stub badges (owner QC 2026-10-01) |
| **Body type floor** | **18px minimum** for all Ops body pages (not header; sidetab already ≥18px) — **TYPE18** owner 2026-10-02 |
| Header brand | Grad-cap line icon + **PGS** + “Purple Guide Study” |
| Chrome brand color | **WS-CHROME-1 (2026-10-07):** Studio purple `#6b3fa0` (was screenshot blue `#2f6fed`) — see [`WS-CHROME-LOCK.md`](./WS-CHROME-LOCK.md) |
| Studio login | Stays **purple** LOCKED — Ops shell now **matches** Studio palette; do not restyle `/studio/login` |
| Stack | Owned CSS + semantic HTML — not shadcn-as-product-skin |
| Features ≠ finish | Matching widgets is not enough — match spacing, type, color, borders |

Agents must not re-ask “purple vs screenshot blue” for Ops chrome until the owner opens a new gate.

---

## Product frame (uniform)

```text
┌──────── sidetab ──────────────┬──────── header ──────────────────────────┐
│ Brand PGS                     │ Search · Bell · Name+Role · Avatar menu  │
│ Nav (permission-shaped)       ├──────────────────────────────────────────┤
│                               │ BODY (only this changes by route/role)   │
│ Admin Panel (permission-gated)│                                          │
├───────────────────────────────┴──────────────────────────────────────────┤
│ FOOTER — owner: minimal copy OR none (prefer none until copy exists)     │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Owner decisions — **LOCKED C0** (2026-10-01 defaults)

| # | Decision | Locked value |
|---|---|---|
| D1 | Ops chrome accent | **Screenshot blue** for brand/chrome (`#2f6fed`); Studio login purple unchanged |
| D2 | Card shadow | **Soft** for chrome/body cards |
| D3 | Footer | **Thin shell rail** (C3-fix) — not marketing footer; body pager/actions stay in cards |
| D4 | CMS entry | **Sidebar** CMS group |
| D5 | Search placeholder | Owner screenshot copy when present; else real staff search capability |
| D6 | Role pills | Official keys only (`super_admin` / `admin` / `mentor` / `read_only_staff`) |
| D7 | Permissions UX | Role-first (suggest); per-user later |
| D8 | Profile multi email/phone | **Single** until owner expands model |
| D9 | Header type floor | **18px min** (owner 2026-10-01) |
| D9b | Sidetab type floor | **18px min** (owner QC after C2) |
| D9c | Body type floor | **LOCKED** **18px min** for all Ops body pages (not header; sidetab already ≥18px) — **TYPE18** owner 2026-10-02 |
| D10 | Ops UI look | **Owner screenshots** until owner says otherwise |
| D11 | Staff header/profile avatar frame | Frontend **card-box / premium identity**: **68×83** (header scaled), **radius 10px**, shadow `0 1px 4px rgba(26,15,1,.12)` |

---

## Owner decisions required (historical — superseded by C0 lock)

~~Reply with picks before / with `GO AHEAD C1`:~~ **C0 locked to defaults above.**

| # | Decision | Options | Default if silent |
|---|---|---|---|
| D1 | Ops chrome accent | Blue (screenshots) · Purple (Studio login) | **Purple** for Ops chrome; Studio login unchanged |
| D2 | Card shadow | Soft (dashboard shots) · Hard 8px offset (Studio card) | Soft for chrome/body cards |
| D3 | Footer | Minimal staff line · **None** | **None** |
| D4 | CMS entry | Sidebar CMS group (current) · Ops\|CMS top switch (planning board) | **Sidebar group** |
| D5 | Search placeholder | Match real staff search · Defer broader copy | Match current search capability |
| D6 | Role pills | Map official keys: `super_admin` / `admin` / `mentor` / `read_only_staff` — no inventing “Staff” label without owner OK | Official keys only |
| D7 | Permissions UX order | Role templates first · Per-user tree first | Role-first (suggest); per-user = later / exceptions |
| D8 | Profile email/mobile multi-row | Screenshot lists · Keep single profile fields until owner OK | **Single** until owner expands data model |

---

## Design tokens (desktop — measure exact hex on C1)

| Token | Working value | Note |
|---|---|---|
| Page bg | `#F7F8FB` | Align Studio page family |
| Card | `#FFFFFF` + border `#E6E8EE` | Radius ~12px |
| Ink | `#1F2430` | Titles |
| Muted | `#5B6575` | Meta · ≥4.5:1 on page bg |
| Accent | Owner D1 | Active nav tint + primary buttons |
| Success pill | Green text + light green bg | Active / Primary |
| Danger | `#B42318` | Logout · Inactive |
| Type | Roboto Ops · **header + sidetab + body ≥18px** (TYPE18) | Chrome floors owner-locked |
| Brand | `#2F6FED` + muted subtitle | Screenshot blue — not Studio purple |
| Icons | Lucide | Grad-cap brand; outline bell |

Contrast/a11y **required before C4 LOCK** (not optional): accent tint, role pills, muted text, Logout red, keyboard sidetab, 200% zoom, visible focus.

---

## Chrome = restyle + lock existing Pass 1 shell

Pass 1 shell already exists (`admin-shell`, readings). **C1–C4 = redesign/owned-CSS pass + QC**, then **replace** Pass 1 “engineering” readings with **chrome LOCKED**.

### Header
Search (wide white field, screenshot copy) · Bell (badge only if real unread) · Avatar · **first name** + role (**≥18px**) · chevron menu (full display name inside): My Profile · Change Password · Logout (`surface=studio` → `/studio/login`). No Ask PGS in topbar unless owner re-opens.

### Sidetab
Authority: [`OPS-SIDETAB-SCOUT.md`](./OPS-SIDETAB-SCOUT.md) (**corrected** crop 2026-10-01).

Brand · Dashboard · Notifications · Activity · **Operations ▾** (Students/Targets/Team) · **CMS ▾** Creating/Editing · Admin Panel · User Management · Edit Profile.  
(**Permissions** sidetab removed 2026-10-02 — Track R PARKED.)  
**Live if backend exists; else stub + MD log.** User Management = [`OPS-USER-MANAGEMENT-LOCK.md`](./OPS-USER-MANAGEMENT-LOCK.md).

**Single domain:** one staff shell for Ops + CMS + Student Operations.

### Footer / overflow (C3 + C3-fix LOCKED)
Authority: [`OPS-FOOTER-OVERFLOW-LOCK.md`](./OPS-FOOTER-OVERFLOW-LOCK.md).

- Shell footer: **thin rail** (quiet edge)
- Scroll: full-bleed nested main; **scrollbar hidden**
- Body sleeve: **80%** of post-sidebar width · **40px** under header
- Section tabs allowed on long multi-block pages
- Table pager + form actions = body card footers

### Body slot
Changes only after chrome LOCK (C4). Body pages may use C3 overflow + tabs when building content.

---

## Build order

| Step | Work |
|---|---|
| 0 | Studio login **LOCKED** |
| **C0** | This doc + owner decisions D1–D8 |
| **C1** | Header restyle (owned CSS) |
| **C2** | Sidetab restyle |
| **C3** | Footer or confirm none |
| **C4** | Desktop + a11y QC → **chrome LOCKED** |
| Body | A / P / B / R tracks |
| CMS | Payload **study** → gates CMS-0…P when Ops ready — **not** “C1 install” naming |

**Medusa.js:** not in Reference Bank. Do **not** study/adopt until owner amends the bank. No PGS commerce reason today.

**DASH1 scoreboard body:** **LOCKED** (owner QC 2026-10-01) — [`OPS-DASHBOARD-LOCK.md`](./OPS-DASHBOARD-LOCK.md).

---

## Suggest-only (not auto-adopt)

- Shell footer = **thin rail** (C3-fix); no marketing strip.  
- Role-first permissions before per-user trees.  
- Keep CMS in sidebar unless owner wants top Ops|CMS switch.

---

## Gate log

| Date | Item | Result |
|---|---|---|
| 2026-10-01 | Design language · Opus REQUEST CHANGES applied | Ready for owner |
| 2026-10-01 | **C0** defaults D1–D8 locked | **LOCKED** |
| 2026-10-01 | **C1** header restyle | **LOCKED** — see [`OPS-HEADER-LOCK.md`](./OPS-HEADER-LOCK.md) |
| 2026-10-01 | Screenshot design language | **LOCKED** until owner says otherwise (D1/D9/D10) |
| 2026-10-01 | **C2** sidetab | **LOCKED** — [`OPS-SIDETAB-LOCK.md`](./OPS-SIDETAB-LOCK.md) · type floor 18px |
| 2026-10-01 | **C3** footer / overflow / scroll | **LOCKED** — rail + Motion body scroll/dock · [`OPS-FOOTER-OVERFLOW-LOCK.md`](./OPS-FOOTER-OVERFLOW-LOCK.md) |
| 2026-10-02 | **TYPE18** body type floor | **LOCKED** **18px min** on Ops body (header unchanged) · D9c |
