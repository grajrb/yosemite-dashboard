import { ThemeToggle } from "@/components/theme/ThemeToggle";
type TopbarProps = {
  title: string;
};

export function Topbar({ title }: TopbarProps) {
  return (
    <header className="flex h-18 items-center justify-between border-b border-border bg-surface px-8 py-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Platform Control</p>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="rounded-full border border-slate-900 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
          super_admin
        </div>
      </div>
    </header>
  );
}
