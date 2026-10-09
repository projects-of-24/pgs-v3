/**
 * Courses template — C12 A word from Our learners.
 * Reuses shared LearnerWords (same Figma family as premium-home H6).
 * Desk `17072:11795` · Mob `551:10710`.
 * COURSE2d-D4a: prop-driven from course.learners.
 */
import { LearnerWords } from "../shared/learner-words/learner-words";
import type { CoursesLearnersBody } from "./courses-cms-shared-defaults";
import "./programs-courses-learners.css";

type ProgramsCoursesLearnersProps = {
  data: CoursesLearnersBody;
};

export function ProgramsCoursesLearners({ data }: ProgramsCoursesLearnersProps) {
  return (
    <section
      id="pc-c12"
      className="pc-learners"
      data-pgs-module="programs-courses-learners"
      data-block-gate="c12"
      data-figma-desktop="17072:11795"
      data-figma-mobile="551:10710"
      aria-label="Learner testimonials"
    >
      <LearnerWords data={data} />
    </section>
  );
}
