import Home from "@/components/Home";

import { redirect } from "next/navigation";
import AppShell from "@/components/AppShell";
import { safeFetch } from "@/helpers/utils";
import { Club, ClubEvent, Room } from "@/helpers/config";
import { getUserFromServerComponent } from "@/lib/auth-server";

export const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

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

const getEvents = async () => {
  try {
    const events: { events: ClubEvent[] } = await safeFetch(
      `${baseUrl}/api/event/get-events`,
      {
        method: "GET",
      }
    );
    return events.events;
  } catch (err) {
    return [];
  }
};

export default async function HomePage() {
  const user = await getUserFromServerComponent();
  if (!user) return;
  const rooms = await getRooms();
  const clubs = await getClubs();
  const events = await getEvents();

  return (
    <AppShell>
      <Home user={user} rooms={rooms} clubs={clubs} events={events} />
    </AppShell>
  );
}
