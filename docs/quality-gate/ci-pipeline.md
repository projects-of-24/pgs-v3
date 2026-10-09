# Quality Gate — CI Pipeline

Documents **what exists today** in PGS V3 and the **proposed** future stages. Phase 0 does **not** change GitHub Actions.

---

## Current PGS workflows

### `CI` — `.github/workflows/ci.yml`

**Triggers:** pull_request; push to `main`  
**Concurrency:** cancel in-progress per ref

| Job | Depends on | Steps |
|---|---|---|
| `quality` | — | checkout (`fetch-depth: 0`) → **Gitleaks OSS CLI** → pnpm → `lint` → `typecheck` → `test` → `test:rls` → `test:security` → `pnpm audit --audit-level=high` |
| `build` | `quality` | checkout → pnpm → `pnpm build` (`PGS_ALLOW_LEGACY_ASSET_FETCH=1`) |
| `e2e-smoke` | `build` | Playwright Chromium install → build (with optional Supabase `NEXT_PUBLIC_*` secrets) → `@smoke` → prepare auth fixtures → `@auth-regression` → upload report/traces **on failure** |

### `CodeQL` — `.github/workflows/codeql.yml`

**Triggers:** PR; push `main`; weekly Monday 06:00 UTC  
**Behavior:** analyze JS/TS; `upload: never` (private repo limitation noted in workflow); fail job if error-level findings; SARIF artifact `codeql-sarif`

### CodeRabbit — `.coderabbit.yaml`

Advisory review. Enables Gitleaks + Semgrep tools in CodeRabbit. Path instructions for migrations, API, lib, components, e2e.  
**Not** a substitute for required GitHub status checks.

---

## Proposed PR pipeline stages (target)

Aligned with Quality Gate V1. Items marked **TODAY** already run. Items marked **PROPOSED** need owner approval before implementation.

| # | Stage | PGS today | Notes |
|---|---|---|---|
| 1 | Formatting / linting | **TODAY** (`eslint`) | |
| 2 | Typecheck | **TODAY** | |
| 3 | Unit / business logic | **TODAY** (Vitest) | |
| 4 | API / authorization tests | **TODAY** (+ `api-cross-role-security.test.ts` matrix) | Live staging HTTP IDOR still later |
| 5 | Database / RLS | **Partial TODAY** (static only) | Runtime pgTAP = roadmap #2 |
| 6 | Secret + dependency | **TODAY** (Gitleaks OSS + custom scan + audit + Dependabot config) | Confirm Dependabot enabled in GitHub settings |
| 7 | Playwright browser | **TODAY** (`@smoke` + `@auth-regression`) | Fixture role cases need CI secrets to stop skipping |
| 8 | Summary / artifacts | **Partial TODAY** (Playwright on failure; CodeQL artifact) | Expand later |

**Rules:**

- Critical security failures must not be `continue-on-error`.
- Long-running load tests stay off the default push pipeline.
- Do not auto-deploy production from this protocol unless the existing release process already requires it.

---

## Branch protection / required checks (roadmap #1)

### Verification log 2026-10-08

| Item | Result |
|---|---|
| Repository | `projects-of-24/pgs-v3` (private) |
| Default branch | `main` |
| Viewer permission used | `ADMIN` |
| Org plan | `projects-of-24` → GitHub **free** |
| Classic branch protection rules | **None** (`branchProtectionRules.nodes` empty) |
| REST branch protection / rulesets list API | **403** (Pro/public required for those endpoints) |
| Active repository ruleset | **Yes** — id `24304872`, name `1`, enforcement `ACTIVE`, target `BRANCH` |
| Ruleset rules | **`DELETION`** + **`NON_FAST_FORWARD` only** |
| Required status checks in ruleset | **None** |
| Bypass actors on ruleset | None listed |
| Ref name include/exclude (GraphQL) | Both empty arrays (treat as incomplete signal; confirm target refs in UI) |

**CI check names observed on recent `main` commit** (these are what must be required once enforcement is available):

| Check name (status context) | Workflow job |
|---|---|
| `Lint, types, unit, RLS, secrets` | CI → `quality` |
| `Production build` | CI → `build` |
| `Playwright smoke (desktop + mobile)` | CI → `e2e-smoke` |
| `Analyze JavaScript/TypeScript` | CodeQL → `analyze` |

**Verdict:** Force-push and branch deletion are restricted by ruleset `1`. **Failing CI does not appear to be a GitHub-enforced merge blocker** — no required status checks and no classic branch protection requiring them. CI still runs and can pass/fail, but merge discipline is not machine-enforced for red checks.

This does **not** mean the application is secure. It means the merge gate is incomplete.

### Owner actions (GitHub UI)

Settings: [Branches](https://github.com/projects-of-24/pgs-v3/settings/branches) · [Rules](https://github.com/projects-of-24/pgs-v3/settings/rules)

**Minimum target for Quality Gate V1**

1. Ruleset (or classic protection) targets `refs/heads/main` (and release branches if any).
2. Require pull request before merging (recommended).
3. Require status checks to pass — at least:
   - `Lint, types, unit, RLS, secrets`
   - `Production build`
   - `Playwright smoke (desktop + mobile)`
4. Optionally require `Analyze JavaScript/TypeScript` if you want CodeQL merge-blocking.
5. Prefer “require branches to be up to date” (strict checks) when available.
6. Limit admin bypass; do not allow failing security jobs to be skipped casually.

**Plan constraint:** Org is on GitHub **free** with a **private** repo. Classic branch protection REST APIs are unavailable; some required-check features may need **GitHub Team/Pro** (or a public repo, which is usually wrong for this product). Confirm in the Rules UI whether “Require status checks to pass” / “Require workflows” is offered. If the UI blocks it, options are: upgrade the org plan, or keep a written merge policy until upgrade (weaker).

Phase 0/1 docs do **not** change GitHub settings automatically. Owner (or approved admin action) must apply the ruleset change.

---

## Prioritized post–Phase 0 CI-related work

Matches owner roadmap (do not implement without approval):

| Priority | Work | Pipeline impact |
|---:|---|---|
| 1 | Verify required checks / branch protection | Process / GitHub settings |
| 2 | Runtime RLS (pgTAP) on isolated DB | New job or scheduled workflow **only after approval** |
| 3 | Cross-user/role API security tests | **Done** — Vitest matrix in `quality` job via `pnpm test` |
| 4 | Stronger secret scan + Dependabot | **Done** — see `.gitleaks.toml`, CI Gitleaks step, `.github/dependabot.yml` |
| 5 | Authenticated Playwright regression | **Done** — `@auth-regression`; optional next: CI secrets for fixtures |

---

## Local mirror of current CI

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm test:rls && pnpm test:security
pnpm audit --audit-level=high
PGS_ALLOW_LEGACY_ASSET_FETCH=1 pnpm build
pnpm test:e2e:smoke
```

Runtime pgTAP: see [test-strategy.md](./test-strategy.md#runtime-pgtap-safe-execution) — not part of current CI.

---

## Reuse across Projects of 24

Copy this document’s stage table. Replace job names with that repo’s workflow. Keep the rule: **security failures block merge; load tests stay separate.**
