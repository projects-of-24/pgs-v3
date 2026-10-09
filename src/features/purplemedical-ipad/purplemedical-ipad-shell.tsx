/**
 * Purple Medical non yolo — Paper-first iPad body.
 * Source: Paper 01M40FPTTH8E6PZV2GBA8QSD3C · 2VH-0 (#premiumUSMLE ipad body refernce)
 * Skill: pgs-ipad-paper-pass. NOT desk/phone Figma modules.
 */
import "./purplemedical-ipad-shell.css";

const HERO_IMG = "/assets/img/premium-usmle/hero.png";
const POSTER_IMG = "/assets/img/premium-usmle/track-poster.png";

export type PurplemedicalIpadSource = "paper" | "figma";

type Props = {
  source?: PurplemedicalIpadSource;
};

export function PurplemedicalIpadShell({ source = "paper" }: Props) {
  return (
    <div
      className="purplemedical-ipad"
      data-pgs-module="purplemedical-ipad"
      data-ipad-source={source}
      data-paper-ref="01M40FPTTH8E6PZV2GBA8QSD3C/2VH-0"
      data-lab="purple-medical-non-yolo"
      data-live="untouched"
      data-skill="pgs-ipad-paper-pass"
    >
      {/*
        Paper artboard = 1000px wide. Stage uses --pmipad-u so every top/width
        is Paper px × (rail / 1000). Positions from get_computed_styles / get_jsx.
      */}
      <div className="purplemedical-ipad__rail">
        <div className="purplemedical-ipad__stage" data-paper-stage="2VH-0">
          {/* Paper 2VK-0 hero headline · top 271 · w 331 */}
          <section
            className="pmipad-hero"
            data-paper-node="2VK-0"
            aria-labelledby="pmipad-hero-title"
          >
            <div className="pmipad-hero__copy">
              <h1 id="pmipad-hero-title" className="pmipad-hero__title">
                Get Into Your Dream University
                <br />
                Abroad with a Structured Workflow
              </h1>
              <div className="pmipad-hero__leads">
                <p className="pmipad-hero__lead">
                  Boost Your Chances of Selection 3X with Smart, Informed
                  University Picks
                </p>
                <p className="pmipad-hero__sub">
                  For Medical, STEM, and More—We’ve Got You Covered
                </p>
              </div>
            </div>
            <div className="pmipad-hero__cta-wrap">
              <button type="button" className="pmipad-hero__cta">
                Set Up a Quick Call
              </button>
              <p className="pmipad-hero__hint">
                Clear All Your Doubts in 30 Minutes—Get Your Admission Workflow
                Sorted.
              </p>
            </div>
          </section>

          {/* Paper 2VU-0 · top 580 · w 290 — mauve card + trust */}
          <section className="pmipad-card" data-paper-node="2VU-0">
            <div className="pmipad-card__panel" data-paper-node="2VW-0">
              <div className="pmipad-card__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="pmipad-card__img"
                  src={HERO_IMG}
                  alt="Student with headphones at a cafe counter"
                  width={650}
                  height={982}
                />
              </div>
              <div className="pmipad-card__brand">
                <p className="pmipad-card__bebas">Step into</p>
                <p className="pmipad-card__bebas">#purplepremium</p>
                <p className="pmipad-card__tag">For #USMLE</p>
              </div>
            </div>
            <p className="pmipad-card__trust">
              Backed by experience. Trusted by students since 2006 (formerly
              CEG).
            </p>
          </section>

          {/* Paper 2W8-0 · top 1112 · w 700 */}
          <section
            className="pmipad-why"
            data-paper-node="2W8-0"
            aria-labelledby="pmipad-why-title"
          >
            <h2 id="pmipad-why-title" className="pmipad-why__title">
              Why We Built #PurplePremium
              <br />
              (And Why It Matters)
            </h2>
            <div className="pmipad-why__body">
              <p className="pmipad-why__kicker">
                The high-stakes medical pathways:
              </p>
              <p className="pmipad-why__story">
                Is Studying Medicine Abroad Worth It? 100% If You Do It Right.
                Many journey usually starts with a story. You see a
                medico-influencer cracking USMLE, PLAB, or AMC. Or someone
                confidently chasing nursing or allied health abroad. Maybe it’s
                a senior from your college who’s now respected for their
                international degree. You get inspired. So you start watching
                videos. Asking around. Dreaming big.
              </p>
              <p className="pmipad-why__outside">Looks great from the outside.</p>
              <p className="pmipad-why__warn">
                But here’s the part no one warns you about— Many can lose years
                figuring it out the wrong way. One misstep, one rushed choice or
                poorly researched decision, endless job applications, not
                building your CV enough to stand out, remember you are competing
                from people all over the world for limited number of positions
                available... and suddenly you&apos;re stuck. No offer. No
                progress. Just time you’ll never get back.
              </p>
            </div>
          </section>

          {/* Paper 2WF-0 · top 1480 · w 300 */}
          <section
            className="pmipad-comes"
            data-paper-node="2WF-0"
            aria-labelledby="pmipad-comes-title"
          >
            <h2 id="pmipad-comes-title" className="pmipad-comes__title">
              This is where #purplePremium comes in.
            </h2>
            <p className="pmipad-comes__lead">
              Because not every journey needs the same map. Explore them below.
            </p>
          </section>

          {/* Paper 2WI-0 · top 1588 — video + chip */}
          <section className="pmipad-video" data-paper-node="2WI-0">
            <div className="pmipad-video__poster">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={POSTER_IMG}
                alt=""
                className="pmipad-video__img"
                width={252}
                height={345}
              />
              <button
                type="button"
                className="pmipad-video__play"
                aria-label="Play join #purplePremium"
              >
                <span className="pmipad-video__play-icon" aria-hidden="true" />
              </button>
            </div>
            <div className="pmipad-video__chip-row">
              <span className="pmipad-video__arrow" aria-hidden="true">
                →
              </span>
              <p className="pmipad-video__chip">
                A dedicated track built just for USMLE applicants.
              </p>
            </div>
          </section>

          <p className="pmipad-more" data-paper-status="partial">
            Paper blocks above · next: path → pathway → USMLE deep dive → …
          </p>
        </div>
      </div>
    </div>
  );
}
