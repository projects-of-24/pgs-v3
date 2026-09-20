/**
 * About Us — USP strip — A5.
 * Desktop `17057:13777` + badge `17057:13783` · Mobile `511:5549`.
 * Yellow subway arrows visual-only.
 */
import { ABOUT_USP } from "./content";
import "./about-usp.css";

function SubwayArrows({ size }: { size: number }) {
  const c = ABOUT_USP;
  return (
    <div className="about-usp__arrows" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="about-usp__arrow"
        src={c.arrowSrc}
        alt=""
        width={size}
        height={size}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="about-usp__arrow"
        src={c.arrowSrc}
        alt=""
        width={size}
        height={size}
      />
    </div>
  );
}

export function AboutUsp() {
  const c = ABOUT_USP;

  return (
    <section
      className="about-usp"
      data-pgs-module="about-usp"
      data-block-gate="a5"
      aria-labelledby="about-usp-badge"
    >
      <div className="about-usp__inner">
        <p id="about-usp-badge" className="about-usp__badge">
          {c.badge}
        </p>
        <div className="about-usp__panel">
          <SubwayArrows size={36} />
          <p className="about-usp__copy">{c.copy}</p>
          <div className="about-usp__arrows-desk">
            <SubwayArrows size={59} />
          </div>
        </div>
      </div>
    </section>
  );
}
