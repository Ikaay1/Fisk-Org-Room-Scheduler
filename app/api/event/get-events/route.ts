import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const events = await prisma.event.findMany();

  return NextResponse.json({ ok: true, events });
}
