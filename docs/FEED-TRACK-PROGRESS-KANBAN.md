# Track Your Progress — backend living map

Owner troubleshooting + **QC analysis** log. Update **after each backend gate** with WHAT · WHY · HOW (how the code works). Not every UI pixel.

Companion UI map: [`docs/FEED-TRACK-PROGRESS-MODULAR.md`](./FEED-TRACK-PROGRESS-MODULAR.md).  
Loopboard wire (separate): [`docs/LOOPBOARD-KANBAN.md`](./LOOPBOARD-KANBAN.md).  
Family split skill: `.cursor/skills/pgs-student-family-doorman/SKILL.md`  
Backend wire skill: `.cursor/skills/pgs-backend-phase-wire/SKILL.md`

**Rule (owner):** after each backend gate, append/update this MD so later QC analysis has a trail — what we did, why, how code works.

**Owner lock (2026-09-08):** Family A (anon / standard) = **static fixtures / locked Figma** — **no backend wire**. Backend gates (**B1+**) apply to **Premium Family B only**.

---

## One truth per domain

Do **not** invent second tables. Ops fills; Premium student reads the same rows (RLS).

```text
profiles (student)
  ├── student_alerts                         ← Important Alerts          [B1 wired]
  ├── student_document_requirements          ← #draftMeter (+ docs)      [B2 next]
  ├── review_queue_items                     ← #reviewQueue              [B3]
  ├── counselor_notes                        ← #counselorNotes           [B4]
  ├── student_board_columns → student_tasks  ← Loopboard                 [B6 later]
  └── premium_workspace_profiles             ← pathway / feed notes_html [B5]
```

**Not the same domain**

| UI | Truth | Do not merge with |
|---|---|---|
| Important Alerts | `student_alerts` | — |
| #counselorNotes | `counselor_notes` | Feed purple Notes (`premium_workspace_profiles.notes_html`) |
| Resource Drop (Figma labels) | **no link table yet** | Public CMS “resources” catalog; Phase 4D upload workspace |
| Useful Tips | **no tips table yet** | Hardcoded live tip; modular W0 fixtures |

---

## Surfaces (do not confuse)

| Surface | URL | Backend status |
|---|---|---|
| **Preview Family A (locked)** | `/preview/feed-track-progress` | **Static fixtures only** — never DB |
| **Preview Family B (Premium)** | `/preview/feed-track-progress-premium` | Backend wire target (B1+) |
| **Live anon / standard** | `/feed_track_progress` | Family A modular **static** (Hostinger-free) |
| **Live Premium** | `/feed_track_progress` | Family B + backend wire (B1+) |
| **Ops** | `/admin/students/[studentId]` | Staff writes same tables |

**Pass test (alerts):** Ops edit Progress lab student → live `/feed_track_progress` as that Premium student shows same ≤3 alerts.

---

## How live code works today (doorman)

```text
/feed_track_progress
  → resolveStudentExperience()
       anonymous | authenticated_standard
         → FeedTrackProgressPreviewShell     ← Family A (locked fixtures)
       authenticated_premium
         → requirePremiumActor()
         → loadProgressAlerts(studentSubjectId)   ← B1
         → FeedTrackProgressPremiumShell(alertItems)
            meters/board/tips still fixtures → B2+
```

**WHY two shells:** anon+standard share Family A; Premium is separate Family B. No `?premium=` toggle — keeps CMS shapes unmixed later.

**Ops write path (already exists — reuse, don’t invent)**

```text
Ops StaffWorkspacePanels
  → /api/staff/students/[studentId]/workspace/[resource]
       alerts        → student_alerts
       requirements  → student_document_requirements
       reviews       → review_queue_items
       notes         → counselor_notes
       tasks         → student_tasks
       profile       → premium_workspace_profiles
```

---

## Modular UI ↔ wire gates

| Modular block | Fixture today | Wire to | Gate | Status |
|---|---|---|---|---|
| Important Alerts | Family A fixtures only | `student_alerts` | **B1** | **done** (Family B live+preview) |
| #draftMeter | fixtures (Family A) | `student_document_requirements` | **B2** | **done** (Family B live+preview · approved count) |
| #reviewQueue | fixtures (Family A) | `review_queue_items` | **B3** | **done** (Family B live+preview · student_visible) |
| #counselorNotes | fixtures (Family A) | `counselor_notes` | **B4** | **done** (Family B live+preview · student_visible) |
| Pathway chips | fixtures | `premium_workspace_profiles.pathway_label` | **B5** | queued |
| Board stand-in | Figma columns | Loopboard | **B6** | queued |
| Useful Tips | W0 carousel | CMS contract TBD | **B7+** | queued |
| Resource Drop | labels only | link source TBD | **B7+** | queued |
| Live Hostinger cutover | — | modular A/B doorman | **B-live** | **done** |
| Lab identities | — | Progress Premium pair | **L0** | **done** |

---

## Progress Premium lab pair (L0)

**Ignore** real aspirants, Loopboard lab, and production staff for this wire track.

