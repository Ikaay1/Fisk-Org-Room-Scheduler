// lib/mailer.ts (DEV ONLY: replace with Resend/SendGrid in prod)
export async function sendOtpDev(email: string, code: string) {
  // eslint-disable-next-line no-console
  console.log("[DEV] OTP for", email, "=", code);
}
