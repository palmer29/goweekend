"use client";
import { useEffect, useState } from "react";

type Field = { key: string; label: string; type?: "text" | "textarea" | "image" };

const fields: Field[] = [
  { key: "siteName", label: "Название сайта" },
  { key: "phone", label: "Телефон" },
  { key: "email", label: "Email (публичный)" },
  { key: "workHours", label: "Режим работы" },
  { key: "telegram", label: "Ссылка Telegram" },
  { key: "whatsapp", label: "Ссылка WhatsApp" },
  { key: "vk", label: "Ссылка VK" },
  { key: "requestsEmail", label: "Email для заявок" },

  { key: "region_saratov_title", label: "Саратовская область — заголовок" },
  { key: "region_saratov_desc", label: "Саратовская область — описание", type: "textarea" },
  { key: "region_saratov_photo", label: "Саратовская область — фото", type: "image" },

  { key: "region_penza_title", label: "Пензенская область — заголовок" },
  { key: "region_penza_desc", label: "Пензенская область — описание", type: "textarea" },
  { key: "region_penza_photo", label: "Пензенская область — фото", type: "image" },

  { key: "region_volgograd_title", label: "Волгоградская область — заголовок" },
  { key: "region_volgograd_desc", label: "Волгоградская область — описание", type: "textarea" },
  { key: "region_volgograd_photo", label: "Волгоградская область — фото", type: "image" },
];

export default function SettingsPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(setValues);
  }, []);

  const save = async () => {
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const uploadImage = async (key: string, file: File) => {
    setUploadingKey(key);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const json = await res.json();
    if (json.url) setValues(v => ({ ...v, [key]: json.url }));
    setUploadingKey(null);
  };

  return (
    <div className="max-w-xl space-y-3">
      <h1 className="text-2xl font-bold">Настройки сайта</h1>

      {fields.map(f => (
        <div key={f.key}>
          <label className="block text-sm mb-1">{f.label}</label>

          {f.type === "textarea" ? (
            <textarea
              className="input"
              rows={3}
              value={values[f.key] || ""}
              onChange={e => setValues({ ...values, [f.key]: e.target.value })}
            />
          ) : f.type === "image" ? (
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) uploadImage(f.key, file);
                }}
              />
              {uploadingKey === f.key && <p className="text-sm text-gray-500">Загрузка…</p>}
              {values[f.key] && (
                <img src={values[f.key]} alt="" className="w-48 rounded border" />
              )}
            </div>
          ) : (
            <input
              className="input"
              value={values[f.key] || ""}
              onChange={e => setValues({ ...values, [f.key]: e.target.value })}
            />
          )}
        </div>
      ))}

      <button onClick={save} className="btn">Сохранить</button>
      {saved && <p className="text-green-600">Сохранено</p>}
    </div>
  );
}