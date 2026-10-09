# Secrets + dependency monitoring — 2026-10-08

Roadmap **#4**: strengthen CI secret scanning and dependency monitoring.

## Changes

| Item | Detail |
|---|---|
| `.gitleaks.toml` | Allowlist for heavy/non-secret paths + documented false-positive fingerprints |
| `.github/workflows/ci.yml` | Blocking **Gitleaks OSS CLI** step (before install); keep `pnpm test:security` |
| `.github/dependabot.yml` | Weekly npm (root + document-security worker) + github-actions |

## Why OSS CLI instead of `gitleaks/gitleaks-action`

`projects-of-24/pgs-v3` is an **organization** private repo. `gitleaks/gitleaks-action` v2+ requires `GITLEAKS_LICENSE` for organizations. The **gitleaks binary** remains MIT and is suitable for CI without that license.

## Local verification (this machine)

```bash
# Full git history with config (must exit 0)
gitleaks detect --source . --config .gitleaks.toml --verbose --redact --exit-code=1

# Existing custom scan (still required)
pnpm test:security
```

Recorded run: [`gitleaks-git-2026-10-08.log`](./gitleaks-git-2026-10-08.log) — after allowlist: **no leaks found** (195 commits scanned, EXIT 0).

Allowlisted paths include Figma `fileKey` constant, `supabase/tests/` fixtures, and a removed historical import script — documented in `.gitleaks.toml`. Do not expand allowlists without investigation.

## Dependabot

- Opens PRs weekly (Monday) for npm and Actions updates.
- Does not auto-merge.
- Owner still reviews PRs; `pnpm audit --audit-level=high` remains a CI blocker.

## Limits

- Allowlisted fingerprints must not be used to hide real secrets — investigate before adding.
- `.env.*` is gitignored; CI git-mode scan does not see local `.env.local` (correct). Never commit env files.
- Dependabot alerts still need GitHub Dependabot to be enabled for the org/repo in GitHub settings if not already.
