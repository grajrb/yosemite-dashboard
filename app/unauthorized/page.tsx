import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center">
        <h1 className="text-xl font-semibold text-slate-900">Unauthorized</h1>
        <p className="mt-2 text-sm text-slate-600">This area is limited to super_admin users.</p>
        <Link href="/overview" className="mt-4 inline-block text-sm font-medium text-slate-900 underline">
          Go to Overview
        </Link>
      </div>
    </div>
  );
}
