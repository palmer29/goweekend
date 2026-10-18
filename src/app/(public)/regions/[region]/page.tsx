import { prisma } from "@/lib/prisma";
import TourCard from "@/components/TourCard";
import { getSettings } from "@/lib/settings";
import { notFound } from "next/navigation";

export default async function RegionPage({ params }: { params: { region: string } }) {
  const s = await getSettings();
  const region = s.regions.find(r => r.key === params.region);
  if (!region) notFound();

  const tours = await prisma.tour.findMany({
    where: { published: true, region: params.region },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="relative h-64 md:h-80 bg-stone-200">
        {region.photo ? (
          <img src={region.photo} alt={region.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-400">Фото региона</div>
        )}
        <div className="absolute inset-0 bg-stone-900/50 flex items-end">
          <div className="max-w-6xl mx-auto px-4 pb-6 text-white w-full">
            <h1 className="text-3xl md:text-4xl font-bold">{region.title}</h1>
            <p className="mt-2 max-w-2xl text-white/90">{region.desc}</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-4 text-stone-900">Туры в регионе</h2>
        {tours.length === 0
          ? <p className="text-stone-500">Пока нет туров в этом регионе.</p>
          : <div className="grid md:grid-cols-3 gap-6">{tours.map(t => <TourCard key={t.id} tour={t} />)}</div>}
      </div>
    </div>
  );
}