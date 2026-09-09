import { describe, expect, it } from "vitest";
import {
  STUDENT_FEED_PREMIUM_LABEL_ACTIVE,
  isStudentFeedPremiumActive,
  studentFeedPremiumLabel
} from "./student-feed-premium-label";

describe("studentFeedPremiumLabel", () => {
  it("maps entitlement to active label string", () => {
    expect(studentFeedPremiumLabel(true)).toBe(STUDENT_FEED_PREMIUM_LABEL_ACTIVE);
    expect(isStudentFeedPremiumActive("authenticated_premium")).toBe(true);
  });

  it("treats anon and standard as not entitled", () => {
    expect(isStudentFeedPremiumActive("anonymous")).toBe(false);
    expect(isStudentFeedPremiumActive("authenticated_standard")).toBe(false);
  });
});
