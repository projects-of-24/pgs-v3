/**
 * One label set. Desktop and phone each have their own photo.
 * CMS later edits `desk` and `phone` independently. Do not share a src.
 */
export const PREMIUM_AMC_DASHBOARD_POINTS = [
  {
    label: "Track Your Personalized Journey Map",
    lines: ["Track Your", "Personalized", "Journey Map"],
    desk: {
      src: "/assets/img/premium-usmle/dashboard-1.jpg",
      alt: "A mountain silhouette at dusk"
    },
    phone: {
      src: "/assets/img/premium-usmle/dashboard-m1.jpg",
      alt: "Hands holding a small white flower"
    }
  },
  {
    label: "Every draft, checklist, and to-do",
    lines: ["Every draft, checklist,", "and to-do"],
    desk: {
      src: "/assets/img/premium-usmle/dashboard-2.jpg",
      alt: "A stone hotel on a mountain road"
    },
    phone: {
      src: "/assets/img/premium-usmle/dashboard-m2.jpg",
      alt: "A pencil study of two arms"
    }
  },
  {
    label: "Direct Notes from Mentors",
    lines: ["Direct Notes", "from", "Mentors"],
    desk: {
      src: "/assets/img/premium-usmle/dashboard-3.jpg",
      alt: "Mount Fuji seen through red autumn leaves"
    },
    phone: {
      src: "/assets/img/premium-usmle/dashboard-m3.jpg",
      alt: "A person typing on a phone"
    }
  },
  {
    label: "See what they need to do next",
    lines: ["See what", "they need", "to do next"],
    desk: {
      src: "/assets/img/premium-usmle/dashboard-4.jpg",
      alt: "A suspension bridge over a bay"
    },
    phone: {
      src: "/assets/img/premium-usmle/dashboard-m4.jpg",
      alt: "A pale room with a round window"
    }
  },
  {
    label: "Real-Time University Deadlines",
    lines: ["Real-Time", "University", "Deadlines"],
    desk: {
      src: "/assets/img/premium-usmle/dashboard-5.jpg",
      alt: "A person potting a plant on a porch"
    },
    phone: {
      src: "/assets/img/premium-usmle/dashboard-m5.jpg",
      alt: "An ornate hall with a painted ceiling"
    }
  }
] as const;