| Role | Email | UUID | Powers |
|---|---|---|---|
| **Premium student** | `progress-lab-premium@pgs.lab` | `c1000000-0000-4000-8000-000000000001` | Active Premium; read own workspace |
| **Super Admin** | `progress-lab-superadmin@pgs.lab` | `c2000000-0000-4000-8000-000000000002` | `super_admin` + mentor link |

Password: `PGS_PREVIEW_FIXTURE_PASSWORD` (see `.env.local`).

```bash
PROGRESS_LAB_SEED=I_UNDERSTAND_LAB_ONLY \
PGS_PREVIEW_PROJECT_REF=<project-ref> \
pnpm lab:progress-seed
```

Constants: `src/lib/progress-lab.ts` · Seed: `scripts/seed-progress-lab.mjs`

---

# QC analysis log — WHAT · WHY · HOW

Update this section after **every** backend gate. Later you re-read this for QC / audits.

---

### L0 — Progress Premium lab pair

| | |
|---|---|
| **WHAT** | Created a **new** lab Premium student + Super Admin (not the anonymous feed placebo / existing aspirants). Seeded 3 Important Alerts. |
| **WHY** | Need a clean pair to click Ops → Student without touching real users while wiring backend. |
| **HOW (code)** | `scripts/seed-progress-lab.mjs` creates Auth users (fixed UUIDs), `profiles`, `staff_profiles` + `staff_role_assignments` (`super_admin`), `premium_entitlements`, `mentor_assignments`, clears+inserts `student_alerts`. Guard: `PROGRESS_LAB_SEED=I_UNDERSTAND_LAB_ONLY` + project ref match. |
| **FILES** | `src/lib/progress-lab.ts` · `scripts/seed-progress-lab.mjs` · `package.json` `lab:progress-seed` |
| **LIVE SAFETY** | Lab `@pgs.lab` only. Not production Vercel. |
| **HOW YOU QC** | Login `progress-lab-premium@pgs.lab` → `/feed_track_progress` · Super Admin → Ops that student UUID. |

---

### B0 — Living map

| | |
|---|---|
| **WHAT** | This document. No product code. |
| **WHY** | Map FE → tables before coding so we don’t invent domains. |
| **HOW** | Connection diagram + gate queue only. |

---

### B1 — Important Alerts ← `student_alerts`

| | |
|---|---|
| **WHAT** | Family B Important Alerts read **real** `student_alerts` (active, sort_order, ≤3). Empty = honest empty copy. Family A stays Figma fixtures. |
| **WHY** | Same truth Ops already writes; student must see mentor alerts. |
| **HOW (code)** | 1) Page gets `studentSubjectId(state)` (or null if anon). 2) `loadProgressAlerts(studentId)` in `src/features/feed-track-progress/load-progress-alerts.ts` selects from `student_alerts` with server client; if View-as preview target matches student, uses admin client (same pattern as `loadPremiumWorkspace`). 3) Passes `alertItems` into `FeedTrackProgressHero` via Premium shell. 4) Hero: if `alertItems` prop set → DB lines or `PROGRESS_ALERTS_EMPTY`; if prop omitted (Family A) → fixtures. DB also enforces max 3 active + ≤12 words. |
| **FILES** | `load-progress-alerts.ts` · `feed-track-progress-hero.tsx` · `feed-track-progress-premium-shell.tsx` · live `src/app/feed_track_progress/page.tsx` · preview premium page |
| **LIVE SAFETY** | Family A unchanged fixtures. Cross-student bind by subject id. Fail → empty list (no crash). |
| **HOW YOU QC** | Lab Premium student → yellow Important Alerts shows 3 lines · clear alerts in Ops → empty message · other accounts → empty (their rows only). |

---

### B-live — Hostinger-free live cutover

| | |
|---|---|
| **WHAT** | Live `/feed_track_progress` serves modular Family A (anon+standard) or Family B (Premium). Retired Hostinger `progressLockedHtml` + condensed `PremiumProgressBoard` on this route. |
| **WHY** | Live UI was broken vs Figma; preview bodies were ready. CMS later needs **separate** A vs B structures. |
| **HOW (code)** | Doorman in `src/app/feed_track_progress/page.tsx`: `resolveStudentExperience()` → branch on `state.kind` → A shell or B shell (+ `requirePremiumActor` + `loadProgressAlerts` for Premium). Skill documents the rule: no shared page+toggle, no `?premium=`. |
| **FILES** | `src/app/feed_track_progress/page.tsx` · both shells · `.cursor/skills/pgs-student-family-doorman/SKILL.md` |
| **LIVE SAFETY** | Live URL changed (body only). Chrome still shared modular chrome. No migration. |
| **HOW YOU QC** | Signed out → locked modular · lab Premium → unlocked + alerts. |

---

## Wire phase log

