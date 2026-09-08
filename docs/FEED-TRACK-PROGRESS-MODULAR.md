# Track Your Progress — modular body map

Living map for the owner. Update at **phase ends**.

**Rule:** Preview first → owner Preview QC → live doorman. Skill: `pgs-student-family-doorman`.

Same method as [`docs/STUDENT-FEED-MODULAR.md`](./STUDENT-FEED-MODULAR.md).

**Backend wire (living):** [`docs/FEED-TRACK-PROGRESS-KANBAN.md`](./FEED-TRACK-PROGRESS-KANBAN.md).

---

## Two surfaces (do not confuse)

| Surface | URL | What it is |
|---|---|---|
| **Preview Family A (locked)** | `/preview/feed-track-progress` | Modular React body — **anon + standard**. **QC PASSED** 2026-09-08. Locked chrome. |
| **Preview Family B (Premium)** | `/preview/feed-track-progress-premium` | Modular React body — **Premium unlocked**. Figma desktop `17041:12619` · mobile `206:8075`. |
| **Live (B-live)** | `/feed_track_progress` | **Hostinger-free doorman** — anon+standard → Family A · Premium → Family B |
| **Loopboard import** | separate brainstorm | Board UI stand-in until owner Loopboard swap |

**Do not** use a query flag on Family A for Premium — separate shells (CMS stays unmixed).

---

## Responsive bands

| Band | Width | Family A | Family B |
|---|---|---|---|
| Desktop | **>1366** | Blocks 1–9 **QC PASSED** | **P0–P9** IN QC |
| Mobile | **≤600** | Blocks 1–9 **QC PASSED** | **P0–P9** IN QC |
| iPad | **601–1366** | Deferred | Deferred |

Ignore Hostinger 767.

---

## Section order — Family A (locked)

Source: `src/features/feed-track-progress/feed-track-progress-preview-shell.tsx`

| # | Section | Module | Status | Figma |
|---|---|---|---|---|
| 1 | Title + Important Alerts + intro | `feed-track-progress-hero` | **QC PASSED** | Desktop alerts lock `17041:16262` · Mobile `210:3352` |
| 2 | #draftMeter | `feed-track-progress-draft-meter` | **QC PASSED** | Desktop `17041:13195` · Mobile `210:3371` |
| — | Meters stack lock wrapper | `feed-track-progress-meters-stack` | **QC PASSED** | Desktop `17041:14475` — grows with Blocks 3–4 |
| 3 | #reviewQueue | `feed-track-progress-review-queue` | **QC PASSED** | Desktop `17041:14094` · Mobile `210:3393` |
| 4 | #counselorNotes | `feed-track-progress-counselor-notes` | **QC PASSED** | Desktop `17041:14120` · Mobile `210:3418` |
| 5 | #PGS Loopboard intro | `feed-track-progress-loopboard-intro` | **QC PASSED** | Desktop `17041:14167` · Mobile `210:3457` |
| 6 | 4-column board UI stand-in | `feed-track-progress-board` | **QC PASSED** | Black panel `17041:14070` · cols `17041:14140` · lock `17041:14481` — **not** Loopboard import |
| 7 | Pathway chips | inside board panel | **QC PASSED** | On black panel · Desktop `17041:14210`–`14215` · Mobile `210:3618` |
| 8 | Useful Tips | `feed-track-progress-tips` | **QC PASSED** | Desktop `17041:14174` · Mobile `210:3629` — **W0** fixture scroll + CSS click; **CMS tips = backend pass** |
| 9 | Resource Drop | `feed-track-progress-resource-drop` | **QC PASSED** | Desktop `17041:14220` · Mobile `210:3647` — UI labels + badges; **real links = backend pass** |

Chrome (header / sidebar / Hello / footer) = **LOCKED**. Not this family’s body work.

---

## Section order — Family B (Premium)

Source: `src/features/feed-track-progress/feed-track-progress-premium-shell.tsx`

| Gate | Section | Status | Figma |
|---|---|---|---|
| **P0** | Premium preview shell + locked chrome | **DONE** | Desktop `17041:12619` · Mobile `206:8075` |
| **P1** | Title + Important Alerts + intro (unlocked) | **IN QC** | Alerts `17041:13319` / mobile `207:2262` — fixtures kept for backend; **no frost** |
| **P2** | #draftMeter (no frost) | **IN QC** | Desktop `17041:13195` — same fixtures; **no** meters-stack lock |
| **P3** | #reviewQueue (no frost) | **IN QC** | Same fixtures + visual switches; **no** meters-stack lock |
| **P4** | #counselorNotes (no frost) | **IN QC** | Same fixtures; **no** meters-stack lock |
| **P5** | #PGS Loopboard intro | **IN QC** | Same fixtures · outside meters rail · Premium desktop `17041:13291` |
| **P6–P7** | Board UI stand-in + pathway (**no** Loopboard swap yet) | **IN QC** | Premium panel `17041:13192` · pathway nested · **no frost** · later swap with owner Loopboard |
| **P8** | Useful Tips | **IN QC** | Same W0 fixture carousel + CSS click · **CMS = backend pass** |
| **P9** | Resource Drop | **IN QC** | Same labels + yellow badges · **links = backend pass** |

---

## Locked owner decisions

