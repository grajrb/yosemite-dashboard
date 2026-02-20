export type OnboardingStatus = "pending_docs" | "approved" | "rejected";

export type UploadedDoc = {
  name: string;
  uploadedAt: string;
};

export type ClinicProfile = {
  orgId: string;
  orgName: string;
  clinicName: string;
  region: string;
  city: string;
  contactEmail: string;
};

export type OnboardingQueueItem = {
  id: string;
  profile: ClinicProfile;
  status: OnboardingStatus;
  docs: UploadedDoc[];
  assignedReviewer: string;
  submittedAt: string;
  lastUpdatedAt: string;
  lastDecisionNote?: string;
};

export type OnboardingDecisionPayload = {
  action: "approve" | "reject";
  notes: string;
};
