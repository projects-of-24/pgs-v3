/**
 * About Us — Why 98% stat row — A3.
 * Desktop `17057:13585` · Mobile `508:7678`.
 */
import { ABOUT_WHY } from "./content";
import "./about-why.css";

export function AboutWhy() {
  const c = ABOUT_WHY;

  return (
    <section
      className="about-why"
      data-pgs-module="about-why"
      data-block-gate="a3"
      aria-labelledby="about-why-title"
    >
      <div className="about-why__inner">
        <h2 id="about-why-title" className="about-why__title">
          {c.title}
        </h2>
        <ul className="about-why__grid">
          {c.stats.map((stat) => (
            <li key={stat.num} className="about-why__card">
              <div className="about-why__card-top">
                <div className="about-why__icon" aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="about-why__icon-bg"
                    src={c.iconSrc}
                    alt=""
                    width={48}
                    height={48}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="about-why__icon-inner"
                    src={c.iconInnerSrc}
                    alt=""
                    width={18}
                    height={20}
                  />
                </div>
                <p className="about-why__num">{stat.num}</p>
              </div>
              <div className="about-why__label">
                {stat.lines.map((line, i) => (
                  <p key={`${stat.num}-${i}`} className="about-why__label-line">
                    {line}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
