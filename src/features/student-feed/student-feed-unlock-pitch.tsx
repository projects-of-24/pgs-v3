/**
 * Section — Unlock pitch NO / YES (locked feed only).
 * Desktop Figma `18375:11060` · Mobile derived from desktop (stack + width clamps).
 * Distinct from #helpHub CTA (`student-feed-help-hub` / Figma `18375:11127`).
 */
import Image from "next/image";
import "./student-feed-unlock-pitch.css";

const OPEN_LOCK_SRC = "/assets/img/figma-feed/unlock-pitch-open-lock.svg";
const CLOSED_LOCK_SRC = "/assets/img/figma-feed/unlock-pitch-lock-closed.svg";
const YES_ARROW_SRC = "/assets/img/figma-feed/unlock-pitch-yes-arrow.svg";

export type StudentFeedUnlockPitchProps = {
  /** When true (Premium), section is omitted. */
  premiumActive?: boolean;
};

export function StudentFeedUnlockPitch({ premiumActive = false }: StudentFeedUnlockPitchProps) {
  if (premiumActive) return null;

  return (
    <section
      className="student-feed-unlock-pitch"
      data-pgs-module="student-feed-unlock-pitch"
      data-figma-desktop="18375:11060"
      data-figma-mobile-ref="206:6665"
      aria-label="Unlock with Purple Premium"
    >
      <div className="student-feed-unlock-pitch__inner">
        {/* NO — locked path */}
        <div className="student-feed-unlock-pitch__no">
          <div className="student-feed-unlock-pitch__lock-box" aria-hidden="true">
            <Image
              className="student-feed-unlock-pitch__lock-closed"
              src={CLOSED_LOCK_SRC}
              alt=""
              width={93}
              height={93}
              unoptimized
            />
          </div>
          <p className="student-feed-unlock-pitch__label is-no">no</p>
          <p className="student-feed-unlock-pitch__no-copy">
            Don&apos;t get stuck figuring it all out! Get the full dashboard access, mentor
            support, and admissions help
          </p>
        </div>

        {/* YES — unlock path (Help Hub link deferred → popup / Zoho) */}
        <div className="student-feed-unlock-pitch__yes">
          <div className="student-feed-unlock-pitch__yes-visual">
            <p className="student-feed-unlock-pitch__label is-yes">yes</p>
            <Image
              className="student-feed-unlock-pitch__yes-arrow"
              src={YES_ARROW_SRC}
              alt=""
              width={80}
              height={80}
              unoptimized
              aria-hidden="true"
            />
            <Image
              className="student-feed-unlock-pitch__lock-open"
              src={OPEN_LOCK_SRC}
              alt=""
              width={144}
              height={198}
              unoptimized
              aria-hidden="true"
            />
          </div>
          <p className="student-feed-unlock-pitch__yes-copy">
            Unlock the full dashboard experience{" "}
            <mark className="student-feed-unlock-pitch__mark">with #PurplePremium</mark> we accept
            only a{" "}
            <mark className="student-feed-unlock-pitch__mark">
              limited number of seats each month
            </mark>
            , connect with our Help Hub to get in.
            {/* Help Hub destination: popup / Zoho — wire later (owner). */}
          </p>
        </div>
      </div>
    </section>
  );
}
