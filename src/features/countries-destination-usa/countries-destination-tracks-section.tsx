/**
 * Country destination — Popular Study Tracks section table — PT3 / PT4.
 * Semantic table · CSS pass · Section 1 Figma `35:6834`.
 * Hang rail = Highlights-style drag + wheel pan (iPad bar).
 */
import {
  USA_DESTINATION_TRACKS_SECTION1,
  type CountriesDestinationTracksSectionContent
} from "./content";
import { CountriesDestinationHRail } from "./countries-destination-h-rail";
import "./countries-destination-tracks-section.css";

type Props = {
  content?: CountriesDestinationTracksSectionContent;
  id?: string;
  blockGate?: string;
  figmaIpad?: string;
  titleId?: string;
};

export function CountriesDestinationTracksSection({
  content = USA_DESTINATION_TRACKS_SECTION1,
  id = "cd-tracks-section1",
  blockGate = "pt3",
  figmaIpad = "35:6834",
  titleId = "countries-destination-tracks-section-title"
}: Props) {
  const c = content;

  return (
    <section
      id={id}
      className="countries-destination-tracks-section"
      data-pgs-module="countries-destination-tracks-section"
      data-block-gate={blockGate}
      data-figma-ipad={figmaIpad}
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className="countries-destination-tracks-section__title">
        {c.title}
      </h2>

      <CountriesDestinationHRail
        className="countries-destination-tracks-section__scroll"
        ariaLabel={`${c.title.replace(/\n/g, " ")} table`}
      >
        <table className="countries-destination-tracks-section__table">
          <thead>
            <tr>
              <th scope="col">Track</th>
              <th scope="col">Field</th>
              <th scope="col">Ideal For</th>
            </tr>
          </thead>
          <tbody>
            {c.rows.map((row) => (
              <tr key={row.track}>
                <td>{row.track}</td>
                <td>{row.field}</td>
                <td>{row.idealFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CountriesDestinationHRail>
    </section>
  );
}
