/**
 * Side-test QC — Section 1 only: student feed identity card.
 * Desktop Figma 18657:10454 · Mobile Figma 207:2217
 * Live `/student/dashboard` unchanged. No chrome.
 */
import { StudentFeedIdentityCard } from "@/features/student-feed/student-feed-identity-card";

export const dynamic = "force-dynamic";

export default function StudentFeedIdentityPreviewPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: "24px 16px 48px",
        background: "#ffffff",
        boxSizing: "border-box"
      }}
    >
      <h1
        style={{
          margin: "0 0 8px",
          fontFamily: "system-ui, sans-serif",
          fontSize: 18,
          fontWeight: 600,
          color: "#000"
        }}
      >
        Preview — #feed identity card (Section 1)
      </h1>
      <p
        style={{
          margin: "0 0 8px",
          fontFamily: "system-ui, sans-serif",
          fontSize: 14,
          lineHeight: 1.4,
          color: "#333",
          maxWidth: 720
        }}
      >
        QC only. Desktop node <code>18657:10454</code> (&gt;600px). Mobile node{" "}
        <code>207:2217</code> (≤600px). Live <code>/student/dashboard</code> untouched.
      </p>
      <p
        style={{
          margin: "0 0 24px",
          fontFamily: "system-ui, sans-serif",
          fontSize: 13,
          color: "#555"
        }}
      >
        <a href="/student/dashboard">open live feed (unchanged)</a>
      </p>

      <div style={{ marginBottom: 32 }}>
        <p
          style={{
            margin: "0 0 12px",
            fontFamily: "system-ui, sans-serif",
            fontSize: 13,
            color: "#666"
          }}
        >
          Responsive (resize browser):
        </p>
        <StudentFeedIdentityCard />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 40,
          alignItems: "flex-start",
          paddingTop: 16,
          borderTop: "1px solid #ddd"
        }}
      >
        <div>
          <p
            style={{
              margin: "0 0 12px",
              fontFamily: "system-ui, sans-serif",
              fontSize: 13,
              color: "#666"
            }}
          >
            Desktop forced (729×215):
          </p>
          <div className="student-feed-identity-preview-force-desktop">
            <StudentFeedIdentityCard />
          </div>
        </div>
        <div>
          <p
            style={{
              margin: "0 0 12px",
              fontFamily: "system-ui, sans-serif",
              fontSize: 13,
              color: "#666"
            }}
          >
            Mobile forced (180×270):
          </p>
          <div className="student-feed-identity-preview-force-mobile">
            <StudentFeedIdentityCard />
          </div>
        </div>
      </div>

      <style>{`
        .student-feed-identity-preview-force-desktop .student-feed-identity__desktop { display: block !important; }
        .student-feed-identity-preview-force-desktop .student-feed-identity__mobile { display: none !important; }
        .student-feed-identity-preview-force-mobile .student-feed-identity__desktop { display: none !important; }
        .student-feed-identity-preview-force-mobile .student-feed-identity__mobile { display: flex !important; }
      `}</style>
    </main>
  );
}
