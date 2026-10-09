# Authenticated Playwright regression — 2026-10-08

Roadmap **#5**: role/session Playwright regressions beyond UI smoke.

## Deliverable

| Item | Detail |
|---|---|
| Spec | `tests/e2e/quality-gate-auth-regression.spec.ts` |
| Tag | `@auth-regression` |
| Script | `pnpm test:e2e:auth-regression` (desktop) |
| CI | `.github/workflows/ci.yml` → e2e-smoke job runs auth-regression after smoke |

## CI-shaped execution (no fixture secrets)

```bash
pnpm build   # production build required for local webServer
pnpm test:e2e:auth-regression
```

Recorded: [`auth-regression-run-2026-10-08.log`](./auth-regression-run-2026-10-08.log)

| Result | Count |
|---|---|
| Passed (anonymous denials) | **5** |
| Skipped (fixture env absent) | **6** |
| Failed | **0** |
| Exit | **0** |

## Fixture-backed cases (lab / staging)

Set storage-state paths (never commit the JSON files — `.auth/` is gitignored):

```bash
pnpm fixtures:auth-states
# then export, for example:
export PLAYWRIGHT_STANDARD_STUDENT_STORAGE_STATE="$PWD/.auth/phase36/standard-student.json"
export PLAYWRIGHT_PREMIUM_STUDENT_STORAGE_STATE="$PWD/.auth/phase36/premium-student.json"
export PLAYWRIGHT_MENTOR_STORAGE_STATE="$PWD/.auth/phase36/mentor.json"
export PLAYWRIGHT_SUPER_ADMIN_STORAGE_STATE="$PWD/.auth/phase36/super-admin.json"
pnpm test:e2e:auth-regression
```

Expired refresh tokens skip with an explicit reason (same philosophy as Ops fixture guards) — they are **not** reported as product failures.

## Coverage map

| Case | Needs fixture | CI without secrets |
|---|---|---|
| Anonymous → profile / ops / admin / mentor denied | no | runs |
| Anonymous Feed `data-student-state=anonymous` | no | runs |
| Standard student state + Ops denial | yes | skipped |
| Premium student state + staff invite denial | yes | skipped |
| Mentor Ops without staff-admin UI | yes | skipped |
| Admin Ops scoreboard reachable | yes | skipped |

## Limits

- CI does not invent live Auth accounts.
- Full role matrix requires owner-managed preview fixtures + GitHub Actions secrets when you want them non-skipped in CI.
- Existing env-gated suites (`student-state-parity`, Ops, CMS) remain; this file is the Quality Gate entry point.
