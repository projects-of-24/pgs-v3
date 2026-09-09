/** One published course → #Pgs picks carousel card. */
export type UsmlePicksCardModel = {
  id: string;
  href: string;
  cta: string;
  blurbDesktop: string;
  blurbMobile: string;
  imageSrc: string;
  imageAlt: string;
};

export type UsmlePicksCourseCard = {
  id: string;
  card: UsmlePicksCardModel;
};
