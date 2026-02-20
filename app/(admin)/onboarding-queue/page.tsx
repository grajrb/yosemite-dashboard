"use client";

import Link from "next/link";
import { useState } from "react";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";
import { LoadingState } from "@/components/states/LoadingState";
import { useOnboardingQueue } from "@/hooks/useOnboardingQueue";
import { buildQuery } from "@/lib/api/client";
import type { OnboardingStatus } from "@/types/onboarding";

export default function OnboardingQueuePage() {
  const [status, setStatus] = useState<OnboardingStatus | "all">("all");
  const [orgId, setOrgId] = useState("");

  const { data, loading, error } = useOnboardingQueue({
    status: status === "all" ? undefined : status,
    orgId: orgId || undefined,
  });

  async function exportCsv() {
    const query = buildQuery({
      status: status === "all" ? undefined : status,
      orgId: orgId || undefined,
    });

    const response = await fetch(`/api/v1/onboarding/export${query}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "onboarding-queue.csv";
    link.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <section className="panel grid gap-4 p-5 md:grid-cols-2">
        <label className="field-label">
          Status
          <select
            className="field-input"
            value={status}
            onChange={(event) => setStatus(event.target.value as OnboardingStatus | "all")}
          >
            <option value="all">all</option>
            <option value="pending_docs">pending_docs</option>
            <option value="approved">approved</option>
            <option value="rejected">rejected</option>
          </select>
        </label>

        <label className="field-label">
          Organization
          <input
            placeholder="org_aurora"
            className="field-input"
            value={orgId}
            onChange={(event) => setOrgId(event.target.value)}
          />
        </label>
      </section>

      <div className="flex justify-end">
        <button type="button" onClick={exportCsv} className="btn-secondary">
          Export CSV
        </button>
      </div>

      {loading && <LoadingState label="Loading onboarding queue..." />}
      {error && <ErrorState message={error} />}
      {!loading && !error && data.length === 0 && (
        <EmptyState title="No onboarding requests" message="No records match your current filters." />
      )}

      {!loading && !error && data.length > 0 && (
        <section className="panel p-5">
          <table className="data-table text-left">
            <thead>
              <tr>
                <th>Clinic</th>
                <th>Org</th>
                <th>Status</th>
                <th>Reviewer</th>
                <th>Submitted</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="text-slate-900 dark:text-slate-100">{item.profile.clinicName}</td>
                  <td className="text-slate-700 dark:text-slate-300">{item.profile.orgName}</td>
                  <td className="text-slate-700 dark:text-slate-300">{item.status}</td>
                  <td className="text-slate-700 dark:text-slate-300">{item.assignedReviewer}</td>
                  <td className="text-slate-700 dark:text-slate-300">{new Date(item.submittedAt).toLocaleDateString()}</td>
                  <td>
                    <Link href={`/onboarding-queue/${item.id}`} className="text-sm font-semibold text-slate-900 underline">
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
