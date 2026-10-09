# Public body template inventory (Phase 0–2)

Owner roadmap 2026-09-04. Shared chrome remains **LOCKED** ([`MODULAR-PUBLIC-FRONTEND.md`](./MODULAR-PUBLIC-FRONTEND.md)).  
This doc is **read-only inventory + gates + swap order** — not a wire-up approval.

**Junior scout clone (local, gitignored):** `.ref/pgs_app` ← sparse checkout of [`patienceSweetChild/pgs_app`](https://github.com/patienceSweetChild/pgs_app) (`src/components/cards`, `src/lib/catalog`, `src/features`).

**Do not** import junior Auth / `CmsHtml` XSS patterns. Visual = owner Figma. Security = V3.

---

## Hybrid path (locked)

1. Scout templates + junior + cards (this doc).  
2. Per family: legacy intent + V3 contracts → `GO AHEAD` → one shared body → Preview QC → swap all routes on that template.  
3. Order: **T6 cards → Feed → Track Progress → T1–T5 → singles → popups last**.  
4. Popups only after owner shares Figma.

---

## T6 — Card faces (map + reuse)

### Card components

| Figma / product face | Component | Parked in V3 | Junior | Notes |
|---|---|---|---|---|
| Program card (full / compact) | `ProgramCard` | [`src/components/cards/ProgramCard.tsx`](../src/components/cards/ProgramCard.tsx) | same path in `.ref/pgs_app` | Files **differ** slightly — QC before lock |
| Promo / dates-extended card | `PromoCard` | yes | yes | Used on Saved + CMS preview |
| Internship / session-style card | `InternshipCard` | yes | yes | Events / Saved |
| Saved router | `SavedCard` | yes | yes | Dispatches by `type` → Program / Promo / Internship |
| Saved list | `SavedFeed` | yes | yes | |
| Heart / save control | `HeartToggle` | yes | yes | Must hit V3 `/api/student/saved` |
| Tag chips | `PillTags` | yes | yes | |
| Types / surfaces | `types.ts`, `badge-chip-style.ts`, `cards.css` | yes | yes | CMS-ready shapes |

### Surface keys (course/event → which card face)

Authority in V3: [`src/features/admin-cms/lib/card-surfaces.ts`](../src/features/admin-cms/lib/card-surfaces.ts) (matches junior `src/lib/catalog/card-surfaces.ts`).

| Surface key | Face | Reuse surfaces |
|---|---|---|
| `saved_program_full` | Program full | Saved list, CMS visual editor |
| `saved_program_compact` | Program compact | Saved, CMS |
| `saved_promo` | Promo | Saved, CMS |
| `saved_internship` | Internship | Saved, CMS |
| `purpleboard` | Program | PurpleBoard grid |
| `cvready_featured` | Program / featured | CV-Ready featured |
| `cvready_programs` | Program grid | CV-Ready Discover |
| `add_to_calendar` / `feed_chip` | Feed chip (calendar) | Feed upcoming — **deferred interactive calendar** |
| `events_hero` | Events hero | Purple Events |
| `events_upcoming_card` | Upcoming session | Events listing |

### Mappers

| Role | Junior | V3 today |
|---|---|---|
| Catalog row → card | `.ref/pgs_app/src/lib/catalog/card-mappers.ts` | **Missing** as `src/lib/catalog/*` — CMS-only maps in [`course-preview-map.ts`](../src/features/admin-cms/course-preview-map.ts) / [`event-preview-map.ts`](../src/features/admin-cms/event-preview-map.ts) |
| Board helpers | junior mappers `mapPurpleboard*` | Parked board uses local `boardCourseToProgramCard` in [`purpleboard/content.ts`](../src/features/purpleboard/content.ts) |

**T6 QC gap before first swap:** port or reconcile `card-mappers.ts` into V3 under `src/lib/catalog/` (ADAPT — V3 security), then owner Preview QC cards vs Figma. Do **not** invent new card types.

---

## Template / single matrix

Backend column values: **LIVE** = V3 contract wired on live route · **PARTIAL** = some gates/data · **PARKED_UI** = React body exists but not live · **MISSING_UI** = junior has it, V3 feature folder absent · **LEGACY_HTML** = live body is legacy HTML · **DEFERRED** = known later (e.g. interactive calendar).

| Family | Figma template / single | Junior path | Parked in pgs-v3? | Live today | Cards used | Backend status |
|---|---|---|---|---|---|---|
| **T6** | Card faces | `src/components/cards` + `src/lib/catalog` | Cards **yes**; `lib/catalog` **no** | Used in CMS preview + parked pages | Program / Promo / Internship / Saved* | **PARTIAL** — saved API L4 live; public catalog readers incomplete vs junior |
| **S Feed** | Feed / student dashboard | `src/features/dashboard` (+ Comments*, dash CSS) | **Partial** — `DashboardPage` / content / css / `map-workspace`; **missing** junior `CommentsSection`, `commentsRepo`, `useDashboardComments`, `dashboard.css` parity check | `/student/dashboard` — legacy HTML for non-premium; Premium uses `PremiumStudentDashboard` + workspace | SoftLock / picks; calendar chip **DEFERRED** | **PARTIAL** — `resolveStudentExperience` + `premium_entitlement` + workspace LIVE; Figma Feed UI **PARKED_UI**; Dash CMS content contract incomplete vs junior |
| **S Progress** | Track your progress | `src/features/progress` | **MISSING_UI** (no `src/features/progress`) | `/feed_track_progress` — locked legacy for non-premium; Premium `PremiumProgressBoard` | — | **PARTIAL** — entitlement gate LIVE; Loopboard/progress UI is developer board not junior Figma page |
| **T1** | Country destination | `src/features/countries` | **Yes** (`CountryPage`, css, content) | `/countriesuk` … `/countriesusa` etc. — **LEGACY_HTML** each route | — | **PARTIAL** — CMS country editors LIVE; student slug route not unified |
| **T2** | Premium pathway (STEM/MBA/…) | `src/features/pathway` + `purplepremium` | pathway **yes**; `purplepremium` **MISSING_UI** | `/purplenonmedical`, `/purplepremiumhome` — **LEGACY_HTML** | — | **PARTIAL** — pathway CMS LIVE |
| **T3** | Medical pathway (USMLE/PLAB/AMC) | `pathway` (slug) | pathway parked | `/purpleusme`, `/purpleplab`, `/purpleamc` — **LEGACY_HTML** | — | **PARTIAL** |
| **T4** | Course detail | `src/features/programsfull` (`CourseDetailPage`) | **Yes** | `/programsfull/program/[id]` — generated **LEGACY_HTML**; listing redirects `/cvreadyprogram` | ProgramCard on parked listing | **PARTIAL** — catalog course CMS LIVE |
| **T5** | Event detail / session | `purpleevents` | **Yes** | `/purpleevents`, `/purpleevents/session/[id]` — **LEGACY_HTML** | Internship / promo / program surfaces in CMS | **PARTIAL** |
| **S** | PurpleBoard | `purpleboard` | **Yes** | `/purpleboard` — **LEGACY_HTML** | ProgramCard | **PARTIAL** — catalog ready; live board static |
| **S** | Upload docs | `documents` | **MISSING_UI** | `/upload_your_doc` — locked legacy / Premium `DocumentWorkspace` | — | **LIVE** Phase 4D workspace for premium; fail-closed clean access |
| **S** | Finance Hub | `finance` | **MISSING_UI** | `/finance` — **LEGACY_HTML** | — | Content/CMS TBD |
| **S** | Scholarship Hub | `scholarship` | **MISSING_UI** | `/scholarship` — **LEGACY_HTML** | — | TBD |
| **S** | CV-Ready programs | `cvreadyprogram` | **MISSING_UI** | `/cvreadyprogram` — **LEGACY_HTML** | ProgramCard surfaces | **PARTIAL** |
| **S** | USMLE Rotation | `usmlerotation` | **MISSING_UI** | `/usmlerotation` — **LEGACY_HTML** | — | TBD |
| **S** | Premium home | `purplepremium` | **MISSING_UI** | `/purplepremiumhome` — **LEGACY_HTML** | — | TBD |
| **S** | Explore countries | `explorecountries` | **MISSING_UI** | `/explorecountries` — **LEGACY_HTML** | — | TBD |
| **S** | Uni tie-up / partner | `unitieup` | **MISSING_UI** | `/unitieup` — **LEGACY_HTML** | — | TBD |
| **S** | Student resources | `studentresources` | **Yes** | `/studentresources` — **LEGACY_HTML** | — | TBD |
| **S** | Saved | `saved` | **Yes** | `/saved` — DeveloperStudentShell + SavedList (not parked SavedFeed) | Saved* | **PARTIAL** — hearts API LIVE |
| **S** | Home / simplehome | `home` | **MISSING_UI** | `/` + `/simplehome` — **LEGACY_HTML** | — | KEEP V3 chrome+legacy until GO AHEAD |
| **S** | About / contact / legal | `about`, `contact`, `legal` | **MISSING_UI** | legacy routes | — | Content |
| **S** | 404 / T&C / datesdeadlines / mentor referral | (legal + misc) | mostly missing | `/error_404`, etc. | — | Low priority after templates |
| **Popups** | Modular desktop+mobile | SoftLock / BumpPremium in junior `components/` | SoftLock / BumpPremium in V3 components | Various legacy popups | — | **DEFERRED** — owner shares Figma before commit |

### Junior feature folders **not** under `src/features/` in V3

`about`, `admin`*, `auth`*, `contact`, `cvreadyprogram`, `documents`, `explorecountries`, `finance`, `home`, `legal`, `progress`, `purplepremium`, `scholarship`, `unitieup`, `userprofile`, `usmlerotation`

\* Junior admin/auth are **not** V3 authority — keep V3 Ops/CMS/Auth.

### Parked in V3 already (do not wire without `GO AHEAD`)

See [`src/features/FIGMA_PORT_PARKED.md`](../src/features/FIGMA_PORT_PARKED.md): dashboard, cards, purpleboard, purpleevents, programsfull, countries, pathway, saved helpers, SoftLock / BumpPremium.

---

## Phase 1 — Backend-safe gates (Feed + Track Progress first)

Run **before every live body swap**. Four-source gate still required (legacy / owner Figma / reference bank if applicable / current V3).

### Shared checklist (every family)

| Gate | Rule |
|---|---|
| Auth / surface | Anonymous vs `authenticated_standard` vs `authenticated_premium` only — no invented student roles |
| Premium | `premium_entitlement` / `premium_entitlements` is truth — never JWT role, student flag, or junior entitlement hack |
| Scope | Student self-data only on student surface; staff uses `mentor_assignments` + permissions — never fetch-all then hide in React |
| Documents | Phase 4D: normal access requires explicit **clean**; non-clean fails closed |
| Comments | One conversation domain — do not fork junior comment repo as a second system without mapping to V3 |
| Notifications | Recipient-aware domain; student + staff recipients |
| Loopboard | One Loopboard truth — no second Kanban |
| Audit | Mutations → `audit_events` where required |
| Metrics | No fake charts / % / sparklines |
| Swap discipline | Body only; shared chrome **LOCKED**; no junior Auth copy |

### Feed (`/student/dashboard`) — current vs needed

| Concern | Live V3 today | Before Figma Feed swap |
|---|---|---|
| Experience states | `resolveStudentExperience()` | Keep |
| Non-premium UI | Legacy `student-dashboard` HTML + SoftLock-like lock | Replace with parked/junior `DashboardPage` only after QC |
| Premium UI | `PremiumStudentDashboard` + `loadPremiumWorkspace` | Decide ADOPT Figma feed vs keep premium workspace modules — owner `GO AHEAD` |
| Catalog / Top picks | Premium catalog loader | Map to card surfaces + V3 catalog readers |
| Comments | Not on parked V3 dashboard module | Port junior comments **only** if mapped to one V3 comment truth |
| Calendar | Static / deferred | Stay **DEFERRED** until popup+frontend phase |
| Dash CMS | `dash-cms` exists in V3 | Confirm published JSON contract before ADAPT junior dashboard content |

### Track Progress (`/feed_track_progress`) — current vs needed

| Concern | Live V3 today | Before Figma Progress swap |
|---|---|---|
| Gate | Anonymous + non-premium → `progress-locked` HTML; premium → `requirePremiumActor` | Keep entitlement fail-closed |
| UI | `PremiumProgressBoard` (developer/Loopboard-shaped) | Junior `ProgressPage` is **MISSING** from V3 features — port as parked module first, then QC |
| Data | `loadPremiumWorkspace` | Map Loopboard / progress fields to one Loopboard truth — no fake progress % |

### Documents note (related single)

`/upload_your_doc` already uses Phase 4D `DocumentWorkspace` for premium — when swapping Figma docs body, **keep** 4D lifecycle; only replace chrome-inside-page presentation after `GO AHEAD`.

---

## Phase 2 — Swap order (execute only after `GO AHEAD`)

Do **not** wire parked modules into live `page.tsx` until the owner says `GO AHEAD` for that family/route.

| Step | Family | Action |
|---|---|---|
| 1 | **T6 Cards** | QC Figma vs parked vs junior; reconcile `card-mappers` into V3; lock faces + surfaces |
| 2 | **Feed** | Contract + desktop/mobile Preview QC → `GO AHEAD /student/dashboard` (or Feed) → body swap |
| 3 | **Track Progress** | Port junior `progress` → park → QC → `GO AHEAD /feed_track_progress` |
| 4 | **T1 Country** | One shared `CountryPage` → all `/countries*` |
| 5 | **T2 / T3 Pathways** | Shared pathway template → premium + medical routes |
| 6 | **T4 / T5** | Course + event details consuming locked cards |
| 7 | Singles | Board, docs, finance, scholarship, CV-Ready, rotation, premium home, explore, … |
| 8 | **Popups** | After owner Figma share — modular desktop+mobile |

Default first implement after this inventory: **T6 cards QC**, then **Feed**.

---

## Explicit non-goals (until reopened)

- Editing locked shared chrome (`public-header` / `public-footer` / globals modular chrome / `legacy-header-breakpoints` / hello failsafe)
- Committing `.ref/pgs_app`
- Bulk-replacing all legacy bodies in one PR
- Sorting popups before page bodies
- Inventing card types already covered by Program / Promo / Internship / Saved*
