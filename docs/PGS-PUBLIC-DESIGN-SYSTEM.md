# PGS Public Design System (body)

Owner lock **2026-10-10**. **Locked for all work on this project from now on.**

Agents must **import this file first every chat** — whether the owner asks or not. Reason: help ship a **better quality product**. Not QC panic. Not FOMO. Companion: `friend-not-yes-man`.

Always-on rule: `.cursor/rules/pgs-public-design-system.mdc`.

**Applies to all three body bands:** desktop · iPad · phone. Same type / GAP / height locks everywhere. Per-band Figma only rearranges layout — it does **not** own `font-size`.

Proven already on Explore / Premium medical (desk + phone QC’d with the same floors; iPad uses the same DS). **Country destination** (`/preview/countries-2` · live `/countriesusa`) — **all three bands QC PASS 2026-10-10**. This doc is the single carry sheet for the rest of public site passes — not an iPad-only invention.

**Authority order for public Student/Public body CSS:**

1. Owner named size for this block  
2. **This design system** (type + gap + height + bands) — **desk · iPad · phone**  
3. [`FRONTEND-IPAD-HEADER-LOCK.md`](./FRONTEND-IPAD-HEADER-LOCK.md) (formulas / chrome bands)  
4. Band Figma / Paper — **layout and composition only** (desk frame · iPad frame · phone frame)  
5. Legacy / Hostinger — reference only when owner says  

Carry skill: personal `friend-not-yes-man` · propose: `pgs-propose-before-code` · Step 0 rule: `pgs-ipad-type-step0`.

North star (same content rearranged): `/preview/purpleusmle-2` · [`PREMIUM-MEDICAL-MODULAR.md`](./PREMIUM-MEDICAL-MODULAR.md).

---

## Figma vs ours (hard split — every band)

| Band Figma (desk / iPad / phone) | From PGS (ours — all bands) |
|---|---|
| Section order · rails · grouping · cards · icons · photos · hierarchy shape | **Text size** · **font size** · type family floors |
| Layout proportions · which column stacks · hang geometry | Roboto / Bebas **implementation** sizes |
| Which copy exists · visual structure | GAP 60/80 · `height: auto` |
| Accessibility floors when Figma is too small | Report `FIGMA ACCESSIBILITY ADAPTATION` |

**Never:** copy Figma Roboto `14` / `15.5` / `19.6` / `22.4` (or scaled desk/phone scrap) into CSS “because that band’s Figma said so,” even if larger than the floor.

**Always:** quote this file + type floor in Step 0 before writing `font-size` on **any** band.

---

## Type system (desk · iPad · phone — same floors)

| Role | Family | Size lock | Token / note |
|---|---|---|---|
| Body / UI / paragraphs / TOC links / footnotes / labels | **Roboto** | **`16px`** (owner may name **15** for an exceptional block) | `var(--pgs-type-floor, 16px)` — **all bands** |
| Display / condensed shout (stats asides, big brand lines) | **Bebas Neue** | **≥30px** | Never ship Bebas under 30 — **all bands** |
| Section titles (Roboto Medium/Bold hierarchy) | **Roboto** | Owner-named or **≥ floor**; default body copy still 16 | Do not invent a third scale from any band’s Figma |
| Stat numerals (large marketing numbers) | Roboto Bold / as designed | May exceed floor (e.g. 45) — still not raw Figma scrap | Keep contrast AA |

Owner may name a **larger** display size for a titled block (e.g. Highlights title desk/iPad/phone differ) — that is owner-named hierarchy, not Figma Roboto body scrap.

### Forbidden agent reasoning

- “19.6 is above 16 so it’s fine” → **FAIL**  
- “Figma title is 28 so body is 19.6” → **FAIL** (body = floor)  
- “Phone Figma is 14 so phone body is 14” → **FAIL** (phone still floor 16)  
- “Desk Figma is 22.4 so desk body is 22.4” → **FAIL** (desk body still floor unless owner names otherwise)  
- Silent shrink under 16 for Roboto → **FAIL** (a11y adapt up to floor; report `FIGMA ACCESSIBILITY ADAPTATION`)

---

## Spacing system (GAP LOCK — all bands)

| Seam | Value |
|---|---|
| Hero → first body block | **60px** content-to-content |
| Every later section → section | **80px** content-to-content |
| Scholarship hero → intro | **40** (half section) |
| **Desktop · iPad · phone** | **Same** values — do not invent desk 100 / phone-only rhythms |

How: sibling `margin-top` only · no pad+margin stack on the seam. Detail: [`FRONTEND-GAP-ANALYSIS.md`](./FRONTEND-GAP-ANALYSIS.md).

Shell tokens: `--*-hero-gap: 60px` · `--*-section-gap: 80px` (set on all band media queries the same).

---

## Height (all bands)

