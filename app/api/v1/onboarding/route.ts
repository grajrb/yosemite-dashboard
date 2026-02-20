import { NextRequest, NextResponse } from "next/server";
import { listOnboardingQueue } from "@/lib/data/store";
import type { OnboardingStatus } from "@/types/onboarding";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const search = request.nextUrl.searchParams;
  const status = search.get("status") as OnboardingStatus | null;
  const start = search.get("start");
  const end = search.get("end");
  const orgId = search.get("orgId");

  const queue = listOnboardingQueue({ status, start, end, orgId });
  return NextResponse.json({ items: queue });
}
