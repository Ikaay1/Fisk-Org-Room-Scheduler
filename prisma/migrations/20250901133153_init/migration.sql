/*
  Warnings:

  - The primary key for the `Rooms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."Rooms" DROP CONSTRAINT "Rooms_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Rooms_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Rooms_id_seq";

-- AlterTable
ALTER TABLE "public"."User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";
