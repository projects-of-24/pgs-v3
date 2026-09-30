---
name: pgs-admin-ops
description: >-
  PGS Admin/Operations staff cockpit: one staff id, permission+scope (not
  company-wide dump), scoreboard overview, Premium grant/revoke, Team, search,
  Reference Bank only. Use when planning or wiring /ops, /admin/access, People
  & Access, scoreboard, staff search, or Admin overview gaps.
---

# PGS Admin / Operations (locked pattern)

Owner lock **2026-09-21**. Planning-first; build only with named `GO AHEAD`.

**Living MDs:**

| Doc | Role |
|---|---|
| [`docs/PGS-ADMIN-OPS.md`](../../docs/PGS-ADMIN-OPS.md) | Stack · bank · hard locks · entry URLs |
| [`docs/SITE-PLAN-ADMIN-INVENTORY.md`](../../docs/SITE-PLAN-ADMIN-INVENTORY.md) | Full screen inventory · Hostinger map · gaps |
| [`docs/SITE-PLAN-01-ADMIN-ROLES.md`](../../docs/SITE-PLAN-01-ADMIN-ROLES.md) | Roles · domains ≠ separate logins |
| [`docs/SITE-PLAN-REFERENCES-AND-WIRING.md`](../../docs/SITE-PLAN-REFERENCES-AND-WIRING.md) | Wiring + lag honesty |

Series index: [`docs/SITE-BACKEND-PLAN.md`](../../docs/SITE-BACKEND-PLAN.md) → CMS · **Student Ops LOCKED** (`pgs-student-ops`).

---

## Product picture (do not invent)

```text
Admin / Ops = “How is PGS doing?” + jump to work
  ONE staff Auth id (not ops_users / cms_users)
  → permission keys + scope (org vs assigned vs restricted)
  → Scoreboard / Search / Ask PGS / Team / Targets / Activity
  → Premium grant-revoke on /admin/access (premium_entitlement — NOT applications queue)
  → Deep links to CMS + Student Ops (same cookie)
```

**Shared login ≠ company-wide data.** Mentors see assigned students only. Enforce server + RLS, never hide-in-React.

**REJECT:** PurplePremium applications as entitlement truth · separate CMS/Ops passwords · fake KPIs · dumping Twenty/Payload/Chatwoot into the repo.

---

## Locked stack (build here)

| Layer | Choice |
|---|---|
| App | Next.js App Router · React · TypeScript · Vercel |
| Auth / DB | Supabase Auth · Postgres · RLS · RPCs |
| Ops UI | shadcn/ui · Lucide · TanStack Table · Recharts |
| Forms | React Hook Form + Zod |

---

## Reference Bank only (Admin)

| Bank | Feel | OSS study | PGS use |
|---|---|---|---|
| **RB-02** | GitHub Orgs/Teams | `supabase/supabase` | Roles · Team · least privilege |
| **RB-01** | HubSpot CRM | `twentyhq/twenty` | Registry · search · filters |
| **RB-03** | HubSpot Reporting | `PostHog/posthog` | Scoreboard KPIs · real metrics |
| **RB-04** | Linear Inbox | `chatwoot/chatwoot` | Staff notifications |
| **RB-05** | Intercom | Chatwoot | Comments / awaiting reply |
| **RB-07** | Linear | `makeplane/plane` | Attention / targets lists |
| **RB-13** | Sentry | `getsentry/sentry` | Lag / traces (later) |

Patterns only. Full catalog: `.cursor/rules/pgs-v3-reference-bank.mdc`.

Hostinger screenshots: `docs/site-plan-refs/hostinger-admin-*.png`.

---

## Key URLs

| Surface | URL |
|---|---|
| Staff login | `/login?surface=operations` |
| Scoreboard home | `/ops` |
| Students registry | `/ops/students` |
| Student Ops | `/ops/students/[id]` |
| Team / invite | `/ops/team` · `/ops/team/invite` |
| Premium + mentor | `/admin/access` |
| Catalog / content | `/admin/catalog` · `/admin/content` (CMS batch) |
| Leads | `/admin/leads` |

Shell: `src/components/admin-shell.tsx` · scope: `src/lib/operations-authorization.ts`.

---

## Agent checklist

- [ ] Read `docs/PGS-ADMIN-OPS.md` + inventory gaps (§0c–0d)  
- [ ] Propose → wait for `GO AHEAD` (no silent Admin redesign)  
- [ ] Bank row only — no random GitHub  
- [ ] Scope: mentor ≠ org dump  
- [ ] Premium = `premium_entitlement` via `/admin/access`  
- [ ] CMS depth → CMS batch; per-student depth → Student Ops batch  
- [ ] Update living MD after a gate  
