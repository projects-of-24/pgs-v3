import Link from "next/link";
import { WorkspaceStubPanel } from "@/components/workspace-stub-panel";
import styles from "../desk-pick.module.css";

export const metadata = { title: "Comments · PGS Workspace" };

export default function WorkspaceDeskCommentsPage() {
  return (
    <div className={styles.wrap}>
      <WorkspaceStubPanel
        title="Comments"
        summary="Per-student comments open on Student Desk after you pick a student from the registry. Overall Comments (cross-student inbox) is a separate sidebar stub."
      />
      <p className={styles.cta}>
        <Link href="/workspace/students">Go to Student Registry</Link>
      </p>
    </div>
  );
}
