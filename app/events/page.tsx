import { cookies } from "next/headers";
import { baseUrl } from "../page";
import { safeFetch } from "@/helpers/utils";
import { ClubEvent } from "@/helpers/config";
import Events from "@/components/Events";
import AppShell from "@/components/AppShell";

const getUserEvents = async () => {
  try {
    const events: { events: ClubEvent[] } = await safeFetch(
      `${baseUrl}/api/event/get-user-events`,
      {
        method: "GET",
        headers: { cookie: (await cookies()).toString() },
        cache: "no-store",
      }
    );
    return events.events;
  } catch (err) {
    return [];
  }
};

export default async function EventsPage() {
  const events = await getUserEvents();

  return (
    <AppShell>
      <Events events={events} />
    </AppShell>
  );
}
