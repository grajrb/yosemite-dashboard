export type EventSource = "mobile" | "pms_web";

export type AnalyticsDailyRecord = {
  date: string;
  orgId: string;
  source: EventSource;
  activeUsers: number;
  appointmentsCompleted: number;
  appointmentsScheduled: number;
  avgResponseMs: number;
  activeClinics: number;
};

export type FunnelStep = {
  step: string;
  value: number;
};

export type RegionDeviceRecord = {
  region: string;
  device: string;
  users: number;
};

export type KpiMetrics = {
  dau: number;
  wau: number;
  mau: number;
  activeClinics: number;
  appointmentCompletionRate: number;
  avgResponseTimeMs: number;
};

export type TimeseriesPoint = {
  date: string;
  mobile: number;
  pms_web: number;
};

export type MetricsResponse = {
  range: {
    start: string;
    end: string;
  };
  orgId?: string;
  kpis: KpiMetrics;
  timeseries: TimeseriesPoint[];
  funnel: FunnelStep[];
  breakdown: RegionDeviceRecord[];
};
