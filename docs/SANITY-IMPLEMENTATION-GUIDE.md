# Sanity CMS — step-by-step implementation guide (connect to PGS code)

**Status:** M1 parallel trial is implemented — see [`SANITY-M1-PARALLEL-TRIAL.md`](./SANITY-M1-PARALLEL-TRIAL.md).  
Ops CMS / Supabase / existing APIs remain untouched. This guide is the longer reference.

Stack assumed: Next.js App Router · React · TypeScript · pnpm · port `7000` (this repo).

---

## Big picture

```text
Sanity Studio UI (/sanity)
        │ save / publish
        ▼
Sanity Cloud (projectId + dataset · course documents)
        │ GROQ via @sanity/client
        ▼
PGS Next.js → mapSanityCourseToTemplate → CoursesTemplateBodyV1
        │
        ▼
Same React Programs Courses shell (C1–C13)
```

**Change once → everywhere:** edit the Course document in Studio → every page that queries that document shows the new value after refresh/revalidate.

---

## Step 0 — Decide the connection mode (before any install)

Pick **one** writer. Do not run two editors against the same course without a sync plan.

| Mode | Meaning | When to use |
|---|---|---|
| **M1 — Sanity reads into preview only** | Studio is source for template body; Ops form untouched for a trial | Safest experiment |
| **M2 — Sanity replaces Ops course body editor** | Studio edits `detail_body` equivalent; stop using C1–C13 Ops form | Full CMS swap |
| **M3 — Sanity sync → Supabase** | Studio publish webhook writes `catalog_draft_revisions` / `detail_body` | Keep Supabase as site truth |

This guide shows **M1 first** (read Sanity → render existing React shell), then notes for M2/M3.

---

## Step 1 — Create Sanity project (cloud)

1. Go to [https://www.sanity.io](https://www.sanity.io) → create account.  
2. Create project, e.g. name `pgs-v3-courses`.  
3. Create dataset `production` (and optional `staging`).  
4. Copy:
   - `projectId` (e.g. `abcd1234`)
   - `dataset` (`production`)
5. In Sanity manage → API:
   - **CORS origins:** add `http://localhost:7000`
   - **Tokens:**
     - Viewer / read token for public published content (if dataset is private)
     - Editor token **never** expose to the browser

---

## Step 2 — Add packages (when approved)

From repo root `d:\purpleguide\pgs-v3`:

```bash
pnpm add next-sanity @sanity/client sanity @sanity/image-url
pnpm add -D @sanity/vision
```

Optional later: `@sanity/preview-url-secret` for draft preview.

**Env vars** (`.env.local` — never commit secrets):

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
# Server-only — draft preview / write webhooks
SANITY_API_READ_TOKEN=...
```

Add the same keys to Vercel only after owner approval.

---

## Step 3 — Folder layout inside this repo

Proposed new files (none of these exist until install is approved):

```text
src/
  sanity/
    env.ts                 # read projectId / dataset / apiVersion
    client.ts              # createClient for server + browser
    schemaTypes/
      index.ts
      course.ts            # Course document = C1–C13 fields
      objects/
        highlightPhoto.ts
        learnerCard.ts
        faqTab.ts
        ...
    lib/
      queries.ts           # GROQ strings
      mapCourseToTemplate.ts  # Sanity doc → CoursesTemplateBodyV1
  app/
    sanity/
      [[...tool]]/
        page.tsx           # embeds Sanity Studio at /sanity
```

**Do not put Studio under `/studio`** — that path is already PGS staff login (`/studio/login`). Use `/sanity` for Sanity Studio.

---

## Step 4 — Sanity client (connect to cloud)

`src/sanity/env.ts` (concept):

```ts
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";
```

`src/sanity/client.ts` (concept):

```ts
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // false for draft preview
});
```

This is the bridge: **your Next code talks to Sanity Cloud** through this client.

---

## Step 5 — Define Course schema (match your C1–C13)

Your code already expects a typed body:  
`src/features/programs-courses/courses-template-schema.ts` → `CoursesTemplateBodyV1`.

Sanity schema should **mirror those fields**, not invent a freeform page builder.

Example shape for `src/sanity/schemaTypes/course.ts` (concept):

```ts
export default {
  name: "course",
  title: "Course",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Title" },
    { name: "slug", type: "slug", options: { source: "title" } },
    { name: "pgsCourseId", type: "number", title: "PGS catalog course id (e.g. 64)" },
    // C1
    { name: "heroImage", type: "image" },
    { name: "partnerLogo", type: "image" },
    // C2…C13 — string arrays, objects, images matching Zod
    { name: "topicsLeft", type: "array", of: [{ type: "string" }] },
    { name: "highlights", type: "array", of: [{ type: "highlightPhoto" }] },
    { name: "learners", type: "array", of: [{ type: "learnerCard" }] },
    { name: "faqTabs", type: "array", of: [{ type: "faqTab" }] },
    // …
  ],
};
```

Register in `schemaTypes/index.ts` and pass into Studio config.

**Rule:** every Sanity field must map 1:1 (or clearly) into `CoursesTemplateBodyV1`. If it cannot map, do not add the field.

---

## Step 6 — Embed Sanity Studio in Next

`src/app/sanity/[[...tool]]/page.tsx` (concept):

```tsx
"use client";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config"; // or src/sanity/sanity.config.ts

