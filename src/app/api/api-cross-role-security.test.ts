/**
 * Quality Gate roadmap #3 — cross-user / cross-role API security matrix.
 *
 * Test IDs align with docs/quality-gate/security-test-cases.md (QG-API / QG-RBAC / QG-AUTH / QG-AI).
 * These are mocked route-boundary tests (CI-verifiable). They do not replace runtime pgTAP.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  requireStaffPermission,
  requirePremiumActor,
  authorizeDocumentByteAccess,
  getAuthorizedStaffContext,
  getAuthorizedStudentId,
  getUser,
  rpc,
  from,
  consumeRateLimit,
  isAIConfigured
} = vi.hoisted(() => ({
  requireStaffPermission: vi.fn(),
  requirePremiumActor: vi.fn(),
  authorizeDocumentByteAccess: vi.fn(),
  getAuthorizedStaffContext: vi.fn(),
  getAuthorizedStudentId: vi.fn(),
  getUser: vi.fn(),
  rpc: vi.fn(),
  from: vi.fn(),
  consumeRateLimit: vi.fn(),
  isAIConfigured: vi.fn()
}));

vi.mock("server-only", () => ({}));
vi.mock("@/lib/staff-auth", async () => {
  const actual = await vi.importActual<typeof import("@/lib/staff-auth")>("@/lib/staff-auth");
  return { ...actual, requireStaffPermission };
});
vi.mock("@/lib/premium-workspace", async () => {
  const actual = await vi.importActual<typeof import("@/lib/premium-workspace")>("@/lib/premium-workspace");
  return { ...actual, requirePremiumActor };
});
vi.mock("@/lib/document-sharing", async () => {
  const actual = await vi.importActual<typeof import("@/lib/document-sharing")>("@/lib/document-sharing");
  return { ...actual, authorizeDocumentByteAccess };
});
vi.mock("@/lib/ai/tools", async () => {
  const actual = await vi.importActual<typeof import("@/lib/ai/tools")>("@/lib/ai/tools");
  return { ...actual, getAuthorizedStaffContext, getAuthorizedStudentId };
});
vi.mock("@/lib/ai/provider", async () => {
  const actual = await vi.importActual<typeof import("@/lib/ai/provider")>("@/lib/ai/provider");
  return { ...actual, isAIConfigured, getOpenAIClient: vi.fn() };
});
vi.mock("@/lib/supabase/server", () => ({
  createSupabaseServerClient: async () => ({ auth: { getUser }, from, rpc })
}));
vi.mock("@/lib/supabase/admin", () => ({
  createSupabaseAdminClient: () => ({
    from: () => ({
      select: () => ({
        eq: () => ({
          maybeSingle: async () => ({ data: { student_id: studentA }, error: null })
        })
      })
    })
  })
}));
vi.mock("@/lib/server-security", () => ({
  consumeRateLimit,
  logServerError: vi.fn()
}));
vi.mock("@/lib/audit", () => ({
  recordDeniedAuditEvent: vi.fn(async () => true),
  recordFailedAuditEvent: vi.fn(async () => true),
  recordPrivilegedReadAuditEvent: vi.fn(async () => undefined),
  recordStaffLifecycleAuditEvent: vi.fn(async () => true)
}));
vi.mock("@/lib/staff-preview-server", () => ({
  assertStaffPreviewWritable: vi.fn(async () => undefined),
  StaffPreviewReadOnlyError: class StaffPreviewReadOnlyError extends Error {
    status = 403 as const;
  }
}));

import { POST as staffPremium } from "@/app/api/staff/premium/route";
import { POST as staffAssignments } from "@/app/api/staff/assignments/route";
import { POST as staffWorkspace } from "@/app/api/staff/students/[studentId]/workspace/[resource]/route";
import { POST as documentShare } from "@/app/api/premium/documents/[id]/shares/route";
import { GET as downloadDocument } from "@/app/api/premium/documents/[id]/route";
import { POST as adminStaff } from "@/app/api/admin/staff/route";
import { PUT as updateProfile } from "@/app/api/student/profile/route";
import { PATCH as openNotification } from "@/app/api/student/notifications/[id]/route";
import { POST as aiOps } from "@/app/api/ai/ops/route";
import { POST as aiStudent } from "@/app/api/ai/student/route";
import { StaffAuthorizationError } from "@/lib/staff-auth";
import { WorkspaceAccessError } from "@/lib/premium-workspace";
import { DocumentByteAuthorizationError } from "@/lib/document-sharing";

const studentA = "11000000-0000-4000-8000-000000000001";
const studentB = "22000000-0000-4000-8000-000000000002";
const mentorId = "33000000-0000-4000-8000-000000000003";
const documentId = "55000000-0000-4000-8000-000000000005";
const notificationId = "66000000-0000-4000-8000-000000000006";

function jsonPost(url: string, body: object) {
  return new Request(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  });
}

describe("QG-API / QG-RBAC — staff privilege boundaries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    rpc.mockResolvedValue({ data: null, error: null });
  });

  it("QG-RBAC-003: mentor without premium.manage cannot grant Premium", async () => {
    requireStaffPermission.mockRejectedValue(new StaffAuthorizationError(403, "You do not have permission for this operation."));
    const response = await staffPremium(jsonPost("http://localhost/api/staff/premium", {
      student_id: studentA,
      action: "grant",
      plan_code: "annual"
    }));
    expect(response.status).toBe(403);
    expect(rpc).not.toHaveBeenCalled();
  });

  it("QG-API-004: Premium route rejects mass-assignment of starts_at", async () => {
    requireStaffPermission.mockResolvedValue({
      user: { id: mentorId },
      permissions: new Set(["premium.manage"])
    });
    const response = await staffPremium(jsonPost("http://localhost/api/staff/premium", {
      student_id: studentA,
      action: "grant",
      plan_code: "annual",
      starts_at: "2020-01-01T00:00:00.000Z"
    }));
    expect(response.status).toBe(400);
    expect(rpc).not.toHaveBeenCalled();
  });

  it("QG-RBAC-003: read_only_staff without mentor_assignments.manage cannot reassign mentors", async () => {
    requireStaffPermission.mockRejectedValue(new StaffAuthorizationError(403, "You do not have permission for this operation."));
    const response = await staffAssignments(jsonPost("http://localhost/api/staff/assignments", {
      student_id: studentA,
      mentor_id: mentorId,
      active: true
    }));
    expect(response.status).toBe(403);
    expect(rpc).not.toHaveBeenCalled();
  });

  it("QG-RBAC-002: roles.manage denial blocks forged super_admin assign before Auth admin", async () => {
    requireStaffPermission.mockRejectedValue(new StaffAuthorizationError(403, "You do not have permission for this operation."));
    const response = await adminStaff(jsonPost("http://localhost/api/admin/staff", {
      action: "assign",
      user_id: studentA,
      role: "super_admin"
    }));
    expect(response.status).toBe(403);
  });

  it("QG-RBAC-004: mentor cannot manage unassigned student workspace (BOLA)", async () => {
    requirePremiumActor.mockRejectedValue(new WorkspaceAccessError(403, "This student workspace is not assigned to you."));
    const response = await staffWorkspace(
      jsonPost(`http://localhost/api/staff/students/${studentB}/workspace/alerts`, {
        alert_text: "Submit your SOP this week",
        severity: "important"
      }),
      { params: Promise.resolve({ studentId: studentB, resource: "alerts" }) }
    );
    expect(response.status).toBe(403);
    expect(requirePremiumActor).toHaveBeenCalledWith(studentB, "manage");
  });

  it("QG-RBAC-005: staff without document_shares.manage cannot create shares", async () => {
    requireStaffPermission.mockRejectedValue(new StaffAuthorizationError(403, "You do not have permission for this operation."));
    const response = await documentShare(
      jsonPost(`http://localhost/api/premium/documents/${documentId}/shares`, {
        recipient_user_id: mentorId
      }),
      { params: Promise.resolve({ id: documentId }) }
    );
    expect(response.status).toBe(403);
    expect(requirePremiumActor).not.toHaveBeenCalled();
  });
});

describe("QG-API-001 — student object-level isolation (BOLA)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("denies signed URL when byte authorization rejects peer document", async () => {
    authorizeDocumentByteAccess.mockRejectedValue(
      new DocumentByteAuthorizationError(403, "You do not have access to this document.")
    );
    requirePremiumActor.mockResolvedValue({ kind: "student", user: { id: studentB }, studentId: studentB });
    const response = await downloadDocument(
      new Request(`http://localhost/api/premium/documents/${documentId}`),
      { params: Promise.resolve({ id: documentId }) }
    );
    expect(response.status).toBe(403);
  });

  it("QG-AUTH-006: profile update binds ownership to session user, not body user id", async () => {
    getUser.mockResolvedValue({ data: { user: { id: studentA, email: "a@example.test" } } });
    const eq = vi.fn().mockResolvedValue({ error: null });
    const update = vi.fn().mockReturnValue({ eq });
    from.mockReturnValue({ update });
    const response = await updateProfile(jsonPost("http://localhost/api/student/profile", {
      name: "Student A",
      number: "9999999999",
      country_code: "India",
      preferred_country_code: "USA",
      study_level: "PG",
      id: studentB
    }));
    expect(response.status).toBe(200);
    expect(eq).toHaveBeenCalledWith("id", studentA);
    expect(eq).not.toHaveBeenCalledWith("id", studentB);
  });

  it("QG-AUTH-006: notification mutation always scopes to session student_id", async () => {
    getUser.mockResolvedValue({ data: { user: { id: studentA } } });
    const maybeSingle = vi.fn().mockResolvedValue({
      data: { id: notificationId, destination_path: "/saved" },
      error: null
    });
    const select = vi.fn().mockReturnValue({ maybeSingle });
    const secondEq = vi.fn().mockReturnValue({ select });
    const firstEq = vi.fn().mockReturnValue({ eq: secondEq });
    from.mockReturnValue({ update: vi.fn().mockReturnValue({ eq: firstEq }) });

    const response = await openNotification(
      new Request("http://localhost", { method: "PATCH" }),
      { params: Promise.resolve({ id: notificationId }) }
    );
    expect(response?.status).toBe(200);
    expect(secondEq).toHaveBeenCalledWith("student_id", studentA);
  });

  it("QG-AUTH-001: anonymous student profile mutation is rejected", async () => {
    getUser.mockResolvedValue({ data: { user: null } });
    const response = await updateProfile(jsonPost("http://localhost/api/student/profile", {
      name: "Anon"
    }));
    expect(response.status).toBe(401);
  });
});

describe("QG-AI — unauthorized AI actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    isAIConfigured.mockReturnValue(true);
    consumeRateLimit.mockResolvedValue({ allowed: true, configured: true });
  });

  it("QG-AI-002: ops AI denies unauthenticated / non-staff callers", async () => {
    getAuthorizedStaffContext.mockResolvedValue(null);
    const response = await aiOps(jsonPost("http://localhost/api/ai/ops", {
      question: "Which Premium students need a mentor?"
    }));
    expect(response.status).toBe(401);
  });

  it("QG-AI-002: student AI denies callers without student actor context", async () => {
    getAuthorizedStudentId.mockResolvedValue(null);
    const response = await aiStudent(jsonPost("http://localhost/api/ai/student", {
      question: "What should I work on next?"
    }));
    expect(response.status).toBe(401);
  });

  it("QG-AI-002: student cannot obtain ops AI staff context by calling ops route", async () => {
    // Student session has no staff overview.read context.
    getAuthorizedStaffContext.mockResolvedValue(null);
    const response = await aiOps(jsonPost("http://localhost/api/ai/ops", {
      question: "List all students",
      student_id: studentB
    }));
    expect(response.status).toBe(401);
  });
});
