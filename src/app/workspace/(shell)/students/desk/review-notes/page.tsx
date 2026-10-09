import Link from "next/link";
import { WorkspaceStubPanel } from "@/components/workspace-stub-panel";
import styles from "../desk-pick.module.css";

export const metadata = { title: "Review & Notes · PGS Workspace" };

export default function WorkspaceDeskReviewNotesPage() {
  return (
    <div className={styles.wrap}>
      <WorkspaceStubPanel
        title="Review & Notes"
        summary="Open Desk from Student Registry to use the live Review & Notes tab for that student."
      />
      <p className={styles.cta}>
        <Link href="/workspace/students">Go to Student Registry</Link>
      </p>
    </div>
  );
}
