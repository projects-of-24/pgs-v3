# Staff host map — W1 (living)

**Status:** implemented on branch / PR for W1  
**Owner lock:** `studio.purpleguide.study` · `workspace.purpleguide.study` · shared cookies **yes** · host map only (no new landing UI)

## Contract

| Host | Unauthenticated `/` | Authenticated staff `/` |
|---|---|---|
| `studio.purpleguide.study` | `/studio/login` | `/ops` |
| `workspace.purpleguide.study` | `/workspace/login` | `/workspace` |
| `www.purpleguide.study` / apex | Public / student (unchanged) | — |

- **One Auth identity** (Supabase). Session cookies use `Domain=.purpleguide.study` on purpleguide hosts so Studio and Workspace share the login.
- **Permission still applies per surface:** Ops pages keep existing staff permission checks; Workspace shell still requires staff. Mentor-without-Ops vs Admin-with-Studio finer login ACL = **later gate** (not W1).

## Code

- `src/lib/staff-hosts.ts` — host resolve + cookie domain
- `src/proxy.ts` — root redirects + cookie domain on session refresh
- `src/lib/supabase/server.ts` — cookie domain on Auth set/clear

## Vercel

Domains already on **pgs-v3-eternity**: `studio.` · `workspace.` · `www.` · apex→www.

## Known gaps (W1)

1. Non-root public paths still resolve on staff hosts (e.g. `studio.…/about`) — tighten in a later gate if owner wants staff hosts locked to staff paths only.
2. Studio vs Workspace **login** door does not yet deny mentors from Studio based on Ops permission bundle — page-level Ops auth remains the gate.
3. Preview `*.vercel.app` has no staff hostnames; QC on production domains or with Host override.

## Next (not W1)

- Landing UI per host  
- Path lockdown on staff hosts  
- Role-aware Studio login deny for workspace-only mentors  
