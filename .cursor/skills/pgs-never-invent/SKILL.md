---
name: pgs-never-invent
description: >-
  Hard stop: never invent. Owner PGS V3 is north star (contracts/security).
  Junior/Hostinger implementation is used when owner approves via content +
  screenshots. Invent only after owner says so. Use on every PGS task.
---

# PGS — never invent; north star + junior implementation

## Rule (verbatim)

**yeah never invent i have asked you this 100000000 times — if you need to invent it should be after i say so only**

## Dual authority (owner clarification 2026-09-02)

| Layer | Authority | Meaning |
|---|---|---|
| **North star** | Owner / certified PGS V3 | Security, auth, RLS, drafts/publish, permissions, domain contracts, product decisions |
| **Implementation** | Junior (and Hostinger where relevant) | Visual CMS editors, sectioned forms, live preview, Ops/CMS UX she already built |

**OG / early V3 catalog CRUD and similar shells were often a reference template** for junior to build on — not the final staff product UI to keep when she already shipped a better structure for courses, pathways, countries, events, etc.

### Workflow when junior has an implementation

1. Pull her structure (routes, forms, visual editors, preview chrome)
2. Check against **content + screenshots** (and owner Preview QC)
3. If owner **approves** → **keep V3 north star**, **use junior’s implementation** (ADAPT onto V3 APIs/RLS — do not dump insecure junior auth)
4. If owner **rejects** → keep/fix V3 path; do not invent a third design

### Never invent means

- Do **not** invent a new login system, CMS framework, schema, or “helper universe” because V3 felt incomplete
- Do **not** ignore junior’s finished editors and rebuild a flat V3 template “from first principles”
- Do **not** invent SaaS copies from Reference Bank as product UI
- For **Ops/staff post-login UI**: do **not** invent chrome looks — follow **owner screenshots** / [`OPS-STAFF-DESIGN-LANGUAGE.md`](../../docs/OPS-STAFF-DESIGN-LANGUAGE.md) until owner says otherwise (header ≥18px; screenshot blue brand; Studio login purple stays LOCKED)
- Invent / greenfield **only** after owner explicitly says so (`GO AHEAD`, `you may invent…`)

## Port formula

`Junior (or Hostinger) approved implementation` + `Owner V3 north star (security/contracts)` → smallest ADAPT → owner `GO AHEAD` → ship → Preview QC

## Failure modes

1. **Inventing** — new abstractions instead of existing V3 contracts or junior UI  
2. **Template worship** — keeping early V3 reference CRUD when junior’s approved visual CMS already exists  
3. **Junior dump** — copying junior auth / SoftLock-as-ACL / CmsHtml XSS / client-only writes

## Default workflow

1. Find what **junior** built for this surface  
2. Find what **V3** already secures (API, table, permission, draft)  
3. Screenshot / content compare → propose ADOPT / ADAPT / REJECT  
4. Wait for `GO AHEAD`  
5. Wire junior implementation onto V3 north star — no third invention
