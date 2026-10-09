# PGS reference-first gates (living)

Owner lock **2026-10-01**. Skill: [`.cursor/skills/pgs-reference-first-multi-agent/SKILL.md`](../.cursor/skills/pgs-reference-first-multi-agent/SKILL.md).

Authority: **Owner → PGS Flow/Figma → V3 architecture → legacy evidence → Reference Bank** ([`pgs-v3-reference-bank.mdc`](../.cursor/rules/pgs-v3-reference-bank.mdc)). Bank never overrides RLS / RBAC / Phase 4D / `audit_events`.

## Why

Ops surface fixes shipped without enough ACCESS/session study (e.g. SA logout → public `/`). Gate: **tier → scout if A → expected output → GO AHEAD → code**. Opus review is **advisory** only.

## Scope tiers (summary)

- **A — Full gate:** new capability, auth/RBAC/session/redirect, schema/RLS/RPC, cross-module → scout + bank + propose  
- **B — Propose only:** approved-screen CSS/copy; single-file non-auth bugs → propose only  
- **Out:** student/public visual (Figma/legacy)

## Auth surfaces (product map)

| Actor | Sign-in | After success | Logout destination |
|---|---|---|---|
| Staff | `/studio/login` | `/ops` (safe `/admin` `/cms`) | **`/studio/login`** via server `surface: "studio"` |
| Student | `/login` | student app | **Owner decision required** (today API defaults `/`; do not invent “student home” without GO AHEAD) |

Logout contract (peer-reviewed):

- Client sends **`surface`**, never a freeform redirect path for post-logout.
- Server maps: `studio` → `/studio/login`; else → `/` (current default).
- Query `next` on `/logout` stays **cancel-link only** (e.g. Return to Operations).

Bank note: **RB-02 ACCESS** informs staff identity / least privilege; logout landing is a **session/surface subset**, not a full Orgs clone.

## Gate log

| Date | Gate | Bank | Opus | Owner | Result |
|---|---|---|---|---|---|
| 2026-10-01 | Skill + MD process | RB-02 session/surface subset | APPROVE | process locked | framework live |
| 2026-10-01 | SA logout → Studio | RB-02 session/surface subset | APPROVE (prior) | GO AHEAD | implemented — `surface:studio` → `/studio/login` |
| 2026-10-01 | Studio login LOCK | — | — | QC passed | frozen — see OPS-STUDIO-LOGIN-LOCK.md |
| 2026-10-01 | Post-login UI passes framework | RB-03 / RB-01+02 | — | — | OPS-POST-LOGIN-UI-PASSES.md |
| 2026-10-01 | Scoreboard **A1** KPI + header | RB-03 | — | GO AHEAD A1 | Body draft only — re-QC after chrome LOCK |
| 2026-10-01 | Staff design language + chrome-first | RB-02/03 | REQUEST CHANGES → fixed | C0+C1 GO AHEAD | C0 LOCK · C1 header DONE |
| 2026-10-01 | **UM2** Edit Permissions | RB-02 | APPROVE role-only | **GO AHEAD UM2** | Implemented — `/ops/admin/users/[id]/permissions`; Save = role via `/api/admin/staff`; no migration; UM3 overrides later |
| 2026-10-01 | **UM2b** Menu grants | RB-02 | — | **GO AHEAD UM2b** | `staff_nav_grants` + `/api/admin/staff/nav-grants`; clickable tree; shell filters nav; apply migration on connected DB |
| 2026-10-02 | **STU1** Student Registry | RB-01 | — | **GO AHEAD STU1** | Screenshot restyle · height fill · page size 10 · real scoreboard KPIs |
| 2026-10-02 | **ACC1** Premium & mentor Access | RB-02 | — | **GO AHEAD ACC1** | New 2×2 Access UI · product shell · history 10/page |
