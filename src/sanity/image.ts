import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId: projectId || "missing", dataset });

export function urlForImage(source: SanityImageSource | null | undefined): string {
  if (!source) return "";
  try {
    return builder.image(source).auto("format").url() || "";
  } catch {
    return "";
  }
}
