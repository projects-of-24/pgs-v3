/**
 * Student #feed premium entitlement label — UI contract for CMS/backend later.
 * Premium = entitlement (`premium_entitlement`), not a role.
 *
 * Active → "#purplePremium" (one line)
 * Anonymous / standard → two lines, same type size/weight as active:
 *   "purplepremium not"
 *   "active yet"
 */

export const STUDENT_FEED_PREMIUM_LABEL_ACTIVE = "#purplePremium";

/** Full inactive string (a11y / plain text). */
export const STUDENT_FEED_PREMIUM_LABEL_INACTIVE = "purplepremium not active yet";

/** Inactive display lines — same typography as active; two lines to fill width. */
export const STUDENT_FEED_PREMIUM_LABEL_INACTIVE_LINES = [
  "purplepremium not",
  "active yet"
] as const;

export function studentFeedPremiumLabel(premiumActive: boolean): string {
  return premiumActive
    ? STUDENT_FEED_PREMIUM_LABEL_ACTIVE
    : STUDENT_FEED_PREMIUM_LABEL_INACTIVE;
}

export function studentFeedPremiumLabelLines(premiumActive: boolean): readonly string[] {
  return premiumActive
    ? [STUDENT_FEED_PREMIUM_LABEL_ACTIVE]
    : STUDENT_FEED_PREMIUM_LABEL_INACTIVE_LINES;
}

export function isStudentFeedPremiumActive(
  stateKind: string | null | undefined
): boolean {
  return stateKind === "authenticated_premium";
}
