# Quality Gate evidence

Machine and human evidence from Quality Gate runs.  

**Never commit production secrets, service-role keys, or PII dumps here.** Local Supabase demo JWTs must not be pasted into these files.

| Artifact | Description |
|---|---|
| [pgtap-batch-b-2026-10-09.md](./pgtap-batch-b-2026-10-09.md) | **Batch B** — RBAC-10 fix; **27/27 PASS** |
| [pgtap-batch-b-2026-10-09.log](./pgtap-batch-b-2026-10-09.log) | Full suite after batch B |
| [pgtap-batch-a-2026-10-09.md](./pgtap-batch-a-2026-10-09.md) | Batch A test/fixture fixes — 26/27 OK |
| [pgtap-batch-a-2026-10-09.log](./pgtap-batch-a-2026-10-09.log) | Full suite after batch A |
| [pgtap-runtime-summary-2026-10-09.md](./pgtap-runtime-summary-2026-10-09.md) | RBAC-01 triage — classified root causes |
| [pgtap-runtime-clean-2026-10-09.log](./pgtap-runtime-clean-2026-10-09.log) | Clean reset + full suite (pre-batch-A) |
| [pgtap-rbac-focus-2026-10-09.log](./pgtap-rbac-focus-2026-10-09.log) | Isolation re-run of RBAC-critical suites |
| [pgtap-db-reset-2026-10-09.log](./pgtap-db-reset-2026-10-09.log) | Local migration reset 2026-10-09 |
| [pgtap-runtime-summary-2026-10-08.md](./pgtap-runtime-summary-2026-10-08.md) | Roadmap #2 first clean-run summary |
| [pgtap-runtime-clean-2026-10-08.log](./pgtap-runtime-clean-2026-10-08.log) | Clean `supabase db reset` + `supabase test db --local` (2026-10-08) |
| [pgtap-runtime-2026-10-08.log](./pgtap-runtime-2026-10-08.log) | First run (backup-restored DB; polluted; do not use as release proof) |
| [pgtap-db-reset-2026-10-08.log](./pgtap-db-reset-2026-10-08.log) | Local migration reset log (2026-10-08) |
| [api-cross-role-2026-10-08.md](./api-cross-role-2026-10-08.md) | Roadmap #3 Vitest cross-role API matrix (13/13 PASS) |
| [secrets-dependabot-2026-10-08.md](./secrets-dependabot-2026-10-08.md) | Roadmap #4 Gitleaks + Dependabot |
| [gitleaks-git-2026-10-08.log](./gitleaks-git-2026-10-08.log) | Local full-history Gitleaks after allowlist (no leaks) |
| [auth-regression-2026-10-08.md](./auth-regression-2026-10-08.md) | Roadmap #5 Playwright `@auth-regression` |
| [auth-regression-run-2026-10-08.log](./auth-regression-run-2026-10-08.log) | CI-shaped run: 5 passed, 6 skipped |
| [ci-auth-fixtures-2026-10-08.md](./ci-auth-fixtures-2026-10-08.md) | CI Auth fixture secret wiring (follow-up A) |
