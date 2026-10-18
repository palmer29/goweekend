import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="font-bold">Админка</span>
            <Link href="/admin" className="hover:text-blue-300">Дашборд</Link>
            <Link href="/admin/tours" className="hover:text-blue-300">Туры</Link>
            <Link href="/admin/requests" className="hover:text-blue-300">Заявки</Link>
            <Link href="/admin/settings" className="hover:text-blue-300">Настройки</Link>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-slate-300">{session.user?.email}</span>
            <SignOutButton />
          </div>
        </div>
      </header>
      <div className="max-w-6xl mx-auto p-4">{children}</div>
    </div>
  );
}