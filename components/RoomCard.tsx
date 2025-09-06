import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Users, X } from "lucide-react";
import { CapacityBar, FeaturePill } from "./Utilities";
import { fmtTimeRange } from "@/helpers/utils";
import BookRoomButton from "./BookRoomButton";
import { motion } from "framer-motion";
import { Club, Room, User } from "@/helpers/config";

function RoomCard({
  room,
  startAt,
  endAt,
  capacity,
  clubs,
  user,
}: {
  room: Room;
  startAt: string;
  endAt: string;
  capacity: number;
  clubs: Club[];
  user: User;
}) {
  const free = room.isFree;
  console.log(room);
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center justify-between">
            <span>
              {room.building} · {room.roomNumber}
            </span>
            <Badge variant={free ? "default" : "destructive"} className="gap-1">
              {free ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : (
                <X className="h-3.5 w-3.5" />
              )}
              {free ? "Available" : "Busy"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>Capacity {room.capacity}</span>
          </div>
          <CapacityBar value={room.capacity} />
          <div className="flex flex-wrap gap-1.5">
            {room.features.map((f) => (
              <FeaturePill key={f} feature={f} />
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{fmtTimeRange(startAt, endAt)}</span>
          </div>

          <div className="pt-1">
            <BookRoomButton
              roomId={room.id}
              disabled={!free}
              startAt={startAt}
              endAt={endAt}
              capacity={capacity}
              clubs={clubs}
              creatorId={user.id}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default RoomCard;
