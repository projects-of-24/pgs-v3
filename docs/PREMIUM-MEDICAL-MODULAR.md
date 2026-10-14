# Premium medical — modular body map

Living map for the owner. Update only at **phase ends**, not every pixel tweak.

Test page: **#premiumUSMLE**. PLAB and AMC copy this template after QC. They do not get their own design.

Non-medical is a different template. Not this pass.

Branch: shared public modular lane until owner splits.

---

## Two surfaces

| Surface | URL | What it is |
|---|---|---|
| **Preview lab-2 (north star)** | `/preview/purpleusmle-2` | **All three bands QC passed** (2026-10-03). Same tree as live after Gate 1. Skill: `pgs-ipad-modular-body-pass`. |
| **Preview (lab-1, ignore)** | `/preview/purpleusmle` | Parked for lab-2. Do not use for new iPad QC. |
| **Live** | `/purpleusmle` | **LAB-2 CUTOVER DONE** (2026-10-03 Gate 1). React chrome + `PremiumUsmle2Shell` + OWNED_SPLIT. Typo `/purpleusme` redirects here. CMS key `purpleusme`. |
| **Preview PLAB lab-2** | `/preview/purpleplab-2` | Same tree as live after Gate 2b. |
| **Live PLAB** | `/purpleplab` | **LAB-2 CUTOVER DONE** (2026-10-03 Gate 2b). React chrome + `PremiumPlab2Shell` + OWNED_SPLIT. |
| **Preview AMC lab-2** | `/preview/purpleamc-2` | Same tree as live after Gate 3b. |
| **Live AMC** | `/purpleamc` | **LAB-2 CUTOVER DONE** (2026-10-03 Gate 3b). React chrome + `PremiumAmc2Shell` + OWNED_SPLIT. |

PLAB `/purpleplab` and AMC `/purpleamc` use this template. Words wait for CMS.

---

## Figma authority

| Band | Frame | Node | File |
|---|---|---|---|
| Desktop | `#premiumUSMLE` | `17055:12362` | `all-pages-v6` |
| Mobile | `#premiumUSMLE` | `433:4374` | `cas-v6---mobile` |

Copy targets (not this gate): desktop `#premiumPLAB` `17055:15451` · `#premiumAMC` `17055:16290`. Mobile `#premiumPLAB` `466:4741` · `#premiumAMC` `466:6494`.

---

## Responsive bands

| Band | Width | Status |
|---|---|---|
| Desktop | **>1366** | Hero active |
| Mobile | **≤600** | Hero active |
| iPad | **601–1366** | Saved phone-card copy (406×630). Not a live ×1.4. |

iPad hero recall (`pgs-ipad-hero-body`): copy the phone card once, save as its own sizes, desktop body reused, 16px type floor. Do not build it on P0.

Owner lock (2026-10-03): **Roboto** minimum **15–16px** (token `--pgs-type-floor` → 16 unless a named block uses 15). **Bebas** minimum **30px**. Chrome **locked**. Body clamp recipes from lab-2 are the default for next pages.

### HEIGHT AUTO (owner 2026-10-10) — every segment / block

**How the owner designed it:** each body block (hero, stage, section, hang cluster) grows with its content. **`height: auto` only.**

| Do | Do not |
|---|---|
| `height: auto` on section / stage / in-flow block roots | Invent a fixed stage height that reserves white under the last content |
| Hang via **in-flow** layout + `overflow: visible` | “Fit the hang” by locking `height: 810px` (etc.) and leaving empty air below the photo |
| GAP LOCK margin (hero **60** · rest **80**) as the only seam air | Fixed height **+** section gap stacking into a fake huge gap |

**Exception:** desk absolute-position stages may keep a Figma height **only** when children are `position: absolute` and that height equals the real content bottom (no spare pad for hang). Prefer in-flow + `height: auto` on iPad/phone.

Carry: [`FRONTEND-IPAD-HEADER-LOCK.md`](./FRONTEND-IPAD-HEADER-LOCK.md) · skill `pgs-ipad-modular-body-pass` · `friend-not-yes-man`.

