export type RoomFeature =
  | "projector"
  | "whiteboard"
  | "audio"
  | "accessible"
  | "outlets";

export type Room = {
  id: string;
  building: string;
  name: string;
  capacity: number;
  features: RoomFeature[];
};

export type EventDraft = {
  title: string;
  clubId: string;
  description?: string;
  startAt: string; // ISO
  endAt: string; // ISO
  expected: number;
  roomId?: string;
};

export const ROOMS: Room[] = [
  {
    id: "r1",
    building: "Science Hall",
    name: "101",
    capacity: 40,
    features: ["projector", "whiteboard", "outlets"],
  },
  {
    id: "r2",
    building: "Science Hall",
    name: "204",
    capacity: 90,
    features: ["projector", "audio", "accessible"],
  },
  {
    id: "r3",
    building: "Student Center",
    name: "Multipurpose A",
    capacity: 150,
    features: ["audio", "accessible", "outlets"],
  },
  {
    id: "r4",
    building: "Library",
    name: "Seminar 2",
    capacity: 25,
    features: ["whiteboard", "outlets"],
  },
  {
    id: "r5",
    building: "Engineering",
    name: "E-120",
    capacity: 60,
    features: ["projector", "whiteboard", "accessible"],
  },
];

export const CLUBS = [
  { id: "c1", name: "ACM" },
  { id: "c2", name: "Black Student Union" },
  { id: "c3", name: "Robotics" },
];
