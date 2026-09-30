---
name: pgs-popups
description: >-
  LOCKED Popups & Zoho links plan (READY 03). CMS owns popup copy and CTA URLs
  via table+form (not hardcoded forever, not Framer page builder). Patterns:
  A button→Zoho, B button→popup→Zoho, C event/slot booking_url, D Zoho API later.
  ADAPT SoftLock/BumpPremium — one popup system. Use for data-popup-deferred,
  SoftLock, booking_url, UnivMeet links, or Track C popup/Zoho planning.
---

# PGS Popups & Zoho links (LOCKED)

**Series status:** **LOCKED for series** — owner READY 03 · **2026-09-21**.  
Plan lock ≠ build. Implement only with `GO AHEAD popups` / `GO AHEAD POP-…` + Figma when required.

| Doc | Role |
|---|---|
| [`docs/PGS-POPUPS.md`](../../docs/PGS-POPUPS.md) | Quick Zoho patterns · link-update lock |
| [`docs/SITE-PLAN-03-POPUPS.md`](../../docs/SITE-PLAN-03-POPUPS.md) | Visual · honesty · gates |
| CMS | `pgs-cms` · gate **CMS-P** · Popups plan **LOCKED** (`pgs-popups`) |
| Track C | `pgs-master-workflow` |

---

## How staff update links (do not invent)

| Option | Verdict |
|---|---|
| Paste in code / fixtures | **Temp only** while deferred |
| **CMS table + edit form** | **YES** |
| Framer visual CMS / page builder | **REJECT** |

**Today:** `/admin/catalog` → Events / Meeting slots → **Booking URL**.  
**Popups later:** CMS Popups collection → **CTA URL** (typed fields, not Framer).

---

## Product picture

```text
CMS edits links + popup copy
  A) Button → Zoho URL
  B) Button → Popup → CTA Zoho URL
  C) Event / UnivMeet card → booking_url (EXISTS)
  D) Zoho API sync = later (not paste-URL)
Booking on Zoho — PGS stores https URL only
ONE popup system (SoftLock / bump)
```

**REJECT:** javascript: URLs · Zoho passwords in CMS · iframe-as-page · SoftLock 2.0 · free HTML / Framer layout CMS.

---

## Zoho how-to (staff)

1. Create webinar in Zoho → copy register/join link.  
2. CMS → Events (or Meeting slots, or future Popups) → paste **Booking URL** / **CTA URL**.  
3. Publish.  
4. Public button/card/popup CTA opens that link.

---

## Game plan

```text
POP-0 plan → POP-1 trigger inventory → POP-2 CMS popup module
→ POP-3 SoftLock runtime → POP-4 wire deferred CTAs
→ POP-5 booking_url QC → POP-Z Zoho API optional
```

---

## Agent checklist

- [ ] Read locked `SITE-PLAN-03-POPUPS.md`  
- [ ] Links via CMS table+form — not forever hardcode · not Framer  
- [ ] Prefer existing `booking_url` before new tables  
- [ ] Popups only under named gate + owner Figma  
- [ ] One SoftLock system · no Zoho install for paste-URL  
- [ ] Update living MD after gate  
