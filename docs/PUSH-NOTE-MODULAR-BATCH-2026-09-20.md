# PGS V3 — modular frontend batch · push inventory

**Date:** 2026-09-20  
**Branch now:** `feat/finance-modular` (tracks `origin/feat/finance-modular`)  
**Local `main` tip:** `725f275` — *Ship UK country modular hero and body shell with shared public chrome.*  
**Goal:** land this batch on GitHub, then continue next updates from a clean tip.

---

## How many works are done?

### A — Product surfaces (frontend modular bodies)

Rough count of **shipped / lab-ready workstreams** in this working tree (not all merged to `main` yet):

| # | Workstream | Lab / live | Status (owner view) |
|---|---|---|---|
| 1 | About | `/preview/about` · live `/about` | Modular body + living MD |
| 2 | Explore Countries | `/preview/explorecountries` · live `/explorecountries` | Modular body + living MD |
| 3 | Finance | `/preview/finance` · live `/finance` | Modular body + living MD |
| 4 | Scholarship | `/preview/scholarship` · live `/scholarship` | Modular body + living MD |
| 5 | Premium Home | `/preview/purplepremiumhome` · live `/purplepremiumhome` | Modular body + living MD |
| 6 | Premium Medical (USMLE / PLAB / AMC) | `/preview/purpleusmle` · live routes | Modular body + living MD |
| 7 | Premium Non-medical | `/preview/purplenonmedical` · live | Modular body extended |
| 8 | Purple Events Lite | `/preview/purpleevents-lite` | E0–E13 path (E7/E10/E13 QC open) |
| 9 | Purple Events face cards | `/preview/purpleevents-face` | Face v1 locked |
| 10 | Courses template (`programs full`) | `/preview/programs-courses` | **C0–C13 body complete** (fixtures; no B* wire) |
| 11 | Countries compose / per-country shells | live country routes | Modular compose + country forks |
| 12 | Shared modules | (imported by pages) | Highlights, LearnerWords, Outro, FAQ patterns, picks, etc. |
| 13 | Skills / agent workflow | `.cursor/skills/*` | Master workflow, propose-before-code, face/upcoming, etc. |
| 14 | Living architecture MD | `docs/PURPLE-EVENTS-ARCHITECTURE.md` + `*-MODULAR.md` | Source of truth for gates |

**≈ 14 workstreams** ready to preserve in git.

### B — Courses template gates (this chat’s linear pass)

| Gate | Block | Status |
|---|---|---|
| C0 | Shell | DONE |
| C1–C6 | Hero → brochure | READY — owner QC |
| C7a–e | Awarding body (incl. accredit 2-col desk fix) | READY — owner QC |
| C8a–b | How to Apply | READY — owner QC |
| C9a–b + mob | Certificate | READY — owner QC |
| C10 | #higlights (shared) | READY — owner QC |
| C11a–b + mob | Enrollment Fee | READY — owner QC |
| C12 | Learners (shared) | READY — owner QC |
| C13 | FAQ | READY — owner QC |
| C14+ | Extra Figma bands | None after FAQ (footer = chrome) |

**Figma body for Courses = complete.** Backend for modular Courses body = **not started** (live `/programsfull/program/:id` still legacy HTML + thin catalog hydrate).

### C — Git volume (why push needs a plan)

| Metric | Value |
|---|---|
| Branch commits ahead of `main` | **5** already committed |
| Modified tracked files (unstaged) | **~50** |
| Untracked paths | **~291** |
| `public/previews/` QC screenshots | **~89 MB** — do **not** push unless you insist |
| `.ref/` | **~3.7 MB** — do **not** push (reference / junior scout) |
| `public/assets/js/main.js` | Modified — breaks `pnpm assets:verify` checksum; treat carefully |

---

## What to push vs what to leave out

### INCLUDE (product)

- `src/features/{about,explore-countries,finance,scholarship,premium-*,purple-events,programs-courses,countries*,shared,…}`
- `src/app/preview/*` labs that mount those bodies
- Live page cutovers under `src/app/{about,finance,scholarship,purple*,explorecountries,countries*,…}`
- `public/assets/img/{about,explore-countries,finance,scholarship,premium-*,purple-events,programs-courses,…}`
- Living docs: `docs/*MODULAR.md`, `docs/PURPLE-EVENTS-ARCHITECTURE.md`, route status updates
- `.cursor/skills/` updates used by the workflow
- Pending migrations only if owner wants them on main now:
  - `supabase/migrations/20260909120000_finance_partner_logos.sql`
  - `supabase/migrations/20260915183657_premium_home_hero_videos.sql`

### EXCLUDE (unless you explicitly say otherwise)

- `.ref/`
- `public/previews/**` (QC PNGs)
- Accidental secrets / `.env*`
- Optional: revert or omit `public/assets/js/main.js` until checksum is intentional

---

## Recommended push path (safe)

Repo rule prefers **feature branch + PR**, not silent force onto `main`.

1. **Commit** product INCLUDE set on `feat/finance-modular` (or rename to `feat/modular-public-batch-2026-09-20`).
2. **Push** branch → `origin`.
3. **Open PR** → `main` (draft or ready).
4. After merge / green checks: pull `main` locally → **next updates** from there.

Direct `git push origin HEAD:main` is possible but skips review and can break production if build fails.

---

## After this lands — next updates (parked)

1. Owner QC / lock Courses C1–C13 on lab  
2. Courses **B\*** backend (map → `detail_template` → cutover) — propose first  
3. Lite leftovers (E7 QC, etc.)  
4. Face variants / heart  
5. iPad 601–1366 polish where deferred  
6. Production deploy only after owner says so  

---

## Owner decision needed before commit/push

Reply with one:

- **`GO AHEAD COMMIT+PR`** — commit INCLUDE set, push branch, open PR to `main`  
- **`GO AHEAD COMMIT+PUSH MAIN`** — commit INCLUDE set and push/merge straight to `main` (you accept risk)  
- **`SPLIT`** — tell me which workstreams to commit first (e.g. Courses only)

Do **not** treat this note as already pushed.
