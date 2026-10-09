import { describe, expect, it } from "vitest";
import { CoursesTemplateBodyV1 } from "./courses-template-schema";
import { buildFullStackBootcampDummyBody } from "./full-stack-bootcamp-dummy";

describe("Full Stack bootcamp dummy body", () => {
  it("passes CoursesTemplateBodyV1 (not the Surgery Week lab fixture)", () => {
    const body = buildFullStackBootcampDummyBody("64");
    expect(CoursesTemplateBodyV1.safeParse(body).success).toBe(true);
    expect(body.titleLines.join(" ")).toMatch(/FULL STACK/i);
    expect(body.higlights.photos).toHaveLength(7);
    expect(body.apply.option1Steps.length).toBeGreaterThan(0);
    expect(body.enroll.breakdownLeft.length).toBeGreaterThan(0);
    expect(body.id).not.toContain("surgery");
  });
});
