# Ops header chrome — LOCKED (owner QC 2026-10-01)

**Do not restyle the Ops topbar** unless the owner opens a new header gate.

Full design language: [`OPS-STAFF-DESIGN-LANGUAGE.md`](./OPS-STAFF-DESIGN-LANGUAGE.md).  
Passes: [`OPS-POST-LOGIN-UI-PASSES.md`](./OPS-POST-LOGIN-UI-PASSES.md).  
Deferred backend/API for this chrome: [`OPS-BACKEND-UI-API-UPDATES.md`](./OPS-BACKEND-UI-API-UPDATES.md).

| Item | Locked value |
|---|---|
| Surface | Ops product shell topbar (`/ops`, `/ops/*`, `/studio/profile`, `/studio/change-password`) |
| Pass | **C1** (C1c structure + C1d design language) |
| Type floor | **≥18px** header text (brand, search, name, role) |
| Top padding | **20px** from page top for header contents |
| Layout | Search · bell · avatar · **first name** + role · chevron account menu (full name in dropdown) |
| First name (2026-10-01 QC) | Topbar shows `operationsFirstName(displayName)` only — not the mile-long full string |
| Ask PGS | **Not** in topbar |
| Hamburger | **None** (desktop-first) |
| Bell | **30×30** icon; badge only if real unread count |
| Account menu | Anchored under trigger (`top: calc(100% + 8px)`); hard offset shadow `8px 8px 0 #000` (frontend dropslide pattern) |
| Avatar frame | Frontend identity crop: rounded square **10px**, portrait ratio, soft shadow `0 1px 4px` |
| Brand (sidetab top) | Grad-cap + blue **PGS** + “Purple Guide Study” (aligned with header row) |
| Chrome brand color | Screenshot blue (`--operations-brand`) — Studio login purple stays LOCKED |
| Route | `/ops` (not `/studio/ops`); subdomain later = host, not path |

## Backend / data (header) — parked

Owner **2026-10-01:** header UI LOCKED; **backend stays read-only from current** for this chrome. Owner returns later.

See backlog rows in [`OPS-BACKEND-UI-API-UPDATES.md`](./OPS-BACKEND-UI-API-UPDATES.md) (staff avatar Storage, search copy vs capability, notification badge contract, etc.).

**Preview QC:** [http://localhost:7000/ops](http://localhost:7000/ops)

Sidetab: **LOCKED** — [`OPS-SIDETAB-LOCK.md`](./OPS-SIDETAB-LOCK.md).  
Footer / overflow: **LOCKED** — [`OPS-FOOTER-OVERFLOW-LOCK.md`](./OPS-FOOTER-OVERFLOW-LOCK.md).  
Next chrome: **C4** desktop + a11y → full chrome LOCK.
