// src/app/(public)/contacts/page.tsx
import { getSettings } from "@/lib/settings";
import RequestForm from "@/components/RequestForm";

export default async function Contacts() {
  const s = await getSettings();
  const tel = s.phone.replace(/[^\d+]/g, "");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-stone-900">Контакты</h1>

        <p className="mb-2 text-stone-800">
          📞{" "}
          <a href={`tel:${tel}`} className="text-amber-900 hover:underline">
            {s.phone}
          </a>
        </p>

        <p className="mb-2 text-stone-800">
          ✉️{" "}
          <a href={`mailto:${s.email}`} className="text-amber-900 hover:underline">
            {s.email}
          </a>
        </p>

        {s.workHours && (
          <p className="mb-2 text-stone-800">🕘 {s.workHours}</p>
        )}

        {s.telegram && (
          <p className="mb-2 text-stone-800">
            Telegram:{" "}
            <a
              href={s.telegram}
              className="text-amber-900 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.telegram}
            </a>
          </p>
        )}

        {s.whatsapp && (
          <p className="mb-2 text-stone-800">
            WhatsApp:{" "}
            <a
              href={s.whatsapp}
              className="text-amber-900 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.whatsapp}
            </a>
          </p>
        )}

        {s.vk && (
          <p className="mb-2 text-stone-800">
            VK:{" "}
            <a
              href={s.vk}
              className="text-amber-900 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.vk}
            </a>
          </p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 text-stone-900">Оставить заявку</h2>
        <RequestForm type="callback" />
      </div>
    </div>
  );
}