Every segment / hero / stage / hang: **`height: auto` only**. No fixed stage air under content. Hang = in-flow + `overflow: visible`.

Exception (rare, owner/medical protocol): desk absolute-position stages may keep a Figma height **only** when children are `position: absolute` and height equals real content bottom — prefer in-flow + `height: auto` on iPad/phone. See [`PREMIUM-MEDICAL-MODULAR.md`](./PREMIUM-MEDICAL-MODULAR.md).

---

## Filled CTA label lock (all bands — owner 2026-10-10)

Owned chrome ships `a:hover { color: var(--base-color) }` (mint/teal). On a **filled** CTA link (green / yellow / any solid chip), that steal makes the label vanish or look wrong — worst on iPad/phone where hover sticks after tap.

| CTA face | Resting label | `:hover` / `:focus-visible` / `:active` |
|---|---|---|
| Green fill (e.g. `#009c70` hero Talk to Us) | **White** `#fff` | **Same white** — never `--base-color` |
| Yellow / light fill (dark label) | Dark / near-black | **Same dark** |
| Any filled Link/button styled as a chip | Owner resting color | **Re-declare that color on hover** |

Allowed hover chrome: slight `filter: brightness(…)` or background shift — **not** label color hijack.

```css
.my-filled-cta:hover,
.my-filled-cta:focus-visible,
.my-filled-cta:active {
  color: #fff; /* or the resting label color */
}
```

Do not “fix” by removing hover entirely. Do not invent a second hover palette.

Companion: personal `friend-not-yes-man` — open this DS first; this lock is part of the product quality sheet, not a one-off QC patch.

---

## Bands (never 767)

| Band | Width | Layout source | Type / GAP / height |
|---|---|---|---|
| Desktop | **>1366** | Desk Figma (when that band is open) | **This DS** |
| Wide iPad | **801–1366** | iPad Figma | **This DS** |
| Compact iPad | **601–800** | iPad Figma + stack/clamp | **This DS** |
| Phone | **≤600** | Phone Figma (when that band is open) | **This DS** |

**Same content rearranged** across bands — not three different type systems.

Open only the band the owner opened for layout CSS. Do not invent desk/phone layout in an iPad-only gate — but if you touch `font-size` or section gaps on any band, this DS still wins.

---

## Shell / chrome (do not redesign on body gates)

- Shell pull / closed `#toggleBtn` ruler — see header lock  
- No black side-test banners  
- Chrome click QC: hamburger + `#toggleBtn` must open  
- Body gates do not drive-by chrome  

---

## Gate workflow (one block)

```text
Step 0 → quote this DS + type floor + GAP + height:auto + band
Propose → GO AHEAD → implement one block → measure font-size live → owner QC → next
```

Named live QC nudge (“make wider”, “16 not 19.6”) = direct edit **after** Step 0 quote — still obey this DS.

---

## CSS tokens (minimum)

```css
--pgs-type-floor: 16px;
--*-hero-gap: 60px;
--*-section-gap: 80px;
```

Page modules may alias (`--cd-hero-gap`) but values stay locked.

---

## Proven — Country destination (`/preview/countries-2` · live `/countriesusa`)

Owner audit **2026-10-10**. Layout = band Figma; type = this DS unless named below.

| Role | Phone ≤600 | iPad 601–1366 | Desk >1366 |
|---|---|---|---|
| Roboto body / TOC / tabs / CTA copy | **16** | **16** | **16** |
| Hero title (Roboto) | **24** | **34** | **32** |
| Section titles (Why… — Roboto) | **30** | **28** | owner desk mix (~25.6–32) |
| Bebas aside / shout | **≥30** | **≥30** | **26** (owner-named desk exception) |
| Stat numerals | **45** modular | **45** modular | **24** desk grey hug |
| Stat micro labels | **16** | **16** | **15** (owner-named exception) |

TOC link stack gap: desk **28px** · iPad + phone **16px**.

Living map: [`COUNTRIES-DESTINATION-MODULAR.md`](./COUNTRIES-DESTINATION-MODULAR.md).

---

## Related

| Doc / skill | Job |
|---|---|
| [`FRONTEND-IPAD-HEADER-LOCK.md`](./FRONTEND-IPAD-HEADER-LOCK.md) | Full formula inventory + page status |
| [`FRONTEND-GAP-ANALYSIS.md`](./FRONTEND-GAP-ANALYSIS.md) | Gap math + selector traps |
| [`COUNTRIES-DESTINATION-MODULAR.md`](./COUNTRIES-DESTINATION-MODULAR.md) | Destination template · preview → live |
| `friend-not-yes-man` | Owner relationship + must open this DS |
| `pgs-propose-before-code` | Propose gate + TYPE LOCK |
| `pgs-ipad-modular-body-pass` | iPad body playbook |

Update this file when the owner changes a type or gap lock. Do not leave durable type rules only in chat.
