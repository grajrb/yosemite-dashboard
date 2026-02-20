import { analyticsSeed, auditSeed, breakdownSeed, funnelSeed, onboardingSeed, organizationsSeed } from "@/data/seed";
import { isWithinRange } from "@/lib/data/time";
import type { MetricsResponse, TimeseriesPoint } from "@/types/analytics";
import type { AuditLogEntry } from "@/types/audit";
import type { OnboardingDecisionPayload, OnboardingQueueItem, OnboardingStatus } from "@/types/onboarding";
import type { Organization } from "@/types/org";

const state = {
  organizations: [...organizationsSeed],
  analytics: [...analyticsSeed],
  funnel: [...funnelSeed],
  breakdown: [...breakdownSeed],
  onboarding: [...onboardingSeed],
  audit: [...auditSeed],
};

type Filter = {
  start?: string | null;
  end?: string | null;
  orgId?: string | null;
};

export function listOrganizations(): Organization[] {
  return state.organizations;
}

export function getMetrics(filter: Filter): MetricsResponse {
  const filtered = state.analytics.filter((item) => {
    const matchesOrg = !filter.orgId || item.orgId === filter.orgId;
    return matchesOrg && isWithinRange(item.date, filter.start, filter.end);
  });

  const sorted = [...filtered].sort((a, b) => a.date.localeCompare(b.date));
  const groupedByDate = sorted.reduce<Record<string, TimeseriesPoint>>((acc, row) => {
    if (!acc[row.date]) {
      acc[row.date] = { date: row.date, mobile: 0, pms_web: 0 };
    }

    acc[row.date][row.source] += row.activeUsers;
    return acc;
  }, {});

  const points = Object.values(groupedByDate);
  const latest = points.at(-1) ?? { date: "", mobile: 0, pms_web: 0 };
  const totals = sorted.reduce(
    (acc, row) => {
      acc.completed += row.appointmentsCompleted;
      acc.scheduled += row.appointmentsScheduled;
      acc.responseMs += row.avgResponseMs;
      acc.clinics = Math.max(acc.clinics, row.activeClinics);
      return acc;
    },
    { completed: 0, scheduled: 0, responseMs: 0, clinics: 0 },
  );

  const last7 = points.slice(-7);
  const last30 = points.slice(-30);

  const wau = last7.reduce((sum, point) => sum + point.mobile + point.pms_web, 0);
  const mau = last30.reduce((sum, point) => sum + point.mobile + point.pms_web, 0);

  const orgScopedBreakdown = filter.orgId
    ? state.breakdown.map((entry) => ({ ...entry, users: Math.max(20, Math.round(entry.users * 0.35)) }))
    : state.breakdown;

  const fallbackStart = sorted.at(0)?.date ?? "";
  const fallbackEnd = sorted.at(-1)?.date ?? "";

  return {
    range: {
      start: filter.start ?? fallbackStart,
      end: filter.end ?? fallbackEnd,
    },
    orgId: filter.orgId ?? undefined,
    kpis: {
      dau: latest.mobile + latest.pms_web,
      wau,
      mau,
      activeClinics: totals.clinics,
      appointmentCompletionRate: totals.scheduled
        ? Number(((totals.completed / totals.scheduled) * 100).toFixed(1))
        : 0,
      avgResponseTimeMs: sorted.length ? Math.round(totals.responseMs / sorted.length) : 0,
    },
    timeseries: points,
    funnel: state.funnel,
    breakdown: orgScopedBreakdown,
  };
}

export function listOnboardingQueue(filter: {
  status?: OnboardingStatus | null;
  start?: string | null;
  end?: string | null;
  orgId?: string | null;
}): OnboardingQueueItem[] {
  return state.onboarding
    .filter((item) => {
      const statusMatch = !filter.status || item.status === filter.status;
      const orgMatch = !filter.orgId || item.profile.orgId === filter.orgId;
      const dateMatch = isWithinRange(item.submittedAt, filter.start, filter.end);
      return statusMatch && orgMatch && dateMatch;
    })
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

export function getOnboardingItem(id: string): OnboardingQueueItem | null {
  return state.onboarding.find((item) => item.id === id) ?? null;
}

export function decideOnboarding(
  id: string,
  payload: OnboardingDecisionPayload,
  actor: string,
): OnboardingQueueItem | null {
  const target = state.onboarding.find((item) => item.id === id);
  if (!target) {
    return null;
  }

  target.status = payload.action === "approve" ? "approved" : "rejected";
  target.lastDecisionNote = payload.notes;
  target.lastUpdatedAt = new Date().toISOString();

  const auditEntry: AuditLogEntry = {
    id: `aud_${Date.now()}`,
    actor,
    action: payload.action === "approve" ? "onboarding_approved" : "onboarding_rejected",
    orgId: target.profile.orgId,
    entityId: target.id,
    notes: payload.notes,
    createdAt: new Date().toISOString(),
  };

  state.audit.unshift(auditEntry);
  return target;
}

export function listAuditLogs(filter: {
  start?: string | null;
  end?: string | null;
  orgId?: string | null;
}): AuditLogEntry[] {
  return state.audit
    .filter((entry) => {
      const orgMatch = !filter.orgId || entry.orgId === filter.orgId;
      const dateMatch = isWithinRange(entry.createdAt, filter.start, filter.end);
      return orgMatch && dateMatch;
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
