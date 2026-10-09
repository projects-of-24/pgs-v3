/**
 * Program compact face — Pair 6 desk+mob · Figma courses.
 * Desk pair `1:2148` · open `1:2150` · closed `1:2151` · ~304×461 (height hugs)
 * Mob pair `1:2731` · open `1:3032` · closed `1:2992` · Figma ~171×260 → **1.2×** (~205×312 min)
 * Heart = filled (save deferred). No Start Free cursor (owner).
 *
 * Owner QC 2026-09-22:
 * - Title black hugs content to card edge-gap; long words wrap (no nowrap overflow)
 * - Footer (tags → CTA + closes) flows; card height hugs (width fixed)
 * - Mob sizes ×1.2 individually (no CSS transform scale)
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: desk blurb/closes/Start Free ~12px · mob title ~12.5 · tags/CTA ~9.5
 * ISSUE: below readable floor on desk body/meta
 * PGS: desk blurb/closes/Start Free ≥14px · Last 10 Spots keeps badge size
 *   mob type scales with 1.2× artboard
 */
import type { ProgramCompactFaceCard } from "./program-compact-content";
import "./program-compact-face-card.css";

type Props = {
  card: ProgramCompactFaceCard;
  /**
   * `default` = Pair 6 (full desk+mob)
   * `sm` = Pair 9 (desk+mob @ 80% shell)
   * `sm_desk` = Pair 10 (desk @ 80% · mob = Pair 6 full)
   */
  size?: "default" | "sm" | "sm_desk";
};

function FacePanels({
  card,
  slot
}: {
  card: ProgramCompactFaceCard;
  slot: "desk" | "mob";
}) {
  const closed = card.status === "closed";
  const prefix = "program-compact-face";
  const heartSize = slot === "desk" ? 32 : 18;
  const spotsIcon = slot === "desk" ? 18 : 8;

  return (
    <>
      <div className={`${prefix}__media`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={`${prefix}__photo`}
          src={card.photo}
          alt={card.photoAlt}
        />
        <span className={`${prefix}__heart`} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.heartIcon}
            alt=""
            width={heartSize}
            height={heartSize}
          />
        </span>
      </div>

      {/* Spots + Start Free on card (Figma) — not inside overflow:hidden media */}
      <div className={`${prefix}__spots`} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.spotsIcon}
          alt=""
          width={spotsIcon}
          height={spotsIcon}
        />
        <span>{card.spotsBadge}</span>
      </div>
      <div className={`${prefix}__start`} aria-hidden="true">
        <span className={`${prefix}__start-label`}>{card.startBadge}</span>
      </div>

      <div className={`${prefix}__copy`}>
        <p className={`${prefix}__title`}>
          {card.titleLines.map((line) => (
            <span key={`${slot}-${line}`} className={`${prefix}__title-line`}>
              {line}
            </span>
          ))}
        </p>
        <p className={`${prefix}__blurb`}>{card.blurb}</p>
      </div>

      <div className={`${prefix}__footer`}>
        <ul className={`${prefix}__tags`}>
          {card.tags.map((tag) => (
            <li key={`${slot}-${tag}`}>
              <span className={`${prefix}__pill`}>{tag}</span>
            </li>
          ))}
        </ul>

        <div className={`${prefix}__meta`}>
          {closed ? (
            <span className={`${prefix}__cta`} aria-disabled="true">
              {card.cta}
            </span>
          ) : (
            <a className={`${prefix}__cta`} href={card.href}>
              {card.cta}
            </a>
          )}

          <div className={`${prefix}__closes`}>
            <p className={`${prefix}__closes-label`}>{card.closesLabel}</p>
            <p className={`${prefix}__closes-value`}>{card.closesValue}</p>
          </div>
        </div>
      </div>

      {closed && card.closedLabel ? (
        <>
          <div className={`${prefix}__wash`} aria-hidden="true" />
          <div className={`${prefix}__closed`} aria-hidden="true">
            <p className={`${prefix}__closed-text`}>{card.closedLabel}</p>
          </div>
        </>
      ) : null}
    </>
  );
}

export function ProgramCompactFaceCard({ card, size = "default" }: Props) {
  const titleId = `program-compact-face-title-${card.id}`;
  const closed = card.status === "closed";
  const prefix = "program-compact-face";
  const isSm = size === "sm";
  const isSmDesk = size === "sm_desk";
  const layoutId = isSm
    ? "program_compact_sm"
    : isSmDesk
      ? "program_compact_sm_desk"
      : "program_compact";
  const pairLabel = isSm ? "Pair 9" : isSmDesk ? "Pair 10" : "Pair 6";
  const sizeClass = isSm
    ? `${prefix} ${prefix}--sm`
    : isSmDesk
      ? `${prefix} ${prefix}--sm-desk`
      : prefix;
  const sizeNote = isSm
    ? " (Pair 6 shell @ 80%, type full size)"
    : isSmDesk
      ? " (desk Pair 9 @ 80% · mob Pair 6 full)"
      : "";

  return (
    <article
      className={sizeClass}
      data-pgs-module="program-compact-face-card"
      data-face-layout={layoutId}
      data-face-size={size}
      data-face-status={card.status}
      data-figma-file="reEbIrfkffyoIzXQyVm09z"
      data-figma-desktop={closed ? "1:2151" : "1:2150"}
      data-figma-mobile={closed ? "1:2992" : "1:3032"}
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className={`${prefix}__sr-title`}>
        {card.titleLines.join("").trim()}
        {closed && card.closedLabel ? ` — ${card.closedLabel}` : ""}
      </h2>

      <p className={`${prefix}__band-note`} role="status">
        {pairLabel} <code>{layoutId}</code>
        {sizeNote}: <strong>phone ≤600</strong> shows mob ·{" "}
        <strong>desktop &gt;1367</strong> shows desk. iPad (601–1366) deferred.
      </p>

      <div className={`${prefix}__mob`}>
        <FacePanels card={card} slot="mob" />
      </div>

      <div className={`${prefix}__desk`}>
        <FacePanels card={card} slot="desk" />
      </div>
    </article>
  );
}
