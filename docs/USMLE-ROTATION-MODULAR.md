# USMLE Rotation — modular body map

Living map for the owner. Update only at **phase ends**, not every pixel tweak.

**Rule:** Preview first → owner Preview QC → only then pull to live `/usmlerotation`.

---

## Two surfaces (do not confuse)

| Surface | URL | What it is |
|---|---|---|
| **Preview (QC mirror)** | `/preview/usmlerotation-body` | Same modular body as live (shows side-test banner). |
| **Live (cutover DONE)** | `/usmlerotation` | Purified modular React body. Hostinger HTML no longer served on this route. |

Chrome / notification aesthetic polish = later shared pass (with student feed). iPad deferred.

---

## Responsive bands (this family)

| Band | Width | Status |
|---|---|---|
| Desktop | **>1366** | Built / QC’d for modular sections |
| iPad | **601–1366** | **Deferred** (partial CSS may exist; not signed off) |
| Mobile | **≤600** | Built / QC’d where noted |

Ignore Hostinger 767 for this modular family.

---

## Section order (preview shell)

Source: `src/features/usmlerotation/usmle-rotation-preview-shell.tsx`

| # | Section | Module `data-pgs-module` | Main files | Data / CMS |
|---|---|---|---|---|
| 1 | Hero | `usmle-rotation-hero` | `usmle-rotation-hero.*` | Static / content.ts |
| 2 | Live Activity | `usmle-rotation-live-activity` | `usmle-rotation-live-activity.*` | Static |
| 3 | IMG pitch | `usmle-rotation-img-pitch` | `usmle-rotation-img-pitch.*` | Static |
| 4 | What is + Benefits | `usmle-rotation-what-is` | `usmle-rotation-what-is.*` | Static |
| 5 | Why Pick Us (grey student) | `usmle-rotation-pick-us` | `usmle-rotation-pick-us.*` | Static |
| 6 | explore Rotations | `usmle-rotation-explore` | `usmle-rotation-explore.*`, `get-usmle-rotation-courses.ts`, `course-to-usmle-explore-card.ts` | CMS surface **`usmlerotation`** |
| 7 | Book in 3 Easy Steps | `usmle-rotation-steps` | `usmle-rotation-steps.*` | Static (snap polish deferred) |
| 8 | Elevate / #PurplePremium | `usmle-rotation-premium` | `usmle-rotation-premium.*` | Static |
| 9 | Pricing | `usmle-rotation-pricing` | `usmle-rotation-pricing.*` | Static |
| 10 | Testimonials | `usmle-rotation-testimonials` | `usmle-rotation-testimonials.*` | Static |
| 11 | Docs / expense request | `usmle-rotation-docs-request` | `usmle-rotation-docs-request.*` | Static (band-split C) |
| 12 | Outro CTA | `usmle-rotation-outro` | `usmle-rotation-outro.*` | Static |
| 13 | #StudentSupportHub | `usmle-rotation-support-hub` | `usmle-rotation-support-hub.*` | Static (email A: `connect@purpleguide.study`) |
| 14 | #Pgs picks | `usmle-rotation-picks` | `usmle-rotation-picks.*`, `get-usmle-rotation-picks-courses.ts`, `course-to-usmle-picks-card.ts` | CMS surface **`pgs_picks`** |

Shared copy/constants: `src/features/usmlerotation/content.ts`  
Assets: `public/assets/img/usmlerotation/`

---

## CMS card surfaces (courses)

Defined in `src/features/admin-cms/lib/card-surfaces.ts`.

| Key | Where it shows | Sharing |
|---|---|---|
| `usmlerotation` | explore Rotations on this page | **Dedicated** — must be ticked; purpleboard does not leak in |
| `pgs_picks` | #Pgs picks carousel | **Dedicated** — separate tick from explore |
| `purpleboard` / CV Ready keys | Other pages | Shared among themselves; **not** these two |

**Owner ops**

1. CMS → Courses → open a course  
2. Tick the surface you want (`USMLE Rotation — explore Rotations` and/or `#Pgs picks — carousel card`)  
3. Publish  
4. Refresh preview  

No tick → empty message on that section (not a crash).  
Links for both → `/programsfull/program/{id}`.

---

## Data flow (architecture batches)

```
Supabase courses (published)
  → filter card_surfaces includes key
  → map row → card model
  → preview page loads both fetchers
  → shell passes props
  → Explore / Picks render
```

Preview page: `src/app/preview/usmlerotation-body/page.tsx`

---

## Locked owner decisions (so far)

- Docs/request copy: **band-split C** (desktop docs block vs mobile expense block)  
- Support hub email: **A** `connect@purpleguide.study`  
- #Pgs picks Phase 1: design shell → Phase 2: CMS `pgs_picks` (done)  
- Desktop picks: as many **full** cards as fit width; arrows = one card  
- Mobile picks: one card  
- Doctor image size: bump later on main pull  

---

## Deferred (not done)

- iPad mid-band sign-off  
- Steps / snap polish  
- Doctor size polish  
- Shared chrome / notification aesthetic pass (with student feed)  
- Shared `#Pgs picks` on other pages (`PgsPicksSection` stub stays parked)  

---

## How we work (owner + Cursor)

Skill: [`.cursor/skills/pgs-owner-teach-map/SKILL.md`](../.cursor/skills/pgs-owner-teach-map/SKILL.md)

1. **Propose → GO AHEAD → implement → Preview QC**  
2. After each batch: short owner brief (WHAT / WHY / LIVE SAFETY / HOW YOU OPERATE)  
3. **Deep teach** on architecture batches (CMS, auth, documents, RBAC) or when you ask  
4. This map: update only at phase ends  

---

## Phase log

| Phase | When | What |
|---|---|---|
| Body sections 1–13 | through support hub | Modular shell through #StudentSupportHub |
| #Pgs picks Phase 1 | design shell | Placeholders, fit-width carousel |
| #Pgs picks Phase 2 | CMS | Surface `pgs_picks`, fetcher, live links, empty state |
| **Live cutover** | 2026-09-07 | `/usmlerotation` serves modular body (Hostinger HTML off this route) |

---

*Last updated: 2026-09-07 — live `/usmlerotation` cutover.*
