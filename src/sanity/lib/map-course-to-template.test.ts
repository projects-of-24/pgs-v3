import { describe, expect, it } from "vitest";
import { mapSanityCourseToTemplate } from "./map-course-to-template";

describe("mapSanityCourseToTemplate", () => {
  it("maps title and slug into the Programs Courses fixture", () => {
    const course = mapSanityCourseToTemplate({
      _id: "doc1",
      title: "Sanity Trial Bootcamp",
      slug: "sanity-trial",
      partnership: "Parallel CMS check",
      topicsLeftBodies: ["React", "Node"],
      faqQuestion: "What is this?",
      faqAnswer: "A Sanity trial course."
    });
    expect(course.id).toBe("sanity-trial");
    expect(course.titleLines.join(" ")).toContain("Sanity Trial");
    expect(course.partnership).toBe("Parallel CMS check");
    expect(course.description.left.bodies).toEqual(["React", "Node"]);
    expect(course.faq.tabs[0]?.items[0]?.question).toBe("What is this?");
  });
});
