import { redirect } from "next/navigation";
import { AdminShell } from "@/components/layout/AdminShell";
import { getMockSession } from "@/lib/auth/mockSession";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getMockSession();

  if (session.user.role !== "super_admin") {
    redirect("/unauthorized");
  }

  return <AdminShell>{children}</AdminShell>;
}
