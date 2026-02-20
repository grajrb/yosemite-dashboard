"use client";

import { useState } from "react";
import { EventsTimeseriesChart } from "@/components/analytics/EventsTimeseriesChart";
import { FunnelPreview } from "@/components/analytics/FunnelPreview";
import { KpiCard } from "@/components/analytics/KpiCard";
import { RegionDeviceTable } from "@/components/analytics/RegionDeviceTable";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";
import { LoadingState } from "@/components/states/LoadingState";
import { useMetrics } from "@/hooks/useMetrics";

export default function AnalyticsPage() {
  const [orgId, setOrgId] = useState("");
  const [start, setStart] = useState("2026-01-22");
  const [end, setEnd] = useState("2026-02-20");

  const { data, loading, error } = useMetrics({ orgId: orgId || undefined, start, end });

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
            placeholder="org_aurora"
            className="field-input"
            value={orgId}
            onChange={(event) => setOrgId(event.target.value)}
          />
        </label>
      </section>

      {loading && <LoadingState label="Loading analytics..." />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !data && (
        <EmptyState title="No analytics data" message="Try adjusting date range or organization." />
      )}

      {!loading && !error && data && (
        <>
          <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            <KpiCard label="DAU" value={data.kpis.dau.toLocaleString()} />
            <KpiCard label="WAU" value={data.kpis.wau.toLocaleString()} />
            <KpiCard label="MAU" value={data.kpis.mau.toLocaleString()} />
            <KpiCard label="Active Clinics" value={data.kpis.activeClinics.toLocaleString()} />
            <KpiCard label="Appt Completion" value={`${data.kpis.appointmentCompletionRate}%`} />
            <KpiCard label="Avg Response" value={`${data.kpis.avgResponseTimeMs} ms`} />
          </section>

          <section>
            <EventsTimeseriesChart data={data.timeseries} />
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <FunnelPreview data={data.funnel} />
            <RegionDeviceTable data={data.breakdown} />
          </section>
        </>
      )}
    </div>
  );
}
