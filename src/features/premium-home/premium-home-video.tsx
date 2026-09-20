/**
 * purplePREMIUM HOME hero video — H2.
 * Desktop `17052:8162` · Mobile `366:4088`.
 * Display still stays in the same card frame. Play swaps to desk/mob MP4 fixtures.
 * Owned CSS/JS only — no Hostinger overlay.
 */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PREMIUM_HOME_VIDEO } from "./content";
import "./premium-home-video.css";

function pickVideoSrc(mobileMax = 600): string {
  if (typeof window === "undefined") return PREMIUM_HOME_VIDEO.videoDeskSrc;
  return window.matchMedia(`(max-width: ${mobileMax}px)`).matches
    ? PREMIUM_HOME_VIDEO.videoMobSrc
    : PREMIUM_HOME_VIDEO.videoDeskSrc;
}

export function PremiumHomeVideo() {
  const c = PREMIUM_HOME_VIDEO;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [videoSrc, setVideoSrc] = useState(c.videoDeskSrc);

  useEffect(() => {
    const sync = () => setVideoSrc(pickVideoSrc());
    sync();
    const mq = window.matchMedia("(max-width: 600px)");
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const stopPlayback = useCallback(() => {
    const el = videoRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
    setPlaying(false);
  }, []);

  const startPlayback = useCallback(() => {
    setPlaying(true);
    requestAnimationFrame(() => {
      const el = videoRef.current;
      if (!el) return;
      el.src = pickVideoSrc();
      void el.play().catch(() => {
        /* autoplay may be blocked until gesture — click already is a gesture */
      });
    });
  }, []);

  useEffect(() => {
    if (!playing) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") stopPlayback();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing, stopPlayback]);

  return (
    <section
      className="premium-home-video"
      data-pgs-module="premium-home-video"
      data-block-gate="h2-play"
      data-playing={playing ? "true" : "false"}
      aria-label="Step into #PurplePremium"
    >
      <div className="premium-home-video__inner">
        <div className="premium-home-video__card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="premium-home-video__img"
            src={c.imageSrc}
            alt={c.imageAlt}
            width={1322}
            height={533}
            hidden={playing}
          />

          <video
            ref={videoRef}
            className="premium-home-video__player"
            controls
            playsInline
            preload="metadata"
            hidden={!playing}
            aria-label={c.playLabel}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>

          {!playing ? (
            <>
              <div className="premium-home-video__overlay">
                <button
                  type="button"
                  className="premium-home-video__play"
                  onClick={startPlayback}
                >
                  <span className="sr-only">{c.playLabel}</span>
                  <svg
                    className="premium-home-video__play-icon"
                    viewBox="0 0 48 48"
                    width="48"
                    height="48"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <circle
                      cx="24"
                      cy="24"
                      r="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path d="M20 16.5v15l12-7.5z" fill="currentColor" />
                  </svg>
                </button>

                <p className="premium-home-video__brand" aria-hidden="true">
                  <span className="premium-home-video__brand-line">
                    {c.brandLine1}
                  </span>
                  <span className="premium-home-video__brand-line">
                    {c.brandLine2}
                  </span>
                </p>
              </div>

              <div className="premium-home-video__cue" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="premium-home-video__arrow premium-home-video__arrow--desk"
                  src={c.arrowDeskSrc}
                  alt=""
                  width={80}
                  height={80}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="premium-home-video__arrow premium-home-video__arrow--mob"
                  src={c.arrowMobSrc}
                  alt=""
                  width={64}
                  height={64}
                />
                <span className="premium-home-video__click">{c.clickLabel}</span>
              </div>
            </>
          ) : (
            <button
              type="button"
              className="premium-home-video__close"
              onClick={stopPlayback}
            >
              Close video
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
