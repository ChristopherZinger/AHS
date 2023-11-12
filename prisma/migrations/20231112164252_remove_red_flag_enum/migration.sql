/*
  Warnings:

  - The `redFlags` column on the `RedFlagSurvey` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `redFlagName` on the `RedFlagCounter` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "RedFlagCounter" DROP COLUMN "redFlagName",
ADD COLUMN     "redFlagName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RedFlagSurvey" DROP COLUMN "redFlags",
ADD COLUMN     "redFlags" TEXT[];

-- DropEnum
DROP TYPE "RedFlag";
