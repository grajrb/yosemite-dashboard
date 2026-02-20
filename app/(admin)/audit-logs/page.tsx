"use client";

import { useState } from "react";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";
import { LoadingState } from "@/components/states/LoadingState";
import { useAuditLogs } from "@/hooks/useAuditLogs";

export default function AuditLogsPage() {
  const [orgId, setOrgId] = useState("");
  const [start, setStart] = useState("2026-01-20");
  const [end, setEnd] = useState("2026-02-20");

  const { data, loading, error } = useAuditLogs({
    orgId: orgId || undefined,
    start,
    end,
  });

  return (
    <div className="space-y-6">
      <section className="panel grid gap-4 p-5 md:grid-cols-3">
        <label className="field-label">
          Start date
          <input
            type="date"
            className="field-input"
            value={start}
            onChange={(event) => setStart(event.target.value)}
          />
        </label>

        <label className="field-label">
          End date
          <input
            type="date"
            className="field-input"
            value={end}
            onChange={(event) => setEnd(event.target.value)}
          />
        </label>

        <label className="field-label">
          Organization
          <input
            placeholder="org_hillcrest"
            className="field-input"
            value={orgId}
            onChange={(event) => setOrgId(event.target.value)}
          />
        </label>
      </section>

      {loading && <LoadingState label="Loading audit logs..." />}
      {error && <ErrorState message={error} />}
      {!loading && !error && data.length === 0 && (
        <EmptyState title="No audit logs" message="No actions found for the current filters." />
      )}

      {!loading && !error && data.length > 0 && (
        <section className="panel p-5">
          <table className="data-table text-left">
            <thead>
              <tr>
                <th>Time</th>
                <th>Actor</th>
                <th>Action</th>
                <th>Org</th>
                <th>Entity</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry) => (
                <tr key={entry.id}>
                  <td className="text-slate-700 dark:text-slate-300">{new Date(entry.createdAt).toLocaleString()}</td>
                  <td className="text-slate-700 dark:text-slate-300">{entry.actor}</td>
                  <td className="text-slate-700 dark:text-slate-300">{entry.action}</td>
                  <td className="text-slate-700 dark:text-slate-300">{entry.orgId}</td>
                  <td className="text-slate-700 dark:text-slate-300">{entry.entityId}</td>
                  <td className="text-slate-900 dark:text-slate-100">{entry.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
