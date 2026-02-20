type LoadingStateProps = {
  label?: string;
};

export function LoadingState({ label = "Loading data..." }: LoadingStateProps) {
  return (
    <div className="panel p-6 text-sm text-slate-500 dark:text-slate-300">
      <div className="flex items-center gap-3">
        <span className="size-2 rounded-full bg-slate-400" />
        {label}
      </div>
    </div>
  );
}
