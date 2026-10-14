# Country destination — modular body map

Living map for the owner. Update only at **phase ends**, not every pixel tweak.

**Shared template** for `/countriesusa`, `/countriesuk`, … — build once, import everywhere. Pilot = **USA**.

Not the Explore hub (`/explorecountries`) — that page is LOCKED separately.

---

## Surfaces

| Surface | URL | What it is |
|---|---|---|
| **Preview LOCKED (narrow)** | `/preview/countries` | Figma **`26:2456`** · C1–C7 mounted · archive reference |
| **Preview ACTIVE (wide)** | `/preview/countries-2` | Figma **`27:2999`** · TOC width **same as** `/preview/countries` (449.4) · Why/Overview/Tracks stay wide |
| **Live (all countries)** | `/countriesusa` … `/countriesothers` | **FULL FORK 2026-10-10** — each country owns `src/features/countries-destination-{slug}/` (complete template copy). Route → **its** folder only. Content still cloned USA fixtures until content pass |
| **Preview labs** | `/preview/countries` · `/preview/countries-2` | Use **USA** fork (`countries-destination-usa`) |
| **Prior bodies** | `src/features/countries-*` · `src/legacy/pages/countriesuk-route-pre-template-cutover.tsx` | Not served — rollback / content source for later pass |

---

## Figma authority

| Band | Frame | Node | File |
|---|---|---|---|
| iPad (narrow · LOCKED lab) | `ipad countries` | **`26:2456`** | `ipad` (`hOGQsV81xqKuasRdpdLYdM`) |
| iPad (wide · active lab) | `ipad countries` | **`27:2999`** | same |
| Desktop | QC’d React body (About method) | — | `/countriesuk` · `CountryUkBodyShell` + owned CSS (>1366) |
| Mobile | Modular lab (later) | — | modular ≤600 · desk = UK React |

### Wide vs narrow rails (layout only — type stays DS)

| Block | Narrow `26:2456` | Wide `27:2999` |
|---|---|---|
| TOC card | **449.4** | **449.4** (same as `/preview/countries` — owner) |
| Why | ~410 | **619** |
| Overview | ~413 | **623** |
| Choose (inner) | ~410 | ~410 |
| Tracks | ~433 | **653** |
| Hero / tabs | same | same |

TOC: `min(449.4px, calc(100% - 32px))` on both labs. Wide rails only on Why / Overview / Tracks.

**TOC card height (all tabs):** Study 101 Figma `26:2820` **`min-height: 579.24px`** (same floor everywhere — do not shrink below 101; grow with content) · links band **`316.96px`**. Never `max-height` / fixed card height.

---

## Responsive bands

| Band | Width | Status |
|---|---|---|
| Desktop | **>1366** | **LOCKED** (2026-10-10) — **all-views QC PASS** · unlock required to restyle |
| iPad | **601–1366** | **LOCKED** (2026-10-10) — **all-views QC PASS** · unlock required to restyle |
| Mobile | **≤600** | **LOCKED** (2026-10-10) — **all-views QC PASS** · font · 85% rail · toggle air −57 · cue/tabs |

**Carry for other public pages:** type/GAP/height from [`PGS-PUBLIC-DESIGN-SYSTEM.md`](./PGS-PUBLIC-DESIGN-SYSTEM.md) (Roboto 16 · Bebas ≥30 · GAP 60/80 · height:auto · desk·iPad·phone). Figma = layout only.

**Owner rule (2026-10-10):** any plan with **more than two** implementation steps → **Opus plans first**, then `GO AHEAD`, then execute.

**Desk source (full fork 2026-10-10):** each `countries-destination-{slug}/desk/` (copied from former `countries-uk` hero + body + content + CSS). Shell imports `./desk/*` only — no shared `@/features/countries-uk`.

### Desk lock sheet (2026-10-10 · `/preview/countries-2` >1366)

| Item | Value |
|---|---|
| TOC / 101 sidebar card | **294 × 640** · pad 24 24 40 24 |
| Grey stats | **hug** · nums **24** · labels **15** |
| Bebas caption | **26** |
| Intro (Guide + CTA) | pad **30** top/bottom |
| Why Choose / Spend title → cards | **20** |
| Why Choose / Spend card row + mid stack | **30** |
| Track / Field / Ideal For columns | **4** |

