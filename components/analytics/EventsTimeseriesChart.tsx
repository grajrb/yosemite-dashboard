"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TimeseriesPoint } from "@/types/analytics";

type EventsTimeseriesChartProps = {
  data: TimeseriesPoint[];
};

export function EventsTimeseriesChart({ data }: EventsTimeseriesChartProps) {
  return (
    <div className="panel h-84 p-5">
      <h3 className="section-title mb-4 dark:text-slate-100">Events by Source</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="2 2" stroke="#e2e8f0" />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#64748b" }} />
          <YAxis tick={{ fontSize: 12, fill: "#64748b" }} />
          <Tooltip />
          <Line type="monotone" dataKey="mobile" stroke="#0f172a" strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="pms_web" stroke="#64748b" strokeWidth={2.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
