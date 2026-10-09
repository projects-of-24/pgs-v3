# Workspace chrome shell — WS-CHROME-1

**Status:** Implemented for owner Preview QC (2026-10-07).  
**GO AHEAD:** `GO AHEAD WS-CHROME-1` · Studio color palette.  
**Living plan:** [`FEED-WORKSPACE-PLAN.md`](./FEED-WORKSPACE-PLAN.md)

Opens a **new chrome color gate** over the 2026-10-01 Ops blue lock — brand now matches **Studio login**.

## Locked in this gate

| Item | Value |
|---|---|
| Shell | Reuse `AdminShell` (no second shell) |
| Brand color | Studio purple `#6b3fa0` (`--operations-brand`) |
| Ink / muted / line | Studio `#1f2430` / `#5b6575` / `#e6e8ee` |
| Shell tint | `#f7f8fb` · brand band `#efe7ff` |
| Type floors | Header / sidetab / body **≥18px** unchanged |
| Header | Search · bell · actor menu (structure unchanged) |
| Footer | 100px rail (C3 structure unchanged) |
| Primary nav | Dashboard · Students · Overall Comments (stub) · Loopboard (stub) · Notifications · Activity |
| Operations ▾ | Targets · Team |
| CMS ▾ | Creating / Editing (unchanged) |
| Admin | Admin Panel / User Management (SA) · Edit Profile |

## Stub routes (feature gates later)

| URL | Connect later |
|---|---|
| `/ops/overall-comments` | **WS-COMMENTS** |
| `/ops/loopboard` | **WS-LOOP** |

## Preview QC

1. Sign in: [http://localhost:7000/studio/login](http://localhost:7000/studio/login)  
2. Shell: [http://localhost:7000/ops](http://localhost:7000/ops)  
3. Confirm purple brand matches Studio login accent.  
4. Click Overall Comments / Loopboard → stub pages (not 404).

## NOT in this gate

Student Desk tabs · fill editors · real Comments inbox · Loopboard DnD · Registry redesign · `/workspace` host.

## Files

- `src/app/admin/operations.css` — Studio tokens  
- `src/components/admin-shell.tsx` — primary IA + stub badges  
- `next.config.ts` — stub rewrites  
- `src/app/admin/stubs/[slug]/page.tsx` — stub definitions  