### iPad lock (unchanged · do not restyle from desk)

| Item | Value |
|---|---|
| Choose C6 gaps | grid **16** · chips **12** · bottom **12** · grid margin-top **16** |
| Scope | modular CSS · never copy desk-qc numbers here |
| Verified | @1024 desk-qc hidden · choose 16/12/12 |

### Mobile font pass (2026-10-10 · ≤600)

| Check | Result |
|---|---|
| Live audit all 6 tabs @390 | **0** under-floor Roboto · **0** Bebas &lt;30 |
| Harden | shell `--pgs-type-floor: 16` + modular UI selectors @600 |
| Why title | **30** phone only (iPad keeps **28**) |
| Body rail | **`__body` 85% / max 85%** · centered · all tabs + panel contents (was 95%) |
| DS | Figma=layout · type=ours · GAP 60/80 · height:auto |

### Owner order (2026-10-10)

1. **P0** empty shell + chrome + OWNED_SPLIT  
2. iPad blocks C1… one gate at a time → **DONE** on narrow lab  
3. Wide clamp lab (`countries-2` · `27:2999`)  
4. Desk/phone bands  
5. Pull into live `/countries*` → **ALL ROUTES template cutover DONE** (2026-10-10)  
6. **Later:** per-country content pass (replace shared USA/UK fixtures page by page)  

**Deferred (whole-site later):** Hostinger `vendors.min.js` / `main.js` cleanup on remaining non-owned-split routes — not this cutover.  

### Locks (every gate)

- Type / DS: [`PGS-PUBLIC-DESIGN-SYSTEM.md`](./PGS-PUBLIC-DESIGN-SYSTEM.md) — Roboto **16** · Bebas **≥30** · Figma = layout only  
- GAP: hero→next **60** · rest **80** · content-to-content  
- Block height: **`height: auto` only**  
- No black side-test banner · no Hostinger theme JS  

---

## Section order (body)

| # | Block | Gate | Status |
|---|---|---|---|
| — | Empty shell + chrome | **P0** | **DONE** |
| 1 | Hero (photo · flag/avatar · headline · CTA → `/contact-counsellor`) | **C1** | **DONE** (both labs) |
| 2 | Tab chips (Study 101 · Cost · Visa · … · Popular Tracks) | **C2** | **DONE** |
| 3 | TOC links + stats (28/5 · Open Doors) | **C3** | **DONE** |
| 4 | Why study copy | **C4** | **DONE** |
| 5 | Overview table | **C5** | **DONE** |
| 6 | Why choose bentos | **C6** | **DONE** |
| 7 | STEM / USMLE / Non-STEM | **C7** | **DONE** |

**iPad Study 101 body (C1–C7):** QC passed on `/preview/countries-2`. Narrow lab **LOCKED**.

### Study Cost (Figma `29:3405`) — gate-by-gate

| # | Block | Gate | Status |
|---|---|---|---|
| 0 | Tab switch Study 101 ↔ Cost | **CS0** | **DONE** |
| 1 | Cost TOC + stats (1.1M / 331k) | **CS1** | **READY — owner QC** |
| 2 | Budgeting 101 copy | **CS2** | **READY — owner QC** |
| 3 | Spend bentos | **CS3** | **READY — owner QC** |
| 4 | Envelope + Premium CTA | **CS4** | **READY — owner QC** |

### Visa 101 (Figma `30:4918`) — gate-by-gate

| # | Block | Gate | Status |
|---|---|---|---|
| 0 | Tab switch → Visa panel | **V0** | **DONE** |
| 1 | Visa TOC + funding stats (54.5% / 19% / 26.5%) | **V1** | **READY — owner QC** |
| 2 | Intro + F-1 / J-1 / M-1 cards | **V2** | **READY — owner QC** (CSS pass · mobile visa-card) |
| 3 | Essential Documents + Notes | **V3** | **READY — owner QC** (CSS pass · mobile docs-grid) |
| 4 | Step-by-Step Applying 101 | **V4** | **READY — owner QC** (CSS pass · mobile step-card) |
| 5 | Do’s / Don’ts | **V5** | **READY — owner QC** (CSS pass · mobile stacked lists) |
| 6 | How #PGS Helps + CTA | **V6** | **READY — owner QC** (CSS pass · mobile helper-box) |

