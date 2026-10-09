# PGS V3 — Architect plan (Claude Code handover, 2026-09-27)

Living plan for the move from Cursor to Claude Code. Companion to `.cursor/skills/pgs-master-workflow/SKILL.md`, `docs/HEADER-CHROME-PHASE.md`, `docs/SITE-BACKEND-PLAN.md`. Same lock: **propose → owner `GO AHEAD <gate>` → one gate → owner Preview QC → stop.**

Rendered copy with the same diagrams: Claude artifact "PGS V3 Architect Plan".

---

## 1 · Stack (locked)

| Layer | What | Rule |
|---|---|---|
| Runtime | Next.js App Router · React · strict TypeScript · pnpm | Routes `src/app`, bodies `src/features/<family>` |
| Data / auth | Supabase Postgres · Auth · Storage · RLS · RPCs | Schema only via `supabase/migrations`; one truth per domain |
| Public / student UI | Owned CSS per family · four bands `>1366 · 801–1366 · 601–800 · ≤600` | Hostinger `style.css` = reference only |
| Ops / CMS UI | shadcn + Tailwind | Junior CMS editors untouched unless reopened by name |
| Quality gates | Vitest · Playwright (390 / 768 / 1440) · `test:rls` · `test:security` | Skipped ≠ passed |
| Hosting | Vercel · GitHub `project-mtfbwu/pgs-v3` | Feature branches, never direct to `main` |
| Steal like an artist | dnd-kit · Uppy · Monday/Linear board patterns · Reference Bank IDs | Read, adapt onto V3 contracts, never dump their auth |

## 2 · System map

```mermaid
flowchart LR
  subgraph People
    ANON[Anonymous visitor]
    STU[Student<br/>standard · premium]
    STAFF[Staff<br/>one id, many scopes]
  end
  subgraph NextJS["Next.js App Router · Vercel"]
    PUB["Public / Student surface<br/>src/app/* · src/features/*<br/>owned CSS"]
    OPS["Operations surface<br/>/portal · shadcn + Tailwind"]
    CMS["CMS surface<br/>/cms · junior visual editors"]
    API["Route handlers<br/>/api/* · server-only"]
  end
  subgraph Supabase
    AUTH[(Auth)]
    DB[(Postgres + RLS<br/>premium_entitlement<br/>mentor_assignments<br/>audit_events)]
    STOR[(Private Storage<br/>Phase 4D docs)]
  end
  ANON --> PUB
  STU --> PUB
  STAFF --> OPS
  STAFF --> CMS
  PUB --> API
  OPS --> API
  CMS --> API
  API --> AUTH
  API --> DB
  API --> STOR
  PUB -. RLS-scoped reads .-> DB
```

## 3 · Public page model — today vs target

```mermaid
flowchart TB
  subgraph TODAY["TODAY · live pages"]
    T1["layout.tsx<br/>links Hostinger style.css + responsive.css"]
    T2["LegacyPage host"]
    T3["header string → DSIH"]
    T4["React modular body"]
    T5["footer string → DSIH"]
    T1 --> T2 --> T3 --> T4 --> T5
  end
  subgraph TARGET["TARGET · after H-R + OWN-LINK"]
    G1["layout.tsx<br/>Hostinger CSS unlinked page by page"]
    G2["&lt;PublicHeader /&gt;<br/>pgs-owned-header.css"]
    G3["&lt;PublicStrip /&gt; toggle · univMeet · search"]
    G4["React modular body<br/>owned CSS, 4 bands"]
    G5["&lt;PublicFooter /&gt;<br/>pgs-owned-footer.css"]
    G1 --> G2 --> G3 --> G4 --> G5
  end
  TODAY == "H7 · H-R · OWN-LINK · OWN-BODY" ==> TARGET
```

## 4 · Where we are (measured 2026-09-27 on the owner Mac)

