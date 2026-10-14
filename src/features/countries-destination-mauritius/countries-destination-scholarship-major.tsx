/**
 * Country destination — Major Scholarships table — SC3.
 * Same mobile 3-col MajorScholarships data. Semantic table · CSS pass · Figma `34:6286`.
 * Hang rail = Highlights-style drag + wheel pan (iPad bar).
 */
import {
  USA_DESTINATION_SCHOLARSHIP_MAJOR,
  type CountriesDestinationScholarshipMajorContent
} from "./content";
import { CountriesDestinationHRail } from "./countries-destination-h-rail";
import "./countries-destination-scholarship-major.css";

type Props = {
  content?: CountriesDestinationScholarshipMajorContent;
};

export function CountriesDestinationScholarshipMajor({
  content = USA_DESTINATION_SCHOLARSHIP_MAJOR
}: Props) {
  const c = content;

  return (
    <section
      id="cd-scholarship-major"
      className="countries-destination-scholarship-major"
      data-pgs-module="countries-destination-scholarship-major"
      data-block-gate="sc3"
      data-figma-ipad="34:6286"
      aria-labelledby="countries-destination-scholarship-major-title"
    >
      <h2
        id="countries-destination-scholarship-major-title"
        className="countries-destination-scholarship-major__title"
      >
        {c.title}
      </h2>

      <CountriesDestinationHRail
        className="countries-destination-scholarship-major__scroll"
        ariaLabel={`${c.title} table`}
      >
        <table className="countries-destination-scholarship-major__table">
          <thead>
            <tr>
              <th scope="col">Scholarship Name</th>
              <th scope="col">Type</th>
              <th scope="col">Provided By</th>
            </tr>
          </thead>
          <tbody>
            {c.rows.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.type}</td>
                <td>{row.providedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CountriesDestinationHRail>
    </section>
  );
}
