# Header / shared chrome — next phase (living)

Owner conversation lock **2026-09-25**. Agents: read this + skill `pgs-header-chrome-phase` before any chrome edit. **No code until owner `GO AHEAD`.**

Companion skills: `pgs-modular-public-chrome` · `pgs-propose-before-code` · `pgs-never-invent` · `pgs-master-workflow` · `figma-modular-own-css`.

---

## Plain English — what we are doing (read this first)

### What went wrong last time (owner pain)

1. Work was called “done.”
2. Owner looked in the code and still saw **DSIH** (`dangerouslySetInnerHTML`) mounting the header as a **big HTML string**.
3. That meant the real mount path was still the **old string chrome**, even if React files or href tweaks existed on the side.
4. So “done” was **not** “header is a real React component every page uses.”

### What “done” means this time (definition of done)

| Done means | Not done |
|---|---|
| Shared header (and footer when in scope) is a **React component** with **owned CSS** | Only editing `public-header.html` and still injecting it with DSIH |
| Pages **mount** `<PublicHeader />` / `<PublicFooter />` (or one shared frame) | React files exist but **nothing imports them** — still DSIH |
| Nav matches owner Figma IA | Quiet reuse of old Hostinger nav labels |
| Safe-area: notch pushes **header → strip/toggle → body → footer** together | Only header padded; hero start line looks wrong |
| Lab QC at `/preview/header`, then sitewide wire | “Looks fine in one file” with live pages still on string chrome |

**DSIH** = React’s `dangerouslySetInnerHTML` — paste a raw HTML string into the page. Fine for some legacy bodies short-term; **not** the end state for shared chrome.

**Hostinger CSS** (`style.css` / `responsive.css`) stays in `layout.tsx` as global landlord until a page opts out. Dropping chrome DSIH ≠ unlinking Hostinger. **Unlink = page-by-page during that page’s final UI audit** (OWN-* gates) — never one-shot sitewide delete.

### CSS strategy (owner 2026-09-25 → H1c → H6a-CSS → OWN-0) — how we proceed

**Streamlined order (locked):** **Hostinger/legacy reference → CSS pass (owned file) → then UI.** Do not invent bar/dropdown CSS from scratch. Do not build markup before the CSS recipe for that block exists.

**Two different jobs — do not mix:**

| Track | What | When |
|---|---|---|
| **A — Own CSS via Hostinger port** (H gates) | Read proven Hostinger / `legacy-header-breakpoints` → **`pgs-header-*` + `public-header.css`**. Figma = visual authority; Hostinger = implementation reference. Never Hostinger class names on React chrome. | **H1c** → H2+ → H-R |
| **B — OWNED MODULAR CHROME CSS + page unlink** (OWN-*) | New owned CSS for shared chrome pieces (header → toggle/strip → footer), then per-page body UI flush. **Unlink Hostinger page by page** as owner does that page’s **final UI audit**. Same shape as React body modular. | After H6a-CSS; **OWN-0 locked**; next **OWN-H** |

**Answer in plain English:**

- **Yes — own CSS**, ported from Hostinger/legacy (don’t invent).
- **CSS pass first**, then UI.
- **No** sitewide Hostinger delete mid H2–H7.
- **Unlink page by page** during final UI audit (not one breaker pull for the whole site).

#### Zoom bake contract (OWN-0 — locked 2026-09-25 · tightened OWN-F)

Hostinger sets `html { zoom: 0.9 }` in `public/assets/css/style.css`. That is why the live site looks “correct” and a raw port looks zoomed out.

| Token / rule | Value |
|---|---|
| **Hostinger zoom factor** | `0.9` (`--pgs-hostinger-zoom: 0.9`) |
| **Port formula** | `owned_px = design_css_px × 0.9` |
| **Must bake (all of these)** | `font-size` · `width` · `height` · `margin*` · `padding*` · `gap` · `top/right/left/bottom` (when px) · `border-radius` · `border-width` (px) |
| **Do not bake** | Unitless `line-height` (e.g. `1.4`) · `%` flex columns · `vw`/`vh` mid terms in `clamp` |
| **Do not** | Set `html { zoom: 1 }` without baking **all** px lengths above |

