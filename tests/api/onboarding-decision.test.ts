import { POST } from "@/app/api/v1/onboarding/[id]/decision/route";
import { listAuditLogs } from "@/lib/data/store";

describe("onboarding decision API", () => {
  it("approves onboarding item and writes audit log", async () => {
    const request = new Request("http://localhost/api/v1/onboarding/onb_1001/decision", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "approve", notes: "Docs verified" }),
    });

    const response = await POST(request as never, {
      params: Promise.resolve({ id: "onb_1001" }),
    });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.status).toBe("approved");

    const logs = listAuditLogs({ orgId: "org_aurora" });
    expect(logs[0]?.action).toBe("onboarding_approved");
  });
});
