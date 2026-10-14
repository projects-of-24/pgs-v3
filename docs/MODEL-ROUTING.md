# Model routing — Opus plan · execute after

Owner lock for every chat and project. Skill: `opus-plan-execute`.

## Default split

| Work | Model |
|---|---|
| Planning / architecture / RBAC / migrations / “think then propose” | **Opus** |
| Heavy figuring-out discovered mid-implementation | **Opus** (stop → handoff) |
| Execution after full Opus plan + `GO AHEAD` | **Current agent** OK |
| Harder coding quality on execute | Prefer **Sonnet** (self-check vs current agent) |
| Daily volume / included Cursor pool | **Grok** OK for mechanical execute when plan is locked |
| Named live QC nudge | Direct edit — no second Opus plan |

## Owner lock (verbatim)

- Anything, anytime you are doing some implementation, if you find we have to think a lot, figure out a lot, and put that into Opus.
- Execution: if you have all the data from Opus, okay, execution, you can do it.
- Sometimes you feel you want more effort, you have to do an analysis between you and Sonnet.
- Planning: make sure it's in Opus, and make sure everything is noted down in skills and MD so that I can carry it over to the rest of the chats and projects.

## Flow

```text
NEED THINKING / NEW CONTRACT / MULTI-FILE DESIGN
  → Opus (plan only)
  → Owner GO AHEAD
  → Execute (this agent or Sonnet)
       │
       └─ mid-build “lots to figure out”?
            → STOP → OPUS HANDOFF → resume after plan
```

## Where this lives

| Location | Path |
|---|---|
| This file (PGS) | `docs/MODEL-ROUTING.md` |
| PGS skills | `.cursor/skills/pgs-master-workflow` · `pgs-propose-before-code` |
| Personal skill (all projects) | `~/.cursor/skills/opus-plan-execute/SKILL.md` |
| Personal MD mirror | `~/.cursor/skills/opus-plan-execute/MODEL-ROUTING.md` |
| User Agent Store | `skills/opus-plan-execute/` (syncs across machines) |
| Always-on | Cursor Settings → Rules · `~/.cursor/rules/opus-plan-execute.mdc` |

## Current carry-over — frontend remaining pages (2026-10-10)

Durable plan from chat inventory. New chats: read this first, then execute — do not reinvent bands/formulas.

| What | Where |
|---|---|
| iPad + header formulas · bands · H-R order · page status | [`docs/FRONTEND-IPAD-HEADER-LOCK.md`](./FRONTEND-IPAD-HEADER-LOCK.md) |
| Gap analysis desk · iPad · phone (GAP LOCK hero 60 · rest 80) | [`docs/FRONTEND-GAP-ANALYSIS.md`](./FRONTEND-GAP-ANALYSIS.md) |
| Numbers | `src/features/shell/pgs-breakpoints.ts` |
| Next page recipe | `pgs-ipad-paper-pass` → `pgs-ipad-modular-body-pass` · north star `/preview/purpleusmle-2` |
| Mauve hero only | `pgs-ipad-hero-body` (×1.4 freeze · 80% height) — not for new medical body passes |
| H-R steps | [`docs/HR-PAGE-PROMPT.md`](./HR-PAGE-PROMPT.md) |

**Bands:** `>1366` · `801–1366` · `601–800` · `≤600` — never 767.  
**Opus:** one plan across all four bands before building. Mid-build figuring-out → Opus again.
