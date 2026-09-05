# Readable legacy pages — where to edit

You are the authority. Figma is reference only when you say so.

## Phase boundary (owner lock)

**This conversion = editable HTML/CSS/React structure only.**

- Goal: Hostinger page markup into `src/legacy/pages/` so you can open and edit like normal frontend.
- Shared chrome: header, sidebar, Hello, feed card, footer — edit once, import everywhere.
- **Ignore product/auth logic in this phase:** sidebar open/close bugs, who sees purpleboard, premium gates, notifications, RBAC, etc. Do not “fix” legacy behavior while converting.
- **Next phase (later):** re-verify logic against junior + Hostinger + current PGS V3 + Supabase + legacy MySQL. That is a separate GO AHEAD.

## Shared chrome (edit once → reflects everywhere it’s imported)

| What | Edit this file | Loader |
|------|----------------|--------|
| Header + drawer | `public-header.html` | `public-header.ts` |
| Lavender sidebar | `public-sidebar.html` | `public-sidebar.ts` |
| #feed user / premium box | `feed-identity-card.html` | `feed-identity-card.ts` |
| Hello Aspirant strip | `hello-aspirant.html` | `hello-aspirant.ts` |
| Footer (`.footer-bg`) | `public-footer.html` | `public-footer.ts` |

Footer = Hostinger visual chrome only (mentor card, emails, socials, copyright). Post-footer modals/scripts stay page-local.

All live under **`src/legacy/pages/`**.

## Page bodies (per route)

| What | Where |
|------|--------|
| **New editable HTML** | `src/legacy/pages/<slug>.html` (+ optional `.ts` loader) |
| Country destinations (live) | `composeCountryPublicPage` → header + strip + hero + `CountryBodyShell` + footer |
| UK leftover HTML (archive only) | `countriesuk.html` — **not** loaded by live routes; do not edit for product |
| **Old mess (do not edit for content)** | `src/legacy/generated/<slug>/*.ts` — opaque string chunks |

Live `/countries*` routes do **not** inject leftover premium modal HTML. Application surfaces stay out via `applyPremiumBusinessRule` until Track C owns popups/payments.

## Breakpoint authority (refer always)

**Single source of numbers:** `src/features/shell/pgs-breakpoints.ts`  
**CSS vars (same numbers):** `src/features/shell/pgs-breakpoints.css`

| Token | px | Use |
|-------|-----|-----|
| `headerMobileMax` | 1366 | ≤ this → tablet header; above → full desktop |
| `headerDesktopLogoMin` | 981 | Tablet band logo sizing |
| `mobileHandoverMax` | 980 | Country hero / handover band |
| `headerCompactMax` | 600 | Compact phone header (no #feed) |
| `hostingerPhoneMax` | 600 | Country/page phone floor (not header) |

Overlay CSS (keep px in sync with the TS file):

- `legacy-header-breakpoints.css` — header only  
- `legacy-hello-aspirant.css` — Hello Aspirant strip internals (row + scale; not page position)  
- `countries.css` — country hero only  

Shared HTML (`public-header.html`, etc.): when you add `@media`, use these same numbers and note which token.

Do **not** invent a new width without updating `pgs-breakpoints.ts` first.

## Header breakpoints

`src/features/shell/legacy-header-breakpoints.css` (header only):

- **>1366** desktop (full tabs + USMLE + explore + bell + login)  
- **601–1366** tablet (logo + `#feed` + bell + login + menu → drawer)  
- **≤600** compact phone (logo + bell + login + menu)  
- `#purplePremium` dropslide + `#exploreCountries` dropdown preserved on desktop; same links in drawer
## Country / Premium templates — recommendation

**Don’t over-template.** Hostinger already has one PHP view per country / pathway with the same shell and different body copy.

- **Share:** header, sidebar, Hello strip, feed card, footer (done).  
- **Per page:** keep Hostinger HTML body as `src/legacy/pages/<slug>.html` (or generate once from Hostinger into that file). CMS fills text.  
- **Only** extract a shared intro/block if two pages are byte-identical in structure and you’re tired of duplicating — like UK intro — **after you ask**.

Micromanaging every country into one mega-template is optional later, not required now.

## Sources (no inventing)

1. Hostinger PHP/HTML/CSS  
2. Junior only when structure already matches Hostinger  
3. V3 auth/CMS/LegacyPage wiring (structure only this phase)  
4. You approve any new UI  

## Batch 1 — country destinations (structure only)

Converted to editable `src/legacy/pages/<slug>.html` + shared chrome:

`countriesusa`, `countriesaus`, `countriescanada`, `countrieseurope`, `countriesfrance`, `countriesgermany`, `countriesmauritius`, `countriesnz`, `countriesothers`, `explorecountries` (+ UK pilot already).

Do not fix sidebar/auth logic in this batch.

## Batch 2 — public content / programs (structure only)

`about`, `contact`, `cvreadyprogram`, `finance`, `scholarship`, `studentresources`, `purpleamc`, `purpleboard`, `purpleevents`, `event-session`, `purplenonmedical`, `purpleplab`, `purplepremiumhome`, `purpleusme`, `simplehome`, `unitieup`, `usmlerotation`.

Shared chrome via `PublicLegacyPage`. Logic later.

## Batch 3 — auth (structure only)

Wired editable HTML + shared chrome:

- `login.html` → `/login` (operations/guardian surfaces unchanged)
- `forgot-password.html` → `/forgot_password`
- `reset-password.html` → `/reset_password`
- `change-password.html` → `/change_password` (still requires auth)

Also dumped `signup.html` for editing. `/singup` still uses the profile completion React shell — legacy signup markup restore = later GO AHEAD.

## Batch 4 — student private (structure only)

**Wired** (editable HTML + shared chrome on legacy/locked surfaces):

- `student-dashboard.html` → `/student/dashboard` (non-premium / anonymous legacy)
- `documents-locked.html` → `/upload_your_doc` locked states
- `progress-locked.html` → `/feed_track_progress` locked states

**Hostinger dumps for edit / later restore** (routes still React for unlocked/premium):

- `saved.html`, `upload-your-doc.html`, `feed-track-progress.html`, `userprofile.html`

`/saved`, `/notifications`, `/student/profile`, premium unlocked docs/progress/dashboard stay React shells — logic later.

