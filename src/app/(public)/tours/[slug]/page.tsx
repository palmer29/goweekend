import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import RequestForm from "@/components/RequestForm";

export default async function TourPage({ params }: { params: { slug: string } }) {
  const tour = await prisma.tour.findUnique({ where: { slug: params.slug } });
  if (!tour || !tour.published) notFound();
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {tour.coverImage && <img src={tour.coverImage} alt={tour.title} className="w-full h-72 object-cover rounded" />}
      <h1 className="text-3xl font-bold mt-4 text-stone-900">{tour.title}</h1>
      <p className="text-stone-600 mt-1">
        {tour.region} · {tour.format} · {tour.durationH} ч · {tour.priceFrom ? `от ${tour.priceFrom} ₽` : "цена по запросу"}
      </p>
      {tour.summary && <p className="mt-4 text-stone-800">{tour.summary}</p>}
      {tour.schedule && <>
        <h2 className="text-xl font-bold mt-6 text-stone-900">Расписание</h2>
        <div className="whitespace-pre-line mt-2 text-stone-800">{tour.schedule}</div>
      </>}
      {tour.includes && <>
        <h2 className="text-xl font-bold mt-6 text-stone-900">Входит в стоимость</h2>
        <div className="whitespace-pre-line mt-2 text-stone-800">{tour.includes}</div>
      </>}
      {tour.excludes && <>
        <h2 className="text-xl font-bold mt-6 text-stone-900">Не входит</h2>
        <div className="whitespace-pre-line mt-2 text-stone-800">{tour.excludes}</div>
      </>}
      <h2 className="text-xl font-bold mt-8 text-stone-900">Оставить заявку</h2>
      <div className="mt-3"><RequestForm tourId={tour.id} /></div>
    </article>
  );
}