export default function SanityStudioPage() {
  return <NextStudio config={config} />;
}
```

`sanity.config.ts` (repo root or `src/sanity/`):

```ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { projectId, dataset } from "./src/sanity/env";

export default defineConfig({
  name: "pgs-courses",
  title: "PGS Courses",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
  basePath: "/sanity",
});
```

After install + `pnpm dev`:

1. Open `http://localhost:7000/sanity`  
2. Log in with Sanity account  
3. Create a **Course** document  
4. Publish  

---

## Step 7 — GROQ queries (read from Sanity into your app)

`src/sanity/lib/queries.ts` (concept):

```ts
export const courseBySlugQuery = `
  *[_type == "course" && slug.current == $slug][0]{
    _id, title, slug, pgsCourseId,
    heroImage, partnerLogo,
    topicsLeft, topicsRight,
    highlights[]{ ..., "url": photo.asset->url },
    learners[]{ ..., "photoUrl": photo.asset->url },
    faqTabs[]{ title, items[]{ question, answer } }
  }
`;

export const courseByPgsIdQuery = `
  *[_type == "course" && pgsCourseId == $id][0]{ ... }
`;
```

Fetch in a Server Component:

```ts
import { sanityClient } from "@/sanity/client";
import { courseByPgsIdQuery } from "@/sanity/lib/queries";

const doc = await sanityClient.fetch(courseByPgsIdQuery, { id: 64 });
```

---

## Step 8 — Map Sanity → your existing React template (the real connection)

You already render courses with:

| Piece | Path |
|---|---|
| Zod body | `src/features/programs-courses/courses-template-schema.ts` |
| Lab page | `src/app/preview/programs-courses/...` (fixture) |
| Ops preview map | `src/features/programs-courses/courses-cms-preview-map.ts` → `coursesCmsDraftToTemplate` |
| Template sections | `src/features/programs-courses/*` (C1–C13 components) |

**Connection function** (new, conceptual):

`src/sanity/lib/mapCourseToTemplate.ts`

```ts
import type { CoursesTemplateBodyV1 } from "@/features/programs-courses/courses-template-schema";

/** Sanity course document → same shape Ops preview already uses */
export function mapSanityCourseToTemplate(doc: SanityCourseDoc): CoursesTemplateBodyV1 {
  return {
    schemaVersion: 1,
    id: String(doc.pgsCourseId ?? doc._id),
    title: doc.title,
    // …map every C1–C13 field from Sanity → Zod shape
    // Reuse image URLs from Sanity CDN
  };
}
```

Then validate:

```ts
import { CoursesTemplateBodyV1 } from "@/features/programs-courses/courses-template-schema";

const body = CoursesTemplateBodyV1.parse(mapSanityCourseToTemplate(doc));
```

**Trial preview route** (new, only if approved), e.g.:

`src/app/preview/sanity-courses/[slug]/page.tsx`

```text
fetch Sanity by slug
  → mapSanityCourseToTemplate
  → mount same Programs Courses React body you use in Ops preview
```

That is the clean connection: **Sanity = content source, existing React shell = layout.**

Do **not** rebuild the page inside Sanity Portable Text blocks if you want Figma parity.

---

## Step 9 — Wire “change name → see it everywhere”

Example: change course title in Studio.

