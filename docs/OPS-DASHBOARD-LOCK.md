# Ops Dashboard / Scoreboard — LOCKED (owner QC 2026-10-01)

**Do not restyle or rewire the `/ops` first page** (Scoreboard + Analytics + Catalog) unless the owner opens a new dashboard body gate.

Companions: [`OPS-POST-LOGIN-UI-PASSES.md`](./OPS-POST-LOGIN-UI-PASSES.md) · [`OPS-LOCKED-PAGES.md`](./OPS-LOCKED-PAGES.md) · [`OPS-DASHBOARD-UI-READINGS.md`](./OPS-DASHBOARD-UI-READINGS.md) · [`OPS-STAFF-DESIGN-LANGUAGE.md`](./OPS-STAFF-DESIGN-LANGUAGE.md) · [`OPS-FOOTER-OVERFLOW-LOCK.md`](./OPS-FOOTER-OVERFLOW-LOCK.md) (drag dock)

| Item | Locked value |
|---|---|
| Public URL | **`/ops`** (rewrite → `/admin`) |
| Pass | **DASH1** + **DASH2** (Analytics/Catalog card themes) |
| Analytics cards | **DASH2 LOCKED** · white cards · pastel icon chips · CRM stage bars · dashed empty tags · Catalog/CMS themed |
| Title | **Scoreboard** eyebrow · Welcome back · real lead copy |
| KPI cards | Real scoreboard metrics only · **Open view** · owned CSS · no fake % / MoM trends / sparklines as truth |
| Attention | **Premium awaiting mentor** banner (real attention metric) |
| Below fold | Join trend · Premium composition · Assignment coverage · Recent activity (scope-shaped) |
| Analytics + Catalog | Existing analytics loader · period form · Catalog + CMS pages counts |
| Drag | Floating **◀ ⠿ ▶** page dock **kept** (`OpsProductMain`) — do not remove |
| Unwanted | **No** “Current state” chip on Scoreboard welcome (removed after QC) |
| Hostinger leak | Ops body `section` padding reset — do not reintroduce `style.css` `section { padding-top: 130px }` |
| Body type floor | **≥18px** — TYPE18 |
| Backend | Existing scoreboard + analytics contracts — **no invent metrics** |
| Header / sidetab | Stay LOCKED (C1 / C2) — not part of this body lock |

**Preview QC:** [http://localhost:7000/ops](http://localhost:7000/ops)

**Owner refs:** [`public/preview/ops-scoreboard-by-role/owner-target-*`](../public/preview/ops-scoreboard-by-role/)
