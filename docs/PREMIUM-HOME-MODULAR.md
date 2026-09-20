# purplePREMIUM HOME — modular body map

Living map for the owner. Update only at **phase ends**, not every pixel tweak.

Route family: overview landing for #PurplePremium (not USMLE / PLAB / AMC pathway pages).

---

## Two surfaces

| Surface | URL | What it is |
|---|---|---|
| **Preview (QC lab)** | `/preview/purplepremiumhome` | Locked chrome + modular body (no black banner). |
| **Live** | `/purplepremiumhome` | **CUTOVER DONE**. Modular body. Hostinger HTML is not served. |

Legacy Hostinger HTML (`src/legacy/generated/purplepremiumhome/*`) kept as archive only — not served.

---

## Figma authority

| Band | Frame | Node | File |
|---|---|---|---|
| Desktop | `purplePREMIUM HOME` | `17052:7386` | `all-pages-v6` |
| Mobile | `purplePREMIUM HOME` | `366:4060` | `cas-v6---mobile` |

---

## Responsive bands

| Band | Width | Status |
|---|---|---|
| Desktop | **>1366** | Shell ready |
| Mobile | **≤600** | Shell ready |
| iPad | **601–1366** | Deferred (hero recall later via `pgs-ipad-hero-body`) |

---

## Section order (body)

Chrome = LOCKED. Do not rebuild.

