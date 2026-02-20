import { NextResponse } from "next/server";
import { listOrganizations } from "@/lib/data/store";

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ items: listOrganizations() });
}
