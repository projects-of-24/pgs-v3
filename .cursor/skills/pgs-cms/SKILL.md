---
name: pgs-cms
description: >-
  PGS CMS: catalog events/courses master, media, page slots, testimonials,
  picks rails from existing rows, tags, UnivMeet, Zoho URLs, popups later.
  Same staff id as Ops (not cms_users). Reference Bank RB-09/RB-10 (+ RB-01/02/08).
  Use when planning or wiring /admin/catalog, /admin/content, /admin/media,
  picks rails, CMS publish/preview, or CMS game-plan gates CMS-0…CMS-P.
---

# PGS CMS (locked pattern)

Owner lock **2026-09-21**. Planning-first; build only with named `GO AHEAD CMS-…`.

**Living MDs:**

| Doc | Role |
|---|---|
| [`docs/PGS-CMS.md`](../../docs/PGS-CMS.md) | Stack · bank · hard locks · gates · entry URLs |
| [`docs/SITE-PLAN-02-CMS.md`](../../docs/SITE-PLAN-02-CMS.md) | Mental model · honesty map · detailed game plan · owner decisions |
| [`docs/CATALOG-B-STAR.md`](../../docs/CATALOG-B-STAR.md) | `detail_template` · `face_layout` · picks surfaces |
| Face cards | skill `pgs-face-card-pass` |
| Ops (not editors) | [`docs/PGS-ADMIN-OPS.md`](../../docs/PGS-ADMIN-OPS.md) · skill `pgs-admin-ops` |

Series index: [`docs/SITE-BACKEND-PLAN.md`](../../docs/SITE-BACKEND-PLAN.md) → next batch **Student Operations** after `READY 02`.

---

## Product picture (do not invent)

```text
CMS = add / edit / publish / archive product content
  ONE staff Auth id (same cookie as Ops — not cms_users)
  → catalog.* · cms.* · content.* · media.*
  → Events + Courses master · Programs/Unis · Media · Tags
  → Page slots (countries · USMLE · UnivMeet) · Testimonials
  → PGS picks / Top picks = SELECT existing published rows
  → Zoho / booking_url on rows · popups later (Figma + CMS-P)
```

**REJECT:** `pnpm add payload` · Payload admin embed · page builder · Canva forever CMS · Hostinger PHP security · duplicate fake rows for picks · second CMS password · inventing slots without Figma.

---

## Locked stack (build here)

| Layer | Choice |
|---|---|
| App | Next.js App Router · React · TypeScript · Vercel |
| Auth / DB | Supabase Auth · Postgres · RLS · RPCs · draft revisions |
| CMS UI | shadcn/ui · Lucide · TanStack Table (master lists) |
| Forms | React Hook Form + Zod |
| Preview | Next.js Draft Mode (pages) · catalog preview API |

**Build on existing:** `/admin/catalog` · `/admin/content` · `/admin/media` · `src/lib/admin-registry.ts`. Do not replace with a new CMS product.

---

## Reference Bank only (CMS)

| Bank | Feel | OSS study | PGS use |
|---|---|---|---|
| **RB-09 CMS CORE** | Contentful | `payloadcms/payload` | Collections · fields · relationships · validation |
| **RB-10 PUBLISHING** | Contentful publish | Payload draft patterns + **Next Draft Mode** | Draft · preview · publish · rollback mindset |
| **RB-01** | HubSpot CRM | `twentyhq/twenty` | Events/courses **master list** UX |
| **RB-02** | GitHub Orgs | `supabase/supabase` | Who may `catalog.*` / `cms.*` |
| **RB-08** | Google Drive | `paperless-ngx/paperless-ngx` | Media organize/replace patterns only |
| **RB-11** | Contentful rich text | Lexical (locked) | Named rich fields only — never page HTML |

Patterns only. Full catalog: `.cursor/rules/pgs-v3-reference-bank.mdc`.  
Study steps + ADOPT/ADAPT/REJECT: `docs/SITE-PLAN-02-CMS.md`.

---

## Game plan (one gate each)

```text
CMS-0  Plan QC
CMS-1  Events + Courses master list UX
CMS-2  Media attach/replace
CMS-3  Testimonials (+ FAQ) public wire
CMS-4  Picks rails (pgs_picks / featured / …)
CMS-5  Calendar view (if owner P0)
CMS-6  Page slots deepen
CMS-7  Tags · sort · archive polish
FACE/B*  detail_template + face_layout on row
CMS-P  Popups (GO AHEAD popups + Figma)
CMS-B  Blogs deepen (only if owner names it)
```

Gate rule: propose → `GO AHEAD CMS-n` → day-1 security → update living MD → owner QC → stop. No silent jump to popups or face DB.

---

## Key URLs / permissions

| Surface | URL | Permission family |
|---|---|---|
| Staff login | `/login?surface=operations` | Same as Ops |
| Catalog home | `/admin/catalog` | `catalog.*` |
| Events / Courses | `/admin/catalog/events` · `…/courses` | `catalog.manage` / `.publish` |
| Content modules | `/admin/content` · `…/modules/…` | `content.*` |
| Page slots | `/admin/content/pages/[slug]` | `cms.*` |
| Media | `/admin/media` | `media.*` |
| Ops overview | `/ops` | Ops batch — not CMS editors |

Shell: `src/components/admin-shell.tsx`.

---

## Agent checklist

- [ ] Read `docs/PGS-CMS.md` + `docs/SITE-PLAN-02-CMS.md` (references + game plan)  
- [ ] Propose → wait for `GO AHEAD CMS-n` (one gate only)  
- [ ] Bank row only — no random GitHub · **never install Payload**  
- [ ] Same staff id as Ops — no `cms_users`  
- [ ] Picks = existing **published** rows only · fail closed on public  
- [ ] Popups only under `GO AHEAD popups` + owner Figma  
- [ ] Face/template → `pgs-face-card-pass` + CATALOG-B-STAR (not CMS-1)  
- [ ] Update `PGS-CMS.md` / `SITE-PLAN-02-CMS.md` after a gate  
