# CI Auth fixtures wiring — 2026-10-08

Follow-up **A** after Quality Gate roadmap #5.

## Code changes

| Path | Change |
|---|---|
| `scripts/ci-prepare-auth-fixtures.sh` | Soft-skip or generate storage states; write `GITHUB_ENV` paths |
| `.github/workflows/ci.yml` | e2e job env secrets; prepare step; pass Supabase into e2e build/runtime |
| `docs/quality-gate/ci-auth-fixtures.md` | Owner secret checklist |

## Behavior

| Secrets present? | `@auth-regression` |
|---|---|
| No | 5 anonymous denials run; 6 fixture cases skip (CI green) |
| Yes (URL + key + password + live fixture users) | Fixture cases execute against prepared `.auth/phase36/*.json` |

## Owner action still required

Add repository secrets listed in [ci-auth-fixtures.md](../ci-auth-fixtures.md).  
This change cannot invent or push secret values into GitHub for you.

## Local check

```bash
# soft-skip without secrets
unset NEXT_PUBLIC_SUPABASE_URL
bash scripts/ci-prepare-auth-fixtures.sh
# → exit 0, "Auth fixtures skipped…"
```
