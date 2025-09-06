import { getUserFromToken } from "@/app/page";
import Login from "@/components/Login";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getUserFromToken();

  if (user) {
    redirect("/");
  }
  return <Login />;
}
