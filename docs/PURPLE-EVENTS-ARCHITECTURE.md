# Purple Events / Courses — architecture (R0 read pass)

Living map. Update at **phase ends**, not every pixel tweak.

**Owner locks (2026-09-16 · template model 2026-09-17):**

1. Detail bodies are **named templates**, not “one page type forever.” Staff create an **event or course** and pick a template: **`lite`** (current modular body) · **`courses`** (programsfull — next) · **future templates** owner adds later.
2. Current Figma `#purpleEVENTS` body = template **`lite`** lab at [/preview/purpleevents-lite](/preview/purpleevents-lite). QC felt “meh” as the only event look — **Courses** template is the richer next body; either catalog type can use Lite or Courses.
3. **Face cards** — product contract locked 2026-09-20: one `face_layout` per row → one desk+mob pair; tags + badge chips; Learn More → detail. UI: **all face chrome LOCKED** — listing pairs 1–6 + Pair 9 `program_compact_sm` + Pair 10 `program_compact_sm_desk` + Pair 7 `calendar_session` + Pair 11 `calendar_session_photo` (calendar surfaces). Heart save + B\* wiring later.
4. **Backend** = read + link only now. Later = **rebuild from scratch** — living Kanban [`docs/CATALOG-B-STAR.md`](./CATALOG-B-STAR.md). Template + face_layout are catalog fields at rebuild time.
5. **Junior** (`.ref/pgs_app`) = **read-only**. Incomplete. Not a port target. Not product authority.
6. Chrome stays **LOCKED** for Events/Courses body work. Bodies = modular owned CSS (same pattern as USMLE / About).
7. **React chrome shell pass (Option B)** — **PARKED** until **after Events and Countries**. Today chrome stays shared HTML + modular CSS + `dangerouslySetInnerHTML`. Later: one-time mount swap per page → `<PublicHeader />` / `<PublicFooter />`, then edits to those components reflect everywhere. Not part of E0–E* or country body gates.

---

## Global build order (locked)

```text
R0   Architecture read pass + living MD          ← DONE
F-L  Lite template (was T5 / #purpleEVENTS)      ← E0–E13 mounted · lab purpleevents-lite
F-C  Courses template (programsfull) — fixtures  ← C0–C13 mounted · many READY — owner QC
F-F  Face cards (T6) desk + mob — fixtures       ← **DONE UI** · pairs 1–7 + 9 + 10 locked · heart save + B* later
…    Countries body work (owner track — separate)
CHROME-B  React header/footer remount (PARKED — after Events + Countries)
B*   Backend rebuild from scratch (new gates)    ← see docs/CATALOG-B-STAR.md
     └─ after faces: temp listing rails (fixtures) → then Bn schema
```

No silent jump. Each letter needs `GO AHEAD …`.

### Detail templates (catalog choice — events OR courses)

| Template id | Lab | Status | Notes |
|---|---|---|---|
| **`lite`** | [/preview/purpleevents-lite](/preview/purpleevents-lite) | Body mounted E0–E13 | Current `#purpleEVENTS` modular body. Old `/preview/purpleevents-session` → redirects here. |
| **`courses`** | [/preview/programs-courses](/preview/programs-courses) | **C0 DONE** — empty shell | `# programs full` draft — desk `17071:15293` · mob `551:9015`. |
| **future…** | TBD | — | Owner may **duplicate** a template in Figma, add features, register a **new template id** (e.g. `courses_v2`). Backend picker lists all ids — events OR courses may choose any. |

**Versioning rule (owner 2026-09-17):** `courses` = this draft. A later Figma duplicate with more features ≠ overwrite `courses` silently — it becomes a **new** `detail_template` value staff can select. Same for Lite forks.

**How forks get into the picker — B\* only (not during F-C frontend):**

```text
TODAY (frontend fixtures)
  Build each template body as its own React shell + lab
  (lite lab, courses lab, later courses_v2 lab…)
  No DB. No staff picker UI yet.

LATER (B* backend rebuild)
  1. Catalog row has detail_template text/enum
  2. Registry table or code map:
       lite        → PurpleEvents / Lite shell
       courses     → Courses shell (this Figma draft)
       courses_v2  → new shell (Figma duplicate + features)
  3. Staff create/edit event OR course → dropdown lists registered ids
  4. Public detail URL loads row → mounts shell for that id
```

Adding a fork later = (a) build new frontend template lab/gates from new Figma · (b) register id in B\* picker map · (c) staff can choose it. Step (b)+(c) are **backend pass** — do not invent CMS/picker during C0–C11.

Staff pick template per **event or course** row — not “events only use lite / courses only use courses.”

---

## Tech stack + flowcharts (owner lock 2026-09-17)

How this was built, and how it will work when staff publish.

### Tech (what each layer is)

| Layer | Today (fixtures / preview) | Later (B* rebuild) |
|---|---|---|
| **Catalog entity** | Fixture object in `content.ts` / face fixtures | One DB row: **event** or **course** (same picker fields) |
| **`detail_template`** | Hard-mounted shell (`lite` lab only) | Column / enum: `lite` \| `courses` \| … |
| **Template body** | React modular sections + owned CSS under `src/features/purple-events/` (Lite); Courses = new feature folder when F-C opens | Same React bodies; route resolves template → mounts that shell |
| **Preview lab** | `/preview/purpleevents-lite` (redirect from old session lab) | Keep labs for QC; live routes use published row |
| **Live public route** | Legacy HTML until cutover (`/purpleevents/session/:id`, `/programsfull/program/:id`) | One detail renderer: load row → pick template component → fill slots |
| **Chrome** | Shared header/footer HTML + locked CSS via `LegacyPage` | Still shared; React remount parked (CHROME-B) |
| **Face cards** | `/preview/purpleevents-face` + E8 rail fixtures | Same card components; placement driven by catalog |
| **CMS / staff create** | Not wired | Create event/course → choose template + face + tags |

**Lite body stack (already built):** Next.js App Router · React · TypeScript · owned CSS per block · fixtures only · no Supabase body reads yet.

**Build method (every template):** Figma desk+mob → block inventory → `GO AHEAD` one gate → mount on preview lab → owner QC → LOCK → next block. Never invent copy/layout from another template.

### Flowchart A — Staff publish (target product)

