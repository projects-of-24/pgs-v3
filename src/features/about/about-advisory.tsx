/**
 * About Us — our advisory team — A9.
 * Desktop `17057:14056` · Mobile `517:5803`.
 */
import { ABOUT_ADVISORY } from "./content";
import "./about-advisory.css";

export function AboutAdvisory() {
  const c = ABOUT_ADVISORY;

  return (
    <section
      className="about-advisory"
      data-pgs-module="about-advisory"
      data-block-gate="a9"
      data-figma-desktop="17057:14056"
      data-figma-mobile="517:5803"
      aria-labelledby="about-advisory-title"
    >
      <div className="about-advisory__inner">
        <h2 id="about-advisory-title" className="about-advisory__title">
          {c.title}
        </h2>

        <ul className="about-advisory__grid">
          {c.members.map((member, index) => (
            <li
              key={`${member.name}-${index}`}
              className="about-advisory__card"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="about-advisory__tab"
                src={c.tabSrc}
                alt=""
                width={134}
                height={34}
                aria-hidden="true"
              />
              <div className="about-advisory__body">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="about-advisory__photo"
                  src={member.imageSrc}
                  alt={member.name}
                  width={250}
                  height={250}
                />
                <div className="about-advisory__copy">
                  <p className="about-advisory__name">{member.name}</p>
                  <p className="about-advisory__role">{member.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
