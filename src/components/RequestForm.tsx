"use client";
import { useState } from "react";

export default function RequestForm({ tourId, type = "tour" }: { tourId?: string; type?: string }) {
  const [f, setF] = useState({ name: "", phone: "+7", people: "", transfer: "", comment: "" });
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr("");
    const res = await fetch("/api/requests", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...f, tourId, type }),
    });
    if (res.ok) { setOk(true); setF({ name: "", phone: "+7", people: "", transfer: "", comment: "" }); }
    else setErr("Не удалось отправить. Попробуйте позже.");
  };

  if (ok) return <p className="text-amber-900 font-medium">Заявка отправлена! Мы свяжемся с вами.</p>;

  return (
    <form onSubmit={submit} className="space-y-3">
      <input required className="input" placeholder="Имя" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} />
      <input required className="input" placeholder="+7" value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })} />
      <input className="input" type="number" placeholder="Количество человек" value={f.people} onChange={e => setF({ ...f, people: e.target.value })} />
      <select className="input" value={f.transfer} onChange={e => setF({ ...f, transfer: e.target.value })}>
        <option value="">Трансфер</option>
        <option>Личный транспорт</option>
        <option>Корпоративный транспорт</option>
        <option>Транспорт организатора</option>
      </select>
      <textarea className="input" placeholder="Комментарий" value={f.comment} onChange={e => setF({ ...f, comment: e.target.value })} />
      <label className="text-sm flex gap-2 text-stone-700">
        <input type="checkbox" required />
        <span>
          Я даю согласие на обработку персональных данных и подтверждаю, что ознакомлен(а) с{" "}
          <a className="underline text-amber-900 hover:text-amber-700" href="/privacy">Политикой персональных данных</a>
        </span>
      </label>
      {err && <p className="text-red-700">{err}</p>}
      <button className="btn">ЗАБРОНИРОВАТЬ</button>
    </form>
  );
}