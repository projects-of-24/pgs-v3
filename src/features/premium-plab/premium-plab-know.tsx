/**
 * #premiumUSMLE black-card header — U10.
 * Under the kick line. Title left, brand and passing rates right.
 * Phone stacks the same words. U11 essay row is desktop only.
 * Desktop `17055:14244` · phone `433:5222`.
 */
import { PREMIUM_PLAB_KNOW } from "./content";
import "./premium-plab-know.css";

export function PremiumPlabKnow() {
  const c = PREMIUM_PLAB_KNOW;

  return (
    <section className="premium-plab-know" data-pgs-module="premium-plab-know" data-block-gate="u10" aria-labelledby="premium-plab-know-title">
      <div className="premium-plab-know__card">
        <h2 id="premium-plab-know-title" className="premium-plab-know__title">
          <span className="premium-plab-know__kicker">{c.kicker}</span>
          <span className="premium-plab-know__word">{c.word}</span>
        </h2>
        <div className="premium-plab-know__aside">
          <p className="premium-plab-know__brand">{c.brand}</p>
          <div className="premium-plab-know__stats">
            <p className="premium-plab-know__stats-label">{c.statsLabel}</p>
            <p className="premium-plab-know__stats-note">{c.statsNote}</p>
            <ul className="premium-plab-know__rates">
              {c.rates.map((rate) => (
                <li key={rate.name} className="premium-plab-know__rate">
                  <span className="premium-plab-know__rate-copy">
                    <span className="premium-plab-know__rate-value">{rate.value}</span>
                    <span className="premium-plab-know__rate-name">{rate.name}</span>
                  </span>
                  <img className="premium-plab-know__ring" src={rate.ring} alt="" width={30} height={30} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="premium-plab-know__story">
          <div className="premium-plab-know__essay">
            <p className="premium-plab-know__essay-lead">{c.lead}</p>
            <p className="premium-plab-know__essay-body">{c.body}</p>
          </div>
          <div className="premium-plab-know__years">
            <img className="premium-plab-know__years-frame" src={c.yearsFrame} alt="" />
            <p className="premium-plab-know__years-copy">{c.years}</p>
            <img className="premium-plab-know__years-cursor" src={c.yearsCursor} alt="" width={19} height={19} />
          </div>
          <div className="premium-plab-know__window">
            <p className="premium-plab-know__window-lead">{c.windowLead}</p>
            <div className="premium-plab-know__window-side">
              <p className="premium-plab-know__window-example">{c.windowExample}</p>
              <ul className="premium-plab-know__window-list">
                {c.windows.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <ol className="premium-plab-know__steps">
            {c.steps.map((step) => (
              <li key={step.name} className="premium-plab-know__step">
                <p className="premium-plab-know__step-name">{step.name}</p>
                <ul className="premium-plab-know__step-lines">
                  {step.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <div className="premium-plab-know__residency">
            <p className="premium-plab-know__residency-label">{c.residencyLabel}</p>
            <p className="premium-plab-know__residency-body">
              {c.residencyLines[0]}
              <br />
              {c.residencyLines[1]}
            </p>
          </div>
          <p className="premium-plab-know__match">{c.match}</p>
          <div className="premium-plab-know__offer">
            <h3 className="premium-plab-know__offer-title">
              {c.offerTitle[0].slice(0, c.offerTitle[0].indexOf("#"))}
              <br className="premium-plab-know__offer-break" />
              {c.offerTitle[0].slice(c.offerTitle[0].indexOf("#"))}
              <br />
              {c.offerTitle[1]}
            </h3>
            <div className="premium-plab-know__offer-row">
              <div className="premium-plab-know__network">
                <p className="premium-plab-know__network-lead">{c.networkLead}</p>
                <p className="premium-plab-know__network-body">{c.networkBody}</p>
              </div>
              <div className="premium-plab-know__checklist">
                <h4 className="premium-plab-know__checklist-title">{c.checklistTitle}</h4>
                <ul className="premium-plab-know__checklist-list">
                  {c.checklist.map((item) => (
                    <li key={item}>
                      <span className="premium-plab-know__checklist-mark" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="premium-plab-know__forms">
              <p className="premium-plab-know__forms-title">{c.formsTitle}</p>
              <ul className="premium-plab-know__forms-list">
                {c.forms.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="premium-plab-know__prep">
              <p className="premium-plab-know__prep-title">{c.prepTitle}</p>
              <p className="premium-plab-know__prep-body">
                {c.prepLines[0]}
                <br />
                {c.prepLines[1]}
                <br />
                {c.prepLines[2]}
              </p>
            </div>
            <button type="button" className="premium-plab-know__join">
              {c.joinLabel}
            </button>
            <div className="premium-plab-know__offers">
              <p className="premium-plab-know__offers-title">{c.matchTitle}</p>
              <p className="premium-plab-know__offers-note">{c.matchNote}</p>
              <p className="premium-plab-know__offers-title">{c.visaTitle}</p>
              <p className="premium-plab-know__offers-title">{c.cvTitle}</p>
            </div>
            <div className="premium-plab-know__conference">
              <img className="premium-plab-know__conference-icon" src={c.conferenceIcon} alt="" width={34} height={34} />
              <p className="premium-plab-know__conference-copy">
                {c.conferenceLines[0]}{" "}
                <br />
                {c.conferenceLines[1]}{" "}
                <br />
                {c.conferenceLines[2]}{" "}
                <br />
                {c.conferenceLines[3]}
              </p>
            </div>
            <div className="premium-plab-know__sessions">
              <img className="premium-plab-know__sessions-icon" src={c.sessionsIcon} alt="" width={40} height={40} />
              <div className="premium-plab-know__sessions-copy">
                <p className="premium-plab-know__sessions-title">{c.sessionsTitle}</p>
                <div className="premium-plab-know__cal" aria-hidden="true">
                  {c.sessionDays.map((day) => (
                    <span key={day} className="premium-plab-know__cal-day">
                      {day}
                    </span>
                  ))}
                  {c.sessionDates.map((date) => (
                    <span
                      key={date}
                      className={date === c.sessionBooked ? "premium-plab-know__cal-date is-booked" : "premium-plab-know__cal-date"}
                    >
                      {date}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="premium-plab-know__offer-photo">
            <img src={c.offerPhoto} alt="" width={209} height={118} />
          </div>
        </div>
      </div>
    </section>
  );
}
