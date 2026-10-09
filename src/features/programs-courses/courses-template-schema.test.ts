import { describe, expect, it } from "vitest";
import { PROGRAMS_COURSES_FIXTURE } from "./content";
import { CoursesTemplateBodyV1 } from "./courses-template-schema";
import { buildProgramsCoursesView } from "./courses-template-view";

const validBody = () => ({ schemaVersion: 1 as const, ...PROGRAMS_COURSES_FIXTURE });

describe("CoursesTemplateBodyV1", () => {
  it("accepts the lab fixture", () => {
    expect(CoursesTemplateBodyV1.safeParse(validBody()).success).toBe(true);
  });

  it("rejects unknown keys at root and nested", () => {
    expect(
      CoursesTemplateBodyV1.safeParse({ ...validBody(), extra: 1 }).success
    ).toBe(false);
    const nested = validBody();
    (nested.enroll as Record<string, unknown>).surprise = true;
    expect(CoursesTemplateBodyV1.safeParse(nested).success).toBe(false);
  });

  it("rejects wrong schemaVersion, missing sections, and bad shapes", () => {
    expect(
      CoursesTemplateBodyV1.safeParse({ ...validBody(), schemaVersion: 2 }).success
    ).toBe(false);
    const missing: Record<string, unknown> = validBody();
    delete missing.enroll;
    expect(CoursesTemplateBodyV1.safeParse(missing).success).toBe(false);
    expect(
      CoursesTemplateBodyV1.safeParse({ ...validBody(), tags: "#UK" }).success
    ).toBe(false);
  });
});

describe("buildProgramsCoursesView", () => {
  it("maps the fixture into section slices with mobile fallbacks", () => {
    const view = buildProgramsCoursesView(PROGRAMS_COURSES_FIXTURE);
    expect(view.hero.titleLines).toEqual(PROGRAMS_COURSES_FIXTURE.titleLines);
    expect("enroll" in view.hero).toBe(false);
    expect(view.description.mob).toBe(PROGRAMS_COURSES_FIXTURE.descriptionMobile);
    expect(view.checks.mob).toBe(PROGRAMS_COURSES_FIXTURE.checksMobile);

    const noMobile = buildProgramsCoursesView({
      ...PROGRAMS_COURSES_FIXTURE,
      descriptionMobile: undefined,
      checksMobile: undefined
    });
    expect(noMobile.description.mob).toBe(noMobile.description.desk);
    expect(noMobile.checks.mob).toBe(noMobile.checks.desk);
  });
});
