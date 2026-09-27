---
name: pgs-ipad-hero-body
description: >-
  Recall skill, not a shared chrome import. On mauve-panel pages (About,
  Scholarship, Purple Premium), when the owner says recall, do the iPad hero,
  or 601–1366: copy that page's mobile card once, save it as its own 1.4×
  sizes in that page's CSS, keep the desktop body, 16px type floor on phone, iPad, and desktop. Do not
  re-explain. Do not build a shared iPad component.
---

# iPad hero = saved copy of mobile × 1.4 · body = desktop

Owner lock 2026-09-12, corrected the same day. Do not re-derive. Do not merge pages into one generic hero.

## Workflow — recall, not locked chrome

This is a **skill to recall**. It is not the locked-chrome pattern.

| Locked chrome | This skill |
|---|---|
| One shared file every page imports | Each page writes the iPad card in **its own CSS** |
| Owner does not re-explain the shell | Owner says recall. Do the page. Do not re-teach |
| Shared component | No shared iPad hero, no shared iPad token file |

When the owner says recall, Scholarship iPad, or “same as About” on a mauve-panel page: read this skill, do not explain tokens, 1.4, or three cards again. Short propose for **that page’s** current mobile card only, wait for `GO AHEAD`, then write that page’s CSS.

## Why 3 heroes, 2 bodies

Owner lock 2026-09-12. Do not re-derive.

Apple keeps one image and one text block and lets them resize with the window. Our **body** is that kind of thing, so the body has **two** layouts only: phone, and the desktop layout reused on iPad. Do not add a third body.

The **hero card** is the exception. The card itself changes with size, so the hero has **three** saved cards: phone, iPad, desktop. Same photo and words. Different card. Chrome and shell stay locked. They are not a fourth hero.

## The point

Copy today's mobile card **once**. Multiply those proportions by 1.4. **Save that as the iPad card's own sizes.** After that, iPad does not follow mobile.

Why: a later phone tweak, or a CMS edit aimed at mobile, must not resize or restack the iPad card.

This is not a live formula (`mobile token × 1.4` on every page load). That link is what causes the later problem.

| | Do | Do not |
|---|---|---|
| How iPad is born | Copy the current mobile card proportions, × 1.4, write those as iPad sizes | Leave iPad as `calc(var(--pgs-premium-mob-*) * 1.4)` |
| After it exists | iPad sizes live in the iPad rules only | Change a phone rule and expect iPad to update |
| Words and photo | Same content can still show on both | Let a mobile layout/CSS edit rewrite the iPad card |
| Desktop | Wide screen keeps its own card | Use the desktop card on iPad |

Starting sizes (mobile lock × 1.4, then frozen):

| Piece | Mobile lock used once | Saved iPad size |
|---|---|---|
| Card | 290 × 450 | 406 × 630 |
| Photo height | 357 | 500 |
| Opening column width | 151 | 211 |

