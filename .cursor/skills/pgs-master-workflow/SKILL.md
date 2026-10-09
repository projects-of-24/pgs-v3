---
name: pgs-master-workflow
description: >-
  Single owner workflow for PGS V3: frontend bodies, locked modular chrome vs
  editable globals.css, backend 10/10 rungs, CMS leave-alone, later popups/Zoho/payments.
  Read this first so agents do not re-derive order, locks, or gates. Owner lock 2026-09-05.
  Face cards: `pgs-face-card-pass` + /preview/purpleevents-face.
  Upcoming rail: `pgs-upcoming-sessions` + E8a–E8e on /preview/purpleevents-lite#pe-e8.
  Admin/Ops: `pgs-admin-ops` + docs/PGS-ADMIN-OPS.md · SITE-PLAN-ADMIN-INVENTORY.md.
  CMS: `pgs-cms` + docs/SITE-PLAN-02-CMS.md + docs/PGS-CMS.md (refs · gates CMS-0…P · catalog · picks · pages · popups later).
  Student Ops: `pgs-student-ops` + docs/SITE-PLAN-02b-STUDENT-OPS.md + docs/PGS-STUDENT-OPS.md (**LOCKED** · assigned home · comments/@helpers · Kanban import SO-K).
  Student Profile: `pgs-student-profile` + docs/SITE-PLAN-02c-STUDENT-PROFILE.md + docs/PGS-STUDENT-PROFILE.md (**PARKED** · FB/IG hub · stream/year lock · sync feed/track/Ops · UI after backend).
  Popups/Zoho: `pgs-popups` + docs/SITE-PLAN-03-POPUPS.md + docs/PGS-POPUPS.md (**LOCKED** · CMS table+form · not Framer · SoftLock · booking_url).
---

# PGS master workflow (do not re-derive)

