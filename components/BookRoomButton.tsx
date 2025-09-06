import { fmtTimeRange, safeFetch } from "@/helpers/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DoorOpen, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EventForm from "./EventForm";
import { Club, EventDraft } from "@/helpers/config";
import { toast } from "sonner";

function BookRoomButton({
  roomId,
  startAt,
  endAt,
  disabled,
  capacity,
  clubs,
  creatorId,
}: {
  roomId: string;
  startAt: string;
  endAt: string;
  disabled?: boolean;
  capacity: number;
  clubs: Club[];
  creatorId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleBookRoom = async (draft: EventDraft) => {
    setLoading(true);
    try {
      await safeFetch("/api/event/create-event", {
        method: "POST",
        body: JSON.stringify({
          ...draft,
          roomId,
          creatorId,
        }),
      });
      toast.success("Event created successfully :)");
    } catch (e: any) {
      console.log("Here", e);
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
          {disabled ? "Unavailable" : "Request booking"}
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
        />
      </DialogContent>
    </Dialog>
  );
}

export default BookRoomButton;
