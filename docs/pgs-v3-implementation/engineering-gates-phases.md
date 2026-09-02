# Engineering gates — phased rollout

What ships when, and how you review it live before committing to Sentry, PostHog, or the 4-deploy split.

## Phase map

| Phase | What | When | How you review live |
|-------|------|------|---------------------|
| **1 — Tier 1 gates** (this batch) | GitHub Actions CI, CodeQL, CodeRabbit config, `@smoke` desktop + mobile | Now | PR checks tab, Playwright HTML report artifact, CodeRabbit comments |
| **2 — Staging deploy** | Vercel preview/staging on your Supabase ref | Before go-live | Preview URL + manual QC + existing visual parity scripts |
| **3 — Go-live observability** | Sentry (errors/perf) | At production launch | Sentry dashboard, alert emails, release tags |
| **4 — Go-live analytics** | PostHog (scoped event catalog) | After Sentry + stable flows | PostHog live view, funnel charts (no PII) |
| **5 — 4-subdomain deploy** | web + ops + admin + cms Vercel projects | After staff surfaces + CI green | Four preview URLs, cookie isolation per host |
| **6 — Full e2e matrix** | Nightly full Playwright + auth storage states | After staging fixtures exist | GitHub Actions schedule + artifacts |

Sentry and PostHog are **intentionally deferred to Phases 3–4** so you can see the product on staging first without extra vendors.

---

## Phase 1 — what you will see after merge

### GitHub Actions (`.github/workflows/ci.yml`)

On every pull request:

1. **quality** — lint, typecheck, Vitest, RLS contract scan, secret scan, `pnpm audit --audit-level=high`
2. **build** — `next build`
3. **e2e-smoke** — Playwright `@smoke` on **desktop (1440px)** and **mobile (390px iPhone 13)**

**Where to look:** GitHub → repo → **Actions** tab → workflow run → job logs.

**If smoke fails:** download artifact **playwright-report** → open `index.html` locally for screenshots, traces, and step replay.

### CodeQL (`.github/workflows/codeql.yml`)

- Runs on PR, push to `main`, and weekly Monday 06:00 UTC
- **Where to look:** PR **Security** tab → Code scanning alerts

### CodeRabbit (`.coderabbit.yaml`)

- Requires [CodeRabbit GitHub App](https://coderabbit.ai) installed on the org/repo
- **Where to look:** PR conversation → CodeRabbit review summary and inline comments

---

## Local commands (mirror CI)

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm test:rls && pnpm test:security
pnpm audit --audit-level=high
PGS_ALLOW_LEGACY_ASSET_FETCH=1 pnpm build
pnpm test:e2e:smoke    # desktop + mobile @smoke
pnpm test:e2e:browsers # desktop + firefox + webkit @smoke (optional)
```

---

## Phase 3 — Sentry at go-live (not now)

Add when staging is approved and production domain is set:

- `@sentry/nextjs` in the app
- Env: `SENTRY_DSN`, `SENTRY_AUTH_TOKEN` (CI source maps), `NEXT_PUBLIC_SENTRY_DSN`
- Scrub PII in `beforeSend`
- Separate environments: `development`, `staging`, `production`

**Review live:** sentry.io → Issues, Performance, Releases tied to Vercel deploy SHA.

---

## Phase 4 — PostHog at go-live (not now)

Add after Sentry and a signed-off event catalog (~10 events):

- Env: `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`
- No session replay on ops/admin/document routes until privacy review
- No email or student name in event properties

**Review live:** PostHog → Live events, dashboards per surface (`web`, `ops`, `admin`, `cms`).

---

## Phase 5 — 4 Vercel deploys (when you are ready)

| Vercel project | Root | Domain |
|----------------|------|--------|
| pgs-web | `/` (single app today; `apps/web` if split) | `purpleguide.study` |
| pgs-ops | ops routes | `ops.purpleguide.study` |
| pgs-admin | admin routes | `admin.purpleguide.study` |
| pgs-cms | dash CMS | `cms.purpleguide.study` |

Steal cookie isolation from pgs_app; keep pgs-v3 tests and RLS.

---

## Decision checklist (owner)

Before enabling Phase 3 (Sentry):

- [ ] Staging preview URLs reviewed (desktop + mobile)
- [ ] `@smoke` green on main
- [ ] No open CodeQL high/critical on auth or document paths

Before enabling Phase 4 (PostHog):

- [ ] Event catalog approved
- [ ] Sentry running one week without noise overload
- [ ] PII rules documented

Before Phase 5 (4 deploys):

- [ ] Staff login works on each subdomain
- [ ] CI smoke runs against each preview URL (matrix job)
