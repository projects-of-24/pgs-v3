/**
 * Courses template — C12 A word from Our learners.
 * Reuses shared LearnerWords (same Figma family as premium-home H6).
 * Desk `17072:11795` · Mob `551:10710`.
 */
import { LearnerWords } from "../shared/learner-words/learner-words";
import "./programs-courses-learners.css";

export function ProgramsCoursesLearners() {
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
      <LearnerWords />
    </section>
  );
}
