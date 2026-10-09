/**
 * Courses template — C7 awarding body (multi-pass).
 * Desk `17072:11083` (C7a–e). Mob group `551:10567` (C7a–e complete).
 * Owned CSS. Fixtures only. iPad deferred.
 */
import type { ProgramsCoursesView } from "./courses-template-view";
import "./programs-courses-awarding.css";

type ProgramsCoursesAwardingProps = {
  data: ProgramsCoursesView["awarding"];
};

export function ProgramsCoursesAwarding({
  data: a
}: ProgramsCoursesAwardingProps) {
  return (
    <section
      id="pc-c7"
      className="pc-award"
      data-block-gate="c7a-c7e"
      data-figma-desktop="17072:11083"
      data-figma-mobile="551:10567"
      data-figma-intro="17072:11065"
      data-figma-intro-mobile="551:10336"
      data-figma-media="17072:11044"
      data-figma-facts="17072:11052"
      data-figma-facts-mobile="551:10351"
      data-figma-rankings="17072:11068"
      data-figma-rankings-mobile="551:10365"
      data-figma-accreditation="17072:11074"
      data-figma-accreditation-mobile="551:10370"
      aria-labelledby="pc-c7-title"
    >
      <div className="pc-award__frame">
        <header className="pc-award__intro">
          <h2 id="pc-c7-title" className="pc-award__title">
            {a.title}
          </h2>
          <p className="pc-award__body">{a.body}</p>
        </header>

        <div className="pc-award__media">
          <div className="pc-award__logo-chip">
            {a.logo.trim() ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="pc-award__logo-img"
                src={a.logo}
                alt={a.logoAlt || "Awarding body logo"}
                width={274}
                height={112}
                decoding="async"
              />
            ) : (
              <div
                className="pc-award__logo-img pc-award__logo-img--empty"
                role="img"
                aria-label={a.logoAlt || "No awarding logo yet — set Logo URL in C7"}
              />
            )}
            <span className="pc-award__logo-corner" aria-hidden="true" />
          </div>
          <div className="pc-award__photo">
            {a.photo.trim() ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="pc-award__photo-img pc-award__photo-img--desk"
                  src={a.photo}
                  alt={a.photoAlt || "Awarding body"}
                  width={481}
                  height={503}
                  decoding="async"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="pc-award__photo-img pc-award__photo-img--mob"
                  src={a.photoMobile ?? a.photo}
                  alt={a.photoAlt || "Awarding body"}
                  width={288}
                  height={425}
                  decoding="async"
                />
              </>
            ) : (
              <div
                className="pc-award__photo-img pc-award__photo-img--empty"
                role="img"
                aria-label={a.photoAlt || "No awarding photo yet — set Photo URL in C7"}
              />
            )}
          </div>
        </div>

        {/* C7c facts — absolute on frame (desk left column · mob bottom-left) */}
        <ul className="pc-award__facts">
          {a.facts.map((fact) => (
            <li key={fact.title} className="pc-award__fact">
              <p className="pc-award__fact-title">{fact.title}</p>
              {fact.body ? (
                <p className="pc-award__fact-body">{fact.body}</p>
              ) : null}
            </li>
          ))}
        </ul>

        <aside
          className="pc-award__rankings"
          aria-label="Rankings and reputation"
        >
          <div className="pc-award__rankings-inner">
            <h3 className="pc-award__rankings-title">
              {a.rankings.titleLines.map((line) => (
                <span key={line} className="pc-award__rankings-title-line">
                  {line}
                </span>
              ))}
            </h3>
            {a.rankings.bodies.map((para) => (
              <p key={para.slice(0, 24)} className="pc-award__rankings-body">
                {para}
              </p>
            ))}
          </div>
        </aside>

        {/* C7e — accreditation · Figma x≈583.3 y=671.2 within frame */}
        <div className="pc-award__accredit">
          <h3 className="pc-award__accredit-title">
            {a.accreditation.titleLines.map((line) => (
              <span key={line} className="pc-award__accredit-title-line">
                {line}
              </span>
            ))}
          </h3>
          <ul className="pc-award__accredit-logos">
            {a.accreditation.logos.map((logo) => (
              <li key={logo.src} className="pc-award__accredit-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="pc-award__accredit-img"
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  decoding="async"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
