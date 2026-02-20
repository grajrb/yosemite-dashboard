"use client";

import useSWR from "swr";
import { buildQuery, getJson } from "@/lib/api/client";
import type { AuditLogEntry } from "@/types/audit";

type AuditResponse = {
  items: AuditLogEntry[];
};

export function useAuditLogs(filter: { start?: string; end?: string; orgId?: string }) {
  const query = buildQuery({
    start: filter.start,
    end: filter.end,
    orgId: filter.orgId,
  });

  const { data, error, isLoading } = useSWR<AuditResponse>(`/api/v1/audit-logs${query}`, getJson);
  return { data: data?.items ?? [], loading: isLoading, error: error ? error.message : null };
}
