/**
 * Shared FAQ. One component. Pages pass their own fixture later.
 * Do not invent PLAB / AMC copy here. USMLE uses this fixture.
 * Desktop `17055:12897`. Phone is the next pass.
 * Figma repeats the same question. The four answer lines are owner-asked placeholder text.
 * The purple slider is not part of the design. It was only a “if it scrolls” mark.
 */
export const PREMIUM_FAQ = {
  title: "FAQ’s",
  question: "How should I plan my study abroad journey for a smooth experience?",
  count: 5,
  answer: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    "Duis aute irure dolor in reprehenderit in voluptate velit."
  ]
} as const;