```text
                    ┌─────────────────────┐
                    │ Create catalog row  │
                    │  EVENT  or  COURSE  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Pick detail_template│
                    │  lite | courses | … │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
        ┌──────────┐    ┌───────────┐    ┌────────────┐
        │  lite    │    │  courses  │    │  future_*  │
        │ body     │    │ body      │    │ body       │
        └────┬─────┘    └─────┬─────┘    └─────┬──────┘
             │                │                │
             └────────────────┼────────────────┘
                              ▼
                    ┌─────────────────────┐
                    │ Also pick face card │
                    │ + tags (+ heart)    │
                    └──────────┬──────────┘
                               ▼
                    ┌─────────────────────┐
                    │ Publish → public URL│
                    │ renders THAT body   │
                    └─────────────────────┘
```

**Rule:** template is **not** tied to entity type. An event can use `courses`; a course can use `lite`.

### Flowchart B — Runtime render (target)

```text
  Visitor hits detail URL
            │
            ▼
  Load catalog row (id/slug)
            │
            ▼
  read detail_template ──── unknown / missing ──► fail closed / safe fallback
            │
                    ├── lite     → <PurpleEventsPreviewShell />  (Lite modular body)
                    ├── courses  → <CoursesTemplateShell />      (F-C — C0+ when approved)
                    └── future_* → <ThatTemplateShell />         (Figma duplicate + new id)
            │
            ▼
  Fill body slots from row fields (fixtures today → DB later)
            │
            ▼
  Wrap with shared chrome (header / footer / strip)
```

### Flowchart C — How we built Lite (engineering flow)

```text
  R0 architecture MD
        │
        ▼
  E0 empty shell on preview lab
        │
        ▼
  E1 → E13 block gates (propose → GO AHEAD → code → QC)
        │     each block = TSX + owned CSS + fixtures
        │
        ▼
  Rename lab → /preview/purpleevents-lite
  (old /preview/purpleevents-session redirects)
        │
        ▼
  F-C Courses template  ← NEXT (needs Figma desk+mob)
        │
        ▼
  B* backend: real rows + detail_template picker
```

### File map (Lite today)

| Role | Path |
|---|---|
| Preview lab | `src/app/preview/purpleevents-lite/page.tsx` |
| Old lab redirect | `src/app/preview/purpleevents-session/page.tsx` → lite |
| Body shell | `src/features/purple-events/purple-events-preview-shell.tsx` (`data-detail-template="lite"`) |
| Block modules | `src/features/purple-events/*.tsx` + `upcoming/`, `face-card/` |
| Fixtures | `src/features/purple-events/content.ts`, `*-content.ts` |
| Living map | `docs/PURPLE-EVENTS-ARCHITECTURE.md` (this file) |

---

## Product contract (target — future backend rebuild)

```text
ONE catalog row (event OR course)
        │
        ├── detail_template   → lite | courses | … (events OR courses may use any)
        ├── face_layout       → one FaceLayoutId → desk+mob pair (see Face cards T6)
        ├── tags              → one tag system (join to catalog tags)
        ├── badge / urgency   → admin override OR backend auto-rule
        └── heart / saved     → logged-in standard|premium → /saved (B6 for events)
```

| Concept | Meaning |
|---|---|
| **Detail template** | Named full-page body (`lite`, `courses`, …). Staff pick when creating an **event or course**. Duplicate = create row from defaults, not copy HTML files. |
| **Face layout** | Listing / board / saved presentation. **One** layout id per row; desk+mob are the same layout. Populates purpleboard, CV Ready, feed, saved, etc. Inventory in `face-layouts.ts`. |
| **Tags** | Shared vocabulary on the entity (and shown on faces). One backend tag truth at rebuild time. |
| **Badge** | Filling Fast / seats chip — not a face type. |
| **Heart** | Anon → login. Standard/Premium → save/unsave → `/saved`. |

Frontend phases use **fixtures** shaped like this contract. Backend rebuild later plugs real data into the same slots.

---

## Figma authority — Lite template (`lite`)

