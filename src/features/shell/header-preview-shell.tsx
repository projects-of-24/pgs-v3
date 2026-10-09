/**
 * Header preview lab — quiet stage under chrome.
 * Default lab = fake logged-in. ?loggedOut=1 = login button.
 */
import "./header-preview-shell.css";

type HeaderPreviewShellProps = {
  studentState: "anonymous" | "authenticated_standard" | "authenticated_premium";
  labFakeAuth?: boolean;
};

const STATE_LABEL: Record<HeaderPreviewShellProps["studentState"], string> = {
  anonymous: "Logged out (login)",
  authenticated_standard: "Logged in — avatar → Logout",
  authenticated_premium: "Logged in Premium — avatar → Logout"
};

export function HeaderPreviewShell({
  studentState,
  labFakeAuth = false,
}: HeaderPreviewShellProps) {
  return (
    <div
      className="header-preview-shell"
      data-pgs-module="header-preview"
      data-shell-gate="h5-lab-auth"
      data-cutover="preview"
    >
      <div className="header-preview-shell__stage">
        <h1 className="header-preview-shell__title">
          Header preview · logged-in lab
        </h1>
        <p className="header-preview-shell__note">
          {labFakeAuth ? (
            <>
              Fake logged-in (lab avatar). Tab drops match Figma: Premium yellow;
              CV / studyAbroad white under each tab. Logout →{" "}
              <a href="/preview/header?loggedOut=1">logged-out lab</a>.
            </>
          ) : studentState === "anonymous" ? (
            <>
              Logged-out lab — yellow login.{" "}
              <a href="/preview/header">Back to fake logged-in</a>.
            </>
          ) : (
            <>Real session logged-in. Avatar → Logout uses live sign-out.</>
          )}
        </p>
        <p className="header-preview-shell__state">
          This visit: {STATE_LABEL[studentState]}
          {labFakeAuth ? " (fake lab)" : ""}
        </p>
      </div>
    </div>
  );
}
