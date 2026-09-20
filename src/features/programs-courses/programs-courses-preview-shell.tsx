/**
 * Courses template preview shell — C0+ body.
 * Template id: `courses`. Desk `17071:15293` · Mob `551:9015`.
 * Lab: `/preview/programs-courses`. Chrome locked.
 * NEVER add a black side-test banner.
 */
import { ProgramsCoursesApply } from "./programs-courses-apply";
import { ProgramsCoursesAwarding } from "./programs-courses-awarding";
import { ProgramsCoursesBrochure } from "./programs-courses-brochure";
import { ProgramsCoursesCertificate } from "./programs-courses-certificate";
import { ProgramsCoursesChecks } from "./programs-courses-checks";
import { ProgramsCoursesDescription } from "./programs-courses-description";
import { ProgramsCoursesEnroll } from "./programs-courses-enroll";
import { ProgramsCoursesHero } from "./programs-courses-hero";
import { ProgramsCoursesHighlights } from "./programs-courses-highlights";
import { ProgramsCoursesHiglights } from "./programs-courses-higlights";
import { ProgramsCoursesFaq } from "./programs-courses-faq";
import { ProgramsCoursesLearners } from "./programs-courses-learners";
import { ProgramsCoursesProgramDescription } from "./programs-courses-program-description";
import "./programs-courses-preview-shell.css";

type ProgramsCoursesPreviewShellProps = {
  live?: boolean;
};

export function ProgramsCoursesPreviewShell({
  live = false
}: ProgramsCoursesPreviewShellProps) {
  return (
    <div
      className="programs-courses-preview-shell"
      data-pgs-module="programs-courses-preview"
      data-detail-template="courses"
      data-figma-desktop="17071:15293"
      data-figma-mobile="551:9015"
      data-shell-gate="c0"
      data-block-gate="c1-c13"
      data-cutover={live ? "LIVE" : "preview"}
    >
      <div className="programs-courses-preview-shell__body">
        <div
          className="programs-courses-preview-shell__univ-gap"
          aria-hidden="true"
        />
        <ProgramsCoursesHero />
        <ProgramsCoursesDescription />
        <ProgramsCoursesProgramDescription />
        <ProgramsCoursesHighlights />
        <ProgramsCoursesChecks />
        <ProgramsCoursesBrochure />
        <ProgramsCoursesAwarding />
        <ProgramsCoursesApply />
        <ProgramsCoursesCertificate />
        <ProgramsCoursesHiglights />
        <ProgramsCoursesEnroll />
        <ProgramsCoursesLearners />
        <ProgramsCoursesFaq />
      </div>
    </div>
  );
}
