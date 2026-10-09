# pgTAP batch B — invite audit fix (2026-10-09)

**Approval:** `GO AHEAD batch B`

## Result (executed)

| Metric | Value |
|---|---|
| Suites | 27 |
| Assertions | 713 |
| Overall | **PASS** |

Raw log: [`pgtap-batch-b-2026-10-09.log`](./pgtap-batch-b-2026-10-09.log)

## Changes

| Kind | Path | What |
|---|---|---|
| Migration | `supabase/migrations/20261009123000_fix_manage_staff_access_invite_audit.sql` | Set `had_staff_profile := found` after `SELECT … INTO` so first grant emits `staff.invited` (RBAC-10) |
| Test | `supabase/tests/012_phase4b_audit_foundation.sql` | Append-only / de-id asserts run as table owner (`service_role` has no UPDATE) |
| Test | `supabase/tests/019_ops04_people_access.sql` | Restored assert: first staff grant writes `staff.invited` |

## Security impact

- Audit taxonomy for first staff invite is correct again (`staff.invited`).
- No widening of role permission bundles.
- Append-only / de-identification behavior unchanged; tests now match actual grants.

## Still optional (not in this batch)

- `staff_list_student_guardians` ambiguous `id` (RETURNS TABLE vs `profiles.id`)
- Production EXECUTE grant for `private.can_use_staff_registry` if saved-views RLS fails outside tests
