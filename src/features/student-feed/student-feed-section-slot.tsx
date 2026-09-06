/**
 * Phase A placeholder for a feed body section not yet Figma-ported.
 * Locked overlay when `locked`; otherwise empty slot label only.
 */
import Image from "next/image";
import "./student-feed-section-slot.css";

const LOCK_SRC = "/assets/img/lock.png";

export type StudentFeedSectionSlotProps = {
  id: string;
  title: string;
  module: string;
  locked?: boolean;
  note?: string;
  minHeight?: number;
};

export function StudentFeedSectionSlot({
  id,
  title,
  module,
  locked = true,
  note = "Figma section pending",
  minHeight = 180
}: StudentFeedSectionSlotProps) {
  return (
    <section
      id={id}
      className={`student-feed-slot${locked ? " is-locked" : ""}`}
      data-pgs-module={module}
      data-feed-slot={id}
      aria-label={title}
      style={{ minHeight }}
    >
      <div className="student-feed-slot__label">
        <strong>{title}</strong>
        <span>{note}</span>
      </div>
      {locked ? (
        <div className="student-feed-slot__lock" role="img" aria-label="Section locked — Yet to Unlock Full Access">
          <Image src={LOCK_SRC} alt="" width={72} height={72} unoptimized />
          <p>Yet to Unlock Full Access</p>
        </div>
      ) : null}
    </section>
  );
}
