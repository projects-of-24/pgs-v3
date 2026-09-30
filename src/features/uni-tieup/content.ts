/**
 * Uni Tie-up page fixtures — UT1+.
 * Desk Figma `17067:11021` · Mob `524:6634`.
 */

export const UNI_TIEUP_INTRO = {
  lead: "Indian universities and institutions seeking international visits and exchange programs can connect with us for conference visits and program participation opportunities that give students real global exposure and academic experiences."
} as const;

export const UNI_TIEUP_HERO = {
  titleLines: ["with university", "partnerships"] as const,
  body: "Connect your students with global opportunities through our comprehensive international programs",
  cta: "Partner With Us",
  ctaHref: "mailto:partnerships@purpleguide.study",
  impactHeading: "Partnership Impact",
  stats: [
    {
      value: "150+",
      lines: ["Students ", "participated in Exchange Program"] as const
    },
    {
      value: "5+",
      lines: ["Universities participated in international events"] as const
    }
  ] as const,
  iconSrc: "/assets/img/uni-tieup/university-icon.svg",
  iconAlt: ""
} as const;

/** UT3 — Face rail. Mob 2×2 · Desk 3×3 · arrows page next set. */
export const UNI_TIEUP_INITIATIVES = {
  heading: "Co-Developed Initiatives",
  /** Pair 6 `program_compact` course fixtures. */
  cardCountPair6: 5,
  /** Pair 9 `program_compact_sm` course fixtures (shell @ 80%). */
  cardCountPair9: 1,
  /** Mob / interim: 2 rows × 2 cols. */
  pageSizeMob: 4,
  /** Desk >1366: 3 rows × 3 cols. */
  pageSizeDesk: 9,
  prevLabel: "Previous initiatives",
  nextLabel: "Next initiatives",
  arrowLeftSrc: "/assets/img/purple-events/arrow-left-circle.svg",
  arrowRightSrc: "/assets/img/purple-events/arrow-right-circle.svg"
} as const;
