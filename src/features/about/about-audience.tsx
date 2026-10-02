/**
 * About Us — Who / What comparison — A4.
 * Desktop `17084:12024` · Mobile `508:9095` / `511:5515`.
 * Switches visual-only (all YES per Figma); interaction deferred.
 */
import { AboutAudienceParts } from "./about-audience-parts";
import { ABOUT_AUDIENCE } from "./content";
import "./about-audience.css";

function YesSwitch({ tickSrc, mobile = false }: { tickSrc: string; mobile?: boolean }) {
  return (
    <div
      className={`about-audience__switch${mobile ? " about-audience__switch--mob" : ""}`}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="about-audience__switch-tick"
        src={tickSrc}
        alt=""
        width={mobile ? 10 : 19}
        height={mobile ? 10 : 19}
      />
    </div>
  );
}

export function AboutAudience() {
  const c = ABOUT_AUDIENCE;

  return (
    <section
      className="about-audience"
      data-pgs-module="about-audience"
      data-block-gate="a4"
      aria-label={`${c.whoTitle} / ${c.whatTitle}`}
    >
      <div className="about-audience__inner">
        <div className="about-audience__desk-wrap">
          <div className="about-audience__desk-decor" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="about-audience__desk-arrow"
              src={c.mobileNoteArrowSrc}
              alt=""
              width={95}
              height={53}
            />
            <p className="about-audience__desk-note">{c.mobileNote}</p>
          </div>

          <div className="about-audience__desk">
            {/* Figma desk: arrow → switches → Who → What (`17084:12024`). */}
            <div className="about-audience__desk-head about-audience__desk-head--gap" />
            <div className="about-audience__desk-head about-audience__desk-head--who">
              <h2 className="about-audience__title">{c.whoTitle}</h2>
            </div>
            <div className="about-audience__desk-head about-audience__desk-head--what">
              <h2 className="about-audience__title about-audience__title--what">
                {c.whatTitle}
              </h2>
            </div>

            {c.rows.map((row, i) => (
              <div key={`desk-row-${i}`} className="about-audience__desk-row">
                <YesSwitch tickSrc={c.switchTickSrc} />
                <p className="about-audience__copy about-audience__copy--who">
                  <AboutAudienceParts parts={row.who} />
                </p>
                <p className="about-audience__copy about-audience__copy--what">
                  <AboutAudienceParts parts={row.what} />
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-audience__mob">
          <div className="about-audience__mob-who-block">
            <h2 className="about-audience__title about-audience__title--who-mob">
              {c.whoTitle}
            </h2>
            <div className="about-audience__mob-rows">
              {c.rows.map((row, i) => (
                <div key={`mob-row-${i}`} className="about-audience__mob-row">
                  <div className="about-audience__mob-rail">
                    {i === 0 ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        className="about-audience__mob-arrow"
                        src={c.mobileNoteArrowSrc}
                        alt=""
                        width={53}
                        height={30}
                        aria-hidden="true"
                      />
                    ) : null}
                    {i === 0 ? (
                      <p className="about-audience__mob-note">{c.mobileNote}</p>
                    ) : null}
                  </div>
                  <YesSwitch tickSrc={c.switchTickSrc} mobile />
                  <p className="about-audience__copy about-audience__copy--who-mob">
                    <AboutAudienceParts parts={row.who} />
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="about-audience__mob-what">
            <h2 className="about-audience__title about-audience__title--what about-audience__title--what-mob">
              {c.whatTitleMobileLines.map((line, i) => (
                <span key={i} className="about-audience__title-line">
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <div className="about-audience__mob-what-rows">
            <ul className="about-audience__mob-what-list">
              {c.rows.map((row, i) => (
                <li key={`mob-what-${i}`} className="about-audience__mob-what-item">
                  <p className="about-audience__copy about-audience__copy--what-mob">
                    <AboutAudienceParts parts={row.what} />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
