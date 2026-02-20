import { NextRequest, NextResponse } from "next/server";
import { getOnboardingItem } from "@/lib/data/store";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_: NextRequest, context: RouteParams): Promise<NextResponse> {
  const { id } = await context.params;
  const item = getOnboardingItem(id);

  if (!item) {
    return NextResponse.json({ message: "Onboarding item not found" }, { status: 404 });
  }

  return NextResponse.json(item);
}
