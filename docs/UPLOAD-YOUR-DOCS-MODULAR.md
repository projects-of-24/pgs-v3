# Upload Your Docs — modular body map

Living map for the owner. Update at **phase ends**.

**Rule:** Preview lab first → owner Preview QC → live doorman Hostinger purify. Skill: `pgs-student-family-doorman`.

Same method as [`docs/FEED-TRACK-PROGRESS-MODULAR.md`](./FEED-TRACK-PROGRESS-MODULAR.md).

**Order:** Family A shell lock → Family A blocks → **Family A LOCKED** → Family B next → live swap last.

---

## Surfaces

| Surface | URL | Status |
|---|---|---|
| **Preview Family A (locked)** | `/preview/upload-your-docs` | **LOCKED — owner QC PASSED** |
| **Preview Family B (Premium)** | `/preview/upload-your-docs-premium` | **LOCKED — owner QC PASSED** (body + light W1–W3 wire) |
| **Live** | `/upload_your_doc` | **CUTOVER DONE** — doorman Family A + Family B (Hostinger / DocumentWorkspace body replaced) |

---

## LOCK — light UI + connections (owner 2026-09-09)

**PASSED / LOCKED** what we aimed for:

| Layer | Status |
|---|---|
| Family A modular UI (frost, list, Additional, media) | **LOCKED** |
| Family B modular UI (unlocked Resource List, Additional, media) | **LOCKED** |
| W1 read list | **LOCKED** |
| W2 view (pre-signed / redirect) | **LOCKED** |
| W3 upload / re-upload | **LOCKED** |

**Not in this lock:** deep backend phase (scan/QC Ops, audit hardening, Additional freeform, deletion UI).

---

## Backend wire status

**Preview + live:** W1–W3 light connections **LOCKED**. Live Hostinger body **CUTOVER DONE** (2026-09-09).

### CONNECTION MAP (locked truth)

```
LIVE `/upload_your_doc`  (doorman)
  anonymous | authenticated_standard → UploadYourDocsPreviewShell (Family A)
  authenticated_premium              → UploadYourDocsPremiumShell (Family B)
                                         loadPremiumWorkspace + viewHref + W3 upload

PREVIEW routes keep QC copies of the same shells.
```

### Phase log

| Gate | What | Preview vs live | Security notes |
|---|---|---|---|
| **W1** | Resource List ← requirements + docs | Preview + live Premium | `loadPremiumWorkspace` / RLS |
| **W2** | view → pre-signed `viewHref` / `?redirect=1` | Preview + live Premium | Sign after Premium auth |
| **W3** | upload / re-upload → upload-session + finalize | Preview + live Premium | Student-only; requirement bind; rate limit; MIME/size |
| **LIVE CUTOVER** | Doorman Family A + B replace Hostinger / DocumentWorkspace | **DONE** | `readOnly` when staff preview |

**Lab:** `progress-lab-premium@pgs.lab` · seeded required docs.

**Deferred (deep backend later):** Additional freeform upload · deletion from Family B · scan/QC staff · audit-on-every-view policy tweaks.

---

## Figma authority (Family A)

| Band | Frame | Node |
|---|---|---|
| Desktop | `#upload your docs - non signed` | `18375:11615` |
| Mobile | `#upload your docs - locked` | `217:4374` |
| Desktop list | `doc list` | `18375:11659` |
| Desktop frost | Group 310 | `18375:11688` |
| Additional | Frame | `18375:11660` / mobile `217:4591` |
| Media | video still | `18375:11666` / mobile `217:4597` |

Do **not** use `17041:15941` for Family A anon.

---

## Responsive bands

| Band | Width |
|---|---|
| Desktop | **>1366** |
| Mobile | **≤600** |
| iPad | **601–1366** deferred |

Ignore Hostinger 767. Owned CSS only on lab bodies.

---

## Family A gates — **LOCKED**

Source: `src/features/upload-your-docs/upload-your-docs-preview-shell.tsx`

Do **not** reopen A1–A4 unless the owner unlocks Family A.

| Gate | Section | Status |
|---|---|---|
| **Shell** | Locked chrome + modular shell | **LOCKED** |
| **A1** | Title + Important Alerts + helper | **LOCKED** — no alerts frost; 50MB owner override of Figma 5MB |
| **A2** | Resource List (frost + name legend) | **LOCKED** — frost covers colheads+rows; Upload head on mobile; owner color legend on names |

Do **not** reopen A1–A4 / frost / legend unless owner unlocks Family A.
| **A3** | Additional documents (frost — owner pick B) | **LOCKED** |
| **A4** | Media band (`team-goal.png`) | **LOCKED** |

**A2 sync rule:** one fixture list + section name **Resource List** + frost on **both** bands covering colheads + rows. Actions visual-only.

**A2 name legend (owner):** InDraft/pending heading = red · Approved = green · `-------` = status required (red) · `--` = not required (black) · default heading = black.

**A3:** same copy desktop/mobile; disabled field + visual upload; frost veil (pick B).

**A4:** same still image desktop/mobile; Figma frame named video but asset is still (no player).

Chrome (header / sidebar / Hello / footer) = **LOCKED**. Not body work.

---

## Family B

**Do Premium preview lab first** — then live Hostinger purify with doorman.

Same visual stack as Family A, but:
- **No frost**
- Actions: empty → **upload** · uploaded → **view + re-upload**
- Backend = one truth (`student_document_requirements` + `student_documents`) edited by staff/mentor in Ops → student Premium sees it

Figma: desktop `17041:15265` · mobile `217:2622`

Source: `src/features/upload-your-docs/upload-your-docs-premium-shell.tsx`

| Gate | Section | Status |
|---|---|---|
| **B0** | Locked chrome + empty Premium modular shell | **LOCKED** |
| **B1** | Title + Important Alerts + helper (unlocked, 50MB) | **LOCKED** |
| **B2** | Resource List unlocked (view / upload / view+re-upload) | **LOCKED** — desktop view+re-upload; mobile Figma view only |
| **B3** | Additional documents unlocked | **LOCKED** |
| **B4** | Media band (`team-goal.png`) | **LOCKED** |
| **Later** | Phase 4D live wire into locked Family B body | **W2 DONE** — view live; upload/re-upload next |

---

## Live cutover (later — not now)

```
resolveStudentExperience()
  anonymous | authenticated_standard → Family A shell
  authenticated_premium             → Family B shell + Phase 4D
```

Replace Hostinger body on `/upload_your_doc` only after Family B Preview QC.

---

## Preview link (local)

- Family A (locked): `http://localhost:7100/preview/upload-your-docs`
- Family B (Premium lab): `http://localhost:7100/preview/upload-your-docs-premium`
  - **Not Premium / logged out:** fixture Resource List
  - **Premium logged in:** live requirements (`data-wire="w1-readonly"`) — empty list if Ops has not seeded rows
