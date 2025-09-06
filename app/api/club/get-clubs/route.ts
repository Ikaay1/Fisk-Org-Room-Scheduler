import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const clubs = await prisma.club.findMany();

  return NextResponse.json({ ok: true, clubs });
}
