/**
 * Shared support hub. One component. Pages import this.
 * About and Rotation keep their copies until a later switch.
 * Desktop `17056:21414`. Phone `433:4717`.
 * Email uses the locked spelling, not the desktop Figma typo purpleguid.
 */
export const SUPPORT_HUB = {
  brand: "#PGS",
  hubLabel: "#StudentSupportHub",
  callLabel: "Call Us",
  emailLabel: "Email Us",
  phoneDisplay: "91 95665 66298",
  phoneHref: "tel:+919566566298",
  emailDisplay: "connect@purpleguide.study",
  emailHref: "mailto:connect@purpleguide.study",
  phoneIconSrc: "/assets/img/support-hub/phone.svg",
  blurb:
    "Reach out on our helpline for fast bookings, expert advice, and answers to all your study abroad questions. We’ve also got dedicated mentor groups for medical and non-medical courses—so you’re always connected to the right people."
} as const;