**Chrome click QC (cutover 2026-10-03):** after OWNED_SPLIT, hamburger (≤1366) and `#toggleBtn` must open. Fixed in `pgs-header-chrome-reset` (no visibility transition) · `legacy-page` (no `children` rewire) · toggle `z-index: 5`. Skill: `pgs-ipad-modular-body-pass` / `pgs-ipad-paper-pass`.

**Later final-draft type pass — do not do it during fast section QC.** Lift sub-floor Roboto (13/14 → 16) and sub-30 Bebas when owner opens that pass. Do not invent sizes mid-QC.

**Next iPad page:** body only → content-match QC (desk vs phone) → owner rearrange → Opus plan from north-star findings + Figma/Paper → execute reuse/adapt (not invent). Modular already: hero family · Highlights · #PGS picks. First after OWNED_SPLIT: chrome click QC (hamburger + toggle).

---

## Section order (body)

Chrome = LOCKED. Do not rebuild.

| # | Block | Gate | Status |
|---|---|---|---|
| — | Empty preview shell | **P0** | **QC PASSED** |
| 1 | Hero (headline + mauve card + trust) | **U1** | **READY — owner QC** |
| 2 | Why we built #PurplePremium | **U2** | **READY — owner QC** |
| 3 | This is where #purplePremium comes in | **U3** | **READY — owner QC** |
| 4 | Your path + Study Abroad Pathway | **U4** | **READY — owner QC** |
| 5 | Section 2 + USMLE track intro | **U5** | **READY — owner QC** |
| 6 | Needs mosaic (bento cards) | **U6** | **READY — owner QC** |
| 7 | Competition quote + photo | **U7** | **READY — owner QC** |
| 8 | Student quote | **U8** | **READY — owner QC** |
| 9 | Kick line under the quote | **U9** | **READY — owner QC** |
| 10 | Black-card header | **U10** | **READY — owner QC** |
| 11 | Exam row on the black card | **U11** | **READY — owner QC** Desktop only |
| 12 | IWA window note | **U12** | **READY — owner QC** Desktop only |
| 13 | Step cards under the essay | **U13** | **READY — owner QC** Desktop only. Width locked to the Figma 436px column. |
| 14 | Residency line + match sentence | **U14** | **READY — owner QC** Desktop only |
| 15 | What you get opener | **U15** | **READY — owner QC** Desktop only. Heading 51.2→46 after owner said it looked big. |
| 16 | Network line + checklist card | **U16** | **READY — owner QC** Desktop only |
| 17 | Feedback-sessions bento | **U17** | **READY — owner QC** Desktop only |
| 18 | Forms card | **U18** | **READY — owner QC** Desktop only |
| 19 | Prep group card | **U19** | **READY — owner QC** Desktop only |
| 20 | Conference bento | **U20** | **READY — owner QC** Desktop only |
| 21 | Match, visa, and CV lines | **U21** | **READY — owner QC** Desktop only |
| 22 | Join button | **U22** | **READY — owner QC** Desktop only. Visual only, same as the hero CTA. |
| 23 | Guide quote under the black card | **U23** | **READY — owner QC** Desktop and phone together. Copy stays band-specific. |
| 24 | Highlights | **U24** | **READY — owner QC** One shared module, `src/features/shared/premium-highlights`. USMLE imports it. PLAB / AMC import the same module at their copy gate. Do not rebuild it. |
| 25 | Expense request | **U25** | **READY — owner QC** Figma next after highlights. Shared module `src/features/shared/premium-expense`. Desktop `17055:14537`, phone `433:5205`. Request stays a visual button. |
| 26 | Dashboard unlock | **U26** | **READY — owner QC** Next Figma frame after the expense card. Desktop `17084:12099`, phone `433:5203`. Phone has the two drawn slides. Arrows switch them. No motion. |
| 27 | Questions + meet | **U28** | **READY — owner QC** Desktop `17055:12872` and phone `433:4660` + `433:4685`. FAQ not in this gate. |
| 28 | FAQ | **U29** | **READY — owner QC** Desktop `17055:12897` and phone `433:4700`. No scrollbar. Contact strip not in this gate. |
| 29 | Ready to get started? | **U30** | **READY — owner QC** Shared `outro-cta`. Desktop `17120:10437`. Phone `433:4710`. Hub and picks not in this gate. |
| 30 | Support hub | **U31** | **READY — owner QC** Shared `support-hub`. Desktop `17056:21414`. Phone `433:4717`. Email is the locked spelling, one line. |
| 31 | #Pgs picks | **U32** | **READY — owner QC** Shared `pgs-picks`. Desk title 48 · **iPad 36** · phone 24. iPad = mobile face · 2 cards · 85% · **link min-height 190** · **arrows 32** (owner DevTools 2026-10-03). Wheel + drag. Later switch — do not switch now. |
| — | Frontend | **COMPLETE** | Visual body done. Hostinger did not have real destinations except Enroll. Those links wait for the backend pass, one control at a time. Not wired in this mark. |
| — | Gap analysis | **GAP** | After Figma-to-code · before LOCK. Do not fix spacing mid-build. **GAP LOCK hero→next 60 · rest 80** (owner 2026-10-10) — see [`FRONTEND-GAP-ANALYSIS.md`](./FRONTEND-GAP-ANALYSIS.md). Lab-2 shells already carry the token. Content-to-content (no padding-block on the gap). |
| — | Motion | last | After visual lock |
| — | CMS and backend pass | **later** | Same pass, not a side job. One control at a time. Includes: button destinations (Enroll was the only Hostinger link). Country select + this medical template + slug + live, tied to the full country list. USMLE, then PLAB, then AMC. Not built now. |
| — | Live lab-2 cutover | **CUTOVER** | **DONE** — USMLE Gate 1 · PLAB Gate 2b · AMC Gate 3b (2026-10-03). |
| — | Copy to PLAB / AMC | one page at a time | **DONE.** Same base template. Identity labels only. Leftover exam sentences stay for CMS. AMC track line was still "PLAB pathway" in Figma; the slot is "AMC pathway" so the page is not labeled PLAB. |

