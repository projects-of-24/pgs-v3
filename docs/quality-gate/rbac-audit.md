# RBAC audit — PGS V3

**Date:** 2026-10-09  
**Scope:** Staff RBAC, student Premium workspace access, API/page gates, test evidence.  
**Method:** Source + migration inspection. **Not** a live penetration test.  
**Rule:** Appearing correct in code ≠ verified secure in production.

Related: [role-permission-matrix.md](./role-permission-matrix.md) · [security-test-cases.md](./security-test-cases.md) · `docs/pgs-v3-audit/05-auth-permissions-rls-viewer-map.md`

---

## 1. Verdict (short)

| Layer | Assessment |
|---|---|
| Model design | **Sound** — permission keys + DB grants + `mentor_assignments` + Premium entitlement |
| App enforcement pattern | **Generally strong** — `requireStaffPermission` / `requireStudentViewer` before mutations |
| DB RLS | **Implemented; runtime suite not green** — triaged 2026-10-09 (mostly test/fixture drift; one audit-event logic defect) |
| Automated proof | **Partial** — Vitest/API mocks + anonymous Playwright; fixture role e2e needs CI secrets |
| Top residual risks | Permission drift DB↔TS; coarse `overview.read` page entry; pgTAP still FAIL until approved fixes |

---

## 2. Actor model (actual PGS — not marketplace)

### Students / public

| Actor | Gate |
|---|---|
| Anonymous | No session; public only |
| Standard student | Auth + profile; Premium locked |
| Premium student | Auth + **active** `premium_entitlements` |
| Guardian | Separate portal scope (linked child) |
| Relationship document Viewer | Share/relationship predicates — **not** a staff role |

### Staff (canonical keys)

| Role key | Intent (from migrations) |
|---|---|
| `super_admin` | All staff permissions; last-super-admin protected in RPCs |
| `admin` | Day-to-day Ops/CMS/catalog/Premium; **no** `roles.manage` |
| `mentor` | Assigned-student workspace (+ limited targets/media) |
| `read_only_staff` | Narrow read (`overview.read`, `students.read`) after OPS-04 |

Legacy staff string `viewer` → normalized to `read_only_staff` in app + migrations.

Effective staff access =  
`active staff_profiles` + **non-revoked** `staff_role_assignments` → role → `staff_role_permissions` → keys filtered by TS allowlist in `src/lib/staff-auth.ts`.

---

## 3. Permission catalog (TS allowlist)

From `staffPermissionKeys` in `src/lib/staff-auth.ts` (must stay in sync with DB `staff_permissions`):

| Domain | Keys |
|---|---|
| Overview | `overview.read` |
| Students / workspace | `students.read`, `student_workspace.read`, `.read_all`, `.manage`, `.manage_all` |
| Premium / assignments | `premium.manage`, `mentor_assignments.manage` |
| Documents | `document_shares.manage` |
| Staff targets | `staff_targets.read`, `.manage`, `.manage_all` |
| Catalog | `catalog.read`, `.manage`, `.publish` |
| CMS / content / media | `cms.*`, `content.*`, `media.*` |
| Leads | `leads.read`, `.manage` |
| Staff / audit / settings | `staff.read`, `roles.manage`, `audit.read`, `settings.read`, `.manage` |

Unknown keys from DB are **dropped** by the allowlist (fail-closed for unrecognized grants).

---

## 4. Seeded role → permission matrix (migrations)

Authority: `202608130004_admin_cms.sql` + OPS-04 narrow + Phase 4E shares + OPS-07 targets.

