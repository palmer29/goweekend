import { prisma } from "@/lib/prisma";
import TourCard from "@/components/TourCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ToursPage({ searchParams }: { searchParams: { region?: string; format?: string } }) {
  const { region, format } = searchParams;
  const tours = await prisma.tour.findMany({
    where: { published: true, ...(region ? { region } : {}), ...(format ? { format } : {}) },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-stone-900">Каталог туров</h1>
      <div className="flex flex-wrap gap-2 mb-6 text-sm">
        <Link href="/tours" className={`px-3 py-1 border rounded ${!region && !format ? "bg-amber-900 text-[#ECE9DA] border-amber-900" : "border-stone-300 text-stone-800 hover:border-amber-900"}`}>Все</Link>
        {["saratov", "penza", "volgograd"].map(r => (
          <Link key={r} href={`/tours?region=${r}`} className={`px-3 py-1 border rounded ${region === r ? "bg-amber-900 text-[#ECE9DA] border-amber-900" : "border-stone-300 text-stone-800 hover:border-amber-900"}`}>{r}</Link>
        ))}
        {["individual", "group", "corporate"].map(f => (
          <Link key={f} href={`/tours?format=${f}`} className={`px-3 py-1 border rounded ${format === f ? "bg-amber-900 text-[#ECE9DA] border-amber-900" : "border-stone-300 text-stone-800 hover:border-amber-900"}`}>{f}</Link>
        ))}
      </div>
      {tours.length === 0
        ? <p className="text-stone-500">Туров пока нет.</p>
        : <div className="grid md:grid-cols-3 gap-4">{tours.map(t => <TourCard key={t.id} tour={t} />)}</div>}
    </div>
  );
}