"use client";

import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogFooter } from "@/components/ui/dialog";
import { safeFetch } from "@/helpers/utils";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteEventButton({
  eventId,
  onDeleted,
}: {
  eventId: string;
  onDeleted: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await safeFetch(`/api/event/delete-event/${eventId}`, {
        method: "DELETE",
      });
      toast.success("Event deleted successfully :)");
      onDeleted();
      setOpen(false);
    } catch (e: any) {
      console.log(e);
      toast.error(e?.message || "Could not delete event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
          aria-label="Delete event"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this event?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. The event will be permanently removed.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            onClick={(e) => {
              setOpen(false);
            }}
            className="bg-black"
          >
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              handleConfirm();
            }}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}Yes,
            delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
