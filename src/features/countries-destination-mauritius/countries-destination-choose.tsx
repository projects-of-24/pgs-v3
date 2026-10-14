/**
 * Country destination — bento cards.
 * Study 101 Why-choose: C6 · Figma `26:2867`.
 * Study Cost Spend: CS3 · Figma `29:4807`.
 */
import {
  USA_DESTINATION_CHOOSE,
  type CountriesDestinationChooseContent
} from "./content";
import "./countries-destination-choose.css";

type Props = {
  content?: CountriesDestinationChooseContent;
  id?: string;
  blockGate?: string;
  figmaIpad?: string;
  titleId?: string;
};

export function CountriesDestinationChoose({
  content = USA_DESTINATION_CHOOSE,
  id = "cd-choose",
  blockGate = "c6",
  figmaIpad = "26:2867",
  titleId = "countries-destination-choose-title"
}: Props) {
  const c = content;

  return (
    <section
      id={id}
      className="countries-destination-choose"
      data-pgs-module="countries-destination-choose"
      data-block-gate={blockGate}
      data-figma-ipad={figmaIpad}
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className="countries-destination-choose__title">
        {c.title}
      </h2>

      <div className="countries-destination-choose__grid">
        <div className="countries-destination-choose__chips">
          {c.chips.map((chip) => (
            <article
              key={chip.heading ? `${chip.heading}-${chip.label}` : chip.label}
              className="countries-destination-choose__card countries-destination-choose__card--chip"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="countries-destination-choose__icon"
                src={chip.iconSrc}
                alt={chip.iconAlt}
                width={34}
                height={34}
                decoding="async"
              />
              <div className="countries-destination-choose__pill">
                {chip.heading ? (
                  <p className="countries-destination-choose__pill-heading">
                    {chip.heading}
                  </p>
                ) : null}
                <p className="countries-destination-choose__pill-label">
                  {chip.label}
                </p>
              </div>
            </article>
          ))}
        </div>

        <article className="countries-destination-choose__card countries-destination-choose__card--combo">
          <div className="countries-destination-choose__combo-icons" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.combo.leftIconSrc} alt="" width={29} height={29} decoding="async" />
            <span className="countries-destination-choose__plus">+</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.combo.rightIconSrc} alt="" width={27} height={27} decoding="async" />
          </div>
          <div className="countries-destination-choose__combo-body">
            <p className="countries-destination-choose__pill">
              <span className="countries-destination-choose__pill-label">
                {c.combo.left}
              </span>
            </p>
            <span className="countries-destination-choose__plus" aria-hidden="true">
              +
            </span>
            <p className="countries-destination-choose__pill">
              <span className="countries-destination-choose__pill-label">
                {c.combo.right}
              </span>
            </p>
          </div>
        </article>

        <div className="countries-destination-choose__bottom">
          <article className="countries-destination-choose__card countries-destination-choose__card--timeline">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="countries-destination-choose__heart"
              src={c.timeline.iconSrc}
              alt=""
              width={37}
              height={41}
              decoding="async"
            />
            <p className="countries-destination-choose__timeline-label">
              {c.timeline.label}
            </p>
          </article>

          <div className="countries-destination-choose__blurb">
            <p className="countries-destination-choose__tagline">{c.tagline}</p>
            <p className="countries-destination-choose__quote">{c.quote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
