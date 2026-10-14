/**
 * Country destination — How #PGS Helps + CTA — V6.
 * Same mobile `.helper-box-new` + green CTA. iPad CSS pass · Figma `30:5257`.
 */
import Link from "next/link";
import {
  USA_DESTINATION_VISA_HELP,
  type CountriesDestinationVisaHelpContent
} from "./content";
import "./countries-destination-visa-help.css";

type Props = {
  content?: CountriesDestinationVisaHelpContent;
};

export function CountriesDestinationVisaHelp({
  content = USA_DESTINATION_VISA_HELP
}: Props) {
  const c = content;

  return (
    <section
      id="cd-visa-helps"
      className="countries-destination-visa-help"
      data-pgs-module="countries-destination-visa-help"
      data-block-gate="v6"
      data-figma-ipad="30:5257"
      aria-labelledby="countries-destination-visa-help-title"
    >
      <div className="countries-destination-visa-help__copy">
        <h2
          id="countries-destination-visa-help-title"
          className="countries-destination-visa-help__title"
        >
          {c.title}
        </h2>
        <p className="countries-destination-visa-help__body">{c.body}</p>
      </div>
      <Link href={c.ctaHref} className="countries-destination-visa-help__cta">
        {c.ctaLabel}
      </Link>
    </section>
  );
}
