/**
 * FACE-FIXTURES explorer — 5 events + 5 courses per face_layout.
 * Import face components only; no real catalog / Supabase.
 */
import { CalendarSessionFaceCard } from "./calendar-session-face-card";
import { CalendarSessionPhotoFaceCard } from "./calendar-session-photo-face-card";
import { CvreadyFaceCard } from "./cvready-face-card";
import {
  FACE_FIXTURES_PER_KIND,
  listFaceFixtures,
  type FaceFixture
} from "./face-fixtures";
import { FACE_LAYOUT_CATALOG, type FaceLayoutId } from "./face-layouts";
import { InternshipFaceCard } from "./internship-face-card";
import { ProgramCompactFaceCard } from "./program-compact-face-card";
import { ProgramFullFaceCard } from "./program-full-face-card";
import { PromoFaceCard } from "./promo-face-card";
import { PurpleEventsFaceCard } from "./purple-events-face-card";
import "./face-fixtures-lab.css";

function FaceFixtureCard({ fixture }: { fixture: FaceFixture }) {
  switch (fixture.face_layout) {
    case "event_session":
      return <PurpleEventsFaceCard card={fixture.card} />;
    case "cvready":
      return <CvreadyFaceCard card={fixture.card} />;
    case "program_full":
      return <ProgramFullFaceCard card={fixture.card} />;
    case "program_compact":
      return <ProgramCompactFaceCard card={fixture.card} />;
    case "program_compact_sm":
      return <ProgramCompactFaceCard card={fixture.card} size="sm" />;
    case "program_compact_sm_desk":
      return <ProgramCompactFaceCard card={fixture.card} size="sm_desk" />;
    case "promo":
      return <PromoFaceCard card={fixture.card} />;
    case "internship":
      return <InternshipFaceCard card={fixture.card} />;
    case "calendar_session":
      return <CalendarSessionFaceCard card={fixture.card} />;
    case "calendar_session_photo":
      return <CalendarSessionPhotoFaceCard card={fixture.card} />;
    default: {
      const _exhaustive: never = fixture;
      return _exhaustive;
    }
  }
}

function FixtureRail({
  layoutId,
  kind
}: {
  layoutId: FaceLayoutId;
  kind: "event" | "course";
}) {
  const rows = listFaceFixtures({ face_layout: layoutId, kind });
  const headingId = `face-fx-${layoutId}-${kind}`;

  return (
    <section
      className="face-fx-lab__rail"
      aria-labelledby={headingId}
      data-face-layout={layoutId}
      data-catalog-kind={kind}
    >
      <h3 id={headingId} className="face-fx-lab__rail-title">
        {kind === "event" ? "Events" : "Courses"} ({rows.length})
      </h3>
      <ul className="face-fx-lab__grid">
        {rows.map((fixture) => (
          <li key={fixture.id} className="face-fx-lab__cell">
            <p className="face-fx-lab__meta">
              <span className="face-fx-lab__id">{fixture.id}</span>
              <span
                className={
                  fixture.status === "closed"
                    ? "face-fx-lab__status face-fx-lab__status--closed"
                    : "face-fx-lab__status"
                }
              >
                {fixture.status}
              </span>
            </p>
            <FaceFixtureCard fixture={fixture} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FaceFixturesLab() {
  return (
    <div
      className="face-fx-lab"
      data-pgs-module="face-fixtures-lab"
      data-face-gate="FACE-FIXTURES"
      data-cutover="preview"
    >
      <div className="face-fx-lab__univ-gap" aria-hidden="true" />

      <header className="face-fx-lab__intro">
        <h1 className="face-fx-lab__heading">Face fixtures bank</h1>
        <p className="face-fx-lab__note">
          Gate <code>FACE-FIXTURES</code>:{" "}
          <strong>{FACE_FIXTURES_PER_KIND}</strong> events +{" "}
          <strong>{FACE_FIXTURES_PER_KIND}</strong> courses per locked{" "}
          <code>face_layout</code> (UI fit only · not production catalog). Listing
          pages import <code>listFaceFixtures()</code> + the matching face
          component. Real admin rows come later under B\*.
        </p>
      </header>

      {FACE_LAYOUT_CATALOG.map((layout) => (
        <section
          key={layout.id}
          className="face-fx-lab__layout"
          aria-labelledby={`face-fx-layout-${layout.id}`}
          data-face-layout={layout.id}
          data-face-surface={layout.surface}
        >
          <header className="face-fx-lab__layout-header">
            <h2
              id={`face-fx-layout-${layout.id}`}
              className="face-fx-lab__layout-title"
            >
              {layout.figmaPair ? `Pair ${layout.figmaPair} — ` : null}
              {layout.label}
              <code className="face-fx-lab__code">{layout.id}</code>
              {layout.surface === "calendar" ? (
                <span className="face-fx-lab__badge">calendar only</span>
              ) : null}
              {layout.mobSharedWith ? (
                <span className="face-fx-lab__badge">
                  mob = {layout.mobSharedWith}
                </span>
              ) : null}
            </h2>
            <p className="face-fx-lab__note">
              {layout.typicalUse}
              {layout.mobSharedWith
                ? ` Phone/iPad interim: renders Pair 2 \`${layout.mobSharedWith}\` mob chrome (desk pairs 2+3 share one mob).`
                : null}
            </p>
          </header>
          <FixtureRail layoutId={layout.id} kind="event" />
          <FixtureRail layoutId={layout.id} kind="course" />
        </section>
      ))}
    </div>
  );
}
