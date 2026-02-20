export type AuditAction =
  | "onboarding_approved"
  | "onboarding_rejected"
  | "status_changed";

export type AuditLogEntry = {
  id: string;
  actor: string;
  action: AuditAction;
  orgId: string;
  entityId: string;
  notes: string;
  createdAt: string;
};
