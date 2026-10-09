# Quality Gate — Release Checklist

Human checklist for merge and release. Complements CI; does not replace it.

Reusable across Projects of 24. Strike items that are N/A for a given app (record why).

---

## Before merging a PR

- [ ] Scope matches owner approval (no drive-by refactors)
- [ ] CI green for required jobs (or explicitly waived by owner with reason)
- [ ] No new secret material in the diff (keys, dumps, `.env`, private documents)
- [ ] New/changed API routes have server-side authorization (not UI-only)
- [ ] New/changed DB migrations: RLS considered; static `test:rls` still passes (Supabase apps)
- [ ] Negative tests added or Test IDs filed as `missing` with risk accepted
- [ ] CodeRabbit (if enabled) reviewed; security comments addressed or owner-waived
- [ ] Accessibility considered for meaningful UI (app-specific a11y rules still apply)

---

## Before promoting to staging

- [ ] Migrations applied to **non-production** target only
- [ ] Runtime pgTAP executed on isolated local/test DB **or** explicitly deferred with owner note ([test-strategy.md](./test-strategy.md#runtime-pgtap-safe-execution))
- [ ] Authenticated journeys checked for roles touched by the change
- [ ] Feature flags / env vars documented; no production secrets in preview logs
- [ ] Known risks reviewed ([known-risks.md](./known-risks.md) + app risk register)

---

## Before production release

- [ ] Branch protection / required checks verified recently (roadmap #1)
- [ ] Staging Preview QC by owner (product verification ≠ CI green alone)
- [ ] `config:check` or equivalent production config gate run in a secure context (PGS: `pnpm config:check`)
- [ ] Backup / rollback path known for DB and deploy
- [ ] Payment / webhook / AI providers: no live charge tests; mocks only in CI
- [ ] Open **critical/high** risks acknowledged; no silent “looks fine in code”
- [ ] Release notes / owner communication for security-sensitive changes

---

## Explicitly never do

- Run destructive security or load tests on production
- Use production credentials in CI
- Disable failing security jobs to force a release
- Weaken RLS or auth to make tests pass
- Claim pgTAP or env-gated Playwright passed without execution evidence

---

## PGS-specific reminders

- Student states remain `anonymous` | `authenticated_standard` | `authenticated_premium`
- Premium = entitlement truth; mentor scope = `mentor_assignments`
- Documents: normal access requires authoritative `clean` (Phase 4D)
- Service role stays server-only
- View as Student is preview, not session takeover
- Cloudflare R2 checklist items are N/A (Supabase Storage)

---

## Sign-off

| Role | Name | Date | Notes |
|---|---|---|---|
| Implementer | | | |
| Owner QC | | | |
| Security notes | | | Open risks accepted? |
