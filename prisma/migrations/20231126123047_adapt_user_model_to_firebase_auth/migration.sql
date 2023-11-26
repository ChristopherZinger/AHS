/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hashedPassword` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[firestoreAuthUid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firestoreAuthUid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "hashedPassword",
DROP COLUMN "role",
ADD COLUMN     "firestoreAuthUid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_firestoreAuthUid_key" ON "User"("firestoreAuthUid");
