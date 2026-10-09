# PGS V3 — Operations & CMS architecture and deployment

Owner-facing documentation for the staff **Operations** surface and the **CMS** surface (Payload).  
Student/public frontend, Guardian Portal, and Premium entitlement stay outside this doc except where auth boundaries intersect.

**Status:** Architecture + deployment plan. Payload is **not installed yet**. Ops exists on Next.js + Supabase today.  
**Related:** Reference Bank RB-09 / RB-10 / RB-11 (`payloadcms/payload`), `docs/pgs-v3-architecture/10-cms-and-catalog-architecture.md`, `docs/pgs-v3-implementation/engineering-gates-phases.md`.

---

## 1. Product split (two surfaces, one identity)

| Surface | Purpose | Who | Stack |
|---|---|---|---|
| **Operations (`/ops`)** | Scoreboard, students, targets, team, notifications, activity, staff profile, Super Admin user/permissions | Super Admin, Admin, Mentor, Staff | Next.js App Router + shadcn + **Supabase Auth/RLS** |
| **CMS (`/cms`)** | Create/edit catalog & content: courses, events, webinars, universities, testimonials, media | Staff with CMS permissions | **Payload CMS** on Next.js + Postgres (Supabase) |
| **Student / Public** | Owner Figma product | Students / anonymous | Retained frontend — **not** Payload |

```text
ONE Auth identity (Supabase)
        │
        ├─► Operations UI + Ops APIs     (custom Next.js)
        └─► CMS UI + CMS APIs            (Payload at /cms)  ← later install
```

**Rules**

- Students **cannot** use Ops or CMS login.
- Premium is an **entitlement**, not a staff role.
- Do **not** create `ops_users` / `cms_users` tables.
- Payload **Users collection must not replace** Supabase staff login.
- Layout/Figma for public pages stay in code; CMS edits **typed content slots**, never a free page builder.

---

## 2. Recommended stack

### Operations (now)

| Layer | Choice |
|---|---|
| Runtime | Next.js 16 App Router, React 19, TypeScript, pnpm, Node ≥ 22 |
| Auth / DB | Supabase Auth, Postgres, RLS, RPCs |
| Ops UI | **Screenshot-first** · semantic HTML · owned Ops CSS / CSS modules · Lucide if needed. Owner QC failed default shadcn look — do not default to shadcn theme (`pgs-ops-backend-ui-scout`) |
| Tables | Native `<table>` + server query params first; TanStack only if owner re-approves |
| Forms | Plain forms or RHF+Zod when complexity needs it |
| Charts | Recharts — **real metrics only** |
| Hosting | Vercel |
| Ops UI scout | Dashboard landing pilot readings: `docs/OPS-DASHBOARD-UI-READINGS.md` |

### CMS (later — Payload)

