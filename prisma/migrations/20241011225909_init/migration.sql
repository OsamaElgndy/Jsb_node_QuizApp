-- CreateTable
CREATE TABLE "instructor" (
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