Incomplete bake (fonts only) = visual drift. OWN-F + OWN-H retightened to full box/spacing bake.

#### OWN-* gates (chrome CSS cutover + page unlink)

| Gate | Piece | Job | Status |
|---|---|---|---|
| **OWN-0** | Contract | Zoom bake + OWN order in docs/skills; **no visual CSS** | **Done** |
| **OWN-H** | Header + drawer | Single link [`pgs-owned-header.css`](../src/features/shell/pgs-owned-header.css): reset + recipes + `zoom:1` on gated React header + baked ×0.9 tokens. Lab: `/preview/header`. | **Done** (lab); more pages at H-R |
| **OWN-T** | Toggle / strip | Single link [`pgs-owned-strip.css`](../src/features/shell/pgs-owned-strip.css): `#toggleBtn`, strip, univMeet, body pull, sidebar origin. Wired via owned-header + legacy-header-breakpoints + `public-strip.ts`. Bake when OWN-H zoom:1. | **Done** |
| **OWN-F** | Footer | Single link [`pgs-owned-footer.css`](../src/features/shell/pgs-owned-footer.css): shared `.footer-bg` bands + Hostinger paint. **Full ×0.9 bake** (font + width/height + margin/padding/gap/radius). | Built; **unlinked** |
| **OWN-UNLINK** | Workshop | Stop importing OWN-H/T/F barrels on runtime paths. Files stay for block-by-block pass. H6a reset stays linked (`reset on`). Index: [`OWNED-CHROME-UNLINKED.md`](../src/features/shell/OWNED-CHROME-UNLINKED.md). | **Done** |
| **OWN-T** | Toggle / strip | Port `#toggleBtn` / strip → owned CSS; link with chrome pages | After OWN-H QC |
| **OWN-F** | Footer | Port → owned footer CSS | After OWN-T QC |
| **OWN-BODY** | Page bodies | Per-page UI flush (`pgs-page-ui-flush.css` pattern) **+ unlink Hostinger for that page** during owner final UI audit | After chrome pieces owned |
| **OWN-CLEAR** | Residual | Unlink Crafto leftovers sitewide only after enough pages opted out; keep Bootstrap/icons until deliberate swap | Last |

**H6a-CSS (2026-09-25):** stop override wars. Authority files:

| File | Job |
|---|---|
| [`src/features/shell/pgs-owned-header.css`](../src/features/shell/pgs-owned-header.css) | **OWN-H single link** — imports reset + owned-strip + **owned-footer** + public-header; kills zoom on gated React header; **full** ×0.9 bake |
| [`src/features/shell/pgs-owned-strip.css`](../src/features/shell/pgs-owned-strip.css) | **OWN-T single link** — `#toggleBtn` + strip + univMeet + body pull + sidebar origin; bake with OWN-H |
| [`src/features/shell/pgs-owned-footer.css`](../src/features/shell/pgs-owned-footer.css) | **OWN-F single link** — shared footer; full ×0.9 bake (not fonts only) |
| [`src/features/shell/pgs-header-chrome-reset.css`](../src/features/shell/pgs-header-chrome-reset.css) | Header bar equal inset + `#drawer` recipe; kills Hostinger `.drawer` / scroll jump |
| [`src/features/shell/public-header.css`](../src/features/shell/public-header.css) | Visual recipes (`pgs-header-*`) |
| [`src/features/shell/pgs-page-ui-flush.css`](../src/features/shell/pgs-page-ui-flush.css) | **Copy/template** for per-page body UI flush (import or copy into `src/features/<page>/`) |

**Link owned header:** `import "@/features/shell/pgs-owned-header.css"` (via `PublicHeader`).  
**Link owned strip:** `import "@/features/shell/pgs-owned-strip.css"` (also via owned-header + `legacy-header-breakpoints` + `public-strip.ts`). Legacy DSIH pages still get reset via `legacy-header-breakpoints.css` `@import` until H-R.

