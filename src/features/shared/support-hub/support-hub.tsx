/**
 * Shared support hub. Desktop Figma `17056:21414`. Phone Figma `433:4717`.
 * Call and email are real links.
 */
import { SUPPORT_HUB } from "./content";
import "./support-hub.css";

export function SupportHub() {
  const c = SUPPORT_HUB;

  return (
    <section className="support-hub" data-pgs-module="support-hub" data-block-gate="u31" aria-labelledby="support-hub-title">
      <div className="support-hub__row">
        <div className="support-hub__brand-col">
          <h2 className="support-hub__brand" id="support-hub-title">
            {c.brand}
          </h2>
          <p className="support-hub__label">{c.hubLabel}</p>
        </div>
        <div className="support-hub__channels">
          <div className="support-hub__line">
            <p className="support-hub__badge">{c.callLabel}</p>
            <a className="support-hub__link" href={c.phoneHref}>
              <img src={c.phoneIconSrc} alt="" width={34} height={34} />
              <span>{c.phoneDisplay}</span>
            </a>
          </div>
          <div className="support-hub__line">
            <p className="support-hub__badge">{c.emailLabel}</p>
            <a className="support-hub__link" href={c.emailHref}>
              <img src={c.phoneIconSrc} alt="" width={34} height={34} />
              <span>{c.emailDisplay}</span>
            </a>
          </div>
        </div>
        <p className="support-hub__blurb">{c.blurb}</p>
      </div>
    </section>
  );
}
