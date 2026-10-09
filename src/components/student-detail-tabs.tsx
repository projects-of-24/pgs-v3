"use client";

import { useState, type ReactNode } from "react";
import {
  Bell,
  ClipboardList,
  FileText,
  FolderOpen,
  Home,
  MessageSquare,
  Users
} from "lucide-react";

export type StudentDeskTab =
  | "dashboard"
  | "comments"
  | "alerts"
  | "review"
  | "notes"
  | "documents"
  | "guardians";

const TABS: Array<{
  id: StudentDeskTab;
  label: string;
  Icon: typeof Home;
}> = [
  { id: "dashboard", label: "Dashboard Data", Icon: Home },
  { id: "comments", label: "Comments", Icon: MessageSquare },
  { id: "alerts", label: "Alerts", Icon: Bell },
  { id: "review", label: "Reviews", Icon: ClipboardList },
  { id: "notes", label: "Notes", Icon: FileText },
  { id: "documents", label: "Documents", Icon: FolderOpen },
  { id: "guardians", label: "Guardians / CRM", Icon: Users }
];

/**
 * WS-DESK — Student Desk tab chrome.
 * Reviews and Notes are separate top-level tabs (same pattern as Comments / Alerts).
 */
export function StudentDetailTabs({
  dashboard,
  comments,
  alerts,
  review,
  notes,
  documents,
  guardians,
  defaultTab = "dashboard"
}: {
  dashboard: ReactNode;
  comments: ReactNode;
  alerts: ReactNode;
  review: ReactNode;
  notes: ReactNode;
  documents: ReactNode;
  guardians: ReactNode;
  defaultTab?: StudentDeskTab;
}) {
  const [tab, setTab] = useState<StudentDeskTab>(defaultTab);
  const panels: Record<StudentDeskTab, ReactNode> = {
    dashboard,
    comments,
    alerts,
    review,
    notes,
    documents,
    guardians
  };

  return (
    <div className="ops-stu2-tabs-shell ops-ws-desk-tabs" data-ops-stu-pass="ws-desk-t">
      <div className="ops-stu2-tablist" role="tablist" aria-label="Student desk sections">
        {TABS.map((item) => {
          const active = tab === item.id;
          const Icon = item.Icon;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`ops-ws-desk-tab-${item.id}`}
              className={active ? "ops-stu2-tab ops-stu2-tab--active" : "ops-stu2-tab"}
              aria-selected={active}
              aria-controls={`ops-ws-desk-panel-${item.id}`}
              tabIndex={active ? 0 : -1}
              onClick={() => setTab(item.id)}
            >
              <Icon aria-hidden="true" className="ops-stu2-tab-icon" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {TABS.map((item) => (
        <div
          key={item.id}
          id={`ops-ws-desk-panel-${item.id}`}
          role="tabpanel"
          aria-labelledby={`ops-ws-desk-tab-${item.id}`}
          hidden={tab !== item.id}
          className="ops-stu2-tabpanel"
        >
          {panels[item.id]}
        </div>
      ))}
    </div>
  );
}
