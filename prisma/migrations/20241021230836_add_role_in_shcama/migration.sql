-- AlterTable
ALTER TABLE "instructor" ALTER COLUMN "roles" SET DEFAULT 'Instructor';

-- AlterTable
ALTER TABLE "student" ADD COLUMN     "roles" "Role" NOT NULL DEFAULT 'User';
