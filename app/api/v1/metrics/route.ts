import { NextRequest, NextResponse } from "next/server";
import { getMetrics } from "@/lib/data/store";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const search = request.nextUrl.searchParams;
  const start = search.get("start");
  const end = search.get("end");
  const orgId = search.get("orgId");

  const metrics = getMetrics({ start, end, orgId });
  return NextResponse.json(metrics);
}
