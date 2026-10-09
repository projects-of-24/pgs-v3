/**
 * COURSE2b — validate `courses.detail_template` / `detail_body` / `booking_url` draft input.
 * Server-side only gate for the catalog drafts route; also used by the Ops preview map.
 */
import { emptyCoursesFaq, emptyCoursesLearners } from "./courses-cms-shared-defaults";
import { CoursesTemplateBodyV1 } from "./courses-template-schema";
import type { ProgramsCoursesFixture } from "./content";

export const COURSES_DETAIL_TEMPLATE = "courses";
export const COURSES_DETAIL_BODY_MAX_BYTES = 200000;
const BOOKING_URL_MAX = 1000;

export type CoursesDetailDraftValues = {
  detail_template?: string | null;
  detail_body?: Record<string, unknown>;
  booking_url?: string | null;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** COURSE2d-D3/D4 — older drafts lack newer slices; inject empties so Zod still accepts them. */
export function coerceCoursesDetailBody(value: Record<string, unknown>): Record<string, unknown> {
  const next = { ...value };
  if (!isPlainObject(next.higlights)) {
    next.higlights = {
      title: "",
      lead: [],
      place: "",
      pinSrc: "/assets/img/premium-highlights/pin-place.svg",
      note: "",
      photos: []
    };
  }
  if (!isPlainObject(next.learners)) next.learners = emptyCoursesLearners();
  if (!isPlainObject(next.faq)) next.faq = emptyCoursesFaq();
  return next;
}

function describeIssues(error: { issues: readonly { path: PropertyKey[]; message: string; code: string }[] }): string {
  const parts = error.issues.slice(0, 3).map((issue) => {
    const path = issue.path.length ? issue.path.map(String).join(".") : "body";
    return `${path}: ${issue.message}`;
  });
  const extra = error.issues.length > 3 ? ` (+${error.issues.length - 3} more)` : "";
  return `${parts.join("; ")}${extra}`;
}

/** Parse a non-empty detail body. Returns the typed body or throws naming the issue. */
export function validateCoursesDetailBody(value: unknown): Record<string, unknown> {
  if (value == null) return {};
  if (!isPlainObject(value)) throw new Error("Course detail body must be an object.");
  if (new TextEncoder().encode(JSON.stringify(value)).length >= COURSES_DETAIL_BODY_MAX_BYTES) {
    throw new Error("Course detail body is too large.");
  }
  if (Object.keys(value).length === 0) return {};
  const parsed = CoursesTemplateBodyV1.safeParse(coerceCoursesDetailBody(value));
  if (!parsed.success) throw new Error(`Course detail body is invalid — ${describeIssues(parsed.error)}`);
  return parsed.data as Record<string, unknown>;
}

/**
 * Validate only the COURSE2b keys present in `input`.
 * Absent keys are omitted so callers can keep live values untouched.
 */
export function parseCoursesDetailInput(input: Record<string, unknown>): CoursesDetailDraftValues {
  const result: CoursesDetailDraftValues = {};

  if ("detail_template" in input) {
    const raw = input.detail_template;
    if (raw == null || raw === "") result.detail_template = null;
    else if (raw === COURSES_DETAIL_TEMPLATE) result.detail_template = COURSES_DETAIL_TEMPLATE;
    else throw new Error("Detail template is invalid.");
  }

  if ("detail_body" in input) result.detail_body = validateCoursesDetailBody(input.detail_body);

  if ("booking_url" in input) {
    const raw = input.booking_url;
    const value = typeof raw === "string" ? raw.trim() : "";
    if (raw != null && typeof raw !== "string") throw new Error("Booking URL must be text.");
    if (value.length > BOOKING_URL_MAX) throw new Error("Booking URL is too long.");
    if (value && (value.startsWith("//") || (!/^https?:\/\//i.test(value) && !value.startsWith("/")))) {
      throw new Error("Booking URL must be a safe URL.");
    }
    result.booking_url = value || null;
  }

  return result;
}

/** Valid schemaVersion 1 body → preview fixture (schemaVersion stripped); otherwise null. */
export function coursesDetailBodyToFixture(value: unknown): ProgramsCoursesFixture | null {
  if (!isPlainObject(value) || Object.keys(value).length === 0) return null;
  const parsed = CoursesTemplateBodyV1.safeParse(coerceCoursesDetailBody(value));
  if (!parsed.success) return null;
  const { schemaVersion: _schemaVersion, ...fixture } = parsed.data;
  void _schemaVersion;
  return fixture as ProgramsCoursesFixture;
}
