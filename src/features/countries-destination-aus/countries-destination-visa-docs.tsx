/**
 * Country destination — Essential Documents — V3.
 * Same mobile structure: docs-grid · Document-* · icon-top · doc-card · notes.
 * iPad CSS pass · Figma `30:5105`. Anchor `cd-visa-docs`.
 */
import {
  USA_DESTINATION_VISA_DOCS,
  type CountriesDestinationVisaDocsContent
} from "./content";
import "./countries-destination-visa-docs.css";

type Props = {
  content?: CountriesDestinationVisaDocsContent;
};

export function CountriesDestinationVisaDocs({
  content = USA_DESTINATION_VISA_DOCS
}: Props) {
  const c = content;

  return (
    <section
      id="cd-visa-docs"
      className="countries-destination-visa-docs"
      data-pgs-module="countries-destination-visa-docs"
      data-block-gate="v3"
      data-figma-ipad="30:5105"
      aria-labelledby="countries-destination-visa-docs-title"
    >
      <h2
        id="countries-destination-visa-docs-title"
        className="countries-destination-visa-docs__title"
      >
        {c.title}
      </h2>

      <div className="countries-destination-visa-docs__grid">
        {c.groups.map((group) => (
          <div
            key={group.title}
            className="countries-destination-visa-docs__outer"
          >
            <div className="countries-destination-visa-docs__icon" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={group.iconSrc} alt="" width={45} height={45} decoding="async" />
            </div>
            <div className="countries-destination-visa-docs__card">
              <h3 className="countries-destination-visa-docs__card-title">
                {group.title}
              </h3>
              <ul className="countries-destination-visa-docs__list">
                {group.items.map((item) => (
                  <li key={item} className="countries-destination-visa-docs__item">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="countries-destination-visa-docs__check"
                      src="/assets/img/flat-color-icons_ok.png"
                      alt=""
                      width={36}
                      height={36}
                      decoding="async"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        <div className="countries-destination-visa-docs__notes-wrap">
          <div className="countries-destination-visa-docs__notes">
            <h3 className="countries-destination-visa-docs__notes-title">
              {c.notesTitle}
            </h3>
            <ol className="countries-destination-visa-docs__notes-list">
              {c.notes.map((note, i) => (
                <li key={note}>
                  <span
                    className="countries-destination-visa-docs__notes-num"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span>{note}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="countries-destination-visa-docs__plan">
            <p className="countries-destination-visa-docs__plan-title">{c.planTitle}</p>
            <p className="countries-destination-visa-docs__plan-body">{c.planBody}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
