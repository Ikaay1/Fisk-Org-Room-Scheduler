import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  const newEvent = await prisma.event.create({
    data: {
      title: body.title,
      description: body.description,
      minCapacity: body.minCapacity,
      startAt: body.startAt,
      endAt: body.endAt,
      user: { connect: { id: body.creatorId } },
      club: { connect: { id: body.clubId } },
      room: { connect: { id: body.roomId } },
    },
  });

  await prisma.room.update({
    where: { id: body.roomId },
    data: { isFree: false },
  });

  return NextResponse.json({ ok: true, room: newEvent });
}