Page-local exceptions (About already QC'd) stay exceptions. They are not part of the shared 1.4 copy.

**Owner update 2026-09-27 (About):** the saved iPad card is too tall. Cut the card to **80% of its rendered height**, photo takes the cut; width, text and spacing stay. About: card 681 → 545 CSS, photo 500 → 364 (`--about-ipad-card-h: 545px`, `--about-ipad-media-h: 364px`). Apply the same 80% on each page's iPad hero during its body QC (measure the card first; the number differs per page).

## What a token is

A **token** is a named number written once. Example: `--pgs-ipad-card-w: 406px` means "the iPad card is 406px wide." Pages say the name instead of repeating the number.

| Name | Value | Meaning |
|---|---|---|
| `--pgs-ipad-card-w` / `--pgs-ipad-card-h` | `406px` / `630px` | Saved iPad card. Not a live link to the phone card. |
| `--pgs-ipad-media-h` | `500px` | Saved iPad photo height. |
| `--pgs-type-floor` | `16px` | Minimum readable text on phone, iPad, and desktop. Not a heading size. |

Do **not** store these in `premium-panel-lock.css`. That file is the locked phone and desktop card. Do **not** extract a shared iPad CSS file or a shared iPad component. The next page copies the method into its own CSS. That is the workflow.

About iPad sizes are frozen in `about-hero.css` (601–1366 block). Do not put `calc(var(--pgs-premium-mob-*) * 1.4)` back. Phone `≤600` and desktop `>1366` stay on the lock file.

## The rule

Bands stay `>1366` desktop · `601–1366` iPad · `≤600` mobile. Never 767.

On **iPad only**:

1. **Hero** uses the mobile **arrangement** (photo card stacked like the phone), at the **saved 1.4× sizes**. It does not read the phone size tokens.
2. **Body below the hero** keeps **that page’s desktop layout**. Do not modularize the body. Each section has a different job. Only the hero recipe is the recall. The type floor is the only shared body rule.
3. **Type floor 16px on phone, iPad, and desktop** — but only as the later final-draft pass below. During fast section QC, do not stop to restyle type across the site.
4. Phone `≤600` and wide desktop `>1366` keep their own layout. Only the type floor is shared. Do not restyle iPad when those layouts change. Do not restyle them to match iPad.

## Body sections — two passes, not three

Owner lock 2026-09-12. Do not build a body section as three designs.

1. **Desktop first.** Lock that.
2. **Mobile second.** Own pass. Use the Figma phone inset and block shape first. If the owner says it is too edgy, then apply the 85% rail. Do not start at 85%. Do not stretch a desktop card to fill the rail.
3. **iPad is not a third design.** It reuses the desktop body. Glance at ~768 so nothing overflows. Do not invent an iPad layout. The hero card is the only three-card piece.

## Playwright check — every pass

Owner lock 2026-09-12. A pass is not done until Playwright has measured it. Do not say “refresh and check” as the only proof.

After each body pass, open the lab and measure at **390, 768, and 1440**:

- The new block is in the page.
- Cards in that block do not overlap (box edges, not just a glance).
- Readable text in that block is at least 16px. Headings already above 16 stay larger.

Report the three widths and what failed. If a width fails, fix that pass before starting the next block.

## Type floor — later final-draft pass, not now

Owner lock 2026-09-12. Do not start this sweep during fast frontend section QC.

When the owner says final draft / type check:

- **Minimum text only.** Body, buttons, hints, labels, captions, and trust lines that are now 13px or 14px go to **16px** on phone, iPad, and desktop. Text already at 16px stays.
- **20px and up is not an automatic resize.** Leave it, or change it only after a visual QC if it looks wrong.
- Do not crush headings or display type down to 16px.
- Same CSS pixel floor on all three bands. Do not invent a smaller phone size.
- USMLE lab already measured clean on hero + Why (nothing under 16 at 390 / 768 / 1440). That is the reference, not proof the rest of the site is done.
- Known leftovers for that pass: mixed 13 / 14 / 16 on older pages (About note, Scholarship mobile floor, and similar). Do not “fix” them mid-section.

## Which pages

| Use this recipe | Do not use it |
|---|---|
| About (already QC’d) | Finance |
| Scholarship | USMLE rotation |
| Upcoming Purple Premium pages that reuse the mauve photo card | Student feed, Upload Your Docs, countries |

Only pages whose hero is the mauve “premium panel” family (`premium-panel-lock.css`). If the page has a different hero, stop and ask.

## What stays page-local

Do not copy About’s `#PGS` note, opening column, or arrow into Scholarship. Each page keeps its own headline, button, and note. Copy the **band rule**, not the About markup.

About exceptions already QC’d (do not “normalize” away):

- Opening copy on iPad is **20px**, narrow column (151×1.4), not ×1.4 type.
- Note “our quick way…” matches the **mobile stack** (149px, under the card, beside the arrow), not a wide block beside the card.
- Timeline / Gantt is not a redesign. If it has sub-16 readable text, it joins the same later minimum-text pass. Do not restyle it now.

## How to apply on the next page

1. Read this skill and that page’s modular map.
2. Propose: copy that page's current mobile card once, save iPad sizes at 1.4×, body = desktop, type floor 16px on phone, iPad, and desktop. List what you will **not** copy from About. Say that a later mobile or CMS edit will not rewrite this iPad card.
3. Wait for `GO AHEAD`.
4. Owned page CSS only. Import the lock file for card sizes. Do not rebuild chrome or the shell.
5. Update that page’s living modular MD. Owner Preview QC at ~768 and ~1024.

## Hard stops

- No shared React hero that all pages render.
- No edit to locked chrome, `premium-panel-lock.css`, or About’s locked desk type `×0.8` on `>1366`.
- No iPad work on pages that are not the mauve-panel family.
