# Student #feed — modular body map

Living map for the owner. Update only at **phase ends**, not every pixel tweak.

**Rule:** Preview first → owner Preview QC → only then pull to live `/student/dashboard`.

Same method as [`docs/USMLE-ROTATION-MODULAR.md`](./USMLE-ROTATION-MODULAR.md) (on `feat/countries-modular-compose`).

---

## Two surfaces (do not confuse)

| Surface | URL | What it is |
|---|---|---|
| **Preview Family A (locked)** | `/preview/student-feed` | Modular React body — **standard** locked. Locked chrome. |
| **Preview Family A (anonymous)** | `/preview/student-feed-anonymous` | Same locked body as standard; **placebo identity** only. |
| **Preview Family B (Premium)** | `/preview/student-feed-premium` | **LOCKED (desktop + mobile UI)** — **READY TO PORT** to live Premium feed (replace Hostinger). CMS/Ops + iPad deferred. |
| **Live (cutover)** | `/student/dashboard` | **Steps 1–3 DONE** — anon / standard / Premium all purified. Ported onto `feat/feed-track-progress-modular-clean` 2026-09-09. Aesthetic pass deferred. CMS/Ops + iPad deferred. |

**Do not** use `?premium=1` on Family A — Premium is its own preview route.

---

## Responsive bands (this family)

| Band | Width | Status |
|---|---|---|
| Desktop | **>1366** | Active |
| Mobile | **≤600** | Active |
| iPad | **601–1366** | **Deferred** (no Figma iPad feed yet — separate pass) |

Ignore Hostinger 767 for this modular family.

---

## Section order (preview shell)

Source: `src/features/student-feed/student-feed-preview-shell.tsx`

**Same blocks on desktop + mobile — page order / layout differ by band** (owner).

### Band visual order (Figma locked feed)

Owner cluster (Quick Dashboard + Notes + Aspirant/actions) — **same blocks, different order**:

| Band | Order |
|---|---|
| **Desktop** | 1) Quick Dashboard (locked overlay) → 2) Notes **\|** Aspirant pills + Track / #purpleBoard (side-by-side) |
| **Mobile** | 1) Aspirant pills → 2) Track / #purpleBoard → 3) Quick Dashboard (locked) → 4) Notes |

QC refs: `public/previews/student-feed-qc/owner-cluster-desktop.png` · `owner-cluster-mobile.png` · `owner-desktop-top-picks-beside-cluster.png`

Full page under Identity:

| Band | Placement |
|---|---|
| **Desktop >1366** | Mid-cluster **left** · Top picks **right** (position-only; module designs locked) |
| **Mobile ≤600** | Top picks (collapsed) **above** mid-cluster — **LOCKED** |

### Module status

| # | Section | Module `data-pgs-module` | Status | Figma |
|---|---|---|---|---|
| 1 | Identity card | `student-feed-identity-card` | **LOCKED** (desktop + mobile) | Desktop `18657:10454` · Mobile `207:2217` |
| 2 | Quick Dashboard | `student-feed-quick-dashboard` | **IN QC (cluster)** — 1×4 / 2×2 · lock when not Premium | Desktop `18375:10811` · Mobile `206:5892` |
| 3 | Top picks | `student-feed-top-picks` | Mobile position **LOCKED**; desktop **right of mid-cluster**; fixed scroll + hidden bar | Desktop `18375:10739` · Mobile `206:5883` |
| 4 | Notes + aspirant/actions | `student-feed-notes` / `aspirant` / `actions` | **IN QC (cluster)** — arranged via `student-feed-mid-cluster` | Owner cluster + Figma Note 9 / actions |
| 5 | Unlock pitch (NO / YES) | `student-feed-unlock-pitch` | **IN QC** — locked-only | Desktop `18375:11060` · Mobile derived |
| 5b | Help Hub CTA | `student-feed-help-hub` | **IN QC** — locked-only; Book → popup/Zoho deferred | Desktop `18375:11127` · Mobile derived (not empty rect `18375:10686`) |
| 6 | Where You Stand (+ finalized / tasks) | `student-feed-where-you-stand` | **6A–6E LOCKED** | through `18375:10941` / `206:6951` |
| 7 | Comments | `student-feed-comments` | **IN QC** — v2 no upvotes · forlocked when not Premium | Desktop `18796:11932` · Mobile `1029:7535` |
| 8 | Upcoming Events | `student-feed-upcoming-events` | **LOCKED** UI · **2A wired** site-wide `events` (fixture if empty) | Desktop `17961:10810` · Mobile `206:6244` |

