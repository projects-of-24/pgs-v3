# Quality Gate — Security Test Cases

Reusable case schema plus an initial PGS catalog. Status reflects **Phase 0 documentation**, not a claim that every risk is closed.

---

## Case schema (required fields)

| Field | Description |
|---|---|
| **Test ID** | Stable ID: `QG-<AREA>-<nnn>` |
| **Feature name** | Product area |
| **Business rule** | Rule under test |
| **Test scenario** | Actor, action, target |
| **Expected result** | Deny/allow + side effects |
| **Test type** | `unit` \| `api` \| `rls` \| `e2e` \| `secret` \| `static` |
| **Risk level** | `critical` \| `high` \| `medium` \| `low` |
| **Implementation status** | `missing` \| `written` \| `ci-verified` \| `env-gated` \| `not-executed` |
| **Evidence** | Path, CI job name, or `not executed` |

### Status meanings

| Status | Meaning |
|---|---|
| `ci-verified` | Covered by a suite that CI runs and fails on |
| `written` | Automated test exists; not proven in CI |
| `env-gated` | Exists but skips without fixtures/secrets |
| `not-executed` | Suite exists (e.g. pgTAP) but runtime not run here |
| `missing` | No automated case yet |

---

## Core catalog (reuse IDs across apps; implement per app)

### Authentication — `QG-AUTH-*`

| Test ID | Business rule | Scenario | Expected | Type | Risk | PGS status |
|---|---|---|---|---|---|---|
| QG-AUTH-001 | Protected resources require auth | Unauthenticated request to protected API/page | 401/redirect; no data | api/e2e | critical | ci-verified (API mock + Playwright `@auth-regression` anonymous denials) |
| QG-AUTH-002 | Invalid/expired credentials rejected | Bad session / bad token | Denied | api/unit | critical | partial |
| QG-AUTH-003 | Logged-out cannot mutate | Session cleared then POST | Denied | e2e/api | critical | env-gated / partial |
| QG-AUTH-004 | Login rate limiting | Burst login/reset attempts | Throttled when configured | api | high | written helpers; runtime env-dependent |
| QG-AUTH-005 | Session secrets not exposed to client | Inspect client bundle / responses | No service-role / flow secrets | secret/unit | critical | custom scan ci-verified; bundle review ongoing |
| QG-AUTH-006 | No impersonation via ID change | Swap studentId/user id in request | 403 / empty | api | critical | ci-verified (profile + notification scoping in `api-cross-role-security.test.ts`) |
| QG-AUTH-007 | Revoked access ends capability | Revoke role/assignment/share | Subsequent access denied | rls/api | critical | pgTAP written; not-executed in CI |

### RBAC — `QG-RBAC-*`

| Test ID | Business rule | Scenario | Expected | Type | Risk | PGS status |
|---|---|---|---|---|---|---|
| QG-RBAC-001 | Peer isolation | User A reads User B private | Deny | rls/api | critical | pgTAP + mocks; runtime RLS not CI |
| QG-RBAC-002 | Role cannot self-escalate | Body/header forges admin role | Deny | api | critical | ci-verified (`api-cross-role-security.test.ts` super_admin assign) |
| QG-RBAC-003 | Staff permission required | Staff without permission hits route | 403 | api/unit | high | ci-verified (Premium + assignments + existing admin routes) |
| QG-RBAC-004 | Mentor scope | Mentor A → student B unassigned | Deny | rls/api | critical | ci-verified (workspace BOLA mock); pgTAP runtime still mixed |
| QG-RBAC-005 | Admin-only ops | Mentor hits roles.manage / document share path | Deny | api | high | ci-verified (roles + document_shares denials) |

### API security — `QG-API-*`

| Test ID | Business rule | Scenario | Expected | Type | Risk | PGS status |
|---|---|---|---|---|---|---|
| QG-API-001 | BOLA/IDOR | Guess peer resource UUID | 404/403; no leak | api | critical | ci-verified (document peer deny + workspace); expand remaining routes |
| QG-API-002 | Function-level auth | Call admin function as student | Deny | api | critical | ci-verified (staff permission denials + AI ops) |
| QG-API-003 | Input validation | Malformed JSON / types | 400; safe error | api/unit | medium | partial (Zod elsewhere) |
| QG-API-004 | Mass assignment | Extra ownership fields in body | Ignored / rejected | api | high | ci-verified (`starts_at` rejected on Premium grant) |
| QG-API-005 | Safe errors | Force failure | No stack/secrets in body | api | medium | partial |
| QG-API-006 | Abuse limits | Oversized body / filter abuse | Reject / limit | api | medium | upload size limits written; broader missing |

### Database / RLS — `QG-RLS-*`

