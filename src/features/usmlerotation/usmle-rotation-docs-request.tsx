/**
 * Docs / expense request — owner C band-split.
 * Desktop Figma 18760:12899 · mobile Figma 18760:11839.
 */
import { USMLE_ROTATION_DOCS_REQUEST } from "./content";
import "./usmle-rotation-docs-request.css";

const DOCTOR = "/assets/img/doctor.png";
const PORTRAIT = "/assets/img/insta-girl.png";

export function UsmleRotationDocsRequest() {
  const c = USMLE_ROTATION_DOCS_REQUEST;

  return (
    <section
      className="usmle-docs"
      data-pgs-module="usmle-rotation-docs-request"
      aria-labelledby="usmle-docs-heading"
    >
      <div className="usmle-docs__layout">
        <div className="usmle-docs__panel">
          <h2 id="usmle-docs-heading" className="usmle-docs__title">
            <span className="usmle-docs__title--desktop">{c.desktop.title}</span>
            <span className="usmle-docs__title--mobile">
              {c.mobile.titleLines.map((line) => (
                <span key={line} className="usmle-docs__title-line">
                  {line}
                </span>
              ))}
            </span>
          </h2>

          <a className="usmle-docs__cta" href={c.ctaHref}>
            {c.desktop.cta}
          </a>

          <p className="usmle-docs__inbox usmle-docs__inbox--desktop">{c.desktop.inbox}</p>
          <p className="usmle-docs__inbox usmle-docs__inbox--mobile">{c.mobile.inbox}</p>

          <p className="usmle-docs__body usmle-docs__body--desktop">{c.desktop.body}</p>
          <p className="usmle-docs__body usmle-docs__body--mobile">{c.mobile.body}</p>

          <div className="usmle-docs__doctor-wrap" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="usmle-docs__doctor"
              src={DOCTOR}
              alt=""
              width={235}
              height={386}
            />
          </div>
        </div>

        <figure className="usmle-docs__portrait-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="usmle-docs__portrait"
            src={PORTRAIT}
            alt={c.portraitAlt}
            width={337}
            height={502}
          />
        </figure>
      </div>
    </section>
  );
}
