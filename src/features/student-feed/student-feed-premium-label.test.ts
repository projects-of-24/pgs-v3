import { describe, expect, it } from "vitest";
import {
  STUDENT_FEED_PREMIUM_LABEL_ACTIVE,
  STUDENT_FEED_PREMIUM_LABEL_INACTIVE,
  isStudentFeedPremiumActive,
  studentFeedPremiumLabel
} from "./student-feed-premium-label";

describe("studentFeedPremiumLabel", () => {
  it("uses inactive copy for anon and standard", () => {
    expect(studentFeedPremiumLabel(false)).toBe(STUDENT_FEED_PREMIUM_LABEL_INACTIVE);
    expect(isStudentFeedPremiumActive("anonymous")).toBe(false);
    expect(isStudentFeedPremiumActive("authenticated_standard")).toBe(false);
  });

  it("uses #purplePremium when entitlement is active", () => {
    expect(studentFeedPremiumLabel(true)).toBe(STUDENT_FEED_PREMIUM_LABEL_ACTIVE);
    expect(isStudentFeedPremiumActive("authenticated_premium")).toBe(true);
  });
});
