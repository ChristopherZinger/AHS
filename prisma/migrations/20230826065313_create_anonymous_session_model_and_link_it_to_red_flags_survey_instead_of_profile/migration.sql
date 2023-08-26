/*
  Warnings:

  - You are about to drop the column `authorId` on the `RedFlagSurvey` table. All the data in the column will be lost.
  - Added the required column `isVerified` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anonymousSessionId` to the `RedFlagSurvey` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RedFlagSurvey" DROP CONSTRAINT "RedFlagSurvey_authorId_fkey";

-- AlterTable
ALTER TABLE "City" ADD COLUMN     "isVerified" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Entity" ALTER COLUMN "isVerified" DROP DEFAULT;

-- AlterTable
ALTER TABLE "RedFlagSurvey" DROP COLUMN "authorId",
ADD COLUMN     "anonymousSessionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AnonymousSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiredAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnonymousSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RedFlagSurvey" ADD CONSTRAINT "RedFlagSurvey_anonymousSessionId_fkey" FOREIGN KEY ("anonymousSessionId") REFERENCES "AnonymousSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