1. Open `http://localhost:7000/sanity`  
2. Open Course document  
3. Change `title` from `Sandhiya` to `Sandhiya Palani`  
4. Click **Publish**  
5. Open every page that fetches that document:
   - `http://localhost:7000/preview/sanity-courses/full-stack` (example trial route)
   - any other route using the same GROQ `_id` / slug  

All show the new title because they read **one** Sanity document.

For production caching: use `revalidateTag` / Sanity webhooks so publish invalidates Next cache.

---

## Step 10 — Images

Sanity stores images on its CDN.

1. Schema field `type: "image"`  
2. Upload in Studio  
3. In GROQ: `"url": image.asset->url` or use `@sanity/image-url` builder  
4. Pass URL strings into your existing section props (`heroImage`, C7 logos, C10 photos, C12 avatars)

Your current Ops path uses `marketing-public` + media library. Sanity path uses Sanity assets instead (unless you sync URLs into Supabase media later — M3).

---

## Step 11 — Preview drafts (optional)

Published-only is easier. Draft preview needs:

1. `SANITY_API_READ_TOKEN` with draft read  
2. Client with `perspective: "previewDrafts"`, `useCdn: false`, `token`  
3. Sanity Presentation tool or a `?preview=1` cookie gate  

Map draft docs through the same `mapSanityCourseToTemplate`.

---

## Step 12 — Modes M2 / M3 (only if you go beyond trial)

### M2 — Studio replaces Ops C1–C13 editor

- Staff use `/sanity` instead of Ops section form for body content.  
- Stop writing `detail_body` from `admin-courses-manager.tsx` for those courses.  
- Public/Ops preview fetch Sanity (or keep a thin catalog row for id/slug only).

### M3 — Studio publish → Supabase

```text
Sanity Publish
  → Sanity webhook → Next API route (new)
  → mapSanityCourseToTemplate
  → insert/update catalog_draft_revisions.values.detail_body
  → existing Ops preview + COURSE2g public path keep working unchanged
```

Webhook route would be **new** (e.g. `src/app/api/webhooks/sanity/route.ts`).  
Existing draft APIs stay; Sanity becomes an alternate writer into the same `detail_body`.

---

## Step 13 — Checklist (order of work)

| # | Task | Connects to |
|---|---|---|
| 1 | Create Sanity project + CORS | Cloud |
| 2 | Env vars | `.env.local` |
| 3 | `pnpm add next-sanity …` | `package.json` |
| 4 | `src/sanity/*` client + schema | New |
| 5 | Studio at `/sanity` | New App Router pages |
| 6 | Create Course docs in Studio | Sanity dataset |
| 7 | GROQ + `mapCourseToTemplate` | `CoursesTemplateBodyV1` |
| 8 | Trial preview page | Same React C1–C13 components |
| 9 | Publish → confirm title updates | Cache / revalidate |
| 10 | (Optional) webhook → Supabase | M3 only |

---

## Step 14 — What you open day-to-day after install

| URL | Purpose |
|---|---|
| `http://localhost:7000/sanity` | Sanity Studio (edit content) |
| `http://localhost:7000/preview/sanity-courses/[slug]` | Trial preview (if built) |
| `http://localhost:7000/preview/programs-courses` | Current fixture lab (unchanged) |
| `http://localhost:7000/ops/cms/courses` | Current Ops CMS (unchanged until M2/M3) |

---

## Step 15 — Security notes (day-1)

- Never put write tokens in `NEXT_PUBLIC_*`.  
- Protect `/sanity` in production (Sanity login + optionally IP / staff gate).  
- Do not let Sanity Portable Text inject arbitrary HTML into student pages without sanitizer policy.  
- Prefer structured fields → existing React components.  
- If using webhooks (M3), verify Sanity webhook signature.

---

## ELI5

1. Sanity Studio = a form website for your course text/photos.  
2. Sanity Cloud = the box that stores those answers.  
3. Your Next code asks the box for course 64 / slug.  
4. A small mapper turns Sanity’s answer into the **same** shape your Programs Courses page already understands.  
5. Change the title in Studio → publish → every page that asked for that course shows the new title.

---

## Stop line

This file is the **how-to**.  

- No packages are installed by this doc.  
- No existing CMS/API/Supabase files were changed to write this guide.  

To actually build it in the repo, owner must say:

**`GO AHEAD SANITY INSTALL`** — then implement Steps 2–8 as a separate approved gate (recommend M1 trial preview only first).
