"use client";

import AppShell from "@/components/AppShell";
import AvailabilityGrid from "@/components/AvailabilityGrid";
import FiltersBar from "@/components/FiltersBar";
import { useDebounced } from "@/components/Utilities";
import { useMemo, useState } from "react";
import { Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isoLocalNextHour } from "@/helpers/utils";
import { Club, Room, RoomFeature } from "@/helpers/config";

export default function Home({
  rooms,
  clubs,
}: {
  rooms: Room[];
  clubs: Club[];
}) {
  const [q, setQ] = useState("");
  const [capacity, setCapacity] = useState(10);
  const [features, setFeatures] = useState<RoomFeature[]>([]);
  const [startAt, setStartAt] = useState<string>("");
  const [endAt, setEndAt] = useState<string>("");

  const dq = useDebounced(q);

  const filteredRooms = useMemo(() => {
    const text = dq.trim().toLowerCase();
    return rooms.filter((r) => {
      const matchesQ = text
        ? `${r.building} ${r.roomNumber}`.toLowerCase().includes(text)
        : true;
      const matchesCap = r.capacity >= capacity;
      const matchesFeatures =
        features.length === 0
          ? true
          : features.every((f) => r.features.includes(f));
      return matchesQ && matchesCap && matchesFeatures;
    });
  }, [dq, capacity, features]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <FiltersBar
          q={q}
          setQ={setQ}
          capacity={capacity}
          setCapacity={setCapacity}
          features={features}
          setFeatures={setFeatures}
          startAt={startAt}
          setStartAt={setStartAt}
          endAt={endAt}
          setEndAt={setEndAt}
        />

        <AvailabilityGrid
          rooms={filteredRooms}
          startAt={startAt}
          endAt={endAt}
          capacity={capacity}
          clubs={clubs}
        />
      </div>

      <aside className="space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="justify-start gap-2"
              onClick={() => {
                const s = isoLocalNextHour(1);
                const e = isoLocalNextHour(3);
                setStartAt(s);
                setEndAt(e);
              }}
            >
              <Clock className="h-4 w-4" /> Use next 2 hours
            </Button>
            <Button
              variant="outline"
              className="justify-start gap-2"
              onClick={() => {
                if (!features.includes("projector")) {
                  setFeatures((prevFeatures) => [...prevFeatures, "projector"]);
                }
              }}
            >
              <ChevronRight className="h-4 w-4" /> Needs projector
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Tips</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              “Pending” bookings should still block time windows to prevent
              double booking. Enforce overlap checks in a DB transaction.
            </p>
            <p>
              Offer a flexible-time suggestion if no rooms match: show nearest
              free 60–90 minute windows.
            </p>
            <p>
              Add iCal feeds so students can add events to personal calendars.
            </p>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
