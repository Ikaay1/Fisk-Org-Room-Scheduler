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

  return NextResponse.json({ ok: true });
}
