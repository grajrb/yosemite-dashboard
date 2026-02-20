"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";
import { LoadingState } from "@/components/states/LoadingState";
import { getJson, postJson } from "@/lib/api/client";
import type { OnboardingQueueItem } from "@/types/onboarding";

export default function OnboardingDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [notesDraft, setNotesDraft] = useState("");
  const [saving, setSaving] = useState(false);

  const { data: item, error, isLoading, mutate } = useSWR<OnboardingQueueItem>(
    `/api/v1/onboarding/${params.id}`,
    getJson,
  );

  const notes = notesDraft || item?.lastDecisionNote || "";

  async function submitDecision(action: "approve" | "reject") {
    if (!item) {
      return;
    }

    setSaving(true);

    try {
      const updated = await postJson<OnboardingQueueItem>(`/api/v1/onboarding/${item.id}/decision`, {
        action,
        notes,
      });
      setNotesDraft(updated.lastDecisionNote ?? "");
      await mutate(updated, { revalidate: false });
      router.refresh();
    } catch {
    } finally {
      setSaving(false);
    }
  }

  if (isLoading) {
    return <LoadingState label="Loading onboarding record..." />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  if (!item) {
    return <EmptyState title="Record not found" message="The requested onboarding item was not found." />;
  }

  return (
    <div className="space-y-6">
      <Link href="/onboarding-queue" className="text-sm font-semibold text-slate-700 underline dark:text-slate-300">
        Back to queue
      </Link>

      <section className="panel p-5">
        <h3 className="section-title text-base dark:text-slate-100">Clinic Profile</h3>
        <div className="mt-3 grid gap-2 text-sm text-slate-700 dark:text-slate-300 md:grid-cols-2">
          <p>Clinic: {item.profile.clinicName}</p>
          <p>Organization: {item.profile.orgName}</p>
          <p>Region: {item.profile.region}</p>
          <p>City: {item.profile.city}</p>
          <p>Contact: {item.profile.contactEmail}</p>
          <p>Assigned reviewer: {item.assignedReviewer}</p>
          <p>Status: {item.status}</p>
        </div>
      </section>

      <section className="panel p-5">
        <h3 className="section-title text-base dark:text-slate-100">Uploaded Documents</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
          {item.docs.map((doc) => (
            <li
              key={doc.name}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-900"
            >
              {doc.name} · {new Date(doc.uploadedAt).toLocaleString()}
            </li>
          ))}
        </ul>
      </section>

      <section className="panel p-5">
        <h3 className="section-title text-base dark:text-slate-100">Decision</h3>
        <label className="field-label mt-3">
          Notes
          <textarea
            className="field-input h-28"
            value={notes}
            onChange={(event) => setNotesDraft(event.target.value)}
          />
        </label>

        <div className="mt-3 flex gap-3">
          <button
            type="button"
            onClick={() => submitDecision("approve")}
            disabled={saving}
            className="btn-primary disabled:opacity-60"
          >
            Approve
          </button>
          <button
            type="button"
            onClick={() => submitDecision("reject")}
            disabled={saving}
            className="btn-secondary disabled:opacity-60"
          >
            Reject
          </button>
        </div>
      </section>
    </div>
  );
}
