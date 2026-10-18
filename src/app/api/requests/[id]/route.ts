import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { processed } = await req.json();
  const r = await prisma.request.update({ where: { id: params.id }, data: { processed: !!processed } });
  return NextResponse.json(r);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { error } = await requireAdmin();
  if (error) return error;
  await prisma.request.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}