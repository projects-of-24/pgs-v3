import Link from "next/link";
import { AdminPageHeader } from "@/components/admin-page-header";

export function OpsStubPage({
  title,
  eyebrow = "Coming next",
  connectLater,
  stubId
}: {
  title: string;
  eyebrow?: string;
  connectLater: string;
  stubId: string;
}) {
  return (
    <main className="ops-page">
      <AdminPageHeader
        eyebrow={eyebrow}
        title={title}
        description="This screen is a placeholder so the Ops shell matches the approved sidetab. Backend connection comes in a later wire gate — no invented data here."
      />
      <section className="ops-card ops-stub-card" aria-labelledby="ops-stub-heading">
        <h2 id="ops-stub-heading">Stub · {stubId}</h2>
        <p>
          <strong>Will connect later to:</strong> {connectLater}
        </p>
        <p className="ops-stub-note">
          Logged in <code>docs/OPS-SIDETAB-SCOUT.md</code> and <code>docs/OPS-BACKEND-UI-API-UPDATES.md</code>.
        </p>
        <Link href="/ops" className="ops-stub-back">
          Back to Dashboard
        </Link>
      </section>
    </main>
  );
}
