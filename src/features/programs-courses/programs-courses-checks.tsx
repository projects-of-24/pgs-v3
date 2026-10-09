/**
 * Courses template — C5 green chip + check list.
 * Desk `17072:10893` · Mob `551:9103` (different check copy).
 * Owned CSS. Fixtures only. iPad 601–1366 deferred.
 */
import type { ProgramsCoursesChecksData } from "./courses-template-view";
import "./programs-courses-checks.css";

type ProgramsCoursesChecksProps = {
  data: ProgramsCoursesChecksData;
};

export function ProgramsCoursesChecks({
  data: { desk, mob }
}: ProgramsCoursesChecksProps) {
  return (
    <section
      id="pc-c5"
      className="pc-checks"
      data-block-gate="c5"
      data-figma-desktop="17072:10893"
      data-figma-mobile="551:9103"
      aria-label="Program extras"
    >
      <div className="pc-checks__band pc-checks__band--desk">
        <ChecksBlock chip={desk.chip} items={desk.items} icon={desk.icon} />
      </div>
      <div className="pc-checks__band pc-checks__band--mob">
        <ChecksBlock chip={mob.chip} items={mob.items} icon={mob.icon} />
      </div>
    </section>
  );
}

function ChecksBlock({
  chip,
  items,
  icon
}: {
  chip: string;
  items: string[];
  icon: string;
}) {
  return (
    <div className="pc-checks__inner">
      <p className="pc-checks__chip">{chip}</p>
      <ul className="pc-checks__list">
        {items.map((label) => (
          <li key={label} className="pc-checks__item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="pc-checks__icon"
              src={icon}
              alt=""
              width={24}
              height={24}
              decoding="async"
            />
            <span className="pc-checks__label">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
