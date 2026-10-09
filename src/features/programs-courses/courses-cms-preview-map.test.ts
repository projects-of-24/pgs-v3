import { describe, expect, it } from "vitest";
import { PROGRAMS_COURSES_FIXTURE } from "./content";
import { coursesCmsDraftToTemplate } from "./courses-cms-preview-map";

describe("coursesCmsDraftToTemplate", () => {
  it("maps flat CMS draft fields onto the Courses template without fixture body leak", () => {
    const course = coursesCmsDraftToTemplate({
      id: 64,
      values: {
        title: "SURGERY WEEK IN RCSED - SCOTLAND UK JULY 2025",
        short_description: "Partnership line from CMS",
        description: "Long program description from CMS",
        duration: "7 Days",
        mode: "At-Campus",
        starts_on: "2025-12-31",
        ends_on: "2026-01-01"
      },
      tagNames: ["UK", "Medical"],
      imageUrl: "https://example.com/hero.jpg",
      imageAlt: "Hero",
      brochureUrl: "https://example.com/brochure.pdf"
    });

    expect(course.id).toBe("64");
    expect(course.titleLines[0]).toContain("SURGERY WEEK");
    expect(course.partnership).toBe("Partnership line from CMS");
    expect(course.whoIsItFor).toBe("");
    expect(course.description.left.bodies).toEqual([]);
    expect(course.programDescription.body).toBe("Long program description from CMS");
    expect(course.durationValue).toBe("7 Days");
    expect(course.modeLabel).toBe("#inCampus");
    expect(course.start.day).toBe("31");
    expect(course.start.month).toBe("Dec");
    expect(course.end.day).toBe("01");
    expect(course.tags).toEqual(["#UK", "#Medical"]);
    expect(course.heroImage).toBe("https://example.com/hero.jpg");
    expect(course.brochure.downloadUrl).toBe("https://example.com/brochure.pdf");
    expect(course.highlights.items).toEqual([]);
    expect(course.awarding.facts).toEqual([]);
    expect(course.apply.eligibilityChips).toEqual([]);
  });

  it("uses a valid schemaVersion 1 detail_body as the full template (schemaVersion stripped)", () => {
    const body = { schemaVersion: 1, ...PROGRAMS_COURSES_FIXTURE, id: "body-64" };
    const course = coursesCmsDraftToTemplate({
      id: 64,
      values: { title: "Flat title", detail_body: body },
      tagNames: [],
      imageUrl: "",
      imageAlt: "",
      brochureUrl: ""
    });
    expect(course.id).toBe("body-64");
    expect(course).not.toHaveProperty("schemaVersion");
    expect(course.highlights.items.length).toBe(PROGRAMS_COURSES_FIXTURE.highlights.items.length);
  });

  it("falls back to the flat map for an empty or invalid detail_body", () => {
    for (const detail_body of [{}, { schemaVersion: 1, id: "x" }]) {
      const course = coursesCmsDraftToTemplate({
        id: 7,
        values: { title: "Flat title", detail_body },
        tagNames: [],
        imageUrl: "",
        imageAlt: "",
        brochureUrl: ""
      });
      expect(course.id).toBe("7");
      expect(course.highlights.items).toEqual([]);
    }
  });
});
