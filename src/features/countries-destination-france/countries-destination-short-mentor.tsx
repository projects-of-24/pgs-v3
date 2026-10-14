/**
 * Country destination — Short-Term mentor plate + course cards — ST4.
 * Same mobile `county-box-short` structure. iPad CSS pass · Figma `33:5817`.
 */
import {
  USA_DESTINATION_SHORT_MENTOR,
  type CountriesDestinationShortMentorContent
} from "./content";
import "./countries-destination-short-mentor.css";

type Props = {
  content?: CountriesDestinationShortMentorContent;
};

export function CountriesDestinationShortMentor({
  content = USA_DESTINATION_SHORT_MENTOR
}: Props) {
  const c = content;

  return (
    <section
      id="cd-short-mentor"
      className="countries-destination-short-mentor"
      data-pgs-module="countries-destination-short-mentor"
      data-block-gate="st4"
      data-figma-ipad="33:5817"
      aria-labelledby="countries-destination-short-mentor-title"
    >
      <div className="countries-destination-short-mentor__plate">
        <header className="countries-destination-short-mentor__header">
          <h2
            id="countries-destination-short-mentor-title"
            className="countries-destination-short-mentor__title"
          >
            {c.title}
          </h2>
          <p className="countries-destination-short-mentor__blurb">{c.blurb}</p>
        </header>

        <ul className="countries-destination-short-mentor__grid">
          {c.courses.map((course) => (
            <li key={course.id} className="countries-destination-short-mentor__cell">
              <article
                className={
                  course.closedLabel
                    ? "countries-destination-short-mentor__card is-closed"
                    : "countries-destination-short-mentor__card"
                }
              >
                <div className="countries-destination-short-mentor__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="countries-destination-short-mentor__img"
                    src={course.imageSrc}
                    alt=""
                    width={232}
                    height={78}
                    decoding="async"
                  />
                  <p className="countries-destination-short-mentor__dir-tag">
                    {course.directionTag}
                  </p>
                </div>

                <div className="countries-destination-short-mentor__body">
                  <h3 className="countries-destination-short-mentor__course-title">
                    {course.title}
                  </h3>
                  <p className="countries-destination-short-mentor__course-blurb">
                    {course.blurb}
                  </p>
                </div>

                <div className="countries-destination-short-mentor__meta">
                  <p className="countries-destination-short-mentor__cat-tag">
                    {course.categoryTag}
                  </p>
                  <div className="countries-destination-short-mentor__metric">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="countries-destination-short-mentor__check"
                      src="/assets/img/check-green.png"
                      alt=""
                      width={21}
                      height={21}
                      decoding="async"
                    />
                    <p className="countries-destination-short-mentor__metric-text">
                      {course.metric}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className={
                    course.heartFilled
                      ? "countries-destination-short-mentor__heart is-filled"
                      : "countries-destination-short-mentor__heart"
                  }
                  aria-label={
                    course.heartFilled
                      ? `Saved ${course.title}`
                      : `Save ${course.title}`
                  }
                  aria-pressed={course.heartFilled}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/img/heart-icon.png"
                    alt=""
                    width={21}
                    height={21}
                    decoding="async"
                  />
                </button>

                {course.closedLabel ? (
                  <p
                    className="countries-destination-short-mentor__closed"
                    aria-label={course.closedLabel}
                  >
                    {course.closedLabel}
                  </p>
                ) : null}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
