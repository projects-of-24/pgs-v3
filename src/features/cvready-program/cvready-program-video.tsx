/**
 * CV Ready Program hero video — CR-OPEN.
 * Desk frame `19054:15075` 1322×533 · filter overlay `19055:12410`.
 * Mob frame `19055:13342` 270×418 · filter below `19055:13357` (2 cols).
 * desk/mob src slots for later CMS; same file until then.
 * Autoplay muted loop; respects prefers-reduced-motion.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { CVREADY_PROGRAM_VIDEO } from "./content";
import { CvreadyProgramFilter } from "./cvready-program-filter";
import "./cvready-program-video.css";

function pickVideoSrc(): string {
  if (typeof window === "undefined") return CVREADY_PROGRAM_VIDEO.videoDeskSrc;
  return window.matchMedia("(max-width: 600px)").matches
    ? CVREADY_PROGRAM_VIDEO.videoMobSrc
    : CVREADY_PROGRAM_VIDEO.videoDeskSrc;
}

export function CvreadyProgramVideo() {
  const c = CVREADY_PROGRAM_VIDEO;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState(c.videoDeskSrc);

  useEffect(() => {
    function syncSrc() {
      const next = pickVideoSrc();
      setVideoSrc(next);
    }
    syncSrc();
    const mq = window.matchMedia("(max-width: 600px)");
    mq.addEventListener("change", syncSrc);
    return () => mq.removeEventListener("change", syncSrc);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      if (motionMq.matches) {
        el.pause();
        el.removeAttribute("autoplay");
      } else {
        el.setAttribute("autoplay", "");
        void el.play().catch(() => {
          /* gesture / policy — poster remains */
        });
      }
    };

    syncMotion();
    motionMq.addEventListener("change", syncMotion);
    return () => motionMq.removeEventListener("change", syncMotion);
  }, [videoSrc]);

  return (
    <section
      className="cvready-program-video"
      data-pgs-module="cvready-program-video"
      data-block-gate="cr-open"
      data-figma-desktop="19054:15075"
      data-figma-mobile="19055:13342"
      aria-label="Push your goals"
    >
      <div className="cvready-program-video__inner">
        <div className="cvready-program-video__card">
          <video
            ref={videoRef}
            className="cvready-program-video__player"
            key={videoSrc}
            poster={c.posterDeskSrc}
            width={c.frameDeskW}
            height={c.frameDeskH}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            aria-hidden="true"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>

          <p className="cvready-program-video__title" aria-hidden="true">
            {c.titleLines.map((line) => (
              <span key={line} className="cvready-program-video__title-line">
                {line}
              </span>
            ))}
          </p>

          <div className="cvready-program-video__filter cvready-program-video__filter--overlay">
            <CvreadyProgramFilter variant="overlay" />
          </div>
        </div>

        <div className="cvready-program-video__filter cvready-program-video__filter--below">
          <CvreadyProgramFilter variant="below" />
        </div>
      </div>
    </section>
  );
}
