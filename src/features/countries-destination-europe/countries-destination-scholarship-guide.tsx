/**
 * Country destination — Scholarship Apply Guide — SC4.
 * Same mobile `.ScholarshipApplyGuide` structure. iPad CSS pass · Figma `34:6365`.
 */
import {
  USA_DESTINATION_SCHOLARSHIP_GUIDE,
  type CountriesDestinationScholarshipGuideContent
} from "./content";
import "./countries-destination-scholarship-guide.css";

type Props = {
  content?: CountriesDestinationScholarshipGuideContent;
};

export function CountriesDestinationScholarshipGuide({
  content = USA_DESTINATION_SCHOLARSHIP_GUIDE
}: Props) {
  const c = content;

  return (
    <section
      id="cd-scholarship-guide"
      className="countries-destination-scholarship-guide"
      data-pgs-module="countries-destination-scholarship-guide"
      data-block-gate="sc4"
      data-figma-ipad="34:6365"
      aria-labelledby="countries-destination-scholarship-guide-title"
    >
      <h2
        id="countries-destination-scholarship-guide-title"
        className="countries-destination-scholarship-guide__title"
      >
        {c.title}
      </h2>

      <div className="countries-destination-scholarship-guide__body">
        {c.paragraphs.map((p) => (
          <p key={p.slice(0, 40)} className="countries-destination-scholarship-guide__p">
            {p}
          </p>
        ))}

        <p className="countries-destination-scholarship-guide__pledge">{c.pledge}</p>

        <p className="countries-destination-scholarship-guide__help-intro">{c.helpIntro}</p>

        <ul className="countries-destination-scholarship-guide__list">
          {c.helpItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className="countries-destination-scholarship-guide__closing">{c.closing}</p>
      </div>
    </section>
  );
}
