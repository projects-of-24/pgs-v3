---
name: pgs-cms-action-buttons
description: Documents PGS legacy/CMS action buttons that must stay visually unchanged but will later receive CMS-driven popup or destination links. Use when touching CTAs, btn-custom, contactCta, #contact handlers, or when the owner shares a screenshot noting a control is a button.
---

# PGS CMS action buttons (note — future linking)

## Authority

- **Owner screenshots** = primary target for layout and placement on Student/Public pages.
- **Figma** = external reference only (width/placement hints). Ignore extended page height the owner did not intend.
- **Do not restyle buttons** unless the owner explicitly asks. Fix document flow only.

## What counts as an action button

Legacy markup kept on purpose — treat as CMS-linkable actions, not decorative text:

| Pattern | Example | Current behavior | CMS field (if any) |
|---------|---------|------------------|-------------------|
| `.btn.btn-custom` | `Got Questions? Talk to Us` on all `countries*` pages | `<a href="#contact">` → `/contact` via `legacy-page.tsx` | `contactCta` on `DestinationContent` |
| `#contact` anchors | Same CTA family on public pages | Intercepted in `wireLegacyInteractions` | Page-specific CMS slots when added |
| Premium / applicant modals | `data-premium-purchase`, `#applicantPremiumModal` | Modal open | CMS/popup contract TBD |
| Login-required gates | `#pgsLoginPopup` triggers | Popup | N/A |

## Destination pages (`countries*`)

- Shared shell: `.countriesUSA` → `.mobile-hero-coutry` (hero) → `.mobile-usa-content` (title, copy, CTA).
- Mobile order must match owner screenshot: **hero image → headline → body copy → existing green CTA**.
- CTA remains legacy `.btn-custom` styling from `public/assets/css/style.css`. No new button UI.

## Future CMS popup linking (not implemented)

When owner approves CMS popup wiring:

1. Extend typed CMS content with an action target (popup id, modal slug, or external URL) — not just label text.
2. Server-render label via existing `applyPublicContent` / `applyUsaContent` replacements.
3. Inject `href`, `data-popup`, or `data-cms-action` from CMS — do not hardcode in React replacements.
4. Keep one interaction path in `legacy-page.tsx` (or a single delegated handler) for `#contact` and future popup ids.
5. Preserve keyboard/focus semantics (`<a>` or `<button type="button">` with accessible name).

## Agent checklist

- [ ] Recognize owner “this is a button” as **CMS action note**, not a redesign request.
- [ ] Match layout from **screenshot**, not Figma page height.
- [ ] Leave `.btn-custom` colors, padding, radius unchanged unless asked.
- [ ] Note new button patterns in this skill when discovered on legacy pages.
