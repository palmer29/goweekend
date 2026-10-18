import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer({ settings }: { settings: any }) {
  const tel = settings.phone.replace(/[^\d+]/g, "");

  return (
    <footer className="mt-16 bg-stone-900 text-stone-300">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="inline-block bg-[#ECE9DA] rounded-xl p-3 mb-4">
            <Logo siteName={settings.siteName} />
          </div>
          <p className="text-sm text-stone-400 max-w-xs">
            Туры выходного дня по Саратовской, Пензенской и Волгоградской областям.
            Индивидуальные, групповые и корпоративные поездки.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-white">Контакты</h3>
          <p className="mb-1">
            <a href={`tel:${tel}`} className="hover:text-amber-300 transition">{settings.phone}</a>
          </p>
          <p className="mb-1">
            <a href={`mailto:${settings.email}`} className="hover:text-amber-300 transition">{settings.email}</a>
          </p>
          {settings.workHours && <p className="text-sm text-stone-400">{settings.workHours}</p>}

          <div className="flex gap-3 mt-4 text-sm">
            {settings.telegram && <a href={settings.telegram} target="_blank" rel="noopener" className="hover:text-amber-300 transition">Telegram</a>}
            {settings.whatsapp && <a href={settings.whatsapp} target="_blank" rel="noopener" className="hover:text-amber-300 transition">WhatsApp</a>}
            {settings.vk && <a href={settings.vk} target="_blank" rel="noopener" className="hover:text-amber-300 transition">VK</a>}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-white">Документы</h3>
          <p className="mb-1"><Link href="/privacy" className="hover:text-amber-300 transition">Политика ПД</Link></p>
          <p className="mb-1"><Link href="/offer" className="hover:text-amber-300 transition">Оферта</Link></p>
          <p><Link href="/faq" className="hover:text-amber-300 transition">FAQ</Link></p>
        </div>
      </div>

      <div className="border-t border-stone-800 text-center text-xs py-4 text-stone-500">
        © {new Date().getFullYear()} {settings.siteName}. Все права защищены.
      </div>
    </footer>
  );
}