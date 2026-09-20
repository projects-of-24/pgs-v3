/**
 * #premiumUSMLE student quote — U8.
 * Below the competition capsule, on the white page, not in the grey.
 * Desktop: words only. Photo already sits beside the ticket.
 * Phone: words left, photo right.
 */
import { PREMIUM_PLAB_STUDENT } from "./content";
import "./premium-plab-student.css";

export function PremiumPlabStudent() {
  const c = PREMIUM_PLAB_STUDENT;

  return (
    <section className="premium-plab-student" data-pgs-module="premium-plab-student" data-block-gate="u8">
      <blockquote className="premium-plab-student__quote">
        <span className="premium-plab-student__mark" aria-hidden="true">
          “
        </span>
        <p className="premium-plab-student__desk">{c.desk}</p>
        <p className="premium-plab-student__phone">{c.phone}</p>
        <span className="premium-plab-student__mark premium-plab-student__mark--end" aria-hidden="true">
          ”
        </span>
      </blockquote>
      <div className="premium-plab-student__photo">
        <img src={c.photoSrc} alt={c.photoAlt} />
      </div>
    </section>
  );
}