| Test ID | Business rule | Scenario | Expected | Type | Risk | PGS status |
|---|---|---|---|---|---|---|
| QG-RLS-001 | RLS enabled on private tables | Fixture actors | Policies enforce | rls | critical | static ci-verified; runtime not-executed |
| QG-RLS-002 | Ownership field immutable | UPDATE owner column as peer | Deny / no change | rls | critical | suite-dependent; not CI runtime |
| QG-RLS-003 | Privileged functions restricted | Call SECURITY DEFINER as anon | Deny | rls | high | suite-dependent; not CI runtime |
| QG-RLS-004 | Clean document gate | Non-clean signed URL path | Deny | api/rls | high | unit/api mocks ci-verified; pgTAP not CI |

### Secrets — `QG-SEC-*`

| Test ID | Business rule | Scenario | Expected | Type | Risk | PGS status |
|---|---|---|---|---|---|---|
| QG-SEC-001 | No committed live secrets | Repo scan | Clean | secret | critical | custom scan ci-verified |
| QG-SEC-002 | Service role not in client | Frontend / NEXT_PUBLIC_* | Absent | secret/static | critical | policy + scan; continuous vigilance |
| QG-SEC-003 | Dependency high vulns | `pnpm audit` | No high+ or waived with owner note | secret | high | ci-verified |

### Payments / AI — `QG-PAY-*` / `QG-AI-*`

| Test ID | Business rule | Scenario | Expected | Type | Risk | PGS status |
|---|---|---|---|---|---|---|
| QG-PAY-001 | Invalid webhook signature | Bad signature | Reject; no entitlement grant | api | critical | missing / incomplete as CI suite |
| QG-PAY-002 | Duplicate webhook | Replay delivery | Idempotent | api | high | missing |
| QG-AI-001 | Invalid model JSON | Malformed AI payload | Fallback; no crash; no XSS href | unit | high | ci-verified (`ai-v1.test.ts`) |
| QG-AI-002 | Unauthorized AI route | Wrong actor | Deny | api | high | ci-verified (ops + student AI 401 paths) |
| QG-AI-003 | Prompt injection in content | Hostile upload/text | No privilege gain | api | high | missing / incomplete |

### Media storage — `QG-MED-*`

| Test ID | Business rule | Scenario | Expected | Type | Risk | PGS status |
|---|---|---|---|---|---|---|
| QG-MED-001 | Unauthorized upload | Wrong actor | Deny | api | critical | written (upload lifecycle mocks) |
| QG-MED-002 | Invalid type / size | Bad MIME / oversize | Deny | api/unit | high | written |
| QG-MED-003 | Peer file isolation | Student B path | Deny | api/rls | critical | written + pgTAP; runtime not CI |
| QG-MED-004 | R2 seller isolation | — | — | — | — | **N/A** (Supabase Storage) |

---

## Mapping to existing PGS suites (examples)

| Area | Example paths | CI? |
|---|---|---|
| Cross-role / BOLA matrix | `src/app/api/api-cross-role-security.test.ts` | yes (Vitest) — roadmap #3 |
| Document clean gate / IDOR mocks | `src/app/api/premium/documents/documents-security.test.ts` | yes (Vitest) |
| Upload lifecycle | `src/app/api/premium/documents/upload-lifecycle.test.ts` | yes |
| Admin routes | `src/app/api/admin/admin-routes.test.ts` | yes |
| Student routes | `src/app/api/student/student-routes.test.ts` | yes |
| Staff auth builder | `src/lib/staff-auth.test.ts` | yes |
| AI schema | `src/lib/ai/ai-v1.test.ts` | yes |
| OAuth / recovery | `src/app/auth/oauth-security.test.ts`, `src/lib/auth-recovery.test.ts` | yes |
| Runtime RLS | `supabase/tests/*.sql` | **no** |
| Browser smoke | `tests/e2e/*` `@smoke` | yes (subset) |
| Browser full / auth | other `tests/e2e/*` | often env-gated |

When adding cases, extend `api-cross-role-security.test.ts` and this table with new Test IDs rather than inventing a second catalog.

---

## OWASP alignment (reference only)

Use as a checklist when writing cases — not as a claim of full ASVS certification:

- API1 BOLA / IDOR → `QG-API-001`, `QG-RBAC-001`
- API2 Broken auth → `QG-AUTH-*`
- API3 Broken object property / mass assignment → `QG-API-004`
- API5 Broken function auth → `QG-API-002`, `QG-RBAC-003`
- API8 Misconfiguration / secrets → `QG-SEC-*`
- API9 Inventory mismanagement → keep API route inventory current
- API10 Unsafe API consumption (AI/webhooks) → `QG-AI-*`, `QG-PAY-*`
