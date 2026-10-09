# Ops Student Registry — STU1 (owner GO AHEAD 2026-10-02)

Living lock after owner Preview QC. **LOCKED** (owner QC 2026-10-02).

Companions: [`OPS-POST-LOGIN-UI-PASSES.md`](./OPS-POST-LOGIN-UI-PASSES.md) · [`OPS-LOCKED-PAGES.md`](./OPS-LOCKED-PAGES.md) · RB-01 · `pgs-student-ops`

| Item | Value |
|---|---|
| Pass | **STU1** |
| Status | **LOCKED** (owner QC passed) |
| URL | **`/ops/students`** (rewrite → `/admin/students`) |
| Visual | Owner Student Registry screenshot · Ops blue chrome · owned CSS |
| Height | Shell **100dvh** · panel fills body · **table scrolls inside** · pagination pinned |
| Pagination | **10** per page (`REGISTRY_PAGE_SIZE`) |
| KPIs | Real scoreboard aggregates only (no fake +N trends) |
| Header CTA | **Premium & mentor controls** (Ops blue) → `/admin/access` when `premium.manage` |
| Scope | Existing registry RPC + mentor scope unchanged |
| Deferred | Row checkboxes bulk select · invent CRM fields · per-student workspace restyle · **Save/Reset custom views UI removed** |
| Mentor dialog | **STU1-M1 LOCKED** (owner QC 2026-10-02) — Assign / Change / Unassign modal · Ops blue · TYPE18 ≥18px · same `/api/staff/assignments` |
| View as Student | **VAS1 LOCKED** (owner QC 2026-10-02) — new tab only · no Ops banner · Assign/Change mentor stay on Ops · no Exit · cookie TTL · **VAS1-WRITE** staff Desk/Ops writes stay live with cookie ([`VAS1-WRITE-LOCK.md`](./VAS1-WRITE-LOCK.md)) |

**Preview QC:** [http://localhost:7000/ops/students](http://localhost:7000/ops/students)
