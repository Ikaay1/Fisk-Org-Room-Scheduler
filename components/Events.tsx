"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";
import { ClubEvent } from "@/helpers/config";

const Events = ({ events }: { events: ClubEvent[] }) => {
  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Booked Events</h1>

      {events.length === 0 ? (
        <p className="text-muted-foreground">
          You haven’t booked any events yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="hover:shadow-lg transition">
                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  {event.club && (
                    <Badge variant="secondary" className="mt-1">
                      {event.club.name}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  {event.description && (
                    <p className="text-muted-foreground">{event.description}</p>
                  )}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    <span>
                      {new Date(event.startAt).toLocaleString()} →{" "}
                      {new Date(event.endAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {event.room.building} - {event.room.roomNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Capacity: {event.minCapacity}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Events;
