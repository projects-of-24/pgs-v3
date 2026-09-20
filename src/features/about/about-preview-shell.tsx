/**
 * Family — public About Us body.
 * Desktop Figma `17057:13203` · Mobile `508:8361`.
 * No black side-test banner — body starts at closed toggle (shell margin-top clamp).
 */
import { AboutAdvisory } from "./about-advisory";
import { AboutAudience } from "./about-audience";
import { AboutEcosystem } from "./about-ecosystem";
import { AboutFaq } from "./about-faq";
import { AboutFounder } from "./about-founder";
import { AboutHero } from "./about-hero";
import { AboutHistory } from "./about-history";
import { AboutIntro } from "./about-intro";
import { AboutLiveActivity } from "./about-live-activity";
import { AboutNews } from "./about-news";
import { AboutOnline } from "./about-online";
import { AboutOutro } from "./about-outro";
import { AboutTimeline } from "./about-timeline";
import { AboutUsp } from "./about-usp";
import { AboutWhy } from "./about-why";
import "./about-preview-shell.css";
import "./about-ipad-type.css";

type AboutPreviewShellProps = {
  /** Live route — same body as preview; marks `data-cutover=LIVE`. */
  live?: boolean;
};

export function AboutPreviewShell({ live = false }: AboutPreviewShellProps) {
  return (
    <div
      className="about-preview-shell"
      data-pgs-module="about-preview"
      data-about-family="public"
      data-figma-desktop="17057:13203"
      data-figma-mobile="508:8361"
      data-shell-gate="p0"
      data-block-gate="a13"
      data-cutover={live ? "LIVE" : "preview"}
    >
      <div className="about-preview-shell__body">
        <div className="about-preview-shell__univ-gap" aria-hidden="true" />
        <AboutHero />
        <AboutIntro />
        <AboutLiveActivity />
        <AboutWhy />
        <AboutAudience />
        <AboutUsp />
        <AboutOnline />
        <AboutHistory />
        <AboutTimeline />
        <AboutFounder />
        <AboutAdvisory />
        <AboutNews />
        <AboutEcosystem />
        <AboutOutro />
        <AboutFaq />
      </div>
    </div>
  );
}
