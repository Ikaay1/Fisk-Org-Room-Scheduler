import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { User } from "@/helpers/config";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "");

export async function getUserFromServerComponent(): Promise<User | null> {
  const token = (await cookies()).get("token")?.value;
  return verifyToken(token);
}

export async function getUserFromRequest(
  req: NextRequest
): Promise<User | null> {
  const token = req.cookies.get("token")?.value;
  return verifyToken(token);
}

async function verifyToken(token?: string | null): Promise<User | null> {
  if (!token || !process.env.JWT_SECRET) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return { id: payload.sub as string, email: payload.email as string };
  } catch {
    return null;
  }
}
