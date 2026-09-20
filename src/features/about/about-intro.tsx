/**
 * About Us intro — A2 (desktop).
 * Figma `17057:13540`. Mobile opening already lives in A1 hero.
 */
import { ABOUT_INTRO } from "./content";
import "./about-intro.css";

export function AboutIntro() {
  const c = ABOUT_INTRO;

  return (
    <section
      className="about-intro"
      data-pgs-module="about-intro"
      data-block-gate="a2"
      aria-label="About PurpleGuide.study"
    >
      <p className="about-intro__text">
        <span className="about-intro__lead">{c.lead}</span>
        <span className="about-intro__emphasis">{c.emphasis}</span>
      </p>
    </section>
  );
}
