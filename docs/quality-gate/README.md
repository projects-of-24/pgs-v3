# Projects of 24 — Quality Gate V1

Reusable automated testing, security, and regression protocol for Projects of 24 applications (PGS, Sourcebyjay, AVForge / ScriptXOS, and future apps).

**Phase status:** Phase 0 documentation only. No application code, schemas, dependencies, or GitHub Actions were changed to create this folder.

**Authority:** Owner decisions win. This protocol does not invent product roles or weaken authentication / RLS to make tests green.

---

## Goals

- Catch dangerous authorization, session, and regression bugs before merge and release.
- Keep the toolset small, understandable, and affordable.
- Separate **reusable core** patterns from **application-specific** roles and rules.
- Never claim something is secure merely because source looks correct.
- Never claim a test passed unless it was executed successfully in the stated environment.

---

## Document map

| File | Purpose |
|---|---|
| [architecture.md](./architecture.md) | Pipeline diagram, environment split, reusable vs app-specific layers |
| [test-strategy.md](./test-strategy.md) | What runs where; test types; pgTAP safe runtime commands; inventory |
| [role-permission-matrix.md](./role-permission-matrix.md) | Reusable matrix template + PGS-specific roles/permissions |
| [rbac-audit.md](./rbac-audit.md) | Live RBAC audit: role bundles, enforcement map, findings, gaps |
| [security-test-cases.md](./security-test-cases.md) | Test case schema + initial catalog mapped to existing suites |
| [ci-pipeline.md](./ci-pipeline.md) | Exact CI today; proposed future stages (not implemented in Phase 0) |
| [release-checklist.md](./release-checklist.md) | Pre-merge / pre-release human checklist |
| [known-risks.md](./known-risks.md) | Open risks — recorded, not claimed resolved |
| [ci-auth-fixtures.md](./ci-auth-fixtures.md) | Owner checklist: GitHub secrets to unlock role e2e in CI |

Related existing PGS audits (do not duplicate as second truth):

- `docs/pgs-v3-audit/08-security-risk-register.md`
- `docs/pgs-v3-audit/05-auth-permissions-rls-viewer-map.md`
- `docs/pgs-v3-implementation/engineering-gates-phases.md`

---

## Core vs application-specific

```text
docs/quality-gate/     ← methodology reusable across Projects of 24
  ├── README, architecture, test-strategy, ci-pipeline,
  │   security-test-cases schema, release-checklist, known-risks framing
  └── role-permission-matrix.md
        ├── § Core template (all apps)
        └── § Application: PGS V3 (this repo only)

Application repos may later add:
  docs/quality-gate/apps/<app-id>/   ← optional deeper app annex
```

Do **not** force Buyer / Seller / marketplace roles onto PGS.  
Do **not** force student / mentor / Premium roles onto Sourcebyjay or AVForge.

---

## Inventory snapshot (PGS V3 — this repository)

