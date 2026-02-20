import { NextRequest } from "next/server";
import { listOnboardingQueue } from "@/lib/data/store";
import type { OnboardingStatus } from "@/types/onboarding";

function toCsvValue(value: string): string {
  const needsQuotes = /[",\n]/.test(value);
  const escaped = value.replace(/"/g, '""');
  return needsQuotes ? `"${escaped}"` : escaped;
}

export async function GET(request: NextRequest): Promise<Response> {
  const search = request.nextUrl.searchParams;
  const status = search.get("status") as OnboardingStatus | null;
  const start = search.get("start");
  const end = search.get("end");
  const orgId = search.get("orgId");

  const items = listOnboardingQueue({ status, start, end, orgId });

  const header = [
    "id",
    "orgId",
    "orgName",
    "clinicName",
    "region",
    "city",
    "contactEmail",
    "status",
    "assignedReviewer",
    "submittedAt",
    "lastUpdatedAt",
    "lastDecisionNote",
  ];

  const rows = items.map((item) => [
    item.id,
    item.profile.orgId,
    item.profile.orgName,
    item.profile.clinicName,
    item.profile.region,
    item.profile.city,
    item.profile.contactEmail,
    item.status,
    item.assignedReviewer,
    item.submittedAt,
    item.lastUpdatedAt,
    item.lastDecisionNote ?? "",
  ]);

  const csv = [header, ...rows]
    .map((row) => row.map((value) => toCsvValue(String(value))).join(","))
    .join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=onboarding-queue.csv",
    },
  });
}
