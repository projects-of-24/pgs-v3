/**
 * #StudentSupportHub — Call Us / Email Us.
 * Desktop Figma 18760:12913 · mobile 18760:11862.
 */
import { USMLE_ROTATION_SUPPORT_HUB } from "./content";
import "./usmle-rotation-support-hub.css";

const PHONE_ICON = "/assets/img/usmlerotation/phone.svg";

export function UsmleRotationSupportHub() {
  const c = USMLE_ROTATION_SUPPORT_HUB;

  return (
    <section
      className="usmle-hub"
      data-pgs-module="usmle-rotation-support-hub"
      aria-labelledby="usmle-hub-heading"
    >
      <div className="usmle-hub__inner">
        <p className="usmle-hub__blurb usmle-hub__blurb--mobile">{c.blurb}</p>

        <div className="usmle-hub__main">
          <div className="usmle-hub__brand-col">
            <p id="usmle-hub-heading" className="usmle-hub__brand">
              {c.brand}
            </p>
            <p className="usmle-hub__hub-label">{c.hubLabel}</p>
          </div>

          <div className="usmle-hub__channels">
            <div className="usmle-hub__row">
              <span className="usmle-hub__badge">{c.callLabel}</span>
              <a className="usmle-hub__link" href={c.phoneHref}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="usmle-hub__icon"
                  src={PHONE_ICON}
                  alt=""
                  width={34}
                  height={34}
                />
                <span>{c.phoneDisplay}</span>
              </a>
            </div>
            <div className="usmle-hub__row">
              <span className="usmle-hub__badge">{c.emailLabel}</span>
              <a className="usmle-hub__link" href={c.emailHref}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="usmle-hub__icon"
                  src={PHONE_ICON}
                  alt=""
                  width={34}
                  height={34}
                />
                <span>{c.emailDisplay}</span>
              </a>
            </div>
          </div>

          <p className="usmle-hub__blurb usmle-hub__blurb--desktop">{c.blurb}</p>
        </div>
      </div>
    </section>
  );
}
