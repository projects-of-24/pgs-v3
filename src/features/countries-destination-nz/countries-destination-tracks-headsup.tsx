/**
 * Country destination — Popular Study Tracks · A Heads Up — PT5.
 * Figma `35:6968` · rail = Why · Bebas punchline.
 */
import {
  USA_DESTINATION_TRACKS_HEADSUP,
  type CountriesDestinationTracksHeadsUpContent
} from "./content";
import "./countries-destination-tracks-headsup.css";

type Props = {
  content?: CountriesDestinationTracksHeadsUpContent;
};

export function CountriesDestinationTracksHeadsUp({
  content = USA_DESTINATION_TRACKS_HEADSUP
}: Props) {
  const c = content;

  return (
    <section
      id="cd-tracks-headsup"
      className="countries-destination-tracks-headsup"
      data-pgs-module="countries-destination-tracks-headsup"
      data-block-gate="pt5"
      data-figma-ipad="35:6968"
      aria-labelledby="countries-destination-tracks-headsup-title"
    >
      <h2
        id="countries-destination-tracks-headsup-title"
        className="countries-destination-tracks-headsup__title"
      >
        {c.title}
      </h2>

      <div className="countries-destination-tracks-headsup__body">
        <p className="countries-destination-tracks-headsup__p">{c.lead}</p>

        <p className="countries-destination-tracks-headsup__p">
          {c.middle.map((seg, i) => {
            const className = [
              seg.bold ? "countries-destination-tracks-headsup__em" : "",
              seg.italic ? "countries-destination-tracks-headsup__i" : ""
            ]
              .filter(Boolean)
              .join(" ");
            if (!className) {
              return <span key={`${i}-${seg.text.slice(0, 12)}`}>{seg.text}</span>;
            }
            return (
              <span key={`${i}-${seg.text.slice(0, 12)}`} className={className}>
                {seg.text}
              </span>
            );
          })}
        </p>

        <p className="countries-destination-tracks-headsup__p">{c.closing}</p>

        <p className="countries-destination-tracks-headsup__punch" aria-label={`${c.punchline.skill} ${c.punchline.separator} ${c.punchline.rest}`}>
          <span className="countries-destination-tracks-headsup__punch-part">
            {c.punchline.skill}
          </span>
          <span className="countries-destination-tracks-headsup__punch-sep" aria-hidden="true">
            {c.punchline.separator}
          </span>
          <span className="countries-destination-tracks-headsup__punch-part">
            {c.punchline.rest}
          </span>
        </p>
      </div>
    </section>
  );
}
