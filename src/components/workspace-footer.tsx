import styles from "./workspace-footer.module.css";

/** WS-FOOTER-1 — simple Workspace bottom rail (chrome only). */
export function WorkspaceFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.brand}>
          <strong>PGS</strong>
          <span>Mentor-Student Workspace</span>
        </p>
        <p className={styles.meta}>Staff surface · grants from User Management</p>
      </div>
    </footer>
  );
}