Assets: `public/assets/img/figma-feed/`  
Figma QC refs: `public/previews/student-feed-qc/`

---

## Section 1 — Identity card (LOCKED)

| Band | Contract |
|---|---|
| Desktop | Figma `18657:10454` — Yet to Unlock / Premium variants |
| Mobile | Figma `207:2217` — same product contract; pathway type **2×** Figma (20/14) per owner QC |
| Align | Tops with closed `#toggleBtn`; shell chrome-style pull; no QC banner |
| Deferred | Full mobile card **1.2×** resize (not CSS scale) — owner may reopen |
| Anonymous | **IN QC** — `/preview/student-feed-anonymous` · placebo: Aspirant / @futureAchiever / id:1111 / Skill Mindset / Yet to Unlock · avatar `identity-avatar-anonymous.jpg` (shrug square crop; same path as `HELLO_ASPIRANT_DEFAULT_AVATAR` for modular anonymous pages) |
| Profile data | **PARKED** — pic / id / stream / year / etc. sync from Student Profile hub later ([`PGS-STUDENT-PROFILE.md`](./PGS-STUDENT-PROFILE.md) · skill `pgs-student-profile`). **Do not redesign this card chrome** for a Facebook look; hub page is separate. |

### Entitlement label

| State | Green title | Badge |
|---|---|---|
| `anonymous` / `authenticated_standard` | **Not shown** | `Yet to Unlock Full Access` |
| `authenticated_premium` | `#PURPLEPREMIUM` | `#PURPLEPREMIUM` |

Helper: `src/features/student-feed/student-feed-premium-label.ts`  
Preview: `/preview/student-feed` · `/preview/student-feed?premium=1`

---

## Section 3 — Top picks (product notes — backend explore later)

**Figma:** same module on both bands (desktop expanded list · mobile shrunk header to save space).

