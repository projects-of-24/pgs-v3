/**
 * Courses template — C9 Certificate + Why It Matters.
 * Desk frame `17072:11503` · C9a `17072:11504` · C9b `17072:11523`.
 * Mob `551:10515`. Owned CSS. Fixtures only. iPad 601–1366 deferred.
 */
import type { ProgramsCoursesView } from "./courses-template-view";
import "./programs-courses-certificate.css";

type ProgramsCoursesCertificateProps = {
  data: ProgramsCoursesView["certificate"];
};

export function ProgramsCoursesCertificate({
  data: c
}: ProgramsCoursesCertificateProps) {  const m = c.mock;

  return (
    <section
      id="pc-c9"
      className="pc-certificate"
      data-block-gate="c9"
      data-figma-desktop="17072:11503"
      data-figma-mobile="551:10515"
      aria-labelledby="pc-c9-title"
    >
      <div className="pc-certificate__plate">
        <div className="pc-certificate__copy">
          <h2 id="pc-c9-title" className="pc-certificate__headline">
            {c.headline}
          </h2>
          <div className="pc-certificate__why">
            <h3 className="pc-certificate__why-title">{c.whyTitle}</h3>
            <ul className="pc-certificate__checks">
              {c.checks.map((label) => (
                <li key={label} className="pc-certificate__check">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="pc-certificate__check-icon"
                    src={c.checkIcon}
                    alt=""
                    width={29}
                    height={29}
                    decoding="async"
                  />
                  <span className="pc-certificate__check-label">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Decorative certificate mock · desk `17072:11523` · mob `551:10535` */}
        <div className="pc-certificate__mock" aria-hidden="true">
          <p className="pc-certificate__ticket">{m.ticket}</p>
          <div className="pc-certificate__body">
            <div className="pc-certificate__main">
              <p className="pc-certificate__program">{m.programTitle}</p>
              <div className="pc-certificate__fields">
                <div className="pc-certificate__row">
                  <div className="pc-certificate__field">
                    <span className="pc-certificate__field-label">
                      {m.nameLabel}
                    </span>
                    <span className="pc-certificate__field-value">
                      {m.nameValue}
                    </span>
                  </div>
                  <div className="pc-certificate__field">
                    <span className="pc-certificate__field-label">
                      {m.dateLabel}
                    </span>
                    <span className="pc-certificate__field-value">
                      {m.dateValue}
                    </span>
                  </div>
                </div>
                <div className="pc-certificate__field pc-certificate__field--awarding">
                  <span className="pc-certificate__field-label">
                    {m.awardingLabel}
                  </span>
                  <span className="pc-certificate__field-value pc-certificate__field-value--medium">
                    {m.awardingValue}
                  </span>
                </div>
              </div>
            </div>
            <div className="pc-certificate__footer" />
            {m.seal.trim() ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="pc-certificate__seal"
                src={m.seal}
                alt=""
                width={102}
                height={122}
                decoding="async"
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
