/**
 * W2 speed — mint short-lived signed Storage URLs when the Resource List loads,
 * so view click skips the API (no blank-tab wait on auth + audit + sign).
 */
import "server-only";

import {
  STUDENT_DOCUMENT_BUCKET,
  STUDENT_DOCUMENT_SIGNED_URL_SECONDS
} from "@/lib/document-access";
import type { DocumentRequirement } from "@/lib/premium-workspace";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  mapRequiredRequirementsToRows,
  type UploadDocsLiveRow
} from "./map-requirements";

function storagePathForRow(
  requirements: readonly DocumentRequirement[],
  row: UploadDocsLiveRow
): string | null {
  if (!row.documentId || !row.canView) return null;
  const requirement = requirements.find((item) => item.id === row.id);
  const documents = requirement?.student_documents ?? [];
  const active = [...documents]
    .filter((doc) => !doc.superseded_at && !doc.archived_at && !doc.purged_at)
    .sort((a, b) => b.version - a.version)[0];
  if (!active || active.id !== row.documentId) return null;
  const path = active.storage_path?.trim();
  return path && path.length > 0 ? path : null;
}

/** Map required rows and attach `viewHref` signed URLs (admin, after list auth). */
export async function mapRequiredRequirementsToRowsWithViewHrefs(
  requirements: readonly DocumentRequirement[]
): Promise<UploadDocsLiveRow[]> {
  const rows = mapRequiredRequirementsToRows(requirements);
  const admin = createSupabaseAdminClient();

  return Promise.all(
    rows.map(async (row) => {
      const path = storagePathForRow(requirements, row);
      if (!path) return { ...row, viewHref: null };

      const { data, error } = await admin.storage
        .from(STUDENT_DOCUMENT_BUCKET)
        .createSignedUrl(path, STUDENT_DOCUMENT_SIGNED_URL_SECONDS);
      if (error || !data?.signedUrl) return { ...row, viewHref: null };
      return { ...row, viewHref: data.signedUrl };
    })
  );
}
