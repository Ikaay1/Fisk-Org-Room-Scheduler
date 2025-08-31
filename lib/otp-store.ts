type OtpRecord = { code: string; expiresAt: number };
const OTP: Record<string, OtpRecord> = {};

export function issueOtp(email: string, ttlMinutes = 5) {
  const code = String(Math.floor(100000 + Math.random() * 900000)); // 6-digit
  OTP[email] = { code, expiresAt: Date.now() + ttlMinutes * 60_000 };
  return code;
}

export function verifyOtp(email: string, code: string) {
  const rec = OTP[email];
  if (!rec) return false;
  if (Date.now() > rec.expiresAt) return false;
  return rec.code === code;
}
