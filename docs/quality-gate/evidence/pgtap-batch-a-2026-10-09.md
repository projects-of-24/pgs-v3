# pgTAP batch A — test/fixture fixes (2026-10-09)

**Approval:** `GO AHEAD batch A` (tests/fixtures only; no migrations/grants/app code).

## Result (executed)

| Metric | Value |
|---|---|
| Suites | 27 |
| Assertions | 713 |
| Suites OK | **26** |
| Suites failing | **1** (`012_phase4b_audit_foundation.sql`) |
| Overall | **FAIL** (expected until batch B) |

Raw log: [`pgtap-batch-a-2026-10-09.log`](./pgtap-batch-a-2026-10-09.log)

## What batch A fixed (tests only)

| Suite | Fix |
|---|---|
| `005` | Expect `staff.access_revoked` |
| `006` | Inspect `premium_plans` / audit immutability as table owner (not unprivileged `service_role`) |
| `014` | Expect Phase 4E `document_shares` exists |
| `015` | `reset role` before notifications count |
| `017` | Compare ordered `pgs_code` rows (not `array_agg` vs `text[]`) |
| `018` | Premium before second assign; `isnt` integer cast; zero-arg `has_function`; test-local EXECUTE on `can_use_staff_registry` |
| `019`–`021` | Update auto-created student profiles; Premium fixtures; private schema grant; suspension via `manage_staff_access`; zero-arg `has_function` |
| `022` | Strip `catalog.publish` as owner, then re-auth |
| `023` | Privilege check instead of anon SELECT count |
| `025` | Premium before assign; capture CRM tag id without table SELECT |
| `027` | Valid UUID prefix; status `invited`; revoke id via granted temp table; plan=22; list RPC deferred (product ambiguity) |

## Intentionally still failing

| Suite | Why | Next |
|---|---|---|
| `012` | RBAC-10 invite audit naming + append-only/de-id asserts vs missing `service_role` grants | **`GO AHEAD` batch B** — fix `manage_staff_access` `had_staff_profile` NULL handling; realign `012` |

## Product notes surfaced (not fixed in batch A)

1. **RBAC-10** — first staff grant emits `staff.role_changed` instead of `staff.invited` (`019` documents current behavior until batch B).
2. **`staff_list_student_guardians`** — `RETURNS TABLE (id …)` conflicts with `profiles.id` in `IF NOT EXISTS` (ambiguous `id`). Needs a product SQL fix (separate approval).
3. **`private.can_use_staff_registry`** — EXECUTE revoked from `authenticated` while RLS policies call it; batch A grants EXECUTE only inside the rolled-back test. Confirm whether production needs a migration grant.

## Security

No test was weakened to allow unauthorized student/document access. Denied privileges remain denied; fixtures were aligned to product gates (Premium before assign, RPC instead of direct table writes).
