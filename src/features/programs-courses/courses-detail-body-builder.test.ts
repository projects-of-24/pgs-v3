import { describe, expect, it } from "vitest";
import { PROGRAMS_COURSES_FIXTURE } from "./content";
import { buildEmptyCoursesDetailBody, coursesCmsDraftToTemplate } from "./courses-cms-preview-map";
import {
  bodyToSectionsForm,
  buildCoursesDetailBody,
  linesToList,
  safeBodyUrl
} from "./courses-detail-body-builder";
import { coursesDetailBodyToFixture, parseCoursesDetailInput } from "./courses-detail-validation";
import { CoursesTemplateBodyV1 } from "./courses-template-schema";

const flat = {
  title: "SURGERY WEEK IN RCSED - SCOTLAND UK JULY 2025",
  short_description: "Partnership line",
  description: "Long description",
  duration: "7 Days",
  mode: "At-Campus",
  starts_on: "2025-12-31",
  ends_on: "2026-01-01",
  tagNames: ["UK", "#Medical"]
};

describe("buildEmptyCoursesDetailBody", () => {
  it("is schema-valid with fixture icon paths", () => {
    const body = buildEmptyCoursesDetailBody("64");
    expect(CoursesTemplateBodyV1.safeParse(body).success).toBe(true);
    expect(body.schemaVersion).toBe(1);
    expect(body.id).toBe("64");
    expect(body.shareIcon).toBe(PROGRAMS_COURSES_FIXTURE.shareIcon);
    expect(body.highlights.icon).toBe(PROGRAMS_COURSES_FIXTURE.highlights.icon);
    expect(body.highlights.items).toEqual([]);
  });
});