| # | Block | Gate | Status |
|---|---|---|---|
| — | Empty preview shell | **P0** | **PASSED** |
| 1 | Hero headline + CTA | **H1** | **READY — owner QC** |
| 2 | Hero video card (Step into #purplepremium + play) | **H2** | **READY — owner QC** — still + desk/mob MP4 play in-frame |
| 3 | Path chooser (#USMLE / #PLAB / #AMC / Non-Medical) | **H3** | **READY — owner QC** |
| 4 | Aim / stats + roadmap card | **H4** | **READY — owner QC** |
| 5 | Dashboard unlock | **H5** | **READY — owner QC** |
| 6 | Quote / learner word | **H6** | **READY — owner QC** desk+mob · shared `learner-words` |
| 7 | University discovery | **H7** | **READY — owner QC** desk+mob · logos props/fixture (CMS table W1 later) |
| 8 | Expense request | **H8** | **READY — owner QC** — shared `premium-expense` import |
| 9 | Why #purplepremium | **H9** | **READY — owner QC** desk+mob · ticker marquee |
| 10 | Outro CTA | **H10** | **READY — owner QC** — shared `outro-cta` import |
| 11 | Support hub | **H11** | **READY — owner QC** — shared `support-hub` import |
| 12 | #Pgs picks | **H12** | **READY — owner QC** — shared `pgs-picks` import · CMS `pgs_picks` |
| — | Gap analysis | **GAP** | After Figma-to-code done · before LOCK |
| — | Motion | last | After visual lock |
| — | Live Hostinger-free cutover | **CUTOVER** | **DONE** — `/purplepremiumhome` modular; Hostinger unhooked |

**Mobile width:** Figma inset first (H1 opening = 151 centered). 85% rail only if owner says too edgy.

**H1 a11y note:** Figma CTA/hint/mobile small type lifted to `--pgs-type-floor` 16px. Black button look unchanged.

**No black preview banner (owner lock):** body uses shared `--pgs-premium-shell-pull` clamp so content starts near closed toggle.

**Own CSS only:** feature CSS under `src/features/premium-home/`. Do not patch Hostinger `style.css` / `responsive.css` / theme JS for this body. Read Hostinger / junior as DNA only — **never copy** markup, classes, or assets into this build. Figma → owned assets under `public/assets/img/premium-home/`.

**H2 scrub (2026-09-15):** poster is Figma-exported `hero-video.jpg` only. Hostinger `premium-3.png` desk copy removed.

---

## Shared modules (import, do not copy)

| Block | Folder | Notes |
|---|---|---|
| A word from Our learners | `src/features/shared/learner-words` | **Shared modular.** Import on any page. Fixed photo/bio; black body grows to fit quote. Home H6 first. |
| Expense request | `src/features/shared/premium-expense` | Same copy as USMLE expense |
| Ready to get started? | `src/features/shared/outro-cta` | Visual CTA only until popup pass |
| Call and email hub | `src/features/shared/support-hub` | Locked email spelling |
| #Pgs picks | `src/features/shared/pgs-picks` | CMS surface `pgs_picks` when wired |

Hero through Why stay page-local in `src/features/premium-home`.

---

## DEFERRED

| Item | Note |
|---|---|
| Live cutover | **DONE** — Hostinger archive kept, not served |
| iPad hero | Recall `pgs-ipad-hero-body` after mobile hero QC |
| Popup / CTA destinations | Visual-only until popup pass |
| Entitlement CTA wires | Backend later · one control at a time |
| CMS display images (desk/mob) | Later image pass — H2 frame stays Figma fixture until then |
| Play opens CMS MP4 | Later — fixtures wired now; CMS columns ready |
| Motion | After visual lock |
| Type floor sweep | Final-draft only · do not mid-build |
| Other pathway play cards | Separate pass (not this page) |

---

## Backend Kanban

### CONNECTION MAP (W1 videos)

```text
Admin Media upload (mp4 ≤10MB) → media_assets (marketing-public)
Admin module premium_settings (key=video)
  → desktop_video_asset_id
  → mobile_video_asset_id
Preview/Live H2 display image → still Figma fixture (not CMS yet)
Play → visual only until W3
```

### DAY-1 SECURITY (W1)

| Risk | Measure |
|---|---|
| Public write | Existing RLS: public reads published only; writes need `content.manage` |
| Forge media path | UUID FK only to `media_assets` |
| Delete media in use | media DELETE checks both new video columns |

### KNOWN GAPS

| Gap | Later |
|---|---|
| Desk/mob display images in CMS | Image pass — keep H2 frame + fixture until then |
| Play uses uploaded MP4 | **W3** |
| USMLE / other pages | Separate pass |

### Assets / CMS links

| What | URL |
|---|---|
| Upload MP4 library | `/admin/media` |
| Attach desk + mobile videos | `/admin/content/modules/premium_settings` → edit row **video** |
| Preview H2 (image still fixture) | `/preview/purplepremiumhome` |

MP4: `video/mp4` in **Public marketing** bucket, **max 10 MB** per file.

---

## Gate log

| Date | Gate | Note |
|---|---|---|
| 2026-09-15 | **P0** | Empty preview shell `/preview/purplepremiumhome`; live Hostinger untouched. |
| 2026-09-15 | **H1** | Hero headline + Set Up a Quick Call CTA (visual only). Panel deferred to H2. |
| 2026-09-15 | **H2** | Dark hero video card + play + yellow click cue. Play visual only. Not mauve-panel family. |
| 2026-09-15 | **H2 SCRUB** | Poster → Figma still only. Removed Hostinger `premium-3` desk copy. Zero hangover lock. |
| 2026-09-15 | **W1** | `premium_content_settings` desk+mob MP4 columns + admin fields. Display image fixture kept. |
| 2026-09-15 | **H2 PLAY** | Fixture desk/mob MP4 in same card frame. Play / Close / Escape. CMS swap later. |
| 2026-09-15 | **H3** | Path chooser — start-now photo + USMLE/PLAB/AMC/non-med links. Figma assets only. |
| 2026-09-15 | **H4** | Aim / stats (40% · 3x · 100% · 10/10) + black #PGS roadmap card. |
| 2026-09-15 | **H5** | Dashboard unlock — journey mapped + Advantage bar + lime unlock card. |
| 2026-09-15 | **H5 desk** | Stroke removed; still hang-out + node export crop; overflow/z-index skill note. |
| 2026-09-15 | **H5 mob** | Phone stack `366:4322` — mob still, overlay row, z-index unlock > advantage. |
| 2026-09-15 | **H5 mob pic** | Separate `__shot-mob` + `dashboard-shot-mob.jpg` (`366:4325`). Desk/mob never mixed. |
| 2026-09-15 | **H6 desk** | Shared `learner-words` (`17052:8738`). Fixed card / quote / bio heights. Mob deferred. |
| 2026-09-15 | **H6 mob** | `366:4375` snap-scroll 231×430 cards · fixed quote/bio · full quote on phone. |
| 2026-09-15 | **H7 desk** | University discovery `17052:8319` — copy, 4×9 logo pills, paths, collage export. Mob deferred. |
| 2026-09-15 | **H7 mob** | `473:5530` — vertical checked bullets, logo pills, mob collage, logos via props/fixture (CMS table W1 later). |
| 2026-09-15 | **H8** | Shared `premium-expense` import after H7 (same module as USMLE/PLAB/AMC). |
| 2026-09-15 | **H9 desk** | Why #purplepremium `17052:8371` — reasons, &ALSO, NO/VS/YES, ticker. Mob deferred. |
| 2026-09-15 | **H9 mob** | `371:5370` — stacked why, 2-col reasons, NO→VS→YES, YES behind green, ticker marquee flush. |
| 2026-09-15 | **H10–H12** | Shared pull-in after Why: `outro-cta` → `support-hub` → `pgs-picks` (CMS courses / fixture). |
| 2026-09-15 | **CUTOVER** | Live `/purplepremiumhome` → modular shell (`live`). Hostinger HTML unhooked (archive kept). |
