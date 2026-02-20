import type { FunnelStep } from "@/types/analytics";

type FunnelPreviewProps = {
  data: FunnelStep[];
};

export function FunnelPreview({ data }: FunnelPreviewProps) {
  return (
    <div className="panel p-5">
      <h3 className="section-title mb-3 dark:text-slate-100">Funnel Preview</h3>
      <div className="space-y-3">
        {data.map((step) => (
          <div
            key={step.step}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-900"
          >
            <span className="text-sm text-slate-700 dark:text-slate-300">{step.step}</span>
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {step.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