---

## Shared modules on this page

Built once under `src/features/shared/`. This page imports them. Do not copy the markup or CSS onto another page.

Later switch only when the owner names the page. About and Rotation keep their own copies until that switch. #Pgs picks is the same rule: later it replaces About and every other page that draws this row.

| Block | Folder | Later use |
|---|---|---|
| Highlights | `premium-highlights` | PLAB / AMC import this. Do not rebuild. Title: desk 38.4 · iPad 36 · phone 24 (owner 2026-10-03). iPad photo frames **−20%** · **gap 8px** (owner 2026-10-03): 205.34 / aspect 231∶430. |
| Expense request | `premium-expense` | PLAB / AMC import this. |
| Enroll | `premium-enroll` | PLAB / AMC import this. |
| Questions + meet | `premium-questions` | PLAB / AMC import this. |
| FAQ | `premium-faq` | PLAB / AMC import this. |
| Ready to get started? | `outro-cta` | Later switch onto About and Rotation. |
| Call and email hub | `support-hub` | Later switch onto Rotation and other pages that draw it. |
| #Pgs picks | `pgs-picks` | Later switch onto About, Rotation, Home, and any page that draws this row. CMS surface stays `pgs_picks`. |

The rest of this page (hero through dashboard) is the USMLE original in `src/features/premium-usmle`. It is not a shared module.

Photoshop model, one page at a time:

| Page | Folder | Status |
|---|---|---|
| USMLE | `src/features/premium-usmle` | **Own file.** Edit this and PLAB / AMC do not change. |
| PLAB | `src/features/premium-plab` | **Own file.** Class prefix `premium-plab`. Does not import the USMLE folder. |
| AMC | `src/features/premium-amc` | **Own file.** Class prefix `premium-amc`. Does not import USMLE or PLAB. |

Shared blocks stay imported. They are the linked layer, not a flattened duplicate.

---

## Backend connections (check before complete)

Not complete. This is the map only. No new wiring in this check.

