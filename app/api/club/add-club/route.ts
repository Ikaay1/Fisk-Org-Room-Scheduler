import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  const club = await prisma.club.findUnique({
    where: {
      name: body.name,
    },
  });

  if (club) {
    return NextResponse.json(
      { ok: false, error: "Club already exists" },
      { status: 401 }
    );
  }

  const newClub = await prisma.club.create({
    data: {
      name: body.name,
    },
  });

  return NextResponse.json({ ok: true, club: newClub });
}
