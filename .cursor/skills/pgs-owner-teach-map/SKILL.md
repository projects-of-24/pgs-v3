---
name: pgs-owner-teach-map
description: >-
  Owner orientation after PGS work: short batch briefs, deep teach on
  architecture (CMS, backend, auth, documents, RBAC, live pulls), and living
  map docs updated only at phase ends. Use after implementing a batch, when
  finishing a frontend/CMS/backend phase, when the owner asks how something
  works or fears live breakage, or before production CMS/backend gates.
---

# PGS — owner teach + living maps

Keeps the owner oriented without drowning them in every CSS tweak. Complements [`pgs-propose-before-code`](../pgs-propose-before-code/SKILL.md) (propose → GO AHEAD) and [`pgs-master-workflow`](../pgs-master-workflow/SKILL.md).

**Current stage (typical):** modular frontend / preview UI.  
**Later stages:** CMS production, backend, auth, documents, RBAC, live route pulls — same skill, stricter LIVE SAFETY.

## When to use

| Trigger | What to do |
|---|---|
| Batch done (after Preview QC vomit, or with it) | **Owner brief** (always, short) |
| Architecture batch (CMS surfaces, fetchers, migrations, RLS, auth, documents, RBAC, live pull) | **Deep teach** (required) |
| Owner says “deep teach” / “how does this work” / “will live break” | **Deep teach** |
| Phase end (section family done, CMS wired, ready for live pull) | Update **living map** doc |
| Pixel/CSS-only tweak | Brief only — **do not** rewrite the living map |

## 1) Owner brief (every batch)

Keep to ~5–8 lines. No essay.

```markdown
### OWNER BRIEF
- **WHAT:** <1 line>
- **WHY:** <1 line>
- **HOW (plain):** <1–2 lines or tiny flow>
- **FILES:** <3–6 repo links that matter>
- **LIVE SAFETY:** preview vs live · what can/can’t break · opt-in vs always-on
- **HOW YOU OPERATE:** CMS clicks / Preview URL / what to tick
```

**LIVE SAFETY must always answer:**
- Which URL changed (preview vs live)?
- Is live still legacy / unchanged?
- Empty data = empty UI or crash?
- New migration / RLS / env? (say none if none)

## 2) Deep teach (architecture or on request)

Walk logic + code together. Owner is non-engineer-friendly but wants real file names.

Required sections:

1. **Idea (ELI5)** — one metaphor or shelf/tick/flow sentence  
2. **Flow** — ASCII or bullets: data/UI → next hop → result  
3. **Why live is safe / not safe yet** — explicit  
4. **Files that matter** — table: Role → path  
5. **How you operate it** — CMS / Preview / production steps  

Optional: one “what we did not do” line (scope fence).

**Architecture batches that always get deep teach:**
- New CMS `card_surfaces` / catalog opt-in
- New fetchers / RPCs / server actions
- Schema / migrations / RLS
- Auth / Premium / mentor scope
- Phase 4D documents
- Preview → **live route pull**
- Anything that can affect production data or public live routes

**Do not** deep-teach every spacing/color change unless the owner asks.

## 3) Living map docs (phase ends only)

One map per product family (example already exists):

- [`docs/USMLE-ROTATION-MODULAR.md`](../../../docs/USMLE-ROTATION-MODULAR.md)

### Map must include

- Preview URL vs live URL  
- Responsive bands for that family  
- Section / module order  
- CMS surfaces / data contracts  
- Locked owner decisions  
- Deferred work  
- Short phase log (append a row at phase end)

### Update rules

- **Do** update at phase end (e.g. “#Pgs picks Phase 2 done”).  
- **Do not** update for every pixel QC.  
- When starting a new modular family (countries, pathway, ops module), create `docs/<FAMILY>-MODULAR.md` (or ops/CMS equivalent) using the same skeleton — ask owner for the doc name if unclear.

### Skeleton for new maps

```markdown
# <Family> — modular / contract map

## Two surfaces (preview vs live)
## Responsive bands (if UI)
## Section / module order (or API / table order for backend)
## CMS / data contracts
## Locked owner decisions
## Deferred
## How we work
## Phase log
```

## 4) Backend / CMS production (future — same skill, higher bar)

When work touches **production CMS, Supabase, RLS, or live routes**, deepen the brief/teach:

- **LIVE SAFETY** must name: migration yes/no, RLS change yes/no, rollback path, who can see new data  
- Deep teach **before** GO AHEAD if the change is irreversible or production-facing  
- Living map: add a **Production gate** section (preview QC → owner GO → migrate/deploy → live QC)  
- Never imply “tests green = product verified” — owner Preview/Production QC still required  

Frontend-only preview work: say clearly **“live route unchanged.”**

## 5) Relationship to other skills

1. Scout / propose / GO AHEAD first (`pgs-propose-before-code`, scout skills).  
2. Implement approved plan only.  
3. Engineering vomit (DONE · files · Preview QC).  
4. **This skill:** owner brief + deep teach if architecture + map update if phase end.  

Do not replace propose-before-code. Do not invent workflows — teach what was built.

## Failure modes

- Shipping architecture with no teach (“you’ll figure it out in CMS”)  
- Rewriting the living map after every CSS nudge  
- Saying live is safe when the live route was actually wired  
- Skipping LIVE SAFETY on backend/CMS batches  
- Teaching every line of CSS as if it were a data contract  
