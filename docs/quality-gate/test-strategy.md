# Quality Gate — Test Strategy

How tests are organized, which environments run them, and how to execute runtime database security tests safely.

---

## Test types (reusable)

| Type | Purpose | Typical tools |
|---|---|---|
| Unit / business logic | Pure rules, parsers, permission builders, schemas | Vitest |
| API / route (mocked) | Handler authorization with fakes | Vitest + mocks |
| API / route (live) | Real HTTP against staging/local API | Playwright `request` or HTTP client |
| Database / RLS | Actor isolation at Postgres | pgTAP (`supabase test db`) |
| Browser smoke | Critical anonymous/shell paths | Playwright `@smoke` |
| Browser authenticated | Role/session regression | Playwright + storage states |
| Secret / SCA | Credential leak + vulnerable deps | Custom scan + **Gitleaks OSS in CI** + `pnpm audit` + Dependabot |
| Static analysis | CodeQL / Semgrep (advisory or blocking) | GitHub CodeQL, CodeRabbit |

---

## Organization inside a repository

Recommended layout (adapt names to the app; PGS already matches most of this):

```text
src/**/*.test.ts(x)          # unit + mocked API/route tests (co-located)
tests/e2e/*.spec.ts          # Playwright
supabase/tests/*.sql         # pgTAP (when Supabase is used)
scripts/test-rls-*.mjs       # static migration contracts (optional cheap gate)
scripts/security-audit.mjs   # high-confidence secret patterns (optional)
.github/workflows/ci.yml     # merge gate
docs/quality-gate/           # this protocol
```

New security tests should reference a **Test ID** from [security-test-cases.md](./security-test-cases.md).

---

## Environment × test matrix (reusable)

| Test type | Local | CI PR | Staging | Production |
|---|---|---|---|---|
| Lint / typecheck | yes | yes | — | — |
| Unit / mocked API | yes | yes | — | — |
| Static RLS contract | yes | yes (if present) | — | — |
| Runtime pgTAP | yes (isolated local DB) | optional later | preferred before release | **never** |
| Browser smoke | yes | yes | optional | synthetic only if approved |
| Authenticated e2e | yes with fixtures | nightly / gated | yes | **never** destructive |
| Live API IDOR | local/staging | gated | yes | **never** |
| Secret scan | yes | yes | — | — |
| Dependency audit | yes | yes | — | — |
| Load (k6) | optional | **not** on every PR | dedicated | **never** |

---

## Test inventory — PGS V3

Status date: Phase 0 documentation (2026-10-08 audit). Re-verify after CI or suite changes.

### Legend

- **CI-verified** — job in `.github/workflows/ci.yml` or `codeql.yml` runs it; failure fails that workflow.
- **Exists, not CI-executed** — files present; not required on every PR (or skipped without fixtures).
- **Missing** — Quality Gate V1 wants it; not present as automated coverage.
- **N/A** — not applicable to this application.

### CI-verified (PGS)

| Item | Command / workflow | Location |
|---|---|---|
| ESLint | `pnpm lint` | CI `quality` |
| Typecheck | `pnpm typecheck` | CI `quality` |
| Vitest (unit + co-located route tests) | `pnpm test` | `src/**/*.test.ts(x)` (~79 files); CI `quality` |
| Static RLS migration contract | `pnpm test:rls` | `scripts/test-rls-migration.mjs`; CI `quality` |
| Custom secret scan | `pnpm test:security` | `scripts/security-audit.mjs`; CI `quality` |
| Dependency audit (high+) | `pnpm audit --audit-level=high` | CI `quality` |
| Production build | `pnpm build` | CI `build` |
| Playwright smoke | `pnpm test:e2e:smoke` | `@smoke` in `tests/e2e/`; CI `e2e-smoke` |
| CodeQL JS/TS | `.github/workflows/codeql.yml` | Fails on error-level findings; SARIF uploaded as artifact (`upload: never` to GitHub code scanning) |

**Smoke specs tagged `@smoke` (as of Phase 0):**

- `tests/e2e/home-three-state.spec.ts` (partial)
- `tests/e2e/parity-shell.spec.ts` (shell, security headers, notifications/sidebar, USA tab content)
- `tests/e2e/journeys-auth-dashboard.spec.ts` (journey smoke; does not create live Auth accounts)

### Exists, not CI-executed (PGS)

| Item | Location | Notes |
|---|---|---|
| Runtime pgTAP suites | `supabase/tests/*.sql` (27 files) | **Local PASS 27/27 (2026-10-09 batch B)**; not in CI. Prefer `db reset` before full suite. Evidence: [evidence/pgtap-batch-b-2026-10-09.md](./evidence/pgtap-batch-b-2026-10-09.md) |
| Full Playwright suite | `tests/e2e/*.spec.ts` | Many env-gated / fixture-gated; not all `@smoke` |
| Auth regression (`@auth-regression`) | `quality-gate-auth-regression.spec.ts` | CI always-on anonymous denials; fixture roles via `pnpm fixtures:auth-states` |
| Firefox / WebKit projects | `playwright.config.ts` | Optional via `pnpm test:e2e:browsers` |
| Production config gate | `pnpm config:check` | `scripts/check-production-config.mjs` — not a CI job |
| CodeRabbit Gitleaks / Semgrep | `.coderabbit.yaml` | Advisory PR review, not the CI job graph |
| Document security worker | `workers/document-security/` | Separate package; not covered by main Vitest CI path as a first-class suite |
| Authenticated role Playwright | Various e2e + `fixtures:auth-states` script | Needs storage states / lab accounts |