**H1 polish / H1c:** `#me` / `#studyAbroad` / login / drops = owned `pgs-header-*` only (no Hostinger `btn` / `btn-trapsparent` / `btn-login` / `btn-toggle-mobile`).

---

## Site status (finish-line frame)

- Public modular work is **~90% done**.
- Remaining: **UI check / draft**, **header chrome rebuild**, **missing link destination pages**, then fluid polish **page-by-page**.
- Most missing header destinations are **program-family** pages → reuse existing **program base template**, then link.
- Pages **without** a template yet (e.g. **join #PGS**, **contactCounsellor**) → owner shares Figma → build modular like other pages → then swap stub hrefs.
- **Responsive** = prefer `clamp` / fluid over hard `px` for layout that must work on 16″ Mac, 27″/32″ desk, **and** Windows laptops (often look “zoomed out” when everything is hard px tuned to one monitor).

---

## DSIH / mount audit (chrome)

| Layer | Today | This phase |
|---|---|---|
| Shared header/footer markup | `public-header.html` / `public-footer.html` | Become React `PublicHeader` / `PublicFooter` (same visual job) |
| Mount on ~40 modular pages | String build → **DSIH** | React mount → **drop chrome DSIH** |
| Modular chrome CSS | `globals.css` **PGS MODULAR PUBLIC CHROME** + `legacy-header-breakpoints.css` | Reopen for this phase; keep bands; add safe-area cascade |
| Page bodies | Many already React modular | Out of scope except shell pull token if safe-area changes |
| Hostinger CSS still in layout | Reference debt | **Not** this gate’s delete |

---

## Design intent (owner 2026-09-25 — corrected)

**Not a brand-new header.** Same old PGS header chrome (logo, pill bar, bell, login/avatar). Updated with **more nav labels + dropdowns**, a **new notification dropdown UI** (text list that did not exist before), and a **login → profile pic → Logout** flow.

### Figma frames (same component, interaction versions)

File: [all-pages-v6](https://www.figma.com/design/7WFrAbx3cvXReZxtTiQ76r/all-pages-v6?node-id=0-1)

| Node | Name | Use for |
|---|---|---|
| **`19075:13853`** | logged in **default** — desktop | Closed bar: avatar, no menus open |
| **`19073:13328`** | logged in **expanded** — desktop | Nav dropdowns open + avatar **Logout** menu |
| **`19070:15287`** | logged out + **two blocks expanded** — desktop | **Login** button; `#me` “Upcoming” list + **notification** panel (Clear All + rows with text) |
| **`19072:15812`** | header **ipad** | Compact: logo, `#feed`, bell, login, hamburger |
| **`19073:13319`** | header **mobile** | Logo, `#feed`, bell, login, menu |

Build **one** React header; open/closed states from these three desk versions. iPad/mob from their frames (iPad ≈ mobile header pattern).

### Behavior map (source of truth)

| Control | Behavior | Links now |
|---|---|---|
| **Logo** | Home — **no change** | Existing home |
| **`#feed`** | Same as today — **no behavior change** | `/student/dashboard` |
| **`#purplePremium`** | Dropdown | OVERVIEW → `/purplepremiumhome`; STEM/MBA → `/purplenonmedical`; USMLE → `/purpleusmle`; AMC → `/purpleamc`; **Short Term Abroad** → stub (owner builds later). **PLAB not in Figma menu** |
| **`#cvReadyPrograms`** | Dropdown | **Admin/CMS-managed list** (add / change / remove program or page links — e.g. later PhD). FE now: shell + known starters (**explorePrograms** → `/cvreadyprogram`; **freeMasterClass** stub). Live edit + **audit logs** = backend later |
| **`#cvForMedical`** | Dropdown (USMLE Rotation **moved here**) | **Admin/CMS-managed list** (add / remove programs). FE now: shell + starters (**USMLERotation** → `/usmlerotation`; Surgery Week stub). Live edit + **audit logs** = backend later |
| **`#me`** | **Dropdown only — not a page link** | Lists **courses/events admin selects** for “me tab” in **backend/CMS**. FE: dropdown shell + fixtures now; **CMS wire = later gate** |
| **`#studyAbroad`** | Dropdown | **contactCounsellor** + **admissionToolKit** — stubs; owner links when pages exist |
| **`join #PGS`** | CTA | Stub until owner Figma page |
| **Bell** | Opens **notification dropdown** (new UI with text rows; was missing before) | Panel UI now; full notifications domain can stay existing route / later |
| **Logged out** | **Login** button (updated UI) | Existing login |
| **Logged in** | Profile **photo** from student profile; click → **Logout** only | Logout action |

---

## Nav → route / data map (H0)

| Label | Type | Now | Later |
|---|---|---|---|
| Logo | link | home | — |
| `#feed` | link | `/student/dashboard` | unchanged |
| Premium → OVERVIEW / STEM / USMLE / AMC | links | built routes | — |
| Premium → Short Term Abroad | stub | placeholder | owner page |
| CV Ready → explorePrograms | link (starter) | `/cvreadyprogram` | Admin may change/replace via CMS |
| CV Ready → freeMasterClass / Semester / HARVARD / future (e.g. PhD) | CMS rows | stubs / fixtures | Admin add/change/remove + **audit logs** |
| CV Medical → USMLERotation | link (starter) | `/usmlerotation` | Admin may change/replace via CMS |
| CV Medical → Surgery Week… / future programs | CMS rows | stubs / fixtures | Admin add/change/remove + **audit logs** |
| `#me` items | **CMS list** | fixture “Upcoming” rows in UI | Ops/CMS pick courses/events + **audit logs** |
| studyAbroad → both items | stubs | placeholders | owner pages |
| join #PGS | stub | placeholder | owner page |
| Notifications | dropdown UI | Figma panel + fixtures / wire if feed exists | full inbox domain |
| Login / avatar / Logout | auth UI | login · profile image · logout | — |

**Do not** treat `#me` as `/student/profile`. Profile photo lives on the **login/avatar control**, not under `#me`.

**Open:** PLAB — drop from Premium menu to match Figma (route page can stay).

---

## Safe-area / Dynamic Island (correct framing)

- Phone notch / Dynamic Island → sticky header gets `padding-top: var(--pgs-safe-top)`.
- **Everything rides the same push:** header → strip → closed `#toggleBtn` → body → footer.
- Proposed token: `--pgs-safe-top: max(24px, env(safe-area-inset-top))` + `viewport-fit=cover`. **Open:** confirm 24px floor.

### Body pull (aesthetic — not “toggle chasing”)

Closed `#toggleBtn` **height** is a **visual ruler**. Shells use negative `margin-top` (e.g. `--pgs-premium-shell-pull` / `.minus-5`) so the **hero composition start** lines up beside that chrome — for aesthetics.

`position` / `z-index` on the pill = paint/layer. Pull = where the page art begins.

If safe-area pads the header, shell pull math must include the same token so the **hero start line** stays correct.

Who still uses the pull: almost all modular preview shells (About, Premium family, CV Ready, Uni Tieup, Events, Finance, Feed, Error 404, …) + country `minus-5` sections.

---

## iPad strategy (owner)

- **Header on iPad (601–1366) = mobile header** (Figma ipad frame is already compact)
- **Body on iPad = desktop body** (content stays fluid/responsive)
- Matches finish-line thinking; avoid inventing a third header unless Figma demands it

---

## Hard `px` vs fluid (UI pass later)

- Sitewide hard-`px` purge = **no**. ~259 feature CSS files have hard `px`; many are fine (1px borders, 16px type floor, locked Figma controls).
- **Page-by-page** during UI check: if it looks zoomed-out on Windows laptop / narrow desk, fluidize **layout & type that should breathe** with `clamp`.
- New Figma pages: prefer clamp from day one.
- Densest folders to watch in QC: purple-events (face cards), usmlerotation, premium-*, programs-courses, student-feed, cvready, about, scholarship.

---

## Accidental WIP (park / rewrite)

Started before this IA audit — **do not treat as finished**:

- `src/features/shell/header-nav.ts` (wrong: treated `#me` as profile link)
- `src/features/shell/public-header.tsx` / `public-footer.tsx` / `public-strip.css`
- Partial href edits in `src/legacy/pages/public-header.html`

**Open:** keep and rewrite vs delete and start clean on `GO AHEAD`.

Lab already exists: `/preview/header` (`header-preview-shell.tsx`).

---

## Gates — phase by phase (not all at once)

Each gate: propose → `GO AHEAD` → implement → `/preview/header` QC → stop.

| Gate | What | Not in this gate |
|---|---|---|
| **H0** | This map locked; open decisions answered | Code |
| **H1** | Desk default bar labels | — |
| **H1b** | **Desk bar UI pass** — Figma closed bar; **no hamburger on desk**; no dropdowns | Menus |
| **H1c** | **Desk CSS pass** — Hostinger/Figma → owned tokens + `.pgs-header-drop*` recipe; **no new UI** | Dropdown markup |
| **H2** | Dropdowns — **one-by-one UI** mounting owned drop recipe (**Premium done** in lab) | All menus at once |
| **H2a** | Premium fixed-panel experiment — abandoned | — |
| **H3** | **`#me` dropdown shell** — Figma “Upcoming” UI + **fixtures** (**lab**) | Live CMS/backend picks + audit |
| **H4** | **Notification dropdown** UI (text rows, Clear All per Figma) — fixtures (**lab**) | Full notifications product rebuild |
| **H5** | **Login / avatar / Logout** — logged-out Login; logged-in profile pic → Logout (**lab**) | — |
| **H6** | **iPad + mobile** headers from Figma; iPad = mobile header pattern | — |
| **H6a** | **iPad compact bar + hamburger drawer extras** (Figma `19094:13341` — join / studyAbroad / accordions / `#me` Upcoming; keep 18px labels; smaller chrome) — **lab** | Mobile polish (H6b) |
| **H6a-CSS** | **Owned chrome CSS authority** — `pgs-header-chrome-reset.css` beats Hostinger `.drawer` / scroll-lock fights; equal 40px bar inset; drawer translateX only. Sister template `pgs-page-ui-flush.css` for page UI flush. Hostinger `style.css` stays linked. | Full site-clear (later) |
| **OWN-0** | **Zoom bake + OWN-* contract** (docs/skills only; no visual CSS) | — |
| **OWN-H** | **`pgs-owned-header.css`** single link; zoom kill + ×0.9 bake on gated React header (lab `/preview/header`) | Toggle/footer; more pages at H-R |
| **OWN-T** | **`pgs-owned-strip.css`** — toggle + strip + univMeet; bake with OWN-H | Footer OWN-F |
| **OWN-F** | **`pgs-owned-footer.css`** — footer; **full** ×0.9 bake (margin/pad/w/h/gap/radius + font) | OWN-BODY |
| **OWN-T** / **OWN-F** | Toggle/strip then footer owned CSS | Body flush |
| **OWN-BODY** | Per-page UI flush **+ unlink Hostinger for that page** (owner final UI audit) | Sitewide residual clear |
| **OWN-CLEAR** | Residual Hostinger unlink after enough pages opted out | — |
| **H7** | **Safe-area** cascade (header → strip → body pull token → footer) | — |
| **H-R** | Mount React chrome on modular pages; **drop chrome DSIH** | Hostinger CSS delete (use OWN-* unlink instead) |
| **Later — CMS nav** | Admin manage **`#cvReadyPrograms`**, **`#cvForMedical`**, **`#me`** (add/change/remove program/page/event links) with **audit logs** (`audit_events`) | Not in H1–H-R |
| **Later — Marquee** | Top **announcement bar / marquee** (legacy `marquee_tbl` → `site_notices`): admin **add / edit / enable / disable / remove** promo lines that scroll above the header. **Only after H-R chrome rework is done** — not inside H1–H7 | Do not build during current header gates |
| **Later** | Stub destination pages (join #PGS, contactCounsellor, freeMasterClass, Short Term Abroad, …) | — |

**Definition of done for the chrome rebuild:** H-R complete (no chrome DSIH) + H1–H7 QC’d. CMS nav lists (`#me` / CV menus) finish in a later backend gate without reopening “is chrome done?”

---

## Owner decisions log

| # | Topic | Status |
|---|---|---|
| 1 | Old header chrome + more links/dropdowns (not full redesign) | **Locked** |
| 2 | Three desk interaction frames + ipad + mobile nodes above | **Locked** |
| 3 | `#me` = CMS courses/events dropdown, **not** profile page | **Locked** |
| 4 | Notification dropdown = new text UI | **Locked** |
| 5 | Login → profile pic → Logout | **Locked** |
| 6 | contactCounsellor, admissionToolKit, join #PGS, Short Term Abroad, freeMasterClass = later | **Locked** |
| 7 | explorePrograms + USMLERotation = **starters**; both CV menus + `#me` = **CMS admin lists** (add/change/remove) + **audit logs** later | **Locked** |
| 8 | `#feed` + logo unchanged | **Locked** |
| 9 | Phase-by-phase gates H1→H-R | **Locked** |
| 10 | iPad: mobile header + desktop body | **Locked** |
| 11 | Fluid/clamp; page-by-page px in UI pass | **Locked** |
| 12 | Safe-area pushes whole stack; body pull = aesthetic ruler | **Locked** |
| 13 | PLAB remove from Premium menu? | **Open** |
| 14 | Safe-area floor 24px? | **Open** |
| 15 | WIP files keep+rewrite vs delete | **Open** |
| 16 | Header: Hostinger ref → **CSS pass** → then UI (no invent-from-scratch CSS) | **Locked** (H1c) |
| 17 | Top **marquee / announcement bar** — admin add/remove later; **after chrome H-R** | **Locked** (deferred) |
| 18 | H6a iPad first: compact bar + drawer extras from `19094:13341`; keep font sizes; style smaller than Figma board | **Locked** |
| 19 | H6a-CSS: owned header+drawer CSS is authority on gated/legacy pages; Hostinger stays linked; `pgs-page-ui-flush.css` copy for page UI flush | **Locked** |
| 20 | **OWN-0:** owned modular chrome CSS; **unlink Hostinger page-by-page** during final UI audit; zoom bake `owned = Hostinger_px × 0.9` | **Locked** |
| 21 | **OWN-H:** link `pgs-owned-header.css`; gated React header pages `zoom:1` + baked tokens (20→18, etc.); lab `/preview/header` | **Locked** |
| 22 | **OWN-T:** link `pgs-owned-strip.css`; `#toggleBtn` + strip + univMeet owned; bake when OWN-H zoom:1 | **Locked** |
| 23 | **OWN-F:** link `pgs-owned-footer.css`; zoom bake = **all px lengths** (not fonts only); unitless line-height / % untouched | **Locked** (file built) |
| 24 | **OWN-UNLINK:** do not import OWN barrels until block QC + OWN-LINK; build unlinked → pass → link page-by-page; H6a reset stays on | **Locked** |
| 25 | **OWNED-CSS-LAB:** main barrel `pgs-owned-css.css` + generic empty `/preview/owned-css` (`?block=`); not page-specific | **Locked** |
| 26 | **BAKE-H1:** desk bar ×0.9 in `blocks/pgs-owned-bake-h1-desk.css`; lab `?block=header` + real PublicHeader fixture | **Retired** (row 27) |
| 27 | **A + B / SPLIT:** ship on current CSS; owned CSS = **1:1 copy** of Hostinger `style.css` + `responsive.css`, same numbers, `html{zoom:0.9}` kept on (owned file). **No ×0.9 bake** — supersedes rows 20–23 bake rule. 15 split passes in `src/features/owned-css/split/` (plan in owned-css README). Dead + broken rules → `split/parked/` with comments. vendors/icon stay linked. Breakpoint moves in UI pass only. | **Locked** |
| 28 | **P13 mobile band:** owned copy of style.css 767px mobile block wrapped at `max-width: 600px` (owner: ditch Hostinger 767; bands ≤600 / 601–1366 / >1366). Rules verbatim. Known UI change: 601–767px now gets iPad/desk rules. Nested inner queries untouched (listed in README). | **Locked** |
| 29 | **P15 responsive.css:** 767→600; 575/991/1199/others verbatim; broken tail parked unimported; 4 live files 40–43. | **Locked** |
| 30 | **P1–P5 SORT:** Fable audit found 27 fully-shadowed + ~53 over-kept utilities; **Option B** — leave as-is until OWN-LINK (no park/move). 0 wrongly parked. | **Locked** |
| 31 | **OWN-LINK QC order:** chrome **header → toggle → footer → univMeet → then pages one by one**. Split P1–P15 complete, unlinked. No ×0.9 bake. Skills: `pgs-header-chrome-phase`, `pgs-modular-public-chrome`. | **Locked** |
| 32 | **OWN-LINK-H:** `/preview/header` only loads `/preview/owned-split` (concatenated split barrel) **instead of** Hostinger `style.css` + `responsive.css`. Vendors + icon stay. Live pages and other labs stay on Hostinger. | **Done** (lab) |
| 33 | **Header iPad split:** `801–1366` = Figma `19072:15812` (logo · `#feed` · join #PGS · bell · login · hamburger). `601–800` compact bar (join #PGS in the menu, not on the bar). | **Locked** |
| 34 | **Desktop + iPad header QC (2026-09-26):** `>1366` full bar, no hamburger, outer margin 40/40. `601–1366` bar fills the width (no zoom `100vw` right gap), inset 40/40. Hamburger stays in the bar. Menu is one recipe on both iPad bands: fixed 340px, opens under the avatar like the logout card, right edge on the hamburger, stroke + notification shadow `8px 8px 0 #000`, `#me` and `#studyAbroad` open. Only join #PGS differs (on the bar and out of the menu at `801–1366`; in the menu and off the bar at `601–800`). | **Locked** |
| 35 | **Four breakpoints:** above 1366 desktop · `801–1366` wide iPad · `601–800` compact iPad · 600 and below mobile. Middle two reserved for iPad. Numbers in `pgs-breakpoints.ts`. Responsive asks = one Fable plan across all four bands, then one build. | **Locked** |
| 36 | **Header + all dropdowns visually locked.** Saber stroke try failed owner QC 2026-09-26 and was removed. Resting borders and hard shadows stay. | **Locked** |
| 37 | **#univMeet + search owned CSS (gate 1):** keep current look. Strip uses `.pgs-univmeet` / `.pgs-search` (`pgs-univmeet-search.css`). Drawer search uses the same owned input class. `search-box` + `search-control` stay as autocomplete hooks only. No visual invent. Search results list deferred. | **Preview QC** |
| 38 | **Search field restyle reverted (2026-09-27).** Owner: locked search bar UI must stay. Figma `search bar UI` is the results card when search happens — not a field restyle. | **Reverted** |

---

## Anti-regression checklist (before calling chrome “done”)

- [ ] Owner can open a live modular page source/DOM and see **React header**, not only a giant `__html` string for chrome
- [ ] Grep: chrome mount path no longer `dangerouslySetInnerHTML` for header/footer (bodies may still differ)
- [ ] `/preview/header` matches Figma desk default + one expanded state
- [ ] `#me` is a dropdown shell, not a profile href
- [ ] Notch/safe-area: header, strip, body start, footer move together
- [ ] Stubs labeled; no fake links for join #PGS / studyAbroad pages / Short Term Abroad