| Band | Frame | Node | File |
|---|---|---|---|
| Desktop | `#purpleEVENTS` | `17071:11752` | [all-pages-v6](https://www.figma.com/design/7WFrAbx3cvXReZxtTiQ76r/all-pages-v6?node-id=17071-11752) |
| Mobile | `#purpleEVENTS` | `524:8535` | [cas-v6---mobile](https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/cas-v6---mobile?node-id=524-8535) |

Chrome / Hello / left rail in the frames = **shell**, not body work.

### Shared chrome (not body) — owner lock 2026-09-16

| Today | Later (PARKED) |
|---|---|
| Modular chrome = shared HTML header/footer + locked CSS. Mounted with `LegacyPage` + `dangerouslySetInnerHTML` on every modular public page (About, Scholarship, Events lab, …). | React remount: `<PublicHeader />` / `<PublicFooter />` same DOM, drop string inject. |
| CSS/layout chrome fixes → all modular pages. | React chrome wins for **login UI, new menus, auth states, a11y** (structure + interaction). |
| `LegacyPage` ≠ Hostinger body. Preview Events body is React. | Do **not** open during Events/Countries body gates. Reopen chrome by name after those bodies. |

Skill: `.cursor/skills/pgs-master-workflow/SKILL.md` (Modular chrome vs React chrome).

### Event body — block-by-block gates + links

**Lab (all blocks):** [/preview/purpleevents-lite](/preview/purpleevents-lite)  
**Live (untouched until cutover):** [/purpleevents/session/:id](/purpleevents/session/10)  
**Figma desk:** [all-pages-v6 `#purpleEVENTS`](https://www.figma.com/design/7WFrAbx3cvXReZxtTiQ76r/all-pages-v6?node-id=17071-11752)  
**Figma mob:** [cas-v6-mobile `#purpleEVENTS`](https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/cas-v6---mobile?node-id=524-8535)

One preview URL for the whole template. After each gate, scroll to the section (`#pe-eN`). Say `GO AHEAD E#` one block at a time.

| Gate | Block | Preview anchor | Desk Figma | Mob Figma | Status |
|---|---|---|---|---|---|
| **E0** | Empty shell | [/preview/purpleevents-lite](/preview/purpleevents-lite) | full frame | full frame | **DONE** |
| **E1** | Invite / hero | [#pe-e1](/preview/purpleevents-lite#pe-e1) | [`invite` 17071:12186](https://www.figma.com/design/7WFrAbx3cvXReZxtTiQ76r/all-pages-v6?node-id=17071-12186) | Content [`551:9013`](https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/cas-v6---mobile?node-id=551-9013) · grey plate [`551:9014`](https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/cas-v6---mobile?node-id=551-9014) · page [`524:8535`](https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/cas-v6---mobile?node-id=524-8535) | **DONE** |
| **E2** | *(merged into E1)* | — | — | — | **MERGED → E1** |
| **E3** | Who / topics green blocks | [#pe-e3](/preview/purpleevents-lite#pe-e3) | [1000006713](https://www.figma.com/design/7WFrAbx3cvXReZxtTiQ76r/all-pages-v6?node-id=17071-12273) | [1000006927](https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/cas-v6---mobile?node-id=528-7261) | **DONE** |
| **E4** | What we’ll cover | [#pe-e4](/preview/purpleevents-lite#pe-e4) | [`17071:12028`](https://www.figma.com/design/7WFrAbx3cvXReZxtTiQ76r/all-pages-v6?node-id=17071-12028) | [528:7370](https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/cas-v6---mobile?node-id=528-7370) | **DONE** |
| **E5** | Session perks | [#pe-e5](/preview/purpleevents-lite#pe-e5) | [`17072:10998`](https://www.figma.com/design/7WFrAbx3cvXReZxtTiQ76r/all-pages-v6?node-id=17072-10998) | [528:7682](https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/cas-v6---mobile?node-id=528-7682) | **DONE** |
| **E6** | Meet your facilitators | [#pe-e6](/preview/purpleevents-lite#pe-e6) | [Meet… 17071:12326](https://www.figma.com/design/7WFrAbx3cvXReZxtTiQ76r/all-pages-v6?node-id=17071-12326) | [528:7692](https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/cas-v6---mobile?node-id=528-7692) | **DONE** |
| **E7** | Sticky / trac widgets | [#pe-e7](/preview/purpleevents-lite#pe-e7) | [1000006719](https://www.figma.com/design/7WFrAbx3cvXReZxtTiQ76r/all-pages-v6?node-id=17071-12377) | sticky [`528:7767`](https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/cas-v6---mobile?node-id=528-7767) · trac [`528:7817`](https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/cas-v6---mobile?node-id=528-7817) | **READY — owner QC** |
| **E8** | Upcoming sessions rail | [#pe-e8](/preview/purpleevents-lite#pe-e8) | [`17071:13481`](https://www.figma.com/design/7WFrAbx3cvXReZxtTiQ76r/all-pages-v6?node-id=17071-13481) | [`1248:7623`](https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/cas-v6---mobile?node-id=1248-7623) | **LOCKED** — owner QC desk+mob 2026-09-17 |
| **E9** | Share poster | [#pe-e9](/preview/purpleevents-lite#pe-e9) | plate [`17071:14067`](https://www.figma.com/design/7WFrAbx3cvXReZxtTiQ76r/all-pages-v6?node-id=17071-14067) · section [`17071:14062`](https://www.figma.com/design/7WFrAbx3cvXReZxtTiQ76r/all-pages-v6?node-id=17071-14062) | [`551:7711`](https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/cas-v6---mobile?node-id=551-7711) | **LOCKED** — flat Figma PNG plates |
| **E10** | #higlights | [#pe-e10](/preview/purpleevents-lite#pe-e10) | [`17071:14467`](https://www.figma.com/design/7WFrAbx3cvXReZxtTiQ76r/all-pages-v6?node-id=17071-14467) | [`551:8135`](https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/cas-v6---mobile?node-id=551-8135) | **READY — owner QC** · shared `PremiumHighlights` |
| **E11** | Testimonials | [#pe-e11](/preview/purpleevents-lite#pe-e11) | [`17071:14485`](https://www.figma.com/design/7WFrAbx3cvXReZxtTiQ76r/all-pages-v6?node-id=17071-14485) | [551:8249](https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/cas-v6---mobile?node-id=551-8249) | **LOCKED** — height-stable carousel · 3 pics · mob polish deferred |
| **E12** | Outro CTA | [#pe-e12](/preview/purpleevents-lite#pe-e12) | [outro cta 17120:10445](https://www.figma.com/design/7WFrAbx3cvXReZxtTiQ76r/all-pages-v6?node-id=17120-10445) | [551:8155](https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/cas-v6---mobile?node-id=551-8155) | **LOCKED** · shared `OutroCta` |
| **E13** | FAQ | [#pe-e13](/preview/purpleevents-lite#pe-e13) | [`17071:14507`](https://www.figma.com/design/7WFrAbx3cvXReZxtTiQ76r/all-pages-v6?node-id=17071-14507) | [551:8162](https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/cas-v6---mobile?node-id=551-8162) | **READY — owner QC** · tabs + accordion · Figma-visible only |

**Not the template body:** site header, footer, left menu, urgent blue bar — locked chrome.

### Course template (T4) → template id **`courses`**

| Status | Note |
|---|---|
| **Figma locked 2026-09-17** | Draft body for programsfull / Course detail |
| Desk | [`# programs full` 17071:15293](https://www.figma.com/design/7WFrAbx3cvXReZxtTiQ76r/all-pages-v6?node-id=17071-15293) |
| Mob | [`#programs full` 551:9015](https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/cas-v6---mobile?node-id=551-9015) |
| Lab URL | [/preview/programs-courses](/preview/programs-courses) |
| Used by | Events **or** courses rows that pick `detail_template = courses` |
| Future forks | Duplicate Figma + new features → new template id (do not silently replace `courses`) |
| Live today | `/programsfull/program/:id` still legacy; not authority for the new template |
| Junior | `.ref/pgs_app/.../programsfull/CourseDetailPage.tsx` read-only scout only |

#### Courses body — proposed block gates (C#)

Chrome / Hello / left rail / urgent bar = **shell**, not body. One lab URL; `GO AHEAD C#` one block at a time.

| Gate | Block (from Figma labels) | Desk anchor | Status |
|---|---|---|---|
| **C0** | Empty shell + fixtures skeleton | full frame | **DONE** |
| **C1** | Program hero (photo, Filling Fast, Type/Duration, title, dates, Book, tags, place) | `17072:10543` program | **READY — owner QC** desk+mob |
| **C2** | Who's It For? + Topics (green chips) | desk `17072:10641` · mob `551:9071` | **READY — owner QC** desk+mob |
| **C3** | Program Description card | desk `17072:10678` · mob `551:10175` | **READY — owner QC** desk+mob |
| **C4** | explore Program Highlights | desk `17072:10698` · mob `551:9095` | **READY — owner QC** desk+mob |
| **C5** | Green chip + check list | desk `17072:10893` · mob `551:9103` | **READY — owner QC** desk+mob |
| **C6** | Brochure / downloadable course copy | desk `17072:11029` · mob `551:10282` | **READY — owner QC** desk+mob |
| **C7a** | Awarding body — intro | desk intro `17072:11065` · mob `551:10336` | **READY — owner QC** desk+mob |
| **C7b** | Awarding body — logo chip + photo | desk `17072:11044`/`11046`/`11050` · mob `551:10339`/`551:10304` | **READY — owner QC** desk+mob |
| **C7c** | Awarding body — fact stack | desk `17072:11052` · mob `551:10351` | **READY — owner QC** desk+mob |
| **C7d** | Awarding body — Rankings card | desk `17072:11068` · mob `551:10365` | **READY — owner QC** desk+mob |
| **C7e** | Awarding body — Accreditation logos | desk `17072:11074` · mob `551:10370` | **READY — owner QC** desk+mob |
| **C8a** | How to Apply — title + Eligibility chips | desk `17072:11085` (frame `17072:11084`) | **READY — owner QC** desk+mob |
| **C8b** | How to Apply — Option 1 + Option 2 | desk `17072:11096` · mob `551:10566` | **READY — owner QC** desk+mob |
| **C9a** | Certificate plate — left copy + checks | desk `17072:11504` (frame `17072:11503`) | **READY — owner QC** desk+mob |
| **C9b** | Certificate card mock | desk `17072:11523` · mob `551:10535` | **READY — owner QC** desk+mob |
| **C9 mob** | Certificate + Why It Matters | mob `551:10515` | **READY — owner QC** |
| **C10** | #higlights (shared `PremiumHighlights`) | desk `17072:11338` · mob `551:9553` | **READY — owner QC** |
| **C11a** | Enrollment Fee — header + price/CTA card | desk `17072:11558` (frame `17072:11555`) | **READY — owner QC** desk+mob |
| **C11b** | course breakdowns + expenses + payment | desk `17072:11577` · mob `551:10600` | **READY — owner QC** desk+mob |
| **C11 mob** | Enrollment Fee stack | mob plate `551:10579` | **READY — owner QC** |
| **C12** | A word from Our learners (shared `LearnerWords`) | desk `17072:11795` · mob `551:10710` | **READY — owner QC** |
| **C13** | FAQ (tabs; Figma-visible only) | desk `17072:11640` · mob `551:9580` | **READY — owner QC** |
| **C14+** | Any remaining Figma bands found in QC | — | Deferred until spotted |

Reuse Lite/shared modules **only** where Figma matches (e.g. highlights, FAQ, outro patterns). Do **not** force Lite invite chrome onto Courses hero.

---

## Face cards (T6) — product contract (locked 2026-09-20)

**Skill:** `.cursor/skills/pgs-face-card-pass/SKILL.md`  
**Preview (all faces):** [/preview/purpleevents-face](/preview/purpleevents-face)  
**Inventory registry:** `src/features/purple-events/face-card/face-layouts.ts`  
**Canonical Figma:** [pgs-facecards](https://www.figma.com/design/reEbIrfkffyoIzXQyVm09z/pgs-facecards?node-id=0-1)  
**B\* living Kanban:** [`docs/CATALOG-B-STAR.md`](./CATALOG-B-STAR.md)

**Fixture bridge (owner 2026-09-21):** face UI pair-by-pair → temp listing rails (CV Ready / programs / saved) → ~5 made-up events + ~5 made-up courses per face for UI fit → later real catalog + flush seeds.

### Product contract (one row → one pair)

```text
ONE catalog row (event OR course)
        │
        ├── detail_template     → lite | courses | …  (full-page body)
        ├── face_layout         → ONE layout id for that row
        │         └── renders as ONE desk+mob pair (same layout, two bands)
        ├── tags[]              → catalog_tags joins (search / sort / differentiate)
        ├── badge / urgency     → admin override OR backend rule (e.g. Filling Fast)
        └── Learn More          → that row's public detail URL (template body)
```

| Rule | Meaning |
|---|---|
| **One pair per row** | Staff pick **one** `face_layout`. Desktop and mobile are the **same** layout at Figma desk/mob sizes — not two separate face picks. |
| **Many layouts in the catalog** | The picker lists available face layouts; each event/course chooses one. |
| **Tags** | Shared `catalog_tags` truth. Shown on faces; used for search/sort/filter. |
| **Filling Fast / seats / closed** | Chip/state on the face — **not** a separate face type. Admin can set; later rules can auto-set. |
| **Learn More** | Always the detail page for that row (`lite` / `courses` / …). Fixtures → preview labs until B\*. |
| **Junior** | Read-only shape only (`.ref/pgs_app`). ADAPT into certified V3 + Figma — never dump. |

### V1 face layout inventory (owner-confirmed 2026-09-20)

ADAPT from junior `components/cards/types.ts` + locked event face. Do **not** invent artboards without Figma nodes.

| Layout id | Status | Desk+mob | Typical use | Notes |
|---|---|---|---|---|
| `cvready` | **LOCKED** | Yes | CV Ready · clinical listings | Pair 1 · `CvreadyFaceCard` |
| `event_session` | **LOCKED** | Yes | Upcoming rail, event listings | Pair 2 · `PurpleEventsFaceCard` |
| `program_full` | **LOCKED** | Desk yes · mob open yes | Purple Board, rich saved | Pair 3 invite tall · mob cas-v6 `91:2908` · closed mob deferred |
| `program_compact` | LOCKED | Yes | Dense saved / grids | Pair 6 · desk `1:2150`/`1:2151` · mob `1:3032`/`1:2992` |
| `program_compact_sm` | LOCKED | Yes | Dense grids · smaller shell | Pair 9 · Pair 6 @ 80% shell, type full · ~243×369 / ~164×250 |
| `program_compact_sm_desk` | LOCKED | Yes | Desk small · phone full Pair 6 | Pair 10 · desk Pair 9 @ 80% · mob Pair 6 · ~243×369 / ~171×260 |
| `calendar_session` | LOCKED | Calendar only | Feed beside calendar · calendar lists | Pair 7 · desk `4:377`/`4:387` · mob `4:305`/`4:364` |
| `calendar_session_photo` | LOCKED | Calendar only | Feed / calendar lists with thumb | Pair 11 · Pair 7 + fixed photo · no Mode · desk `42:290`/`42:311` · mob `42:328`/`42:340` |
| `internship` | **LOCKED** | Yes | Featured / batch listing | Pair 4 · `18:319` / `1:3183` |
| `promo` | Locked | Yes | Urgency / QR / deadline | Pair 5 · desk `1:1067`/`1:1206` · mob `1:2372`/`1:3119` |

### Not face layouts (chips / surfaces)

| Concept | Treatment |
|---|---|
| Filling Fast / fire chip | Badge field + style (admin or auto) |
| Closed / sold out | State on face (`event_session` open\|closed plate already) |
| `card_surfaces` / purpleboard / cvready / usmlerotation | **Where** the row appears — placement flags, not the face artboard. TEMP TS today; B\* finalizes DB |
| Heart | Deferred until named `GO AHEAD` |

Each new layout: same lab · desk→mob pass · full Figma size · no `transform: scale`. See [Face card module](#face-card-module-face--locked-2026-09-17).
---

## Junior read pass (NOT fully built — do not port)

Path: `.ref/pgs_app` (gitignored sparse clone).

| Area | Observation | R0 verdict |
|---|---|---|
| `purpleevents/` | React body + CSS + mock `content.ts` | Useful **shape** of sections; incomplete vs Figma QC |
| `programsfull/CourseDetailPage.tsx` | Course detail React | Same — scout only |
| `components/cards/*` | Program / Promo / Internship / Heart / PillTags | Useful **face vocabulary**; not certified |
| `lib/catalog/card-surfaces.ts` | Surface key lists + match helpers | Idea only — **not** final V3 contract |
| Admin Event/Course visual editors | Canva-style card preview | Incomplete CMS; **leave alone** |
| `user_saved_items` (junior) | Polymorphic course+event saves | Incomplete alternate; **do not adopt** as V3 truth now |
| `tags_text` freeform | Draft convenience | Not tag authority |

**Rule:** quote junior only as “READ / incomplete.” Never copy into live as the system.

---

## Current V3 — TEMP link map (read only; will be rebuilt)

Everything below is **what exists today for linking understanding**. Marked **TEMP**. Backend pass rebuilds from scratch; this map may be replaced, not patched forever.

### Public routes (live today)

| Route | Today | Notes |
|---|---|---|
| `/purpleevents` | Legacy HTML (`PublicLegacyPage` + `legacy/generated/purpleevents`) | Listing / marketing shell — not the new base template |
| `/purpleevents/session/:id` | Legacy HTML + `eventId` | Detail presentation state; not modular Figma body yet |
| `/programsfull/program/:id` | Legacy / catalog detail path | Course detail target for T4 later |
| `/purpleboard`, `/cvreadyprogram` | Listing pages | Face-card consumers · `/cvreadyprogram` modular cutover DONE |
| `/saved` | React saved list | Programs + courses only today |

### Catalog tables (exists)

| Table | Role (TEMP) |
|---|---|
| `events` | Event rows (+ phase7 fields: host, badges, who_is_it_for, session_topics, what_we_cover, …) |
| `event_facilitators` | Child of events |
| `event_categories` | Categories |
| `courses` / `course_categories` | Course catalog |
| `programs` | Program catalog (CV Ready / boards historically) |
| `catalog_tags` | Shared tags |
| `event_tags` / `course_tags` / `program_tags` | Joins |
| `catalog_filter_*` | Filter facets (separate from tags) |

### Saves (exists)

| Table / API | Role (TEMP) |
|---|---|
| `saved_programs` | Student ↔ program |
| `saved_courses` | Student ↔ course |
| `/api/student/saved/[kind]/[id]` | `programs` \| `courses` only |
| `useCardSave` | **Events hard-fail** (`entityType === "event" → false`) |

No `saved_events` in certified migrations. Heart-for-events = future B*.

### Face-surface helper (exists in TS only)

| Path | Role (TEMP) |
|---|---|
| `src/features/admin-cms/lib/card-surfaces.ts` | Key lists + match helpers; used by USMLE course queries |
| DB `card_surfaces` column | **Not** in certified public_site / phase7 migrations as a finished product contract |

Treat as **experimental / incomplete wire**, not the forever design.

### Admin / CMS (exists)

| Path | Role (TEMP) |
|---|---|
| `/admin/catalog` + `[entity]` | CRUD for universities, programs, courses, events, tags |
| `/api/admin/catalog/tag-links` | Attach tags |
| Junior visual CMS | **Do not rebuild** unless owner reopens by name |

### Connection sketch (TEMP — today)

```text
FE legacy purpleevents body
  → (little live DB hydration for modular Figma)
  → events table exists for catalog/admin + some legacy hydration paths

FE /saved
  → saved_programs / saved_courses
  → NO events

FE USMLE explore / picks
  → courses + card_surfaces helper (assumes column; incomplete product)

Staff /admin/catalog/events
  → events (+ facilitators, tags via tag-links)
```

---

## Target data sketch (B* rebuild — not implementing now)

Owner-facing intent only. Exact schema at B* with `GO AHEAD Bn`. Living Kanban: [`docs/CATALOG-B-STAR.md`](./CATALOG-B-STAR.md).

```text
detail_template     on event/course row   → lite | courses | …
face_layout         on event/course row   → one FaceLayoutId (desk+mob pair)
placement surfaces  where row appears     → ADAPT card-surfaces idea (B4)
tags                catalog_tags + joins
badge / urgency     admin override OR server auto-rule
saved_*             hearts for event + course (+ program if kept)
publish             fail closed; unpublished → 404 on public detail
```

Day-1 security themes for B* (preview): session-forced student_id on saves; publish permission on catalog; no IDOR oracle on saved/detail.

---

## Responsive bands (frontend templates)

| Band | Width | Default |
|---|---|---|
| Desktop | **>1366** | Build + QC |
| Mobile | **≤600** | Build + QC |
| iPad | **601–1366** | Recall skill later (`pgs-ipad-hero-body`); not P0 |

Ignore Hostinger 767 for modular bodies. Type floor 16px on final-draft pass, not mid-section scramble.

---

## Two surfaces (event template)

| Surface | URL | What it is |
|---|---|---|
| **Preview (QC lab)** | `/preview/purpleevents-lite` | Locked chrome + modular body. E0–E7 on stage; E8 via E8a–E8e. |
| **Face card lab** | [/preview/purpleevents-face](/preview/purpleevents-face) | **LOCKED** chrome + event face open/closed. Centered. Future faces add rows here. |
| **Live** | `/purpleevents/session/:id` | **Unchanged** — legacy HTML until owner cutover. |

### Face card module (FACE) — **LOCKED 2026-09-17**

**Preview:** [/preview/purpleevents-face](/preview/purpleevents-face)  
**Skill:** `.cursor/skills/pgs-face-card-pass/SKILL.md`

| Piece | Path |
|---|---|
| Card (import me) | `src/features/purple-events/face-card/purple-events-face-card.tsx` |
| CSS | `src/features/purple-events/face-card/purple-events-face-card.css` |
| Fixtures | `src/features/purple-events/face-card/content.ts` |
| Lab (centered stage) | `src/features/purple-events/face-card/purple-events-face-lab.tsx` |
| Preview route | `src/app/preview/purpleevents-face/page.tsx` |

| Band | Layout | Size |
|---|---|---|
| ≤600 | Mob portrait | 176×761 |
| >1367 | Desk side-photo | 383×592 |
| 601–1366 | Deferred | — |

**No `transform: scale`.** Full Figma artboard. Closed plate fill `#C1F177`; wash `#D9D9D9`.

| State | Desk Figma | Mob Figma |
|---|---|---|
| Pair | [`18961:13084`](https://www.figma.com/design/7WFrAbx3cvXReZxtTiQ76r/all-pages-v6?node-id=18961-13084) | [`1242:7585`](https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/cas-v6---mobile?node-id=1242-7585) |
| Open | `18961:12995` | `1242:7586` |
| Closed | `18961:13038` | `1242:7587` |

#### Workflow (repeat for every new face variant)

```
GO AHEAD FACE [<variant>]
  → desk open (one card) → owner QC
  → desk closed → owner QC
  → desk open+closed pair (centered on lab)
  → mobile open+closed → owner QC
  → lock variant · update this MD + skill Figma table
  → next variant mounts on same /preview/purpleevents-face
```

One pass at a time. E8 Upcoming imports `PurpleEventsFaceCard`. Heart / saved deferred.

---

## E8 Upcoming sessions rail — **LOCKED 2026-09-17**

**Replace** the old “two upcoming sessions” compositions (owner screenshots / older Figma two-up and legacy Hostinger twins — including deprecated mob `551:6872`) with the **new** face-card rail below. Do **not** invent a second card layout for this block. Do **not** keep the old two-card markup alongside the new rail.

Owner QC **desk + mob passed** 2026-09-17.

| | |
|---|---|
| **Preview anchor** | [/preview/purpleevents-lite#pe-e8](/preview/purpleevents-lite#pe-e8) |
| **Face import** | `PurpleEventsFaceCard` from `src/features/purple-events/face-card/` |
| **Skill** | `.cursor/skills/pgs-upcoming-sessions/SKILL.md` (+ face pass for card QC) |
| **Desk Figma (NEW)** | [`17071:13481`](https://www.figma.com/design/7WFrAbx3cvXReZxtTiQ76r/all-pages-v6?node-id=17071-13481) — centered heading · left stacked arrows · **3** desk faces (383×592) · gap 43 · frame 1326 |
| **Mob Figma (NEW)** | [`1248:7623`](https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/cas-v6---mobile?node-id=1248-7623) — heading · **2** mob faces (176×761) · bottom arrow pair |

### Product / data contract (UI fixtures only now · B* links DB later)

```text
upcoming_sessions[]  →  map each row → PurpleEventFaceCard props
        │
        ├── NOW = 6 fake UI fixtures (TypeScript only — NO database, NO Supabase)
        ├── visible window Figma = desk 3 · mob 2 (rail peeks / scrolls the rest)
        └── B* later = real event rows + staff choose show N (1, 2, 3, …)
```

| Now (frontend E8) | Later (B* backend) |
|---|---|
| **6 fake events** in `content.ts` / fixture array only | Read published upcoming from catalog (`events` or join) |
| Paint + scroll QC — no API, no RLS | CMS / Ops: “show 1 / 2 / 3 / …” = `limit` / placement |
| Same shape as face card props so B* can plug in | Fail-closed publish; no IDOR on listing |

**Why 6 (not 3):** Desk shows 3 at once — need extras to prove arrow/scroll. Mob shows 2 — same. Three alone = no scroll on desk.

### Composition (Figma → code)

| Band | Heading | Cards in view | Nav | Card size |
|---|---|---|---|---|
| **>1367** | “Upcoming Sessions” | ~3 side-by-side | Left column: prev / next circles (stacked) | Locked desk face 383×592 |
| **≤600** | Same | ~2 side-by-side | Bottom-right: prev / next pair | Locked mob face 176×761 |
| **601–1366** | Deferred (iPad recall later) | — | — | — |

Closed face appears in the rail when that fixture’s `status === "closed"` (desk Figma shows a closed third card).

### E8 phase gates (one `GO AHEAD` each — logic first)

| Gate | What | QC |
|---|---|---|
| **`GO AHEAD E8a`** | **Logic only** — fixture list of **6** face cards (ids, open/closed mix, varied copy/dates where easy); rail module stub + types; mount empty `#pe-e8` shell on session preview; **no** scroll polish / no pixel chase | Array renders N cards; shell visible |
| **`GO AHEAD E8b`** | **Desk rail** — heading, left arrows layout, horizontal track, import face cards at full Figma size | Match [`18961:12017`](https://www.figma.com/design/7WFrAbx3cvXReZxtTiQ76r/all-pages-v6?node-id=18961-12017) |
| **`GO AHEAD E8c`** | **Mob rail** — heading, bottom arrows, horizontal track | Match [`1248:7623`](https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/cas-v6---mobile?node-id=1248-7623) |
| **`GO AHEAD E8d`** | **Interact** — arrow scroll / keyboard; a11y names; `prefers-reduced-motion` | Scroll through all 6 on desk + mob |
| **`GO AHEAD E8e`** | **Lock** — owner Preview QC → mark E8 **DONE** in phase log | Desk + phone |

No silent jump E8a→E8d. Do not reopen face-card internals unless a rail bug proves a card defect (then use `pgs-face-card-pass`).

### Files (target — created from E8a onward)

| Piece | Path |
|---|---|
| Rail module | `src/features/purple-events/upcoming/purple-events-upcoming.tsx` |
| Rail CSS | `src/features/purple-events/upcoming/purple-events-upcoming.css` |
| Fixtures (6) | `src/features/purple-events/upcoming/content.ts` (or extend face `content.ts` with `FACE_CARD_RAIL[]`) |
| Mount | `purple-events-preview-shell.tsx` → `#pe-e8` |

### NOT in E8

- Live cutover of `/purpleevents/session/:id`
- Supabase / CMS “show N” control (document only → B*)
- Heart / save
- New face artboard (reuse locked FACE)
- iPad band polish
- E9+ blocks

---

## Phase log

| Date | Gate | Status | Notes |
|---|---|---|---|
| 2026-09-16 | **R0** | **DONE** | Architecture MD; junior read-only; V3 TEMP link map; order locked: templates → faces → backend rebuild |
| 2026-09-16 | **E0** | **DONE** | Empty preview shell |
| 2026-09-16 | **E1** | **DONE** | Full invite composition (desk+mob); E2 merged; owner QC locked hang/widths |
| 2026-09-16 | **E3** | **DONE** | Who/topics green blocks (desk 2-col · mob stack); a11y chip ≥16px; fixtures only |
| 2026-09-16 | **E4** | **DONE** | Cover 5 items (desk row · mob 2-col wrap); coral atom icon; a11y body ≥16px |
| 2026-09-16 | **E5** | **DONE** | Perks green blurb + 5 checks (desk row · mob stack) |
| 2026-09-16 | **E6** | **DONE** | Facilitators 2-up (desk+mob); italic title word; a11y bio ≥16px |
| 2026-09-16 | **E7** | **READY — owner QC** | Sticky NOTE widget + trac copy + seat-locked footer |
| 2026-09-17 | **FACE** | **LOCKED** | Event face open+closed · desk+mob · centered lab · `#C1F177` closed plate · skill `pgs-face-card-pass` |
| 2026-09-17 | **E8 plan** | **PLANNED** | New Figma desk `18961:12017` · mob `1248:7623` · **6** fixtures · gates E8a→E8e · skill `pgs-upcoming-sessions` |
| 2026-09-17 | **E8a** | **DONE** | 6 UI fixtures (no DB) · `#pe-e8` stub mounts face cards |
| 2026-09-17 | **E8b–c** | **DONE** | Highlights-style track · scrollbar hidden · desk `17071:13481` · mob `1248:7623` |
| 2026-09-17 | **E8** | **LOCKED** | Owner QC desk + mob passed · next E9 Share poster |
| 2026-09-17 | **E9** | **LOCKED** | Flat Figma plate exports desk `17071:14067` · mob `551:7711` (arrow owner-fix) |
| 2026-09-17 | **E10** | **READY — owner QC** | `#higlights` via shared `PremiumHighlights` · desk `17071:14467` · mob `551:8135` |
| 2026-09-17 | **E11** | **LOCKED** | Testimonials · height-stable quote stack · 3 fixture pics · desk `17071:14485` · mob polish deferred |
| 2026-09-17 | **E12** | **LOCKED** | Outro CTA via shared `OutroCta` · desk `17120:10445` · mob `551:8155` |
| 2026-09-17 | **E13** | **READY — owner QC** | FAQ tabs+accordion · desk `17071:14507` · mob `551:8162` · Programme Details only · Learning/Refund empty |
| 2026-09-17 | **Lite rename** | **DONE** | Lab → `/preview/purpleevents-lite` · old session preview redirects · templates = `lite` \| `courses` \| future (events OR courses pick) |
| 2026-09-17 | **Tech + flow MD** | **DONE** | Architecture MD: tech stack table + publish / render / build flowcharts + Lite file map |
| 2026-09-17 | **F-C Figma** | **LOCKED** | Courses draft desk `17071:15293` · mob `551:9015` · gates C0–C11 proposed · lab `/preview/programs-courses` · forks = new template ids |
| 2026-09-17 | **C0** | **DONE** | Empty Courses shell + fixture skeleton · `/preview/programs-courses` · `data-detail-template=courses` · next C1 hero |
| 2026-09-17 | **C1** | **READY — owner QC** | Desk `17072:10543` + mob `551:9021` · partner hang · title z above pic · shell pull = toggle height · Book visual-only |
| 2026-09-17 | **C2** | **READY — owner QC** | Desk `17072:10641` · Mob chips `551:9071` (linear after hero; Session Topics / session copy). Program Description card `551:10175` = next band |
| 2026-09-17 | **C3** | **READY — owner QC** | Desk `17072:10678` · Mob card `551:10175` (stacked · centered · one-line title) |
| 2026-09-17 | **C4** | **READY — owner QC** | Desk `17072:10698` · Mob 2×2 `551:9095` (left body · centered section) |
| 2026-09-17 | **C5** | **READY — owner QC** | Desk chip+checks `17072:10893` · Mob `551:9103` (different check lines · purple chip border) |
| 2026-09-17 | **C6** | **READY — owner QC** | Brochure desk `17072:11029` · mob stacked `551:10282` · Download fixture URL empty |
| 2026-09-17 | **C7a** | **READY — owner QC** | Intro only `17072:11065` · frame 814 · intro 724.8 · gap 19.2 · margin-bottom 49.2 to media |
| 2026-09-17 | **C7b** | **READY — owner QC** | Logo chip 307.2 + photo 480.8×503.2 · gap 25.6 · purple corner · facts deferred to C7c |
| 2026-09-17 | **C7c** | **READY — owner QC** | Facts absolute left 16.4 top 190.4 · gap 25.6 · media min-h 847.4 |
| 2026-09-17 | **C7d** | **READY — owner QC** | Rankings card 274×483 @ 270/479 · #d9d9d9 · radius 16 · overlaps photo |
| 2026-09-17 | **C7e** | **READY — owner QC** | Accreditation @ 583.3/671.2 · 5 logos max-h 32→38.4 (+20% owner) · desk C7 complete |
| 2026-09-17 | **C7a mob** | **MOB IN QC** | Intro `551:10336` · 296 · gap 8 · Bebas 24 / body 14 · mb 20 · b–e hidden |
| 2026-09-17 | **C7b mob** | **MOB IN QC** | Logo 150.68 · photo 288×425 · gap 16.5 · radius 7.68 · ml 7 · facts/rankings/accredit parked |
| 2026-09-17 | **C7d mob** | **MOB IN QC** | Rankings 210×296 @ 121/441 · #d9d9d9 · radius 12 · pad 32/16 · Bebas 24 / body 14 |
| 2026-09-17 | **C7c mob** | **MOB IN QC** | Facts 138 @ 2/771 · gap 16 · Bebas 24 / body 14 · title→body 8 · accredit parked |
| 2026-09-17 | **C7e mob** | **READY — owner QC** | Accredit @ 172/771 · w 129 · Bebas 24 · logos h 25.6→40.96 (+60% owner) · mob C7 complete |
| 2026-09-17 | **C8a** | **READY — owner QC** | How to Apply + 4 eligibility chips · `17072:11085` · Options parked C8b |
| 2026-09-17 | **C8b** | **DESK IN QC** | Option 1 (3 steps + arrows) · Option 2 · purple links · mob parked |
| 2026-09-17 | **C8 mob** | **READY — owner QC** | `551:10566` · 310 · chips wrap · Option 1 stacked ↓ arrows · gap 39 |
| 2026-09-20 | **C13** | **READY — owner QC** | FAQ tabs+accordion · desk `17072:11640` · mob `551:9580` · Programme Details only · Learning/Refund empty · desk Q2 |
| 2026-09-20 | **F-F contract** | **DONE** | Pair rule + v1 inventory locked (`event_session` + program_full/compact + promo + internship); tags/badge/Learn More; `face-layouts.ts` |
| — | **F-F UI** | Done (UI) | All face chrome locked: listing pairs 1–6 + Pair 9 `program_compact_sm` + Pair 10 `program_compact_sm_desk` + `calendar_session` Pair 7 + `calendar_session_photo` Pair 11. Heart save + B\* `face_layout` wiring later. |
| 2026-09-22 | **F-F pairs 1–3** | **LOCKED** | Desk 1+2+3 · mob 1 · mob 2&3 shared |
| 2026-09-24 | **F-F Pair 10** | **LOCKED** | `program_compact_sm_desk` · desk Pair 9 @ 80% · mob Pair 6 full · lab `#pe-face-program-compact-sm-desk` |
| 2026-09-24 | **F-F Pair 11** | **LOCKED** | `calendar_session_photo` · desk+mob · Pair 7 + fixed photo · no Mode · lab `#pe-face-calendar-session-photo` |
| 2026-09-24 | **F-F UI** | **DONE** | Face chrome complete (1–7 + 9 + 10 + 11). Deferred: Pair 3 closed mob · heart save · B\* wiring |
| 2026-09-20 | **B0** | **READY** | Catalog B\* Kanban opened — [`docs/CATALOG-B-STAR.md`](./CATALOG-B-STAR.md) |
| — | **B1–B7** | Parked | Schema / pickers / listings — one `GO AHEAD Bn` each |
| — | **CHROME-B** | Parked | React chrome shell after Events + Countries; one-time page mount swap then modular forever |

---

## Open decisions (ask before the gate that needs them)

1. Keep `/purpleevents` as a **listing** of upcoming cards, while each event uses the detail template? Or listing deferred?
2. ~~Figma desk + mob for `program_full`~~ **RESOLVED 2026-09-22**. ~~Pair 4 `internship`~~ **LOCKED**. ~~Pair 5 `promo`~~ **LOCKED**. ~~Pair 6 `program_compact`~~ **LOCKED**. ~~Pair 9 `program_compact_sm`~~ **LOCKED** (Pair 6 @ 80% shell). ~~Pair 10 `program_compact_sm_desk`~~ **LOCKED** (desk Pair 9 / mob Pair 6). ~~Pair 7 `calendar_session`~~ **LOCKED** desk+mob. ~~Pair 11 `calendar_session_photo`~~ **LOCKED** desk+mob. **Face card UI complete.**
3. ~~At F-F: which face variants for v1?~~ **RESOLVED 2026-09-20** — `event_session` + `program_full` + `program_compact` + `promo` + `internship` (+ `cvready` Pair 1).
4. At B*: URL shape for event detail — keep `/purpleevents/session/:id` or move to slug?

---

## NOT until named GO AHEAD

- Event body sections (E1+)  
- Migrations / RLS changes / live Supabase body reads  
- Porting junior CMS or `user_saved_items`  
- Live cutover of `/purpleevents` or `/purpleevents/session/:id`  
- Course template / heart save / B\* `face_layout` wiring (face chrome UI done)  
- Catalog B\* schema (see [`CATALOG-B-STAR.md`](./CATALOG-B-STAR.md) — `GO AHEAD Bn`)  
- Zoho booking / payments / popups  

---

## How to continue

| You say | What happens |
|---|---|
| Owner QC E7 | Confirm sticky/trac at `/preview/purpleevents-lite#pe-e7` (desk + phone) |
| FACE locked | [/preview/purpleevents-face](/preview/purpleevents-face) — **all face UI locked** (1–7) |
| `GO AHEAD FACE <layout_id>` | Face chrome complete. New layout only with Figma + owner gate. |
| E8 locked | [#pe-e8](/preview/purpleevents-lite#pe-e8) — upcoming rail done (desk+mob QC) |
| `GO AHEAD E9` | Share poster — then E10…E13 one at a time |
| `GO AHEAD E10` … `E13` | Next block only |
| `GO AHEAD F-C` | After event template path is far enough **and** course Figma URLs exist |
| `GO AHEAD B0` … `B7` | Catalog rebuild — see [`CATALOG-B-STAR.md`](./CATALOG-B-STAR.md); map first, one gate only |
| Reopen chrome by name (later) | React `PublicHeader` / `PublicFooter` remount — not during E* |
| `GO AHEAD CHROME-B` (later) | Only after Events + Countries — React header/footer remount |
