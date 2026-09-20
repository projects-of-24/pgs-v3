/**
 * About Us — Evolution Timeline — A7.
 * Desktop `17084:12025` · Mobile `517:5786` (same Gantt · horizontal scroll ≤600).
 */
import { ABOUT_TIMELINE } from "./content";
import "./about-timeline.css";

type Chip = {
  text: string;
  emphasis?: "bold" | "black" | "mixed";
  parts?: readonly { text: string; bold?: boolean }[];
};

function TimelineChip({ chip }: { chip: Chip }) {
  if (chip.emphasis === "mixed" && chip.parts) {
    return (
      <span className="about-timeline__chip about-timeline__chip--block">
        {chip.parts.map((part) =>
          part.bold ? (
            <strong key={part.text}>{part.text}</strong>
          ) : (
            <span key={part.text}>{part.text}</span>
          )
        )}
      </span>
    );
  }

  if (chip.text === "@purpleguide IG") {
    return (
      <span className="about-timeline__chip">
        @purpleguide <em>IG</em>
      </span>
    );
  }

  const weightClass =
    chip.emphasis === "black"
      ? " about-timeline__chip--black"
      : chip.emphasis === "bold"
        ? " about-timeline__chip--bold"
        : "";

  const isBlock = chip.text.length > 72;

  return (
    <span
      className={`about-timeline__chip${weightClass}${
        isBlock ? " about-timeline__chip--block" : ""
      }`}
    >
      {chip.text}
    </span>
  );
}

function PhaseTitle({
  phase
}: {
  phase: (typeof ABOUT_TIMELINE.phases)[number];
}) {
  if (phase.titleHtml === "pgs-aka") {
    return (
      <p className="about-timeline__title about-timeline__title--aka">
        <strong>#PGS</strong> aka <strong>Purpleguide.study</strong>
        {phase.tagline ? (
          <span className="about-timeline__tagline">{phase.tagline}</span>
        ) : null}
      </p>
    );
  }

  if (phase.titleLines) {
    return (
      <p className="about-timeline__title">
        {phase.titleLines.map((line) => (
          <span key={line} className="about-timeline__title-line">
            {line}
          </span>
        ))}
      </p>
    );
  }

  const isPgs = phase.title === "#PGS";

  return (
    <p
      className={`about-timeline__title${
        isPgs ? " about-timeline__title--pgs" : ""
      }`}
    >
      {phase.title}
    </p>
  );
}

export function AboutTimeline() {
  const c = ABOUT_TIMELINE;

  return (
    <section
      className="about-timeline"
      data-pgs-module="about-timeline"
      data-block-gate="a7"
      data-figma-desktop="17084:12025"
      data-figma-mobile="517:5786"
      aria-labelledby="about-timeline-title"
    >
      <div className="about-timeline__inner">
        <header className="about-timeline__header">
          <h2 id="about-timeline-title" className="about-timeline__heading">
            {c.title}
          </h2>
          <p className="about-timeline__subtitle">{c.subtitle}</p>
        </header>

        <div
          className="about-timeline__scroll"
          role="region"
          aria-label="Evolution timeline — scroll sideways on small screens to see all years"
          tabIndex={0}
        >
          <div className="about-timeline__board">
            <div className="about-timeline__card">
              <div className="about-timeline__years" aria-hidden="true">
                <span className="about-timeline__year-label">{c.phaseCol}</span>
                {c.years.map((year) =>
                  year === "Present" ? (
                    <span
                      key={year}
                      className="about-timeline__year about-timeline__year--present"
                    >
                      {year}
                    </span>
                  ) : (
                    <span key={year} className="about-timeline__year">
                      {year}
                    </span>
                  )
                )}
              </div>

              <ol className="about-timeline__rows">
                {c.phases.map((phase) => (
                  <li
                    key={`${phase.phase}-${phase.year}-${phase.title}`}
                    className="about-timeline__row"
                    data-year={phase.year}
                  >
                    <div className="about-timeline__meta">
                      <p className="about-timeline__phase">{phase.phase}</p>
                      <PhaseTitle phase={phase} />
                    </div>

                    <div className="about-timeline__chips">
                      {phase.chips.map((chip) => (
                        <TimelineChip key={chip.text} chip={chip as Chip} />
                      ))}
                      {phase.liveBadge ? (
                        <p className="about-timeline__live" role="status">
                          {phase.liveBadge}
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <footer className="about-timeline__foot">
              {c.footers.map((line) => (
                <p key={line} className="about-timeline__foot-line">
                  {line}
                </p>
              ))}
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
