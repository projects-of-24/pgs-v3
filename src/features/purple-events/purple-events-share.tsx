/**
 * Purple Events — E9 Share poster.
 * Desk plate Figma `17071:14067` (flat export) · section `17071:14062`.
 * Mob plate `551:7711` (flat export) · copy/socials from page frame.
 * Dense poster = Figma PNG export (not rebuilt HTML) so fern/logo/QR match.
 * Fixtures only — no DB.
 */
import { EVENT_SESSION_FIXTURE } from "./content";
import "./purple-events-share.css";

const SCRIBBLE = "/assets/img/purple-events/share/scribble-arrow.svg";

function ShareBody({ text, boldBits }: { text: string; boldBits: string[] }) {
  if (!boldBits.length) return <>{text}</>;
  const parts: Array<string | JSX.Element> = [];
  let rest = text;
  boldBits.forEach((bit, i) => {
    const idx = rest.indexOf(bit);
    if (idx === -1) return;
    if (idx > 0) parts.push(rest.slice(0, idx));
    parts.push(
      <strong key={`b-${i}`} className="pe-share__strong">
        {bit}
      </strong>
    );
    rest = rest.slice(idx + bit.length);
  });
  if (rest) parts.push(rest);
  return <>{parts}</>;
}

export function PurpleEventsShare() {
  const c = EVENT_SESSION_FIXTURE;
  const headingLines = c.shareHeading.split("\n");

  return (
    <section
      id="pe-e9"
      className="pe-share"
      data-pgs-module="purple-events-share"
      data-block-gate="e9"
      data-figma-desktop="17071:14067"
      data-figma-mobile="551:7711"
      aria-labelledby="pe-e9-heading"
    >
      <div className="pe-share__copy">
        <h2 id="pe-e9-heading" className="pe-share__heading">
          {headingLines.map((line) => (
            <span key={line} className="pe-share__heading-line">
              {line}
            </span>
          ))}
        </h2>
        <p className="pe-share__body">
          <ShareBody text={c.shareBody} boldBits={c.shareBodyBold} />
        </p>
      </div>

      <ul className="pe-share__socials pe-share__socials--mob" aria-label="Share on social">
        {c.socials.map((s) => (
          <li key={`mob-${s.id}`}>
            <a className="pe-share__social" href={s.href} aria-label={s.label}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.icon} alt="" width={23} height={23} />
            </a>
          </li>
        ))}
      </ul>

      <div className="pe-share__stage">
        <div className="pe-share__poster">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="pe-share__poster-img pe-share__poster-img--desk"
            src={c.posterDesk}
            alt="Event share poster — invitation for aspirants, dates, topics, and QR to join"
            width={600}
            height={600}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="pe-share__poster-img pe-share__poster-img--mob"
            src={c.posterMob}
            alt="Event share poster — invitation for aspirants, dates, topics, and QR to join"
            width={372}
            height={372}
          />
          <a
            className="pe-share__download"
            href={c.posterDownloadHref}
            download="purple-events-poster.png"
            aria-label="Download the poster"
          />
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="pe-share__scribble"
          src={SCRIBBLE}
          alt=""
          width={209}
          height={209}
          aria-hidden="true"
        />
      </div>

      <ul className="pe-share__socials pe-share__socials--desk" aria-label="Share on social">
        {c.socials.map((s) => (
          <li key={`desk-${s.id}`}>
            <a className="pe-share__social" href={s.href} aria-label={s.label}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.icon} alt="" width={46} height={46} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
