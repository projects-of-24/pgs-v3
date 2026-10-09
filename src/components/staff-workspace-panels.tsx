"use client";

import {
  StaffWorkspaceAlertsPanel,
  StaffWorkspaceCommentsPanel,
  type StaffAlert
} from "@/components/workspace-desk-comments-panels";
import {
  StaffWorkspaceDocumentsPanel,
  StaffWorkspaceNotesPanel,
  StaffWorkspaceReviewNotesPanel,
  StaffWorkspaceReviewsPanel,
  type StaffNote
} from "@/components/workspace-desk-review-docs-panels";
import type { DocumentRequirement, PremiumWorkspace } from "@/lib/premium-workspace";

export type { StaffAlert, StaffNote };
export {
  StaffWorkspaceAlertsPanel,
  StaffWorkspaceCommentsPanel,
  StaffWorkspaceDocumentsPanel,
  StaffWorkspaceNotesPanel,
  StaffWorkspaceReviewNotesPanel,
  StaffWorkspaceReviewsPanel
};

type WorkspacePanelProps = {
  studentId: string;
  canManage: boolean;
  studentIdForComments: string;
  comments: PremiumWorkspace["comments"];
  authorLabels: Record<string, string>;
  alerts: StaffAlert[];
  reviews: PremiumWorkspace["reviews"];
  notes: StaffNote[];
  requirements: DocumentRequirement[];
};

/** Legacy combined panel — kept for any callers that still import the whole desk body. */
export function StaffWorkspacePanels(props: WorkspacePanelProps) {
  return (
    <>
      <StaffWorkspaceCommentsPanel {...props} />
      <StaffWorkspaceAlertsPanel studentId={props.studentId} canManage={props.canManage} alerts={props.alerts} />
      <StaffWorkspaceReviewsPanel
        studentId={props.studentId}
        canManage={props.canManage}
        reviews={props.reviews}
      />
      <StaffWorkspaceNotesPanel
        studentId={props.studentId}
        canManage={props.canManage}
        notes={props.notes}
        authorLabels={props.authorLabels}
      />
      <StaffWorkspaceDocumentsPanel {...props} />
    </>
  );
}
