# Ops sidetab scout — C2 reference (living)

**Corrected owner reference (2026-10-01):** [`/preview/ops-staff-plan/v2/sidetab-c2-owner-ref.png`](../public/preview/ops-staff-plan/v2/sidetab-c2-owner-ref.png)  

Supersedes the earlier crop that put Notifications/Activity under Operations and collapsed Admin into one badge-only row.

Companions: [`OPS-POST-LOGIN-UI-PASSES.md`](./OPS-POST-LOGIN-UI-PASSES.md) · [`OPS-HEADER-LOCK.md`](./OPS-HEADER-LOCK.md) · [`OPS-BACKEND-UI-API-UPDATES.md`](./OPS-BACKEND-UI-API-UPDATES.md) · [`OPS-STAFF-DESIGN-LANGUAGE.md`](./OPS-STAFF-DESIGN-LANGUAGE.md).

**Header LOCKED.** This doc = sidetab authority for **C2**.

---

## Owner rules for C2 (corrected)

| Rule | Detail |
|---|---|
| Visual | Match **corrected** sidetab screenshot (blue brand; collapsible Ops/CMS; Admin block) |
| Features | Wire **existing** routes/logic when present |
| Missing | Add a **stub page** (honest “later connection”) — do **not** invent fake APIs |
| Stub log | Every new stub is appended to this doc + [`OPS-BACKEND-UI-API-UPDATES.md`](./OPS-BACKEND-UI-API-UPDATES.md) when created |
| Domain | One staff shell for **Ops + CMS + Student Operations** |
| User Management | Shown in sidetab; **deep product** = future Track B — interim may link Team or a stub hub |
| Rearrange OK | Notifications/Activity placement follows **this** crop (top-level), not the mistaken earlier crop |

---

## Corrected screenshot IA

```text
Brand — Grad-cap · PGS · Purple Guide Study

PRIMARY (top-level links)
  Dashboard
  Notifications
  Activity

Operations ▾
  Students
  Targets
  Team

CMS ▾
  Creating ▾
    Courses · Webinar · Universities
    (+ Events if we keep prior catalog parity — confirm; not in this crop)
  Editing ▾
    Testimonial · Pic / Video

ADMIN BLOCK (bottom)
  Admin Panel          ← active/highlight style
  User Management      ← highlight wash
  Permissions
  Edit Profile
```

Diff vs mistaken earlier crop: Notifications + Activity are **primary**, not under Operations; Admin is **four rows**, not one “Super Admin Only” badge-only card.

---

## Existing vs stub map (plan)

| Nav label | Proposed href | Backend today | C2 link mode |
|---|---|---|---|
| Dashboard | `/ops` | Live scoreboard | **LIVE** (label → Dashboard) |
| Notifications | `/ops/notifications` | Live | **LIVE** |
| Activity | `/ops/activity` | Live audit | **LIVE** |
| Students | `/ops/students` | Live registry | **LIVE** |
| Targets | `/ops/work` | Live | **LIVE** |
| Team | `/ops/team` | Live staff list | **LIVE** |
| Courses | `/admin/catalog` or entity | Catalog exists | **LIVE** (narrowest existing catalog entry) or stub if owner wants dedicated `/ops/cms/courses` |
| Webinar | — | No dedicated page | **STUB** |
| Universities | `/admin/catalog/…` if entity | Catalog entities | **LIVE** if entity key exists else **STUB** |
| Events | (optional) | Catalog events often exist | Confirm with owner — crop omits; keep stub/live only if approved |
| Testimonial | — | Content modules may exist | **STUB** unless clear content route |
| Pic / Video | `/admin/media` | Live media | **LIVE** |
| Admin Panel | `/ops/admin` (new) | None | **STUB hub** |
| User Management | `/ops/team` interim **or** stub `/ops/admin/users` | Team page exists; deep UM = Track B | **LIVE interim → Team** + note Track B |
| Permissions | `/ops/admin/permissions` stub | `/admin/access` is Premium/mentor — **wrong product** for Roles UI | **STUB** (do not misuse Access page) |
| Edit Profile | `/studio/profile` | Live | **LIVE** |

Locks: keep permission / SA gates from existing staff auth. CMS stubs visible but marked Soon / Stub until Payload wire.

---

## Stub page contract (when we create one)

Each stub page:

1. Uses Ops shell (header LOCKED + sidetab)
2. Title = nav label
3. Short copy: deferred · will connect to named domain later
4. No fake tables/metrics
5. Logged in **Stub registry** below + BE backlog row

---

## Stub registry (created in C2)

| Stub ID | Route | Nav label | Connect later to | Status |
|---|---|---|---|---|
| `admin-panel` | `/ops/admin-panel` → `/admin/stubs/admin-panel` | Admin Panel | SA admin hub — BE-S3 / Track B | **SHIPPED stub** |
| `permissions` | `/ops/admin/permissions` → `/admin/stubs/permissions` | Permissions | Roles UI — BE-S4 / Track R (not `/admin/access`) | **SHIPPED stub** |
| `webinar` | `/ops/cms/webinar` → `/admin/stubs/webinar` | Webinar | CMS webinar / events specialization — BE-S2 | **SHIPPED stub** |

### Live links wired in C2

| Nav | Route | Backend |
|---|---|---|
| Dashboard | `/ops` | Scoreboard |
| Notifications | `/ops/notifications` | Live |
| Activity | `/ops/activity` | Audit |
| Students / Targets / Team | existing `/ops/*` | Live |
| User Management | `/ops/team` interim | Track B deep later |
| Edit Profile | `/studio/profile` | Live |
| Courses | `/ops/cms/courses` → catalog courses | Live |
| Universities | `/ops/cms/universities` | Live |
| Testimonial | `/ops/cms/testimonial` → content testimonials | Live |
| Pic / Video | `/ops/cms/media` | Live |

**UM** = **User Management** (owner abbreviation clarification 2026-10-01).

Waiting: owner Preview QC → then C3 / C4.

---

## C2 implementation plan (after `GO AHEAD C2`)

### WHAT
Restyle sidetab to corrected screenshot; restructure nav groups; live links where backend exists; stub pages only where missing.

### HOW
1. Owned CSS: brand row, primary links, collapsible Ops/CMS (`<details>`), Admin block highlights, icons, type ≥ readable floor (screenshot DL).
2. Restructure `admin-shell` nav IA to match corrected crop.
3. Create stub pages listed as STUB above; append Stub registry + BE rows.
4. Do **not** touch locked header.
5. Do **not** build User Management / Permissions product UIs in C2.

### NOT IN C2
Header · footer · scoreboard body · Payload install · fake UM/permissions trees · inventing Events if owner confirms crop omitted it.

### BEFORE → AFTER
Flat/static groups + Soon spans → screenshot hierarchy + live/stub honesty.

### FILES (expected)
- `src/components/admin-shell.tsx`
- `src/app/admin/operations.css`
- New stub routes under `src/app/admin/…` + `/ops` rewrites if needed
- This doc + `OPS-BACKEND-UI-API-UPDATES.md` + pass log

---

## Owner pick (optional)

1. **Events** under Creating — keep from prior list as stub/live, or omit to match crop?  
   Default if silent: **omit from C2 nav** (crop wins).  
2. **User Management** → interim `/ops/team` or dedicated stub hub?  
   Default: **interim `/ops/team`** + Track B note.

Waiting: **`GO AHEAD C2`**.