**pgTAP suite files (exist; runtime not CI-verified):**

`001_parity_proof_rls.sql` … `027_guardian_portal_v1.sql` under `supabase/tests/` (auth, Premium, CMS, Phase 4 document lifecycle, Ops registry/people/assignments, guardian, analytics, etc.).

### Missing (PGS Quality Gate V1 gaps)

| Item | Notes |
|---|---|
| Confirmed branch protection / required status checks | Must be verified in GitHub UI/API (roadmap #1) |
| Runtime pgTAP green + CI/scheduled job | Local executed (FAIL); CI still missing — fix suites before wiring CI |
| Live (non-mocked) HTTP IDOR against staging | Still missing — mocked CI matrix added in roadmap #3 |
| Dependabot (or Renovate) | Roadmap #4 |
| Blocking CI Gitleaks Action | Custom scan exists; broader scanner not a CI job — roadmap #4 |
| Vitest coverage report / thresholds | Not configured |
| Payment webhook abuse suite | Product webhook secret expected; automated duplicate/signature suite not first-class |
| Cloudflare R2 media suite | **N/A** — PGS uses Supabase Storage |
| Marketplace Buyer/Seller matrix | **N/A** — see PGS roles doc |

### Not applicable (PGS)

| Item | Reason |
|---|---|
| Cloudflare R2 upload isolation tests | Supabase Storage / Phase 4D |
| Buyer / Seller / Agent marketplace RBAC | Different product; template only in role matrix core |
| AI credit wallet concurrency suite | No marketplace credit wallet product in this repo’s Quality Gate scope yet; OpenAI analyst has schema unit tests |

---

## Runtime pgTAP — safe execution

### Hard rules

1. **Never** run these against production.
2. Use **local Supabase** (Docker) or an **owner-approved isolated test project** only.
3. Do not import production student documents, PII dumps, or live credentials into the test DB.
4. Static `pnpm test:rls` is **not** a substitute for this section.
5. Record evidence (pass counts / failing assertion names). If Docker/CLI is unavailable, status remains **not executed** — do not mark passed.

### Prerequisites

- Docker Desktop (or equivalent) running
- [Supabase CLI](https://supabase.com/docs/guides/cli) installed and on `PATH`
- Repository checkout with `supabase/config.toml` and migrations
- Free local ports matching config (API `54321`, DB `54322` in this repo’s `supabase/config.toml`)

### Commands (local isolated stack)

From the repository root:

```bash
# 0) Docker runtime must be up (this machine: Colima)
#    colima start

# 1) Start local Supabase (applies migrations from supabase/migrations)
#    If ports 54321/54322 are taken by another local project, use temporary
#    alternate ports in supabase/config.toml for this run only, then restore.
supabase start

# 2) Confirm status / DB URL (local only — do not paste service-role keys into docs or chat)
supabase status

# 3) Prefer a clean schema before a release-proof run (avoids backup pollution)
supabase db reset --local

# 4) Run the pgTAP database test suite against local DB
supabase test db --local

# 5) When finished, stop the local stack
supabase stop
```

**Observed 2026-10-09 (batch B):** full suite on clean local DB returned **PASS** (27/27, 713 asserts). Details: [evidence/pgtap-batch-b-2026-10-09.md](./evidence/pgtap-batch-b-2026-10-09.md).

### Optional: single-file focus

If the CLI version supports filtering, prefer full `supabase test db` before release. For iterative debugging, run the relevant file under `supabase/tests/` only after confirming the local DB is the isolated instance from `supabase start` (not a linked remote production ref).

```bash
# Example shape — confirm with `supabase test db --help` for your CLI version
supabase test db
```

### Linked remote projects

- Prefer **local** Docker for destructive/transactional pgTAP.
- If using a **linked non-production** Supabase project, require explicit owner approval, confirm project ref is not production, and never point tests at production.
- Do not use `supabase db push` to production as part of testing.

### Interpreting results

| Result | How to record |
|---|---|
| All planned assertions pass | Runtime-verified for that suite version; attach CLI output summary |
| Failures | Open defect; do not weaken policies to greenwash |
| CLI/Docker unavailable | **Not executed** — keep inventory status unchanged |

### Relationship to `pnpm test:rls`

| Command | What it proves |
|---|---|
| `pnpm test:rls` | Migration SQL text still contains expected RLS/enable/policy fragments |
| `supabase test db` | Policies behave for fixture actors (SELECT/INSERT/UPDATE/DELETE denials) |

Both are valuable. Only the second is runtime RLS verification.

---

## Coverage reporting

Not configured in Phase 0. When approved later:

- Add Vitest coverage reporter in CI as an **artifact** first.
- Add thresholds only after baseline is understood.
- Coverage % is not a security substitute for IDOR/RLS negatives.

---

## Cross-app reuse

When cloning this protocol into another Projects of 24 repo:

1. Copy `docs/quality-gate/` core files.
2. Replace the **Application** section of `role-permission-matrix.md`.
3. Rewrite the inventory tables for that repo’s actual CI and test folders.
4. Keep roadmap priorities unless the owner reorders them for that product.
