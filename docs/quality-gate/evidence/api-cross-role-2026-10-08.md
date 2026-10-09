# Cross-role API security tests — 2026-10-08

Roadmap **#3**: implement cross-user and cross-role API security tests (mocked route boundaries; CI via Vitest).

## Result

| Item | Value |
|---|---|
| Command | `pnpm exec vitest run src/app/api/api-cross-role-security.test.ts` |
| Outcome | **PASS** — 13/13 |
| Suite file | `src/app/api/api-cross-role-security.test.ts` |
| Included in `pnpm test` / CI `quality` | Yes (Vitest include `src/**/*.test.ts`) |

## Cases covered

| Test ID | Scenario | Expected |
|---|---|---|
| QG-RBAC-003 | Mentor without `premium.manage` grants Premium | 403; RPC not called |
| QG-API-004 | Mass-assign `starts_at` on Premium grant | 400; RPC not called |
| QG-RBAC-003 | `read_only_staff` without `mentor_assignments.manage` | 403 |
| QG-RBAC-002 | Forge `super_admin` assign without `roles.manage` | 403 |
| QG-RBAC-004 | Mentor manages unassigned student workspace | 403 |
| QG-RBAC-005 | Share document without `document_shares.manage` | 403 |
| QG-API-001 | Peer document byte access denied | 403 |
| QG-AUTH-006 | Profile body `id` cannot retarget peer | Session id used |
| QG-AUTH-006 | Notification mutate scoped to session student | `student_id` filter |
| QG-AUTH-001 | Anonymous profile mutate | 401 |
| QG-AI-002 | Ops AI without staff context | 401 |
| QG-AI-002 | Student AI without student context | 401 |
| QG-AI-002 | Student calling ops AI | 401 |

## Limits (honest)

- These are **mocked authorization-boundary** tests, not live HTTP against staging.
- They do **not** replace runtime pgTAP (roadmap #2 still FAIL overall).
- Not every API route is enumerated yet; extend this file when adding high-risk routes.
- Positive “allowed path” coverage remains in existing route-specific suites.
