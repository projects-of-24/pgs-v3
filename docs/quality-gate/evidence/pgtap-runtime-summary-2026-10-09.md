# Runtime pgTAP triage — 2026-10-09 (RBAC-01)

**Task:** Investigate why pgTAP is not green. Classify failures. No grants/RLS/test/app changes.

**Verdict: FAIL (executed).** Same aggregate shape as 2026-10-08 clean run. Root causes now classified below.

## Environment

| Item | Value |
|---|---|
| Host | Local Colima Docker + Supabase CLI `2.114.0` |
| Target | Isolated local `pgs-v3` only (not production, not linked remote) |
| Ports | Temporary `55421`/`55422`/`55427` (defaults occupied by other local projects); **restored** after run |
| Prep | `supabase db reset --local` then `supabase test db --local` |
| Production data | None |

## Commands

```bash
# temporary ports in supabase/config.toml (restored after)
supabase start --exclude studio,mailpit,imgproxy,edge-runtime,vector
supabase db reset --local
supabase test db --local
supabase stop
# restore config.toml to 54321/54322
```

Raw log: [`pgtap-runtime-clean-2026-10-09.log`](./pgtap-runtime-clean-2026-10-09.log)  
RBAC focus re-run: [`pgtap-rbac-focus-2026-10-09.log`](./pgtap-rbac-focus-2026-10-09.log)  
Reset: [`pgtap-db-reset-2026-10-09.log`](./pgtap-db-reset-2026-10-09.log)

## Aggregate

| Metric | Value |
|---|---|
| Suites | 27 |
| Assertions counted | 538 |
| Overall | **FAIL** |
| Suites fully OK | **13** |
| Suites failed / aborted | **14** |

### Passed (13)

`001`, `002`, `003`, `004`, `007`, `008`, `009`, `010`, `011`, `013`, `016`, `024`, `026`

Includes: student RLS, Premium workspace, actor-context RBAC, clean document gate, viewer relationships, document sharing.

### Failed / aborted (14)

`005`, `006`, `012`, `014`, `015`, `017`, `018`, `019`, `020`, `021`, `022`, `023`, `025`, `027`

---

## Per-suite classification