describe("buildCoursesDetailBody", () => {
  it("builds a full valid body from an empty form (no previous body)", () => {
    const sections = bodyToSectionsForm(null);
    sections.c2.leftBodies = "Medical interns\nMBBS grads";
    sections.c4.items = ["Hands-on suturing", "", "Expert consultants"];
    const body = buildCoursesDetailBody({ id: "64", flat, sections });

    expect(CoursesTemplateBodyV1.safeParse(body).success).toBe(true);
    expect(body.titleLines.join(" ")).toContain("SURGERY WEEK");
    expect(body.partnership).toBe("Partnership line");
    expect(body.programDescription.body).toBe("Long description");
    expect(body.durationValue).toBe("7 Days");
    expect(body.modeLabel).toBe("#inCampus");
    expect(body.start).toMatchObject({ day: "31", month: "Dec", year: "25" });
    expect(body.end).toMatchObject({ day: "01", month: "Jan", year: "26" });
    expect(body.tags).toEqual(["#UK", "#Medical"]);
    expect(body.description.left.bodies).toEqual(["Medical interns", "MBBS grads"]);
    expect(body.highlights.items).toEqual([
      { num: "01", body: "Hands-on suturing" },
      { num: "02", body: "Expert consultants" }
    ]);
    // icons from the fixture survive
    expect(body.fillingIcon).toBe(PROGRAMS_COURSES_FIXTURE.fillingIcon);
  });

  it("starts from a valid previous body and overlays every section", () => {
    const previous = { schemaVersion: 1, ...PROGRAMS_COURSES_FIXTURE };
    const sections = bodyToSectionsForm(previous);
    sections.c1.bookingUrl = "https://example.com/book";
    sections.c1.whoIsItFor = "Interns";
    sections.c5.items = ["One", "Two"];
    sections.c6.badgeLabel = "Badge";
    sections.c7.facts = [{ title: "Founded", body: "" }, { title: "Reach", body: "Worldwide" }];
    sections.c7.logoUrl = "https://cdn.example.com/award-logo.png";
    sections.c7.logoAlt = "Partner logo";
    sections.c7.photoUrl = "https://cdn.example.com/award-photo.jpg";
    sections.c7.photoAlt = "Campus photo";
    sections.c8.eligibilityChips = "MBBS\nIntern";
    sections.c8.steps = [
      { title: "Apply", body: "Fill the form ", linkText: "here", linkHref: "javascript:alert(1)", bodyAfter: "." },
      { title: "Call", body: "Talk to us", linkText: "", linkHref: "", bodyAfter: "" }
    ];
    sections.c9.checks = "A\nB";
    sections.c11.price = "GBP 99";
    sections.c11.breakdownLeft = "Training\nVisa help || (by #PGS)";
    const body = buildCoursesDetailBody({ id: "64", flat, sections, previous });

    expect(body.bookingUrl).toBe("https://example.com/book");
    expect(body.whoIsItFor).toBe("Interns");
    expect(body.checks.items).toEqual(["One", "Two"]);
    expect(body.checksMobile).toBeUndefined();
    expect(body.descriptionMobile).toBeUndefined();
    expect(body.brochure.badgeLabel).toBe("Badge");
    expect(body.awarding.facts).toEqual([{ title: "Founded" }, { title: "Reach", body: "Worldwide" }]);
    expect(body.awarding.logo).toBe("https://cdn.example.com/award-logo.png");
    expect(body.awarding.logoAlt).toBe("Partner logo");
    expect(body.awarding.photo).toBe("https://cdn.example.com/award-photo.jpg");
    expect(body.awarding.photoAlt).toBe("Campus photo");
    expect(body.apply.eligibilityChips).toEqual(["MBBS", "Intern"]);
    expect(body.apply.option1Steps[0]).toMatchObject({ bodyBefore: "Fill the form ", linkText: "here", linkHref: "" });
    expect(body.apply.option1Steps[1]).toEqual({ title: "Call", body: "Talk to us" });
    expect(body.certificate.checks).toEqual(["A", "B"]);
    expect(body.enroll.price).toBe("GBP 99");
    expect(body.enroll.breakdownLeft).toEqual([{ text: "Training" }, { text: "Visa help ", bold: "(by #PGS)" }]);
  });

  it("falls back to the empty body when the previous body is invalid", () => {
    const body = buildCoursesDetailBody({
      id: "9",
      previous: { schemaVersion: 1, id: "x" },
      flat,
      sections: bodyToSectionsForm({ junk: true })
    });
    expect(CoursesTemplateBodyV1.safeParse(body).success).toBe(true);
    expect(body.id).toBe("9");
  });

  it("round-trips body -> form -> body and passes the drafts-route validation", () => {
    const previous = { schemaVersion: 1, ...PROGRAMS_COURSES_FIXTURE };
    const body = buildCoursesDetailBody({
      id: "64",
      previous,
      flat: {},
      sections: bodyToSectionsForm(previous)
    });
    expect(body.apply.option1Steps).toEqual(PROGRAMS_COURSES_FIXTURE.apply.option1Steps);
    expect(body.enroll.breakdownLeft).toEqual(PROGRAMS_COURSES_FIXTURE.enroll.breakdownLeft);
    expect(() => parseCoursesDetailInput({ detail_template: "courses", detail_body: body })).not.toThrow();
  });
});

describe("saved body preview", () => {
  it("renders saved sections and overlays marketing media onto the body", () => {
    const body = buildCoursesDetailBody({ id: "64", flat, sections: bodyToSectionsForm(null) });
    expect(coursesDetailBodyToFixture(body)).not.toBeNull();
    const course = coursesCmsDraftToTemplate({
      id: 64,
      values: { title: "x", detail_body: body },
      tagNames: [],
      imageUrl: "https://cdn.example.com/hero.jpg",
      imageAlt: "Hero alt",
      brochureUrl: "https://cdn.example.com/brochure.pdf"
    });
    expect(course.heroImage).toBe("https://cdn.example.com/hero.jpg");
    expect(course.heroImageAlt).toBe("Hero alt");
    expect(course.brochure.downloadUrl).toBe("https://cdn.example.com/brochure.pdf");
    expect(course.titleLines.join(" ")).toContain("SURGERY WEEK");
  });
});

describe("helpers", () => {
  it("splits lines and sanitises urls", () => {
    expect(linesToList(" a \n\n b\r\nc ")).toEqual(["a", "b", "c"]);
    expect(safeBodyUrl("javascript:alert(1)")).toBe("");
    expect(safeBodyUrl("//evil.com")).toBe("");
    expect(safeBodyUrl("https://ok.com")).toBe("https://ok.com");
    expect(safeBodyUrl("/x")).toBe("/x");
    expect(safeBodyUrl("#pc-c11")).toBe("#pc-c11");
  });
});
