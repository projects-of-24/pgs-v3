# Runtime pgTAP evidence — 2026-10-08

Roadmap **#2**: run and validate runtime RLS tests on an isolated local database.

**Verdict: FAIL (executed).** Do not treat static `pnpm test:rls` as equivalent. Do not claim full RLS runtime verification.

## Environment

| Item | Value |
|---|---|
| Host | Local Colima Docker + Supabase CLI `2.114.0` |
| Target | Isolated local `pgs-v3` stack only (not production, not linked remote) |
| Ports used for this run | API `55421`, DB `55422` (temporary; default `54321`/`54322` were occupied by another local project) |
| DB prep | `supabase db reset --local` then `supabase test db --local` |
| Production data | None imported |

## Commands used

```bash
colima start
# temporary alternate ports in supabase/config.toml (restored after run)
supabase start
supabase db reset --local
supabase test db --local
supabase stop
# restore supabase/config.toml to 54321/54322
```

## Aggregate result (clean DB run)

| Metric | Value |
|---|---|
| Suites | 27 |
| Assertions counted by harness | 538 |
| Overall | **FAIL** |
| Suites fully OK | **13** |
| Suites with failures / aborted | **14** |

Raw log: [`pgtap-runtime-clean-2026-10-08.log`](./pgtap-runtime-clean-2026-10-08.log)  
Prior polluted-backup run (for comparison only): [`pgtap-runtime-2026-10-08.log`](./pgtap-runtime-2026-10-08.log)  
Reset log: [`pgtap-db-reset-2026-10-08.log`](./pgtap-db-reset-2026-10-08.log)

## Suites that passed (clean run)

- `001_parity_proof_rls.sql`
- `002_public_site_rls.sql`
- `003_auth_student_rls.sql`
- `004_premium_workspace_rls.sql`
- `007_phase36_premium_validity.sql`
- `008_phase4_0_clean_document_gate.sql`
- `009_phase4a_actor_context_rbac.sql`
- `010_phase4a_audit_deidentification.sql`
- `011_phase4a_entitlement_event_deidentification.sql`
- `013_phase4c_student_viewer_relationships.sql`
- `016_phase4e_explicit_document_sharing.sql`
- `024_phase8_integration_connections.sql`
- `026_advanced_analytics_search.sql`

## Suites that failed or aborted (clean run)

| Suite | Failure theme (from log; not a root-cause fix) |
|---|---|
| `005_admin_cms_rls.sql` | Staff role revoke not producing expected canonical audit row |
| `006_production_hardening_rls.sql` | Aborted: `permission denied for table premium_plans` as `service_role` in test query |
| `012_phase4b_audit_foundation.sql` | Missing canonical audit events; append-only / de-id expectations vs `42501` |
| `014_phase4d_document_security_lifecycle.sql` | Stale assertion: “phase 4E sharing tables are not created” (4E now exists) |
| `015_phase4d_document_lifecycle_behaviors.sql` | Aborted: `permission denied for table notifications` as `service_role` |
| `017_ops02_student_registry.sql` | Backfill assertion type mismatch (`text[]` vs `text`) |
| `018_ops03_registry_search.sql` | `isnt(bigint, integer)` missing; Premium required for mentor assignment; incomplete plan |
| `019_ops04_people_access.sql` | Duplicate `profiles` PK — fixture collision / aborted plan |
| `020_ops05_assignments.sql` | Duplicate `profiles` PK — fixture collision / aborted plan |
| `021_phase6_student_operations.sql` | Duplicate `profiles` PK — fixture collision / aborted plan |
| `022_phase7_cms_catalog.sql` | `permission denied` on `staff_role_permissions` delete as `authenticated` |
| `023_phase7a_draft_preview.sql` | `permission denied` on `catalog_draft_revisions` as `anon` |
| `025_mini_crm_v1.sql` | Premium required for assignment; CRM tag permission denials |
| `027_guardian_portal_v1.sql` | Invalid UUID fixture (`g027…` is not a valid UUID) — suite aborted |

## Classification (for follow-up; not fixed in roadmap #2)

| Class | Examples |
|---|---|
| **Likely stale test vs later migrations** | `014` expecting no Phase 4E tables |
| **Likely broken/outdated fixture** | `027` non-UUID id; `018` `isnt` types; `017` array vs scalar |
| **Possible cross-suite fixture leakage** | `019`–`021` duplicate profile keys when run in full suite |
| **Possible product/grant drift needing investigation** | Audit canonical events (`005`, `012`); service_role SELECT grants in tests (`006`, `015`); Premium gate on mentor assign (`018`, `025`) |

Roadmap #2 **does not** change migrations, grants, or tests to force green. Fixes need a separate owner-approved task.

## What this does / does not prove

**Proves**

- Runtime pgTAP can execute locally with Docker + Supabase CLI.
- Core auth/student/Premium/clean-document/viewer/share suites in the pass list executed successfully on a clean local DB.
- Full suite is **not** currently green.

**Does not prove**

- Production RLS is correct.
- Failed suites imply production is exploitable (some failures are test bugs).
- CI runtime RLS (still not in CI).
