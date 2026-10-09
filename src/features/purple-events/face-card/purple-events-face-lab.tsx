/**
 * Face card lab — pgs-facecards Figma · pair-by-pair.
 * All face UI locked: listing pairs 1–6 + calendar_session Pair 7.
 */
import {
  CALENDAR_SESSION_FACE_CLOSED,
  CALENDAR_SESSION_FACE_OPEN
} from "./calendar-session-content";
import { CalendarSessionFaceCard } from "./calendar-session-face-card";
import { CALENDAR_SESSION_PHOTO_FACE_CLOSED, CALENDAR_SESSION_PHOTO_FACE_OPEN } from "./calendar-session-photo-content";
import { CalendarSessionPhotoFaceCard } from "./calendar-session-photo-face-card";
import { CVREADY_FACE_CLOSED, CVREADY_FACE_OPEN } from "./cvready-content";
import { CvreadyFaceCard } from "./cvready-face-card";
import { FACE_CARD_CLOSED, FACE_CARD_OPEN } from "./content";
import {
  FACE_LAYOUT_CATALOG,
  PENDING_FACE_LAYOUTS,
  PGS_FACECARDS_FIGMA,
  type FaceLayoutMeta
} from "./face-layouts";
import { INTERNSHIP_FACE_CLOSED, INTERNSHIP_FACE_OPEN } from "./internship-content";
import { InternshipFaceCard } from "./internship-face-card";
import {
  PROGRAM_COMPACT_FACE_CLOSED,
  PROGRAM_COMPACT_FACE_OPEN
} from "./program-compact-content";
import { ProgramCompactFaceCard } from "./program-compact-face-card";
import { PROGRAM_FULL_FACE_CLOSED, PROGRAM_FULL_FACE_OPEN } from "./program-full-content";
import { ProgramFullFaceCard } from "./program-full-face-card";
import { PROMO_FACE_CLOSED, PROMO_FACE_OPEN } from "./promo-content";
import { PromoFaceCard } from "./promo-face-card";
import { PurpleEventsFaceCard } from "./purple-events-face-card";
import "./purple-events-face-lab.css";

function PendingFaceSection({ layout }: { layout: FaceLayoutMeta }) {
  return (
    <section
      className="pe-face-lab__section pe-face-lab__section--pending"
      aria-labelledby={`pe-face-pending-${layout.id}`}
      data-face-layout={layout.id}
      data-face-status="awaiting_figma"
    >
      <header className="pe-face-lab__header">
        <h2
          id={`pe-face-pending-${layout.id}`}
          className="pe-face-lab__heading pe-face-lab__heading--sub"
        >
          {layout.figmaPair ? `Pair ${layout.figmaPair} — ` : ""}
          {layout.label}
          <span className="pe-face-lab__badge">awaiting gate</span>
        </h2>
        <p className="pe-face-lab__note">
          Layout id <code>{layout.id}</code>. {layout.typicalUse}.{" "}
          {layout.figmaDesk ? (
            <>
              Desk node <code>{layout.figmaDesk}</code>.{" "}
            </>
          ) : null}
          Say <code>GO AHEAD FACE {layout.id}</code> — desk open first, then
          closed, then mob.
        </p>
      </header>
      <p className="pe-face-lab__placeholder" role="status">
        No card chrome until named gate for this pair.
      </p>
    </section>
  );
}

