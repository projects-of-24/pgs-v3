/**
 * purplePREMIUM HOME aim / stats + roadmap — H4.
 * Desktop `17052:8216` · Mobile `366:4321`.
 * Owned CSS only. No Hostinger markup.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: mobile stat labels 14px · roadmap mono 14px
 * ISSUE: below --pgs-type-floor 16px
 * PGS IMPLEMENTATION: labels + roadmap use max(16px, Figma size). Look unchanged.
 */
import { PREMIUM_HOME_AIM } from "./content";
import "./premium-home-aim.css";

export function PremiumHomeAim() {
  const c = PREMIUM_HOME_AIM;

  return (
    <section
      className="premium-home-aim"
      data-pgs-module="premium-home-aim"
      data-block-gate="h4"
      data-figma-desktop="17052:8216"
      data-figma-mobile="366:4321"
      aria-labelledby="premium-home-aim-title"
    >
      <div className="premium-home-aim__inner">
        <div className="premium-home-aim__copy">
          <h2 id="premium-home-aim-title" className="premium-home-aim__title">
            <span className="premium-home-aim__title-line">{c.titleLine1}</span>
            <span className="premium-home-aim__title-line">{c.titleLine2}</span>
          </h2>

          <ul className="premium-home-aim__stats">
            {c.stats.map((stat) => (
              <li key={stat.label} className="premium-home-aim__stat">
                <span className="premium-home-aim__stat-value">{stat.value}</span>
                <span className="premium-home-aim__stat-label">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="premium-home-aim__card">
          <p className="premium-home-aim__brand">
            <span className="premium-home-aim__brand-tag">{c.brandTag}</span>
            <span className="premium-home-aim__brand-sub">{c.brandSub}</span>
          </p>
          <p className="premium-home-aim__roadmap">
            <span className="premium-home-aim__roadmap-line">{c.roadmapLine1}</span>{" "}
            <span className="premium-home-aim__roadmap-line">{c.roadmapLine2}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
