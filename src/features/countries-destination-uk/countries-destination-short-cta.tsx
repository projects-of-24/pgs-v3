/**
 * Country destination — Short-Term CTA + helper — ST3.
 * Same mobile internship-cta pattern. iPad CSS pass · Figma `33:5812`.
 */
import Link from "next/link";
import {
  USA_DESTINATION_SHORT_CTA,
  type CountriesDestinationShortCtaContent
} from "./content";
import "./countries-destination-short-cta.css";

type Props = {
  content?: CountriesDestinationShortCtaContent;
};

export function CountriesDestinationShortCta({
  content = USA_DESTINATION_SHORT_CTA
}: Props) {
  const c = content;

  return (
    <section
      className="countries-destination-short-cta"
      data-pgs-module="countries-destination-short-cta"
      data-block-gate="st3"
      data-figma-ipad="33:5812"
      aria-label="Talk to an expert about short-term courses"
    >
      <Link href={c.ctaHref} className="countries-destination-short-cta__btn">
        {c.ctaLabel}
      </Link>
      <p className="countries-destination-short-cta__helper">{c.helper}</p>
    </section>
  );
}
