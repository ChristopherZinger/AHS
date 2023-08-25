-- CreateEnum
CREATE TYPE "USER_ROLE" AS ENUM ('ADMIN', 'STANDARD');

-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('SCHOOL', 'OFFICE');

-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('UP', 'DOWN');

-- CreateEnum
CREATE TYPE "RedFlag" AS ENUM ('UNPAID_INTERNSHIP', 'UNPAID_OVERTIME', 'STARVING_SALARY', 'OVERDUE_PAYOUT', 'PAYSLIP_LOWER_THEN_AGREED', 'GETTING_RAISE_IS_IMPOSSIBLE', 'UNPAID_EXPENSES', 'BORING_PROJECTS', 'UNREALISTIC_DEADLINES', 'TASK_DONT_MATCH_JOB_DESCRIPTION', 'MONOTONOUS_TASKS', 'CHEAPEST_SOLUTIONS_AND_BASIC_DESIGN', 'TOO_MUCH_RESPONSIBILITY', 'TOO_LITTLE_RESPONSIBILITY', 'NO_ROOM_FOR_DEVELOPMENT', 'CANT_GET_MEANINGFUL_EXPERIENCE', 'GLASS_CEILING', 'MISSING_OR_STUDENTS_LICENSE', 'REQUIRED_PRIVATE_HARDWARE_OR_SOFTWARE', 'OFF_BRAND_OR_FREE_SOFTWARE', 'OLD_HARDWARE_OUTDATED_SOFTWARE', 'BAD_WORKSPACE', 'MISSING_BASIC_MATERIALS', 'ABUSE_MOBBING', 'TOXIC_ATMOSPHERE', 'STRESS_PRESSURE', 'FAVORITISM', 'INTERNS_MAJORITY', 'NARCISSISTIC_MANAGEMENT', 'CASUAL_OVERTIME', 'SYSTEMATIC_OVERTIME', 'WEEKEND_WORK', 'DENIED_TIME_OFF', 'RACISM', 'HOMOPHOBIA', 'ABLEISM', 'XENOPHOBIA', 'TRANSPHOBIA', 'NEPOTISM', 'SEXISM', 'AGISM');

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firebase_id" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "role" "USER_ROLE" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entity" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "EntityType" NOT NULL,
    "name" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "cityId" TEXT NOT NULL,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alias" (
    "id" TEXT NOT NULL,
    "entityType" "EntityType" NOT NULL,
    "name" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,

    CONSTRAINT "Alias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" VARCHAR(4000) NOT NULL,
    "title" VARCHAR(90) NOT NULL,
    "isReviewed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subcomment" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "content" VARCHAR(1500) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parentCommentId" TEXT NOT NULL,

    CONSTRAINT "Subcomment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "type" "VoteType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "countryAlpha2" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alpha2" TEXT NOT NULL,
    "regionName" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "RedFlagCounter" (
    "id" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "redFlagName" "RedFlag" NOT NULL,
    "counter" INTEGER NOT NULL,

    CONSTRAINT "RedFlagCounter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RedFlagSurvey" (
    "id" TEXT NOT NULL,
    "redFlags" "RedFlag"[],
    "authorId" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RedFlagSurvey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_firebase_id_key" ON "Profile"("firebase_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Entity_slug_key" ON "Entity"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Country_alpha2_key" ON "Country"("alpha2");

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alias" ADD CONSTRAINT "Alias_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subcomment" ADD CONSTRAINT "Subcomment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subcomment" ADD CONSTRAINT "Subcomment_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_countryAlpha2_fkey" FOREIGN KEY ("countryAlpha2") REFERENCES "Country"("alpha2") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_regionName_fkey" FOREIGN KEY ("regionName") REFERENCES "Region"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedFlagCounter" ADD CONSTRAINT "RedFlagCounter_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedFlagSurvey" ADD CONSTRAINT "RedFlagSurvey_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedFlagSurvey" ADD CONSTRAINT "RedFlagSurvey_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
