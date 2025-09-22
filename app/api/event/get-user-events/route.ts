import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth-server";

export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const now = new Date();

  const [_, events] = await prisma.$transaction([
    prisma.event.deleteMany({
      where: {
        creatorId: user.id,
        endAt: { lt: now },
      },
    }),
    prisma.event.findMany({
      where: { creatorId: user.id },
      include: { room: true, club: true },
      orderBy: { startAt: "asc" },
    }),
  ]);

  return NextResponse.json({ ok: true, events });
}
