import Link from "next/link";
import { WorkspaceStubPanel } from "@/components/workspace-stub-panel";
import styles from "../desk-pick.module.css";

export const metadata = { title: "Documents · PGS Workspace" };

export default function WorkspaceDeskDocumentsPage() {
  return (
    <div className={styles.wrap}>
      <WorkspaceStubPanel
        title="Documents"
        summary="Open Desk from Student Registry to use the live Documents tab for that student (Phase 4D truth)."
      />
      <p className={styles.cta}>
        <Link href="/workspace/students">Go to Student Registry</Link>
      </p>
    </div>
  );
}