export function PurpleEventsFaceLab() {
  const eventMeta = FACE_LAYOUT_CATALOG.find((row) => row.id === "event_session");
  const cvreadyMeta = FACE_LAYOUT_CATALOG.find((row) => row.id === "cvready");
  const programFullMeta = FACE_LAYOUT_CATALOG.find(
    (row) => row.id === "program_full"
  );
  const internshipMeta = FACE_LAYOUT_CATALOG.find((row) => row.id === "internship");
  const promoMeta = FACE_LAYOUT_CATALOG.find((row) => row.id === "promo");
  const programCompactMeta = FACE_LAYOUT_CATALOG.find(
    (row) => row.id === "program_compact"
  );
  const programCompactSmMeta = FACE_LAYOUT_CATALOG.find(
    (row) => row.id === "program_compact_sm"
  );
  const calendarSessionMeta = FACE_LAYOUT_CATALOG.find(
    (row) => row.id === "calendar_session"
  );
  const calendarSessionPhotoMeta = FACE_LAYOUT_CATALOG.find(
    (row) => row.id === "calendar_session_photo"
  );

  return (
    <div
      className="pe-face-lab"
      data-pgs-module="purple-events-face-lab"
      data-face-gate="face-pair-build"
      data-cutover="preview"
      data-figma-file={PGS_FACECARDS_FIGMA.fileKey}
    >
      <div className="pe-face-lab__univ-gap" aria-hidden="true" />

      <header className="pe-face-lab__section pe-face-lab__intro">
        <h1 className="pe-face-lab__heading">Face card lab</h1>
        <p className="pe-face-lab__note">
          Canonical Figma:{" "}
          <a href={PGS_FACECARDS_FIGMA.fileUrl} target="_blank" rel="noopener noreferrer">
            pgs-facecards
          </a>
          . Listing pairs 1–6 + 9 + 10 locked · Pair 7{" "}
          <code>calendar_session</code> locked · Pair 11{" "}
          <code>calendar_session_photo</code> locked. Full artboard size (no
          scale).
        </p>
      </header>

      <section
        className="pe-face-lab__section"
        aria-labelledby="pe-face-calendar-session-heading"
        data-face-layout="calendar_session"
        data-face-status="locked"
        data-face-surface="calendar"
        data-figma-mobile={calendarSessionMeta?.figmaMobClosed ?? "4:364"}
      >
        <header className="pe-face-lab__header">
          <h2
            id="pe-face-calendar-session-heading"
            className="pe-face-lab__heading pe-face-lab__heading--sub"
          >
            Pair 7 — calendar_session
            <span className="pe-face-lab__badge pe-face-lab__badge--locked">
              locked
            </span>
          </h2>
          <p className="pe-face-lab__note">
            Calendar surface only · desk+mob locked ·{" "}
            {calendarSessionMeta?.artboardDesk ?? "309×240"} /{" "}
            {calendarSessionMeta?.artboardMob ?? "206×160"} · open{" "}
            <code>{calendarSessionMeta?.figmaDeskOpen ?? "4:377"}</code> /{" "}
            <code>{calendarSessionMeta?.figmaMobOpen ?? "4:305"}</code> · closed{" "}
            <code>{calendarSessionMeta?.figmaDeskClosed ?? "4:387"}</code> /{" "}
            <code>{calendarSessionMeta?.figmaMobClosed ?? "4:364"}</code>.
          </p>
        </header>
        <ul className="pe-face-lab__row">
          <li className="pe-face-lab__item">
            <p className="pe-face-lab__state" aria-hidden="true">
              open
            </p>
            <CalendarSessionFaceCard card={CALENDAR_SESSION_FACE_OPEN} />
          </li>
          <li className="pe-face-lab__item">
            <p className="pe-face-lab__state" aria-hidden="true">
              closed
            </p>
            <CalendarSessionFaceCard card={CALENDAR_SESSION_FACE_CLOSED} />
          </li>
        </ul>
      </section>

      <section
        className="pe-face-lab__section"
        id="pe-face-calendar-session-photo"
        aria-labelledby="pe-face-calendar-session-photo-heading"
        data-face-layout="calendar_session_photo"
        data-face-status="locked"
        data-face-surface="calendar"
        data-figma-desktop={
          calendarSessionPhotoMeta?.figmaDeskClosed ?? "42:311"
        }
        data-figma-mobile={
          calendarSessionPhotoMeta?.figmaMobClosed ?? "42:340"
        }
      >
        <header className="pe-face-lab__header">
          <h2
            id="pe-face-calendar-session-photo-heading"
            className="pe-face-lab__heading pe-face-lab__heading--sub"
          >
            Pair 11 — calendar_session_photo
            <span className="pe-face-lab__badge pe-face-lab__badge--locked">
              locked
            </span>
          </h2>
          <p className="pe-face-lab__note">
            Calendar surface only · desk+mob locked · Pair 7 + fixed photo · no
            Mode · desk {calendarSessionPhotoMeta?.artboardDesk ?? "309×344"} ·
            mob {calendarSessionPhotoMeta?.artboardMob ?? "198×220"} · open{" "}
            <code>{calendarSessionPhotoMeta?.figmaDeskOpen ?? "42:290"}</code> /{" "}
            <code>{calendarSessionPhotoMeta?.figmaMobOpen ?? "42:328"}</code> ·
            closed{" "}
            <code>{calendarSessionPhotoMeta?.figmaDeskClosed ?? "42:311"}</code> /{" "}
            <code>{calendarSessionPhotoMeta?.figmaMobClosed ?? "42:340"}</code>.
            Photo holder fixed — swap src only.
          </p>
        </header>
        <ul className="pe-face-lab__row">
          <li className="pe-face-lab__item">
            <p className="pe-face-lab__state" aria-hidden="true">
              open
            </p>
            <CalendarSessionPhotoFaceCard
              card={CALENDAR_SESSION_PHOTO_FACE_OPEN}
            />
          </li>
          <li className="pe-face-lab__item">
            <p className="pe-face-lab__state" aria-hidden="true">
              closed
            </p>
            <CalendarSessionPhotoFaceCard
              card={CALENDAR_SESSION_PHOTO_FACE_CLOSED}
            />
          </li>
        </ul>
      </section>

      <section
        className="pe-face-lab__section"
        aria-labelledby="pe-face-program-compact-heading"
        data-face-layout="program_compact"
        data-face-status="locked"
        data-figma-mobile={programCompactMeta?.figmaMobClosed ?? "1:2992"}
      >
        <header className="pe-face-lab__header">
          <h2
            id="pe-face-program-compact-heading"
            className="pe-face-lab__heading pe-face-lab__heading--sub"
          >
            Pair 6 — program_compact
            <span className="pe-face-lab__badge pe-face-lab__badge--locked">
              locked
            </span>
          </h2>
          <p className="pe-face-lab__note">
            Desk+mob locked · {programCompactMeta?.artboardDesk ?? "304×461"} /{" "}
            {programCompactMeta?.artboardMob ?? "171×260"} · open{" "}
            <code>{programCompactMeta?.figmaDeskOpen ?? "1:2150"}</code> /{" "}
            <code>{programCompactMeta?.figmaMobOpen ?? "1:3032"}</code> · closed{" "}
            <code>{programCompactMeta?.figmaDeskClosed ?? "1:2151"}</code> /{" "}
            <code>{programCompactMeta?.figmaMobClosed ?? "1:2992"}</code>.
          </p>
        </header>
        <ul className="pe-face-lab__row">
          <li className="pe-face-lab__item">
            <p className="pe-face-lab__state" aria-hidden="true">
              open
            </p>
            <ProgramCompactFaceCard card={PROGRAM_COMPACT_FACE_OPEN} />
          </li>
          <li className="pe-face-lab__item">
            <p className="pe-face-lab__state" aria-hidden="true">
              closed
            </p>
            <ProgramCompactFaceCard card={PROGRAM_COMPACT_FACE_CLOSED} />
          </li>
        </ul>
      </section>

      <section
        className="pe-face-lab__section"
        id="pe-face-program-compact-sm"
        aria-labelledby="pe-face-program-compact-sm-heading"
        data-face-layout="program_compact_sm"
        data-face-status="locked"
        data-figma-mobile={programCompactSmMeta?.figmaMobClosed ?? "1:2992"}
      >
        <header className="pe-face-lab__header">
          <h2
            id="pe-face-program-compact-sm-heading"
            className="pe-face-lab__heading pe-face-lab__heading--sub"
          >
            Pair 9 — program_compact_sm
            <span className="pe-face-lab__badge pe-face-lab__badge--locked">
              locked
            </span>
          </h2>
          <p className="pe-face-lab__note">
            Pair 6 shell @ 80% · type full size ·{" "}
            {programCompactSmMeta?.artboardDesk ?? "243×369"} /{" "}
            {programCompactSmMeta?.artboardMob ?? "164×250"} · same Figma nodes as
            Pair 6 (derived).
          </p>
        </header>
        <ul className="pe-face-lab__row">
          <li className="pe-face-lab__item">
            <p className="pe-face-lab__state" aria-hidden="true">
              open
            </p>
            <ProgramCompactFaceCard
              card={{ ...PROGRAM_COMPACT_FACE_OPEN, id: "lab-pair9-open" }}
              size="sm"
            />
          </li>
          <li className="pe-face-lab__item">
            <p className="pe-face-lab__state" aria-hidden="true">
              closed
            </p>
            <ProgramCompactFaceCard
              card={{ ...PROGRAM_COMPACT_FACE_CLOSED, id: "lab-pair9-closed" }}
              size="sm"
            />
          </li>
        </ul>
      </section>

      <section
        className="pe-face-lab__section"
        id="pe-face-program-compact-sm-desk"
        aria-labelledby="pe-face-program-compact-sm-desk-heading"
        data-face-layout="program_compact_sm_desk"
        data-face-status="locked"
        data-figma-mobile={programCompactMeta?.figmaMobClosed ?? "1:2992"}
      >
        <header className="pe-face-lab__header">
          <h2
            id="pe-face-program-compact-sm-desk-heading"
            className="pe-face-lab__heading pe-face-lab__heading--sub"
          >
            Pair 10 — program_compact_sm_desk
            <span className="pe-face-lab__badge pe-face-lab__badge--locked">
              locked
            </span>
          </h2>
          <p className="pe-face-lab__note">
            Desk = Pair 9 @ 80% · {programCompactSmMeta?.artboardDesk ?? "243×369"} ·
            mob = Pair 6 full · {programCompactMeta?.artboardMob ?? "171×260"}{" "}
            (rendered ~205×312). Derived from Pair 6/9 nodes.
          </p>
        </header>
        <ul className="pe-face-lab__row">
          <li className="pe-face-lab__item">
            <p className="pe-face-lab__state" aria-hidden="true">
              open
            </p>
            <ProgramCompactFaceCard
              card={{ ...PROGRAM_COMPACT_FACE_OPEN, id: "lab-pair10-open" }}
              size="sm_desk"
            />
          </li>
          <li className="pe-face-lab__item">
            <p className="pe-face-lab__state" aria-hidden="true">
              closed
            </p>
            <ProgramCompactFaceCard
              card={{ ...PROGRAM_COMPACT_FACE_CLOSED, id: "lab-pair10-closed" }}
              size="sm_desk"
            />
          </li>
        </ul>
      </section>

      <section
        className="pe-face-lab__section"
        aria-labelledby="pe-face-promo-heading"
        data-face-layout="promo"
        data-face-status="locked"
        data-figma-mobile={promoMeta?.figmaMobClosed ?? "1:3119"}
      >
        <header className="pe-face-lab__header">
          <h2
            id="pe-face-promo-heading"
            className="pe-face-lab__heading pe-face-lab__heading--sub"
          >
            Pair 5 — promo
            <span className="pe-face-lab__badge pe-face-lab__badge--locked">
              locked
            </span>
          </h2>
          <p className="pe-face-lab__note">
            Desk+mob locked · {promoMeta?.artboardDesk ?? "996×300"} /{" "}
            {promoMeta?.artboardMob ?? "177×530"} · open{" "}
            <code>{promoMeta?.figmaDeskOpen ?? "1:1067"}</code> /{" "}
            <code>{promoMeta?.figmaMobOpen ?? "1:2372"}</code> · closed{" "}
            <code>{promoMeta?.figmaDeskClosed ?? "1:1206"}</code> /{" "}
            <code>{promoMeta?.figmaMobClosed ?? "1:3119"}</code>.
          </p>
        </header>
        <ul className="pe-face-lab__row">
          <li className="pe-face-lab__item">
            <p className="pe-face-lab__state" aria-hidden="true">
              open
            </p>
            <PromoFaceCard card={PROMO_FACE_OPEN} />
          </li>
          <li className="pe-face-lab__item">
            <p className="pe-face-lab__state" aria-hidden="true">
              closed
            </p>
            <PromoFaceCard card={PROMO_FACE_CLOSED} />
          </li>
        </ul>
      </section>

      <section
        className="pe-face-lab__section"
        aria-labelledby="pe-face-internship-heading"
        data-face-layout="internship"
        data-face-status="locked"
        data-figma-desktop={internshipMeta?.figmaDeskClosed ?? "18:342"}
        data-figma-mobile={internshipMeta?.figmaMobClosed ?? "1:3094"}
      >
        <header className="pe-face-lab__header">
          <h2
            id="pe-face-internship-heading"
            className="pe-face-lab__heading pe-face-lab__heading--sub"
          >
            Pair 4 — internship
            <span className="pe-face-lab__badge pe-face-lab__badge--locked">
              locked
            </span>
          </h2>
          <p className="pe-face-lab__note">
            Desk+mob locked · {internshipMeta?.artboardDesk ?? "224×371"} /{" "}
            {internshipMeta?.artboardMob ?? "175×290"} · open{" "}
            <code>{internshipMeta?.figmaDeskOpen ?? "18:320"}</code> /{" "}
            <code>{internshipMeta?.figmaMobOpen ?? "1:3068"}</code> · closed{" "}
            <code>{internshipMeta?.figmaDeskClosed ?? "18:342"}</code> /{" "}
            <code>{internshipMeta?.figmaMobClosed ?? "1:3094"}</code>.
          </p>
        </header>
        <ul className="pe-face-lab__row">
          <li className="pe-face-lab__item">
            <p className="pe-face-lab__state" aria-hidden="true">
              open
            </p>
            <InternshipFaceCard card={INTERNSHIP_FACE_OPEN} />
          </li>
          <li className="pe-face-lab__item">
            <p className="pe-face-lab__state" aria-hidden="true">
              closed
            </p>
            <InternshipFaceCard card={INTERNSHIP_FACE_CLOSED} />
          </li>
        </ul>
      </section>

      <section
        className="pe-face-lab__section"
        id="pe-face-program-full"
        aria-labelledby="pe-face-program-full-heading"
        data-face-layout="program_full"
        data-face-status="locked"
        data-figma-desktop={programFullMeta?.figmaDeskClosed ?? "1:1882"}
        data-figma-mobile={programFullMeta?.figmaMobOpen ?? "91:2908"}
      >
        <header className="pe-face-lab__header">
          <h2
            id="pe-face-program-full-heading"
            className="pe-face-lab__heading pe-face-lab__heading--sub"
          >
            Pair 3 — program_full
            <span className="pe-face-lab__badge pe-face-lab__badge--locked">
              locked
            </span>
          </h2>
          <p className="pe-face-lab__note">
            Desk invite tall · {programFullMeta?.artboardDesk ?? "366×727"} · open{" "}
            <code>{programFullMeta?.figmaDeskOpen ?? "1:1830"}</code> · closed{" "}
            <code>{programFullMeta?.figmaDeskClosed ?? "1:1882"}</code>. Mob open
            own chrome · {programFullMeta?.artboardMob ?? "283×389"} (cas-v6{" "}
            <code>{programFullMeta?.figmaMobOpen ?? "91:2908"}</code> @ 80% shell,
            type full ≥14) · ≤600 only · closed mob deferred. Heart filled
            (visual).
          </p>
        </header>
        <ul className="pe-face-lab__row">
          <li className="pe-face-lab__item">
            <p className="pe-face-lab__state" aria-hidden="true">
              open
            </p>
            <ProgramFullFaceCard card={PROGRAM_FULL_FACE_OPEN} />
          </li>
          <li className="pe-face-lab__item">
            <p className="pe-face-lab__state" aria-hidden="true">
              closed
            </p>
            <ProgramFullFaceCard card={PROGRAM_FULL_FACE_CLOSED} />
          </li>
        </ul>
      </section>

      <section
        className="pe-face-lab__section"
        aria-labelledby="pe-face-cvready-heading"
        data-face-layout="cvready"
        data-face-status="locked"
        data-figma-desktop={cvreadyMeta?.figmaDeskClosed ?? "1:1532"}
        data-figma-mobile={cvreadyMeta?.figmaMobClosed ?? "1:3246"}
      >
        <header className="pe-face-lab__header">
          <h2 id="pe-face-cvready-heading" className="pe-face-lab__heading pe-face-lab__heading--sub">
            Pair 1 — cvready
            <span className="pe-face-lab__badge pe-face-lab__badge--locked">
              locked
            </span>
          </h2>
          <p className="pe-face-lab__note">
            Desk + mob open/closed · {cvreadyMeta?.artboardDesk ?? "996×300"} /{" "}
            {cvreadyMeta?.artboardMob ?? "177×530"}.
          </p>
        </header>
        <ul className="pe-face-lab__row">
          <li className="pe-face-lab__item">
            <p className="pe-face-lab__state" aria-hidden="true">
              open
            </p>
            <CvreadyFaceCard card={CVREADY_FACE_OPEN} />
          </li>
          <li className="pe-face-lab__item">
            <p className="pe-face-lab__state" aria-hidden="true">
              closed
            </p>
            <CvreadyFaceCard card={CVREADY_FACE_CLOSED} />
          </li>
        </ul>
      </section>

      <section
        className="pe-face-lab__section"
        id="pe-face-event-session"
        aria-labelledby="pe-face-lab-heading"
        data-face-layout="event_session"
        data-face-status="locked"
      >
        <header className="pe-face-lab__header">
          <h2 id="pe-face-lab-heading" className="pe-face-lab__heading pe-face-lab__heading--sub">
            Pair 2 — event_session
            <span className="pe-face-lab__badge pe-face-lab__badge--locked">
              locked
            </span>
          </h2>
          <p className="pe-face-lab__note">
            Open + closed pair. Desk {eventMeta?.artboardDesk ?? "383×592"} · Mob{" "}
            {eventMeta?.artboardMob ?? "176×761"} (Pair 2 only). Centered stage.
          </p>
        </header>
        <ul className="pe-face-lab__row">
          <li className="pe-face-lab__item">
            <p className="pe-face-lab__state" aria-hidden="true">
              open
            </p>
            <PurpleEventsFaceCard card={FACE_CARD_OPEN} />
          </li>
          <li className="pe-face-lab__item">
            <p className="pe-face-lab__state" aria-hidden="true">
              closed
            </p>
            <PurpleEventsFaceCard card={FACE_CARD_CLOSED} />
          </li>
        </ul>
      </section>

      {PENDING_FACE_LAYOUTS.map((layout) => (
        <PendingFaceSection key={layout.id} layout={layout} />
      ))}
    </div>
  );
}
