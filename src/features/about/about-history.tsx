/**
 * About Us — Since 2006 history note — A6.
 * Desktop `17057:13800` · Mobile `517:5785`.
 * Decorative sticky window + history intro (timeline follows in A7).
 */
import { ABOUT_HISTORY } from "./content";
import "./about-history.css";

export function AboutHistory() {
  const c = ABOUT_HISTORY;

  return (
    <section
      className="about-history"
      data-pgs-module="about-history"
      data-block-gate="a6"
      aria-labelledby="about-history-title"
    >
      <div className="about-history__inner">
        <div className="about-history__note" aria-hidden="true">
          <div className="about-history__note-bar">
            <div className="about-history__note-dots">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.dotCloseSrc} alt="" width={11} height={11} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.dotHideSrc} alt="" width={11} height={11} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.dotHideSrc} alt="" width={11} height={11} />
            </div>
            <p className="about-history__note-label">{c.noteLabel}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="about-history__note-doc"
              src={c.docIconSrc}
              alt=""
              width={19}
              height={19}
            />
          </div>
          <div className="about-history__note-body">
            <p className="about-history__note-year">{c.year}</p>
          </div>
        </div>

        <div className="about-history__copy">
          <h2 id="about-history-title" className="about-history__lead">
            {c.lead}
          </h2>
          <p className="about-history__story">{c.story}</p>
        </div>
      </div>
    </section>
  );
}
