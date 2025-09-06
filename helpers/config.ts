export type RoomFeature =
  | "projector"
  | "whiteboard"
  | "audio"
  | "accessible"
  | "outlets";

export type Room = {
  id: string;
  building: string;
  roomNumber: string;
  capacity: number;
  features: RoomFeature[];
  isFree: boolean;
};

export type Club = {
  id: string;
  name: string;
};

export type EventDraft = {
  title: string;
  clubId: string;
  description?: string;
  startAt: string;
  endAt: string;
  minCapacity: number;
  roomId?: string;
};

export const CLUBS = [
  { id: "c1", name: "ACM" },
  { id: "c2", name: "Black Student Union" },
  { id: "c3", name: "Robotics" },
];

export interface User {
  id: string;
  email: string;
}
