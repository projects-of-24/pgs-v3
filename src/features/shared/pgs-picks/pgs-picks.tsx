/**
 * Shared #Pgs picks. Desktop Figma `17055:12930`. Phone Figma `433:4740`.
 * Each card links to that course. Arrows move one card. No scrollbar.
 */
"use client";

import { useRef } from "react";
import { PGS_PICKS, PGS_PICKS_FIXTURE, type PgsPicksCard } from "./content";
import "./pgs-picks.css";

export type { PgsPicksCard };

type Props = {
  courses?: PgsPicksCard[];
};

function CardFace({ card }: { card: PgsPicksCard }) {
  const face = (
    <>
      <img className="pgs-picks__photo" src={card.imageSrc} alt={card.imageAlt} width={180} height={233} />
      <span className="pgs-picks__copy">
        <span className="pgs-picks__cta">{card.cta}</span>
        <span className="pgs-picks__blurb pgs-picks__blurb--desk">{card.blurb}</span>
        <span className="pgs-picks__blurb pgs-picks__blurb--phone">{card.blurbMobile || card.blurb}</span>
      </span>
    </>
  );

  if (!card.href) {
    return <div className="pgs-picks__link">{face}</div>;
  }

  return (
    <a className="pgs-picks__link" href={card.href}>
      {face}
    </a>
  );
}

function readGap(track: HTMLElement) {
  return Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "0") || 16;
}

export function PgsPicks({ courses = [] }: Props) {
  const c = PGS_PICKS;
  const trackRef = useRef<HTMLUListElement>(null);
  const cards = courses.length > 0 ? courses : PGS_PICKS_FIXTURE;

  function scrollByCard(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".pgs-picks__card");
    if (!card) return;
    const step = card.offsetWidth + readGap(track);
    const index = Math.round(track.scrollLeft / step);
    const next = Math.max(0, index + direction);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: next * step, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <section className="pgs-picks" data-pgs-module="pgs-picks" data-block-gate="u32" aria-labelledby="pgs-picks-title">
      <div className="pgs-picks__row">
        <h2 className="pgs-picks__title" id="pgs-picks-title">
          {c.heading}
        </h2>
        <div className="pgs-picks__rail">
          <div className="pgs-picks__nav" role="group" aria-label="Picks carousel">
            <button type="button" className="pgs-picks__arrow" aria-label={c.prevLabel} onClick={() => scrollByCard(-1)}>
              <img src={c.prevIconSrc} alt="" width={48} height={48} />
            </button>
            <button type="button" className="pgs-picks__arrow" aria-label={c.nextLabel} onClick={() => scrollByCard(1)}>
              <img src={c.nextIconSrc} alt="" width={48} height={48} />
            </button>
          </div>
          <div className="pgs-picks__viewport">
            <ul ref={trackRef} className="pgs-picks__track">
              {cards.map((card) => (
                <li key={card.id} className="pgs-picks__card">
                  <CardFace card={card} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
