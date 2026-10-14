/**
 * Country destination — Do's / Don'ts — V5.
 * Same mobile `.mobile-points-usa` stacked lists. iPad CSS pass · Figma `30:5220`.
 */
import {
  USA_DESTINATION_VISA_DOS,
  type CountriesDestinationVisaDosContent
} from "./content";
import "./countries-destination-visa-dos.css";

type Props = {
  content?: CountriesDestinationVisaDosContent;
};

export function CountriesDestinationVisaDos({
  content = USA_DESTINATION_VISA_DOS
}: Props) {
  const c = content;

  return (
    <section
      id="cd-visa-dos"
      className="countries-destination-visa-dos"
      data-pgs-module="countries-destination-visa-dos"
      data-block-gate="v5"
      data-figma-ipad="30:5220"
      aria-labelledby="countries-destination-visa-dos-title"
    >
      <h2
        id="countries-destination-visa-dos-title"
        className="countries-destination-visa-dos__title"
      >
        {c.title}
      </h2>

      <div className="countries-destination-visa-dos__stack">
        <div className="countries-destination-visa-dos__group">
          <h3 className="countries-destination-visa-dos__heading">
            {c.criteriaHeading}
          </h3>
          {c.rows.map((row) => (
            <p key={`criteria-${row.criteria}`} className="countries-destination-visa-dos__row">
              {row.criteria}
            </p>
          ))}
        </div>

        <div className="countries-destination-visa-dos__group">
          <h3 className="countries-destination-visa-dos__heading">{c.dosHeading}</h3>
          {c.rows.map((row) => (
            <p key={`dos-${row.criteria}`} className="countries-destination-visa-dos__row">
              {row.dos}
            </p>
          ))}
        </div>

        <div className="countries-destination-visa-dos__group">
          <h3 className="countries-destination-visa-dos__heading">
            {c.dontsHeading}
          </h3>
          {c.rows.map((row) => (
            <p key={`donts-${row.criteria}`} className="countries-destination-visa-dos__row">
              {row.donts}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
