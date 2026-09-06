/** One published course → desktop + mobile layouts (same data). */
export type UsmleExploreCardModel = {
  id: string;
  href: string;
  title: string;
  image: string;
  badge: string;
  badgeIcon: string;
  /** Desktop image overlay pill (e.g. #HandsOn). */
  imageTag?: string;
  location: string;
  speciality: string;
  duration: string;
  perksTitle: string;
  perksBody: string;
  tags: string[];
  logo?: string;
  logoAlt?: string;
  datesRail: string;
  promoTitle: string;
  promoSubtitle: string;
  promoDate: string;
  ctaLabel: string;
  qrSrc: string;
  showDownload: boolean;
  downloadIcon: string;
  saved?: boolean;
  entityType?: "course" | "program" | "event";
  entityId?: string;
};

export type UsmleExploreCourseCards = {
  id: string;
  card: UsmleExploreCardModel;
};
