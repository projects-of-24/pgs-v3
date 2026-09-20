/**
 * Shared questions + meet pair. One component. Pages pass their own fixture later.
 * Do not invent PLAB / AMC copy here. USMLE uses this fixture.
 * Desktop `17055:12872`. Phone is the next pass.
 */
export const PREMIUM_QUESTIONS = {
  title: ["Got questions about", "#purplePremium?"],
  lead: "Let’s clear them in one quick call.",
  checkSrc: "/assets/img/premium-questions/check.svg",
  items: [
    ["Find out if it’s the right fit for your USMLE prep"],
    [
      "Talk about your profile (and yep, you might just",
      "score a discount depending on your journey stage)"
    ],
    ["Figure out how to start a roadmap from exactly", "where you stand"],
    ["Got a “what if” or “how do I”? Clear it over the call"]
  ],
  kicker: ["MEET", "+", "GREET"],
  cardTitle: "With an Expert",
  slot: "Check the available slots & book your appointment.",
  cta: "Schedule Now",
  photoSrc: "/assets/img/premium-questions/meet.jpg",
  photoAlt: "A laptop on a video call with two people"
} as const;
