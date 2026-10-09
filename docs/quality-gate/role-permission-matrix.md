# Quality Gate — Role & Permission Matrix

This file has two layers:

1. **Core template** — reusable for every Projects of 24 application.
2. **Application: PGS V3** — actual roles and permissions in this repository.

**PGS live audit (enforcement + gaps):** [rbac-audit.md](./rbac-audit.md)

Do not invent permissions. If a cell is unknown, mark **OWNER DECISION** and wait.

---

## Core template (Projects of 24)

Use this structure in each app. Replace actors and resources with that product’s truth.

### Actor catalog (fill per app)

| Actor ID | Description | Authn | Notes |
|---|---|---|---|
| `anon` | Not signed in | none | Public only |
| `user_a` / `user_b` | Two peers same role | session | Cross-user isolation |
| `staff_*` | Internal operators | session + role/permission | Least privilege |
| `admin` / `super_admin` | Elevated | session + grants | Protect role changes |

Marketplace apps may add Buyer, Seller, Seller staff, Moderator, etc.  
Education apps may add Student, Mentor, Guardian, etc.  
**Do not copy marketplace actors into PGS or student actors into marketplace apps.**

### Permission matrix template

| Resource / action | Actor 1 | Actor 2 | Actor 3 | Cross-tenant denial |
|---|---|---|---|---|
| Read own record | allow / deny | … | … | peer cannot read |
| Update own record | | | | |
| Read peer record | | | | |
| Admin-only action | | | | |
| Role/permission change | | | | |

### Mandatory negative tests (every app)

- Unauthorized → no protected resource.
- Peer A cannot read/modify peer B private data.
- UI hide ≠ security; backend must deny.
- Client-supplied role / `user_id` / `org_id` cannot escalate.
- Revoked role/session loses access per policy.

---

## Application: PGS V3

Sources (code/docs — not newly invented):

- Student states: product rules / `student-experience` three-state model
- Staff roles & permission keys: `src/lib/staff-auth.ts`
- Domain contracts: `mentor_assignments`, `premium_entitlement`, Phase 4D documents, `audit_events`
- Mapping notes: `docs/pgs-v3-audit/05-auth-permissions-rls-viewer-map.md`

### Student / public actors

| Actor | Identity | Effective access (summary) |
|---|---|---|
| Anonymous | no session | Public content only |
| Standard student | authenticated, no active Premium entitlement | Own profile/saved/notifications; Premium locked |
| Premium student | authenticated + active entitlement | Own Premium workspace / documents per policy |
| Guardian (portal) | guardian auth + linked child scope | Explicitly approved linked-child data only |

Student UI state labels: `anonymous` | `authenticated_standard` | `authenticated_premium`.

Premium is an **entitlement**, not a staff role or JWT role claim.

### Staff actors

| Role key | Notes |
|---|---|
| `super_admin` | Highest staff role; protect grants |
| `admin` | Organization-authorized staff operations (permission-shaped) |
| `mentor` | Assigned students via `mentor_assignments` — not global student access |
| `read_only_staff` | Canonical name for former `viewer` staff alias |

Legacy string `viewer` in staff roles normalizes to `read_only_staff` in application code. Relationship **Viewer** (document share / guardian-style) is a **different** concept — do not conflate.

### Staff permission keys (canonical allowlist in code)

From `staffPermissionKeys` in `src/lib/staff-auth.ts`:

| Permission key | Domain (plain language) |
|---|---|
| `overview.read` | Ops overview / scoreboard entry |
| `students.read` | Student registry read |
| `student_workspace.read` | Assigned/scoped workspace read |
| `student_workspace.read_all` | Broad workspace read |
| `student_workspace.manage` | Scoped workspace manage |
| `student_workspace.manage_all` | Broad workspace manage |
| `premium.manage` | Premium entitlement operations |
| `mentor_assignments.manage` | Assignment management |
| `document_shares.manage` | Document sharing |
| `staff_targets.read` / `.manage` / `.manage_all` | Staff targets |
| `catalog.read` / `.manage` / `.publish` | Catalog |
| `cms.read` / `.manage` / `.publish` | CMS |
| `content.read` / `.manage` / `.publish` | Content |
| `media.read` / `.manage` | Media |
| `leads.read` / `.manage` | Leads |
| `staff.read` | Staff directory read |
| `roles.manage` | Role assignment (high risk) |
| `audit.read` | Audit read |
| `settings.read` / `settings.manage` | Settings |

Effective permissions come from **database** `staff_role_assignments` → `staff_role_permissions` → `staff_permissions`, filtered through the allowlist above. Suspended staff profiles receive no context.

### PGS access matrix (summary)

Cells are intent summaries for testing. Exact RLS SQL remains in migrations; runtime proof is pgTAP.

| Action | Anon | Standard student | Premium student | Mentor (assigned) | Mentor (other student) | Admin* | Super Admin* | read_only_staff* |
|---|---|---|---|---|---|---|---|---|
| Public pages | yes | yes | yes | yes | yes | yes | yes | yes |
| Own student profile | no | yes | yes | no† | no | perm | perm | perm |
| Peer student private data | no | no | no | no | no | perm | perm | perm |
| Premium workspace own | no | locked/no | yes | assigned | no | perm | perm | perm |
| Document download (clean gate) | no | policy | own + clean | assigned + policy | no | perm + clean | perm + clean | perm + clean |
| Grant/revoke Premium | no | no | no | no‡ | no | `premium.manage` | yes if granted | no |
| Change staff roles | no | no | no | no | no | no unless `roles.manage` | `roles.manage` | no |
| CMS publish | no | no | no | no | no | `cms.publish` etc. | if granted | typically read only |
| View as Student | no | no | no | policy | no | policy | policy | policy |

\* Staff columns always mean: active `staff_profiles` + required permission key — role name alone is insufficient.  
† Mentors use staff workspace APIs/RLS, not “become the student.”  
‡ Unless a specific permission is granted; default mentor path is assignment-scoped support, not entitlement admin.

### Cross-boundary rules (must be tested)

| ID | Rule |
|---|---|
| PGS-RBAC-01 | Student A cannot read/modify Student B private rows |
| PGS-RBAC-02 | Mentor for A cannot access unassigned student B |
| PGS-RBAC-03 | Ending `mentor_assignments` removes access |
| PGS-RBAC-04 | Standard student cannot exercise Premium-only mutations |
| PGS-RBAC-05 | Non-clean documents are not deliverable on normal paths |
| PGS-RBAC-06 | Service-role server paths must re-check actor + scope before bypassing RLS |
| PGS-RBAC-07 | Client cannot escalate by forging role, studentId, or permission in the request body |
| PGS-RBAC-08 | Guardian sees only linked approved child scope |
| PGS-RBAC-09 | Relationship document Viewer ≠ staff `read_only_staff` |

### OWNER DECISIONS still required elsewhere

Do not silently fill these in tests:

- Exact relationship Viewer PII projection
- Whether shared documents remain visible after Premium revocation
- Any new permission key not already in `staffPermissionKeys` / DB grants

See also `docs/pgs-v3-audit/05-auth-permissions-rls-viewer-map.md`.

---

## Other Projects of 24 (placeholders only)

| App | Matrix location when created | Do not reuse from PGS |
|---|---|---|
| Sourcebyjay | `docs/quality-gate/` in that repo (Buyer/Seller/org) | Student/Premium/mentor |
| AVForge / ScriptXOS | That repo’s annex (script ownership, AI credits) | PGS Ops/CMS permissions |

Phase 0 does not create those repositories’ files.
