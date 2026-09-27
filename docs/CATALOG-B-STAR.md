# Catalog B\* — course & event management (living Kanban)

Living map for the **backend rebuild** of course/event management.  
Frontend faces + detail templates stay fixture/preview until named `GO AHEAD Bn`.

**Owner fixture bridge (2026-09-21 · bank 2026-09-24):** UI first → **FACE-FIXTURES DONE** (5+5 per `face_layout`, `/preview/face-fixtures`, 9 layouts × 10 = 90 rows) → **next:** temp listing rails on face components → later replace with real catalog rows and flush seeds. Fixtures ≠ production truth.

**Authority:** Owner decision → [`PURPLE-EVENTS-ARCHITECTURE.md`](./PURPLE-EVENTS-ARCHITECTURE.md) face contract → certified V3 security → junior read-only → Reference Bank.

**Reference Bank:**

| ID | Steal for |
|---|---|
| **RB-09 CMS CORE** | Staff create/edit: fields, validation, relationships (template, face, tags). ADAPT onto `/admin/catalog` + Supabase — do **not** install Payload. |
| **RB-01 CRM CORE** | Catalog index: search, tag filters, sort, drill-down. ADAPT TanStack Table patterns — do **not** invent Mini CRM now. |

**REJECT:** Junior Canva visual editors as forever CMS; HubSpot object-builder; inventing face layouts in B\*; patching TEMP `card_surfaces` forever without a contract.

---

## Target staff flow

```text
Admin creates EVENT or COURSE
  → fields (title, media, dates, …)
  → detail_template picker   (lite | courses | …)
  → face_layout picker       (one of locked FaceLayoutId values)
  → tag attach               (catalog_tags)
  → badge: manual text/colors OR leave empty for auto rule
  → placement surfaces       (where it shows — ADAPT card-surfaces idea)
  → publish fail-closed
Public listing / saved / board
  → map row → face component (desk+mob pair)
  → Learn More → detail URL for that row's template
```

---

## Product slots (same as face contract)

| Slot | Meaning | Today | B\* |
|---|---|---|---|
| `detail_template` | Full-page body | Hard-mounted labs | Column / enum on event+course |
| `face_layout` | One layout id → desk+mob pair | Fixtures / `face-layouts.ts` | Column / enum; picker lists locked ids |
| `tags[]` | Search / sort / differentiate | `catalog_tags` + joins **EXIST** | Harden contracts; no freeform-only forever |
| Badge / urgency | Filling Fast etc. | Phase7 fields / junior badge idea | Admin override **or** server auto-rule |
| Placement | Where row appears | TEMP `card-surfaces.ts` (no certified DB column) | Real contract; fail-closed unpublished |
| Learn More | Detail URL | Preview labs in fixtures | Live route from published row + template |
| Heart / saved | Student save | programs+courses only; events hard-fail | `GO AHEAD B6` if owner opens events |

---

## Gates (one `GO AHEAD Bn` each — no silent jump)

| Gate | What | Day-1 security | Status |
|---|---|---|---|
| **B0** | Honesty map: TEMP exists vs rebuild (this doc + architecture TEMP map) | Read-only | **READY** — charted 2026-09-20 |
| **B1** | `detail_template` + `face_layout` on event/course (or equivalent) | Publish permission; unknown template fail closed | Parked |
| **B2** | Tags attach / search-sort contracts (API exists — harden) | No IDOR on tag writes | Parked |
| **B3** | Badge + optional auto rules (capacity / closes_on) | Server-forced; no client-trusted “Filling Fast” | Parked |
| **B4** | Placement surfaces — TEMP TS → real column/contract | Fail closed unpublished | Parked |
| **B5** | Public listing loaders → face component + Learn More href | Publish gate; no draft leak | Parked |
| **B6** | Saved/heart for events (new truth) if owner opens | Session-forced `student_id` | Parked |
| **B7** | Staff catalog index: search + tag filter + sort (RB-01 on existing admin) | Scope by staff permissions | Parked |

Exact SQL / RLS only at implement time under the named gate. Prefer lab until owner pulls live.

---

## Honesty map (B0 — TEMP today)

| Piece | Path / note | Verdict |
|---|---|---|
| Face layout registry | `src/features/purple-events/face-card/face-layouts.ts` | Fixtures / inventory — not DB |
| Event face UI | `face-card/purple-events-face-card.tsx` | **LOCKED** UI |
| `card-surfaces.ts` | `src/features/admin-cms/lib/card-surfaces.ts` | TEMP helpers; USMLE assumes column |
| DB `card_surfaces` | Not in certified migrations as product contract | **MISSING** |
| `catalog_tags` + joins | `public_site` / phase7 migrations | **EXISTS** |
| Admin catalog CRUD | `/admin/catalog` | **EXISTS** — incomplete vs face/template pickers |
| Tag-links API | `/api/admin/catalog/tag-links` | **EXISTS** |
| Saved programs/courses | migrations + `/api/student/saved` | **EXISTS** |
| Saved events | — | **MISSING** |
| Junior Canva editors | `.ref/pgs_app` | **LEAVE ALONE** |

---

## Phase log

| Date | Gate | Status | Note |
|---|---|---|---|
| 2026-09-20 | **B0** | **READY** | Living Kanban opened; face inventory locked in architecture; no schema |
| 2026-09-22 | **FACE-FIXTURES** | **DONE** | 5 events + 5 courses per `face_layout` · `listFaceFixtures()` · lab `/preview/face-fixtures` · not production catalog |
| 2026-09-24 | **F-F Pair 10** | **LOCKED** | `program_compact_sm_desk` · fixtures bank now 9 layouts × 10 = 90 rows |
| — | **LISTING-RAILS** | **Next (UI)** | Temp rails (CV Ready / programs / saved / …) consume face components + fixtures |
| — | **B1–B7** | Parked | Wait for listing page gates + `GO AHEAD Bn` |

---

## How to continue

| You say | What happens |
|---|---|
| `GO AHEAD B0` | Mark B0 DONE after owner skim (optional — chart already ready) |
| `GO AHEAD B1` | Propose column/RPC contract → wait again if plan changes → migrate + admin pickers |
| `GO AHEAD Bn` | One gate only; update this MD; live click QC; stop |

Companions: `pgs-backend-phase-wire` · `pgs-propose-before-code` · face skill `pgs-face-card-pass`.
