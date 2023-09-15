/*
  Warnings:

  - You are about to drop the column `anonymousSessionId` on the `RedFlagSurvey` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[surveyId]` on the table `RedFlagSurvey` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `surveyId` to the `RedFlagSurvey` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RedFlagSurvey" DROP CONSTRAINT "RedFlagSurvey_anonymousSessionId_fkey";

-- AlterTable
ALTER TABLE "RedFlagSurvey" DROP COLUMN "anonymousSessionId",
ADD COLUMN     "surveyId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Survey" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "anonymousSessionId" TEXT NOT NULL,

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RedFlagSurvey_surveyId_key" ON "RedFlagSurvey"("surveyId");

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_anonymousSessionId_fkey" FOREIGN KEY ("anonymousSessionId") REFERENCES "AnonymousSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedFlagSurvey" ADD CONSTRAINT "RedFlagSurvey_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
