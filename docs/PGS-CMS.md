# PGS CMS — living map

**Skill:** `.cursor/skills/pgs-cms/SKILL.md`  
**Full mental model · honesty · detailed gates:** [`SITE-PLAN-02-CMS.md`](./SITE-PLAN-02-CMS.md)  
**Face / templates:** [`CATALOG-B-STAR.md`](./CATALOG-B-STAR.md) · skill `pgs-face-card-pass`  
**Admin overview (not editors):** [`PGS-ADMIN-OPS.md`](./PGS-ADMIN-OPS.md)  
**Series:** [`SITE-BACKEND-PLAN.md`](./SITE-BACKEND-PLAN.md) → **Popups LOCKED:** [`PGS-POPUPS.md`](./PGS-POPUPS.md) · next: Security / build gates

Owner lock **2026-09-21**. No product build without named `GO AHEAD CMS-…`.

---

## What CMS is

Staff content cockpit: **add / edit / publish / archive** catalog + page content — events, courses, media, testimonials, typed page slots, curated picks rails, tags. Same staff login as Ops — **not** a second CMS password.

```text
ONE staff Auth id (same cookie as Ops)
  → catalog.* · cms.* · content.* · media.*
  → /admin/catalog  events · courses · programs · unis · tags
  → /admin/content  pages · testimonials · FAQs · articles · …
  → /admin/media    pics · videos
  → Picks rails     select EXISTING published events/courses
  → Popups later    SoftLock / bump / marketing (CMS-P + Figma)
```

**Picks ≠ invent rows.** Rail membership points at real published catalog rows only.

---

## Locked stack

| Layer | Choice |
|---|---|
| App | Next.js App Router · React · TypeScript · Vercel |
| Auth / DB | Supabase Auth · Postgres · RLS · RPCs · draft revisions |
| CMS UI | shadcn/ui · Lucide · TanStack Table |
| Forms | React Hook Form + Zod |
| Preview | Next.js Draft Mode · catalog preview API |

**Build on:** live `/admin/catalog` · `/admin/content` · `/admin/media` · `src/lib/admin-registry.ts`.

---

## Reference Bank (GitHub / apps — patterns only)

| Bank | Mature app | OSS | Use for |
|---|---|---|---|
| **RB-09 CMS CORE** | [Contentful](https://www.contentful.com/) | [`payloadcms/payload`](https://github.com/payloadcms/payload) | Collections · fields · relationships · validation |
| **RB-10 PUBLISHING** | Contentful publish/preview | Payload draft patterns + **Next Draft Mode** | Draft · preview · publish |
| **RB-01 CRM** | HubSpot CRM | [`twentyhq/twenty`](https://github.com/twentyhq/twenty) | Master list filters / sort |
| **RB-02 ACCESS** | GitHub Orgs/Teams | [`supabase/supabase`](https://github.com/supabase/supabase) | Who may edit CMS |
| **RB-08 DOCUMENTS** | Google Drive | [`paperless-ngx/paperless-ngx`](https://github.com/paperless-ngx/paperless-ngx) | Media organize/replace **patterns only** |
| **RB-11 RICH** | Contentful rich text | Lexical (locked) | Named rich fields only — never page builder |

**REJECT:** install Payload · embed Payload admin · page builder · Canva forever CMS · Hostinger PHP auth · random GitHub · `cms_users` · unpublished rows on public picks.

Full bank: `.cursor/rules/pgs-v3-reference-bank.mdc`.  
Study checklist: [`SITE-PLAN-02-CMS.md`](./SITE-PLAN-02-CMS.md) § Reference Bank.

### Existing PGS sources (not external)

| Source | Role |
|---|---|
| `/admin/catalog` · `/admin/content` · `/admin/media` | **Build here** |
| Hostinger `pgs_admin` CMS modules | Business intent only — PHP **REJECT** |
| Junior Canva editors | Shape only — forever CMS **REJECT** |
| Face lab / CATALOG-B-STAR | `face_layout` · `detail_template` |

---

## Game plan (gates)

One `GO AHEAD CMS-n` at a time. Prefer lab/preview until owner pulls live.

| Gate | Focus |
|---|---|
| **CMS-0** | Plan QC · owner decisions (archive · picks UI · popups · calendar) |
| **CMS-1** | Events + Courses master list UX (search · tags · sort · Live/Draft) |
| **CMS-2** | Media attach/replace QC |
| **CMS-3** | Testimonials (+ FAQ) → public reads DB |
| **CMS-4** | PGS picks / Top picks rails (existing published rows) |
| **CMS-5** | Calendar view (only if owner marks P0) |
| **CMS-6** | Page slots deepen (countries · USMLE · …) |
| **CMS-7** | Tags · sort · archive polish |
| **FACE / B\*** | `detail_template` + `face_layout` on row |
| **CMS-P** | Popups — [`SITE-PLAN-03-POPUPS.md`](./SITE-PLAN-03-POPUPS.md) · skill `pgs-popups` (**LOCKED** plan) |
| **CMS-B** | Blogs deepen — only if owner names it |

Day-1 every gate: permission check · published-only on public · no IDOR on drafts · fail closed.

---

## Key surfaces

| Surface | URL | Notes |
|---|---|---|
| Staff login | `/login?surface=operations` | Same as Ops — not student `/login` |
| Catalog | `/admin/catalog` | Events · courses · programs · unis |
| Events / Courses | `/admin/catalog/events` · `…/courses` | Master lists (CMS-1) |
| Content | `/admin/content` | Modules + pages |
| Page editor | `/admin/content/pages/[slug]` | Typed slots only |
| Media | `/admin/media` | Pics · videos |
| Ops home | `/ops` | Overview — not CMS editors |

Permissions: `catalog.*` · `cms.*` · `content.*` · `media.*`.

---

## Hard locks

1. One staff identity with Ops — domains ≠ separate logins · no `cms_users`.  
2. Steal bank patterns only; implement on locked stack — **never install Payload**.  
3. Picks / rails = membership of **existing published** catalog rows.  
4. Page writing = typed slots; layout stays Figma/code — no page builder.  
5. Popups only under named gate + owner Figma desktop+mob.  
6. Face/template pickers coordinate with `pgs-face-card-pass` / B\* — not silent inside CMS-1.  
7. Public site reads published only (fail closed).

---

## How to continue

| You say | What happens |
|---|---|
| Edit mental model / gates | Update [`SITE-PLAN-02-CMS.md`](./SITE-PLAN-02-CMS.md) + this MD + skill |
| `READY 02` | Lock CMS plan · Student Ops already drafted ([`PGS-STUDENT-OPS.md`](./PGS-STUDENT-OPS.md)) |
| `GO AHEAD CMS-1` | First build gate only — master list UX (`pgs-backend-phase-wire`) |
| `GO AHEAD CMS-n` | Named gate only — then stop for QC |
