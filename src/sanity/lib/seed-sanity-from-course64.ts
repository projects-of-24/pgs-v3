/**
 * Push course 64 Ops preview body into a Sanity course document (parallel trial).
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "next-sanity";
import type { CoursesTemplateBodyV1 } from "@/features/programs-courses/courses-template-schema";
import { buildFullStackBootcampDummyBody } from "@/features/programs-courses/full-stack-bootcamp-dummy";
import { parseCoursesDetailBody } from "@/features/programs-courses/courses-detail-body-builder";
import {
  templateBodyToSanityDocument,
  type SanityImageUploadHint
} from "@/sanity/lib/template-body-to-sanity-document";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const DEFAULT_DOC_ID = "125ffefb-af81-47f4-8c28-f754944bdc69";

/** Vitest / node do not load .env.local like Next — fill missing keys from file. */
function loadEnvLocal(): void {
  for (const name of [".env.local", ".env"]) {
    const path = resolve(process.cwd(), name);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, "utf8").split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const i = t.indexOf("=");
      if (i < 1) continue;
      const k = t.slice(0, i).trim();
      let v = t.slice(i + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      if (process.env[k] === undefined || process.env[k] === "") process.env[k] = v;
    }
  }
}

function absoluteUrl(relativeOrAbsolute: string, siteUrl: string): string {
  if (/^https?:\/\//i.test(relativeOrAbsolute)) return relativeOrAbsolute;
  const base = siteUrl.replace(/\/$/, "");
  const path = relativeOrAbsolute.startsWith("/") ? relativeOrAbsolute : `/${relativeOrAbsolute}`;
  return `${base}${path}`;
}

async function uploadImage(
  client: ReturnType<typeof createClient>,
  siteUrl: string,
  hint: SanityImageUploadHint
): Promise<{ _type: "image"; asset: { _type: "reference"; _ref: string } } | undefined> {
  try {
    const url = absoluteUrl(hint.url, siteUrl);
    const res = await fetch(url);
    if (!res.ok) return undefined;
    const buffer = Buffer.from(await res.arrayBuffer());
    const name = url.split("/").pop() || "image.jpg";
    const asset = await client.assets.upload("image", buffer, { filename: name });
    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  } catch {
    return undefined;
  }
}

function applyImageHint(fields: Record<string, unknown>, hint: SanityImageUploadHint, image: NonNullable<Awaited<ReturnType<typeof uploadImage>>>): void {
  const nested = hint.field.match(/^([a-zA-Z]+)\.(\d+)\.([a-zA-Z]+)$/);
  if (nested) {
    const [, arrName, indexStr, prop] = nested;
    const arr = fields[arrName!];
    if (Array.isArray(arr)) {
      const row = arr[Number(indexStr)] as Record<string, unknown> | undefined;
      if (row) row[prop!] = image;
    }
    return;
  }
  fields[hint.field] = image;
}

async function loadCourse64Body(): Promise<{
  body: CoursesTemplateBodyV1;
  flat: { title?: string; startsOn?: string; endsOn?: string; brochureDownloadUrl?: string };
}> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && key) {
    const supabase = createSupabaseClient(url, key, { auth: { persistSession: false } });
    const { data: latest } = await supabase
      .from("catalog_draft_revisions")
      .select("values")
      .eq("entity_type", "courses")
      .eq("entity_id", 64)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    const values = latest?.values as Record<string, unknown> | undefined;
    const parsed = values?.detail_body ? parseCoursesDetailBody(values.detail_body) : null;
    if (parsed) {
      return {
        body: parsed,
        flat: {
          title: typeof values?.title === "string" ? values.title : undefined,
          startsOn: typeof values?.starts_on === "string" ? values.starts_on : undefined,
          endsOn: typeof values?.ends_on === "string" ? values.ends_on : undefined,
          brochureDownloadUrl: undefined
        }
      };
    }
  }
  const body = buildFullStackBootcampDummyBody("64");
  return {
    body,
    flat: {
      title: "FULL STACK WEB DEVELOPMENT BOOTCAMP JAN 2026",
      startsOn: "2026-01-15",
      endsOn: "2026-02-28"
    }
  };
}

export async function seedSanityCourseFromCourse64(): Promise<{ documentId: string; previewUrl: string }> {
  loadEnvLocal();

  const token = process.env.SANITY_API_WRITE_TOKEN?.trim();
  if (!token) {
    throw new Error(
      "SANITY_API_WRITE_TOKEN is required. Add it to .env.local (Sanity Manage → API → Tokens → Editor)."
    );
  }
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "";
  if (!projectId) {
    throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is required in .env.local.");
  }
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2025-01-01";

  const documentId = process.env.SANITY_COURSE_DOCUMENT_ID?.trim() || DEFAULT_DOC_ID;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:7000";

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false
  });

  const { body, flat } = await loadCourse64Body();
  const { fields, imageUploads } = templateBodyToSanityDocument(body, flat);

  for (const hint of imageUploads) {
    const image = await uploadImage(client, siteUrl, hint);
    if (!image) continue;
    applyImageHint(fields, hint, image);
  }

  await client.createOrReplace({
    _id: documentId,
    _type: "course",
    ...fields
  });

  const slug = typeof fields.slug === "object" && fields.slug && "current" in (fields.slug as object)
    ? String((fields.slug as { current?: string }).current)
    : "demo-course";

  return {
    documentId,
    previewUrl: `/preview/sanity-courses/${slug}`
  };
}