- Git: `main` = `origin/main` = `792ee9a`; 152 uncommitted paths local only; no secrets in the pile.
- Typecheck: **15 errors in 6 files** (`purple-events/upcoming/content.ts`, `shell/public-footer.tsx`, `uni-tieup-initiatives.tsx`, `cvready-program-video.tsx`, `cvready-program-discover.tsx`, `face-fixtures.test.ts`).
- Live cutover done: About, Explore, Finance, Scholarship, Premium Home, USMLE/PLAB/AMC, USMLE Rotation, CV Ready, Uni Tie-up, Feed, Track Progress, Upload Docs, Error 404. Desktop + mobile passed; **iPad deferred** almost everywhere.
- Home, Profile, Purpleboard: owner wants a from-scratch rebuild (needs Figma).
- Chrome: desktop + iPad header locked (decision 36); owned split P1–P15 lab only; search restyle reverted; **H7 and H-R open**.

## 5 · Roadmap — one gate at a time

```mermaid
flowchart TB
  P0["PHASE 0 · CHECKPOINT<br/>branch feat/handover-checkpoint-2026-09-27<br/>commit 152 paths · owner pushes"]
  subgraph A["PHASE 1 · TRACK A — finish the frontend"]
    A0["A0 · TYPES-0<br/>fix 15 type errors, zero visual change"]
    A1["A1 · H7<br/>safe-area cascade header → strip → body pull → footer"]
    A2["A2 · H-R<br/>mount React chrome, drop DSIH<br/>pilot /about → then batch"]
    A3["A3 · OWN-LINK T → F → U"]
    A4["A4 · OWN-BODY /route<br/>owned CSS on, Hostinger off, fluid UI check"]
    A5["A5 · iPad pass per family<br/>one 4-band plan, one build"]
    A6["A6 · Stub pages (needs Figma)"]
    A7["A7 · Home · Profile · Purpleboard rebuild (needs Figma)"]
    A8["A8 · Marquee / announcement bar"]
    A0 --> A1 --> A2 --> A3 --> A4
    A2 --> A7
    A4 --> A5
    A4 --> A6
    A2 --> A8
  end
  subgraph B["PHASE 2 · TRACK B — backend spine"]
    B0["B0 · SITE-PLAN-05 Security draft"]
    B1["B1 · first build gate owner names<br/>likely Batch 01 People & Access"]
    B2["B2 · CMS deepen or Student Ops"]
    B3["B3 · Catalog B★ rebuild"]
    B4["B4 · CMS-managed header lists + audit_events"]
    B0 --> B1 --> B2 --> B3 --> B4
  end
  subgraph C["PHASE 3 · TRACK C"]
    C1["Popups (CMS table)"] --> C2["Zoho / Google calendar"] --> C3["Payments → premium_entitlement"]
  end
  P0 --> A0
  A4 --> B0
  B1 --> C1
```

iPad family order for A5: About → Explore → Finance → Scholarship → Premium Home → Medical → CV Ready → Uni Tie-up → Feed → Track Progress.

## 6 · The loop for every gate

```mermaid
sequenceDiagram
  participant O as Owner
  participant C as Claude
  participant M as Owner Mac (VS Code · pnpm dev :7100)
  participant B as Browser pane / Playwright
  O->>C: GO AHEAD <gate>
  C->>M: scout live + preview, read git diff
  C->>B: screenshot + measure 1500 · 1100 · 700 · 390
  C-->>O: PLAN — WHAT · BEFORE→AFTER · FILES · ELI5 · NOT IN THIS CHANGE
  O-->>C: GO AHEAD / correction
  C->>M: one targeted diff, one gate only
  C->>B: re-measure, Playwright 390 / 768 / 1440
  C-->>O: DONE brief + how to QC
  O->>M: tweak in VS Code / DevTools
  O-->>C: "look at the diff" or screenshot
  C->>M: lock value (px, or clamp if owner picks)
  O-->>C: Preview QC passed → next gate
```

## 7 · Owner decisions log

| # | Topic | Decision | Date |
|---|---|---|---|
| 1 | Checkpoint branch | `feat/handover-checkpoint-2026-09-27` | 2026-09-27 |
| 2 | A0 (type errors) before H7 | Yes | 2026-09-27 |
| 3 | This plan in repo | Yes, `docs/CLAUDE-ARCHITECT-PLAN.md` | 2026-09-27 |
| 4 | Home / Profile / Purpleboard after H-R | Proposed, awaiting owner | — |
