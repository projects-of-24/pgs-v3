# CV Ready Program — modular body map

Living map for the owner. Update only at **phase ends**, not every pixel tweak.

**Rule:** Preview first → owner Preview QC → live `/cvreadyprogram`.

---

## Two surfaces (do not confuse)

| Surface | URL | What it is |
|---|---|---|
| **Preview (QC mirror)** | `/preview/cvreadyprogram` | Same modular body as live. |
| **Live (cutover DONE)** | `/cvreadyprogram` | Purified modular React body. Hostinger `cvReadyProgramHtml` archive kept, **not served**. |

Chrome aesthetic polish / iPad = later shared pass.

---

## Responsive bands

| Band | Width | Status |
|---|---|---|
| Desktop | **>1366** | Body **LOCKED** (CR1–CR12 + CR-OPEN) |
| iPad | **601–1366** | Deferred / interim (mob plate) |
| Mobile | **≤600** | Body **LOCKED** (CR1–CR12 + CR-OPEN) |

Ignore Hostinger 767 for this modular family.

---

## Face bank (owner lock)

Ignore Figma-embedded course faces. Use locked bank only. Owner names face(s) **before each block pass**.

| Pair | `face_layout` |
|---|---|
| **3** | `program_full` |
| **4** | `internship` ← #purpleSelected **LOCKED** · Free #studyJam **CR9** |
| **5** | `promo` |
| **6** | `program_compact` |
| **9** | `program_compact_sm` |
| **10** | `program_compact_sm_desk` ← Discover **LOCKED** |
| **11** | `calendar_session_photo` ← #by target **LOCKED** |

Fixtures: `listFaceFixtures()` · flush later with real catalog.

---

## Section order (planned)

Figma desk `19050:11977` · **mob rebase** `19055:12530` (old mob `1312:7698` gone).  
Owner 2026-09-24 opening: new **hero video** first · Filter/Sort relocated · title+body+presets pushed down.

Gates: CR1–CR12 + **CR-OPEN** **LOCKED**. Live cutover **DONE**.

| Gate | Section | Desk node | Mob node | Notes |
|---|---|---|---|---|
| **P0–CR6d** | Hero → Discover | — | — | **LOCKED** (order: video first via CR-OPEN) |
| **CR7** | Photo bento | `19050:12204` | under `19055:12530` | **LOCKED** |
| **CR8** | #by target + Pair 11 rail | `19053:14303` | under `19055:12530` | **LOCKED** · mob cards pad to centered intro left |
| **CR9** | Free #studyJam | `19050:12137` | under `19055:12530` | **REMOVED** from shell · parked |
| **CR10** | How to make best use… | `19050:12221` | under `19055:12530` | **LOCKED** |
| **CR11** | OutroCta | `19050:12174` | under `19055:12530` | **LOCKED** |
| **CR12** | StudentSupportHub | `19050:12181` | under `19055:12530` | **LOCKED** |
| **CR-OPEN** | Hero video + filter relocate | desk video `19054:15075` · filter overlay `19055:12410` | video `19055:13342` · filter `19055:13357` | **LOCKED** · video no stroke · filter 25% black stroke · chips 14px · dual-col Filter · Sort hug |
| **CUTOVER** | Live Hostinger-free | — | — | **DONE** — `/cvreadyprogram` modular · Hostinger unhooked |

**Tags (owner lock 2026-09-24):** CR2 chips and CR3 groups are Figma sample labels. Real filter/sort/group tags come from each event/course `tags[]` in the backend pass; more tags will be added.

Shared reusable later: `OutroCta` · `SupportHub`.

---

## Gate log

