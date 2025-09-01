import { NextResponse } from "next/server";
import { RequestOtpBody } from "@/lib/validate";
import prisma from "@/lib/prisma";
import { SignJWT } from "jose";
import * as bcrypt from "bcrypt";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = RequestOtpBody.safeParse({ email: body.email });
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const { email } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { email, isVerified: true },
    select: { id: true, email: true, password: true },
  });

  if (!user) {
    return NextResponse.json(
      { ok: false, error: "User not found" },
      { status: 400 }
    );
  }

  const isCorrect = await bcrypt.compare(body.password, user.password);

  if (!isCorrect) {
    return NextResponse.json(
      { ok: false, error: "Password is not correct" },
      { status: 401 }
    );
  }

  const token = await new SignJWT({ sub: user.id, email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);

  const res = NextResponse.json({
    ok: true,
    user: { id: user.id, email: user.email },
  });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
