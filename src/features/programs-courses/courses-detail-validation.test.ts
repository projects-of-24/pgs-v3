import { describe, expect, it } from "vitest";
import { PROGRAMS_COURSES_FIXTURE } from "./content";
import {
  coursesDetailBodyToFixture,
  parseCoursesDetailInput,
  validateCoursesDetailBody
} from "./courses-detail-validation";

const validBody = { schemaVersion: 1, ...PROGRAMS_COURSES_FIXTURE };

describe("parseCoursesDetailInput", () => {
  it("returns nothing when no COURSE2b keys are present", () => {
    expect(parseCoursesDetailInput({ title: "x" })).toEqual({});
  });

  it("accepts a null or 'courses' detail_template and rejects anything else", () => {
    expect(parseCoursesDetailInput({ detail_template: null })).toEqual({ detail_template: null });
    expect(parseCoursesDetailInput({ detail_template: "" })).toEqual({ detail_template: null });
    expect(parseCoursesDetailInput({ detail_template: "courses" })).toEqual({ detail_template: "courses" });
    expect(() => parseCoursesDetailInput({ detail_template: "events" })).toThrow(/template/i);
  });

  it("allows an empty detail_body object", () => {
    expect(parseCoursesDetailInput({ detail_body: {} })).toEqual({ detail_body: {} });
    expect(parseCoursesDetailInput({ detail_body: null })).toEqual({ detail_body: {} });
  });

  it("accepts a full schemaVersion 1 body", () => {
    const result = parseCoursesDetailInput({ detail_template: "courses", detail_body: validBody });
    expect(result.detail_template).toBe("courses");
    expect(result.detail_body?.schemaVersion).toBe(1);
  });

  it("rejects non-object bodies, missing schemaVersion, unknown keys and bad fields with a named issue", () => {
    expect(() => parseCoursesDetailInput({ detail_body: [] })).toThrow(/object/);
    expect(() => parseCoursesDetailInput({ detail_body: "{}" })).toThrow(/object/);
    expect(() => parseCoursesDetailInput({ detail_body: { title: "partial" } })).toThrow(/invalid/);
    const { schemaVersion: _omit, ...noVersion } = validBody;
    void _omit;
    expect(() => parseCoursesDetailInput({ detail_body: noVersion })).toThrow(/schemaVersion/);
    expect(() => parseCoursesDetailInput({ detail_body: { ...validBody, rogue: true } })).toThrow(/rogue|Unrecognized/);
    expect(() => parseCoursesDetailInput({ detail_body: { ...validBody, tags: "nope" } })).toThrow(/tags/);
  });

  it("rejects oversized bodies", () => {
    const huge = { ...validBody, whoForNote: "x".repeat(200000) };
    expect(() => validateCoursesDetailBody(huge)).toThrow(/too large/);
  });

  it("normalizes and validates booking_url", () => {
    expect(parseCoursesDetailInput({ booking_url: "  https://zoho.example/book  " })).toEqual({ booking_url: "https://zoho.example/book" });
    expect(parseCoursesDetailInput({ booking_url: "" })).toEqual({ booking_url: null });
    expect(() => parseCoursesDetailInput({ booking_url: "javascript:alert(1)" })).toThrow(/safe URL/);
    expect(() => parseCoursesDetailInput({ booking_url: "//evil.example" })).toThrow(/safe URL/);
  });
});

describe("coursesDetailBodyToFixture", () => {
  it("strips schemaVersion for a valid body", () => {
    const fixture = coursesDetailBodyToFixture(validBody);
    expect(fixture).not.toBeNull();
    expect(fixture).not.toHaveProperty("schemaVersion");
    expect(fixture?.id).toBe(PROGRAMS_COURSES_FIXTURE.id);
  });

  it("returns null for empty, missing or invalid bodies", () => {
    expect(coursesDetailBodyToFixture({})).toBeNull();
    expect(coursesDetailBodyToFixture(undefined)).toBeNull();
    expect(coursesDetailBodyToFixture({ ...validBody, schemaVersion: 2 })).toBeNull();
  });
});
