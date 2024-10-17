/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `instructor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "student" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "PasswordCode" TEXT,
    "isConfirmed" BOOLEAN DEFAULT false,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "student_id_key" ON "student"("id");

-- CreateIndex
CREATE UNIQUE INDEX "student_email_key" ON "student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "instructor_email_key" ON "instructor"("email");
