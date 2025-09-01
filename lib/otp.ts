import { Redis } from "@upstash/redis";

const redis: ReturnType<typeof Redis.fromEnv> = Redis.fromEnv();
const OTP_TTL_SEC = 5 * 60;

export async function issueOtp(email: string) {
  const code = String(Math.floor(100000 + Math.random() * 900000));
  await redis.set(`otp:${email}`, code, { ex: OTP_TTL_SEC });
  return code;
}

export async function verifyOtp(email: string, code: string) {
  const stored = await redis.get<number>(`otp:${email}`);
  if (!stored) return false;
  const ok = stored.toString() === code;
  if (ok) await redis.del(`otp:${email}`);
  return ok;
}
