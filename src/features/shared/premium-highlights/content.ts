/**
 * Shared highlights block. Lives under `src/features/shared/`. Pages import this. Do not copy the component.
 * Desktop `17055:12784` · phone `433:5182`. Spelling stays `#higlights`.
 * PLAB / AMC import this module at their copy gate. Do not invent their copy here.
 * Courses CMS (COURSE2d-D3) may pass a prop-shaped copy of this data with up to 7 photos.
 */
export type PremiumHighlightsPhoto = {
  src: string;
  alt: string;
  crop: 1 | 2 | 3;
};

export type PremiumHighlightsData = {
  title: string;
  lead: string[];
  place: string;
  pinSrc: string;
  note: string;
  photos: PremiumHighlightsPhoto[];
};

export const PREMIUM_HIGHLIGHTS: PremiumHighlightsData = {
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
    },
    {
      src: "/assets/img/premium-highlights/highlight-hallway.jpg",
      alt: "",
      crop: 1
    }
  ]
};