**Read this skill first** on any PGS task. Companion skills: `pgs-propose-before-code`, `pgs-preflight-db-api-pages` (every implementation: DB · API · pages → owner approve · no YOLO if DB missing), `pgs-scout-what-why-how`, `pgs-modular-public-chrome`, `pgs-public-move-out`, `pgs-no-touch-unapproved-ui`, `pgs-never-invent`, `pgs-owner-teach-map` (owner briefs · deep teach · living maps), `pgs-backend-phase-wire` (backend gates · FE↔BE↔DB map · day-1 security · living Kanban MD), `pgs-student-family-doorman` (anon+standard Family A · Premium Family B separate · no ?premium= mix), `pgs-ipad-paper-pass` (iPad page: chrome import · owned split · design body; ignore phone×1.4), `pgs-ipad-modular-body-pass` (Premium/medical iPad body QC speed: 601–800 stack · 801–1366 wide · freeze QC’d · DevTools→modular · never 767), `pgs-ipad-hero-body` (legacy recall only when owner says recall on mauve-panel — not for modular medical bodies), `pgs-face-card-pass` (listing faces: desk→mob pass · [/preview/purpleevents-face](/preview/purpleevents-face) · full Figma size · no transform scale), `pgs-upcoming-sessions` (E8 rail: 6 fixtures · E8a logic → E8b desk → E8c mob → E8d interact → E8e lock · [#pe-e8](/preview/purpleevents-lite#pe-e8)), `pgs-admin-ops` (Admin/Ops cockpit · one staff id · permission+scope · Reference Bank · [`docs/PGS-ADMIN-OPS.md`](../../docs/PGS-ADMIN-OPS.md)), `pgs-cms` (CMS · [`docs/PGS-CMS.md`](../../docs/PGS-CMS.md)), `pgs-student-ops` (Student Ops · [`docs/PGS-STUDENT-OPS.md`](../../docs/PGS-STUDENT-OPS.md)), `pgs-student-profile` (Profile hub PARKED · [`docs/PGS-STUDENT-PROFILE.md`](../../docs/PGS-STUDENT-PROFILE.md)), `pgs-popups` (Popups + Zoho links · [`docs/PGS-POPUPS.md`](../../docs/PGS-POPUPS.md)), `pgs-content-pass-then-code` (visual/position/next block: content pass, assess, then code).

Owner docs (detail): [`docs/MODULAR-PUBLIC-FRONTEND.md`](../../docs/MODULAR-PUBLIC-FRONTEND.md) · [`docs/PUBLIC-MOVE-OUT-PLAN.md`](../../docs/PUBLIC-MOVE-OUT-PLAN.md) · [`docs/BACKEND-10-10-PLAN.md`](../../docs/BACKEND-10-10-PLAN.md) · [`docs/PUBLIC-BODY-TEMPLATE-INVENTORY.md`](../../docs/PUBLIC-BODY-TEMPLATE-INVENTORY.md)

Junior scout (read-only): `.ref/pgs_app` (gitignored sparse clone of `patienceSweetChild/pgs_app`)

---

## One picture (global order)

```
NOW     Track A — Frontend: legacy body sizes / templates (countries first)
        Chrome modular section LOCKED · globals.css otherwise OK with GO AHEAD
        Hostinger CSS = reference only — do not edit to win

LATER   Track B — Backend 10/10: Ops / roles / docs / lag (GO AHEAD rung N only)

LATER   Track C — SaaS integrations: popups → Zoho/Google calendar → payments
        Never before A + core B spine · owner Figma / provider picks required

LATER   Type floor — final-draft check only, not during fast section QC
        Minimum text (13 / 14) → 16px on phone, iPad, and desktop
        20px+ left alone unless a visual QC says otherwise
        Skill: `pgs-ipad-hero-body` · do not sweep mid-page

ALWAYS  CMS (junior) — leave alone unless owner reopens by name
ALWAYS  Opus architect plan → owner GO AHEAD → Sonnet 5.5 or this agent implements → gates → owner QC
ALWAYS  Content pass (assess, no code) → owner confirms the relationship → then code
```

**Parallel tracks:** Owner may work Hostinger/countries while backend stays closed. Agents must **not** drive-by Ops/backend while owner is mid-frontend CSS.

---

## Content pass, then code (owner lock 2026-09-12)

A visual correction is not a license to edit. One relationship per pass. Assess that relationship. Stop. Code only after the owner confirms the assessment.

Do not stack fixes. The capsule misses came from coding the next guess (screen edge, then 177px, then grey pull-up) before the relationship was named.

### Pass 1 — content (no code)

Look at the named content only. Say where it sits in Figma, and where it sits now.

Name the relationship in plain words: under the heart card, on the timeline card, 38px off the screen edge. Not a layer x until that relationship is clear. A raw Figma x can be the unrotated origin.

If the live row is not the Figma frame width (zoom, 85% rail), say that. Do not apply a 390px left as a fixed margin on a wider row.

### Pass 2 — assess

Measure only that relationship. Report the gap in one sentence. No file edits.

### Then code

One change for that relationship. Re-measure it. Stop for owner QC. Do not start the next relationship in the same edit.

## Universal method (every job)

```
1. Hostinger / legacy intent (business story — KEEP workflow, REJECT insecure impl)
2. Owner Figma / junior parked code (visual authority for bodies)
3. Current V3 (schema, RLS, RPCs — security authority)
3b. Layout/CSS: SCOUT live + preview → WHAT · WHY · HOW (`pgs-scout-what-why-how`) — no vibe CSS
4. **Opus architect plan** (below) — plan only, no code
5. Propose that plan: WHAT · PLAN · BEFORE→AFTER · FILES · ELI5 · NOT IN THIS CHANGE
6. STOP — wait for owner GO AHEAD (or GO AHEAD /route / GO AHEAD rung N)
7. Sonnet 5.5 or this agent implements the approved plan. Smallest correct diff only
8. Gate report (syntax + security + skips) + re-measure if layout
9. Owner Preview / use QC
```

**Owner strengths:** product, Figma, SQL/Airtable sense, role “wrong key must fail” tests.  
**Agent strengths:** Next wiring, RLS, migrations, async plumbing, CodeRabbit-ready diffs.

## Architect, then implement (owner lock 2026-10-02)

**Skill path from now:** Opus plans. Sonnet 5.5 or this agent implements. Do not skip the plan to save a turn.

| Step | Who | Does |
|---|---|---|
| 1 | Opus | Pre-build architect plan only. No file edits. |
| 2 | Owner | `GO AHEAD` on that plan, or a correction |
| 3 | Sonnet 5.5 or this agent | Implement the approved plan. Targeted diff. Re-measure. |

**Responsive asks are one plan, not one pass per band (owner lock 2026-09-26).** When the owner asks about desktop, iPad, mobile, or any mix of them, Opus plans all four bands together in one pass. Four bands below. Opus says what each band shows, what carries over from the band above, and what differs, and why. The owner approves that one plan. Then Sonnet 5.5 or this agent builds it in one go. Do not fix desktop, then iPad, then compact iPad, then phone in separate passes on the same component. The header took several passes because each band was done alone.

Opus plan for a responsive ask must include:

- One table: every piece (logo, labels, buttons, icons, menu, gaps) × four bands
- What is shared across bands, and the one reason any band differs
- Where each value lives (one rule per band, no leftover rule that jumps a size)
- Which CSS files and media queries change
- A measure list for the implementer: 1500 · 1100 · 700 · 390 (and 360 for the narrowest phone)

Opus is the architect. Use it for a new band, a new block, a CSS split, an audit, a multi-file pass, or a contract. A live QC nudge the owner already named (“this box is 30px”) stays a direct edit. Do not open a second Opus plan for that nudge.

**No separate toy Node/Express mini-project.** Teaching happens inside real PGS rungs.

---

## CSS authority (critical — do not confuse)

| Layer | Where | Rule |
|---|---|---|
| **Modular public chrome** | `src/app/globals.css` → section **`PGS MODULAR PUBLIC CHROME — CANONICAL`** | **LOCKED** unless owner reopens by name |
| **Other `globals.css`** | Ops/student bands, retained footer, non-chrome globals | **Editable** with propose → GO AHEAD |
| **Header bar assets** | `src/features/shell/legacy-header-breakpoints.css` | **LOCKED** (chrome) unless owner reopens |
| **Hello failsafe** | `src/features/shell/legacy-hello-aspirant.css` | **LOCKED** — Hello removed |
| **Shared header/footer HTML** | `public-header.html` / `public-footer.html` (+ `.ts`) | **LOCKED** unless owner reopens. **Owner 2026-09-25:** header chrome phase **REOPENED** — skill `pgs-header-chrome-phase` · [`docs/HEADER-CHROME-PHASE.md`](../../docs/HEADER-CHROME-PHASE.md). React remount + drop chrome DSIH = gates H1→H-R after `GO AHEAD`. Not during unrelated body gates. |
| **Page bodies (default)** | `src/features/*/…css`, legacy HTML, page-scoped CSS | **Active frontend work** — propose → GO AHEAD |
| **Hostinger leftovers** | `public/assets/css/style.css`, `responsive.css` | **REFERENCE ONLY** — never patch to win; port intent into globals or page CSS |

### Four breakpoints (owner lock 2026-09-26)

Four bands. The middle two are reserved for iPad. Never use 767.

| Band | Width | Device | Media query |
|---|---|---|---|
| Desktop | above 1366 | desktop | `(min-width: 1367px)` |
| Wide iPad | 801–1366 | iPad | `(min-width: 801px) and (max-width: 1366px)` |
| Compact iPad | 601–800 | iPad | `(min-width: 601px) and (max-width: 800px)` |
| Mobile | 600 and below | phone | `(max-width: 600px)` |

Numbers authority: `src/features/shell/pgs-breakpoints.ts` (`headerMobileMax` 1366 · `headerIpadWideMin` 801 · `headerCompactMax` 600). Both iPad bands share one iPad recipe; only what the owner names may differ between them. `601–1366` is still valid when a rule is the same on both iPad bands.

**Header (locked):** desktop full bar, no hamburger, margin 40/40 · wide iPad Figma `19072:15812` (logo · `#feed` · join · bell · login · hamburger) · compact iPad same logo and label size as wide iPad, join #PGS in the menu · mobile Figma `19073:13319`. Lock rows: `docs/HEADER-CHROME-PHASE.md` 33–35.

**Lesson (owner):** shared chrome cost a full day of CSS — lock it; bodies are cheaper to iterate.

### Modular chrome vs React chrome (do not confuse)

- **Today’s modular chrome** = shared HTML header/footer + modular CSS. Mounted via `LegacyPage` + **`dangerouslySetInnerHTML` (DSIH)**. CSS in the chrome section still updates every modular page — but **string mount is not the end state**.
- **`LegacyPage`** = host wrapper name only. It does **not** mean “serve Hostinger body.” Cutover pages put a **React body** between the shared chrome.
- **React chrome remount (ACTIVE phase 2026-09-25):** `PublicHeader` / `PublicFooter` + owned CSS from Figma `19073:13328`, then **wire mounts and drop chrome DSIH**. Living plan: `docs/HEADER-CHROME-PHASE.md` · skill `pgs-header-chrome-phase`.
  - **Definition of done:** owner can verify chrome is React-mounted — **not** “React files exist while pages still DSIH the HTML string.”
  - **Do not** open during unrelated body gates. Propose → `GO AHEAD` → one chrome gate only.
  - **iPad:** mobile header · desktop body. **Safe-area:** header → strip/toggle → body → footer together.
  - **Owned CSS split P1–P15 DONE** (`src/features/owned-css/split/`, unlinked). **OWN-LINK QC order:** header → toggle → footer → univMeet → then pages.

---

## Track A — Frontend workflow

### Programming model

- Live pages not yet cut over = **Hostinger/legacy HTML bodies** + **locked shared chrome**
- Cutover / preview labs = **React modular body** + same locked shared chrome (`LegacyPage` host)
- Figma bodies = build in preview → owner QC → cutover live
- Hostinger CSS = reference only for chrome DNA; never patch Hostinger to win
- Events / courses templates: living map [`docs/PURPLE-EVENTS-ARCHITECTURE.md`](../../docs/PURPLE-EVENTS-ARCHITECTURE.md) — block-by-block gates

### Figma template families (one component → many routes)

| ID | Template | Examples |
|---|---|---|
| T1 | Country destination | UK, USA, … |
| T2 | Premium pathway | STEM, MBA, … |
| T3 | Medical pathway | USMLE, PLAB, AMC |
| T4 | Course detail | any course |
| T5 | Event detail | any event |
| T6 | Card faces | Program / Promo / Internship / Saved* |
| S* | Singles | Feed, Progress, board, docs, hubs, … |
| — | Popups | **last** — owner shares Figma first |

**Priority product order:** Feed #1 · Track Progress #2 · **Countries first for current owner work**

### Frontend swap order (when owner opens bodies)

1. T6 Cards QC + `card-mappers` reconcile  
2. Feed  
3. Track Progress  
4. T1 Country → all `/countries*`  
5. T2 / T3 Pathways  
6. T4 / T5 Course + event  
7. Remaining singles  
8. Popups (Track C start)

Each swap: **body only** — shell stays locked · `GO AHEAD /route-or-template`

### Frontend QC

- Visual: owner Preview desktop / iPad / phone  
- Bands: above 1366 · 801–1366 · 601–800 · 600 and below (middle two = iPad)  
- Do not reopen locked chrome while fixing country body margins  
- **Mobile width (owner lock 2026-09-12):** Figma inset first. If the owner says that block is too edgy, then apply the 85% rail, centered. Do not start at 85%. See `pgs-ipad-hero-body`.
- **Playwright every pass (owner lock 2026-09-12):** after each body pass, measure 390 / 768 / 1440. Block present, no card overlap, text at least 16px. Do not close the pass on a visual guess.
- **Gap analysis before lock (owner lock 2026-09-13):** do not tighten section gaps while the page is still being built from Figma. After that page’s Figma-to-code is done, one gap-analysis pass, then the page may be marked lock. USMLE living map: `docs/PREMIUM-MEDICAL-MODULAR.md` gate **GAP**.
- **No black preview banner (owner lock 2026-09-09):** never render a dark/black “Side-test” strip above modular bodies. Body starts at closed `#toggleBtn` via shell `margin-top: calc(-1 * clamp(88px, 11vw, 157px))` — preview and live, desktop and mobile.

**Inventory matrix:** [`docs/PUBLIC-BODY-TEMPLATE-INVENTORY.md`](../../docs/PUBLIC-BODY-TEMPLATE-INVENTORY.md)

---

## Track B — Backend 10/10 workflow

**Goal:** sellable Ops + student spine (~4/10 today → 10/10 professional trust, not mythical zero-bug code).

**Feature wire (owner lock):** APIs, DB children, uploads, workspace routes → [`pgs-backend-phase-wire`](../pgs-backend-phase-wire/SKILL.md) — connection map first · one gate · day-1 security · living Kanban MD · live click QC · wait for next `GO AHEAD Wn`.

**Open only with:** `GO AHEAD rung N` (see [`docs/BACKEND-10-10-PLAN.md`](../../docs/BACKEND-10-10-PLAN.md))

**Parked for this pass (not now):** Add Country → live page from the shared template. Contract is in `pgs-backend-phase-wire` (gates C1–C4). Do not build it during frontend.

| Rung | Target |
|---|---|
| 0 | Honesty map (docs / invite / fixtures) |
| 1 | Docs Phase 4D live-certified or honest v1 scope |
| 2 | People & Access + invite email |
| 3 | Ops student page lag |
| 4 | Mentor daily loop (assigned-only) |
| 5 | Search + notifications |
| 6 | Fixture / e2e trust (skipped ≠ passed) |
| 7 | Scoreboard polish (no fake metrics) |
| 8 | Calendar / guardian — after core |

### One-truth (never duplicate)

- Premium → `premium_entitlement`  
- Mentors → `mentor_assignments`  
- Docs → Phase 4D private Storage (no Hostinger filesystem)  
- Audit → `audit_events`  
- Loopboard / kanban → **one** truth  
- Comments / notifications → one domain each  
- Never fetch-all then hide in React  

### CMS

**Leave junior CMS alone** (courses/events/countries/pathways visual editors). Do not rebuild CMS to chase Ops 10/10.

### Schema changes

- **Do not** create product tables only in Supabase SQL editor ad hoc  
- Use **`supabase/migrations`** + owner GO AHEAD for prod-connected changes  
- Owner may run **SELECT** in SQL editor to inspect; agent owns migration files  

### Gate stack (every backend job — report pass/fail/skip)

| Gate | Command |
|---|---|
| Syntax | `pnpm typecheck` · `pnpm lint` · `pnpm build` · `pnpm test` |
| Security | `pnpm test:rls` · `pnpm test:security` |
| Use | `pnpm test:e2e` / smoke + owner 3-try card (allowed / blocked / blocked) |
| Review | CodeRabbit on PR when owner asks |
| Uniformity | small diff · no new stack · no second system |

**DONE must list skips.** Skipped ≠ passed.

---

## Track C — SaaS integrations (later only)

**Do not start** until Track A bodies + core Track B spine unless owner explicitly opens with `GO AHEAD popups|zoho|payments`.

### Popups (~8/10 feasibility)

```
Owner Figma (desktop + mobile)
  → map trigger page/button → popup module
  → ADAPT SoftLock / BumpPremium — do not invent second popup system
  → CMS copy + external webinar URLs where needed
```

### Zoho / Google calendar (~6.5/10)

```
Owner picks Zoho | Google | defer
  → booking lives OUTSIDE PGS — no PGS booking DB
  → server-only OAuth/env · integration outbox adapter
  → Ops/CMS shows upcoming sessions / join links
  → verified webhooks
```

### Payments (~7/10)

```
Owner picks provider (usually Stripe)
  → checkout/webhook server-side only
  → webhook updates premium_entitlement (ONE Premium truth)
  → audit_events · test mode first
```

**Parked afterthoughts (do not mix in now):** one feed domain consolidation.

---

## What 10/10 means (realistic)

Fortune 100 codebases are not perfect either. **Sellable 10/10** = roles/docs/Ops behave under real use, fail closed, gates catch wiring/security, deferred items labeled honestly.

**Feasibility (owner stack + Cursor + CodeRabbit + gates):** ~7.5–8/10 project · ~70–75% hit sellable bar if discipline holds.

---

## Agent checklist (start of every task)

- [ ] Read this skill — which track (A / B / C)?  
- [ ] Am I editing **locked modular chrome** or **PGS MODULAR PUBLIC CHROME** section? → STOP unless owner reopened by name  
- [ ] Am I editing Hostinger CSS to win? → STOP  
- [ ] Am I using **767** for modular chrome? → STOP (use 600 / 1366)  
- [ ] Am I wiring parked junior body without `GO AHEAD /route`? → STOP  
- [ ] Am I doing backend while owner asked for countries CSS? → STOP  
- [ ] Did Opus write the architect plan before this build? → required, unless this is a named live QC nudge  
- [ ] Did I propose and wait for GO AHEAD? → required  
- [ ] Will DONE include gate report + ELI5?

---

## Related skills & rules

| Skill / doc | Role |
|---|---|
| `pgs-propose-before-code` | Proposal format + STOP |
| `pgs-face-card-pass` | Face cards desk→mob · [/preview/purpleevents-face](/preview/purpleevents-face) |
| `pgs-upcoming-sessions` | E8 Upcoming rail · 6 fixtures · E8a–E8e · [#pe-e8](/preview/purpleevents-lite#pe-e8) |
| `pgs-admin-ops` | Admin/Ops cockpit · bank · scope · [`docs/PGS-ADMIN-OPS.md`](../../docs/PGS-ADMIN-OPS.md) |
| `pgs-cms` | CMS catalog/pages/picks/media · [`SITE-PLAN-02-CMS.md`](../../docs/SITE-PLAN-02-CMS.md) · [`PGS-CMS.md`](../../docs/PGS-CMS.md) |
| `pgs-student-ops` | Student Ops **LOCKED** · [`SITE-PLAN-02b-STUDENT-OPS.md`](../../docs/SITE-PLAN-02b-STUDENT-OPS.md) · [`PGS-STUDENT-OPS.md`](../../docs/PGS-STUDENT-OPS.md) |
| `pgs-popups` | Popups + Zoho **LOCKED** · CMS table not Framer · [`SITE-PLAN-03-POPUPS.md`](../../docs/SITE-PLAN-03-POPUPS.md) · [`PGS-POPUPS.md`](../../docs/PGS-POPUPS.md) |
| `docs/PURPLE-EVENTS-ARCHITECTURE.md` | Events template + face + E8 living map |
| `pgs-modular-public-chrome` | Chrome lock detail + breakpoints |
| `pgs-header-chrome-phase` | Header reopen 2026-09-25 · React mount · no chrome DSIH · Figma IA · [`docs/HEADER-CHROME-PHASE.md`](../../docs/HEADER-CHROME-PHASE.md) |
| `pgs-no-touch-unapproved-ui` | Approved / locked surfaces |
| `pgs-never-invent` | No invented UX |
| `pgs-scout-what-why-how` | Frontend/public layout WHAT·WHY·HOW |
| `pgs-ops-backend-ui-scout` | Ops/CMS screenshot UI scout; ignore shadcn/TanStack default; dashboard readings first |
| `pgs-cms-action-buttons` | `.btn-custom` never restyle |
| `.cursor/rules/pgs-v3-domain-contracts.mdc` | One-truth architecture |
| `.cursor/rules/pgs-v3-product-recovery.mdc` | Four-source gate |
