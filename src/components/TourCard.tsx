import Link from "next/link";

export default function TourCard({ tour }: { tour: any }) {
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl transition overflow-hidden"
    >
      <div className="relative h-52 bg-stone-100 overflow-hidden">
        {tour.coverImage ? (
          <img
            src={tour.coverImage}
            alt={tour.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="w-full h-full" />
        )}
        <span className="absolute top-3 left-3 bg-[#ECE9DA] text-amber-900 text-xs font-medium px-2 py-1 rounded-full">
          {tour.durationH} ч
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg text-stone-900">{tour.title}</h3>
        <p className="text-sm text-stone-600 mt-1">{tour.region} · {tour.format}</p>
        <p className="mt-3 font-semibold text-amber-900">
          {tour.priceFrom ? `от ${tour.priceFrom} ₽` : "цена по запросу"}
        </p>
      </div>
    </Link>
  );
}