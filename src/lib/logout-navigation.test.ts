import { describe, expect, it, vi } from "vitest";
import { signOutAndNavigate } from "@/lib/logout-navigation";

describe("signOutAndNavigate", () => {
  it("waits for sign-out and performs a fresh logged-out document navigation", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response(JSON.stringify({ redirect: "/" }), {
      status: 200,
      headers: { "content-type": "application/json" }
    }));
    const replace = vi.fn();

    await signOutAndNavigate(fetcher, { origin: "https://purpleguide.test", replace });

    expect(fetcher).toHaveBeenCalledWith("/api/auth/logout", { method: "POST", headers: undefined, body: undefined });
    expect(replace).toHaveBeenCalledWith("https://purpleguide.test/");
  });

  it("passes studio surface and lands on Studio login", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response(JSON.stringify({ redirect: "/studio/login" }), {
      status: 200,
      headers: { "content-type": "application/json" }
    }));
    const replace = vi.fn();

    await signOutAndNavigate(fetcher, { origin: "https://purpleguide.test", replace }, "studio");

    expect(fetcher).toHaveBeenCalledWith("/api/auth/logout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ surface: "studio" })
    });
    expect(replace).toHaveBeenCalledWith("https://purpleguide.test/studio/login");
  });

  it("passes workspace surface and lands on Workspace login", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response(JSON.stringify({ redirect: "/workspace/login" }), {
      status: 200,
      headers: { "content-type": "application/json" }
    }));
    const replace = vi.fn();

    await signOutAndNavigate(fetcher, { origin: "https://purpleguide.test", replace }, "workspace");

    expect(fetcher).toHaveBeenCalledWith("/api/auth/logout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ surface: "workspace" })
    });
    expect(replace).toHaveBeenCalledWith("https://purpleguide.test/workspace/login");
  });

  it("does not navigate when sign-out fails", async () => {
    const replace = vi.fn();

    await expect(signOutAndNavigate(
      vi.fn().mockResolvedValue(new Response(null, { status: 500 })),
      { origin: "https://purpleguide.test", replace }
    )).rejects.toThrow("Logout failed");
    expect(replace).not.toHaveBeenCalled();
  });

  it("rejects an unsafe server-provided redirect", async () => {
    const replace = vi.fn();
    const fetcher = vi.fn().mockResolvedValue(new Response(JSON.stringify({ redirect: "//attacker.test" }), {
      status: 200,
      headers: { "content-type": "application/json" }
    }));

    await signOutAndNavigate(fetcher, { origin: "https://purpleguide.test", replace });

    expect(replace).toHaveBeenCalledWith("https://purpleguide.test/");
  });
});
