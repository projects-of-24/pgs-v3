/**
 * Purple Medical Figma iPad lab — B1 hero + mauve card.
 * Figma: pKzGmxz05A72dRJFkJT0d2 · 1352:8063 (#premiumUSMLE ipad body refernce)
 * Gates: Figma type first → min 15px · 85% rail · iPad type = desktop type.
 */
import "./purplemedical-figma-shell.css";

const HERO_IMG = "/assets/img/purplemedical-figma/hero-card.png";

export function PurplemedicalFigmaShell() {
  return (
    <div
      className="purplemedical-figma"
      data-pgs-module="purplemedical-figma"
      data-figma-file="pKzGmxz05A72dRJFkJT0d2"
      data-figma-node="1352:8063"
      data-block-gate="b1"
      data-lab="preview-only"
      data-skill="pgs-ipad-paper-pass"
    >
      <div className="purplemedical-figma__rail">
        <div className="purplemedical-figma__stage" data-figma-stage="1352:8063">
          {/* Figma 1352:8068 hero headline · x425 y99 · w151 */}
          <section
            className="pmfig-hero"
            data-figma-node="1352:8068"
            aria-labelledby="pmfig-hero-title"
          >
            <div className="pmfig-hero__copy" data-figma-node="1352:8069">
              <h1 id="pmfig-hero-title" className="pmfig-hero__title">
                Get Into Your Dream University
                <br />
                Abroad with a Structured Workflow
              </h1>
              <div className="pmfig-hero__leads" data-figma-node="1352:8071">
                <p className="pmfig-hero__lead">
                  Boost Your Chances of Selection 3X with Smart, Informed
                  University Picks
                </p>
                <p className="pmfig-hero__sub">
                  For Medical, STEM, and More—We’ve Got You Covered
                </p>
              </div>
            </div>
            <div className="pmfig-hero__cta-wrap" data-figma-node="1352:8074">
              <button type="button" className="pmfig-hero__cta">
                Set Up a Quick Call
              </button>
              <p className="pmfig-hero__hint">
                Clear All Your Doubts in 30 Minutes—Get Your Admission Workflow
                Sorted.
              </p>
            </div>
          </section>

          {/* Figma 1352:8078 · x355 y580 · w290 — mauve card + trust */}
          <section className="pmfig-card" data-figma-node="1352:8078">
            <div className="pmfig-card__panel" data-figma-node="1352:8080">
              <div className="pmfig-card__media" data-figma-node="1352:8081">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="pmfig-card__img"
                  src={HERO_IMG}
                  alt="Student with headphones at a cafe counter"
                  width={650}
                  height={982}
                />
              </div>
              <div className="pmfig-card__brand" data-figma-node="1352:8085">
                <p className="pmfig-card__bebas">Step into</p>
                <p className="pmfig-card__bebas">#purplepremium</p>
                <p className="pmfig-card__tag">For #USMLE</p>
              </div>
            </div>
            <p className="pmfig-card__trust">
              Backed by experience. Trusted by students since 2006 (formerly
              CEG).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
