export const FISK_EMAIL_RE = /@([\w.-]+\.)?fisk\.edu$/i;
export function isFiskEmail(email: string) {
  return FISK_EMAIL_RE.test(email.trim());
}

export type OtpPayload = {
  email: string;
  code?: string;
};
