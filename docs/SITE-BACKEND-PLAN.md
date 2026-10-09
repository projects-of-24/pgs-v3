# Whole-site backend plan (planning only — no build yet)

**Handover (ELI5, all domains):** [`BACKEND-HANDOVER.md`](./BACKEND-HANDOVER.md) — start a new backend / full-stack developer here.

**Owner lock 2026-09-21:** No product code until every batch in this series has a rough plan and the owner decides how to build.

Steal from certified V3 + Reference Bank. Do not invent second identity, Ops, CMS, or comment systems.

## Batch order (fixed)

| Batch | Doc | Topic | Status |
|---|---|---|---|
| **01** | [`SITE-PLAN-01-ADMIN-ROLES.md`](./SITE-PLAN-01-ADMIN-ROLES.md) | Admin / Super Admin / Mentor / Read-only — identity, permissions, People & Access | **DRAFT** — start here |
| **01-VIS** | [`SITE-PLAN-01-EXECUTION-VISUAL.md`](./SITE-PLAN-01-EXECUTION-VISUAL.md) | Screenshot storyboard + roles execution gates (E0–E4) | **DRAFT** |
| **ADMIN** | [`SITE-PLAN-ADMIN-INVENTORY.md`](./SITE-PLAN-ADMIN-INVENTORY.md) · skill [`pgs-admin-ops`](../.cursor/skills/pgs-admin-ops/SKILL.md) · [`PGS-ADMIN-OPS.md`](./PGS-ADMIN-OPS.md) | Ops cockpit · bank · scopes · Premium grant/revoke | **LOCKED for series** — deepen with named GO AHEAD later |
| **02** | [`SITE-PLAN-02-CMS.md`](./SITE-PLAN-02-CMS.md) · [`PGS-CMS.md`](./PGS-CMS.md) · skill `pgs-cms` | CMS refs + detailed gates CMS-0…P | **DRAFT — owner QC** |
| **02b** | [`SITE-PLAN-02b-STUDENT-OPS.md`](./SITE-PLAN-02b-STUDENT-OPS.md) · [`PGS-STUDENT-OPS.md`](./PGS-STUDENT-OPS.md) · skill `pgs-student-ops` | Assigned home · tabs · comments/@helpers · Kanban import later | **LOCKED for series** — deepen with named GO AHEAD later |
| **02c** | [`SITE-PLAN-02c-STUDENT-PROFILE.md`](./SITE-PLAN-02c-STUDENT-PROFILE.md) · [`PGS-STUDENT-PROFILE.md`](./PGS-STUDENT-PROFILE.md) · skill `pgs-student-profile` | FB/IG-style Profile hub · field list · stream/year lock · sync feed/track/Ops | **PARKED findings** — reopen later · no UI until SP-0/SP-1 |
| **03** | [`SITE-PLAN-03-POPUPS.md`](./SITE-PLAN-03-POPUPS.md) · [`PGS-POPUPS.md`](./PGS-POPUPS.md) · skill `pgs-popups` | Popups in CMS · Zoho URL patterns · CMS table not Framer | **LOCKED for series** — deepen with named GO AHEAD later |
| **04** | `SITE-PLAN-04-OPERATIONS.md` | How Operations + Student Operations are done | Not started — may fold into Admin + 02b |
| **05** | `SITE-PLAN-05-SECURITY.md` | Security plan for this backend spine | Not started |

After **01→05** exist as rough plans → owner decides build gates (then `pgs-backend-phase-wire`: one `GO AHEAD` at a time).

## What this series is / is not

| Is | Is not |
|---|---|
| Honesty maps (EXISTS / TEMP / GAP / OWNER DECISION) | Migrations, RLS edits, UI builds |
| Connection maps (who → surface → permission → table) | Face-card pixel work |
| Reference Bank ADOPT / ADAPT / REJECT | Installing Payload / Twenty / new SaaS |
| Owner decision lists before any build | Silent “finish the backend” |

## Related living maps (do not replace)

- Face / catalog B\*: [`CATALOG-B-STAR.md`](./CATALOG-B-STAR.md) — **parked** until site plan rough idea exists  
- Events/courses templates: [`PURPLE-EVENTS-ARCHITECTURE.md`](./PURPLE-EVENTS-ARCHITECTURE.md)  
- Domain contracts: `.cursor/rules/pgs-v3-domain-contracts.mdc`  
- Identity detail: [`pgs-v3-architecture/04-identity-rbac-permission-model.md`](./pgs-v3-architecture/04-identity-rbac-permission-model.md)  
- **References + Ops wiring + lag honesty:** [`SITE-PLAN-REFERENCES-AND-WIRING.md`](./SITE-PLAN-REFERENCES-AND-WIRING.md)  
- **Full Admin/Ops inventory (QC bible):** [`SITE-PLAN-ADMIN-INVENTORY.md`](./SITE-PLAN-ADMIN-INVENTORY.md)  
- **Admin living map + skill:** [`PGS-ADMIN-OPS.md`](./PGS-ADMIN-OPS.md) · `.cursor/skills/pgs-admin-ops/SKILL.md`  
- **CMS batch (open):** [`SITE-PLAN-02-CMS.md`](./SITE-PLAN-02-CMS.md) · [`PGS-CMS.md`](./PGS-CMS.md)  
- **Student Ops batch:** [`SITE-PLAN-02b-STUDENT-OPS.md`](./SITE-PLAN-02b-STUDENT-OPS.md) · [`PGS-STUDENT-OPS.md`](./PGS-STUDENT-OPS.md) · skill `pgs-student-ops` — **LOCKED for series**  
- **Student Profile batch:** [`SITE-PLAN-02c-STUDENT-PROFILE.md`](./SITE-PLAN-02c-STUDENT-PROFILE.md) · [`PGS-STUDENT-PROFILE.md`](./PGS-STUDENT-PROFILE.md) · skill `pgs-student-profile` — **PARKED findings** (FB hub · lock · sync)  
- **Popups batch:** [`SITE-PLAN-03-POPUPS.md`](./SITE-PLAN-03-POPUPS.md) · [`PGS-POPUPS.md`](./PGS-POPUPS.md) · skill `pgs-popups` — **LOCKED for series**

**Owner lock (Batch 01):** staff work = **multiple domains** (CMS · Ops · Student Ops), **one staff id**. Public `/login` = students. Future concentrated student/guardian host (e.g. `feed.purpleguide.study`) = **deferred**.

## How we work each batch

```text
1. Scout current V3 + owner rules + Reference Bank (no invent)
2. Write DRAFT plan MD (this series)
3. Owner reads → edits decisions → marks batch READY / LOCKED
4. Next batch
5. After rough plans READY → owner picks first build gate
```

## Next

**03 Popups is LOCKED.**  
Draft **Batch 05 — Security** (or 04 if still needed), or name a first build gate.
