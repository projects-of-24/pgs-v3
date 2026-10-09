"use client";

import { useState, type ReactNode } from "react";
import styles from "./workspace-desk-guardians-crm.module.css";

type GcrmSubTab = "crm" | "guardian";

const SUB_TABS: Array<{ id: GcrmSubTab; label: string }> = [
  { id: "crm", label: "CRM" },
  { id: "guardian", label: "Guardian" }
];

/**
 * WS-DESK-GCRM QC — Guardians / CRM body as two sub-tabs (CRM · Guardian).
 * Same STU2 panels; click tab to view one at a time.
 */
export function WorkspaceDeskGuardiansCrm({
  crm,
  guardian
}: {
  crm: ReactNode;
  guardian: ReactNode;
}) {
  const [subTab, setSubTab] = useState<GcrmSubTab>("crm");

  return (
    <div className={styles.root}>
      <div className={styles.subTablist} role="tablist" aria-label="Guardians and CRM sections">
        {SUB_TABS.map((item) => {
          const active = subTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`ws-gcrm-subtab-${item.id}`}
              className={active ? `${styles.subTab} ${styles.subTabActive}` : styles.subTab}
              aria-selected={active}
              aria-controls={`ws-gcrm-panel-${item.id}`}
              tabIndex={active ? 0 : -1}
              onClick={() => setSubTab(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        id="ws-gcrm-panel-crm"
        role="tabpanel"
        aria-labelledby="ws-gcrm-subtab-crm"
        hidden={subTab !== "crm"}
        className={styles.subPanel}
      >
        {crm}
      </div>

      <div
        id="ws-gcrm-panel-guardian"
        role="tabpanel"
        aria-labelledby="ws-gcrm-subtab-guardian"
        hidden={subTab !== "guardian"}
        className={styles.subPanel}
      >
        {guardian}
      </div>
    </div>
  );
}
