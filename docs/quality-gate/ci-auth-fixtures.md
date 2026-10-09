# CI Auth fixtures — owner setup

Unlocks **fixture-backed** `@auth-regression` cases in GitHub Actions (standard / Premium / mentor / super-admin).

Without these secrets, CI still runs anonymous denials; role cases **skip** (soft).

## Required GitHub Actions secrets

Repo → **Settings → Secrets and variables → Actions → New repository secret**

| Secret name | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Isolated **preview / lab** Supabase project URL only — never production (see release-checklist) |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable (or anon) key for that project |
| `PGS_PREVIEW_FIXTURE_PASSWORD` | Shared 16+ char password for fixture accounts (see emails below) |

Optional overrides (if roles do not share one password):

| Secret | Fixture account email |
|---|---|
| `PGS_PREVIEW_STANDARD_PASSWORD` | `pgs-v3-fixture+student-b@example.test` |
| `PGS_PREVIEW_PREMIUM_PASSWORD` | `pgs-v3-fixture+student-a@example.test` |
| `PGS_PREVIEW_MENTOR_PASSWORD` | `pgs-v3-fixture+mentor-a@example.test` |
| `PGS_PREVIEW_SUPER_ADMIN_PASSWORD` | `pgs-v3-fixture+super-admin@example.test` |

Optional alias: `NEXT_PUBLIC_SUPABASE_ANON_KEY` (used if publishable key is unset).

## Fixture accounts (already used by `pnpm fixtures:auth-states`)

These must exist and stay active in the **same** Supabase project as the secrets:

- Standard student: `pgs-v3-fixture+student-b@example.test`
- Premium student: `pgs-v3-fixture+student-a@example.test`
- Mentor: `pgs-v3-fixture+mentor-a@example.test`
- Super Admin: `pgs-v3-fixture+super-admin@example.test`

Create/refresh locally (never commit `.auth/`):

```bash
# .env.local has Supabase URL/key + PGS_PREVIEW_FIXTURE_PASSWORD
PLAYWRIGHT_BASE_URL=http://127.0.0.1:7100 \
PGS_PREVIEW_FIXTURE_ROLES=standard-student,premium-student,mentor,super-admin \
pnpm fixtures:auth-states
```

## What CI does

1. Builds the app with `NEXT_PUBLIC_*` so the e2e server can resolve sessions.
2. Runs `bash scripts/ci-prepare-auth-fixtures.sh` → `pnpm fixtures:auth-states`.
3. Exports `PLAYWRIGHT_*_STORAGE_STATE` into the job env for `@auth-regression`.
4. Does **not** upload `.auth/` artifacts.

## Verify after adding secrets

On the next PR, open the **Playwright smoke** job log:

- `Prepare Playwright auth fixtures` → `Auth fixtures prepared…`
- `Run @auth-regression` → fixture cases **passed** (not skipped)
- `Auth fixture status` → `Auth fixtures were prepared for this run.`

If prepare says skipped, a required secret is missing or empty.

## Security rules

- Prefer a **preview/lab** Supabase project, not production.
- Rotate fixture passwords if leaked.
- Never paste secret values into issues, chats, or docs.
- Do not commit storage-state JSON (`.auth/` is gitignored).
