import { z } from "zod";

const root = "fisk.edu";
const dom = root.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const re = new RegExp(`@([\\w.-]+\\.)?${dom}$`, "i");

export const EmailSchema = z
  .string()
  .email()
  .refine((e) => re.test(e), {
    message: "Email must end with fisk.edu",
  });

export const RequestOtpBody = z.object({ email: EmailSchema });
export const VerifyOtpBody = z.object({
  email: EmailSchema,
  code: z
    .string()
    .length(6)
    .regex(/^[0-9]{6}$/),
});
