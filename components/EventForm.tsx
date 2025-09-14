import { getStringDate, toUtc } from "@/helpers/utils";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DialogFooter } from "@/components/ui/dialog";
import { Club, EventDraft } from "@/helpers/config";

function EventForm({
  onSubmit,
  startAt,
  endAt,
  capacity,
  clubs,
  loading,
}: {
  onSubmit: (draft: EventDraft) => void;
  startAt: Date;
  endAt: Date;
  capacity: number;
  clubs: Club[];
  loading: boolean;
}) {
  const [title, setTitle] = useState("");
  const [clubId, setClubId] = useState(clubs[0]?.id ?? "");
  const [description, setDescription] = useState("");

  const canSubmit = title && clubId && new Date(endAt) > new Date(startAt);

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSubmit) return;
        onSubmit({
          title,
          clubId,
          description,
          minCapacity: capacity,
          startAt: toUtc(startAt),
          endAt: toUtc(endAt),
        });
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Hack Night"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label>Club</Label>
          <Select value={clubId} onValueChange={setClubId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a club" />
            </SelectTrigger>
            <SelectContent>
              {clubs.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Description (optional)</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What’s happening?"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <Label>Expected attendance</Label>
          <Input disabled type="number" min={1} value={capacity} />
        </div>
        <div className="space-y-1.5">
          <Label>Start</Label>
          <Input
            disabled
            type="datetime-local"
            value={getStringDate(startAt)}
          />
        </div>
        <div className="space-y-1.5">
          <Label>End</Label>
          <Input disabled type="datetime-local" value={getStringDate(endAt)} />
        </div>
      </div>

      <DialogFooter className="pt-1">
        <Button
          type="submit"
          className="gap-2"
          disabled={!canSubmit || loading}
        >
          <Plus className="h-4 w-4" />
          Create Event
        </Button>
      </DialogFooter>
    </form>
  );
}

export default EventForm;
