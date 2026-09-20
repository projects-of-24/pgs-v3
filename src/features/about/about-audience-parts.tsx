import type { ABOUT_AUDIENCE } from "./content";

type AudiencePart = (typeof ABOUT_AUDIENCE)["rows"][number]["who"][number];

export function AboutAudienceParts({
  parts
}: {
  parts: readonly AudiencePart[];
}) {
  return (
    <>
      {parts.map((part, i) => {
        if (part.emphasis === "bold") {
          return (
            <strong key={i} className="about-audience__strong">
              {part.text}
            </strong>
          );
        }
        if (part.emphasis === "boldItalic") {
          return (
            <strong key={i} className="about-audience__strong-italic">
              {part.text}
            </strong>
          );
        }
        return <span key={i}>{part.text}</span>;
      })}
    </>
  );
}
