import Link from "next/link";
import { WorkspaceStubPanel } from "@/components/workspace-stub-panel";
import styles from "../desk-pick.module.css";

export const metadata = { title: "Guardians / CRM · PGS Workspace" };

export default function WorkspaceDeskGuardiansPage() {
  return (
    <div className={styles.wrap}>
      <WorkspaceStubPanel
        title="Guardians / CRM"
        summary="Open Desk from Student Registry to edit CRM identity and guardians for that student."
      />
      <p className={styles.cta}>
        <Link href="/workspace/students">Go to Student Registry</Link>
      </p>
    </div>
  );
}
