"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/overview", label: "Overview" },
  { href: "/analytics", label: "Analytics" },
  { href: "/organizations", label: "Organizations" },
  { href: "/onboarding-queue", label: "Onboarding Queue" },
  { href: "/audit-logs", label: "Audit Logs" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 border-r border-border bg-surface px-5 py-6">
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Super Admin</p>
        <h1 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">Yosemite Crew</h1>
      </div>

      <nav className="space-y-1.5">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
              pathname?.startsWith(item.href)
                ? "bg-slate-900 text-white dark:bg-slate-200 dark:text-slate-900"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