| Permission | super_admin | admin | mentor | read_only_staff |
|---|---|---|---|---|
| `overview.read` | ✓ | ✓ | ✓ | ✓ |
| `students.read` | ✓ | ✓ | — | ✓ |
| `student_workspace.read` | ✓ | —* | ✓ | — |
| `student_workspace.read_all` | ✓ | ✓ | — | — |
| `student_workspace.manage` | ✓ | —* | ✓ | — |
| `student_workspace.manage_all` | ✓ | ✓ | — | — |
| `premium.manage` | ✓ | ✓ | — | — |
| `mentor_assignments.manage` | ✓ | ✓ | — | — |
| `document_shares.manage` | ✓ | ✓ | — | — |
| `staff_targets.read` | ✓ | ✓ | ✓ | — |
| `staff_targets.manage` | ✓ | ✓ | ✓ | — |
| `staff_targets.manage_all` | ✓ | ✓ | — | — |
| Catalog / CMS / content / media / leads | ✓ | ✓ (full admin bundle) | `media.read` only | — |
| `staff.read` | ✓ | ✓ | — | — |
| `roles.manage` | ✓ | — | — | — |
| `audit.read` | ✓ | ✓ | — | — |
| `settings.*` | ✓ | ✓ | — | — |

\*Admin uses `*_all` workspace permissions, not the assigned-only pair.

**Mentor workspace scope (app):** `requireStudentViewer` / `requirePremiumActor(studentId)` requires active Premium on the target **and** either global workspace permission or active `mentor_assignments` row — not role name alone.

---

## 5. Enforcement map (how access is checked)

```text
Browser / page
  → proxy protected paths (/ops, /admin, /student, …)
  → page: requireStaffPermission(...) or student experience resolver
  → mutations: API route requireStaffPermission / requirePremiumActor
  → Postgres RLS + has_staff_permission() / assignment predicates
```

| Surface | Primary check | Scope check |
|---|---|---|
| Staff pages (`/admin/*`, `/ops/*`) | `requireStaffPermission` / `getStaffContext` | Often `can()` for buttons; deep data via workspace loader |
| Staff APIs | `requireStaffPermission("<key>")` | RPC/RLS for row scope |
| Student Premium pages/APIs | `requirePremiumActor` → `requireStudentViewer` | Own id or mentor assignment / admin workspace perms |
| Document bytes | `authorizeDocumentByteAccess` + clean gate | Owner / share / staff path |
| AI ops | `getAuthorizedStaffContext` needs `overview.read` | Tools further scope by permissions |
| AI student | `getAuthorizedStudentId` | Own context only |
| View as Student | Staff context + preview cookie + `AUTH_FLOW_SECRET` | Must not mutate as student |

---

## 6. API / page permission inventory (high-risk)

| Action | Required permission (app) | Notes |
|---|---|---|
| Grant/revoke Premium | `premium.manage` | Rejects mass-assign `starts_at` |
| Mentor assign/end | `mentor_assignments.manage` | |
| Invite/assign staff roles | `roles.manage` | Super Admin only in seed |
| Document share create/revoke | `document_shares.manage` + admin/super workspace actor | |
| Workspace alerts/tasks mutate | `requirePremiumActor(..., "manage")` + not student | Mentor assigned or manage_all |
| Guardian manage | `student_workspace.manage_all` | |
| Catalog mutate / publish | `catalog.manage` / `.publish` | |
| CMS draft / publish | `cms.manage` / `.publish` | |
| Settings write | `settings.manage` | Non-secret keys only |
| Ops search / scoreboard entry | `overview.read` | Then data scoped |

Cross-role negatives covered in Vitest: `src/app/api/api-cross-role-security.test.ts` (QG-RBAC / QG-API IDs).

---

## 7. Findings (severity)

### Critical / high

| ID | Finding | Evidence | Status |
|---|---|---|---|
| RBAC-01 | Runtime RLS/RBAC pgTAP **not green** | Batch B: **27/27 PASS** (713 asserts). Evidence: [evidence/pgtap-batch-b-2026-10-09.md](./evidence/pgtap-batch-b-2026-10-09.md) | **Closed locally** — still not in CI |
| RBAC-02 | Permission truth can drift (DB grants vs TS allowlist vs seed intent) | SEC-07 pattern; no CI job comparing DB bundle to matrix | Open |
| RBAC-03 | Authenticated cross-role **browser** proof incomplete in CI until fixture secrets set | `@auth-regression` fixture cases skip without secrets | Wiring done; owner secrets pending |

