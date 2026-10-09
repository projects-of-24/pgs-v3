# Ops Courses CMS — COURSE2 (template → editor → preview)

Companions: [`OPS-COURSES-COURSE1.md`](./OPS-COURSES-COURSE1.md) · [`PURPLE-EVENTS-ARCHITECTURE.md`](./PURPLE-EVENTS-ARCHITECTURE.md) · junior field map `d:\purpleguide\pgs_app` (KEEP fields, REJECT Canva / junior admin UI)

| Item | Value |
|---|---|
| Template lab | [`/preview/programs-courses`](http://localhost:7000/preview/programs-courses) |
| Editor | [`/ops/cms/courses`](http://localhost:7000/ops/cms/courses) — COURSE1 shell stays |
| Bank | RB-09 · RB-10 |
| Workflow | [`OPS-CMS-WORKFLOW-LOCK.md`](./OPS-CMS-WORKFLOW-LOCK.md) **LOCKED** |
| Content→CMS map | [`OPS-COURSES-CONTENT-CMS-MAP.md`](./OPS-COURSES-CONTENT-CMS-MAP.md) |

## Owner locks (2026-10-02)

| Lock | Decision |
|---|---|
| **PREVIEW A+B** | Side-by-side live template in Edit **and** Preview button → new tab |
| **No frontend redirects** | Backend/Ops preview must **not** bounce to public `/purpleboard`, `/programsfull`, etc. Staff preview stays on staff/preview surfaces only |
| **Full section map** | C1–C13 programs-courses body → CMS fields for create/edit |
| **Template visual** | Locked V3 `programs-courses` React body (not junior CSS) |

## Gates

| Gate | Status | Contract |
|---|---|---|
| **COURSE2a** | **DONE** | Sections accept props · Zod `CoursesTemplateBodyV1` · builder from fixture · lab unchanged |
| **COURSE2b** | **DONE (code + DB)** | `detail_template` + `detail_body` (+ `booking_url`) · publish overlay · draft validate · preview uses valid body |
| **COURSE2b-migrate** | **DONE** (2026-10-07) | Applied on `prmepeqfatkcyejhblob` · probe `COLUMNS_OK` · live `courses` can store/publish template + body |
| **COURSE2c** | **DONE (Preview B)** | Preview → `/ops/cms/courses/preview/:id` · Programs Courses template · **no** `/purpleboard` / `/programsfull` · flat CMS map |
| **COURSE2c-side** | **DONE (code)** — owner Preview QC | PREVIEW A — Edit is form (left) + live Programs Courses shell (right); Preview button still opens full Ops tab (B) |
| **COURSE2d** (+2e essentials) | **DONE (code) — owner Preview QC pending** | Edit form: Detail template select + C1–C9 + C11 fieldsets → Save Draft builds a full `CoursesTemplateBodyV1` `detail_body` · preview overlays hero/brochure media from asset ids · C10/C12 shared (no toggles — schema has no flags) · **C13 FAQ editor deferred** (fixture/schema has no `faq`) · **C7 Logo/Photo upload shipped** · **D1:** C1 partner-logo upload · C4 title spacing · C6 plate shows on title · Ops preview unsets TYPE18 so lab font sizes win |
| **COURSE2d-D1** | **DONE (code)** | Partner logo upload · C4 top margin · brochure visible with title (CTA disabled without PDF) · Ops preview type isolation vs lab |
| **COURSE2d-D2** | **DONE (seed)** | Course 64 draft seeded with **Full Stack dummy** body (not Surgery Week lab). Seed: `SEED_COURSE64=1 pnpm exec vitest run src/features/programs-courses/seed-course64-fullstack.seed.test.ts` |
| **COURSE2d-D3** | **DONE (code)** | C10 `#higlights` in `detail_body` · Edit form (copy + **7 photo uploads**) · Preview uses course props (shared PremiumHighlights accepts `data`) |
| **COURSE2d-A0** | **DONE** | Catalog/courses + Ops preview: missing staff session → Studio login redirect (no runtime error overlay) |
| **COURSE2d-D4a** | **DONE (code)** | C12 learners in `detail_body` + form (photo + quotes + bio) · Preview prop-driven |
| **COURSE2d-D4b** | **DONE (code)** | C13 FAQ in `detail_body` + form (tabs + Q&A) · Preview prop-driven |
| **COURSE2d-D4c** | **DONE (code)** | C7 accreditation logo uploads · C9 certificate mock card fields + seal upload |
| **COURSE2f** | Waiting | Remaining editor polish / FAQ in body (needs schema extension, separate approval) |
| **COURSE2g** | Waiting | Public cutover (separate approval) |

### COURSE2b-migrate — apply (owner)

Probe today: `column courses.detail_template does not exist` on the linked Supabase project.

**Option A — Dashboard (fastest)**  
1. Supabase → project → **SQL Editor**  
2. Paste entire file `supabase/migrations/20261002100000_course2b_courses_detail_body.sql`  
3. Run  
4. Confirm: `node scripts/probe-course2b-columns.mjs` prints `COLUMNS_OK`

**Option B — CLI**  
1. Add `DATABASE_URL` (or `DIRECT_URL`) to `.env.local` from Dashboard → Database → Connection string  
2. `node scripts/apply-course2b-detail-body.mjs`  
3. Probe again  

Does **not** invent columns elsewhere; only `courses` + updates `publish_catalog_draft` courses branch. Draft JSON already carried these fields before migrate.

### COURSE2c Preview QC

1. `/ops/cms/courses` → Save Draft on a course → **Preview**
2. Must open **`/ops/cms/courses/preview/{id}?revision=…`** inside Ops (staff shell)
3. Must **not** open `/purpleboard` or `/programsfull`
4. Title / short description / description / dates / duration / mode / image / brochure / tags from CMS draft
5. Empty C4–C13 unless the draft carries a valid `detail_body` (no fixture leak)

### COURSE2c-side Preview QC (PREVIEW A)

1. `/ops/cms/courses` → Edit course 64 (or Create) → Detail template **Courses**
2. Editor shows **two panes**: form left · live template right
3. Change a C2/C4/C13 field → right pane updates without leaving Edit
4. Flat title/dates/image: Save Draft then right pane picks up last-saved flat fields
5. **Preview** button still opens full Ops preview in a new tab (PREVIEW B)
6. Narrow width: panes stack (form on top, preview below)

## COURSE2d — what shipped

- `courses-detail-body-builder.ts` — `buildCoursesDetailBody` (previous valid body or `buildEmptyCoursesDetailBody(id)` → flat fields → section fields → strict re-parse), `bodyToSectionsForm` (prefill), url sanitising (`https://`, `/`, `#` only). Tests: `courses-detail-body-builder.test.ts`.
- `courses-detail-sections-editor.tsx` — C1 extras, C2, C3 (maps Description), C4 rows (num auto `01…`), C5 rows, C6, C7 (Logo/Photo **upload + media library** + alts, facts rows, rankings, accreditation lines), C8 (eligibility, step rows, option 2), C9, C11. `ops-uni1-section*` styles appended to `operations.css`; COURSE1 list untouched.
- `admin-courses-manager.tsx` — Detail template select (`Empty (legacy)` | `courses`); Save Draft POSTs `detail_template`, `detail_body`, `booking_url`. Switching back to legacy clears the template + body. Prefill reads `detail_body` from the row (live column or latest draft values).
- Preview: `coursesCmsDraftToTemplate` now overlays `image_asset_id` / `brochure_asset_id` URLs onto `heroImage` / `brochure.downloadUrl` of a saved body; shell has `hideEmptySections` so unfilled sections stay hidden while shared C10/C12/FAQ show.
- Notes: mobile variants (`descriptionMobile`, `checksMobile`) are dropped on save (mobile mirrors desktop); breakdown lines accept `text || bold tail`; time-of-day on start/end dates is kept from the previous body (no form field yet). Migration still **not** applied — until it is, the body lives only in draft JSON.

### COURSE2d Preview QC

1. `/ops/cms/courses` → Edit course 64 → Detail template = **Courses**.
2. Fill C2 (left/right bodies, one per line) and C4 (Add highlight ×2) → **Save Draft**.
3. **Preview** → `/ops/cms/courses/preview/64?revision=…`: banner says "Rendering the saved C1–C13 detail body"; title, C2, C3 (Description), C4 sections visible; hero image / brochure from the chosen assets; empty sections hidden.
4. Re-open Edit: fields come back filled. Switch template to Empty (legacy) → Save → Preview falls back to the flat map.

### C7 images (Logo / Photo) — upload

1. Edit course → **C7 · Awarding body** → **Logo (left box)** / **Photo (right pink area)** → **Upload new file** (or pick from the media library). Same `marketing-public` flow as the top Image field.
2. Optional: Logo alt / Photo alt for screen readers (upload fills a default from the file name).
3. **Save Draft** → **Preview** → C7 left chip shows the logo · right plate shows the photo. **No media** clears the picture (empty placeholder).
4. Re-open Edit: library pick stays selected when the saved URL matches a media asset; otherwise **Current saved image** until you re-upload.

### COURSE2d-D1 Preview QC

1. Edit → **C1 · Partner logo** → Upload → Save Draft → Preview: logo left of hero photo (under Filling Fast).
2. C4 title has clear space under Program Description (not glued).
3. C6 title filled → brochure plate visible; without File/brochure PDF the Download button is disabled.
4. Ops preview type sizes match lab (`/preview/programs-courses`) — not Ops 18px floor.

### COURSE2d-D2 + D3 Preview QC

1. Sign in at `/studio/login` if needed (A0 redirects here instead of a red error).
2. Open [`/ops/cms/courses/preview/64?revision=99bfe2fc-5c00-40e2-9a64-b516b763da67`](http://localhost:7000/ops/cms/courses/preview/64?revision=99bfe2fc-5c00-40e2-9a64-b516b763da67) — Full Stack dummy (not Surgery Week lab).
3. Expect C1–C13 blocks including C12 learners + C13 FAQ.
4. Edit course 64 → every section C1–C13 is in the form (partner/C7/C10/C12 photos uploadable; C13 Q&A editable; C9 mock card editable).
5. Save Draft → Preview to confirm.

## COURSE2b — what shipped

- Migration `supabase/migrations/20261002100000_course2b_courses_detail_body.sql`: `courses.detail_template` (null or `courses`), `detail_body` jsonb object `< 200000` bytes default `{}`, `booking_url`; `publish_catalog_draft` courses branch also publishes these three columns (other branches unchanged from `20260817152155`).
- Draft save (`/api/admin/catalog/courses/drafts`, `save-draft`): `detail_template` / `detail_body` / `booking_url` accepted from the request, validated in `courses-detail-validation.ts`, stored in the draft `values` JSON. `{}` is allowed; any non-empty body must pass `CoursesTemplateBodyV1` (`schemaVersion: 1`, strict keys) else error naming the issue. On update, live values for these columns are carried into the draft when not sent.
- Not added to the admin registry fields on purpose — COURSE1 form is unchanged (editor sections = COURSE2d).
- Ops preview map: valid `detail_body` → used as the full template (`schemaVersion` stripped); else flat-field partial map.
- Tests: `courses-detail-validation.test.ts`, `courses-cms-preview-map.test.ts`.

**Migration is NOT applied to any connected/prod DB.** Owner applies locally (`supabase db reset` or `supabase migration up`). Until applied, saving drafts that include `detail_*` / `booking_url` works (draft JSON only) but **publish** of a body will not persist those columns and live `select *` won't carry them.

### COURSE2b Preview QC

1. Apply the migration locally. 2. POST a draft save for a course with a full `detail_body` (e.g. `{ schemaVersion: 1, ...fixture }`) → Preview shows that body, banner says "Rendering the saved C1–C13 detail body". 3. Empty/missing body → flat map as COURSE2c. 4. Bad body → 400 with the offending path. 5. Publish → `select detail_template, detail_body, booking_url from courses where id=…` matches.

## COURSE2a files

- `src/features/programs-courses/courses-template-schema.ts`
- `src/features/programs-courses/courses-template-view.ts`
- `src/features/programs-courses/courses-template-schema.test.ts`
- Section components + `programs-courses-preview-shell.tsx` (prop-driven)

## Preview QC (2a)

Open `/preview/programs-courses` — Surgery Week body should match pre-2a look. Unit: `pnpm exec vitest run src/features/programs-courses/courses-template-schema.test.ts`
