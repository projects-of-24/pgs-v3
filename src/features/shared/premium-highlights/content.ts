/**
 * Shared highlights block. Lives under `src/features/shared/`. Pages import this.
 * Do not copy the component. Do not rebuild scroll/drag in page wrappers.
 * Desktop `17055:12784` · phone `433:5182`. Spelling stays `#higlights`.
 * Rail interaction (wheel + drag, no focus ring) lives in `premium-highlights.tsx`.
 * PLAB / AMC / Events / Courses / Uni Tie-up import this module.
 */
export const PREMIUM_HIGHLIGHTS = {
  title: "#higlights",
  lead: [
    "Students, in action",
    "presenting their posters",
    "at an international medical",
    "conference."
  ],
  place: "Washington, D.C.",
  pinSrc: "/assets/img/premium-highlights/pin-place.svg",
  note: "Our NETWORK students* had a great time presenting their posters at an international medical conference—meeting med students from the U.S. and future doctors from around the world. It was solid exposure, good conversations, and yep, definitely a strong addition to their resume.",
  photos: [
    {
      src: "/assets/img/premium-highlights/highlight-hallway.jpg",
      alt: "Students talking beside poster boards at a medical conference",
      crop: 1
    },
    {
      src: "/assets/img/premium-highlights/highlight-posters.jpg",
      alt: "Two students looking at research posters",
      crop: 2
    },
    {
      src: "/assets/img/premium-highlights/highlight-presenter.jpg",
      alt: "A student presenting a research poster",
      crop: 3
    },
    {
      src: "/assets/img/premium-highlights/highlight-hallway.jpg",
      alt: "",
      crop: 1
    },
    {
      src: "/assets/img/premium-highlights/highlight-posters.jpg",
      alt: "",
      crop: 2
    },
    {
      src: "/assets/img/premium-highlights/highlight-presenter.jpg",
      alt: "",
      crop: 3
    }
  ]
} as const;
