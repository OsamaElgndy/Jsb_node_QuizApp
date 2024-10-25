-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Moderator', 'User', 'Instructor');

-- AlterTable
ALTER TABLE "instructor" ADD COLUMN     "roles" "Role" NOT NULL DEFAULT 'Admin';