| Band | Node | Visual |
|---|---|---|
| Desktop | [`18375:10739`](https://www.figma.com/design/7WFrAbx3cvXReZxtTiQ76r/all-pages-v6?node-id=18375-10739) | White card ~303×442 — header `Top picks >` + filter/tune icon · divider · list rows (title, status chip, `#tag` + color square, thumb) |
| Mobile | [`206:5883`](https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/cas-v6---mobile?node-id=206-5883) | Collapsed bar ~303×52 — same header only; **tap header opens** to the full list (same content as desktop) |

### Feed rule (owner — wire when building backend)

1. CMS holds courses, events, and similar catalog items.
2. Each item can carry **pathway tags** (e.g. `#stem`, `#medical`, `#all`).
3. Student has a pathway (from profile / `study_level` — same truth as identity).
4. Top picks shows items tagged with the student’s pathway tag **or** `#all`.
5. Default / option sort: **by date created** (filter/tune control — “sort by date created” in options).
6. **List length:** real feed can have **more than ~5–6** items. **Card/block size stays fixed** (desktop ~442px); the list **scrolls inside** the card. Sort exists so students can order a long list.
7. **CMS Tag section (separate):** when building backend/CMS, create a dedicated **tag** area (taxonomy) that defines where tags attach (courses, events, etc.) and how feed surfaces resolve them. Do **not** invent ad-hoc string tags without that contract.

**This frontend pass:** fixture rows matching Figma (visual + mobile expand). **No live CMS query yet** — note only.

### Filter / sort (UI)

- Tune icon opens sort options; include **sort by date created** (owner).
- Full filter menu Figma not supplied yet — if missing at implement time: accessible control + “Sort by date created” only, mark richer filters **DEFERRED**.

### Position lock

| Band | Position |
|---|---|
| Mobile ≤600 | **LOCKED** — stacked under identity; collapsed bar → expand (do not move without owner reopen) |
| Desktop >1366 | **LOCKED (placement)** — right of mid-cluster; module design unchanged (owner `owner-desktop-top-picks-beside-cluster.png` + Figma) |
| iPad | Deferred with rest of feed |

---

## Mid-cluster — aspirant pills (backend note)

Fixture UI only today. **When wiring backend / Student Operations**, these pills are **not CMS invent** — they come from staff + profile truth:

| Pill / field (fixture example) | Likely source (owner) |
|---|---|
| `{pathway} Aspirant @ class of {year}` e.g. `MBA Aspirant @ class of 2025` | **Student Operations** (admin) + pathway/class fields |
| Gender label + value (`Gender` / `Male`) | **Student Operations** and/or **profile** |
| Location (`White Town, Pondicherry`) | **Student Operations** and/or **profile** |
| Target countries (`USA`, `UK` + flags) | **Student Operations** (admin-set destinations) and/or profile shortlist |

**Contract reminder:** one student truth — Operations edits the same domains the feed reads. Do not build a second “aspirant pills” table for display only. Map fields in the Student Operations module pass; feed consumes them.

Ref shot: `public/previews/student-feed-qc/aspirant-pills-source.png`

---

## Mid-cluster — purple Notes (backend note) — IMPORTANT

**Preview today:** Premium reads `premium_workspace_profiles.notes_html` via `loadFeedNotesBody`. Empty / missing → fixture `STUDENT_FEED_NOTES_BODY`. Staff edits Ops → Student → Overview → **Feed Notes**. Family A locked feed still fixture until cutover.

### Security (B3)

| Layer | Rule |
|---|---|
| Storage | `notes_html text` ≤ 20k on `premium_workspace_profiles` (RLS unchanged: student SELECT via `can_access_premium_student`, staff UPDATE mentor/privileged) |
| Write | `sanitizeFeedNotesBody` strips tags/scripts; staff-only API `requirePremiumActor(..., "manage")` |
| Read | sanitize again; React **text** children only — **never** `dangerouslySetInnerHTML` |
| Domain split | Not `counselor_notes` |

### What this purple box is (and is not)

| Surface | Role |
|---|---|
| **Feed purple Notes** (Figma Note 9) | Per-student dashboard note text shown on `#feed` |
| **Admin Dash CMS `notes_html`** | Staff edit that feed note (junior/original already built) |
| **`counselor_notes`** | **Different domain** — mentor notes on `/feed_track_progress` with `staff_only` / `student_visible`. Do **not** merge into the purple feed Notes box without an owner decision |

### Original backend — REUSE, do not rebuild from scratch

When wiring Notes (and the rest of mid-cluster content that already had admin editors):

1. **FIND** what already exists in original / junior / Hostinger / current V3 for this field.
2. **REFERENCE + ADAPT** that contract onto certified V3 security (RLS, permissions, one student truth).
3. **Do not invent** a second Notes CMS, a new table, or a parallel editor “because feed is modular.”

**Proven original path (junior `.ref/pgs_app` + legacy admin):**

| Piece | Where |
|---|---|
| Staff editor | Dash CMS — Notes section → `notes_html` (`.ref/.../dash-cms/DashEditForm.tsx`) |
| Student render | Dashboard feed Notes box → `html={dash.notes_html}` (`.ref/.../dashboard/DashboardPage.tsx`) |
| Storage shape | Per-student `dashboard_content` JSON (incl. `notes_html`, aspirant, overview toggles, etc.) via dash-cms actions / `dashboard-content-server.ts` |
| Legacy PHP cousins | `Users/manage_premium_dashboard`, `Users/save_premium_dashboard`, `premium_dashboard_data` |
| V3 north star nearby | `premium_workspace_profiles` / premium workspace maps — **ADAPT** onto existing contracts; confirm exact column vs JSON with owner before migrate |

**Same reuse rule for neighbors already in that Dash CMS:** Quick Dashboard overview flags, aspirant card fields, comments fixtures, upcoming events picks — scout original dash-cms + legacy `manage_premium_dashboard` first.

**Owner rule (locked for feed backend passes):** if backend already exists in original → reference and copy/adapt it. Building Notes (or dash mid-cluster) from scratch is a failure mode unless the owner explicitly says invent.

---

## Section 5 — Unlock pitch + Help Hub CTA

Two different blocks (do not conflate):

| Block | Module | Desktop Figma | Notes |
|---|---|---|---|
| **NO / YES unlock pitch** | `student-feed-unlock-pitch` | `18375:11060` | Locked-only; mobile stacked from desktop |
| **#helpHub CTA** | `student-feed-help-hub` | `18375:11127` | “Is PurplePremium… / #helpHub / Book Your Appointment” · ~303px card |
| Empty rect | — | `18375:10686` | **Not** Help Hub — selection/placeholder only |

| Band | Help Hub CTA |
|---|---|
| Desktop >1366 | Stroked frame `18375:10686` (478×509, 2px black) · content `18375:11127` inside |
| Mobile ≤600 | Same frame + content; **70% of desktop sizes** (typed values, not `transform: scale`) |
| Book button | Present; **destination DEFERRED** (popup / Zoho) |

QC: `figma-help-hub-cta-desktop-18375-11127.png` · unlock refs `figma-help-hub-desktop-18375-11060.png`

---

## Section 6 — Where You Stand (phased — STOP before Comments)

**Status:** full one-shot build **REVERTED** (2026-09-06). Rebuild in phases below.

**Lock rule (owner):** use Figma **`forlocked`** — real underlying UI stays visible; lock treatment sits **on top** (same idea as Quick Dashboard locked rim/overlay). Do **not** invent a different lock system.

| Phase | Scope | Desktop | Mobile | Gate |
|---|---|---|---|---|
| **6A** | Header only (title + intro) | `18375:10897` | `206:6778` | **DONE** |
| **6B** | Prep top — % + Onboarding Checklist + June feedback + **forlocked** | `18375:10903` | `206:6781` | **LOCKED** |

**6B notes**
- Gray Prep panel = Figma `Rectangle 104` / `--forlocked` fill; real checklist UI underneath.
- Locked: frosted overlay `rgba(255,255,255,0.55)` + centered lock (QD pattern). Unlocked: same UI, no lock (`?premium=1`).
- Fixture: `14%` · Profile Setup Complete **on** · rest off · June row off.
- Mobile: `%` \| checklist on row 1 · feedback full-width row 2 (`206:6781`).
- QC: `wys-6b-locked-desktop-1440.png` · `wys-6b-locked-mobile-390.png` · `wys-6b-premium-*` · Figma refs `figma-wys-6b-prep-top-desktop-18375-10903.png` · `figma-wys-6b-prep-mobile-206-6781.png`

| **6C** | Prep Status — Documents Tracker + Uni Shortlist (+ Prep Status label) | `18375:10922` | `206:6817` | **LOCKED** |

**6C notes**
- Same gray Prep panel + one `forlocked` covering 6B+6C.
- Rows = digit pair + label — not switches. Digits **black**; **Pending Documents*** digits **red** (`#eb0801`).
- Fixture: SOP `1`/`0` · other docs `0`/`3` · shortlist USA Stream Choice 1 & 3 `0`/`3`.
- Mobile: June feedback left edge aligns with Documents Tracker (shared 90px left rail).

| **6D** | Finalized Uni List (count + cards) | `18375:10956` | `206:6878` | **LOCKED** |

**6D notes**
- Black panel below Prep (not inside gray Prep). Own `forlocked` on top of real cards.
- Locked overlay = Figma light-grey fillColor `rgba(232, 234, 234, 0.7)` — do not invent alternate dims.
- Fixture: `06` + 7× “Univ of washington” / `#USA` / campus image.
- Desktop 3-col grid · Mobile 2-col beside label.
- Assets: `wys-uni-campus.png` · `wys-plus.svg`

| **6E** | Currently Working On + Future task preview | `18375:10941` | `206:6951` | **LOCKED** |

**6E notes**
- Grey panel (`forlocked` fill) under Finalized. Own lock overlay when locked (white frost on grey — same as Prep; not an invented dim).
- Fixture from desktop Figma: Working row1 **URGENT**; Future row2 **IMP**; teal `preview` on Future heading.

### Section 7 — Comments (v2)

| Phase | Scope | Desktop | Mobile | Gate |
|---|---|---|---|---|
| **7** | Comments (no upvotes) + intro/status + **forlocked** | `18796:11932` (+ `17961:10947`) | `1029:7535` (+ `206:6175`) | **IN QC** |

**Comments notes**
- **This phase:** signed-in Yet to Unlock only — real UI underneath + `--forlocked` wash `rgba(232,234,234,0.7)` + gradient rim + centered lock. Intro + Status stay outside the lock.
- **No upvotes** — text threads only (fixture: Admin → Jane Doe). Composer: placeholder + B/I/s/smile toolbar + Comment (non-functional fixture).
- **Premium unlocked Comments** = later phase (`?premium=1` / entitlement) — not this pass.
- Backend later: one comments domain — reuse, do not invent.
- QC: `figma-comments-LOCKED-desktop-crop.png` · `figma-comments-LOCKED-mobile-crop.png` · `figma-comments-v2-*`

### Section 8 — Upcoming Events

| Phase | Scope | Desktop | Mobile | Gate |
|---|---|---|---|---|
| **8.1** | Fixture UI — calendar + 3 chips + `+4 more` | `17961:10810` | `206:6244` | **LOCKED** |
| **8.2A** | Site-wide published `events` → feed (`listFeedUpcomingEvents`) | — | — | **DONE** (fixture fallback if empty) |
| **8.2B** | Per-student Dash CMS pin list (`upcoming_events`) | — | — | **BACKLOG** (backend/CMS wiring) |
| — | Full calendar page (all by date) | — | — | **DEFERRED** (no Figma) |

**Upcoming Events notes**
- UI LOCKED. No forlocked on Figma locked-feed artboard.
- **2A:** preview loads published `events` via `listFeedUpcomingEvents()`; CHIP_LIMIT=3; empty DB → Figma fixture.
- **2B (backlog):** per-student pin list (event|course|custom) — Junior Dash CMS; needs dashboard content in V3.
- Full “all courses/events by date” calendar page = separate Figma + GO AHEAD.
- QC refs: `figma-upcoming-events-desktop-17961-10810.png` · `figma-upcoming-events-mobile-206-6244.png`

---

## Backend / CMS wiring backlog (owner-tracked)

**FREEZE on this feed page:** no more CMS / table wiring here until owner reopens a backlog ID. Continue UI (Premium unlocked body next).

Do **not** invent. Reuse Junior / existing contracts when each item opens.

| # | Item | Source / truth | Status |
|---|---|---|---|
| B1 | Top picks ↔ CMS pathway tags + **CMS Tag taxonomy** section | Catalog tags → feed | **PENDING** |
| B2 | Aspirant pills from Student Operations + profile | Ops / profile — not CMS invent | **PENDING** |
| B3 | Purple Notes from Dash CMS `notes_html` / dashboard content | Junior dash-cms → V3 `premium_workspace_profiles.notes_html` | **WIRED (Premium preview + Ops)** — plain text; empty → fixture; staff Ops workspace |
| B4 | Quick Dashboard overview flags from Dash CMS / workspace | Junior overview → V3 `premium_workspace_profiles` | **WIRED (Premium preview)** — empty default `00`/off; staff edit Ops workspace |
| B5 | Where You Stand from dash CMS / workspace truth | Junior + V3 workspace | **DEFERRED** — owner: clean CMS pass later (tables/logins); do not wire mid–UI flow |
| B6 | Comments from **one** comments domain | RB-05 / comments truth | **PENDING** |
| B7 | Upcoming Events **site-wide** `events` | `listFeedUpcomingEvents` | **DONE (2A)** — freeze further CMS |
| B8 | Upcoming Events **per-student pin list** (Dash CMS `upcoming_events`: event \| course \| custom) | Junior dash-cms; needs V3 dashboard content | **PENDING** |
| B9 | Help Hub CTA → popup / Zoho | Product link | **PENDING** |
| B10 | Premium unlocked feed body (Family B multi-pass) | `/preview/student-feed-premium` · Figma `17041:10191` / `206:6666` | **LOCKED (desktop + mobile UI)** — **READY TO PORT** |
| B11 | Full calendar page (all by date) | Needs Figma | **PENDING** |
| B12 | Universities-as-calendar-items | Not in Junior kinds — owner invent if wanted | **PENDING** (decision) |
| B13 | Live `/student/dashboard` cutover | After Family B lock | **DONE** — all three states purified · aesthetic pass deferred · CMS/Ops + iPad deferred |
| B14 | Event card click → event/booking URL | CMS destinations | **PENDING** |

---

## Phase — Premium unlocked body (Family B — multi-pass)

Preview: `/preview/student-feed-premium`  
Figma: desktop [`17041:10191`](https://www.figma.com/design/7WFrAbx3cvXReZxtTiQ76r/all-pages-v6?node-id=17041-10191) · mobile [`206:6666`](https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/cas-v6---mobile?node-id=206-6666)

### Lock status (owner 2026-09-07)

| Item | Status |
|---|---|
| **Family B UI (desktop >1366 + mobile ≤600)** | **LOCKED** — do not reopen blocks without owner name |
| **Live Hostinger cutover** | **DONE** (Steps 1–3) — aesthetic issues = later single pass · CMS/Ops + iPad deferred |
| **CMS / Ops student wiring** | **DEFERRED** — backlog B1–B2, B5–B6, B8–B9, B11–B12, B14 (Notes B3 + QD B4 already wired where noted) |
| **iPad 601–1366** | **DEFERRED** — separate UI pass |

### Architecture

| Family | Preview | Body |
|---|---|---|
| **A — Locked** | `/preview/student-feed` · `/preview/student-feed-anonymous` | Shared standard locked body. Anonymous = placebo identity only. `forlocked`, Unlock, Help Hub. |
| **B — Premium** | `/preview/student-feed-premium` | **LOCKED** shell `premium/student-feed-premium-shell.tsx`. |

Chrome / tokens / assets may be reused; Premium may add its own assets under `public/assets/img/figma-feed/` later.

### Multi-pass gate (ONE block per pass) — COMPLETE

| Pass | Scope | Gate |
|---|---|---|
| **1** | Identity `#PURPLEPREMIUM` only | **LOCKED** |
| **2** | Quick Dashboard (unlocked) only | **LOCKED** |
| **3** | Notes only | **LOCKED** |
| **4** | Aspirant + actions (mid-cluster position from Family A) | **LOCKED** |
| **5** | Top picks (mid-band position from Family A) | **LOCKED** |
| **6** | Where You Stand unlocked (6A–6E, no forlocked) | **LOCKED** |
| **7** | Comments unlocked (no forlocked) | **LOCKED** |
| **8** | Upcoming Events (Family A LOCKED UI + 2A) | **LOCKED** |

No further Premium UI passes on this preview until owner reopens.

### Port gate (do not run until owner GO AHEAD)

When cutover opens: entitled Premium students get this modular body on live `/student/dashboard` (replace Hostinger feed body only). Family A locked / anon / non-Premium stay on their path until separately approved.

### Still deferred (not blockers for UI lock)

- CMS table wiring (remaining backlog rows)
- Live Hostinger cutover implementation
- iPad
- Merging preview routes into one `premiumActive` toggle (optional later)

QC: `figma-premium-desktop-17041-10191.png` · `figma-premium-mobile-206-6666.png`

QC ref: `public/previews/student-feed-qc/figma-where-you-stand-desktop-18375-10896.png`

---

## How we work

1. **Propose → GO AHEAD → implement → Preview QC**
2. Fill **one Figma section at a time** into an existing slot (desktop + mobile)
3. Do **not** edit locked chrome files unless owner reopens by name
4. Hostinger CSS = reference only — never design authority
5. **iPad** = separate pass after desktop + mobile complete
6. Live Hostinger cutover = separate owner-approved step

Skills (this branch): `.cursor/skills/pgs-master-workflow`, `pgs-modular-public-chrome`, `pgs-propose-before-code`, `pgs-no-touch-unapproved-ui`, `pgs-never-invent`, `pgs-scout-what-why-how`, `pgs-public-move-out`, `pgs-owner-teach-map`

---

## Deferred (UI / cutover — not the CMS backlog table above)

- **iPad** mid-band Figma + QC (after desktop + mobile — owner deferred)
- Identity mobile full-card 1.2× (optional reopen)
- Top picks richer filter menu beyond sort-by-created
- Mid-cluster action arrow Figma position (owner DevTools / later pass)
- **Live Hostinger cutover** — Family B marked **READY TO PORT**; wait for explicit cutover GO AHEAD (B13)
- Remaining **CMS / Ops** backlog rows (B1–B2, B5–B6, B8–B9, B11–B12, B14)
