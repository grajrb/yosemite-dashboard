"use client";

import { useAuditLogs } from "@/hooks/useAuditLogs";
import { useMetrics } from "@/hooks/useMetrics";
import { KpiCard } from "@/components/analytics/KpiCard";
import { ErrorState } from "@/components/states/ErrorState";
import { LoadingState } from "@/components/states/LoadingState";
import { EmptyState } from "@/components/states/EmptyState";

export default function OverviewPage() {
  const metrics = useMetrics({});
  const audit = useAuditLogs({});

  if (metrics.loading || audit.loading) {
    return <LoadingState label="Loading platform overview..." />;
  }

  if (metrics.error || audit.error) {
    return <ErrorState message={metrics.error ?? audit.error ?? "Unknown error"} />;
  }

  if (!metrics.data) {
    return <EmptyState title="No metrics found" message="No data is available for the selected period." />;
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <KpiCard label="DAU" value={metrics.data.kpis.dau.toLocaleString()} />
        <KpiCard label="WAU" value={metrics.data.kpis.wau.toLocaleString()} />
        <KpiCard label="MAU" value={metrics.data.kpis.mau.toLocaleString()} />
        <KpiCard label="Active Clinics" value={metrics.data.kpis.activeClinics.toLocaleString()} />
        <KpiCard label="Appt Completion" value={`${metrics.data.kpis.appointmentCompletionRate}%`} />
        <KpiCard label="Avg Response" value={`${metrics.data.kpis.avgResponseTimeMs} ms`} />
      </section>

      <section className="panel p-5">
        <h3 className="section-title mb-3 dark:text-slate-100">Latest Super Admin Actions</h3>
        {audit.data.length === 0 ? (
          <EmptyState title="No audit logs yet" message="Actions will appear here as approvals and rejections happen." />
        ) : (
          <table className="data-table text-left">
            <thead>
              <tr>
                <th>Time</th>
                <th>Action</th>
                <th>Org</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {audit.data.slice(0, 5).map((entry) => (
                <tr key={entry.id}>
                  <td className="text-slate-700 dark:text-slate-300">{new Date(entry.createdAt).toLocaleString()}</td>
                  <td className="text-slate-700 dark:text-slate-300">{entry.action}</td>
                  <td className="text-slate-700 dark:text-slate-300">{entry.orgId}</td>
                  <td className="text-slate-900 dark:text-slate-100">{entry.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
