import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminTourForm from "@/components/AdminTourForm";

export default async function EditTour({ params }: { params: { id: string } }) {
  const tour = await prisma.tour.findUnique({ where: { id: params.id } });
  if (!tour) notFound();
  return <AdminTourForm initial={tour} />;
}