/**
 * Error 404 body — desk `18153:10870` · mob `1285:7640`.
 * Gates: desk (>1366) · mob (≤600). iPad 601–1366 deferred.
 */
import Link from "next/link";
import { error404Content } from "./content";
import "./error-404-body.css";

export function Error404Body() {
  const c = error404Content;

  return (
    <section
      className="error-404-body"
      data-pgs-block="error-404-body"
      data-figma-desktop="18153:10870"
      data-figma-mobile="1285:7640"
      data-block-gate="desk+mob"
      data-visual-lock="locked"
      aria-labelledby="error-404-heading"
    >
      <div className="error-404-body__stage">
        <div className="error-404-body__composition">
          <p className="error-404-body__bg-404" aria-hidden="true">
            404
          </p>

          <div className="error-404-body__dino" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="error-404-body__dino-img"
              src={c.dinoSrc}
              alt={c.dinoAlt}
              width={294}
              height={300}
              decoding="async"
            />
          </div>

          <div className="error-404-body__copy">
            <h1 id="error-404-heading" className="error-404-body__heading">
              {c.heading}
            </h1>
            <p className="error-404-body__line">{c.lineBroken}</p>
            <p className="error-404-body__line">{c.lineMissing}</p>
            <p className="error-404-body__cta">
              <span aria-hidden="true">[</span>
              <Link className="error-404-body__home" href={c.homeHref}>
                {c.homeCta}
              </Link>
              <span aria-hidden="true">]</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
