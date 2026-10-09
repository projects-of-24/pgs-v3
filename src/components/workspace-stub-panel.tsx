import styles from "./workspace-stub-panel.module.css";

/** Placeholder body until the named feature gate ships. */
export function WorkspaceStubPanel({
  title,
  summary
}: {
  title: string;
  summary: string;
}) {
  return (
    <main className={styles.panel}>
      <p className={styles.eyebrow}>Coming next</p>
      <h1>{title}</h1>
      <p>{summary}</p>
    </main>
  );
}
