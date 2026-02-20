"use client";

import useSWR from "swr";
import { getJson } from "@/lib/api/client";
import type { Organization } from "@/types/org";

type OrganizationsResponse = {
  items: Organization[];
};

export function useOrganizations() {
  const { data, error, isLoading } = useSWR<OrganizationsResponse>(
    "/api/v1/organizations",
    getJson,
  );

  return {
    data: data?.items ?? [],
    loading: isLoading,
    error: error ? error.message : null,
  };
}
