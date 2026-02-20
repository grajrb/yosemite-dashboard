"use client";

import useSWR from "swr";
import { buildQuery, getJson } from "@/lib/api/client";
import type { MetricsResponse } from "@/types/analytics";

type MetricsFilter = {
  start?: string;
  end?: string;
  orgId?: string;
};

export function useMetrics(filter: MetricsFilter) {
  const query = buildQuery({
    start: filter.start,
    end: filter.end,
    orgId: filter.orgId,
  });

  const { data, error, isLoading } = useSWR<MetricsResponse>(`/api/v1/metrics${query}`, getJson);
  return { data: data ?? null, loading: isLoading, error: error ? error.message : null };
}
