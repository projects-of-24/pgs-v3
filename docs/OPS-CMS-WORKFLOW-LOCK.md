# Ops CMS workflow — LOCKED (Courses first)

**Status:** **LOCKED** — owner `GO AHEAD CMS-WORKFLOW-LOCK` (2026-10-07)  
**Bank:** RB-09 · RB-10 (Payload/Contentful **patterns only** — do **not** install Payload or Sanity)  
**Companions:** [`OPS-COURSES-COURSE1.md`](./OPS-COURSES-COURSE1.md) · [`OPS-COURSES-COURSE2.md`](./OPS-COURSES-COURSE2.md) · [`OPS-COURSES-CONTENT-CMS-MAP.md`](./OPS-COURSES-CONTENT-CMS-MAP.md) · [`PURPLE-EVENTS-ARCHITECTURE.md`](./PURPLE-EVENTS-ARCHITECTURE.md) · skill `pgs-cms`

**Body content rule:** Map **all** Programs Courses sections **C1–C13** into Ops CMS. **Exclude** public header / UnivMeet strip / footer (chrome).

---

## Owner decisions captured (this session)

| Decision | Lock |
|---|---|
| CMS product | **In-house Ops CMS** (`/ops/cms/…`) |
| Sanity | **Out** of product path (trial docs only; do not expand) |
| Payload / Sanity install | **REJECT** — steal patterns only |
| Course detail visual | Locked **Programs Courses** React template (C1–C13) |
| Storage | **Supabase** drafts + live `courses` row |
| Staff identity | Same Ops/CMS staff (`/studio/login`) — no `cms_users` |

---

## Four-source audit (condensed)

### SOURCE A — Legacy / junior

| KEEP (business) | REJECT (implementation) |
|---|---|
| Create course → fill fields → preview → publish | Canva / freeform page builder forever |
| Face/list presentation choices | Hostinger PHP sessions / insecure admin |
| Catalog as staff operating list | Dual CMS passwords |
| Detail page driven by chosen layout | Inventing new public routes without cutover gate |

### SOURCE B — Owner / Figma / PGS Flow

- Template lab = `/preview/programs-courses` (visual truth).  
- Staff Preview B = `/ops/cms/courses/preview/:id` (no bounce to `/programsfull`).  
- PREVIEW A (side-by-side in Edit) still waiting.  
- New template forks = **new** `detail_template` id (never silently overwrite `courses`).

### SOURCE C — Reference Bank (Payload / Contentful patterns)

| ADOPT | ADAPT | REJECT |
|---|---|---|
| Collection = typed fields | Payload `_status` → `catalog_draft_revisions` + publish RPC | Payload Studio / install |
| Draft vs Publish split | `admin.preview` → Ops preview URL + revision | Blocks / page builder |
| Groups/tabs for sections | C1–C13 fieldsets (already) | Second auth universe |
| Media by reference | `media_assets` + marketing bucket | Sanity as source of truth |
| Face/list as **row select** | `face_layout` column (B*) | Layout inside freeform JSON |

### SOURCE D — Current PGS V3

| Piece | State |
|---|---|
| COURSE1 list `/ops/cms/courses` | **LOCKED** |
| `detail_template` + `detail_body` (Zod C1–C13) | Code + DB migration **DONE** |
| Save Draft → Preview → Publish APIs | Working on drafts |
| Face cards | Events face lab locked; **`face_layout` not on courses row yet** |
| Public cutover COURSE2g | Waiting |
| Sanity `/sanity` | Parallel trial only — **not** product CMS |

---

## Locked product contract (Courses)

```text
CREATE / EDIT course (Ops CMS)
        │
        ├─ Catalog basics (title, slug, dates, tags, media, …)
        ├─ detail_template = "courses"   ← base detail shell for ALL new courses
        ├─ face_layout = <enum>          ← which face card variant for rails/lists
        └─ detail_body = CoursesTemplateBodyV1 (C1–C13 slots)
                │
                ▼
        Save Draft → catalog_draft_revisions
                │
                ├─ Preview B → /ops/cms/courses/preview/:id?revision=…
                │                 mounts ProgramsCoursesPreviewShell
                └─ Publish → live courses row (template + body + face + media)
                │
                ▼
        Public detail (COURSE2g later) → same shell from published row
        Public rails / cards → face_layout + list fields (not full detail_body)
```

