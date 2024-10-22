-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Moderator', 'User', 'Instructor');

-- CreateTable
CREATE TABLE "instructor" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "PasswordCode" TEXT,
    "isConfirmed" BOOLEAN DEFAULT false,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "roles" "Role" NOT NULL DEFAULT 'Admin'
);

-- CreateTable
CREATE TABLE "student" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "PasswordCode" TEXT,
    "isConfirmed" BOOLEAN DEFAULT false,
    "phone" TEXT,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "instructor_id_key" ON "instructor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "instructor_email_key" ON "instructor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "student_id_key" ON "student"("id");

-- CreateIndex
CREATE UNIQUE INDEX "student_email_key" ON "student"("email");
