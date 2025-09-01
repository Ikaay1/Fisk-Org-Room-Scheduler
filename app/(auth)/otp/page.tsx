import { getUserFromToken } from "@/app/page";
import Otp from "@/components/Otp";
import { redirect } from "next/navigation";

export default async function OtpPage() {
  const user = await getUserFromToken();

  if (user) {
    redirect("/");
  }
  return <Otp />;
}
