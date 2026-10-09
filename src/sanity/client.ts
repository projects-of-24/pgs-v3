/**
 * Parallel Sanity trial — read client for preview pages.
 * Writes happen only inside Sanity Studio (Sanity Cloud), never via Ops APIs.
 */
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const sanityClient = createClient({
  projectId: projectId || "missing",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published"
});
