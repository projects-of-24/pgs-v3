import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PremiumStudentDashboard } from "@/components/premium-student-dashboard";

const emptyCatalog = { events: [], courses: [] };

describe("Figma student feed locked and premium states", () => {
  it("renders the locked badge, lock overlays, and no comment composer", () => {
    const html = renderToStaticMarkup(
      <PremiumStudentDashboard
        avatarUrl="/assets/img/default-avatar.png"
        catalog={emptyCatalog}
        dashboard={null}
        email=""
        locked
        name="Aspirant"
        pathway={null}
        readOnly
        workspace={null}
      />
    );
    expect(html).toContain("avatar-heading-right-box");
    expect(html).toMatch(/Yet to\s+Unlock/i);
    expect(html).toContain("lock-box-feed");
    expect(html).toContain("/assets/img/figma-feed/lock.png");
    expect(html).toContain("student-feed-help-hub");
    expect(html).not.toContain("addCommentForm");
    expect(html).not.toContain("#PURPLEPREMIUM</h4>");
  });

  it("renders the premium entitlement badge without lock overlays", () => {
    const html = renderToStaticMarkup(
      <PremiumStudentDashboard
        avatarUrl="/assets/img/default-avatar.png"
        catalog={emptyCatalog}
        dashboard={null}
        email="premium@example.test"
        locked={false}
        name="Premium Student"
        pathway="STEM"
        readOnly={false}
        workspace={{
          studentId: "student-1",
          profile: null,
          premiumProfile: null,
          mentor: null,
          alerts: [],
          columns: [],
          tasks: [],
          comments: [],
          reviews: [],
          notes: [],
          requirements: [],
          universities: []
        }}
      />
    );
    expect(html).toContain("#PURPLEPREMIUM");
    expect(html).not.toContain("lock-box-feed");
    expect(html).not.toContain("Yet to Unlock");
  });
});
