import { safeFetch } from "@/helpers/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DoorOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EventForm from "./EventForm";
import { Club, ClubEvent, EventDraft } from "@/helpers/config";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function BookRoomButton({
  roomId,
  startAt,
  endAt,
  disabled,
  capacity,
  clubs,
  creatorId,
  event,
}: {
  roomId: string;
  startAt: Date;
  endAt: Date;
  disabled?: boolean;
  capacity: number;
  clubs: Club[];
  creatorId: string;
  event?: ClubEvent;
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleBookRoom = async (draft: EventDraft) => {
    setLoading(true);
    try {
      await safeFetch(`/api/event/create-event/${event ? event.id : "new"}`, {
        method: "POST",
        body: JSON.stringify({
          ...draft,
          roomId,
          creatorId,
        }),
      });
      toast.success("Event created successfully :)");
      router.push("/events");
    } catch (e: any) {
      toast.error(e?.message || "Could not create event");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={disabled || loading} className="w-full">
          <DoorOpen className="h-4 w-4 mr-2" />
          {disabled
            ? event && event.roomId == roomId
              ? "Meeting's current"
              : "Unavailable"
            : "Request booking"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create a new club event</DialogTitle>
          <DialogDescription>
            Draft details now; pick a room after you check availability.
          </DialogDescription>
        </DialogHeader>
        <EventForm
          onSubmit={async (draft) => {
            handleBookRoom(draft).then(() => {
              setOpen(false);
            });
          }}
          startAt={startAt}
          endAt={endAt}
          capacity={capacity}
          clubs={clubs}
          loading={loading}
          event={event}
        />
      </DialogContent>
    </Dialog>
  );
}

export default BookRoomButton;