The body does not save anything. Most buttons are visual only. Three reads happen on the preview page. Only one of them fills a body block.

| What | Where it goes | Table / source | Status |
|---|---|---|---|
| Who is logged in | Locked header, sidebar, footer | Supabase Auth + student experience | Chrome only. Does not change body copy. |
| University meet strip | Locked header strip | `university_meeting_slots` | Chrome only. |
| #Pgs picks cards | Body, last block | `courses` where published and surface `pgs_picks` | Wired. Link is `/programsfull/program/{id}`. No course is ticked yet, so the drawn card shows and does not open a page. |

Body actions that are not connected:

- Hero, Join, Enroll, Expense request, Schedule now, Start your journey: visual buttons. No destination.
- Call and email: real `tel:` and `mailto:` links. Not a database write.
- FAQ open/close, dashboard arrows, picks arrows: on this page only. No save.
- Highlights, expense, enroll, questions, FAQ, outro, hub copy: typed files. Not CMS yet.

Do not mark this page complete until the owner accepts this map, the gap pass, and visual QC.

Hostinger `/purpleusme` body, checked 2026-09-14 against `src/legacy/generated/purpleusme`:

| Control | Hostinger |
|---|---|
| Hero “Set Up a Quick Call” | Button. No `href`. No `onclick` on the page. |
| Join | Link to `#offer_script` (scrolls to the price block on the same page). |
| Enroll Now | Real link: `/Programsfull/program/2`, new tab. This is the one destination the new page does not have yet. |
| Expense “Request it here” | `href="#"`. Empty. |
| Schedule Now | Button. No `href`. No `onclick` on the page. |
| Start your journey | Not on the Hostinger page. |
| Call and email | Plain text. Not `tel:` / `mailto:`. Email spelling on that page is the typo `purpleguid`. |
| FAQ | Accordion open/close. Nothing saved. |
| #Pgs picks cards | No link on the card. Arrows only move the strip. |
| Dashboard photo arrows | Not on the Hostinger body. New Figma block. |

---

## Gate log

