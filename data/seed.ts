import { subDays, formatISO } from "@/lib/data/time";
import type { AnalyticsDailyRecord, FunnelStep, RegionDeviceRecord } from "@/types/analytics";
import type { AuditLogEntry } from "@/types/audit";
import type { OnboardingQueueItem } from "@/types/onboarding";
import type { Organization } from "@/types/org";

const now = new Date("2026-02-20T12:00:00.000Z");

export const organizationsSeed: Organization[] = [
  { id: "org_aurora", name: "Aurora Vet Group", region: "US-West", clinics: 14, staff: 220, monthlyAppointments: 9100, status: "active" },
  { id: "org_hillcrest", name: "Hillcrest Animal Care", region: "US-South", clinics: 9, staff: 132, monthlyAppointments: 5400, status: "active" },
  { id: "org_maple", name: "Maple Pet Health", region: "EU-West", clinics: 12, staff: 184, monthlyAppointments: 6600, status: "active" },
  { id: "org_northstar", name: "Northstar Clinics", region: "APAC", clinics: 7, staff: 97, monthlyAppointments: 3800, status: "active" },
];

const sources = ["mobile", "pms_web"] as const;

export const analyticsSeed: AnalyticsDailyRecord[] = Array.from({ length: 35 }).flatMap((_, offset) => {
  const date = subDays(now, 34 - offset);
  return organizationsSeed.flatMap((org, index) => {
    const base = 120 + index * 18 + offset * 2;
    return sources.map((source, sourceIndex) => ({
      date: formatISO(date),
      orgId: org.id,
      source,
      activeUsers: base + sourceIndex * 35,
      appointmentsCompleted: Math.round((base + sourceIndex * 30) * 0.64),
      appointmentsScheduled: base + sourceIndex * 38,
      avgResponseMs: 420 + sourceIndex * 120 + index * 20 + (offset % 6) * 10,
      activeClinics: Math.max(2, org.clinics - (offset % 3)),
    }));
  });
});

export const funnelSeed: FunnelStep[] = [
  { step: "signup", value: 1240 },
  { step: "pet_profile_created", value: 1082 },
  { step: "first_booking", value: 712 },
];

export const breakdownSeed: RegionDeviceRecord[] = [
  { region: "US-West", device: "iOS", users: 1830 },
  { region: "US-West", device: "Android", users: 1510 },
  { region: "US-South", device: "Web", users: 980 },
  { region: "EU-West", device: "iOS", users: 1110 },
  { region: "EU-West", device: "Android", users: 970 },
  { region: "APAC", device: "Android", users: 840 },
];

export const onboardingSeed: OnboardingQueueItem[] = [
  {
    id: "onb_1001",
    profile: {
      orgId: "org_aurora",
      orgName: "Aurora Vet Group",
      clinicName: "Aurora Downtown",
      region: "US-West",
      city: "Seattle",
      contactEmail: "ops@auroravet.example",
    },
    status: "pending_docs",
    docs: [
      { name: "business_license.pdf", uploadedAt: "2026-02-18T10:00:00.000Z" },
      { name: "insurance_certificate.pdf", uploadedAt: "2026-02-18T10:10:00.000Z" },
    ],
    assignedReviewer: "morgan.lee",
    submittedAt: "2026-02-18T09:50:00.000Z",
    lastUpdatedAt: "2026-02-18T10:10:00.000Z",
  },
  {
    id: "onb_1002",
    profile: {
      orgId: "org_hillcrest",
      orgName: "Hillcrest Animal Care",
      clinicName: "Hillcrest North",
      region: "US-South",
      city: "Austin",
      contactEmail: "admin@hillcrest.example",
    },
    status: "approved",
    docs: [{ name: "credential_packet.zip", uploadedAt: "2026-02-15T13:10:00.000Z" }],
    assignedReviewer: "sofia.khan",
    submittedAt: "2026-02-15T12:30:00.000Z",
    lastUpdatedAt: "2026-02-16T08:22:00.000Z",
    lastDecisionNote: "All required docs verified.",
  },
  {
    id: "onb_1003",
    profile: {
      orgId: "org_maple",
      orgName: "Maple Pet Health",
      clinicName: "Maple Riverside",
      region: "EU-West",
      city: "Dublin",
      contactEmail: "compliance@maplepet.example",
    },
    status: "rejected",
    docs: [{ name: "license_scan.png", uploadedAt: "2026-02-13T07:05:00.000Z" }],
    assignedReviewer: "morgan.lee",
    submittedAt: "2026-02-13T06:45:00.000Z",
    lastUpdatedAt: "2026-02-13T11:00:00.000Z",
    lastDecisionNote: "Clinic registration number mismatch.",
  },
  {
    id: "onb_1004",
    profile: {
      orgId: "org_northstar",
      orgName: "Northstar Clinics",
      clinicName: "Northstar Central",
      region: "APAC",
      city: "Singapore",
      contactEmail: "hq@northstar.example",
    },
    status: "pending_docs",
    docs: [{ name: "operations_manual.pdf", uploadedAt: "2026-02-19T09:30:00.000Z" }],
    assignedReviewer: "sofia.khan",
    submittedAt: "2026-02-19T09:10:00.000Z",
    lastUpdatedAt: "2026-02-19T09:30:00.000Z",
  },
];

export const auditSeed: AuditLogEntry[] = [
  {
    id: "aud_2001",
    actor: "super_admin",
    action: "onboarding_approved",
    orgId: "org_hillcrest",
    entityId: "onb_1002",
    notes: "Approval completed after doc verification",
    createdAt: "2026-02-16T08:22:00.000Z",
  },
  {
    id: "aud_2002",
    actor: "super_admin",
    action: "onboarding_rejected",
    orgId: "org_maple",
    entityId: "onb_1003",
    notes: "Rejected due to invalid registration document",
    createdAt: "2026-02-13T11:00:00.000Z",
  },
];
