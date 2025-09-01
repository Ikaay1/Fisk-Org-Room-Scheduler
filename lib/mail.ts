import { Resend } from "resend";

const key = process.env.RESEND_API_KEY;
const resend = key ? new Resend(key) : null;

export async function sendOtpEmail(email: string, code: string) {
  if (!resend) {
    return;
  }
  //   await resend.emails.send({
  //     from: "Fisk Events <no-reply@fisk.edu>",
  //     to: email,
  //     subject: "Your verification code",
  //     html: `<p>Your code is <strong>${code}</strong>. It expires in 5 minutes.</p>`,
  //   });
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "mgbemeleikechukwu@gmail.com",
    subject: "Your verification code",
    html: `<p>Your code is <strong>${code}</strong>. It expires in 5 minutes.</p>`,
  });
}
