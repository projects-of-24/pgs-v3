/**
 * Scholarship plan — S4.
 * Desktop strip `17041:18785` · checklist `17041:18793`.
 * Mobile `328:3150` / `328:3166` — widths Figma-exact (290 / 252 / 309), not 85% rail.
 * Owned CSS. Find CTA deferred to S5 (Figma order). Heart mark visual-only (motion polish later).
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: mobile body 14px
 * ISSUE: owner reading lock 16px
 * PGS IMPLEMENTATION: mobile body/checklist 16px via --sch-plan-* vars
 */
import { SCHOLARSHIP_PLAN } from "./content";
import "./scholarship-plan.css";

export function ScholarshipPlan() {
  const c = SCHOLARSHIP_PLAN;

  return (
    <section
      className="scholarship-plan"
      data-pgs-module="scholarship-plan"
      data-block-gate="s4"
      aria-labelledby="scholarship-plan-heading"
    >
      <div className="scholarship-plan__inner">
        <div className="scholarship-plan__strip">
          <div className="scholarship-plan__strip-top">
            <h2
              id="scholarship-plan-heading"
              className="scholarship-plan__strip-title"
            >
              {c.planTitle}
            </h2>
          </div>
          <div className="scholarship-plan__strip-bottom">
            <p className="scholarship-plan__apply">{c.applyLine}</p>
          </div>
          {/* Figma: absolute on strip seam (top ~64 / left ~138 of 562). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="scholarship-plan__heart"
            src={c.heartSrc}
            alt=""
            width={33}
            height={37}
          />
        </div>

        <div className="scholarship-plan__copy">
          {c.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="scholarship-plan__p">
              {p}
            </p>
          ))}
        </div>

        <div className="scholarship-plan__checklist-block">
          <h3 className="scholarship-plan__checklist-lead">{c.checklistLead}</h3>
          <ul className="scholarship-plan__checklist">
            {c.checklist.map((item) => (
              <li key={item} className="scholarship-plan__check-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="scholarship-plan__check"
                  src={c.checkIconSrc}
                  alt=""
                  width={29}
                  height={29}
                />
                <span className="scholarship-plan__check-text">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
