---
name: pgs-preflight-db-api-pages
description: >-
  Hard stop before every PGS implementation: check DB, check API calls, check
  pages affected; show the owner and wait for approval. If the work needs DB
  and it does not exist, say we need to create it — never YOLO. Use on every
  implementation, wire, Save/mutation, Ops/Workspace/CMS/Student feature, or
  when the owner says preflight / DB check / API check / pages affected.
---

# PGS — preflight DB · API · pages (no YOLO)

**Owner lock 2026-10-08.** Senior architect behavior: prove the surface before coding.

Companions: [`pgs-propose-before-code`](../pgs-propose-before-code/SKILL.md) · [`pgs-backend-phase-wire`](../pgs-backend-phase-wire/SKILL.md) · [`pgs-never-invent`](../pgs-never-invent/SKILL.md)

## Owner rule (verbatim)

for every implemnetaion form now one check db, check api calls, check pages affected show me i will approve then you proceed, if the particular work doesnt have db then say we need to create dont go yolo

## Hard stops

1. **Before any implementation** (UI that saves, API, migration, RLS, desk/Ops/CMS wire): return the **PREFLIGHT** block below → **STOP** → wait for owner approval (`GO AHEAD` / yes).
2. **If the work needs persistent data and the table/column/RPC does not exist:** say **`DB GAP — we need to create …`** with the exact migration/SQL proposed. Do **not** ship UI/API that writes to a missing column and hope the owner notices later.
3. **Do not YOLO.** No “ship the editor now, migration later” unless the owner explicitly approves that split **and** the UI fails closed with a clear message when DB is missing.
4. **UI-only / CSS-only** still lists PREFLIGHT: `DB: none` · `API: none` · `PAGES: …` so the owner sees you checked.
5. If mid-flight you discover a missing DB/API surface: **STOP**, re-show PREFLIGHT, wait again.

## Required PREFLIGHT block (every implementation)

```markdown
### PREFLIGHT — DB · API · PAGES

**DB**
| Need | Status | Evidence |
|---|---|---|
| table / column / RPC / RLS | EXISTS · MISSING · N/A | migration path or `DB GAP — we need to create …` |
| applied on this environment? | YES · NO · UNKNOWN | how verified (SQL editor / select / migration log) |

**API**
| Method + path | Auth / scope | Writes what |
|---|---|---|
| e.g. `PATCH /api/staff/students/[id]/workspace/profile` | manage + Premium | `premium_workspace_profiles.notes_html` |

**PAGES / SURFACES AFFECTED**
| Route / component | Role | Change |
|---|---|---|
| e.g. `/workspace/students/[id]` Dashboard Data | staff | Mentor Notes Save |
| e.g. student `#FEED` | Premium student | reads same Notes |

**BLOCKERS BEFORE CODE**
- … or `none`

Then STOP. Wait for owner approval.
```

## Verdict rules

| Situation | Agent must say | May code after GO AHEAD? |
|---|---|---|
| DB exists + applied + API + pages listed | Ready | Yes |
| DB exists in repo migration but **not applied** on env | **DB NOT APPLIED** — run SQL / `db push` first | Only after owner confirms applied **or** explicitly approves “UI with fail-closed 503” |
| Feature needs DB and nothing exists | **`DB GAP — we need to create …`** | Only after owner approves creating migration + apply plan |
| Pure CSS / copy / locked chrome tweak | `DB: N/A` · `API: N/A` | Yes after normal propose |

## Failure modes (this is how Mentor Notes broke)

- Built Save Notes UI + API while `notes_html` migration was never applied on lab
- Generic “Unable to update…” hid the missing column
- Treated “code merged” as “product works”

**Never again:** code that writes a column must prove that column exists on the connected DB, or propose creating/applying it first.

## After approval

1. Implement only the approved DB → API → pages plan.
2. If DB was the blocker: apply/verify first, then API, then UI QC.
3. Vomit: PREFLIGHT result · applied? · files · how owner clicks QC.
