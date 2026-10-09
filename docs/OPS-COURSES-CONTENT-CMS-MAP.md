# Programs Courses → Ops CMS content map

**Scope:** Everything in `/preview/programs-courses` **body** (C1–C13).  
**Out of scope:** Public chrome (header / UnivMeet strip / footer) — not CMS course fields.  
**Workflow lock:** [`OPS-CMS-WORKFLOW-LOCK.md`](./OPS-CMS-WORKFLOW-LOCK.md)  
**Editor:** `/ops/cms/courses` · Preview: `/ops/cms/courses/preview/:id`

Status legend: **IN CMS** = editable in Ops form today · **FIXED ASSET** = ships with template (icon path) · **GAP** = template has it, form does not yet · **N/A chrome** = site shell

---

## Shell order (body only)

| Gate | Component | CMS |
|---|---|---|
| C1 | `ProgramsCoursesHero` | IN CMS (+ flat catalog fields) |
| C2 | `ProgramsCoursesDescription` | IN CMS |
| C3 | `ProgramsCoursesProgramDescription` | IN CMS (Description → body) |
| C4 | `ProgramsCoursesHighlights` | IN CMS |
| C5 | `ProgramsCoursesChecks` | IN CMS |
| C6 | `ProgramsCoursesBrochure` | IN CMS (+ brochure asset flat) |
| C7 | `ProgramsCoursesAwarding` | IN CMS |
| C8 | `ProgramsCoursesApply` | IN CMS |
| C9 | `ProgramsCoursesCertificate` | IN CMS |
| C10 | `ProgramsCoursesHiglights` | IN CMS |
| C11 | `ProgramsCoursesEnroll` | IN CMS |
| C12 | `ProgramsCoursesLearners` | IN CMS |
| C13 | `ProgramsCoursesFaq` | IN CMS |

---

## Catalog flat fields (always on Create/Edit)

| Lab / fixture field | Ops form | Notes |
|---|---|---|
| `title` → `titleLines` | Title | Split on save/preview |
| `partnership` / short | Short description | |
| `programDescription.body` | Description | Also feeds C3 |
| `durationValue` | Duration | |
| `modeLabel` | Mode | |
| `start` / `end` | Starts on / Ends on | Time-of-day kept from body if present |
| `tags` | Tags | |
| `heroImage` | Image asset | Media library |
| `brochure.downloadUrl` | Brochure file | Media library |
| `bookingUrl` | Booking URL (C1 / flat) | |
| `detail_template` | Detail template select | `courses` vs empty |
| `detail_body` | Built from C1–C13 | Zod `CoursesTemplateBodyV1` |

---

## C1 · Hero

| Content | CMS | Status |
|---|---|---|
| Title lines | Title | IN CMS |
| Who is it for | C1 · Who is it for | IN CMS |
| Who-for note | C1 · Who-for note | IN CMS |
| Partnership line | Short description | IN CMS |
| Type label | Fixed `"Type"` | FIXED ASSET (label) |
| Type value | C1 · Type value | IN CMS |
| Duration label | Fixed `"Duration"` | FIXED ASSET |
| Duration value | Duration (flat) | IN CMS |
| Filling badge | C1 · Filling badge | IN CMS |
| Filling icon (fire gif) | Lab path | FIXED ASSET |
| Mode | Mode (flat) | IN CMS |
| Tags | Tags | IN CMS |
| Location note | C1 · Location note | IN CMS |
| Booking CTA label | Default / body | PARTIAL — defaulted; no dedicated form field (GAP optional) |
| Booking URL | C1 · Booking URL | IN CMS |
| Hero image + alt | Image + alt | IN CMS |
| Partner logo | C1 · Partner logo upload | IN CMS |
| Share icon | Lab SVG | FIXED ASSET |
| Start/end day·month·year | Dates flat | IN CMS |
| Start/end **time** string | Carried from previous body | GAP — no dedicated time fields |

---

## C2 · Who’s it for / Topics

| Content | CMS | Status |
|---|---|---|
| Left title + bodies | C2 left | IN CMS |
| Right title + bodies | C2 right | IN CMS |
| `descriptionMobile` overrides | — | GAP — dropped on save (desk = source) |

---

## C3 · Program description

| Content | CMS | Status |
|---|---|---|
| Title lines | Default / optional | PARTIAL — often default “Program / Description” |
| Body | Description (flat) | IN CMS |
| Card icon | Lab path | FIXED ASSET |

---

## C4 · Program highlights

| Content | CMS | Status |
|---|---|---|
| Section title | C4 title | IN CMS |
| Items num + body | C4 rows | IN CMS (num auto 01…) |
| Section icon | Lab path | FIXED ASSET |

