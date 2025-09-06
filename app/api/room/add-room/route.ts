import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  const room = await prisma.room.findUnique({
    where: {
      building_roomNumber: {
        building: body.building,
        roomNumber: body.roomNumber,
      },
    },
  });

  if (room) {
    return NextResponse.json(
      { ok: false, error: "Room already exists" },
      { status: 401 }
    );
  }

  const newRoom = await prisma.room.create({
    data: {
      building: body.building,
      roomNumber: body.roomNumber,
      features: body.features,
      capacity: body.capacity,
      isFree: true,
    },
  });

  return NextResponse.json({ ok: true, room: newRoom });
}
