<<<<<<< HEAD:prisma/migrations/20241028205952_init/migration.sql
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Moderator', 'User', 'Instructor', 'Student');

-- CreateEnum
CREATE TYPE "questionsLeven" AS ENUM ('easy', 'medium', 'hard', 'veryHard');

-- CreateTable
CREATE TABLE "instructor" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/dvale399i/image/upload/v1730144472/images_mbzxb4.jpg',
    "password" TEXT NOT NULL,
    "PasswordCode" TEXT,
    "isConfirmed" BOOLEAN DEFAULT false,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "roles" "Role" NOT NULL DEFAULT 'Instructor'
);

-- CreateTable
CREATE TABLE "student" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "image" TEXT DEFAULT 'https://res.cloudinary.com/dvale399i/image/upload/v1730144472/images_mbzxb4.jpg',
    "password" TEXT NOT NULL,
    "PasswordCode" TEXT,
    "isConfirmed" BOOLEAN DEFAULT false,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "roles" "Role" NOT NULL DEFAULT 'User'
);

-- CreateTable
CREATE TABLE "course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "instructorId" INTEGER NOT NULL,
    "image" TEXT DEFAULT 'https://res.cloudinary.com/dvale399i/image/upload/v1730144447/download_l7bhig.jpg',
    "video" TEXT
);

-- CreateTable
CREATE TABLE "quiz" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "question" (
    "id" SERIAL NOT NULL,
    "leven" "questionsLeven" NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "quizId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "instructor_id_key" ON "instructor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "instructor_email_key" ON "instructor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "student_id_key" ON "student"("id");

-- CreateIndex
CREATE UNIQUE INDEX "student_email_key" ON "student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "course_id_key" ON "course"("id");

-- CreateIndex
CREATE UNIQUE INDEX "quiz_id_key" ON "quiz"("id");

-- CreateIndex
CREATE UNIQUE INDEX "question_id_key" ON "question"("id");

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "instructor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
=======
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Moderator', 'User', 'Instructor', 'Student');

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
    "roles" "Role" NOT NULL DEFAULT 'Instructor'
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
    "email" TEXT NOT NULL,
    "roles" "Role" NOT NULL DEFAULT 'User'
);

-- CreateTable
CREATE TABLE "course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "instructorId" INTEGER NOT NULL,
    "imgUrl" TEXT,
    "photoUrl" TEXT,
    "videoUrl" TEXT
);

-- CreateTable
CREATE TABLE "quiz" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "question" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "quizId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "instructor_id_key" ON "instructor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "instructor_email_key" ON "instructor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "student_id_key" ON "student"("id");

-- CreateIndex
CREATE UNIQUE INDEX "student_email_key" ON "student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "course_id_key" ON "course"("id");

-- CreateIndex
CREATE UNIQUE INDEX "quiz_id_key" ON "quiz"("id");

-- CreateIndex
CREATE UNIQUE INDEX "question_id_key" ON "question"("id");

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "instructor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
>>>>>>> 5eb5d64d1bf1c68b079660488b94ad7beea29206:prisma/migrations/20241023180214_start_work/migration.sql
