/**
 * What is + IMG Benefits visual.
 * Figma title/body 18760:12397/12398 · visual 18760:12399 · mobile 18760:11409 + strip 18760:11447.
 * Mobile art placeholder (CMS later). Desktop overlap unchanged.
 */
import { USMLE_ROTATION_WHAT_IS } from "./content";
import "./usmle-rotation-what-is.css";

const COLLAGE = "/assets/img/USMLErotation2.png";
const CERT = "/assets/img/usmlerotation/img-benefits-cert.svg";
const CHECK = "/assets/img/usmlerotation/img-benefits-check.svg";

function CtaCopy({
  lines,
  className,
}: {
  lines: readonly [string, string, string];
  className: string;
}) {
  return (
    <p className={className}>
      <span className="usmle-what__cta-line">{lines[0]}</span>
      <span className="usmle-what__cta-line">
        of <span className="usmle-what__cta-em">the successful Match</span>
      </span>
      <span className="usmle-what__cta-line">stories</span>
    </p>
  );
}

export function UsmleRotationWhatIs() {
  const c = USMLE_ROTATION_WHAT_IS;

  return (
    <div
      className="usmle-what"
      data-pgs-module="usmle-rotation-what-is"
      role="region"
      aria-labelledby="usmle-what-title"
    >
      <div className="usmle-what__intro">
        <h2 id="usmle-what-title" className="usmle-what__title">
          {c.title}
        </h2>
        <p className="usmle-what__body">{c.body}</p>
      </div>

      {/* Mobile ≤600: green strip above visual (Figma 18760:11447). Hidden on desktop. */}
      <p className="usmle-what__cta usmle-what__cta--mobile">
        Be part of{" "}
        <span className="usmle-what__cta-em">the successful Match</span> stories
      </p>

      <div className="usmle-what__visual">
        {/* Mobile visual = Figma 18760:11409 (card overlap photo). Desktop = 18760:12399. */}
        <div className="usmle-what__collage-wrap">
          <div className="usmle-what__photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="usmle-what__collage"
              src={COLLAGE}
              alt={c.collageAlt}
              width={694}
              height={308}
            />
          </div>

          <aside className="usmle-what__card" aria-label={c.benefitsHeading}>
            <div className="usmle-what__card-head">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="usmle-what__card-cert"
                src={CERT}
                alt=""
                width={32}
                height={31}
              />
              <p className="usmle-what__card-title">{c.benefitsHeading}</p>
            </div>
            <ul className="usmle-what__benefits">
              {c.benefits.map((item) => (
                <li key={item} className="usmle-what__benefit">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="usmle-what__benefit-check"
                    src={CHECK}
                    alt=""
                    width={18}
                    height={18}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>

          <CtaCopy
            lines={c.ctaLines}
            className="usmle-what__cta usmle-what__cta--desktop"
          />
        </div>
      </div>
    </div>
  );
}
