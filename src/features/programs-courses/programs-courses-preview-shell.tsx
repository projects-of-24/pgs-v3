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
import { PROGRAMS_COURSES_FIXTURE } from "./content";
import type { ProgramsCoursesFixture } from "./content";
import { buildProgramsCoursesView } from "./courses-template-view";
import "./programs-courses-preview-shell.css";

type ProgramsCoursesPreviewShellProps = {
  live?: boolean;
  /** Defaults to the lab fixture. Later gates pass catalog row + body. */
  course?: ProgramsCoursesFixture;
  /**
   * Ops CMS flat preview: hide sections with no mapped content and skip shared
   * C10/C12/FAQ blocks so fixture copy does not look like this course.
   */
  cmsFlatPreview?: boolean;
  /**
   * COURSE2d: hide body sections that have no saved content, but keep the shared
   * C10/C12/FAQ blocks (used when a saved detail body is rendered).
   */
  hideEmptySections?: boolean;
};

export function ProgramsCoursesPreviewShell({
  live = false,
  course = PROGRAMS_COURSES_FIXTURE,
  cmsFlatPreview = false,
  hideEmptySections = false
}: ProgramsCoursesPreviewShellProps) {
  const view = buildProgramsCoursesView(course);
  const hideEmpty = cmsFlatPreview || hideEmptySections;
  const showDescription =
    !hideEmpty ||
    view.description.desk.left.bodies.length > 0 ||
    view.description.desk.right.bodies.length > 0;
  const showProgramDescription =
    !hideEmpty || Boolean(view.programDescription.body.trim());
  const showHighlights = !hideEmpty || view.highlights.items.length > 0;
  const showChecks = !hideEmpty || view.checks.desk.items.length > 0;
  // Title alone is enough to show the plate (CTA disabled until a brochure PDF URL exists — lab parity).
  const showBrochure =
    !hideEmpty ||
    Boolean(view.brochure.downloadUrl.trim()) ||
    Boolean(view.brochure.title.trim());
  const showAwarding =
    !hideEmpty ||
    Boolean(view.awarding.body.trim()) ||
    view.awarding.facts.length > 0;
  const showApply =
    !hideEmpty ||
    view.apply.eligibilityChips.length > 0 ||
    view.apply.option1Steps.length > 0;
  const showCertificate =
    !hideEmpty || Boolean(view.certificate.headline.trim());
  const showEnroll =
    !hideEmpty ||
    Boolean(view.enroll.price.trim()) ||
    view.enroll.breakdownLeft.length > 0;
  const showHiglights =
    !cmsFlatPreview &&
    (!hideEmpty ||
      Boolean(view.higlights.title.trim()) ||
      view.higlights.photos.some((photo) => photo.src.trim()) ||
      Boolean(view.higlights.note.trim()));
  const showLearners =
    !cmsFlatPreview &&
    (!hideEmpty ||
      view.learners.cards.some((card) => card.quoteDesk.trim()) ||
      Boolean(view.learners.bio.name.trim()) ||
      Boolean(view.learners.photoSrc.trim()));
  const showFaq =
    !cmsFlatPreview &&
    (!hideEmpty ||
      view.faq.tabs.some((tab) => tab.items.length > 0) ||
      Boolean(view.faq.heading.trim()));

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
      data-cms-flat-preview={cmsFlatPreview ? "true" : undefined}
    >
      <div className="programs-courses-preview-shell__body">
        <div
          className="programs-courses-preview-shell__univ-gap"
          aria-hidden="true"
        />
        <ProgramsCoursesHero data={view.hero} />
        {showDescription ? <ProgramsCoursesDescription data={view.description} /> : null}
        {showProgramDescription ? (
          <ProgramsCoursesProgramDescription data={view.programDescription} />
        ) : null}
        {showHighlights ? <ProgramsCoursesHighlights data={view.highlights} /> : null}
        {showChecks ? <ProgramsCoursesChecks data={view.checks} /> : null}
        {showBrochure ? <ProgramsCoursesBrochure data={view.brochure} /> : null}
        {showAwarding ? <ProgramsCoursesAwarding data={view.awarding} /> : null}
        {showApply ? <ProgramsCoursesApply data={view.apply} /> : null}
        {showCertificate ? <ProgramsCoursesCertificate data={view.certificate} /> : null}
        {showHiglights ? <ProgramsCoursesHiglights data={view.higlights} /> : null}
        {showEnroll ? <ProgramsCoursesEnroll data={view.enroll} /> : null}
        {showLearners ? <ProgramsCoursesLearners data={view.learners} /> : null}
        {showFaq ? <ProgramsCoursesFaq data={view.faq} /> : null}
      </div>
    </div>
  );
}