### Short-Term (Figma `33:5509`) — gate-by-gate

| # | Block | Gate | Status |
|---|---|---|---|
| 0 | Tab switch → Short-Term panel | **ST0** | **DONE** |
| 1 | Short TOC + stats (1.1M / 18k) · Roboto aside | **ST1** | **READY — owner QC** |
| 2 | Intro copy | **ST2** | **READY — owner QC** (reuse Why · rail 619) |
| 3 | CTA + helper | **ST3** | **READY — owner QC** (yellow `#ffc524` · `/contact-counsellor`) |
| 4 | Mentor plate + course cards | **ST4** | **READY — owner QC** (CSS pass · closed overlay card 1) |

### Scholarships (Figma `34:6116`) — gate-by-gate

| # | Block | Gate | Status |
|---|---|---|---|
| 0 | Tab switch → Scholarships panel | **SC0** | **DONE** |
| 1 | Scholarship TOC + stats (88% / 78% / 65%) | **SC1** | **READY — owner QC** |
| 2 | Intro paras (no title) | **SC2** | **READY — owner QC** (Why adapt · rail 619) |
| 3 | Major scholarships table | **SC3** | **READY — owner QC** (semantic table · Highlights-style h-rail · below title) |
| 4 | Apply Guide | **SC4** | **READY — owner QC** (CSS pass · rail 619) |

### Popular Study Tracks (Figma `35:6371`) — gate-by-gate

| # | Block | Gate | Status |
|---|---|---|---|
| 0 | Tab switch → Tracks panel | **PT0** | **DONE** |
| 1 | Tracks TOC + stats (3.2% / 43.6% / 14.2%) | **PT1** | **READY — owner QC** (grey 168.8 · label wrap) |
| 2 | Intro paras | **PT2** | **READY — owner QC** (Why adapt · rail 619 · no title) |
| 3 | Section 1 table | **PT3** | **READY — owner QC** (semantic table · Highlights-style h-rail · left = why rail) |
| 4 | Section 2 table | **PT4** | **READY — owner QC** (reuse tracks-section · `#cd-tracks-section2`) |
| 5 | A Heads Up | **PT5** | **READY — owner QC** (rail 619 · Bebas punch · `#cd-tracks-headsup`) |

---

## Module path

| Piece | Path |
|---|---|
| USA fork (canonical QC + previews) | `src/features/countries-destination-usa/` |
| Per-country forks | `src/features/countries-destination-{usa,uk,aus,canada,europe,france,germany,mauritius,nz,others}/` |
| CSS isolation | **R1–R5** (reusable fork-family formula in `scripts/lib/css-fork-scope.mjs`). Every selector must start with `:where([data-country="{slug}"])` or `.countries-destination-preview-shell:where(...)`. Marker comment is informational only. Script: `node scripts/scope-country-css.mjs [slug\|all]` with `--check` (default, exit 1) or `--fix` (scope only unscoped/foreign rules; idempotent). Guard: `src/features/countries-destination-isolation.test.ts` (rule-level + import ban on old `features/countries/*` CSS modules from routes). Old labs `/preview/country-study101-why` + `/preview/country-hero-figma` redirect to `/preview/countries`. Later pages join by adding a `FAMILIES` entry. |
| Narrow route | `src/app/preview/countries/page.tsx` |
| Wide route | `src/app/preview/countries-2/page.tsx` |

Content slots (USA fixture first) land under the same folder — do not fork a second template per country.

---

## Preview

- Narrow (LOCKED): http://localhost:7100/preview/countries  
- Wide (ACTIVE): http://localhost:7100/preview/countries-2  
- Chrome click QC: hamburger + `#toggleBtn` must open  
