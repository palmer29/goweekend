import { prisma } from "./prisma";

const regionKeys = ["saratov", "penza", "volgograd"] as const;
type RegionKey = (typeof regionKeys)[number];

const defaultRegionTitle: Record<RegionKey, string> = {
  saratov: "Саратовская область",
  penza: "Пензенская область",
  volgograd: "Волгоградская область",
};

const defaultRegionDesc: Record<RegionKey, string> = {
  saratov: "Волга, малые города, усадьбы и «малая третьяковка» — компактные маршруты на день.",
  penza: "Святые источники, зоопарк, краеведческий музей и Музей одной картины.",
  volgograd: "Камышинские уши, набережная Волги, музеи и аквапарк — насыщенный день.",
};

export async function getSettings() {
  const rows = await prisma.setting.findMany();
  const map = Object.fromEntries(rows.map(r => [r.key, r.value]));

  const regions = regionKeys.map(key => ({
    key,
    title: map[`region_${key}_title`] || defaultRegionTitle[key],
    desc: map[`region_${key}_desc`] || defaultRegionDesc[key],
    photo: map[`region_${key}_photo`] || "",
  }));

  return {
    siteName: map.siteName || "GoWeekend",
    phone: map.phone || "+7 (993) 498-00-58",
    email: map.email || "goweekend@yandex.ru",
    workHours: map.workHours || "",
    vk: map.vk || "",
    telegram: map.telegram || "",
    whatsapp: map.whatsapp || "",
    requestsEmail: map.requestsEmail || process.env.REQUESTS_EMAIL_DEFAULT || "goweekend@yandex.ru",
    regions,
  };
}