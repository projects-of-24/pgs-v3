/**
 * Country destination — Overview table — C5.
 * iPad Figma `26:2846`. Owned CSS. Anchor `cd-overview` matches C3 TOC.
 */
import {
  USA_DESTINATION_OVERVIEW,
  type CountriesDestinationOverviewContent
} from "./content";
import "./countries-destination-overview.css";

type Props = {
  content?: CountriesDestinationOverviewContent;
};

export function CountriesDestinationOverview({
  content = USA_DESTINATION_OVERVIEW
}: Props) {
  const c = content;

  return (
    <section
      id="cd-overview"
      className="countries-destination-overview"
      data-pgs-module="countries-destination-overview"
      data-block-gate="c5"
      data-figma-ipad="26:2846"
      aria-labelledby="countries-destination-overview-title"
    >
      <h2
        id="countries-destination-overview-title"
        className="countries-destination-overview__title"
      >
        {c.title}
      </h2>
      <div className="countries-destination-overview__table-wrap">
        <table className="countries-destination-overview__table">
          <caption className="sr-only">{c.title}</caption>
          <tbody>
            {c.rows.map((row) => (
              <tr key={row.label} className="countries-destination-overview__row">
                <th scope="row" className="countries-destination-overview__label">
                  {row.label}
                </th>
                <td className="countries-destination-overview__value">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
