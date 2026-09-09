import { describe, expect, it } from "vitest";
import { courseToUsmlePicksCard } from "./course-to-usmle-picks-card";

describe("courseToUsmlePicksCard", () => {
  it("maps CTA, blurbs, href, and image", () => {
    const card = courseToUsmlePicksCard({
      id: 42,
      title: "Internal Medicine USCE",
      short_description: "Hands-on hospital weeks. Mentor support included.",
      card_cta_label: "Book this rotation",
      image_url: "/assets/img/test.jpg",
    });

    expect(card.href).toBe("/programsfull/program/42");
    expect(card.cta).toBe("Book this rotation");
    expect(card.blurbDesktop).toContain("Hands-on hospital weeks");
    expect(card.blurbMobile.length).toBeLessThanOrEqual(50);
    expect(card.imageSrc).toBe("/assets/img/test.jpg");
    expect(card.imageAlt).toBe("Internal Medicine USCE");
  });

  it("falls back CTA and image when blank", () => {
    const card = courseToUsmlePicksCard({
      id: 7,
      title: "Surgery",
      short_description: "",
    });
    expect(card.cta).toBe("For Clinical Rotation Click Here");
    expect(card.imageSrc).toBe("/assets/img/usmlerotation/picks-card.jpg");
    expect(card.blurbDesktop).toBe("Surgery");
  });
});
