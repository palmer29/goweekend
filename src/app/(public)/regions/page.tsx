import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";

export default async function RegionsPage() {
  const s = await getSettings();

  const counts = await prisma.tour.groupBy({
    by: ["region"],
    where: { published: true },
    _count: { _all: true },
  });
  const countMap = Object.fromEntries(counts.map(c => [c.region, c._count._all]));

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2 text-stone-900">Регионы</h1>
      <p className="text-stone-600 mb-8">Выберите направление — покажем туры и маршруты.</p>

      <div className="grid gap-6 md:grid-cols-3">
        {s.regions.map(r => (
          <Link
            key={r.key}
            href={`/regions/${r.key}`}
            className="group rounded-2xl overflow-hidden border border-stone-200 bg-white hover:shadow-xl transition"
          >
            <div className="relative h-48 bg-stone-100">
              {r.photo ? (
                <img src={r.photo} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-400">Фото скоро появится</div>
              )}
              <span className="absolute top-3 left-3 bg-[#ECE9DA] text-amber-900 text-xs font-medium px-2 py-1 rounded-full">
                {countMap[r.key] || 0} туров
              </span>
            </div>
            <div className="p-5">
              <h2 className="text-xl font-bold text-stone-900">{r.title}</h2>
              <p className="text-sm text-stone-600 mt-2">{r.desc}</p>
              <span className="inline-block mt-4 text-amber-900 font-medium group-hover:underline">Смотреть туры →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}