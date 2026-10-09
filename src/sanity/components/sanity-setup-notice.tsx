export function SanitySetupNotice() {
  return (
    <main
      style={{
        maxWidth: 640,
        margin: "3rem auto",
        padding: "1.5rem",
        fontFamily: "system-ui, sans-serif",
        lineHeight: 1.5
      }}
    >
      <h1 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Sanity trial — setup needed</h1>
      <p>
        This is a <strong>parallel</strong> trial path. Configure Sanity env vars to preview courses here.
      </p>
      <ol>
        <li>
          Create a project at{" "}
          <a href="https://www.sanity.io/manage" target="_blank" rel="noreferrer">
            sanity.io/manage
          </a>
        </li>
        <li>
          Add CORS origin: <code>http://localhost:7000</code>
        </li>
        <li>
          Put these in <code>.env.local</code> then restart <code>pnpm dev</code>:
        </li>
      </ol>
      <pre
        style={{
          background: "#f4f4f5",
          padding: "1rem",
          overflow: "auto",
          borderRadius: 8,
          fontSize: 13
        }}
      >{`NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01`}</pre>
      <p>
        Then create a Course, Publish, and refresh{" "}
        <code>/preview/sanity-courses</code>.
      </p>
      <p style={{ color: "#52525b", fontSize: 14 }}>
        Guide: <code>docs/SANITY-M1-PARALLEL-TRIAL.md</code>
      </p>
    </main>
  );
}
