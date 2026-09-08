---
name: pgs-master-workflow
description: >-
  Single owner workflow for PGS V3: frontend bodies, locked modular chrome vs
  editable globals.css, backend 10/10 rungs, CMS leave-alone, later popups/Zoho/payments.
  Read this first so agents do not re-derive order, locks, or gates. Owner lock 2026-09-05.
---

# PGS master workflow (do not re-derive)

**Read this skill first** on any PGS task. Companion skills: `pgs-propose-before-code`, `pgs-scout-what-why-how`, `pgs-modular-public-chrome`, `pgs-public-move-out`, `pgs-no-touch-unapproved-ui`, `pgs-never-invent`, `pgs-owner-teach-map` (owner briefs · deep teach · living maps), `pgs-backend-phase-wire` (backend gates · FE↔BE↔DB map · day-1 security · living Kanban MD), `pgs-student-family-doorman` (anon+standard Family A · Premium Family B separate · no ?premium= mix).

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

ALWAYS  CMS (junior) — leave alone unless owner reopens by name
ALWAYS  propose → GO AHEAD → implement → gates → owner QC
```

**Parallel tracks:** Owner may work Hostinger/countries while backend stays closed. Agents must **not** drive-by Ops/backend while owner is mid-frontend CSS.

---

## Universal method (every job)

```
1. Hostinger / legacy intent (business story — KEEP workflow, REJECT insecure impl)
2. Owner Figma / junior parked code (visual authority for bodies)
3. Current V3 (schema, RLS, RPCs — security authority)
3b. Layout/CSS: SCOUT live + preview → WHAT · WHY · HOW (`pgs-scout-what-why-how`) — no vibe CSS
4. Propose: WHAT · PLAN · BEFORE→AFTER · FILES · ELI5 · NOT IN THIS CHANGE
5. STOP — wait for owner GO AHEAD (or GO AHEAD /route / GO AHEAD rung N)
6. Smallest correct diff only
7. Gate report (syntax + security + skips) + re-measure if layout
8. Owner Preview / use QC
```

**Owner strengths:** product, Figma, SQL/Airtable sense, role “wrong key must fail” tests.  
**Agent strengths:** Next wiring, RLS, migrations, async plumbing, CodeRabbit-ready diffs.

**No separate toy Node/Express mini-project.** Teaching happens inside real PGS rungs.

---

## CSS authority (critical — do not confuse)

| Layer | Where | Rule |
|---|---|---|
| **Modular public chrome** | `src/app/globals.css` → section **`PGS MODULAR PUBLIC CHROME — CANONICAL`** | **LOCKED** unless owner reopens by name |
| **Other `globals.css`** | Ops/student bands, retained footer, non-chrome globals | **Editable** with propose → GO AHEAD |
| **Header bar assets** | `src/features/shell/legacy-header-breakpoints.css` | **LOCKED** (chrome) unless owner reopens |
| **Hello failsafe** | `src/features/shell/legacy-hello-aspirant.css` | **LOCKED** — Hello removed |
| **Shared header/footer HTML** | `public-header.html` / `public-footer.html` (+ `.ts`) | **LOCKED** unless owner reopens |
| **Page bodies (default)** | `src/features/*/…css`, legacy HTML, page-scoped CSS | **Active frontend work** — propose → GO AHEAD |
| **Hostinger leftovers** | `public/assets/css/style.css`, `responsive.css` | **REFERENCE ONLY** — never patch to win; port intent into globals or page CSS |

**Bands for modular chrome:** `>1366` desktop · `601–1366` iPad · `≤600` mobile — **never 767** for chrome.

**Lesson (owner):** shared chrome cost a full day of CSS — lock it; bodies are cheaper to iterate.

---

## Track A — Frontend workflow

### Programming model

- Live pages = **legacy HTML bodies** + **locked shared shell** (`PublicLegacyPage`)
- Figma/junior React bodies = **parked** — swap one template family at a time after QC
- Hostinger = DNA + business intent; **not** sellable responsive (owner fixed chrome first)

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
- Bands: 1366 / 601–1366 / 600  
- Do not reopen locked chrome while fixing country body margins

**Inventory matrix:** [`docs/PUBLIC-BODY-TEMPLATE-INVENTORY.md`](../../docs/PUBLIC-BODY-TEMPLATE-INVENTORY.md)

---

## Track B — Backend 10/10 workflow

**Goal:** sellable Ops + student spine (~4/10 today → 10/10 professional trust, not mythical zero-bug code).

**Feature wire (owner lock):** APIs, DB children, uploads, workspace routes → [`pgs-backend-phase-wire`](../pgs-backend-phase-wire/SKILL.md) — connection map first · one gate · day-1 security · living Kanban MD · live click QC · wait for next `GO AHEAD Wn`.

**Open only with:** `GO AHEAD rung N` (see [`docs/BACKEND-10-10-PLAN.md`](../../docs/BACKEND-10-10-PLAN.md))

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
- [ ] Did I propose and wait for GO AHEAD? → required  
- [ ] Will DONE include gate report + ELI5?

---

## Related skills & rules

| Skill / doc | Role |
|---|---|
| `pgs-propose-before-code` | Proposal format + STOP |
| `pgs-modular-public-chrome` | Chrome lock detail + breakpoints |
| `pgs-no-touch-unapproved-ui` | Approved / locked surfaces |
| `pgs-never-invent` | No invented UX |
| `pgs-cms-action-buttons` | `.btn-custom` never restyle |
| `.cursor/rules/pgs-v3-domain-contracts.mdc` | One-truth architecture |
| `.cursor/rules/pgs-v3-product-recovery.mdc` | Four-source gate |