### Medium

| ID | Finding | Evidence | Status |
|---|---|---|---|
| RBAC-04 | Many Ops pages gate on `overview.read` only; fine-grained deny is deeper (workspace/RPC) | Mentors have `overview.read` by design | Acceptable if every mutation path re-checks; audit mutations when adding pages |
| RBAC-05 | `staff_profiles.role` historical column vs assignment-based truth | Backfill + assignments are canonical in app load path | Watch dual-reads in old SQL/RPCs |
| RBAC-06 | UI `can()` hide ≠ security | Pattern is correct when API/RPC enforce; regression risk on new UI-only checks | Process |
| RBAC-07 | Dual-actor (student + staff same Auth user) | Invite reuse path exists | Needs explicit negative tests per new dual-actor feature |
| RBAC-10 | First-time staff invite may emit `staff.role_changed` instead of `staff.invited` (`had_staff_profile` NULL from empty `SELECT INTO`) | Fixed in `20261009123000_fix_manage_staff_access_invite_audit.sql` | **Closed** |

### Low / hygiene

| ID | Finding | Status |
|---|---|---|
| RBAC-08 | Relationship Viewer ≠ `read_only_staff` naming hazard | Documented; keep tests explicit |
| RBAC-09 | Marketplace Buyer/Seller roles N/A | Do not invent |

---

## 8. Test coverage vs RBAC

| Proof | What it covers | Gap |
|---|---|---|
| Vitest `staff-auth.test.ts` | Builder uses DB grants only; suspended denied | Not live DB |
| Vitest `api-cross-role-security.test.ts` | Premium/assign/roles/share/workspace/AI denials | Mocked boundaries |
| Vitest document security | Clean gate + peer deny | Mocked |
| Playwright `@auth-regression` | Anonymous denials in CI | Role cases need fixtures |
| pgTAP `supabase/tests/*` | Intended actor isolation | **Overall FAIL** locally (triaged 2026-10-09) |
| Static `pnpm test:rls` | Migration text contains policies | Not runtime |

---

## 9. Recommended next actions (approval required)

Ordered for safety/value:

1. ~~**pgTAP batch A (tests/fixtures)**~~ — Done 2026-10-09.  
2. ~~**pgTAP batch B (invite audit migration)**~~ — **Done 2026-10-09 — full suite PASS.**  
3. **Optional:** fix `staff_list_student_guardians` ambiguous `id`; confirm production EXECUTE on `can_use_staff_registry` if saved-views RLS fails outside tests.  
4. **Owner:** CI Auth fixture secrets ([ci-auth-fixtures.md](./ci-auth-fixtures.md)); consider adding runtime pgTAP to CI.  
5. **Contract test** — role→permission snapshot vs DB.  
6. Do **not** widen `read_only_staff` or mentor bundles without owner approval.

---

## 10. What this audit does / does not claim

**Does:** Map real PGS roles/permissions, where they are enforced, and where proof is weak.  
**Does not:** Claim production RBAC is fully verified; invent Buyer/Seller roles; change grants or RLS.

---

## 11. RBAC-01 pgTAP (triage → batch A → batch B)

| Item | Result |
|---|---|
| Triage | 13/27 → classified failures |
| Batch A | tests/fixtures → 26/27 |
| Batch B | `had_staff_profile := found` + `012`/`019` realign → **27/27 PASS (713)** |
| RBAC-10 | **Fixed** in migration `20261009123000_fix_manage_staff_access_invite_audit.sql` |
| Unauthorized student/doc access shown? | **No** |
| Evidence | [evidence/pgtap-batch-b-2026-10-09.md](./evidence/pgtap-batch-b-2026-10-09.md) |

Local stack stopped; `config.toml` ports restored. Migration applied on **local** reset only — apply to linked/staging with owner approval when ready.

---

## Approval checkpoint

Runtime pgTAP is green locally. Next optional: guardian list RPC fix, `can_use_staff_registry` prod grant check, CI Auth secrets, or add pgTAP to CI.
