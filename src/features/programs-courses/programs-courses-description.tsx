/**
 * Courses template — C2 Who's It For? + Topics (green chips).
 * Desk `17072:10641` · Mob `551:9071` (same Figma band family, stacked).
 * Next mob band after this = Program Description card `551:10175` (not C2).
 * Owned CSS. Fixtures only. iPad 601–1366 deferred.
 */
import type { ProgramsCoursesDescColumn } from "./content";
import type { ProgramsCoursesDescriptionData } from "./courses-template-view";
import "./programs-courses-description.css";

type ProgramsCoursesDescriptionProps = {
  data: ProgramsCoursesDescriptionData;
};

export function ProgramsCoursesDescription({
  data: { desk, mob }
}: ProgramsCoursesDescriptionProps) {
  return (
    <section
      id="pc-c2"
      className="pc-desc"
      data-block-gate="c2"
      data-figma-desktop="17072:10641"
      data-figma-mobile="551:9071"
      aria-label="Who is this program for"
    >
      <div className="pc-desc__band pc-desc__band--desk">
        <div className="pc-desc__inner">
          <DescColumn title={desk.left.title} bodies={desk.left.bodies} />
          <DescColumn title={desk.right.title} bodies={desk.right.bodies} />
        </div>
      </div>
      <div className="pc-desc__band pc-desc__band--mob">
        <div className="pc-desc__inner">
          <DescColumn title={mob.left.title} bodies={mob.left.bodies} />
          <DescColumn title={mob.right.title} bodies={mob.right.bodies} />
        </div>
      </div>
    </section>
  );
}

function DescColumn({ title, bodies }: ProgramsCoursesDescColumn) {
  return (
    <div className="pc-desc__col">
      <h2 className="pc-desc__chip pc-desc__chip--title">{title}</h2>
      <div className="pc-desc__bodies">
        {bodies.map((text) => (
          <p key={text.slice(0, 48)} className="pc-desc__chip pc-desc__chip--body">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}
