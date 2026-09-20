/**
 * purplePREMIUM HOME — Why #purplepremium (H9).
 * Desktop `17052:8371` · Mobile `371:5370`.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: reason / list body ~9.8–14px
 * ISSUE: below --pgs-type-floor 16px
 * PGS IMPLEMENTATION: body copy uses max(16px, Figma). Look unchanged otherwise.
 */
import {
  PREMIUM_HOME_WHY,
  type PremiumHomeWhyPart
} from "./content";
import "./premium-home-why.css";

function RichLine({ parts }: { parts: readonly PremiumHomeWhyPart[] }) {
  return (
    <>
      {parts.map((p, i) =>
        p.bold ? (
          <strong key={`${i}-${p.text.slice(0, 12)}`}>{p.text}</strong>
        ) : (
          <span key={`${i}-${p.text.slice(0, 12)}`}>{p.text}</span>
        )
      )}
    </>
  );
}

export function PremiumHomeWhy() {
  const c = PREMIUM_HOME_WHY;

  return (
    <section
      className="premium-home-why"
      data-pgs-module="premium-home-why"
      data-block-gate="h9"
      data-figma-desktop="17052:8371"
      data-figma-mobile="371:5370"
      aria-labelledby="premium-home-why-title"
    >
      <div className="premium-home-why__panel">
        <div className="premium-home-why__stack">
          <div className="premium-home-why__hero-row">
            <div className="premium-home-why__title-tile">
              <h2 id="premium-home-why-title" className="premium-home-why__title">
                <span className="premium-home-why__title-line">{c.titleLines[0]}</span>
                <span className="premium-home-why__title-line">{c.titleLines[1]}</span>
              </h2>
            </div>

            <ol className="premium-home-why__reasons">
              {c.reasons.map((r) => (
                <li key={r.num} className="premium-home-why__reason">
                  <div className="premium-home-why__reason-head">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="premium-home-why__star"
                      src={c.starSrc}
                      alt=""
                      width={31}
                      height={31}
                      aria-hidden="true"
                    />
                    <span className="premium-home-why__reason-num" aria-hidden="true">
                      {r.num}
                    </span>
                  </div>
                  <p className="premium-home-why__reason-text">{r.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="premium-home-why__also">
            <div className="premium-home-why__also-stack">
              <p className="premium-home-why__also-title">{c.alsoTitle}</p>
              <figure className="premium-home-why__also-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.alsoPhotoSrc} alt={c.alsoPhotoAlt} width={151} height={122} />
              </figure>
            </div>
            <div className="premium-home-why__also-copy">
              {c.alsoBody.map((para) => (
                <p key={para.slice(0, 32)} className="premium-home-why__also-body">
                  {para}
                </p>
              ))}
            </div>
          </div>

          <div className="premium-home-why__compare">
            <p className="premium-home-why__compare-lead">{c.compareLead}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="premium-home-why__arrow"
              src={c.arrowSrc}
              alt=""
              width={78}
              height={78}
              aria-hidden="true"
            />

            <div className="premium-home-why__cols">
              <div className="premium-home-why__col premium-home-why__col--no">
                <p className="premium-home-why__col-label premium-home-why__col-label--no">
                  {c.noLabel}
                </p>
                <div className="premium-home-why__card premium-home-why__card--no">
                  <h3 className="premium-home-why__card-title">
                    {c.noTitle[0]}
                    <br />
                    {c.noTitle[1]}
                  </h3>
                  <ul className="premium-home-why__list">
                    {c.noItems.map((parts, i) => (
                      <li key={`no-${i}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={c.crossSrc} alt="" width={23} height={23} aria-hidden="true" />
                        <p>
                          <RichLine parts={parts} />
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="premium-home-why__vs" aria-hidden="true">
                {c.vsLabel}
              </p>

              <div className="premium-home-why__col premium-home-why__col--yes">
                <p className="premium-home-why__col-label premium-home-why__col-label--yes">
                  {c.yesLabel}
                </p>
                <div className="premium-home-why__card premium-home-why__card--yes">
                  <h3 className="premium-home-why__card-title">
                    {c.yesTitle[0]}
                    <br />
                    {c.yesTitle[1]}
                  </h3>
                  <ul className="premium-home-why__list">
                    {c.yesItems.map((parts, i) => (
                      <li key={`yes-${i}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={c.checkSrc} alt="" width={23} height={23} aria-hidden="true" />
                        <p>
                          <RichLine parts={parts} />
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="premium-home-why__ticker" role="note" aria-label="Notices">
          <div className="premium-home-why__ticker-track">
            {[0, 1].map((copy) => (
              <div
                key={`ticker-copy-${copy}`}
                className="premium-home-why__ticker-set"
                aria-hidden={copy === 1 ? true : undefined}
              >
                {c.ticker.map((line) => (
                  <p key={`${copy}-${line.slice(0, 24)}`}>{line}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
