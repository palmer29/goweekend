"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminTours() {
  const [tours, setTours] = useState<any[]>([]);
  const load = () => fetch("/api/tours?all=1").then(r => r.json()).then(setTours);
  useEffect(() => { load(); }, []);

  const del = async (id: string) => {
    if (!confirm("Удалить тур?")) return;
    await fetch(`/api/tours/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Туры</h1>
        <Link href="/admin/tours/new" className="btn">Добавить</Link>
      </div>
      <table className="w-full bg-white rounded shadow text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="p-3">Название</th><th>Регион</th><th>Формат</th><th>Опубл.</th><th></th>
          </tr>
        </thead>
        <tbody>
          {tours.map(t => (
            <tr key={t.id} className="border-b">
              <td className="p-3">{t.title}</td>
              <td>{t.region}</td>
              <td>{t.format}</td>
              <td>{t.published ? "Да" : "Нет"}</td>
              <td className="text-right pr-3 whitespace-nowrap">
                <Link href={`/admin/tours/${t.id}`} className="text-blue-600 mr-3">Ред.</Link>
                <button onClick={() => del(t.id)} className="text-red-600">Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}