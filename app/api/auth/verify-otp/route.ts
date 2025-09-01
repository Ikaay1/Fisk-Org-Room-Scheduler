import { NextResponse } from "next/server";
import { VerifyOtpBody } from "@/lib/validate";
import { verifyOtp } from "@/lib/otp";
import prisma from "@/lib/prisma";
import { SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = VerifyOtpBody.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const { email, code } = parsed.data;

  const ok = await verifyOtp(email, code);
  if (!ok)
    return NextResponse.json(
      { ok: false, error: "Invalid or expired OTP" },
      { status: 401 }
    );

  const user = await prisma.user.update({
    where: { email },
    data: { isVerified: true },
    select: { id: true, email: true },
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
