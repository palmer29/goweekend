import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import TourCard from "@/components/TourCard";
import RequestForm from "@/components/RequestForm";

const formats = [
  { key: "corporate", title: "Корпоративные", desc: "Для сплочения команды и нестандартного отдыха", emoji: "🏢" },
  { key: "group", title: "Групповые", desc: "Для совместных впечатлений с единомышленниками", emoji: "👥" },
  { key: "individual", title: "Индивидуальные", desc: "Для тех, кто ценит приватность и персональный подход", emoji: "🧭" },
];

export default async function Home() {
  const s = await getSettings();

  const tours = await prisma.tour.findMany({
    where: { published: true },
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#ECE9DA]" />
        <div className="absolute inset-0 paper-grain opacity-70" />
        <div className="absolute inset-0 paper-stains opacity-70" />

        <svg aria-hidden className="absolute inset-0 w-full h-full opacity-[0.22]" preserveAspectRatio="none" viewBox="0 0 1440 600">
          <path d="M-20 420 C 240 380, 420 460, 700 420 S 1200 380, 1460 440" stroke="#6B5E3E" strokeWidth="1.5" strokeDasharray="8 10" fill="none" />
          <path d="M-20 180 C 200 140, 380 220, 640 180 S 1140 140, 1460 200" stroke="#6B5E3E" strokeWidth="1.2" strokeDasharray="3 8" fill="none" />
          <g stroke="#6B5E3E" strokeWidth="1.6" fill="none">
            <path d="M300 120 l8 8 M308 120 l-8 8" />
            <path d="M980 320 l8 8 M988 320 l-8 8" />
            <path d="M1220 140 l8 8 M1228 140 l-8 8" />
          </g>
          <circle cx="720" cy="300" r="18" stroke="#6B5E3E" strokeWidth="1.3" fill="none" strokeDasharray="3 4" />
        </svg>

        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto text-stone-900">
            Дома не сидите — отправляйтесь путешествовать!
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-stone-700 text-lg">
            Туры выходного дня по Саратовской, Пензенской и Волгоградской областям:
            индивидуальные, групповые, корпоративные. Гибкие цены и индивидуальный подход
            к каждой поездке.
          </p>
          <div className="mt-8 flex gap-3 justify-center flex-wrap">
            <Link href="/tours" className="btn">Подобрать тур</Link>
            <Link href="/regions" className="btn-outline">Смотреть направления</Link>
          </div>
        </div>
      </section>

      {/* ФОРМАТЫ */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 text-stone-900">Форматы поездок</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {formats.map(f => (
            <Link
              key={f.key}
              href={`/formats/${f.key}`}
              className="group bg-white/90 backdrop-blur rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl transition p-6"
            >
              <div className="text-3xl">{f.emoji}</div>
              <h3 className="mt-3 text-lg font-bold text-stone-900">{f.title}</h3>
              <p className="text-sm text-stone-600 mt-1">{f.desc}</p>
              <span className="inline-block mt-4 text-amber-900 font-medium group-hover:underline">Подробнее →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* СЛОГАН */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg md:text-xl font-medium text-stone-800">
            Любые маршруты и программы — создадим путешествие мечты именно для вас!
          </p>
        </div>
      </section>

      {/* РЕГИОНЫ */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900">Регионы</h2>
          <Link href="/regions" className="text-amber-900 font-medium hover:underline">Все направления →</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {s.regions.map(r => (
            <Link
              key={r.key}
              href={`/regions/${r.key}`}
              className="group rounded-2xl overflow-hidden border border-stone-200 bg-white/90 backdrop-blur shadow-sm hover:shadow-xl transition"
            >
              <div className="relative h-44 bg-stone-100">
                {r.photo ? (
                  <img src={r.photo} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-400 text-sm">Фото скоро появится</div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-stone-900">{r.title}</h3>
                <p className="text-sm text-stone-600 mt-1 line-clamp-2">{r.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* БЛИЖАЙШИЕ ТУРЫ */}
      {tours.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900">Ближайшие туры</h2>
            <Link href="/tours" className="text-amber-900 font-medium hover:underline">Все туры →</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {tours.map(t => <TourCard key={t.id} tour={t} />)}
          </div>
        </section>
      )}

      {/* ФОРМА ЗАЯВКИ */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white/95 backdrop-blur rounded-2xl border border-stone-200 shadow-sm p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900">Забронируйте дату путешествия</h2>
          <p className="text-stone-600 mt-2">Оставьте заявку — свяжемся, подберём маршрут и ответим на вопросы.</p>
          <div className="mt-6">
            <RequestForm type="custom" />
          </div>
        </div>
      </section>
    </div>
  );
}