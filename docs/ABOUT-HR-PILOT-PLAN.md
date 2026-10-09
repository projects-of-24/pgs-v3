# About — H-R + OWN-LINK pilot plan (architect: Fable, 2026-09-27)

**Who reads this:** the Opus chat that implements it. Treat yourself as a junior intern on day one. Do not improvise. Every step below says what to do, what to expect, and when to STOP and ask the owner (Anjay). If a step says STOP, you stop and write the question in chat; you do not "try something".

**Owner reads this too.** Owner says `GO AHEAD HR-A1` to start gate 1 and `GO AHEAD HR-A2` to start gate 2. No GO AHEAD = no code.

---

## 0. Read these first (in this order, every fresh chat)

| # | What | Why |
|---|---|---|
| 1 | Claude skill `pgs-owner-lock` (8 sections) | The owner's non-negotiable rules |
| 2 | Project memory `claude/pgs-v3-cursor-handover-memory.md` (in the "pgs be live" Project) | Where things live, what is locked |
| 3 | `.cursor/skills/pgs-master-workflow/SKILL.md` | The loop: plan → GO AHEAD → one diff → measure → owner QC |
| 4 | `.cursor/skills/pgs-owner-lock-claude/SKILL.md` § 9 "State sheet before every change" | You will fill one in step 6 |
| 5 | `docs/HEADER-CHROME-PHASE.md` decisions 27, 28, 31, 32, 40–42, 47, 48 | What is already locked on the lab and why |
| 6 | `docs/ABOUT-MODULAR.md` | The About body map (body is QC'd and untouchable) |
| 7 | `src/features/shell/OWNED-CHROME-UNLINKED.md` | Which CSS files must NOT be imported |

Model call: **Opus** implements this plan. If anything in this plan turns out to be wrong against the code, do not patch the plan silently — say "plan mismatch at step X" and wait.

---

## 1. WHAT (one paragraph)

The About page today shows the **old string header and string footer** (HTML strings injected with `dangerouslySetInnerHTML`, styled by Hostinger `style.css` + `responsive.css`). The header lab `/preview/header` already shows the **new React header**, the **React open toggle box**, the **React search-results card**, and the **owned CSS split** instead of Hostinger — and the owner QC'd and LOCKED all of it (decision 48). This pilot makes `/preview/about` render exactly the lab's chrome around the (untouched) About body, proves with numbers that nothing else moved, and then, on a second GO AHEAD, flips live `/about` to the same tree. About is the pilot: the checklist you produce here becomes the template every other page copies.

Two gates, two GO AHEADs:

| Gate | Route | What changes | Ends with |
|---|---|---|---|
| **HR-A1** | `/preview/about` | React header + React footer + React sidebar/search portals + owned split CSS | Owner Preview QC |
| **HR-A2** | `/about` (live) | Same tree on the live route + `/about` on the owned-split allowlist | Owner live QC, tests, docs, commit |

---

## 2. BEFORE → AFTER (page tree)

```
BEFORE  /preview/about  and  /about
  <html> ← Hostinger style.css + responsive.css (layout.tsx)
  LegacyPage
    DSIH: string HEADER (public-header.html) + string STRIP (#toggleBtn · #univMeet · search · string #sidebar)
    AboutPreviewShell           ← QC'd body, DO NOT TOUCH
    DSIH: string FOOTER (public-footer.html)

AFTER   /preview/about (HR-A1)   then   /about (HR-A2)
  <html> ← /preview/owned-split  (1:1 owned copy; layout.tsx allowlist)
  LegacyPage
    <PublicHeader/>             ← React (the lab's header + drawer)
    DSIH: string STRIP with <div data-pgs-sidebar-slot> where the string #sidebar was
    <SearchResultsStripPortal/> ← React results card into the strip's search field (same as lab)
    <PublicSidebarPortal/>      ← React open toggle box into the slot (same as lab)
    AboutPreviewShell           ← QC'd body, DO NOT TOUCH (same element, same CSS)
    <PublicFooter/>             ← React (same DOM/classes as public-footer.html)
```

What stays a string on purpose: the **strip** (`public-strip.ts`). There is no React strip yet. The two portals exist exactly for this. They are "delete at H-R" in their headers, but that means "when the strip becomes React", which is **not this change**. Do not delete them, do not rewrite the strip.

---

## 3. FILES

### Gate HR-A1 (preview)

| File | Change | Touch anything else? |
|---|---|---|
| `src/app/layout.tsx` | Replace the single-route check `pathname === "/preview/header"` with an allowlist `Set` that contains `/preview/header` and `/preview/about`. Comment updated. | No |
| `src/app/preview/about/page.tsx` | Rewrite the page function to the AFTER tree (full file given in step 3). | No |
| `docs/ABOUT-HR-PILOT-PLAN.md` (this file) | Fill in the measurement tables in section 9 as you go. | — |

### Gate HR-A2 (live)

| File | Change |
|---|---|
| `src/app/layout.tsx` | Add `/about` to the same allowlist. |
| `src/app/about/page.tsx` | Same tree as preview, `page="about"`, `live` prop on the body, no `withPreviewLoginReturn`. Full file in step 11. |
| Playwright snapshots `legacy-about-desktop.png` + `legacy-about-mobile.png` (from `visual-parity.spec.ts`, `compare(page, \`legacy-${name}-${project}.png\`)`) | Baseline refresh for About only, **after** owner QC (step 13). |
| `docs/HEADER-CHROME-PHASE.md` | Decision rows 49 (HR-A1) and 50 (HR-A2). |
| `docs/ABOUT-MODULAR.md` | "Two surfaces" table: chrome = React (H-R). |
| `src/features/shell/OWNED-CHROME-UNLINKED.md` | "Still linked" row for Hostinger: add `/preview/about` + `/about` to the exception list. |
| `src/features/shell/public-sidebar-portal.tsx`, `search-results-strip-portal.tsx` | Header comment only: "Delete when the strip becomes React" (they now serve live pages too). |

### Files you must NOT open for editing

`src/features/about/**` (QC'd body) · `src/features/shell/public-header.tsx`, `public-footer.tsx`, `public-sidebar.tsx`, `search-results.tsx` and every `pgs-*.css` next to them (LOCKED chrome) · `src/features/owned-css/split/**` (1:1 copy, decision 27) · `src/app/globals.css` · `public/assets/css/*` (Hostinger, reference only) · `src/legacy/pages/*.html` · `src/app/preview/header/page.tsx` (the truth you compare against).

If you believe one of these must change for parity: **STOP and ask** (owner lock §1).

---

## 4. ELI5

Think of the About page as a picture frame (header + footer) around a painting (the body). The painting is finished and signed — nobody touches it. We built a new, nicer frame in the workshop (`/preview/header`) and the owner approved it. This job is: take the approved frame, put it around the About painting in the workshop copy (`/preview/about`), measure with a ruler that the painting did not move, show the owner, and only then hang it in the gallery (`/about`). We also swap the wall paint (Hostinger CSS → owned split), but the owned split is a 1:1 copy of the old paint, so the wall must look identical.

---

## 5. NOT IN THIS CHANGE

- No React strip. `public-strip.ts` stays a string. Portals stay.
- No H7-LIVE (`viewportFit: cover` on the root layout). `/preview/about` will **not** export a `viewport` — that is its own gate.
- No iPad/fluid UI pass on the About body. Bands 601–1366 render whatever they render today; you only record it.
- No changes to any other page, any country, or the lab.
- No Hostinger file deletion. `style.css` / `responsive.css` stay on disk and stay linked for every route not on the allowlist.
- No consolidation of `/preview/owned-split` route naming (still says "header-lab" in its header; leave it).
- No real notifications wiring in `NotificationNavDrop` (see the decision in section 6).
- No lint-debt fixes elsewhere (`cvready-program-discover.tsx:118` stays).

---

## 6. One decision the owner must make before HR-A2 (not before HR-A1)

**Notifications.** The string header shows the logged-in student's **real** notification rows (`applyAuthenticatedShell` injects them). The React `NotificationNavDrop` shows **fixture rows** (`HEADER_NAV.notifications.fixtures`) and only takes `unreadCount`. The lab was QC'd with fixtures. So after HR-A2, a logged-in student on live `/about` would see fixture notifications instead of their own.

Options for the owner (Opus does not pick):

- **A.** Accept fixtures on `/about` for now (same as the lab); real rows come in the notifications backend gate later. Fastest, matches the locked lab.
- **B.** Before HR-A2, a small named gate `HR-N`: add a `notifications` prop to `NotificationNavDrop` (rows in the exact backend shape from `state.notifications`), fixtures only when the prop is absent. This touches a LOCKED chrome file, so it needs its own GO AHEAD and its own state sheet.

Write this question in the HR-A1 DONE report. Do not start HR-A2 until the owner answers.

Everything else that the string pipeline did to the header/footer is already covered by React props or is a no-op on these blocks (verified while planning: the footer HTML has no login/premium anchors, so `applyAuthenticatedShell(footer)` and `applyPremiumBusinessRule(footer)` changed nothing).

---

## 7. Step-by-step — Gate HR-A1 (preview)

Terminal commands are for the **owner** to paste, one at a time. You (Opus) cannot reach GitHub or run the dev server; the owner's Mac shell can. When you need output, ask for it and wait.

### Step 0 — Branch and dev server

Owner, in Terminal, one line at a time:

```
cd ~/Documents/GitHub/pgs-v3
git status -sb
```
Expect: `## feat/track-a-search-results...` and no uncommitted files. If there are uncommitted files, STOP and tell Opus what they are.

```
git checkout -b feat/track-a-hr-about
```
Expect: `Switched to a new branch 'feat/track-a-hr-about'`.

```
pnpm dev
```
Expect: `- Local: http://localhost:7100`. Leave this window open.

### Step 1 — Baseline numbers BEFORE any edit (the ruler)

You measure three pages at four widths **before touching code**. Use the desktop app's built-in browser (`mcp__remote-devices__Claude_Browser__*`): open the URL with `preview_start`, set the width with `resize_window` (1500, 1100, 700, 390; height 900), then run the snippet below with `javascript_tool` and paste the JSON into the table in section 9.

Pages: `http://localhost:7100/about` (live, read-only ruler — say "read-only" in chat) · `http://localhost:7100/preview/about` (what you will change) · `http://localhost:7100/preview/header` (chrome truth).

Snippet (run as-is; it only reads):

```js
(() => {
  const r = (s) => { const e = document.querySelector(s); if (!e) return "MISSING";
    const b = e.getBoundingClientRect(); return `${Math.round(b.top)},${Math.round(b.left)},${Math.round(b.width)}x${Math.round(b.height)}`; };
  const sel = {
    header: "header.pgs-figma-header",
    bar: "header.pgs-figma-header .pgs-header-bar",
    strip: ".pgs-strip-tools",
    toggle: "#toggleBtn",
    univMeet: "#univMeet",
    search: ".pgs-search",
    hero: ".about-hero",
    heroText: ".about-hero__opening",
    footer: ".footer-bg",
    mentorCard: ".card-bg-pruple.w-210px",
    copyright: ".copyrght"
  };
  const out = { w: innerWidth, scrollW: document.documentElement.scrollWidth,
    zoom: getComputedStyle(document.documentElement).zoom,
    css: [...document.styleSheets].map(s => (s.href||"").split("/").slice(-2).join("/")).filter(Boolean).join(" | ") };
  for (const [k, s] of Object.entries(sel)) out[k] = r(s);
  return JSON.stringify(out);
})()
```

Each value is `top,left,widthxheight`. `scrollW` must equal `w` (no horizontal overflow). `css` tells you whether the page loaded `assets/css/style.css` (Hostinger) or `preview/owned-split` (owned).

Rules for the baseline:
- `/preview/header` has no `.about-hero`; those cells say MISSING. That is fine.
- Record every cell. Do not skip a band because "it looked the same".
- Also take one screenshot per band per page (`computer` → screenshot) so the owner can see the before. Name them in chat like `before-preview-about-390`.

### Step 2 — `src/app/layout.tsx` allowlist

Open the file. Find these lines:

```tsx
  /**
   * OWN-LINK-H: header lab only. Hostinger style.css + responsive.css
   * are replaced by the owned split. Every other route stays on Hostinger.
   */
  const isHeaderOwnedLab = pathname === "/preview/header";
```

Replace with:

```tsx
  /**
   * OWN-LINK: routes on the owned split (1:1 copy of Hostinger style.css +
   * responsive.css, decision 27/32). Every route not listed stays on Hostinger.
   * Add a route here only inside that route's H-R gate.
   *   /preview/header  — chrome lab (OWN-LINK-H)
   *   /preview/about   — About H-R pilot, gate HR-A1
   */
  const OWNED_SPLIT_ROUTES = new Set(["/preview/header", "/preview/about"]);
  const isOwnedSplitRoute = OWNED_SPLIT_ROUTES.has(pathname);
```

Then, lower in the same file, change `{isHeaderOwnedLab ? (` to `{isOwnedSplitRoute ? (`. Nothing else in the file changes.

Check: `grep -n "isHeaderOwnedLab" src/app/layout.tsx` must print nothing.

### Step 3 — `src/app/preview/about/page.tsx` (full replacement)

Replace the whole file with this. Read it once before pasting so you understand each line (comments explain the intent).

```tsx
/**
 * Preview QC — About Us on React chrome (H-R pilot, gate HR-A1).
 * Header = <PublicHeader/> (React, same as /preview/header)
 * Strip  = string (public-strip.ts) with the React sidebar + search-results portaled in (same as lab)
 * Body   = AboutPreviewShell (QC'd, untouched)
 * Footer = <PublicFooter/> (React, same DOM as public-footer.html)
 * CSS    = owned split via layout.tsx allowlist (no Hostinger style.css / responsive.css).
 * Live `/about` flips to this exact tree at gate HR-A2.
 */
import { LegacyPage } from "@/components/legacy-page";
import { applyStudentIdentity } from "@/components/recovered-student-legacy-page";
import { AboutPreviewShell } from "@/features/about/about-preview-shell";
import { PublicFooter } from "@/features/shell/public-footer";
import { PublicHeader } from "@/features/shell/public-header";
import { PublicSidebarPortal } from "@/features/shell/public-sidebar-portal";
import { SearchResultsStripPortal } from "@/features/shell/search-results-strip-portal";
import { buildPublicStripHtml } from "@/features/shell/public-strip";
import { getPublishedUnivMeet } from "@/features/shell/univmeet-slots";
import "@/features/shell/legacy-header-breakpoints.css";
import { applyAuthenticatedShell } from "@/lib/account-shell";
import { applyPremiumBusinessRule } from "@/lib/premium-business-rule";
import { withPreviewLoginReturn } from "@/lib/preview-login-return";
import {
  resolveStudentExperience,
  studentExperienceAvatarUrl
} from "@/lib/student-experience";
import {
  applySharedHelloAspirant,
  HELLO_ASPIRANT_DEFAULT_AVATAR
} from "@/legacy/pages/hello-aspirant";
import {
  applySharedPublicSidebar,
  replaceFirstSidebar
} from "@/legacy/pages/public-sidebar";

export const dynamic = "force-dynamic";

export default async function AboutPreviewPage() {
  const [state, univMeet] = await Promise.all([
    resolveStudentExperience(),
    getPublishedUnivMeet()
  ]);
  // `signed` is the logged-in state or null — one variable so TypeScript narrows once.
  const signed = state && state.kind !== "anonymous" ? state : null;
  const studentState = state?.kind ?? "anonymous";
  const name = signed ? signed.name : null;
  const helloAvatar = signed
    ? await studentExperienceAvatarUrl(signed)
    : HELLO_ASPIRANT_DEFAULT_AVATAR;

  const previewPath = "/preview/about";
  const loginHref = `/login?redirect=${encodeURIComponent(previewPath)}`;

  // Strip stays a string until the strip becomes React (not this gate).
  let stripHtml = buildPublicStripHtml(univMeet);
  stripHtml = applySharedPublicSidebar(stripHtml, studentState, {
    name: name ?? "User"
  });
  stripHtml = applySharedHelloAspirant(stripHtml, studentState, {
    name: name ?? "Aspirant",
    avatarUrl: helloAvatar
  });
  if (signed) {
    stripHtml = applyAuthenticatedShell(stripHtml, {
      name: signed.name,
      unreadCount: signed.unreadCount,
      premium: signed.kind === "authenticated_premium",
      notifications: signed.notifications,
      notificationReadOnly: Boolean(signed.preview)
    });
    stripHtml = applyStudentIdentity(stripHtml, signed, helloAvatar);
  }
  stripHtml = applyPremiumBusinessRule(stripHtml);
  stripHtml = withPreviewLoginReturn(stripHtml, previewPath);
  // String #sidebar → mount slot for the React open toggle box (T-1 pattern).
  stripHtml = replaceFirstSidebar(stripHtml, '<div data-pgs-sidebar-slot></div>');

  return (
    <LegacyPage page="preview-about" studentState={studentState}>
      <PublicHeader
        loginHref={loginHref}
        avatarUrl={signed ? helloAvatar : null}
        unreadCount={signed ? signed.unreadCount : 0}
        univMeet={univMeet}
      />
      <div dangerouslySetInnerHTML={{ __html: stripHtml }} />
      {/* SR-2a: typing in the strip field drives the React results card */}
      <SearchResultsStripPortal />
      {/* T-1: open toggle box (#sidebar) as React, portaled into the strip's slot */}
      <PublicSidebarPortal
        signedIn={Boolean(signed)}
        name={name ?? "User"}
        loginHref={loginHref}
      />
      <AboutPreviewShell />
      <PublicFooter />
    </LegacyPage>
  );
}
```

What is deliberately different from the lab page: no `?loggedOut=1` switch, no fake lab avatar, no `HeaderPreviewShell` stage, no `viewport` export (H7-LIVE is not this gate). What is deliberately the same: the strip pipeline and both portals, in the same order.

### Step 4 — Type and lint check

Owner, in a second Terminal window:

```
pnpm typecheck
```
Expect: no output and the prompt returns (zero errors). If errors appear, paste them to Opus. Opus fixes only inside the two files from steps 2–3. An error pointing anywhere else = STOP and ask.

```
pnpm lint
```
Expect: no warnings, no errors. (Known debt at `cvready-program-discover.tsx:118` is a pre-existing warning only if it shows up; if `--max-warnings=0` fails on it, say so — do not fix it here.)

### Step 5 — Measure AFTER on `/preview/about`

Reload `http://localhost:7100/preview/about`, run the step-1 snippet at 1500 · 1100 · 700 · 390, fill the AFTER column in section 9, and screenshot each band (`after-preview-about-390` …).

Then compare, cell by cell:

| Cell | Expected relation | If not |
|---|---|---|
| `css` | contains `preview/owned-split`, does NOT contain `assets/css/style.css` or `responsive.css` | STOP: layout allowlist did not apply (check `x-pathname` header / route string) |
| `scrollW` | equals `w` at every band | STOP: horizontal overflow — name the widest element, do not fix |
| `header`, `bar` | equal to `/preview/header` at the same band (chrome truth) | STOP |
| `strip`, `toggle`, `univMeet`, `search` | equal to `/preview/header` at the same band | STOP |
| `hero`, `heroText` at 1500 and 1100 | equal to BEFORE (`/preview/about`) | STOP |
| `hero`, `heroText` at 700 and 390 | **top is allowed to move up by the same amount the header shrank** (decision note 42: React header ≈12px shorter at ≤600; body pull is strip-tied so header→strip→toggle→body move together). Width/height/left unchanged. | Any width/height/left change, or a top delta different from the header delta = STOP |
| `footer`, `mentorCard`, `copyright` | width/height/left equal to BEFORE at every band; top may shift by the same delta as the hero | Otherwise STOP |

Write the deltas in section 9 as numbers (`hero.top −12`), not words.

### Step 6 — State sheet + interaction checklist (no code)

Owner lock §9: before the owner QCs, write the state sheet. Since every piece was already QC'd on the lab, your sheet is a **"same as lab?"** check. Do each row on `/preview/about` at 1500 and 390 (and 700 for the drawer), compare against `/preview/header`, and mark ✓ or the difference.

| Piece | State to try | Same as `/preview/header`? |
|---|---|---|
| Header tabs (`#feed`, Premium, CV Ready, CV Medical, `#me`, studyAbroad) | hover · open drop · close on outside click · Esc | |
| Bell | open panel · close | |
| Login button (logged out) | click → goes to `/login?redirect=%2Fpreview%2Fabout` | |
| Avatar (logged in) | open → Logout card | |
| Hamburger (≤1366) | open drawer · `#studyAbroad` + `#me` open by default · close X · outside click · Esc | |
| Drawer univMeet + drawer search | typing shows results card | |
| Strip search (≥801) | typing 2+ chars shows the React card under the field · arrow keys · Esc | |
| `#toggleBtn` | opens the React toggle box · rows · `#exploreCountries` accordion (≤800) / pop-right card (>1366) · close | |
| Footer "Join The Team!" | click → `window.joinPremiumOpen` (note: preview labs do not load `main.js`, so the modal may not open on preview; say so — it is the same on the lab) | |
| Page scroll with drawer open | body locked / not locked exactly as lab | |
| Touch (390): tap a tab, tap outside | no sticky hover left behind | |

Anything not ✓ = write it in the DONE report as a delta and STOP for the owner; do not fix chrome files.

### Step 7 — Footer DOM parity (React footer vs string footer)

The owner QC'd the footer with the **string** footer + owned split (decision 40: 0 of 61 elements differed). The React `<PublicFooter/>` is a port "with the same DOM/classes" — prove it. Run this on `/about` (string footer, read-only ruler) and on `/preview/about` (React footer) at 1500 and 390, and diff the two outputs (save each to a scratch file and compare line by line):

```js
(() => {
  const keys = ["width","height","fontSize","fontWeight","lineHeight","color","backgroundColor",
    "marginTop","marginBottom","paddingTop","paddingBottom","paddingLeft","paddingRight","display","gap"];
  const els = [...document.querySelectorAll(".footer-bg, .footer-bg *")];
  return els.map((e, i) => {
    const cs = getComputedStyle(e); const b = e.getBoundingClientRect();
    return `${i} ${e.tagName.toLowerCase()}.${[...e.classList].join(".")} ${Math.round(b.width)}x${Math.round(b.height)} ` +
      keys.map(k => `${k}=${cs[k]}`).join(" ");
  }).join("\n");
})()
```

Expected: identical line count and identical lines except the `Join The Team!` button, which in React has no `onclick` attribute (behaviour is the React handler) — that is a DOM attribute, not a style, so it should not show here at all. Any other difference = STOP and report it (it is either a port bug in `public-footer.tsx` — LOCKED, owner decides — or a cascade difference).

### Step 8 — DONE report for HR-A1 (post in chat, then wait)

Use exactly this shape (owner lock §6):

```
DONE HR-A1 — /preview/about on React chrome + owned split (preview only, live untouched)

Preview: http://localhost:7100/preview/about   Ruler (read-only): http://localhost:7100/about   Chrome truth: http://localhost:7100/preview/header

Files changed
| File | Where | What |
| src/app/layout.tsx | OWNED_SPLIT_ROUTES (line N) | allowlist: + /preview/about |
| src/app/preview/about/page.tsx | whole file | React header/footer, portals, string strip |

Measured (1500 · 1100 · 700 · 390): <paste the section-9 table>
Expected deltas seen: <e.g. 390: header −12 → strip/toggle/hero/footer all −12; nothing else>
Unexpected deltas: none / <list>
State sheet: <all ✓ / list>
Footer parity: 0 lines differ at 1500 and 390 / <list>
typecheck ✓  lint ✓

Decision needed before HR-A2: notifications A (fixtures, as lab) or B (HR-N gate). See plan §6.
Owner next: QC on the preview link; then `GO AHEAD HR-A2` (+ A or B).
```

Do not commit yet. The owner may nudge. A named nudge on the **page file** is a direct edit; a nudge that needs a LOCKED chrome file is a new plan.

---

## 8. Step-by-step — Gate HR-A2 (live cutover)

Only after: owner QC passed on preview **and** owner wrote `GO AHEAD HR-A2` **and** answered §6.

### Step 9 — Baseline live once more

Run the step-1 snippet on `http://localhost:7100/about` at the four widths again (it is the BEFORE for live; numbers should match step 1's live column — if they moved, someone changed something; STOP).

### Step 10 — `src/app/layout.tsx`

Add `/about` to the Set and to the comment:

```tsx
  const OWNED_SPLIT_ROUTES = new Set(["/preview/header", "/preview/about", "/about"]);
```
(with a comment line `*   /about           — About live, gate HR-A2`).

### Step 11 — `src/app/about/page.tsx` (full replacement)

Same as step 3 with five differences: header comment, `generateMetadata` kept, `page="about"`, `<AboutPreviewShell live />`, no `withPreviewLoginReturn`, `loginHref` is the plain default.

```tsx
/**
 * Live `/about` — About Us body on React chrome (H-R pilot, gate HR-A2).
 * Same tree as `/preview/about`: React header/footer, string strip with React
 * sidebar + search-results portals, QC'd modular body, owned split CSS
 * (layout.tsx allowlist). Hostinger `aboutHtml` is not served.
 */
import { LegacyPage } from "@/components/legacy-page";
import { applyStudentIdentity } from "@/components/recovered-student-legacy-page";
import { AboutPreviewShell } from "@/features/about/about-preview-shell";
import { HEADER_NAV } from "@/features/shell/header-nav";
import { PublicFooter } from "@/features/shell/public-footer";
import { PublicHeader } from "@/features/shell/public-header";
import { PublicSidebarPortal } from "@/features/shell/public-sidebar-portal";
import { SearchResultsStripPortal } from "@/features/shell/search-results-strip-portal";
import { buildPublicStripHtml } from "@/features/shell/public-strip";
import { getPublishedUnivMeet } from "@/features/shell/univmeet-slots";
import "@/features/shell/legacy-header-breakpoints.css";
import { applyAuthenticatedShell } from "@/lib/account-shell";
import { cmsMetadata } from "@/lib/cms-metadata";
import { applyPremiumBusinessRule } from "@/lib/premium-business-rule";
import {
  resolveStudentExperience,
  studentExperienceAvatarUrl
} from "@/lib/student-experience";
import {
  applySharedHelloAspirant,
  HELLO_ASPIRANT_DEFAULT_AVATAR
} from "@/legacy/pages/hello-aspirant";
import {
  applySharedPublicSidebar,
  replaceFirstSidebar
} from "@/legacy/pages/public-sidebar";

export async function generateMetadata() {
  return cmsMetadata("about");
}

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const [state, univMeet] = await Promise.all([
    resolveStudentExperience(),
    getPublishedUnivMeet()
  ]);
  const signed = state && state.kind !== "anonymous" ? state : null;
  const studentState = state?.kind ?? "anonymous";
  const name = signed ? signed.name : null;
  const helloAvatar = signed
    ? await studentExperienceAvatarUrl(signed)
    : HELLO_ASPIRANT_DEFAULT_AVATAR;

  const loginHref = HEADER_NAV.login.href;

  let stripHtml = buildPublicStripHtml(univMeet);
  stripHtml = applySharedPublicSidebar(stripHtml, studentState, {
    name: name ?? "User"
  });
  stripHtml = applySharedHelloAspirant(stripHtml, studentState, {
    name: name ?? "Aspirant",
    avatarUrl: helloAvatar
  });
  if (signed) {
    stripHtml = applyAuthenticatedShell(stripHtml, {
      name: signed.name,
      unreadCount: signed.unreadCount,
      premium: signed.kind === "authenticated_premium",
      notifications: signed.notifications,
      notificationReadOnly: Boolean(signed.preview)
    });
    stripHtml = applyStudentIdentity(stripHtml, signed, helloAvatar);
  }
  stripHtml = applyPremiumBusinessRule(stripHtml);
  stripHtml = replaceFirstSidebar(stripHtml, '<div data-pgs-sidebar-slot></div>');

  return (
    <LegacyPage page="about" studentState={studentState}>
      <PublicHeader
        loginHref={loginHref}
        avatarUrl={signed ? helloAvatar : null}
        unreadCount={signed ? signed.unreadCount : 0}
        univMeet={univMeet}
      />
      <div dangerouslySetInnerHTML={{ __html: stripHtml }} />
      <SearchResultsStripPortal />
      <PublicSidebarPortal
        signedIn={Boolean(signed)}
        name={name ?? "User"}
        loginHref={loginHref}
      />
      <AboutPreviewShell live />
      <PublicFooter />
    </LegacyPage>
  );
}
```

Check after pasting: `grep -n "getPublicHeaderHtml\|getPublicFooterHtml\|applyUnivMeetToHeaderHtml" src/app/about/page.tsx` must print nothing (no string chrome left on this route — that is the H-R definition of done).

### Step 12 — Live has `main.js`; preview does not. Extra checks.

The root layout loads Hostinger `vendors.min.js` + `main.js` on live routes only (labs skip them). `main.js` looks for `header nav.navbar` (the string header had that class; the React header does not), so its header-height / sticky code now finds nothing on `/about`. The About body does not use `.top-space-margin` / `.top-space-padding` (verified while planning), so nothing should depend on it. Prove it:

1. Owner runs `pnpm typecheck` then `pnpm lint` (as step 4).
2. Open `http://localhost:7100/about` in the built-in browser, run the step-1 snippet at 1500 · 1100 · 700 · 390 → section 9 live AFTER column. Same expected-delta rules as step 5, compared against step 9.
3. `read_console_messages` on `/about` at 1500 and 390: expect no new errors versus `/preview/about`. A `main.js` error mentioning `navbar`/`header` = report it, do not patch `main.js`.
4. Scroll down 600px and back at 1500 and 390: header stays sticky at top (that is `globals.css`, not `main.js`). Screenshot.
5. Repeat the step-6 sheet on live, only the rows that involve JS from `main.js`: hamburger drawer, `#toggleBtn`, footer "Join The Team!" (this one should now open the modal because `main.js` is present).
6. Repeat step 7 footer parity? Not needed — the DOM did not change between preview and live; skip and say so.

### Step 13 — Tests (owner runs)

```
pnpm test
```
Expect: all vitest suites green (`public-strip.test.ts`, `public-header.test.ts` are string-level and unaffected).

```
pnpm build
```
Expect: `✓ Compiled` and a route table; `/about` and `/preview/about` listed as dynamic (ƒ).

```
pnpm exec playwright test tests/e2e/public-pages.spec.ts --project=desktop --project=mobile
```
Expect: green. (Playwright reuses the running dev server on 7100; if `pnpm dev` is not running it starts `next start`, which needs the `pnpm build` above.) The About test only checks the body text "Why 98% of Our Students Get Accepted".

```
pnpm exec playwright test tests/e2e/visual-parity.spec.ts -g about --project=desktop --project=mobile
```
Expect: **red** for `about` — the header pixels changed on purpose. Only after the owner says live QC passed:

```
pnpm exec playwright test tests/e2e/visual-parity.spec.ts -g about --project=desktop --project=mobile --update-snapshots
```
Expect: snapshots rewritten for about only. Run the previous command again → green. Do not update any other snapshot.

### Step 14 — Docs (Opus edits, small and exact)

1. `docs/HEADER-CHROME-PHASE.md` decisions table — add rows in the same style:
   - `| 49 | **HR-A1 (2026-MM-DD):** /preview/about on React header + React footer + sidebar/search portals; strip still string; owned split via layout allowlist. Measured 1500·1100·700·390; ≤600 stack −12px (note 42) only. Owner Preview QC PASSED. | **Locked** |`
   - `| 50 | **HR-A2 (2026-MM-DD):** live /about on the same tree; /about on the owned-split allowlist; no string chrome on the route; main.js present, no console errors; visual-parity about snapshot refreshed. Notifications: option <A|B>. | **Locked** |`
   - Also tick the checklist line "Grep: chrome mount path no longer dangerouslySetInnerHTML for header/footer" with "(About ✓; other pages pending)".
2. `docs/ABOUT-MODULAR.md` "Two surfaces": both rows → "React chrome (H-R, decisions 49/50) + owned split; strip string until the strip gate".
3. `src/features/shell/OWNED-CHROME-UNLINKED.md` "Still linked" → Hostinger row exception list: `/preview/header`, `/preview/about`, `/about`.
4. Header comments in `public-sidebar-portal.tsx` and `search-results-strip-portal.tsx`: change "Delete at H-R" / "until H-R" to "until the strip becomes React (serves lab + H-R pages)". Comment only. No code.
5. Copy section 10 of this plan into `docs/HR-PAGE-CHECKLIST.md` with the About numbers filled in, so the next page's chat starts from it.

### Step 15 — Commit (owner runs)

```
git add -A
git -c user.name="project-mtfbwu" -c user.email="project.mtfbwu@gmail.com" commit -m "H-R pilot: About on React header/footer + owned split (HR-A1 preview, HR-A2 live); decisions 49-50; HR page checklist"
```
Expect: one commit, files listed. Then:

```
git push -u origin feat/track-a-hr-about
```
Expect: `branch 'feat/track-a-hr-about' set up to track 'origin/feat/track-a-hr-about'`.

Opus: end with the DONE HR-A2 report in the same shape as step 8, with the live link, the live measured table, console result, tests result, and the docs rows added.

---

## 9. Measurement tables (Opus fills in)

Format per cell: `top,left,WxH`. Bands: 1500 · 1100 · 700 · 390.

### 9.1 BEFORE (step 1)

| Band | Page | css | scrollW | header | bar | strip | toggle | univMeet | search | hero | heroText | footer | mentorCard | copyright |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1500 | /about | | | | | | | | | | | | | |
| 1500 | /preview/about | | | | | | | | | | | | | |
| 1500 | /preview/header | | | | | | | | | — | — | | | |
| 1100 | /about | | | | | | | | | | | | | |
| 1100 | /preview/about | | | | | | | | | | | | | |
| 1100 | /preview/header | | | | | | | | | — | — | | | |
| 700 | /about | | | | | | | | | | | | | |
| 700 | /preview/about | | | | | | | | | | | | | |
| 700 | /preview/header | | | | | | | | | — | — | | | |
| 390 | /about | | | | | | | | | | | | | |
| 390 | /preview/about | | | | | | | | | | | | | |
| 390 | /preview/header | | | | | | | | | — | — | | | |

### 9.2 AFTER preview (step 5) and deltas vs BEFORE `/preview/about`

Same columns; one row per band; below it one row of deltas (`0` or `−12` etc.).

### 9.3 AFTER live (step 12) and deltas vs step-9 live BEFORE

Same.

---

## 10. The reusable per-page H-R checklist (what other pages copy)

For page `<route>` with preview `/preview/<lab>` and body component `<Body>`:

1. Read section 0 files. Confirm the body is QC'd (its `*-MODULAR.md` says CUTOVER DONE) — otherwise the page is not ready for H-R.
2. Baseline: snippet at 1500·1100·700·390 on live, preview, `/preview/header`. Screenshots.
3. `layout.tsx`: add `/preview/<lab>` to `OWNED_SPLIT_ROUTES`.
4. Preview page: React header + string strip (sidebar slot + both portals) + `<Body/>` + React footer. Remove `getPublicHeaderHtml`, `getPublicFooterHtml`, `applyUnivMeetToHeaderHtml`. Keep the page's own extras (metadata, page-specific props).
5. typecheck + lint (owner).
6. Measure AFTER; only allowed delta = the header-height delta moving the whole stack (≤600 ≈ −12). Anything else = STOP.
7. State sheet "same as lab?" (section 7, step 6 table).
8. Footer parity snippet (skip once three pages have proven 0 diff — say which pages).
9. Check the page body does not use `.top-space-margin` / `.top-space-padding` / `header nav.navbar` (grep the family folder); if it does, STOP — `main.js` will behave differently on live.
10. DONE HR-<page>-1 report → owner Preview QC → `GO AHEAD HR-<page>-2`.
11. Live: allowlist + live page file + console check + sticky scroll check + `pnpm test` + `pnpm build` + `public-pages.spec` + refresh that page's visual-parity snapshot after owner QC.
12. Docs: decision row, page MODULAR map, OWNED-CHROME-UNLINKED exception list. Commit with the project author. Owner pushes.
13. Countries: run this on the pilot country only; then the slug-swap propagation script (owner decision 2026-09-27) and the normalised-diff guard — that is its own plan.

---

## 11. STOP conditions (say "STOP —" and the number)

1. Any edit needed in a file from the "must NOT open" list.
2. Any measured delta that is not "the whole stack moved by the header delta".
3. `scrollW ≠ w` at any band.
4. `css` on `/preview/about` still lists Hostinger `style.css`.
5. Typecheck/lint error outside `layout.tsx` and the page file.
6. Footer parity shows any differing line.
7. A state-sheet row not ✓.
8. Console error from `main.js` on live.
9. The owner's §6 answer is missing when you reach HR-A2.
10. `git status` shows files you did not touch.
