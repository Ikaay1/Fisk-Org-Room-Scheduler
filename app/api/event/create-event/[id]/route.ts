import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await req.json().catch(() => ({}));
  const { id } = await params;

  const data = {
    title: body.title,
    description: body.description,
    minCapacity: body.minCapacity,
    startAt: body.startAt,
    endAt: body.endAt,
    user: { connect: { id: body.creatorId } },
    club: { connect: { id: body.clubId } },
    room: { connect: { id: body.roomId } },
  };

  if (id != "new") {
    const updatedEvent = await prisma.event.update({
      where: { id },
      data,
    });
    return NextResponse.json({ ok: true, event: updatedEvent });
  } else {
    const newEvent = await prisma.event.create({
      data,
    });
    return NextResponse.json({ ok: true, event: newEvent });
  }
}
