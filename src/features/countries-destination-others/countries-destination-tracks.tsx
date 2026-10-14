/**
 * Country destination — STEM / USMLE / Non-STEM — C7.
 * iPad Figma `26:2954`. Owned CSS. Anchors match C3 TOC.
 */
import {
  USA_DESTINATION_TRACKS,
  type CountriesDestinationTracksContent
} from "./content";
import "./countries-destination-tracks.css";

type Props = {
  content?: CountriesDestinationTracksContent;
};

export function CountriesDestinationTracks({
  content = USA_DESTINATION_TRACKS
}: Props) {
  const c = content;

  return (
    <div
      className="countries-destination-tracks"
      data-pgs-module="countries-destination-tracks"
      data-block-gate="c7"
      data-figma-ipad="26:2954"
    >
      {c.tracks.map((track) => (
        <section
          key={track.id}
          id={track.id}
          className="countries-destination-tracks__block"
          aria-labelledby={`${track.id}-title`}
        >
          <h2
            id={`${track.id}-title`}
            className="countries-destination-tracks__title"
          >
            {track.title}
          </h2>
          <p className="countries-destination-tracks__body">{track.body}</p>
        </section>
      ))}
    </div>
  );
}