Full detail: [test-strategy.md](./test-strategy.md#test-inventory-pgs-v3).

| Class | Meaning |
|---|---|
| **CI-verified** | Configured in `.github/workflows/ci.yml` and intended to block the quality/build/e2e-smoke jobs when failing |
| **Exists, not CI-executed** | Present in repo; not run (or not required) on every PR by current CI |
| **Missing** | Needed by Quality Gate V1 but not present as an automated suite |

| Layer | Class (Phase 0) |
|---|---|
| ESLint, TypeScript, Vitest unit/API mocks | CI-verified |
| Static RLS migration contract (`pnpm test:rls`) | CI-verified |
| Custom secret scan (`pnpm test:security`) | CI-verified |
| Gitleaks OSS CLI (git history) | CI-verified (added roadmap #4) |
| Dependabot (npm + Actions) | Config present — alerts/PRs when GitHub Dependabot enabled |
| `pnpm audit --audit-level=high` | CI-verified |
| Production build | CI-verified |
| Playwright `@smoke` (desktop + mobile Chromium) | CI-verified |
| Playwright `@auth-regression` (desktop) | CI-verified for always-on anonymous denials; fixture roles skip without secrets |
| CodeQL (error-level fail; SARIF not uploaded) | CI-verified (separate workflow) |
| Runtime pgTAP under `supabase/tests/` | Local **PASS** 27/27 after batch B (2026-10-09); not CI-executed |
| Full Playwright matrix / auth fixtures | Exists, not CI-executed (often env-gated) |
| Coverage reporting / thresholds | Missing |
| Systematic cross-route API BOLA catalog in CI | **Partial CI-verified** — matrix in `api-cross-role-security.test.ts` (13 cases); expand as routes grow |
| Branch protection / required checks | Requires manual verification (see roadmap #1) |

---

## Prioritized implementation roadmap (post–Phase 0)

Owner-approved order. **Do not start without explicit approval for each phase.**

| Priority | Task | Outcome |
|---:|---|---|
| **1** | Verify GitHub required status checks and branch protection | **Done 2026-10-08 — gap found:** ruleset blocks delete/force-push only; CI checks are **not** required. Owner must enable required checks in GitHub (plan may limit). See [ci-pipeline.md](./ci-pipeline.md#verification-log-2026-10-08) |
| **2** | Run and validate runtime RLS tests (pgTAP) on isolated local/test DB | **PASS locally 2026-10-09 — 27/27** after batch A+B. Evidence: [evidence/pgtap-batch-b-2026-10-09.md](./evidence/pgtap-batch-b-2026-10-09.md). Still not in CI. |
| **3** | Implement cross-user and cross-role API security tests | **Done 2026-10-08 — 13/13 Vitest PASS** in `src/app/api/api-cross-role-security.test.ts` (CI via `pnpm test`). Evidence: [evidence/api-cross-role-2026-10-08.md](./evidence/api-cross-role-2026-10-08.md) |
| **4** | Strengthen CI secret scanning and dependency monitoring | **Done 2026-10-08** — OSS Gitleaks in CI (blocking) + keep custom scan; Dependabot weekly. Evidence: [evidence/secrets-dependabot-2026-10-08.md](./evidence/secrets-dependabot-2026-10-08.md) |
| **5** | Add authenticated Playwright regression tests | **Done 2026-10-08** — `@auth-regression` suite + CI step; 5 anonymous denials always run; fixture roles skip until storage states set. Evidence: [evidence/auth-regression-2026-10-08.md](./evidence/auth-regression-2026-10-08.md) |

Later (not in the top five): coverage artifacts, nightly full e2e, k6 load tests, cross-app template extraction.

---

## Local commands that mirror current CI (PGS)

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:rls
pnpm test:security
pnpm audit --audit-level=high
PGS_ALLOW_LEGACY_ASSET_FETCH=1 pnpm build
pnpm test:e2e:smoke
```

Full local verify (includes non-smoke e2e; may skip env-gated cases):

```bash
pnpm verify
```

Runtime pgTAP is **not** in the commands above. See [test-strategy.md](./test-strategy.md#runtime-pgtap-safe-execution).

---

## Test case metadata (required for new cases)

Every Quality Gate test should eventually record:

| Field | Description |
|---|---|
| Test ID | Stable ID, e.g. `QG-AUTH-001` |
| Feature name | Product area |
| Business rule | What must be true |
| Test scenario | Steps / fixture |
| Expected result | Pass criteria |
| Test type | unit / api / rls / e2e / secret / other |
| Risk level | critical / high / medium / low |
| Implementation status | missing / written / ci-verified / env-gated |
| Evidence | Link to CI run, local log, or “not executed” |

Schema and initial catalog: [security-test-cases.md](./security-test-cases.md).

---

## Rules for AI-assisted implementation (all phases)

- Explain the change → wait for owner approval → implement one approved task.
- Prefer existing tools; do not install stacks casually.
- Do not disable or weaken tests, RLS, or auth to force green CI.
- Do not print secret values into docs or logs.
- Do not run destructive tests against production.
- Show actual execution results; never claim pass without evidence.

---

## Phase 0 exit criteria

- [x] `docs/quality-gate/` created with the agreed files
- [x] Reusable core separated from PGS-specific content
- [x] Inventory of CI-verified / not-executed / missing recorded
- [x] Safe pgTAP runtime commands documented
- [x] Prioritized roadmap recorded
- [x] Known risks recorded without claiming resolution
- [ ] Owner review of this folder
- [x] Roadmap #1 verification recorded (gap: no required status checks)
- [ ] Owner applies GitHub required checks (UI / plan) — still open under QG-RISK-01
- [x] Roadmap #2 runtime pgTAP executed on isolated local DB (overall FAIL; see evidence/)
- [x] Roadmap #3 cross-role API matrix added and Vitest-verified (13/13)
- [x] Roadmap #4 Gitleaks CI + Dependabot config
- [x] Roadmap #5 `@auth-regression` Playwright + CI step
- [x] CI Auth fixture wiring (soft-skip until secrets set) — see [ci-auth-fixtures.md](./ci-auth-fixtures.md)
- [ ] Owner adds preview Supabase + fixture password secrets in GitHub (manual)
- [x] RBAC-01 pgTAP triage complete
- [x] pgTAP batch A (tests/fixtures) — 26/27 OK
- [x] pgTAP batch B (invite audit migration) — **27/27 PASS**
- [ ] Optional: CI runtime pgTAP / guardian list RPC / `can_use_staff_registry` prod grant
