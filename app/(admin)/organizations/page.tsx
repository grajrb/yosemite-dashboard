"use client";

import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";
import { LoadingState } from "@/components/states/LoadingState";
import { useOrganizations } from "@/hooks/useOrganizations";

export default function OrganizationsPage() {
  const { data, loading, error } = useOrganizations();

  if (loading) {
    return <LoadingState label="Loading organizations..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (data.length === 0) {
    return <EmptyState title="No organizations" message="No organizations are currently configured." />;
  }

  return (
    <div className="panel p-5">
      <table className="data-table text-left">
        <thead>
          <tr>
            <th>Organization</th>
            <th>Region</th>
            <th className="text-right">Clinics</th>
            <th className="text-right">Staff</th>
            <th className="text-right">Monthly Appointments</th>
          </tr>
        </thead>
        <tbody>
          {data.map((org) => (
            <tr key={org.id}>
              <td className="text-slate-900 dark:text-slate-100">{org.name}</td>
              <td className="text-slate-700 dark:text-slate-300">{org.region}</td>
              <td className="text-right text-slate-700 dark:text-slate-300">{org.clinics}</td>
              <td className="text-right text-slate-700 dark:text-slate-300">{org.staff}</td>
              <td className="text-right text-slate-700 dark:text-slate-300">
                {org.monthlyAppointments.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
