import { getUserFromToken } from "@/app/page";
import Signup from "@/components/Signup";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const user = await getUserFromToken();

  if (user) {
    redirect("/");
  }
  return <Signup />;
}