| Date | Gate | Note |
|---|---|---|
| 2026-09-12 | **P0** | Empty preview. Owner QC passed. Lab URL is `/preview/purpleusmle` (not the old `usme` spelling). Live `/purpleusme` Hostinger untouched. |
| 2026-09-12 | **U1** | Hero. Desktop + phone from Figma. iPad saved at phone ×1.4 (frozen). CTA visual-only. Brand sits under the photo (family QC, not Figma overlay). CTA/hint/subtitle floor 14px. |
| 2026-09-12 | **U2** | Why we built. Figma copy kept. Phone 85% rail. Hero + Why measured: nothing under 16 at 390 / 768 / 1440. Site-wide 13/14 → 16 is a later final-draft pass, not this gate. |
| 2026-09-12 | **Type floor (later)** | Owner: final draft only. Minimum text (13 / 14) → 16 on phone, iPad, desktop. 20px+ left alone unless visual QC. Do not sweep during fast frontend QC. |
| 2026-09-12 | **U3** | Comes-in strip. Poster still only. Play button visual-only until motion. Lead and phone chip lifted 14→16. Desktop chip later set to 22px (was 25.6). |
| 2026-09-12 | **U4** | Pathway card + recruiter list. Real text, not the Figma render. Note and list labels lifted to 16px. 20px+ titles left. Medical bento not in this gate. |
| 2026-09-12 | **U4 mobile** | Arrow restored. Copy later pulled to the Figma side inset (too edgy at 85%). Card is the Figma portrait (205×358). |
| 2026-09-12 | **Width rule** | Figma inset first. 85% only if the owner says that block is too edgy. |
| 2026-09-12 | **U5** | Track intro. Phone uses the Figma 31px inset, not 85%. Section 2 lead and phone intro lifted to 16px. Duplicate phone intro shown once. Bentos not in this gate. |
| 2026-09-12 | **U6** | Needs mosaic. Phone uses the Figma cluster, not 85%. Card labels lifted to 16px. Hustle line is desktop-only. Photo and quote not in this gate. |
| 2026-09-12 | **U6 phone pass 2** | Overlap stop only. Phone is a 2×2 with gaps, not the Figma stagger. Stagger and exact card sizes are a later pass. |
| 2026-09-12 | **U6 iPad** | Same overlap stop. iPad is a 2×2 with gaps. Desktop mosaic left as passed. Stagger later. |
| 2026-09-12 | **U6 three-band** | Mixed cards restored. Desktop mosaic (auto rows, no overlap). Phone 85% rail. iPad padded 2×2. Playwright 390/768/1440: no overlap, no under-16. Photo/quote not started. |
| 2026-09-12 | **Playwright** | Every pass from here: measure 390 / 768 / 1440 before calling the pass done. |
| 2026-09-12 | **U7** | Competition quote. Two body layouts. Desktop: right notch + photo. Phone: quote beside the ticket turned, notch at the bottom. iPad reuses desktop. Testimonial not in this gate. |
| 2026-09-12 | **Grey wrap** | Not a later block. `#f1f1f1` panel around the current track. Desktop `17055:14150` holds track + bentos + quote. Mobile `433:4479` holds track + bentos; the ticket overlaps the bottom and hangs below. |
| 2026-09-12 | **U8** | Student quote below the capsule, on white. Desktop words only. Phone words + photo. Punctuation stays split. Body 14→16. “(USMLE path)” line not in this gate. |
| 2026-09-13 | **U9** | Kick pair under the quote, on white. Desktop `17055:14241` · phone `433:5179`. Phone sentence 14→16. Purple panel not in this gate. |
| 2026-09-13 | **GAP (later)** | Owner: a lot of space between blocks. Do not tighten it while building. After the page is Figma-to-code done, one gap-analysis pass, then the page may be marked lock. Not this gate. |
| 2026-09-13 | **U10** | Black-card header only. Title left, brand and 70/87/85 right. Phone stacks the same words. Passing labels 14→16. Exam essay not in this gate. Card is header height, not the full Figma panel. |
| 2026-09-13 | **U10 desktop** | Rate row moved into the open middle of the card, left of the brand. Phone rules not edited. Mobile pass is next, after this desktop reference. |
| 2026-09-13 | **U11** | Desktop row under the header. Puzzle line + essay left, years box under the rates. Body 14.4→16, years line 12.8→16. Phone hidden. IWA window and step cards not in this gate. |
| 2026-09-13 | **U12** | IWA note 24px under the years box, same column. Month list 12→16, names stay one line. Step cards not in this gate. |
| 2026-09-13 | **U13** | Yellow step row 24px under the essay. Chip and detail lines 11/12→16. No negative line overlap. Residency line not in this gate. |
| 2026-09-13 | **U13 width** | Step row was 579px and crossed into the right column. Locked to the Figma 436px (132 / 127 / 155). 16px lines wrap inside that width. |
| 2026-09-13 | **U14** | Residency line and match sentence sit in the right column, 24px under the IWA window, beside the step row. Labels 12.8/14→16. No box invented. Checklist not in this gate. |
| 2026-09-13 | **U15** | Grey panel opener under the step row. Heading stays 51.2. Liberty tile peeks 44px above the panel’s top-right. Checklist cards not in this gate. |
| 2026-09-13 | **U15 size** | Opener was not missing a piece. Heading 51.2 matched Figma; owner said it looked big, so 46. |
| 2026-09-13 | **U16** | Network sentence left, checklist card right, 36px under the heading. List labels 12.8→16. Green marks kept, no tick invented. Forms card not in this gate. |
| 2026-09-13 | **U17** | Feedback-sessions calendar 16px under the checklist, same left edge. Label and dates 10/11→16, so the card matches the checklist width. 19 stays the booked day. Forms card and conference bento not in this gate. |
| 2026-09-13 | **U18** | Forms card 16px under the network line, left of the checklist. Pin stays in the title. List is the four Figma lines, capitalized like the frame. Prep group and conference bento not in this gate. |
| 2026-09-13 | **U19** | Prep group card 15px under the forms card, inset 32px from its left. Body stays the Figma sentence, capitalized like the frame. Conference bento not in this gate. |
| 2026-09-13 | **U20** | Conference bento 13px under the prep card, same left as the forms card. Copy stays the four Figma lines. 17.6 stays. Match/visa lines not in this gate. |
| 2026-09-13 | **U21** | Match, visa, and CV lines 21px under the sessions card, inset 7px from its left. Discount line 12→16 and wraps. No underline added. Join button not in this gate. |
| 2026-09-13 | **U22** | Join pill 32px under the conference card, centered on the grey panel. Copy kept, including the dash. Visual button only, no destination. Quote below the black card is the next slice. |
| 2026-09-13 | **Text pass (this panel only)** | Grey “What you get” panel: 32px titles → 20 (24 then 26 were tried and rejected). 16px copy → 15. Join pill stays 24. Site type floor stays 16. Black-card essay above this panel not in this pass. |
| 2026-09-13 | **M1 phone header** | Brand above the title, left, 22px between them. Sizes stay Figma phone: brand 24, kicker 32, word 81.92. Rates still stacked under the title. Essay row is next. Desktop not edited. |
| 2026-09-13 | **Phone type (this pass)** | ≤600 only. 22.4→20, 16→15, 17.6→18. Other sizes stay. Desktop type is already locked and is not this pass. |
| 2026-09-13 | **M2 phone essay row** | Figma pair kept: rates left, essay right. Both sit at the top of the row so the hole above the rates is gone. Desktop not edited. |
| 2026-09-13 | **M3 phone years** | Years box under the essay row, 30px below it, centered. Sentence and cursor centered in the box. Type 15. |
| 2026-09-13 | **M4 phone window** | IWA note stacked under the years box, 36px below it. Month list under “For example:”, not beside the lead. Type 15. Step cards still hidden. Desktop not edited. |
| 2026-09-13 | **M5 phone steps** | Step 1 and Step 2 side by side, Step 3 below left, 35px under the window note. Yellow chips kept. Type 15. Residency line still hidden. Desktop not edited. |
| 2026-09-13 | **Phone 85% rail** | Owner: right side of this block was too close to the edge. Phone text inset 7.5% left, 14% right. Desktop not edited. Locked. |
| 2026-09-13 | **M6 phone residency** | Residency line and match sentence stacked under the steps, 22px below them, then 8px between. Yellow label, white line, yellow match. No box. Type 15. Offer still hidden. Desktop not edited. |
| 2026-09-13 | **Phone steps left** | Step row left edge matches the window note and the residency line. Stacked phone slices use clamp / full rail, not a centered 314px box. Essay pull-up stays px so it still meets the brand word. Desktop not edited. |
| 2026-09-13 | **M7 phone opener** | Grey “What you get” panel under the match line. Heading 32 Bebas, left. Liberty tile peeks the top-right. Network and cards still hidden. Desktop not edited. |
| 2026-09-13 | **M7 phone title lines** | Phone heading is three lines: “What you get with” / “#PurplePremium” / “for your USMLE journey”. Desktop stays two lines. |
| 2026-09-13 | **M8 phone checklist** | White checklist card under the heading. Title 20, list 15. Blank green squares, no tick. Network still hidden. Desktop not edited. |
| 2026-09-13 | **M9 phone forms** | Forms card under the checklist, same width. Pin stays in the title. Disc list, type 15. Network and prep still hidden. Desktop not edited. |
| 2026-09-13 | **M10 phone prep + network** | Prep card left, network sentence right, under the forms card. Title 20, network lead 18, body 15. Heart kept. Sessions still hidden. Desktop not edited. |
| 2026-09-13 | **Phone grey text** | Owner: headlines 18px on mobile, other text 15px. Grey-panel titles and the network lead stay 18. Lists and body copy are 15. Desktop not edited. |
| 2026-09-13 | **M11 phone sessions** | Feedback-sessions card under the prep pair, left aligned. Title 18, dates 15. 19 stays booked. Conference and join still hidden. Desktop not edited. |
| 2026-09-13 | **M12 phone conference pair** | Conference tile left, match / VISA / CV lines right, under the sessions card. Body 15, headlines 18. Copy kept, including purplePremium with no hash. Join still hidden. Desktop not edited. |
| 2026-09-13 | **M13 phone join** | Join pill centered under the conference pair. Copy kept, including the dash. Phone type 20. Visual button only, no destination. Desktop not edited. |
| 2026-09-13 | **U23 guide quote** | Quote under the black card, desktop and phone together. Desktop sentence and quote marks stay. Phone sentence stays. Badge phone 12→16. Highlights not in this gate. |
| 2026-09-13 | **U24 highlights** | Highlights under the quote, desktop and phone together. `#higlights` spelling kept. Desktop has three photos. Phone strip repeats the first photo, as drawn. Caption 14→16. Enroll block not in this gate. |
| 2026-09-13 | **U24 scroll check** | Desktop photo frames 20% smaller (322×617 → 258×494). Same three photos repeated once so both bands show six frames and the strip can scroll. Not new photos. |
| 2026-09-13 | **U24 desktop scroll** | Desktop title and text stay put. Only the photo row scrolls. Phone strip unchanged. |
| 2026-09-13 | **U24 desktop crops** | Desktop photos were `object-fit` guesses. Crops now use the Figma boxes. The row starts 157px in from the black card’s left and can scroll, instead of sitting centered. |
| 2026-09-13 | **Highlights shared** | One component at `src/features/shared/premium-highlights`. USMLE imports it. PLAB and AMC import this same module at their copy gate. No second markup, no second CSS, no invented PLAB/AMC copy. Live Hostinger PLAB/AMC pages are not wired. Chrome stays in `src/features/shell`. Page bodies stay in `src/features/<page>`. |
| 2026-09-13 | **U25 enroll pulled** | Enroll card is later in the Figma frame (y=9704). It is not the next block after highlights. Taken off the preview page. |
| 2026-09-13 | **U25 expense** | Expense request under highlights. Figma `17055:14537` desktop, `433:5205` phone. Shared module. Copy kept. Inbox line 14.4→16. Phone body and button 14→16. Button green `#009c70` → `#008660` so white text hits 4.5:1. Request is a visual button. |
| 2026-09-13 | **U26 dashboard** | Next Figma frame after the expense card. Desktop photo and five points. Phone has the two drawn slides. Arrows switch them. No motion. |
| 2026-09-13 | **U26 phone photos** | Phone frame stays. Same five labels as desktop. Arrows step one photo at a time and the line fills in fifths. Phone images are a separate set (`dashboard-m1`–`m5`). CMS can edit desk and phone photos independently later. Sixth attached photo not wired. No CMS editor in this gate. |
| 2026-09-14 | **U26 phone arrows** | Phone arrow pair uses the Figma circle asset. Boxes are 48px with a −26px overlap so the circles sit like Figma `433:4590`. No empty box. |
| 2026-10-03 | **U27 Enroll iPad desk** | Owner: replace phone-stack Enroll on USMLE / PLAB / AMC lab-2 with QC’d desk card from nonmedical (`1395:10868`). Panel `min(809px, 85%)` · 2-col included · access hang · Bebas ≥30 · Roboto 16. Compact 601–800 stacks columns. |
| 2026-09-14 | **U27 enroll** | Next Figma frame after the dashboard. Shared enroll card under the dashboard. Gap 398px (dashboard end y=9306 to enroll y=9704). Copy kept, including `₹ 65,0000`. Enroll is a visual button. Questions not in this gate. |
| 2026-09-14 | **U28 questions** | Desktop questions + meet pair under the enroll card. Gap 223px from the enroll panel bottom. Shared module. Copy kept. Schedule Now is a visual button. Green line `#009c70` → `#008660` (3.5:1 fails). Slot line 12.8→16. Phone hidden. FAQ not in this gate. |
| 2026-09-14 | **U28 phone** | Phone stacks the pair. Title and green line sit side by side. Card is 41px under the list. Gap 150px from the enroll panel. Lead, list, and slot 14→15. Photo sits under the button. FAQ not in this gate. |
| 2026-09-14 | **U29 FAQ** | Desktop FAQ under the meet pair. Five closed rows. Same Figma question. Owner asked for four lorem lines that show on click. Purple slider skipped. Border `#8a8a8a` so the row edge hits 3:1. Phone hidden. |
| 2026-09-14 | **U29 phone** | Phone FAQ under the meet card. Title centered, 24px. Rows full width, no slider lane. Question 12→15. Gap 108px from the photo. Click still opens the four lines. |
| 2026-09-14 | **U30 outro** | Shared outro under the FAQ. One module, `src/features/shared/outro-cta`. Desktop from About node `17120:10437` because the USMLE desktop frame does not draw it. Visual button. Phone hidden. |
| 2026-09-14 | **U30 phone** | Phone outro under the FAQ. Figma width 86px is a crop, so the column is `min(360px, 100% - 48px)`, centered. Eyebrow 12→15, body and button 14→15. Title stays 16. Gap 87px. |
| 2026-09-14 | **U31 hub** | Shared hub under the outro. One module. Call and email are real links. Desktop email stays one line at the locked spelling. Phone `433:4717`: note on top, hub name inside the black box. Phone blurb and hub name 14→15. |
| 2026-09-14 | **U32 picks** | Shared picks. Phone in. Later switch replaces About and any page that draws this row. Not switched now. |
| 2026-09-14 | **Backend check** | Body write: none. Body read: picks only (`courses` / `pgs_picks`). Chrome reads stay in the header. Visual buttons stay visual. |
| 2026-09-14 | **Frontend COMPLETE** | Owner marked the preview body done. Hostinger had no real destinations except Enroll (`/Programsfull/program/2`). Links wait for the CMS and backend pass, one control at a time. |
| 2026-09-14 | **CMS and backend pass** | Owner: country select + medical template + slug + live, tied to the full country list, is part of that pass. Not a later optional job. Not built now. |
| 2026-09-14 | **USMLE live** | `/purpleusme` served the modular body. Hostinger HTML unhooked. PLAB and AMC not touched. |
| 2026-09-14 | **USMLE spelling** | Owner: `usme` was a typo. Live URL is `/purpleusmle`. Typo redirects. CMS storage key stays `purpleusme`. |
| 2026-09-14 | **PLAB live** | `/purpleplab` serves the same template. No second CSS. Only Figma-switched labels. Leftover USMLE exam sentences not invented away. AMC not touched. |
| 2026-09-14 | **Base template** | Owner: this modular body is the current base template. Later CMS edits the words. Do not block PLAB or AMC on leftover USMLE sentences. |
| 2026-09-14 | **AMC live** | `/purpleamc` serves the same template. Figma labels: For #AMC, AMC applicants chip, know-word AMC. Track slot set to AMC pathway (Figma still said PLAB pathway). Hostinger HTML unhooked. |
| 2026-09-14 | **Photoshop USMLE** | USMLE folder is its own file. PLAB and AMC do not import it. They stay on `premium-medical-hold` until their turn. |
| 2026-09-14 | **Photoshop PLAB** | `/purpleplab` owns `src/features/premium-plab`. Class prefix `premium-plab` so CSS does not collide with USMLE. Identity labels only. AMC still on the hold. |
| 2026-09-14 | **Photoshop AMC** | `/purpleamc` owns `src/features/premium-amc`. Class prefix `premium-amc`. Identity labels only. Frozen hold removed. |

---

## Preview

- Lab-2 USMLE (north star): http://localhost:7100/preview/purpleusmle-2
- Live USMLE (lab-2 Gate 1): http://localhost:7100/purpleusmle
- Lab-2 PLAB: http://localhost:7100/preview/purpleplab-2
- Live PLAB (lab-2 Gate 2b): http://localhost:7100/purpleplab
- Lab-2 AMC: http://localhost:7100/preview/purpleamc-2
- Live AMC (lab-2 Gate 3b): http://localhost:7100/purpleamc
- Lab-1 USMLE (parked): http://localhost:7100/preview/purpleusmle
