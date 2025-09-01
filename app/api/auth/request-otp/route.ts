import { NextResponse } from "next/server";
import { RequestOtpBody } from "@/lib/validate";
import { issueOtp } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/mail";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

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
    where: { email },
    select: { isVerified: true },
  });

  if (user && user.isVerified) {
    return NextResponse.json(
      { ok: false, error: "User already exists" },
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

  bcrypt.hash(body.password, saltRounds, async function (err, hash) {
    await prisma.user.upsert({
      where: { email },
      create: { email, password: hash },
      update: { password: hash },
    });
  });

  const code = await issueOtp(email);
  await sendOtpEmail(email, code);

  return NextResponse.json({ ok: true });
}
