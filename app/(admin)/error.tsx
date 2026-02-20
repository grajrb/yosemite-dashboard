"use client";

import { ErrorState } from "@/components/states/ErrorState";

export default function AdminError({ error }: { error: Error }) {
  return <ErrorState message={error.message || "Something went wrong in admin workspace."} />;
}
