import { Club, ClubEvent, Room, User } from "@/helpers/config";
import EmptyState from "./EmptyState";
import RoomCard from "./RoomCard";

function AvailabilityGrid({
  rooms,
  startAt,
  endAt,
  capacity,
  clubs,
  user,
  events,
  event,
}: {
  rooms: Room[];
  startAt: Date;
  endAt: Date;
  capacity: number;
  clubs: Club[];
  user: User;
  events: ClubEvent[];
  event?: ClubEvent;
}) {
  if (!startAt || !endAt) {
    return (
      <EmptyState
        title="Pick a date & time"
        description="Choose a start and end time to see which rooms are free."
      />
    );
  }

  if (new Date(endAt) <= new Date(startAt)) {
    return (
      <EmptyState
        title="End time must be after start"
        description="Adjust your time window and try again."
        variant="warn"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          startAt={startAt}
          endAt={endAt}
          capacity={capacity}
          clubs={clubs}
          user={user}
          events={events}
          event={event}
        />
      ))}
    </div>
  );
}

export default AvailabilityGrid;
