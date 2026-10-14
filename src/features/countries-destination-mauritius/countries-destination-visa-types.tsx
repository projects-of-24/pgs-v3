/**
 * Country destination — Visa type cards + prep — V2.
 * Same mobile `visa-card` structure (h3 + p). iPad CSS pass · Figma `30:5086` / `30:5085`.
 */
import {
  USA_DESTINATION_VISA_TYPES,
  type CountriesDestinationVisaTypesContent
} from "./content";
import "./countries-destination-visa-types.css";

type Props = {
  content?: CountriesDestinationVisaTypesContent;
};

export function CountriesDestinationVisaTypes({
  content = USA_DESTINATION_VISA_TYPES
}: Props) {
  const c = content;

  return (
    <section
      className="countries-destination-visa-types"
      data-pgs-module="countries-destination-visa-types"
      data-block-gate="v2"
      data-figma-ipad="30:5086"
      aria-label="USA student visa types"
    >
      <div className="countries-destination-visa-types__list">
        {c.types.map((visa) => (
          <article
            key={visa.name}
            className="countries-destination-visa-types__card"
          >
            <h3 className="countries-destination-visa-types__name">{visa.name}</h3>
            <p className="countries-destination-visa-types__desc">{visa.description}</p>
          </article>
        ))}
      </div>
      <p className="countries-destination-visa-types__prep">{c.prepNote}</p>
    </section>
  );
}
