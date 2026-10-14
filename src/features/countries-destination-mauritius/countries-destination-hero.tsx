/**
 * Country destination hero — C1.
 * iPad Figma `26:2456` / hero cluster `26:2791`+`26:2798`.
 * Owned CSS only. CTA = real Link (owner). Type floor on Roboto body/CTA.
 */
import Link from "next/link";
import { USA_DESTINATION_HERO, type CountriesDestinationHeroContent } from "./content";
import "./countries-destination-hero.css";

type Props = {
  content?: CountriesDestinationHeroContent;
};

export function CountriesDestinationHero({
  content = USA_DESTINATION_HERO
}: Props) {
  const c = content;

  return (
    <section
      className="countries-destination-hero"
      data-pgs-module="countries-destination-hero"
      data-block-gate="c1"
      data-figma-ipad="26:2456"
      data-figma-phone="505:6809"
      aria-labelledby="countries-destination-hero-title"
    >
      <div className="countries-destination-hero__inner">
        <div className="countries-destination-hero__media-wrap">
          <div className="countries-destination-hero__badges" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="countries-destination-hero__flag"
              src={c.flagSrc}
              alt=""
              width={39}
              height={21}
              decoding="async"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="countries-destination-hero__badge"
              src={c.badgeSrc}
              alt=""
              width={52}
              height={35}
              decoding="async"
            />
          </div>
          <div className="countries-destination-hero__photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="countries-destination-hero__photo-img countries-destination-hero__photo-img--desktop"
              src={c.photoSrcDesktop}
              alt={c.photoAlt}
              width={1366}
              height={303}
              decoding="async"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="countries-destination-hero__photo-img countries-destination-hero__photo-img--mobile"
              src={c.photoSrc}
              alt={c.photoAlt}
              width={210}
              height={357}
              decoding="async"
            />
          </div>
        </div>

        <div className="countries-destination-hero__copy">
          <h1
            id="countries-destination-hero-title"
            className="countries-destination-hero__title"
          >
            {c.title}
          </h1>
          <div className="countries-destination-hero__text">
            <p className="countries-destination-hero__lead">{c.lead}</p>
            <p className="countries-destination-hero__subtitle">{c.subtitle}</p>
          </div>
          <Link href={c.ctaHref} className="countries-destination-hero__cta">
            {c.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
