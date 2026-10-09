# Quality Gate — Known Risks

Open and historical risks relevant to the Quality Gate.  

**Phase 0 rule:** record risks; **do not claim they are resolved** in this folder. Later verification may update status only with execution evidence and owner acknowledgment.

Primary forensic register (PGS): `docs/pgs-v3-audit/08-security-risk-register.md`  
Auth/RLS map: `docs/pgs-v3-audit/05-auth-permissions-rls-viewer-map.md`

---

## How to read this file

| Field | Meaning |
|---|---|
| Severity | critical / high / medium / low |
| Status | `open` \| `needs-reverification` \| `accepted` \| `mitigated-unverified` |
| Evidence | Pointers only — no secrets |

`mitigated-unverified` means later code/tests *appear* to address an older finding, but Quality Gate Phase 0 **does not** certify closure.

---

## Quality Gate process risks (Projects of 24 + PGS)

| ID | Risk | Severity | Status | Evidence |
|---|---|---|---|---|
| QG-RISK-01 | Failing CI not enforced as merge blocker | critical | open | Verified 2026-10-08: no classic branch protection; ruleset `24304872` (`1`) only `DELETION` + `NON_FAST_FORWARD`; **no required status checks**. Org plan free/private. See [ci-pipeline.md](./ci-pipeline.md#verification-log-2026-10-08) |
| QG-RISK-02 | Runtime RLS (pgTAP) not scheduled in CI | critical | mitigated-unverified in CI | Local **PASS** 27/27 after batch B (2026-10-09). Open gap is **CI/runtime job**, not local failure. Evidence: [evidence/pgtap-batch-b-2026-10-09.md](./evidence/pgtap-batch-b-2026-10-09.md) |
| QG-RISK-03 | Static RLS mistaken for runtime proof | high | open | Documented anti-pattern; local runtime is green, but static `pnpm test:rls` alone is not enough without a CI pgTAP job |
| QG-RISK-04 | Authenticated Playwright role matrix incomplete in CI | medium | mitigated-unverified | CI generates storage states when preview secrets exist (`ci-prepare-auth-fixtures.sh`). Until owner adds secrets, fixture cases still skip. |
| QG-RISK-05 | Secret scan gaps | medium | mitigated-unverified | Custom scan kept; **OSS Gitleaks now in CI** (2026-10-08). Still not a substitute for never committing secrets. Confirm green on first PR after merge. |
| QG-RISK-06 | Dependency update monitoring | medium | mitigated-unverified | `.github/dependabot.yml` added; enable Dependabot in GitHub org/repo settings if not already |
| QG-RISK-07 | CodeQL results not in GitHub code scanning UI | medium | open | `upload: never` in `codeql.yml` |
| QG-RISK-08 | `config:check` not in CI | medium | open | `pnpm config:check` exists; not a CI job |
| QG-RISK-09 | No coverage reporting | low | open | `vitest.config.ts` has no coverage block |
| QG-RISK-10 | Cross-app role confusion | medium | open | Marketplace vs PGS actors differ; matrices must stay separate |

---

## PGS product/security risks (recorded from existing registers)

The following IDs originate in `docs/pgs-v3-audit/08-security-risk-register.md` and related docs. **Phase 0 does not close them.** Some areas (e.g. clean document gate) gained later migrations and Vitest coverage; treat as **needs-reverification**, not resolved.

| ID | Risk (short) | Severity (register) | Phase 0 status | Notes |
|---|---|---|---|---|
| SEC-01 | Non-clean uploads obtaining signed URLs | high | needs-reverification | Later Phase 4-0 / document tests exist; runtime pgTAP + staging proof still required before calling closed |
| SEC-02 | Malware scan / CDR worker completeness | high | open / evolving | Worker package exists under `workers/document-security/`; end-to-end trust not Quality-Gate certified here |
| SEC-03 | Relationship Viewer model historically incomplete | high if exposed | needs-reverification | Later migrations/tests for viewer relationships exist; keep negative matrix in runtime RLS |
| SEC-04 | Staff `viewer` vs relationship Viewer collision | high | mitigated-unverified | Code normalizes staff `viewer` → `read_only_staff`; naming confusion remains a test hazard |
| SEC-05 | Direct TUS bypass if adopted naively | high if adopted | open | No casual TUS adoption without security design |
| SEC-06 | Signed URL revocation before expiry | medium | open | Short TTL mitigates; not instant revoke |
| SEC-07 | Role permission truth duplicated (DB vs TS allowlist) | medium | open | Drift risk; contract tests recommended — see [rbac-audit.md](./rbac-audit.md) RBAC-02 |
| SEC-08 | Document history / delete semantics | medium | needs-reverification | Phase 4D lifecycle evolved; do not assume register text is current without re-read |
| SEC-09 | Preview converters / parser attack surface | high when implemented | open | When preview parsing ships, isolate and test |
| SEC-10 | Viewer PII minimization undefined | high when implemented | open | OWNER DECISION |
| SEC-11 | Search/AI bypassing row/column boundaries | high when implemented | open | AI schema tests help; not full boundary proof |
| SEC-12 | Document access timeline / audit completeness | medium | open | Domain events coverage varies |
| SEC-13 | Upload memory / abuse pressure | medium | open | Size limits exist; concurrency abuse tests limited |
| SEC-14 | Comment / rich-text XSS boundary | medium | open | Follow app sanitization rules when rich text expands |
| SEC-15 | Relationship invitation abuse | medium | open | Rate limit + token design must stay tested |

RBAC audit crosswalk ([rbac-audit.md](./rbac-audit.md)): RBAC-01 ↔ pgTAP runtime not green; RBAC-03 ↔ CI Auth fixtures; RBAC-04–07 ↔ page-gate coarseness / dual-actor / UI≠security.

Additional recurring notes from batch reports:

- Environment-gated Playwright and pgTAP were repeatedly **not executed** in constrained workspaces — do not backfill “passed” from those reports without new evidence.
- Rate-limit hashing falls back to a default salt when `RATE_LIMIT_HASH_SECRET` is unset (`src/lib/server-security.ts`) — misconfiguration risk.
- Payment webhook / duplicate-delivery automation is not a first-class CI suite.
- Cloudflare R2 risks are **N/A** for PGS media (Supabase Storage).

---

## Verification backlog (ties to roadmap)

| Roadmap # | Addresses |
|---:|---|
| 1 | QG-RISK-01 |
| 2 | QG-RISK-02, QG-RISK-03, SEC-* RLS items |
| 3 | BOLA/IDOR / privilege escalation gaps |
| 4 | QG-RISK-05, QG-RISK-06 (config landed; confirm on next CI/PR) |
| 5 | QG-RISK-04 (anonymous denials in CI; fixture roles optional) |

---

## Update policy

When a risk is later verified closed:

1. Cite execution evidence (CI run URL, pgTAP summary, staging QC note).
2. Change status only with owner acknowledgment.
3. Prefer updating the canonical `docs/pgs-v3-audit/08-security-risk-register.md` **and** a one-line pointer here — avoid two conflicting “truth” tables.