---

## C5 · Checklist

| Content | CMS | Status |
|---|---|---|
| Chip | C5 chip | IN CMS |
| Check items | C5 rows | IN CMS |
| Check icon | Lab path | FIXED ASSET |
| `checksMobile` | — | GAP — dropped on save |

---

## C6 · Brochure

| Content | CMS | Status |
|---|---|---|
| Title, subtitle, CTA, badge | C6 fields | IN CMS |
| Download URL | Brochure asset | IN CMS |
| Translate icon | Lab path | FIXED ASSET |

---

## C7 · Awarding body

| Content | CMS | Status |
|---|---|---|
| Title, body | C7 | IN CMS |
| Logo + alt, photo + alt | C7 uploads | IN CMS |
| Facts | C7 fact rows | IN CMS |
| Rankings titles + bodies | C7 | IN CMS |
| Accreditation titles | C7 | IN CMS |
| Accreditation logos | C7 uploads (≤6) | IN CMS |
| `photoMobile` crop | — | GAP optional |

---

## C8 · How to apply

| Content | CMS | Status |
|---|---|---|
| Title, subtitle | C8 | IN CMS |
| Eligibility chips | C8 | IN CMS |
| Eligibility / option labels | Defaults in body | PARTIAL FIXED |
| Option 1 steps (+ links) | C8 steps | IN CMS |
| Option 2 | C8 option 2 | IN CMS |
| Arrow icon | Lab path | FIXED ASSET |

---

## C9 · Certificate

| Content | CMS | Status |
|---|---|---|
| Headline | C9 | IN CMS |
| Why title | Default in body | PARTIAL FIXED |
| Why checks | C9 checks | IN CMS |
| Check icon | Lab path | FIXED ASSET |
| Mock card fields + seal | C9 mock + seal upload | IN CMS |

---

## C10 · #higlights

| Content | CMS | Status |
|---|---|---|
| Title, lead, place, note | C10 | IN CMS |
| Photos ≤7 + alt | C10 uploads | IN CMS |
| Pin icon | Lab path | FIXED ASSET |
| Crop 1\|2\|3 | Defaults in builder | PARTIAL — not exposed as form control (GAP optional) |

---

## C11 · Enrollment fee

| Content | CMS | Status |
|---|---|---|
| Title, subtitle, price, badges, early bird | C11 | IN CMS |
| Breakdown L/R | C11 lines (`\|\|` bold) | IN CMS |
| Housing + payment | C11 | IN CMS |
| CTA label / href | Defaults / empty | GAP — enroll CTA URL not in form yet |
| Breakdown title + check icon | Defaults / FIXED | PARTIAL FIXED |

---

## C12 · Learners

| Content | CMS | Status |
|---|---|---|
| Lead, badge, intro parts | C12 | IN CMS |
| Photo + alt | C12 upload | IN CMS |
| Quotes (3) + quote mob | C12 | IN CMS |
| Bio name/role/location | C12 | IN CMS |
| Quote SVG asset | Lab path | FIXED ASSET |

---

## C13 · FAQ

| Content | CMS | Status |
|---|---|---|
| Heading | C13 | IN CMS |
| Tabs + Q&A | C13 | IN CMS |
| Plus/minus icons | Lab paths | FIXED ASSET |
| defaultTabId / defaultOpenIndex | Defaults | PARTIAL FIXED |

---

## Explicitly NOT course CMS (chrome)

| Piece | Owner |
|---|---|
| Public header / sidebar / hello aspirant | Modular chrome / shell |
| UnivMeet strip | Shell / UnivMeet CMS |
| Footer | Modular chrome |
| Ops staff chrome (sidebar, topbar) | Ops shell — not course body |

---

## Summary counts

| Bucket | Count (approx) |
|---|---|
| Body sections C1–C13 | **All mapped to CMS** |
| FIXED ASSET (icons/chrome-of-block) | Keep in code — not staff-edited |
| Optional GAPs | Time-of-day · mobile copy · booking CTA label · enroll CTA href · photo crop · C3 title lines |

**Product rule:** Staff edit **copy + photos + links**. Decorative icons stay template assets unless owner opens a “swap icon” gate.

---

## QC checklist (body parity)

1. Lab: `/preview/programs-courses` — visual reference only.  
2. Edit course → template **Courses** → fill each C1–C13 group.  
3. Preview: `/ops/cms/courses/preview/:id?revision=…` — same shell, no header/footer chrome from public site (Ops banner OK).  
4. Empty fields → section hidden (`hideEmptySections`).  
5. Icons still show from FIXED ASSET paths.
