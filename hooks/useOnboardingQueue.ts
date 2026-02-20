"use client";

import useSWR from "swr";
import { buildQuery, getJson } from "@/lib/api/client";
import type { OnboardingQueueItem, OnboardingStatus } from "@/types/onboarding";

type OnboardingQueueResponse = {
  items: OnboardingQueueItem[];
};

type QueueFilter = {
  status?: OnboardingStatus;
  start?: string;
  end?: string;
  orgId?: string;
};

export function useOnboardingQueue(filter: QueueFilter) {
  const query = buildQuery({
    status: filter.status,
    start: filter.start,
    end: filter.end,
    orgId: filter.orgId,
  });

  const { data, error, isLoading } = useSWR<OnboardingQueueResponse>(
    `/api/v1/onboarding${query}`,
    getJson,
  );

  return {
    data: data?.items ?? [],
    loading: isLoading,
    error: error ? error.message : null,
  };
}
