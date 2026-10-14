/**
 * Country destination — Study Cost envelope + Premium CTA — CS4.
 * iPad Figma `29:4895` · `29:4907` · `29:4910`.
 * Envelope = same mobile Subtract ticket pattern (rotate in CSS). Owned CSS.
 */
import {
  USA_DESTINATION_COST_CTA,
  type CountriesDestinationCostCtaContent
} from "./content";
import "./countries-destination-cost-cta.css";

type Props = {
  content?: CountriesDestinationCostCtaContent;
};

export function CountriesDestinationCostCta({
  content = USA_DESTINATION_COST_CTA
}: Props) {
  const c = content;

  return (
    <section
      id="cd-cost-cta"
      className="countries-destination-cost-cta"
      data-pgs-module="countries-destination-cost-cta"
      data-block-gate="cs4"
      data-figma-ipad="29:4895"
      aria-labelledby="countries-destination-cost-cta-title"
    >
      <div className="countries-destination-cost-cta__stack">
        <div className="countries-destination-cost-cta__envelope">
          <div className="countries-destination-cost-cta__shape" aria-hidden="true">
            <div className="countries-destination-cost-cta__mark-plate" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="countries-destination-cost-cta__ticket"
              src={c.ticketSrc}
              alt=""
              width={565}
              height={245}
              decoding="async"
            />
            <p className="countries-destination-cost-cta__mark">{c.mark}</p>
          </div>
          <div className="countries-destination-cost-cta__words">
            <p className="countries-destination-cost-cta__headline">
              {c.envelopeHeadline}
            </p>
            <p className="countries-destination-cost-cta__body">{c.envelopeBody}</p>
          </div>
        </div>

        <div className="countries-destination-cost-cta__portrait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.portraitSrc}
            alt={c.portraitAlt}
            width={248}
            height={245}
            decoding="async"
          />
        </div>

        <div className="countries-destination-cost-cta__premium">
          <h2
            id="countries-destination-cost-cta-title"
            className="countries-destination-cost-cta__join"
          >
            <span className="countries-destination-cost-cta__join-line">
              {c.joinLine}
            </span>
            <span className="countries-destination-cost-cta__brand-line">
              {c.brandLine}
            </span>
          </h2>
          <p className="countries-destination-cost-cta__support">{c.support}</p>
        </div>
      </div>
    </section>
  );
}
