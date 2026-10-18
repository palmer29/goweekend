import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";
import { sendRequestMail } from "@/lib/mail";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  const items = await prisma.request.findMany({
    orderBy: { createdAt: "desc" },
    include: { tour: { select: { title: true } } },
  });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const data = await req.json();
  if (!data.name || !data.phone) {
    return NextResponse.json({ error: "Заполните имя и телефон" }, { status: 400 });
  }
  const request = await prisma.request.create({
    data: {
      name: data.name,
      phone: data.phone,
      people: data.people ? Number(data.people) : null,
      transfer: data.transfer || null,
      comment: data.comment || null,
      type: data.type || "tour",
      tourId: data.tourId || null,
    },
  });
  try {
    await sendRequestMail(
      `Новая заявка: ${data.name}`,
      `<h3>Новая заявка</h3>
       <p><b>Имя:</b> ${data.name}</p>
       <p><b>Телефон:</b> ${data.phone}</p>
       <p><b>Человек:</b> ${data.people ?? "-"}</p>
       <p><b>Трансфер:</b> ${data.transfer ?? "-"}</p>
       <p><b>Комментарий:</b> ${data.comment ?? "-"}</p>
       <p><b>Тур ID:</b> ${data.tourId ?? "—"}</p>`
    );
  } catch (e) {
    // письмо не ушло — заявка всё равно сохранена в БД, админ увидит её в /admin/requests
    console.error("SMTP error:", e);
  }
  return NextResponse.json({ ok: true, id: request.id });
}