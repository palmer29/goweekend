import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all") === "1";
  if (all) {
    const { error } = await requireAdmin();
    if (error) return error;
  }
  const region = searchParams.get("region");
  const format = searchParams.get("format");
  const tours = await prisma.tour.findMany({
    where: {
      ...(all ? {} : { published: true }),
      ...(region ? { region } : {}),
      ...(format ? { format } : {}),
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(tours);
}

export async function POST(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const data = await req.json();
  try {
    const tour = await prisma.tour.create({ data });
    return NextResponse.json(tour);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}