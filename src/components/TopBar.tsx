import { getSettings } from "@/lib/settings";

export default async function TopBar() {
  const s = await getSettings();
  const tel = s.phone.replace(/[^\d+]/g, "");
  return (
    <div className="bg-stone-900 text-stone-200 text-sm">
      <div className="max-w-6xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <a href={`tel:${tel}`} className="hover:text-amber-300 transition">📞 {s.phone}</a>
          <a href={`mailto:${s.email}`} className="hover:text-amber-300 transition">✉️ {s.email}</a>
          {s.workHours && <span className="text-stone-400">🕘 {s.workHours}</span>}
        </div>
        <div className="flex items-center gap-3">
          {s.telegram && <a href={s.telegram} target="_blank" rel="noopener" className="hover:text-amber-300 transition">Telegram</a>}
          {s.whatsapp && <a href={s.whatsapp} target="_blank" rel="noopener" className="hover:text-amber-300 transition">WhatsApp</a>}
          {s.vk && <a href={s.vk} target="_blank" rel="noopener" className="hover:text-amber-300 transition">VK</a>}
        </div>
      </div>
    </div>
  );
}