| Suite | Root cause | Class | Evidence | Security impact | Recommended fix (needs approval) |
|---|---|---|---|---|---|
| `005_admin_cms_rls` | Revoke audit event renamed: test expects `staff.access_deactivated`, product emits `staff.access_revoked` | Outdated test | Local probe: deactivate → `staff.access_revoked`; have `(0)` want `(1)` | None for access control; audit naming drift vs test | Update assertion to `staff.access_revoked` |
| `006_production_hardening_rls` | Suite aborts: `service_role` has no `SELECT` on `premium_plans` | Migration mismatch / outdated test setup | HINT grant SELECT to service_role; privilege probe `srv_plans=f` | Not a student-data leak; later mentor/Premium assertions in this file **not reached** | Run setup as `postgres` / use SECURITY DEFINER helper; or document intentional revoke |
| `012_phase4b_audit_foundation` | (a) Invite audit type: test expects `staff.invited`, first-time grant can emit `staff.role_changed` because `SELECT … INTO had_staff_profile` leaves NULL when no row and `not NULL` skips invite branch. (b) UPDATE/DELETE expect `P0001` append-only; actual `42501` no privilege. (c) Forced-fail trigger keys on `staff.invited` so transactional rollback test never fires | Genuine audit-event logic defect + outdated tests | Probe invite → `staff.role_changed`; UPDATE/DELETE catch `42501`; throws_ok “no exception” on forced fail | **No unauthorized student/doc access.** Audit taxonomy wrong for invites; append-only enforced via missing grants (fail-closed). Transactional audit coupling **unproven** for current event names | Fix `had_staff_profile` NULL handling in `manage_staff_access`; align tests to real event names + `42501`; retarget force-fail trigger |
| `014_phase4d_document_security_lifecycle` | Asserts `hasnt_table document_shares` but Phase 4E exists | Outdated test | Failed test 2; `016` passes sharing suite | None — 4E is intentional | Remove/replace stale “4E not created” assertion |
| `015_phase4d_document_lifecycle_behaviors` | Aborts: `permission denied for table notifications` (setup as role without SELECT) | Outdated test / grant hardening | ERROR line 259; `srv_notif=f` for service_role | Document lifecycle behaviors **not verified** this run; clean-gate `008` and shares `016` still OK | Query notifications via privileged role or RPC |
| `017_ops02_student_registry` | `results_eq` type mismatch `text[]` vs `text` in backfill assertion | Outdated / incorrect test | `cannot compare dissimilar column types text[] and text` | None for RBAC | Fix expected array typing / use `is()` |
| `018_ops03_registry_search` | (a) `isnt(bigint, integer)` missing overload. (b) `set_mentor_assignment` raises `active Premium required` without entitlement fixture | Outdated test + missing fixture | Failed 2,7,15; Premium gate in `ops05`/`phase4c` migrations | Mentor assign gate is **intentional product**; suite aborted so search isolation incompletely proven | Cast types; grant Premium in fixture before assign |
| `019_ops04_people_access` | Inserts `profiles` after `auth.users`, but `create_profile_after_auth_signup` already created the row | Missing / incorrect fixture | `profiles_pkey` duplicate on first student id; fails in isolation too | **read_only_staff=2 grants confirmed** in local probe; suite’s permission matrix tests largely **not executed** | Use `update profiles` instead of re-insert |
| `020_ops05_assignments` | Same auto-profile fixture bug | Missing / incorrect fixture | Duplicate `profiles_pkey` in isolation re-run | Mentor assigned vs unassigned isolation in **this** suite not verified; covered partly by passed `004`/`009` | Fix fixture like `019` |
| `021_phase6_student_operations` | Same auto-profile fixture bug | Missing / incorrect fixture | Duplicate `profiles_pkey` | Student-ops notification helpers unverified this run | Fix fixture |
| `022_phase7_cms_catalog` | Test deletes `staff_role_permissions` while `authenticated` — correctly denied | Outdated test setup | `42501` on `staff_role_permissions` | Denial is **correct**; publish-boundary tests aborted | Strip permission as `postgres` inside transaction, or use test helper |
| `023_phase7a_draft_preview` | Anon `SELECT` on `catalog_draft_revisions` raises `42501` instead of returning count `0` | Outdated test | ERROR as `anon` | Stronger than expected (no privilege). **Not** a draft leak | Assert `has_table_privilege` false or `throws_ok` |
| `025_mini_crm_v1` | Premium required for assign; later `42501` on `student_crm_tags` under authenticated | Missing fixture + grant/RLS setup drift | Failed 12, 25; suite aborted mid-plan | CRM tag attach path unverified; not proof of open access | Premium fixture; attach via granted RPC/role |
| `027_guardian_portal_v1` | Invalid UUID fixture `g0270000-…` | Incorrect fixture | `invalid input syntax for type uuid` | Guardian suite not verified | Replace with valid UUID |

---

## RBAC-focused notes (owner checklist)

| Concern | Status this run |
|---|---|
| `mentor_assignments` isolation | **Partially verified** — `004`, `009` passed; `020` aborted on fixture |
| `students.read` vs `student_workspace.read` | App model unchanged; Ops registry suites `017`–`020` mostly aborted — **not re-proven** here |
| workspace `*_all` overrides | Covered in passed actor/Premium suites; Ops-05 incomplete |
| Mentor assigned vs unassigned | Passed in `004`/`009`; Ops-05 incomplete |
| admin / super_admin boundaries | Partially in `005` (38/39); revoke audit assertion only mismatch |
| `read_only_staff` restrictions | Seed still **2** permissions (`overview.read`, `students.read`) — probed |
| Cross-user / cross-role | Strongest evidence remains passed suites + Vitest mocks; failed suites were mostly fixture/audit/setup |

## Unauthorized student records / documents?

| Question | Answer |
|---|---|
| Did any failure show a peer/mentor reading unassigned student rows? | **No** — those assertions either passed (`004`/`009`/`013`/`016`) or never ran (aborted fixtures) |
| Did any failure show anon/authenticated forging audit or reading drafts via privilege? | **No** — failures were missing privileges, wrong event names, or bad fixtures |
| Audit invite naming / transactional rollback | Observability integrity concern; **not** an open SELECT on student documents |

---

## What this does / does not prove

**Proves:** Full suite still FAIL on clean local DB; most failures are test/fixture/event-name drift; core student/Premium/share/viewer suites still pass when executed.

**Does not prove:** Production RLS is fully correct; Ops-04/05/06 assignment matrix is runtime-green; CI runtime pgTAP (still absent).
