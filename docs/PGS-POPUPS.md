# PGS Popups & Zoho links — living map

**Status:** **LOCKED for series** (owner READY 03 · 2026-09-21)  
**Skill:** `.cursor/skills/pgs-popups/SKILL.md`  
**Full plan:** [`SITE-PLAN-03-POPUPS.md`](./SITE-PLAN-03-POPUPS.md)  
**CMS:** [`PGS-CMS.md`](./PGS-CMS.md) · gate CMS-P  
**Series:** [`SITE-BACKEND-PLAN.md`](./SITE-BACKEND-PLAN.md)

Plan lock ≠ build. Implement only with `GO AHEAD popups` / `GO AHEAD POP-…` + Figma where required.

---

## How staff update links (LOCKED)

| Option | Verdict |
|---|---|
| Hardcode in code | Temp only (`data-popup-deferred`) |
| **CMS table + form** | **Yes** |
| Framer page builder | **Reject** |

Events/slots: `/admin/catalog` → **Booking URL** today.  
Popups: same CMS collection pattern later (CTA URL field).

---

## How Zoho webinar links work (ELI5)

Zoho stays **outside** PGS. Paste `https` URL in CMS. Public buttons or popup CTAs open that URL.

| Pattern | Click path | CMS field |
|---|---|---|
| **A** Button → Zoho | Button href | Event/slot/page CTA URL |
| **B** Button → Popup → Zoho | Open popup → CTA | Popup CTA URL (module later) |
| **C** Event card → Zoho | Register on card | `booking_url` **EXISTS** |
| **D** Zoho API sync | OAuth/webhooks | Later Track C |

---

## Hard locks

- Popups + links edited in **CMS** (same staff id)  
- One popup system (SoftLock / bump) — no second product  
- HTTPS only · booking outside PGS  
- No Framer-style layout CMS  

---

## Gates

`POP-0` → inventory `POP-1` → CMS popup module `POP-2` → SoftLock runtime `POP-3` → wire CTAs `POP-4` → booking_url QC `POP-5` → Zoho API `POP-Z` optional  

---

## How to continue

| You say | What happens |
|---|---|
| Picture change | Re-propose · re-lock if needed |
| `GO AHEAD POP-n` | One gate only |
| Next series | Security (05) or named build |
