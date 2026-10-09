/**
 * Courses template — view model builder.
 * COURSE2a: fixture path only. Later gates add catalog row + body input.
 * Sections receive slices; they never import the fixture.
 */
import { PROGRAMS_COURSES_FIXTURE } from "./content";
import type { ProgramsCoursesFixture } from "./content";

export type ProgramsCoursesHeroData = Omit<
  ProgramsCoursesFixture,
  | "description"
  | "descriptionMobile"
  | "programDescription"
  | "highlights"
  | "checks"
  | "checksMobile"
  | "brochure"
  | "awarding"
  | "apply"
  | "certificate"
  | "higlights"
  | "enroll"
  | "learners"
  | "faq"
>;

export type ProgramsCoursesDescriptionData = {
  desk: ProgramsCoursesFixture["description"];
  mob: ProgramsCoursesFixture["description"];
};

export type ProgramsCoursesChecksData = {
  desk: ProgramsCoursesFixture["checks"];
  mob: ProgramsCoursesFixture["checks"];
};

export type ProgramsCoursesView = {
  hero: ProgramsCoursesHeroData;
  description: ProgramsCoursesDescriptionData;
  programDescription: ProgramsCoursesFixture["programDescription"];
  highlights: ProgramsCoursesFixture["highlights"];
  checks: ProgramsCoursesChecksData;
  brochure: ProgramsCoursesFixture["brochure"];
  awarding: ProgramsCoursesFixture["awarding"];
  apply: ProgramsCoursesFixture["apply"];
  certificate: ProgramsCoursesFixture["certificate"];
  higlights: ProgramsCoursesFixture["higlights"];
  enroll: ProgramsCoursesFixture["enroll"];
  learners: ProgramsCoursesFixture["learners"];
  faq: ProgramsCoursesFixture["faq"];
};

export function buildProgramsCoursesView(
  fixture: ProgramsCoursesFixture = PROGRAMS_COURSES_FIXTURE
): ProgramsCoursesView {
  const {
    description,
    descriptionMobile,
    programDescription,
    highlights,
    checks,
    checksMobile,
    brochure,
    awarding,
    apply,
    certificate,
    higlights,
    enroll,
    learners,
    faq,
    ...hero
  } = fixture;

  return {
    hero,
    description: { desk: description, mob: descriptionMobile ?? description },
    programDescription,
    highlights,
    checks: { desk: checks, mob: checksMobile ?? checks },
    brochure,
    awarding,
    apply,
    certificate,
    higlights,
    enroll,
    learners,
    faq
  };
}
