import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

/**
 * Parallel Sanity Studio — mounted at /sanity (not /studio).
 * Ops CMS at /ops/cms/courses is unchanged.
 */
export default defineConfig({
  name: "pgs-sanity-trial",
  title: "PGS Sanity trial (Courses)",
  projectId: projectId || "placeholder",
  dataset,
  basePath: "/sanity",
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: schemaTypes
  }
});
