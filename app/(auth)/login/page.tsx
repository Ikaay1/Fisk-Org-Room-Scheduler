import Login from "@/components/Login";
import React from "react";
import { redirect } from "next/navigation";
import { getUserFromToken } from "@/app/page";

export default async function LoginPage() {
  const user = await getUserFromToken();

  if (user) {
    redirect("/");
  }

  <Login />;
}
