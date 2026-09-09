/**
 * Shared Phase 4D student upload pipeline (W3).
 * upload-session → uploadToSignedUrl → finalize (sha256).
 */
"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const UPLOAD_DOCS_MAX_BYTES = 52_428_800;
export const UPLOAD_DOCS_ACCEPT = ".pdf,.jpg,.jpeg,.png,.doc,.docx";

export function createStudentDocumentStorageClient(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    "";
  if (!supabaseUrl || !supabaseKey) return null;
  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}

export async function sha256Hex(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function validateUploadFile(file: File): string | null {
  if (file.size < 1 || file.size > UPLOAD_DOCS_MAX_BYTES) {
    return "Use a PDF, JPG, PNG, DOC, or DOCX file up to 50 MB.";
  }
  return null;
}

type UploadSessionResponse = {
  message?: string;
  session_id?: string;
  bucket?: string;
  path?: string;
  token?: string;
};

/**
 * Authorize → direct Storage upload → finalize.
 * Cancels the session if Storage or finalize fails mid-flight.
 */
export async function uploadStudentDocument(args: {
  requirementId: string;
  file: File;
  storageClient: SupabaseClient;
  onStatus?: (message: string) => void;
}): Promise<{ ok: true; documentId: string } | { ok: false; message: string }> {
  const { requirementId, file, storageClient, onStatus } = args;
  const validation = validateUploadFile(file);
  if (validation) return { ok: false, message: validation };

  let sessionId: string | null = null;
  try {
    onStatus?.("Authorizing upload…");
    const authResponse = await fetch("/api/premium/documents/upload-session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        requirement_id: requirementId,
        filename: file.name,
        mime_type: file.type,
        byte_size: file.size
      })
    });
    const authResult = (await authResponse.json()) as UploadSessionResponse;
    if (!authResponse.ok || !authResult.session_id || !authResult.bucket || !authResult.path || !authResult.token) {
      return { ok: false, message: authResult.message ?? "Unable to authorize upload." };
    }
    sessionId = authResult.session_id;

    onStatus?.("Uploading to secure storage…");
    const { error: uploadError } = await storageClient.storage
      .from(authResult.bucket)
      .uploadToSignedUrl(authResult.path, authResult.token, file, {
        contentType: file.type,
        upsert: false
      });
    if (uploadError) {
      await fetch("/api/premium/documents/finalize", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ session_id: sessionId })
      }).catch(() => undefined);
      return { ok: false, message: uploadError.message || "Unable to upload the document." };
    }

    onStatus?.("Finalizing…");
    const hash = await sha256Hex(file);
    const finalizeResponse = await fetch("/api/premium/documents/finalize", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ session_id: sessionId, sha256: hash })
    });
    const finalizeResult = (await finalizeResponse.json()) as { message?: string; id?: string };
    if (!finalizeResponse.ok || typeof finalizeResult.id !== "string") {
      return { ok: false, message: finalizeResult.message ?? "Unable to finalize the document." };
    }
    return { ok: true, documentId: finalizeResult.id };
  } catch (error) {
    if (sessionId) {
      await fetch("/api/premium/documents/finalize", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ session_id: sessionId })
      }).catch(() => undefined);
    }
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unable to upload the document."
    };
  }
}
