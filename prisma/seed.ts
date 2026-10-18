import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@goweekend.ru";
  const passwordHash = await bcrypt.hash("СмениПароль123!", 10);
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash, role: "ADMIN" },
  });

  const defaults: Record<string, string> = {
    requestsEmail: "goweekend@yandex.ru",
    siteName: "GoWeekend",
    phone: "+7 (993) 498-00-58",
    email: "goweekend@yandex.ru",
    workHours: "Пн–Вс, 9:00–21:00",
    vk: "",
    telegram: "",
    whatsapp: "",
    // Регионы: заголовки
    region_saratov_title: "Саратовская область",
    region_penza_title: "Пензенская область",
    region_volgograd_title: "Волгоградская область",

    // Регионы: описания
    region_saratov_desc: "Волга, малые города, усадьбы и «малая третьяковка» — компактные маршруты на день.",
    region_penza_desc: "Святые источники, зоопарк, краеведческий музей и Музей одной картины.",
    region_volgograd_desc: "Камышинские уши, набережная Волги, музеи и аквапарк — насыщенный день.",

    // Регионы: фото (пока пусто — загрузим из админки)
    region_saratov_photo: "",
    region_penza_photo: "",
    region_volgograd_photo: "",
  };
  for (const [key, value] of Object.entries(defaults)) {
    await prisma.setting.upsert({ where: { key }, update: {}, create: { key, value } });
  }
  console.log("Seed OK. Admin:", email, "/ СмениПароль123!");
}

main().finally(() => prisma.$disconnect());