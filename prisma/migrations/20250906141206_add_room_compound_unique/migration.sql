/*
  Warnings:

  - You are about to drop the `Rooms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Rooms";

-- CreateTable
CREATE TABLE "public"."Room" (
    "id" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "features" TEXT[],
    "roomNumber" TEXT NOT NULL DEFAULT '',
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_building_roomNumber_key" ON "public"."Room"("building", "roomNumber");
