---
name: pgs-student-family-doorman
description: >-
  Student dashboard family split: anon+standard share Family A; Premium is a
  separate Family B structure. No shared page+toggle, no ?premium=, no mixing
  CMS shapes. Use on feed, Track Progress, and future student dashboard pages.
---

# PGS — student Family A / Family B doorman

**Owner lock (Track Progress B-live, 2026-09-08):**

> No shared “one page + toggle,” no ?premium=, no mixing blocks into one CMS shape later.

Use this on **student dashboard–related pages** (feed, Track Your Progress, and later siblings). Recal before inventing a “premium mode” flag on a locked page.

Proven live examples:
- `/student/dashboard` — Family A shell vs Premium shell
- `/feed_track_progress` — Family A shell vs Premium shell

---

## Hard rule

| Session kind | Structure | Shell pattern |
|---|---|---|
| `anonymous` | **Family A** (same as standard) | Locked / frost modular body |
| `authenticated_standard` | **Family A** (same as anon) | Same Family A shell |
| `authenticated_premium` | **Family B** — **separate** | Separate Premium modular shell |

**anon and standard = same structure (static / locked fixtures). Premium = separate structure + backend wire. Don’t mix them — it will mess up CMS later.**

For Track Progress specifically: **backend linking is Premium-only.** Anon/standard stay static images/fixtures.

---

## Doorman (live route)

```text
resolveStudentExperience()
  ├── anonymous              → Family A shell
  ├── authenticated_standard → Family A shell  (same component tree)
  └── authenticated_premium  → Family B shell  (different component tree)
                              + requirePremiumActor() when Premium APIs needed
```

- One live URL per product page is fine (e.g. `/feed_track_progress`).
- **Two body modules**, not one body with `locked={false}` as the only Premium product.
- Preview may keep separate routes (`/preview/…` and `/preview/…-premium`) for QC — still two shells, never one shell + query flag.

---

## Forbidden

- `?premium=1` / searchParams to flip Family A into Premium
- One CMS page schema that tries to represent both locked and unlocked layouts
- Merging Family A frost blocks into Family B “by props” as the long-term architecture
- Serving Hostinger locked HTML for anon/standard while only Premium is modular (after cutover)

---

## Why (CMS / product)

Family A and Family B have **different Figma trees** (lock/frost vs unlocked, different section contracts). CMS and Ops later attach content/data **per family**. Mixing early forces a fake universal schema and breaks later CMS.

---

## Cutover checklist

1. Preview QC each family on its own preview route  
2. Propose → `GO AHEAD` live cutover  
3. Replace Hostinger / condensed board with doorman + two shells  
4. Wire backend **per family** (Premium data first is common; Family A may stay fixtures)  
5. Update the page’s living modular MD + Kanban MD  

Companions: `pgs-propose-before-code` · `pgs-public-move-out` · `pgs-backend-phase-wire` · `pgs-never-invent`

**Backend gates:** always append WHAT · WHY · HOW to the family’s living Kanban MD (e.g. `docs/FEED-TRACK-PROGRESS-KANBAN.md`) for QC analysis later — see `pgs-backend-phase-wire` Living Kanban section.
