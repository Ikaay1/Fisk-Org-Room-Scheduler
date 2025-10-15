import { NextResponse } from "next/server";
import { RequestOtpBody } from "@/lib/validate";
import { issueOtp } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/mail";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import { SignJWT } from "jose";

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
    select: { id: true, email: true },
  });

  if (!user) {
    return NextResponse.json(
      { ok: false, error: "User doesn't exists" },
      { status: 401 }
    );
  }

  if (body.password != body.confirmPassword) {
    return NextResponse.json(
      { ok: false, error: "Passwords must be same" },
      { status: 401 }
    );
  }

  const saltRounds = 10;
  const hash = await bcrypt.hash(body.password, saltRounds);

  await prisma.user.update({
    where: { email },
    data: { password: hash },
  });

  const token = await new SignJWT({ sub: user.id, email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);

  const res = NextResponse.json({ ok: true, user });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
