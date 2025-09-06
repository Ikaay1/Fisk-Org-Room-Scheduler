import Home from "@/components/Home";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import AppShell from "@/components/AppShell";
import { safeFetch } from "@/helpers/utils";
import { Club, Room } from "@/helpers/config";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function getUserFromToken() {
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

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const getRooms = async () => {
  try {
    const rooms: { rooms: Room[] } = await safeFetch(
      `${baseUrl}/api/room/get-rooms`,
      {
        method: "GET",
      }
    );
    return rooms.rooms;
  } catch (err) {
    return [];
  }
};

const getClubs = async () => {
  try {
    const clubs: { clubs: Club[] } = await safeFetch(
      `${baseUrl}/api/club/get-clubs`,
      {
        method: "GET",
      }
    );
    return clubs.clubs;
  } catch (err) {
    return [];
  }
};

export default async function HomePage() {
  const user = await getUserFromToken();
  const rooms = await getRooms();
  const clubs = await getClubs();

  console.log(clubs);

  if (!user) {
    redirect("/login");
  }

  return (
    <AppShell user={user}>
      <Home user={user} rooms={rooms} clubs={clubs} />
    </AppShell>
  );
}
