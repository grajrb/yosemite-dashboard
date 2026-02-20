import { NextRequest, NextResponse } from "next/server";
import { decideOnboarding } from "@/lib/data/store";
import type { OnboardingDecisionPayload } from "@/types/onboarding";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(request: NextRequest, context: RouteParams): Promise<NextResponse> {
  const { id } = await context.params;
  const payload = (await request.json()) as Partial<OnboardingDecisionPayload>;

  if (!payload.action || !payload.notes) {
    return NextResponse.json(
      { message: "Both action and notes are required" },
      { status: 400 },
    );
  }

  if (payload.action !== "approve" && payload.action !== "reject") {
    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  }

  const updated = decideOnboarding(id, payload as OnboardingDecisionPayload, "super_admin");
  if (!updated) {
    return NextResponse.json({ message: "Onboarding item not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}
