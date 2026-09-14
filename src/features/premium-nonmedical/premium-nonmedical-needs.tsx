/**
 * #premiumNonMedical bento mosaic — N6.
 * Same card idea as the medical mosaic. Copy, icons, and positions are this Figma.
 * Desktop cards in `17055:10741`. Phone cards in `379:4363`.
 * Quote and photo are the next block.
 */
import { PREMIUM_NONMEDICAL_CALENDAR, PREMIUM_NONMEDICAL_NEEDS } from "./content";
import "./premium-nonmedical-needs.css";

function Pill({ lines }: { lines: string[] }) {
  return (
    <p className="premium-nonmedical-needs__pill">
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </p>
  );
}

export function PremiumNonmedicalNeeds() {
  const c = PREMIUM_NONMEDICAL_NEEDS;

  return (
    <div
      className="premium-nonmedical-needs"
      data-pgs-module="premium-nonmedical-needs"
      data-block-gate="n6"
    >
      <div className="premium-nonmedical-needs__board">
        <div className="premium-nonmedical-needs__col premium-nonmedical-needs__col--left">
          <article className="premium-nonmedical-needs__card premium-nonmedical-needs__card--short">
            <img src={c.icons.shortlist} alt="" width={30} height={30} />
            <Pill lines={["Smart shortlisting", "+", "Profile deep-dive"]} />
          </article>
          <article className="premium-nonmedical-needs__card premium-nonmedical-needs__card--alerts">
            <p className="premium-nonmedical-needs__marks">
              <img src={c.icons.scholarship} alt="" width={19} height={19} />
              <span aria-hidden="true">+</span>
              <img src={c.icons.visa} alt="" width={21} height={21} />
            </p>
            <Pill lines={["Scholarship alerts", "+", "Key Checklists"]} />
            <Pill lines={["Country-wise steps", "+", "Visa status"]} />
          </article>
        </div>

        <div className="premium-nonmedical-needs__col premium-nonmedical-needs__col--right">
        <article
          className="premium-nonmedical-needs__card premium-nonmedical-needs__card--calendar"
          aria-labelledby="premium-nonmedical-sessions-title"
        >
          <div className="premium-nonmedical-needs__sessions-head">
            <img src={c.icons.sessions} alt="" width={40} height={40} />
            <p id="premium-nonmedical-sessions-title">{c.sessionsTitle}</p>
          </div>
          <div className="premium-nonmedical-needs__calendar">
            <table>
              <caption className="premium-nonmedical-needs__calendar-caption">
                Sample month. The 19th is marked.
              </caption>
              <thead>
                <tr>
                  {c.weekdays.map((day) => (
                    <th key={day} scope="col" abbr={day}>
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PREMIUM_NONMEDICAL_CALENDAR.map((week) => (
                  <tr key={week[0]}>
                    {week.map((day) => (
                      <td key={day}>
                        {day === c.activeDay ? (
                          <span className="is-marked">{day}</span>
                        ) : (
                          day
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="premium-nonmedical-needs__card premium-nonmedical-needs__card--fast">
          <img src={c.icons.registration} alt="" width={32} height={32} />
          <Pill lines={["Fast-tracked applications", "+", "Result-driven SOP"]} />
        </article>

        <div className="premium-nonmedical-needs__note">
          <h2 id="premium-nonmedical-needs-title">{c.noteTitle}</h2>
          <p>{c.noteBody}</p>
        </div>
        </div>
      </div>
    </div>
  );
}
