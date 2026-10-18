import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const [tours, requests, newRequests] = await Promise.all([
    prisma.tour.count(),
    prisma.request.count(),
    prisma.request.count({ where: { processed: false } }),
  ]);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Дашборд</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <Link href="/admin/tours" className="bg-white border rounded p-5 hover:shadow">
          <div className="text-sm text-gray-500">Всего туров</div>
          <div className="text-3xl font-bold">{tours}</div>
        </Link>
        <Link href="/admin/requests" className="bg-white border rounded p-5 hover:shadow">
          <div className="text-sm text-gray-500">Всего заявок</div>
          <div className="text-3xl font-bold">{requests}</div>
        </Link>
        <Link href="/admin/requests" className="bg-white border rounded p-5 hover:shadow">
          <div className="text-sm text-gray-500">Новых заявок</div>
          <div className="text-3xl font-bold text-red-600">{newRequests}</div>
        </Link>
      </div>
    </div>
  );
}