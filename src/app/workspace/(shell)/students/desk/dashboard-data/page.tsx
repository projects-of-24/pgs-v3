import Link from "next/link";
import { WorkspaceStubPanel } from "@/components/workspace-stub-panel";
import styles from "../desk-pick.module.css";

export const metadata = { title: "Dashboard Data · PGS Workspace" };

export default function WorkspaceDeskDashboardPage() {
  return (
    <div className={styles.wrap}>
      <WorkspaceStubPanel
        title="Dashboard Data"
        summary="Open a student from Student Registry → Open Desk to use the live Dashboard Data tab (pathway, documents, alerts, tasks, per-student Loopboard)."
      />
      <p className={styles.cta}>
        <Link href="/workspace/students">Go to Student Registry</Link>
      </p>
    </div>
  );
}
