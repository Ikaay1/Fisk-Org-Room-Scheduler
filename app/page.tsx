import Home from "@/components/Home";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

async function getUserFromToken() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    return {
      id: payload.sub as string,
      email: payload.email as string,
    };
  } catch (err) {
    return null;
  }
}

export default async function HomePage() {
  const user = await getUserFromToken();

  if (!user) {
    redirect("/login");
  }

  return <Home />;
}
