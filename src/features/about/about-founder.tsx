/**
 * About Us — Meet The Founder — A8.
 * Desktop `17057:14045` · Mobile `517:5787`.
 */
import { ABOUT_FOUNDER } from "./content";
import "./about-founder.css";

export function AboutFounder() {
  const c = ABOUT_FOUNDER;

  return (
    <section
      className="about-founder"
      data-pgs-module="about-founder"
      data-block-gate="a8"
      data-figma-desktop="17057:14045"
      data-figma-mobile="517:5787"
      aria-labelledby="about-founder-title"
    >
      <div className="about-founder__inner">
        <h2 id="about-founder-title" className="about-founder__heading">
          {c.headingLead}
          <em>{c.headingEm}</em>
        </h2>

        <div className="about-founder__profile">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="about-founder__photo"
            src={c.imageSrc}
            alt={c.imageAlt}
            width={312}
            height={312}
          />
          <p className="about-founder__name">{c.name}</p>
          <p className="about-founder__role">{c.title}</p>
          <div className="about-founder__connect">
            <p className="about-founder__connect-label">{c.connectLabel}</p>
            <a className="about-founder__email" href={`mailto:${c.email}`}>
              {c.email}
            </a>
          </div>
        </div>

        <div className="about-founder__bio">
          {c.bio.map((para) => (
            <p key={para.slice(0, 48)}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