| Gate | What | Status | Day-1 security / notes |
|---|---|---|---|
| **L0** | Progress Premium lab pair | **done** | New `@pgs.lab` pair; seed guards |
| **B0** | This living map | **done** | No code |
| **B1** | Alerts → Family B (preview + live) | **done** | Subject scope; View-as admin when target matches; ≤3; honest empty |
| **B-live** | Live Hostinger-free doorman | **done** | A vs B separate shells |
| **B2** | draftMeter ← requirements | **done** | [`FTP-B2-DRAFT-METER-LOCK.md`](./FTP-B2-DRAFT-METER-LOCK.md) |
| **B3** | reviewQueue ← review_queue_items | **done** | [`FTP-B3-REVIEW-QUEUE-LOCK.md`](./FTP-B3-REVIEW-QUEUE-LOCK.md) |
| **B4** | counselorNotes ← counselor_notes | **done** | [`FTP-B4-COUNSELOR-NOTES-LOCK.md`](./FTP-B4-COUNSELOR-NOTES-LOCK.md) · `student_visible`; ≠ feed notes |
| **B5** | Pathway | queued | Confirm fields |
| **B6** | Loopboard swap | queued | LOOPBOARD-KANBAN |
| **B7+** | Tips / Resource Drop | queued | **No invent** |

---

### N1 — #counselorNotes arrow window (fixtures)

| | |
|---|---|
| **WHAT** | 8 fixture notes; up/down arrows step a window of 4. |
| **WHY** | Owner QC of arrow move before DB wire (B4). |
| **HOW (code)** | Client component keeps `offset`; `rows.slice(offset, offset+4)`; buttons step ±1 and clamp. CSS short slide on step. No DB. |
| **FILES** | `content.ts` · `feed-track-progress-counselor-notes.tsx` · `.css` |
| **LIVE SAFETY** | Fixtures only on Family A + Premium UI. No Ops/DB. |
| **HOW YOU QC** | `/feed_track_progress` or preview → #counselorNotes → click down/up arrows · see notes 1–4 then 2–5 … · +8 pending. |

---

## Next gate proposal — B2 (#draftMeter)

### CONNECTION MAP

```text
Ops: requirements panel
  → POST/PATCH workspace/requirements
  → student_document_requirements (+ child student_documents)

Student Family B:
  → loadProgressDraftMeter(studentId)   [NEW, mirror alerts loader]
  → FeedTrackProgressDraftMeter(rows…)  [props; Family A keeps fixtures]
```

**Old condensed board behavior (reuse logic, not UI):**
- `completed` = count where `status === "approved"`
- Pending list = not approved, slice ≤3
- Label = `document_type` (+ status in old UI)
- Empty: “Once your document requirements…” / “All configured… approved”

### PLAN (when `GO AHEAD B2`)
1. `load-progress-draft-meter.ts` — same View-as / subject-id pattern as alerts  
2. Premium shell + live Premium path pass meter props  
3. Draft meter component: optional props → DB; omit → fixtures (Family A)  
4. Empty = honest empty (live copy) — **not** fake Figma gauges when zero rows  
5. Update this MD QC log  

### OWNER DECISIONS REQUIRED before B2 code

1. **Gauge art:** Figma uses 3 SVG meters. Live old board used one `meeter.png` per row. For B2: **(A)** keep Figma SVGs as decorative only (status in text) · **(B)** one shared gauge image like old board · **(C)** invent status→SVG mapping (not preferred)?  
2. **Show status in label?** e.g. `Passport (pending review)` like old board — yes/no?  
3. Seed **lab requirements** in L0 seed for click QC — yes/no?

### NOT IN B2
Reviews · notes · tips CMS · Family A DB wire · inventing requirement types

---

## Owner decisions still open

1. B2 gauge mapping (A/B/C above)  
2. Tips CMS source  
3. Resource Drop link source  
4. Family A: stay fixture-locked forever until Premium? → **LOCKED: anon/standard stay static; backend = Premium only**  

---

## Known gaps

| Gap | Why not now |
|---|---|
| Tips / Resource Drop tables | No existing truth; need owner source |
| Family A data bind | Locked product; fixtures until owner says |
| B3–B6 domains | One gate at a time |
| Rate limits / full RBAC audit | Later full security pass |
| Condensed `PremiumProgressBoard` | Retired from this route; still in repo if other callers |

---

## Phase log (backend)

| When | What |
|---|---|
| 2026-09-08 | **B0** living backend map created |
| 2026-09-08 | **B1** Important Alerts ← `student_alerts` |
| 2026-09-08 | **L0** Progress Premium lab pair |
| 2026-09-08 | **B-live** Hostinger-free doorman + family skill |
| 2026-09-08 | Kanban expanded: QC WHAT·WHY·HOW log + B2 proposal |
| 2026-09-08 | **B3** marked DEFERRED — owner: reviewQueue wrong wiring; ignore for now |
| 2026-09-08 | **N1** #counselorNotes: 8 fixtures · arrow window of 4 (UI only; B4 DB later) |
| 2026-10-08 | **B3** #reviewQueue ← `review_queue_items` (student_visible) — WIRED |
| 2026-10-08 | **B4** #counselorNotes ← `counselor_notes` (student_visible) — WIRED · [`FTP-B4-COUNSELOR-NOTES-LOCK.md`](./FTP-B4-COUNSELOR-NOTES-LOCK.md) |
