# Sanity M1 — parallel trial (Ops CMS untouched)

**Status:** Implemented as a side path.  
**Does not** change `/ops/cms/courses`, catalog APIs, or Supabase drafts.

## URLs

| URL | Purpose |
|---|---|
| [`/sanity`](http://localhost:7000/sanity) | Sanity Studio (edit Course docs) |
| [`/preview/sanity-courses`](http://localhost:7000/preview/sanity-courses) | List published Sanity courses |
| [`/preview/sanity-courses/[slug]`](http://localhost:7000/preview/sanity-courses/demo-course) | Preview on Programs Courses shell |
| [`/ops/cms/courses`](http://localhost:7000/ops/cms/courses) | **Previous CMS — unchanged** |

## Setup (one-time)

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage).  
2. Dataset: `production` (or match env).  
3. API → CORS origins → add `http://localhost:7000`.  
4. Add to `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
```

5. Restart `pnpm dev`.  
6. Open `/sanity` → log in → create **Course (Sanity trial)** → set **Slug** → fill **C1–C13** groups (same sections as Ops CMS) → **Publish**.  
7. Open `/preview/sanity-courses` → click the course → compare with `/ops/cms/courses/preview/64` or lab `/preview/programs-courses`.  
8. Change title in Studio → Publish → refresh preview → new title shows.

### One-shot: copy Ops course 64 into your Sanity doc

1. Sanity Manage → **API** → **Tokens** → create **Editor** token → add to `.env.local` as `SANITY_API_WRITE_TOKEN`.  
2. Optional: `SANITY_COURSE_DOCUMENT_ID=125ffefb-af81-47f4-8c28-f754944bdc69` (your doc).  
3. Keep `pnpm dev` running (uploads C10/C12 images from `http://localhost:7000/assets/...`).  
4. Run (PowerShell — easiest):

```powershell
node scripts/seed-sanity-course64.mjs
```

Or:

```powershell
$env:SEED_SANITY_COURSE64="1"
pnpm exec vitest run src/sanity/lib/seed-sanity-from-course64.seed.test.ts
```

(Do **not** use `SEED_SANITY_COURSE64=1 pnpm …` — that is Unix-only and fails in PowerShell.)

5. Open `/sanity` → confirm fields filled → **Publish** if needed.  
6. Preview: `/preview/sanity-courses/demo-course`.

Uses latest Supabase draft for course 64 when available; otherwise the Full Stack dummy body (same as Ops preview seed).

### Console: “No activity within 45000 milliseconds… Reconnecting” (×3)

Usually **Sanity live sync** (listen / presence / releases) blocked by the site CSP. Fixed by a **Studio-only CSP** on `/sanity` only — restart `pnpm dev` and hard-refresh. Ops routes unchanged.

If errors remain: VPN/firewall blocking `*.api.sanity.io`, or ignore if Studio edit + Publish still works.

## Architecture

```text
/sanity Studio ──► Sanity Cloud (not Supabase)
                         │
                         ▼
              /preview/sanity-courses/[slug]
                         │
                         ▼
         mapSanityCourseToTemplate → ProgramsCoursesPreviewShell

/ops/cms/courses ──► existing APIs ──► Supabase  (untouched)
```

## Files (new only)

- `sanity.config.ts`
- `src/sanity/**`
- `src/app/sanity/[[...tool]]/page.tsx`
- `src/app/preview/sanity-courses/**`
- CSP hosts in `next.config.ts` (Sanity API/CDN)
- `.env.example` Sanity keys

## Compare

| | Ops CMS | Sanity trial |
|---|---|---|
| Edit | `/ops/cms/courses` | `/sanity` |
| Preview | `/ops/cms/courses/preview/:id` | `/preview/sanity-courses/[slug]` |
| Database | Supabase | Sanity Cloud |
| Affects the other? | No | No |
