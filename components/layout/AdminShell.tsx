"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

const titleMap: Record<string, string> = {
  "/overview": "Overview",
  "/analytics": "Analytics",
  "/organizations": "Organizations",
  "/onboarding-queue": "Onboarding Queue",
  "/audit-logs": "Audit Logs",
};

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const section = Object.keys(titleMap).find((path) => pathname?.startsWith(path));
  const title = section ? titleMap[section] : "Super Admin";

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar title={title} />
        <main className="mx-auto w-full max-w-[1440px] p-8">{children}</main>
      </div>
    </div>
  );
}
