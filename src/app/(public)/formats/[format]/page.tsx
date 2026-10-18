import { prisma } from "@/lib/prisma";
import TourCard from "@/components/TourCard";

const names: Record<string, string> = { individual: "Индивидуальные туры", group: "Групповые туры", corporate: "Корпоративные туры" };

export default async function FormatPage({ params }: { params: { format: string } }) {
  const tours = await prisma.tour.findMany({ where: { published: true, format: params.format }, orderBy: { createdAt: "desc" } });
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-stone-900">{names[params.format] || params.format}</h1>
      {tours.length === 0
        ? <p className="text-stone-500">Пока нет туров в этом формате.</p>
        : <div className="grid md:grid-cols-3 gap-4">{tours.map(t => <TourCard key={t.id} tour={t} />)}</div>}
    </div>
  );
}