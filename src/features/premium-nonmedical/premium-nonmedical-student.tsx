/**
 * #premiumNonMedical student photo and quote — N7, desktop only.
 * Photo sits in the empty space under the fast-track card.
 * Quote sits to the left of the photo’s lower half.
 * Desktop `17055:10883` + `17055:10879`. Phone waits.
 */
import { PREMIUM_NONMEDICAL_STUDENT } from "./content";
import "./premium-nonmedical-student.css";

export function PremiumNonmedicalStudent() {
  const c = PREMIUM_NONMEDICAL_STUDENT;

  return (
    <div className="premium-nonmedical-student" data-pgs-module="premium-nonmedical-student" data-block-gate="n7">
      <figure className="premium-nonmedical-student__stack">
        <span className="premium-nonmedical-student__sheet premium-nonmedical-student__sheet--coral" aria-hidden="true" />
        <span className="premium-nonmedical-student__sheet premium-nonmedical-student__sheet--green" aria-hidden="true" />
        <span className="premium-nonmedical-student__sheet premium-nonmedical-student__sheet--gold" aria-hidden="true" />
        <div className="premium-nonmedical-student__card">
          <img src={c.photoSrc} alt={c.photoAlt} width={322} height={338} />
          <p className="premium-nonmedical-student__name">{c.name}</p>
          <p className="premium-nonmedical-student__role">{c.role}</p>
          <p className="premium-nonmedical-student__place">{c.place}</p>
        </div>
      </figure>
      <blockquote className="premium-nonmedical-student__quote">
        <span className="premium-nonmedical-student__mark" aria-hidden="true">
          “
        </span>
        <p>{c.quote}</p>
        <span className="premium-nonmedical-student__mark premium-nonmedical-student__mark--end" aria-hidden="true">
          ”
        </span>
      </blockquote>
    </div>
  );
}
