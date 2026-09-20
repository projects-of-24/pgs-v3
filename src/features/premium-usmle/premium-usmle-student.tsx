/**
 * #premiumUSMLE student quote — U8.
 * Below the competition capsule, on the white page, not in the grey.
 * Desktop: words only. Photo already sits beside the ticket.
 * Phone: words left, photo right.
 */
import { PREMIUM_USMLE_STUDENT } from "./content";
import "./premium-usmle-student.css";

export function PremiumUsmleStudent() {
  const c = PREMIUM_USMLE_STUDENT;

  return (
    <section className="premium-usmle-student" data-pgs-module="premium-usmle-student" data-block-gate="u8">
      <blockquote className="premium-usmle-student__quote">
        <span className="premium-usmle-student__mark" aria-hidden="true">
          “
        </span>
        <p className="premium-usmle-student__desk">{c.desk}</p>
        <p className="premium-usmle-student__phone">{c.phone}</p>
        <span className="premium-usmle-student__mark premium-usmle-student__mark--end" aria-hidden="true">
          ”
        </span>
      </blockquote>
      <div className="premium-usmle-student__photo">
        <img src={c.photoSrc} alt={c.photoAlt} />
      </div>
    </section>
  );
}
