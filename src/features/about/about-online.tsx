/**
 * About Us — Online-first — A5.
 * Desktop `17057:13791` · Mobile `512:5595`.
 * Toggle: ON = Figma online copy · OFF = Hostinger `#offlineContent`.
 * Both panels stacked in one grid cell so block height stays stable (no jump).
 */
"use client";

import { useId, useState } from "react";
import { ABOUT_ONLINE } from "./content";
import "./about-online.css";

export function AboutOnline() {
  const c = ABOUT_ONLINE;
  const [online, setOnline] = useState(true);
  const labelId = useId();
  const onTitleId = useId();
  const offTitleId = useId();

  return (
    <section
      className="about-online"
      data-pgs-module="about-online"
      data-block-gate="a5"
      data-online={online ? "on" : "off"}
      aria-labelledby={online ? onTitleId : offTitleId}
    >
      <div className="about-online__inner">
        <div className="about-online__stage">
          <button
            type="button"
            className={`about-online__switch${online ? " about-online__switch--on" : " about-online__switch--off"}`}
            role="switch"
            aria-checked={online}
            aria-labelledby={labelId}
            onClick={() => setOnline((v) => !v)}
          >
            <span className="about-online__switch-body" aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="about-online__switch-knob"
              src={c.switchKnobSrc}
              alt=""
              width={39}
              height={37}
            />
          </button>
          <span id={labelId} className="about-online__sr-only">
            Toggle online-first approach
          </span>

          {/* Stacked panels: inactive stays in layout → height = max(ON, OFF). */}
          <div className="about-online__panels">
            <div
              className="about-online__panel"
              data-state="on"
              aria-hidden={!online}
            >
              <div className="about-online__titles">
                <h2 id={onTitleId} className="about-online__headline">
                  {c.on.headline}
                </h2>
                <p className="about-online__support">{c.on.support}</p>
              </div>
              <div className="about-online__footnote">
                <p className="about-online__footnote-p">{c.on.footnoteLead}</p>
                <p className="about-online__footnote-p">{c.on.footnoteClose}</p>
              </div>
            </div>

            <div
              className="about-online__panel"
              data-state="off"
              aria-hidden={online}
            >
              <div className="about-online__titles">
                <h2 id={offTitleId} className="about-online__headline">
                  {c.off.headline}
                </h2>
                <p className="about-online__support">{c.off.support}</p>
              </div>
              <div className="about-online__footnote">
                <p className="about-online__footnote-p">{c.off.footnote}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