| Date | Gate | Note |
|---|---|---|
| 2026-09-24 | **P0** | Empty preview shell `/preview/cvreadyprogram`; live Hostinger untouched. Faces 3/4/5/6 only. |
| 2026-09-24 | **CR1** | Hero — “Courses That Actually Count” + intro. Mob body 14→16 floor. No faces. Live untouched. |
| 2026-09-24 | **CR2** | Filter/Sort chips + yellow arrow hint. Visual `aria-pressed` only. Chip 11.2/12.8→16 floor. Live untouched. |
| 2026-09-24 | **CR3** | Grey panel · 12 black group labels with blue # icon. Mob 14→16 floor. Live untouched. |
| 2026-09-24 | **CR3 fix** | Groups are tags → buttons, one at a time, selected = inverse (owner pick). Mob 144px cap removed (clipped “Confidence Building”). Visual only until backend. |
| 2026-09-24 | **CR4** | Our Top PARTNERS · purple badge · 6 uni logos (fixture PNGs). Static strip, no marquee / no links. Live untouched. |
| 2026-09-24 | **CR5** | Yellow #purpleSelected rail · Pair 4 `internship` ×3 course fixtures. Figma courses-short ignored. Live untouched. |
| 2026-09-24 | **CR6** | Discover Our Programs · search (visual) · Pair 6 `program_compact` ×5 course fixtures. Live untouched. |
| 2026-09-24 | **CR6b** | Discover Figma deviation: mixed list Pair 6→5→4→3 · client search · Pair 3 Closes On. (superseded) |
| 2026-09-24 | **CR6c** | Discover simplified: Pair 6+9 · UT pager (mob 2×3 / desk 4×2). (superseded) |
| 2026-09-24 | **CR6d** | Discover = Pair 10 only · desk 243.456 · mob Pair 6 full · pager · equal card height · fixed tag start. Live untouched. |
| 2026-09-24 | **CR6d LOCK** | Discover locked after owner QC. Next = CR7 photo bento. |
| 2026-09-24 | **CR6d arrows** | Always show L/R under grid (was hidden when ≤1 page). Figma `17046:10661`. |
| 2026-09-24 | **FIGMA REBASE** | Remaining body source → desk `19050:11977` · mob `1312:7698`. Adds **#by target + Pair 11** before studyJam. |
| 2026-09-24 | **CR7** | Photo bento · cream stats `#009c70` + 2 photos · desk/mob from new nodes · mob type floor 16. Live untouched. |
| 2026-09-24 | **CR8** | #by target · Pair 11 rail · visual chips. Live untouched. |
| 2026-09-24 | **CR8 fix** | Figma recheck: centered intro (chips 440) · horizontal strip (not 2×2) · pager arrows Section 1 · desk `19054:15100` · mob `1318:8862`. |
| 2026-09-24 | **CR8 scroll** | Continuous strip · equal row height via flex stretch (max card) · highlights drag + hover-wheel · arrows scroll-by-page kept. |
| 2026-09-24 | **CR8 arrows** | Desk arrows 48→38.4 so pair fits Figma `19054:15100` 80.8 nav (was overlapping). |
| 2026-09-24 | **CR8 LOCK** | #by target locked after owner QC. Next = CR9 Free #studyJam (name face first). |
| 2026-09-24 | **CR9** | Free #studyJam · Pair 4 `internship` ×3 · yellow panel desk `19050:12137` · mob `1312:7937`. Live untouched. |
| 2026-09-24 | **CR9 LOCK** | studyJam locked. Next = CR10 howto (4 bar slides · tip + image each). |
| 2026-09-24 | **CR10** | Howto · 4 bars swap tip+image · slide 1 Figma · slides 2–4 lorem (owner). Live untouched. |
| 2026-09-24 | **CR10 height** | Stack tip panels + imgs → section height = tallest slide (footer no longer jumps). |
| 2026-09-24 | **CR10 LOCK** | Howto locked. Next = CR11 OutroCta (shared). |
| 2026-09-24 | **CR11** | OutroCta · shared `OutroCta` · desk `19050:12174` · mob `1312:8032`. Live untouched. |
| 2026-09-24 | **CR11 LOCK** | OutroCta locked. Next = CR12 SupportHub (shared). |
| 2026-09-24 | **CR12** | SupportHub · shared `SupportHub` · desk `19050:12181` · mob `1312:8039`. Live untouched. |
| 2026-09-24 | **Order fix** | Discover (CR6d) above #purpleSelected (CR5) on desk+mob — owner interchange. |
| 2026-09-24 | **CR9 remove** | Free #studyJam unmounted from preview shell (desk+mob). Module parked. |
| 2026-09-24 | **CR8 mob align** | Intro/tags stay centered; rail `padding-left: calc((100% − 270px) / 2)` so first Pair 11 card shares that left. |
| 2026-09-24 | **CR8 LOCK** | Mob align QC’d. |
| 2026-09-24 | **CR12 LOCK** | SupportHub locked with CR1–CR11. Body complete except opening rebase. |
| 2026-09-24 | **FIGMA OPENING** | Owner: video first · rest pushed down · no overlap. Desk `19054:15075` · mob `19055:12530`. |
| 2026-09-24 | **CR-OPEN desk** | Video 1322×533 · MP4 fixture · filter overlay · title+hint below. ≤1366 unchanged until mob pass. |
| 2026-09-24 | **CR-OPEN mob** | Video 270×418 · filter 2-col below · hint under title · `videoMobSrc` slot ready. |
| 2026-09-24 | **CR-OPEN mob QC** | Filter overlaps video −54px · Filter dual-col · Sort hug · chips 14px · filter 25% stroke · video no stroke · owner clip `desk.mp4`. |
| 2026-09-24 | **CR-OPEN LOCK** | Opening + full modular body locked on preview. Live Hostinger untouched until cutover GO AHEAD. |
| 2026-09-24 | **CUTOVER** | Owner cutover GO AHEAD — live `/cvreadyprogram` → modular shell (`live`). Hostinger `cvReadyProgramHtml` unhooked (archive kept). |
| 2026-09-24 | **Hint Figma** | Standalone hint → “select a pre selected group below.” · arrow down to presets (desk `19050:12043` · mob `19055:12561`). Dropped old “Filter out above”. |

### Opening (locked)

**Desk:** Video (no stroke) → filter overlay (25% stroke) → title/body → hint → presets → …

**Mob:** Video 270×418 (no stroke, top = `#toggleBtn`) → filter below overlap −54px (25% stroke · dual-col Filter · Sort hug) → title…

**Backend later:** `videoDeskSrc` / `videoMobSrc` slots ready for separate clips.

---

## Preview

- Lab: http://localhost:7100/preview/cvreadyprogram  
- Live (purified): http://localhost:7100/cvreadyprogram  
