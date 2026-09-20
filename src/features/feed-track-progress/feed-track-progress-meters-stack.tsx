/**
 * Meters column — #draftMeter + #reviewQueue + #counselorNotes.
 * Family A: frost lock (`17041:14475`). Family B Premium: same width rail, no frost (`17041:13194`).
 * Desktop: ~780 centered. Mobile Premium unlocked: Figma ~35px side inset (`206:8075`).
 */
import Image from "next/image";
import type { ReactNode } from "react";
import "./feed-track-progress-meters-stack.css";

const LOCK_SRC = "/assets/img/figma-progress/meters-lock.svg";

type FeedTrackProgressMetersStackProps = {
  children: ReactNode;
  /** Family A default true. Premium: false (rail only, no forlocked). */
  locked?: boolean;
};

export function FeedTrackProgressMetersStack({
  children,
  locked = true
}: FeedTrackProgressMetersStackProps) {
  return (
    <div
      className={`ftp-meters-stack${locked ? "" : " ftp-meters-stack--unlocked"}`}
      data-pgs-module="feed-track-progress-meters-stack"
      data-figma-desktop={locked ? "17041:14475" : "17041:13194"}
      data-lock={locked ? "forlocked" : "unlocked"}
    >
      <div className="ftp-meters-stack__inner">{children}</div>
      {locked ? (
        <div className="ftp-meters-stack__forlocked" aria-hidden="true">
          <Image src={LOCK_SRC} alt="" width={216} height={216} unoptimized />
        </div>
      ) : null}
    </div>
  );
}
