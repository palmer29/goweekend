"use client";
import { useEffect, useState } from "react";

export default function AdminRequests() {
  const [items, setItems] = useState<any[]>([]);
  const load = () => fetch("/api/requests").then(r => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const toggle = async (id: string, processed: boolean) => {
    await fetch(`/api/requests/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ processed: !processed }),
    });
    load();
  };
  const del = async (id: string) => {
    if (!confirm("Удалить заявку?")) return;
    await fetch(`/api/requests/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Заявки</h1>
      {items.length === 0 ? <p className="text-gray-500">Заявок пока нет.</p> : (
        <table className="w-full bg-white rounded shadow text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-3">Дата</th><th>Имя</th><th>Телефон</th><th>Тур</th><th>Чел.</th><th>Трансфер</th><th>Статус</th><th></th>
            </tr>
          </thead>
          <tbody>
            {items.map(r => (
              <tr key={r.id} className="border-b align-top">
                <td className="p-3 whitespace-nowrap">{new Date(r.createdAt).toLocaleString("ru-RU")}</td>
                <td>{r.name}</td>
                <td>{r.phone}</td>
                <td>{r.tour?.title || r.type}</td>
                <td>{r.people ?? "-"}</td>
                <td>{r.transfer || "-"}</td>
                <td>{r.processed ? <span className="text-green-600">Обработана</span> : <span className="text-red-600">Новая</span>}</td>
                <td className="text-right pr-3 whitespace-nowrap">
                  <button onClick={() => toggle(r.id, r.processed)} className="text-blue-600 mr-3">
                    {r.processed ? "Вернуть в новые" : "Обработана"}
                  </button>
                  <button onClick={() => del(r.id)} className="text-red-600">Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}