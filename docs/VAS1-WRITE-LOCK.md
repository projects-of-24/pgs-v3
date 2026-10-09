# VAS1-WRITE — View as Student must not freeze staff writes

**Status:** LOCKED (engineering contract) — 2026-10-08  
**Parent:** VAS1 (View as Student new tab) · [`OPS-LOCKED-PAGES.md`](./OPS-LOCKED-PAGES.md)

## One law

| Surface | When `pgs_staff_preview` cookie is present |
|---|---|
| Student frontend + non-staff mutating APIs (`/api/student/*`, `/api/premium/*`, …) | **Read-only** (preview) |
| `/workspace/*`, `/ops/*`, `/admin/*`, `/api/staff/*` | **Normal staff permissions** — cookie does **not** deny writes |

The cookie answers only: **whose student UI am I rendering?**  
It must never answer: **can this staff member save on Desk / Ops?**

## Why this exists

The preview cookie is `path: "/"` and shared across tabs on the same host. Opening View as Student in tab B used to poison Desk/Ops in tab A via three freezes:

1. `canViewStudent(..., "manage")` denied when cookie present → Desk “Mutations are disabled”
2. `proxy.ts` blocked **all** mutating `/api/*` (including `/api/staff/*`)
3. `assertStaffPreviewWritable()` on Targets / Notifications staff routes

VAS1 QC already required Assign/Change mentor to stay usable with the cookie. VAS1-WRITE extends that to **all** staff writes.

## Enforcement (do not reintroduce freezes)

| Gate | Rule |
|---|---|
| `src/lib/student-access.ts` | Never deny `manage` solely because preview cookie is live |
| `src/proxy.ts` | Block mutating APIs **only** outside `/api/staff/` and `/api/auth/` when cookie present |
| `assertStaffPreviewWritable` | **No-op** — do not call it from new staff routes |
| Desk `canManage` | Actor permissions + assignment scope only |

## Guardrail tests

- `src/lib/student-access.test.ts` — staff keep workspace manage with preview cookie
- `src/proxy.test.ts` — staff APIs writable; student APIs blocked
- `src/lib/vas1-write.contract.test.ts` — assert helper stays no-op; law documented

## Deferred (optional)

**FEED-HOST** — preview on a different host so the cookie cannot leak into Workspace at all. Not required while the law above holds.

## Agent rule

If you are about to add “if preview cookie → deny staff write”: **STOP**. Read this doc. Fix the student surface only.
