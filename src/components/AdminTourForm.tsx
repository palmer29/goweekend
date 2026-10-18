"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminTourForm({ initial }: { initial?: any }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "", slug: "", region: "saratov", format: "group",
    durationH: 8, priceFrom: 0, priceTo: 0, summary: "",
    schedule: "", includes: "", excludes: "", coverImage: "",
    published: true,
    ...(initial || {}),
  });
  const [uploading, setUploading] = useState(false);
  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const upload = async (file: File) => {
    setUploading(true);
    const fd = new FormData(); fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const json = await res.json();
    if (json.url) set("coverImage", json.url);
    setUploading(false);
  };

  const save = async () => {
    const payload = {
      ...form,
      durationH: Number(form.durationH),
      priceFrom: form.priceFrom === "" ? null : Number(form.priceFrom),
      priceTo: form.priceTo === "" ? null : Number(form.priceTo),
    };
    const method = initial?.id ? "PUT" : "POST";
    const url = initial?.id ? `/api/tours/${initial.id}` : "/api/tours";
    const res = await fetch(url, {
      method, headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) router.push("/admin/tours");
    else alert("Ошибка сохранения: " + (await res.text()));
  };

  return (
    <div className="max-w-3xl space-y-3">
      <h1 className="text-2xl font-bold">{initial ? "Редактировать тур" : "Новый тур"}</h1>
      <input className="input" placeholder="Название" value={form.title} onChange={e => set("title", e.target.value)} />
      <input className="input" placeholder="slug (латиницей, уникальный)" value={form.slug} onChange={e => set("slug", e.target.value)} />
      <select className="input" value={form.region} onChange={e => set("region", e.target.value)}>
        <option value="saratov">Саратовская</option>
        <option value="penza">Пензенская</option>
        <option value="volgograd">Волгоградская</option>
      </select>
      <select className="input" value={form.format} onChange={e => set("format", e.target.value)}>
        <option value="individual">Индивидуальный</option>
        <option value="group">Групповой</option>
        <option value="corporate">Корпоративный</option>
      </select>
      <input className="input" type="number" placeholder="Длительность (ч)" value={form.durationH} onChange={e => set("durationH", e.target.value)} />
      <input className="input" type="number" placeholder="Цена от" value={form.priceFrom ?? ""} onChange={e => set("priceFrom", e.target.value)} />
      <input className="input" type="number" placeholder="Цена до" value={form.priceTo ?? ""} onChange={e => set("priceTo", e.target.value)} />
      <textarea className="input" placeholder="Краткое описание" value={form.summary || ""} onChange={e => set("summary", e.target.value)} />
      <textarea className="input" rows={8} placeholder="Расписание" value={form.schedule || ""} onChange={e => set("schedule", e.target.value)} />
      <textarea className="input" placeholder="Входит в стоимость" value={form.includes || ""} onChange={e => set("includes", e.target.value)} />
      <textarea className="input" placeholder="Не входит" value={form.excludes || ""} onChange={e => set("excludes", e.target.value)} />

      <div>
        <label className="block mb-1 font-medium">Обложка</label>
        <input type="file" accept="image/*" onChange={e => e.target.files?.[0] && upload(e.target.files[0])} />
        {uploading && <p className="text-sm text-gray-500">Загрузка…</p>}
        {form.coverImage && <img src={form.coverImage} alt="Обложка" className="mt-2 w-48 rounded" />}
      </div>

      <label className="flex items-center gap-2">
        <input type="checkbox" checked={!!form.published} onChange={e => set("published", e.target.checked)} /> Опубликован
      </label>

      <button onClick={save} className="btn">Сохранить</button>
    </div>
  );
}