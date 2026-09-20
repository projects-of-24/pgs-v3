/**
 * #premiumUSMLE student quote — U8.
 * Below the competition capsule, on the white page, not in the grey.
 * Desktop: words only. Photo already sits beside the ticket.
 * Phone: words left, photo right.
 */
import { PREMIUM_AMC_STUDENT } from "./content";
import "./premium-amc-student.css";

export function PremiumAmcStudent() {
  const c = PREMIUM_AMC_STUDENT;

  return (
    <section className="premium-amc-student" data-pgs-module="premium-amc-student" data-block-gate="u8">
      <blockquote className="premium-amc-student__quote">
        <span className="premium-amc-student__mark" aria-hidden="true">
          “
        </span>
        <p className="premium-amc-student__desk">{c.desk}</p>
        <p className="premium-amc-student__phone">{c.phone}</p>
        <span className="premium-amc-student__mark premium-amc-student__mark--end" aria-hidden="true">
          ”
        </span>
      </blockquote>
      <div className="premium-amc-student__photo">
        <img src={c.photoSrc} alt={c.photoAlt} />
      </div>
    </section>
  );
}
