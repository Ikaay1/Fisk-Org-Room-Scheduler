import { NextResponse } from "next/server";
import { RequestOtpBody } from "@/lib/validate";
import { issueOtp } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/mail";
import prisma from "@/lib/prisma";

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

  if (!user) {
    return NextResponse.json(
      { ok: false, error: "User doesn't exists" },
      { status: 401 }
    );
  }

  const code = await issueOtp(email);
  await sendOtpEmail(email, code);

  return NextResponse.json({ ok: true });
}
