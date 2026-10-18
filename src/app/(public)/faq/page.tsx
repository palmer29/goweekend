const items = [
  { q: "Можно ли с собакой?", a: "По согласованию с группой." },
  { q: "Нужны ли документы?", a: "Да, документы необходимы." },
  { q: "Что делать, если опоздал на трансфер?", a: "Предупредить организаторов +7 (993) 498-00-58. Мы дождёмся." },
  { q: "Как изменить маршрут?", a: "Свяжитесь с нами: +7 (993) 498-00-58 / goweekend@yandex.ru — поможем." },
];

export default function FAQ() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Вопросы и ответы</h1>
      <div className="space-y-4">
        {items.map((it, i) => (
          <details key={i} className="border rounded p-4">
            <summary className="font-medium cursor-pointer">{it.q}</summary>
            <p className="mt-2 text-gray-700">{it.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}