### Rules (once and for all)

1. **One base detail template for new courses:** `detail_template = courses` (Programs Courses). Legacy empty template only for old rows until migrated.  
2. **New Figma detail = new template id** (`courses_v2`, …) — never mutate `courses` in place.  
3. **Face card ≠ detail template.** Face is listing/rail presentation; detail is C1–C13 body.  
4. **Instance = new catalog row** filled against the same React shell + Zod body — not a Sanity/Payload document.  
5. **Preview stays on Ops/staff surfaces** until owner opens COURSE2g public cutover.  
6. **Same workflow later for events** (`lite` / `courses` picker + face) without a second CMS product.

---

## Face card options (workflow lock)

| Layer | Contract |
|---|---|
| **Source** | Locked face components from Events face pass / Figma (reuse; do not redesign for Courses CMS) |
| **CMS field** | `face_layout` enum on course row (options registered in code map) |
| **Staff UX** | Create/Edit → choose face from approved set (thumbnails later) |
| **Runtime** | Rails / Top Picks / listings select **published** courses + render chosen face |
| **Not in v1** | Per-course custom CSS; Canva exports as face |

*(Exact enum values = owner QC against face lab — do not invent list until face inventory gate.)*

---

## Payload “steal like an artist” → PGS build techniques

| Payload idea | Build in PGS as |
|---|---|
| Collection schema | Zod `CoursesTemplateBodyV1` + Ops fieldsets |
| Drafts / versions | `catalog_draft_revisions` |
| Publish access | `catalog.publish` vs manage |
| Conditional fields | Show C1–C13 only when `detail_template = courses` |
| Preview URL | `/ops/cms/courses/preview/:id?revision=` |
| Relationships | Tags, media assets, university/program picks |
| List columns | COURSE1 TanStack / table already |
| Live Preview iframe | PREVIEW A side-by-side (React), not Payload embed |

---

## Remaining gates (ordered — one `GO AHEAD` each)

| Gate | What | Depends on |
|---|---|---|
| **CMS-WORKFLOW-LOCK** | **DONE** — this MD is permanent Courses CMS law | — |
| **COURSE-MAP** | **DONE (doc)** — C1–C13 → CMS field inventory ([content map](./OPS-COURSES-CONTENT-CMS-MAP.md)); optional GAPs listed | Lock |
| **COURSE2b-migrate** | **DONE** (2026-10-07) — columns live on connected project | Lock |
| **COURSE2c-side** | **DONE (code)** — side-by-side live template in Edit | Lock |
| **COURSE-GAP** | Optional: time-of-day, enroll CTA href, booking CTA label, C10 crop — only if owner names them | Map |
| **COURSE-FACE1** | Register `face_layout` options + picker on Create/Edit (no public rail yet) | Face inventory QC |
| **COURSE2g** | Public detail cutover using published body | Migrate + owner QC |
| **CMS-SCALE** | Reuse same contract for Events / Universities (same Ops shell) | Courses proven |

**Out of product path:** Sanity Studio expansion, Payload install, page builder.

---

## BEFORE → AFTER (mental model)

**BEFORE:** Template lab + Ops list; Sanity trial confused the “which CMS?” question.  
**AFTER:** One Ops CMS; every new course is an **instance** of Programs Courses + optional **face**; Payload/Sanity = pattern books only.

---

## NOT IN THIS LOCK (deferred)

- Installing or deleting Sanity packages (optional cleanup later)  
- Public `/programsfull` cutover (COURSE2g)  
- Inventing face enum values without face-lab QC  
- Events CMS parity build (follows after Courses proven)

---

## EXPECTED QC (after lock + next gate)

1. Create course in `/ops/cms/courses` → template **Courses** → fill C1–C13 → Save Draft → Preview matches shell.  
2. No Sanity required for staff workflow.  
3. Face picker appears only after **COURSE-FACE1**.  
4. Ops list Publish/Hide still works off Supabase.