### Family A (locked)
- This family = **anon / standard**, Figma design, **mostly static + locked**
- **Desktop locked authority = `17041:14026`** (frost + lock). Older docs calling `14026` “active” are wrong for locks — owner corrected 2026-09-08
- Mobile locked = `210:3346`
- Option **C**: alerts lock now; meters use one shared wrapper that grows for Blocks 3–4
- Locked preview does **not** bind `student_alerts`
- Pathway chips sit **on the Loopboard black panel** (not a separate white page block)
- Hostinger locked view we replace later: `lock_feed_track_progress` (V3 copy: `src/legacy/generated/progress-locked/`)
- **Owner QC 2026-09-08:** Family A locked body (anon + standard) **PASSED** desktop + mobile

### Family B (Premium)
- Desktop Premium = `17041:12619` · Mobile Premium = `206:8075` (owner 2026-09-08)
- **No frost locks** on alerts / meters / board
- Meters column = same **centered rail** as Figma `17041:13194` (~780 desktop · ~35px mobile inset) via `FeedTrackProgressMetersStack locked={false}`
- Kanban = **keep Figma UI stand-in** until owner Loopboard swap
- Alerts + meter/review/notes keep **fixture reference** for backend linking — do not invent
- **Resource Drop links** + **Useful Tips CMS** = **backend pass**
- Do not invent Premium-only sections not in the two Figma nodes
- Existing Ops/CMS/backend = **keep**. No new tables this UI pass

---

## Deferred

- Family B body UI **P0–P9** → owner Preview QC (then mark QC PASSED)
- **Backend pass** — see [`FEED-TRACK-PROGRESS-KANBAN.md`](./FEED-TRACK-PROGRESS-KANBAN.md) (**B0 done**; B1 alerts next)
  - wire domains (`student_alerts`, meter, reviews, notes)
  - **Useful Tips CMS** + **Resource Drop links** only after owner picks source
- Loopboard import / swap into board stand-in
- iPad
- Live cutover (replace Hostinger locked HTML + condensed `PremiumProgressBoard`)
- Separate anonymous preview URL (chrome follows login on the one preview)

---

## How we work

1. Propose → GO AHEAD → implement one gate UI
2. Owner Preview QC desktop + phone
3. Next gate — wait for GO AHEAD

---

## Phase log

| When | What |
|---|---|
| 2026-09-08 | **0+1** preview shell + Block 1 (title / alerts / intro) fixtures |
| 2026-09-08 | **2** #draftMeter fixtures |
| 2026-09-08 | **locks C** desktop alerts forlocked + meters-stack shared lock (`17041:14026`) |
| 2026-09-08 | **3** #reviewQueue fixtures inside meters stack |
| 2026-09-08 | **4** #counselorNotes fixtures inside meters stack |
| 2026-09-08 | **5** #PGS Loopboard intro (title + copy; no board) |
| 2026-09-08 | **6** 4-col board visual stand-in + forlocked (no Loopboard import) |
| 2026-09-08 | **7** pathway chips (`stem PATHWAY` + yellow/cyan fixtures) |
| 2026-09-08 | **6/7 fix** black Loopboard panel (`#000`) · pathway nested inside panel |
| 2026-09-08 | **8** Useful Tips static carousel (one Figma tip + 3 dots) |
| 2026-09-08 | **Tips W0** fixture arrow/dot scroll (same tip × 3; CMS W1+ deferred) |
| 2026-09-08 | **Tips CSS click** slide in/out between arrow/dot clicks (countries CSS-click half) |
| 2026-09-08 | **9** Resource Drop labels + yellow badges (no invented links) |
| 2026-09-08 | **Family A QC PASSED** (anon + standard) · Resource Drop **links deferred to backend pass** |
| 2026-09-08 | **Family B P0** Premium preview shell `/preview/feed-track-progress-premium` (empty body; Figma `17041:12619` / `206:8075`) |
| 2026-09-08 | **Family B P1** unlocked hero (title + Important Alerts + intro; same fixtures; no frost) |
| 2026-09-08 | **Family B P2** #draftMeter unlocked (no meters-stack frost; same fixtures) |
| 2026-09-08 | **Family B P3** #reviewQueue unlocked (no frost; same fixtures) |
| 2026-09-08 | **Family B P4** #counselorNotes unlocked (no frost; same fixtures) |
| 2026-09-08 | **Family B rail** meters column unlocked — desktop ~780 centered · mobile ~35px inset (Figma); no frost |
| 2026-09-08 | **Family B P5** #PGS Loopboard intro (same fixtures; outside meters rail) |
| 2026-09-08 | **Family B P6–P7** board stand-in + pathway unlocked (no frost; Loopboard swap later) |
| 2026-09-08 | **Family B P8** Useful Tips (W0 fixtures + CSS click; CMS backend pass) |
| 2026-09-08 | **Family B P9** Resource Drop (labels + badges; links backend pass) · full Premium body UI in QC |
| 2026-09-08 | **B0** backend living map → [`FEED-TRACK-PROGRESS-KANBAN.md`](./FEED-TRACK-PROGRESS-KANBAN.md) |
| 2026-09-08 | **B1** Premium preview Alerts ← `student_alerts` (honest empty; live untouched) |
| 2026-09-08 | **B-live** `/feed_track_progress` Hostinger-free · Family A (anon+standard) · Family B (Premium) · skill `pgs-student-family-doorman` |
| 2026-09-08 | **N1** #counselorNotes 8 fixtures · arrow window of 4 (click step; B4 DB later) |
| 2026-09-08 | **N1b** count = hidden **below** only · label `notes` (not pending) |
