/**
 * CV Ready Program hero — CR1 (title + intro).
 * Desk title `17046:10482` · body `17046:10451`.
 * Mob `331:8268` (title + body stack).
 * No face cards in this gate.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: mob body 14px
 * ISSUE: below PGS type floor
 * PGS IMPLEMENTATION: mob ≥16px; layout/width stay Figma
 */
import { CVREADY_PROGRAM_HERO } from "./content";
import "./cvready-program-hero.css";

export function CvreadyProgramHero() {
  const c = CVREADY_PROGRAM_HERO;

  return (
    <section
      className="cvready-program-hero"
      data-pgs-module="cvready-program-hero"
      data-block-gate="cr1"
      data-figma-desktop="17046:10482"
      data-figma-mobile="331:8268"
      aria-labelledby="cvready-program-hero-title"
    >
      <h1 id="cvready-program-hero-title" className="cvready-program-hero__title">
        {c.title}
      </h1>
      <p className="cvready-program-hero__body">{c.body}</p>
    </section>
  );
}
