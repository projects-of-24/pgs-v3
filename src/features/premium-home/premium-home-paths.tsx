/**
 * purplePREMIUM HOME path chooser — H3.
 * Desktop `17052:8172` · Mobile `366:4255`.
 * Owned CSS + Figma assets only. Pathway links are real routes.
 */
import Link from "next/link";
import { PREMIUM_HOME_PATHS } from "./content";
import "./premium-home-paths.css";

export function PremiumHomePaths() {
  const c = PREMIUM_HOME_PATHS;

  return (
    <section
      className="premium-home-paths"
      data-pgs-module="premium-home-paths"
      data-block-gate="h3"
      aria-labelledby="premium-home-paths-title"
    >
      <div className="premium-home-paths__inner">
        <h2 id="premium-home-paths-title" className="premium-home-paths__title">
          <span className="premium-home-paths__title-line">{c.titleLine1}</span>
          <span className="premium-home-paths__title-line">{c.titleLine2}</span>
        </h2>

        <div className="premium-home-paths__row">
          <div className="premium-home-paths__photo-card" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="premium-home-paths__photo"
              src={c.photoSrc}
              alt=""
              width={247}
              height={441}
            />
            <div className="premium-home-paths__focus" aria-hidden="true">
              {(
                [
                  ["tl", c.focusCornersDesk.tl, c.focusCornersMob.tl, 48, 30] as const,
                  ["tr", c.focusCornersDesk.tr, c.focusCornersMob.tr, 48, 30] as const,
                  ["br", c.focusCornersDesk.br, c.focusCornersMob.br, 48, 30] as const,
                  ["bl", c.focusCornersDesk.bl, c.focusCornersMob.bl, 48, 30] as const
                ] as const
              ).map(([corner, deskSrc, mobSrc, deskSize, mobSize]) => (
                <span key={corner} className="premium-home-paths__focus-pair">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={`premium-home-paths__focus-corner premium-home-paths__focus-corner--${corner} premium-home-paths__focus-corner--desk`}
                    src={deskSrc}
                    alt=""
                    width={deskSize}
                    height={deskSize}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={`premium-home-paths__focus-corner premium-home-paths__focus-corner--${corner} premium-home-paths__focus-corner--mob`}
                    src={mobSrc}
                    alt=""
                    width={mobSize}
                    height={mobSize}
                  />
                </span>
              ))}
              <span className="premium-home-paths__start">{c.startLabel}</span>
            </div>
          </div>

          <ul className="premium-home-paths__list">
            {c.paths.map((path) => (
              <li key={path.id} className="premium-home-paths__item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="premium-home-paths__hash"
                  src={c.hashSrc}
                  alt=""
                  width={14}
                  height={19}
                  aria-hidden="true"
                />
                <Link
                  href={path.href}
                  className={
                    "labelLines" in path
                      ? "premium-home-paths__link premium-home-paths__link--tall"
                      : "premium-home-paths__link"
                  }
                >
                  {"label" in path ? (
                    path.label
                  ) : (
                    <>
                      <span className="premium-home-paths__link-line">
                        {path.labelLines[0]}
                      </span>
                      <span className="premium-home-paths__link-line">
                        {path.labelLines[1]}
                      </span>
                    </>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