| Layer | Choice |
|---|---|
| CMS framework | [Payload](https://github.com/payloadcms/payload) (`payload`, `@payloadcms/next`) |
| DB adapter | `@payloadcms/db-postgres` (same Supabase Postgres project; carefully scoped schemas/tables) |
| Rich text | `@payloadcms/richtext-lexical` **only** where PGS content requires it |
| Admin path | **`/cms`** (never collide with Ops `/admin` ↔ `/ops`) |
| Auth bridge | Supabase session → Payload `access` functions |

### Explicit rejects

- Payload Auth as Ops login  
- Mongo as primary DB  
- Payload owning students / scoreboard / mentor assignments  
- Generic drag-and-drop page builder  

---

## 3. Login (Operations + CMS entry)

### What to use

| Item | Implementation |
|---|---|
| URL | `/login?redirect=%2Fops&surface=operations` |
| UI | Custom Ops login (preview gallery: `/preview/ops-staff-plan/v2/step-1-login.jpg`) |
| API | `POST /api/auth/login` → Supabase `signInWithPassword` |
| After login | Staff context required; otherwise reject / send away from Ops |
| Roles | `super_admin`, `admin`, `mentor`, `read_only_staff` |
| CMS entry | Same staff session; sidebar CMS links only if `cms.*` (or equivalent) permission |

### Flow

```text
Staff opens Ops login
  → Supabase authenticates email/password
  → Load staff_profiles + role + permissions
  → If not staff → block Ops/CMS
  → If staff → /ops shell
  → If cms permission → CMS menu enabled → /cms (Payload)
```

Lab fixtures (local/preview only; never production):

- Emails such as `pgs-v3-fixture+super-admin@example.test`
- Password from `PGS_PREVIEW_FIXTURE_PASSWORD` in local env
- Gate: `PGS_PREVIEW_FIXTURES=I_UNDERSTAND_PREVIEW_ONLY`

---

## 4. APIs — who owns what

| Domain | Path family | Owner | Notes |
|---|---|---|---|
| Auth | `/api/auth/*` | Next + Supabase | Login, logout, password flows |
| Ops staff | `/api/staff/*` | Next + RLS | Search, students, preview, assignments |
| Ops admin | `/api/admin/*` (non-CMS) | Next + RLS | Profile, team, scoreboard-related |
| Existing typed CMS | `/api/admin/cms*`, `/api/admin/content/*`, catalog | Next today | Retire/overlap only after Payload migration gate |
| Payload CMS | Payload REST/GraphQL under `/cms` (and Payload API routes) | Payload | Collections only |
| Audit | `audit_events` | DB / trusted server | Immutable who-did-what |
| Notifications | Ops notification domain | Next + DB | Not Payload |

**Rule:** Frontend visibility ≠ security. Every mutation checks session + permission + scope server-side / RLS.

---

## 5. UI ownership

| Screen | UI home |
|---|---|
| Staff login | Custom Next.js — **not** Payload |
| Ops shell / scoreboard / students / targets / team | Custom `/ops` (`AdminShell`) |
| My Profile (Zoho-style) | Custom Ops |
| User Management + permissions tree | Custom Ops — Super Admin only |
| CMS Creating / Editing menus | Ops sidebar chrome → opens **Payload** screens at `/cms` |

Planning previews: [http://localhost:7000/preview/ops-staff-plan/v2/](http://localhost:7000/preview/ops-staff-plan/v2/)

---

## 6. Payload CMS — folder and collections plan

### Target App Router layout

```text
src/app/
  (payload)/          # Payload admin + API  → public URL prefix /cms
  admin/              # Ops (rewrites from /ops)
  login/
  api/auth/
  api/staff/
  api/admin/          # Ops + legacy CMS until migrated
payload.config.ts
```

### Sidebar CMS menu → collections

| Menu | Collection | Publish model |
|---|---|---|
| Courses | `courses` | draft / published |
| Events | `events` | draft / published |
| Webinar | `webinars` or typed event | draft / published |
| Universities | `universities` | draft / published |
| Testimonial | `testimonials` | draft / published |
| Pic / Video | `media` | upload + metadata |

Public/student pages continue to use **page-specific React** + published data — Payload does not redesign Figma layouts.

### CMS implementation gates

| Gate | Work |
|---|---|
| **C0** | Owner locks this document |
| **C1** | Spike: install Payload at `/cms`, empty config, no Auth takeover |
| **C2** | Bridge Supabase staff → Payload `access` |
| **C3** | First collection + draft/publish + preview |
| **C4** | Remaining collections + Ops sidebar live links |
| **C5** | Public read path; migrate off overlapping legacy admin CMS with owner OK |

---

## 7. Operations implementation gates (separate from Payload)

| Gate | Work |
|---|---|
| **W1** | Harden Ops login — staff only |
| **W2** | Shell header + permission-shaped nav (CMS deferred/disabled until C4) |
| **W3** | Scoreboard real metrics |
| **W4** | Profile edit |
| **W5** | Super Admin user list + permissions |

Do **not** start C1 until Ops W1–W2 are stable enough that `/admin` vs `/cms` paths are clear.

---

## 8. Environment variables

### Required for Operations (production)

| Variable | Role |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Browser-safe key |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only — never client |
| `AUTH_FLOW_SECRET` | Server flows (≥ 32 chars) |
| `RATE_LIMIT_HASH_SECRET` | Rate limit hashing |
| `PREMIUM_PURCHASE_WEBHOOK_SECRET` | Premium boundary (if enabled) |

### Preview / lab only (never production)

| Variable | Role |
|---|---|
| `PGS_PREVIEW_FIXTURES` | Must be exact gate string for fixture scripts |
| `PGS_PREVIEW_PROJECT_REF` | Non-local fixture safety |
| `PGS_PREVIEW_FIXTURE_PASSWORD` | Shared fixture password |
| `LOOPBOARD_LAB_*` / `PROGRESS_LAB_*` | Lab sandboxes only |

### Added when Payload CMS installs (C1+)

| Variable | Role |
|---|---|
| `PAYLOAD_SECRET` | Payload crypto secret (≥ 32 chars, unique) |
| `DATABASE_URL` or Payload Postgres connection | Adapter connection (prefer dedicated schema / carefully isolated Payload tables) |

See also `.env.example` and `scripts/check-production-config.mjs`.

---

## 9. Deployment

### Current default (single Vercel project)

Today PGS V3 is one Next.js app on Vercel + one Supabase project.

| Environment | Purpose |
|---|---|
| Local | `pnpm dev` → `http://localhost:7000` |
| Preview | Vercel Preview URL per PR |
| Production | Owner-approved promote only |

**Ops URLs (same deploy)**

- Login: `/login?surface=operations&redirect=%2Fops`
- Ops: `/ops` (rewrites to `/admin` internally)

**CMS URLs (after Payload)**

- Admin UI: `/cms`
- Same Vercel deployment initially (route group `(payload)`)

### Checklist — deploy Operations

1. Supabase migrations applied; RLS verified (`pnpm test:rls`, security scripts).  
2. Production env vars set in Vercel (no preview fixture gates).  
3. `pnpm verify` (or CI) green on the release branch.  
4. Auth Site URL + redirect allowlist include production domain.  
5. Smoke: staff login → `/ops`; student account rejected from Ops.  
6. Owner Preview QC on Ops shell.  
7. Promote to production only after explicit owner approval.

### Checklist — deploy CMS (Payload)

1. Complete C1–C4 on preview/staging first.  
2. Confirm `/cms` does not break `/ops` or `/admin` rewrites.  
3. `PAYLOAD_SECRET` + DB adapter configured; Payload tables/schema reviewed.  
4. Access bridge: only staff with CMS permission can open `/cms`.  
5. Draft ≠ published; public site never reads draft by accident.  
6. Media uploads use approved private/public buckets with RLS.  
7. Smoke: create draft course → publish → public/catalog reflects publish.  
8. Owner CMS QC; then production promote.

### Future optional: 4-subdomain split

Documented in `docs/pgs-v3-implementation/engineering-gates-phases.md` Phase 5:

| Project | Domain idea |
|---|---|
| Web | public/student |
| Ops | operations |
| Admin | internal |
| CMS | Payload |

**Do not** split to four Vercel projects until Ops + CMS are green on a single deploy and owner requests Phase 5. Cookie/session isolation must be designed before split.

### Security deploy rules

- Never commit `.env`, service role keys, SQL dumps, or student files.  
- Service role = server-only.  
- Preview fixture passwords never on production.  
- Destructive DB/Auth changes need explicit owner approval.  
- Prefer lab/preview until owner pulls live.

---

## 10. Local development

```bash
pnpm install
# configure .env.local from .env.example
pnpm dev   # http://localhost:7000
```

Useful paths:

- Ops login: `http://localhost:7000/login?redirect=%2Fops&surface=operations`
- Ops: `http://localhost:7000/ops`
- Planning gallery: `http://localhost:7000/preview/ops-staff-plan/v2/`
- CMS (after C1): `http://localhost:7000/cms`

---

## 11. Owner decisions still required

1. Confirm this doc as the Ops + CMS contract (**C0**).  
2. Ops-first gates **W1–W5** before Payload **C1**.  
3. Payload admin path stays **`/cms`**.  
4. When Payload lands: bridge Supabase staff access (no Payload password for Ops staff).  
5. Catalog migration: map vs dual-write vs cutover — decide at C3 with real table inventory.  
6. Phase 5 four-subdomain deploy: yes/no and when.

---

## 12. Document history

| Date | Change |
|---|---|
| 2026-09-30 | Initial Ops + CMS + Payload + deployment documentation |

When implementation starts, each gate should update a short “done / remaining” note at the bottom of this file (or a linked living Kanban MD).
