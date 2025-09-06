import { fmtTimeRange } from "@/helpers/utils";
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
import { Club } from "@/helpers/config";

function BookRoomButton({
  roomId,
  startAt,
  endAt,
  disabled,
  capacity,
  clubs,
}: {
  roomId: string;
  startAt: string;
  endAt: string;
  disabled?: boolean;
  capacity: number;
  clubs: Club[];
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
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
          onSubmit={(draft) => {
            console.log("create draft", draft);
            setOpen(false);
          }}
          startAt={startAt}
          endAt={endAt}
          capacity={capacity}
          clubs={clubs}
        />
      </DialogContent>
    </Dialog>
  );
}

export default BookRoomButton;
