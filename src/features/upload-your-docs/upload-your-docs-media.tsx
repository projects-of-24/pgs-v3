/**
 * Media band — Family A A4 · Family B B4 (same still).
 * Desktop A `18375:11666` / B `17041:15938` · Mobile A `217:4597` / B `217:3926`.
 * Still image (Figma frame named “video”); asset = team-goal.png.
 */
import Image from "next/image";
import "./upload-your-docs-media.css";

const MEDIA_SRC = "/assets/img/team-goal.png";

export function UploadYourDocsMedia() {
  return (
    <section
      className="uyd-media"
      data-pgs-module="upload-your-docs-media"
      data-block-gate="media"
      data-figma-desktop-a="18375:11666"
      data-figma-desktop-b="17041:15938"
      data-figma-mobile-a="217:4597"
      data-figma-mobile-b="217:3926"
      aria-label="Upload your docs media"
    >
      <div className="uyd-media__frame">
        <Image
          className="uyd-media__img"
          src={MEDIA_SRC}
          alt=""
          width={1267}
          height={565}
          unoptimized
          priority={false}
        />
      </div>
    </section>
  );
}
