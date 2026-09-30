# PGS Admin / Operations — living map

**Skill:** `.cursor/skills/pgs-admin-ops/SKILL.md`  
**Full inventory + Hostinger QC:** [`SITE-PLAN-ADMIN-INVENTORY.md`](./SITE-PLAN-ADMIN-INVENTORY.md)  
**Roles:** [`SITE-PLAN-01-ADMIN-ROLES.md`](./SITE-PLAN-01-ADMIN-ROLES.md)  
**Series:** [`SITE-BACKEND-PLAN.md`](./SITE-BACKEND-PLAN.md) → CMS · **Student Ops LOCKED:** [`PGS-STUDENT-OPS.md`](./PGS-STUDENT-OPS.md)

Owner lock **2026-09-21**. No product build without named `GO AHEAD`.

---

## What Admin is

Staff cockpit: **how PGS is working** + jump to work — roles, overview KPIs, Premium grant/revoke, targets, search, activity, period joins, catalog/lead counts, enquiries.

```text
ONE staff Auth id
  → permissions + scope (org | assigned | restricted)
  → /ops scoreboard · search · Ask PGS · team · targets · activity
  → /admin/access premium_entitlement grant/revoke
  → same cookie → CMS (/admin/catalog · content) · Student Ops (/ops/students/[id])
```

**Shared login ≠ company-wide data.** Mentor = assigned only. Server + RLS.

---

## Locked stack

| Layer | Choice |
|---|---|
| App | Next.js App Router · React · TypeScript · Vercel |
| Auth / DB | Supabase Auth · Postgres · RLS · RPCs |
| Ops UI | shadcn/ui · Lucide · TanStack Table · Recharts |
| Forms | React Hook Form + Zod |

---

## Reference Bank (GitHub / apps — patterns only)

| Bank | Mature app | OSS | Use for |
|---|---|---|---|
| **RB-02 ACCESS** | GitHub Orgs/Teams | [`supabase/supabase`](https://github.com/supabase/supabase) | Roles · Team · least privilege |
| **RB-01 CRM** | HubSpot CRM | [`twentyhq/twenty`](https://github.com/twentyhq/twenty) | Registry · search · filters |
| **RB-03 SCOREBOARD** | HubSpot Reporting | [`PostHog/posthog`](https://github.com/PostHog/posthog) | KPIs · real metrics only |
| **RB-04 NOTIFS** | Linear Inbox | [`chatwoot/chatwoot`](https://github.com/chatwoot/chatwoot) | Staff inbox |
| **RB-05 COMMENTS** | Intercom | Chatwoot | Awaiting-reply / threads |
| **RB-07 REVIEW** | Linear | [`makeplane/plane`](https://github.com/makeplane/plane) | Attention / targets |
| **RB-13 OBS** | Sentry | [`getsentry/sentry`](https://github.com/getsentry/sentry) | Lag / traces later |

**CMS next batch:** RB-09 / RB-10 · Contentful feel · [`payloadcms/payload`](https://github.com/payloadcms/payload).

**REJECT:** random repos · dump OSS into pgs-v3 · fake charts · `ops_users` / `cms_users` · Premium **applications** as entitlement truth.

Full bank: `.cursor/rules/pgs-v3-reference-bank.mdc`.

---

## Key surfaces

| Surface | URL | Notes |
|---|---|---|
| Staff login | `/login?surface=operations` | Not student `/login` |
| Scoreboard | `/ops` | Overview home |
| Registry | `/ops/students` | |
| Student Ops | `/ops/students/[id]` | Depth = [`PGS-STUDENT-OPS.md`](./PGS-STUDENT-OPS.md) |
| Team | `/ops/team` · invite | Invite = Super (`roles.manage`) |
| Premium + mentor | `/admin/access` | `POST /api/staff/premium` · assignments |
| Catalog / CMS | `/admin/catalog` · `/admin/content` | **CMS batch** |
| Leads | `/admin/leads` | |
| Activity | `/ops/activity` | `audit_events` |

Hostinger refs: [`site-plan-refs/`](./site-plan-refs/).

---

## Hard locks

1. One staff identity · multiple domains (Ops · CMS · Student Ops).  
2. Scope + permissions every time — mentor ≠ org dump.  
3. Premium = `premium_entitlement` (grant/revoke), not PurplePremium applications queue.  
4. Overview gaps / feature toggles = inventory §0c–0d — propose before build.  
5. Steal bank patterns only; implement on locked stack.

---

## How to continue

| You say | What happens |
|---|---|
| QC Admin inventory | Edit [`SITE-PLAN-ADMIN-INVENTORY.md`](./SITE-PLAN-ADMIN-INVENTORY.md) |
| `READY ADMIN` / move to CMS | Use [`PGS-CMS.md`](./PGS-CMS.md) · [`SITE-PLAN-02-CMS.md`](./SITE-PLAN-02-CMS.md) · skill `pgs-cms` |
| `GO AHEAD` Admin gate | One Ops build gate only (`pgs-backend-phase-wire`) |
