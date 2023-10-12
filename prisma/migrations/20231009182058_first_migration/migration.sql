-- CreateEnum
CREATE TYPE "USER_ROLE" AS ENUM ('ADMIN', 'STANDARD');

-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('SCHOOL', 'OFFICE');

-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('UP', 'DOWN');

-- CreateEnum
CREATE TYPE "RedFlag" AS ENUM ('UNPAID_INTERNSHIP', 'UNPAID_OVERTIME', 'STARVING_SALARY', 'UNEQUAL_SALARIES', 'CHANGES_IN_EMPLOYMENT_CONDITIONS', 'DELAYED_PAYSLIPS', 'PAYCHECK_LOWER_THEN_AGREED', 'NO_SALARY_INCREASES_OR_BONUSES', 'UNPAID_OR_DEDUCTED_EXPENSES', 'UNCLEAR_SALARY_CALCULATION', 'TRASH_CONTRACTS', 'BORING_PROJECTS', 'INSIGNIFICANT_MONOTONOUS_TASKS', 'TASKS_DONT_MATCH_JOB_DESCRIPTION', 'CHEAPEST_SOLUTIONS_AND_BASIC_DESIGN', 'CANT_GET_MEANINGFUL_EXPERIENCE', 'GLASS_CEILING', 'LACK_OF_MENTORING', 'NO_VARIETY_IN_RESPONSIBILITIES', 'NO_PERSONAL_DEVELOPMENT_PLAN_OR_EDUCATION_BUDGET', 'NOT_POSSIBLE_TO_INFLUENCE_COMPANY_STRATEGY', 'MISSING_OR_STUDENTS_LICENSE', 'REQUIRED_PRIVATE_HARDWARE_OR_SOFTWARE', 'OFFBRAND_OR_FREE_SOFTWARE', 'OLD_HARDWARE_OUTDATED_SOFTWARE', 'BAD_WORKSTATION_BAD_OFFICE', 'MISSING_BASIC_OFFICE_SUPPLIES', 'MICROMANAGEMENT', 'INCOMPETENT_MANAGEMENT', 'INABILITY_TO_GET_PROFITABLE_ASSIGNMENTS', 'FINANCIAL_PROBLEMS', 'OVERLY_RELYING_ON_INTERNS_OR_FREE_LABOUR', 'ILLEGAL_OR_IMMORAL', 'TOXIC_ATMOSPHERE', 'FAVORITISM', 'ABUSE_MOBBING', 'STRESS_PRESSURE', 'UNREALISTIC_DEADLINES', 'CASUAL_OVERTIME', 'SYSTEMATIC_OVERTIME', 'WORK_ON_WEEKEND_AND_HOLIDAYS', 'DENIED_TIME_OFF', 'OVERWHELMING_RESPONSIBILITY', 'ABLEISM', 'AGISM', 'HOMOPHOBIA', 'NEPOTISM', 'RACISM', 'SEXISM', 'TRANSPHOBIA', 'XENOPHOBIA');

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnonymousSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expirationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnonymousSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Survey" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" JSONB NOT NULL,
    "anonymousSessionId" TEXT NOT NULL,

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriber" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("email")
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
    "isVerified" BOOLEAN NOT NULL,
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
    "isVerified" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "countryAlpha2" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alpha2" TEXT NOT NULL,
    "regionSlug" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("slug")
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
    "entityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RedFlagSurvey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Country_alpha2_key" ON "Country"("alpha2");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_anonymousSessionId_fkey" FOREIGN KEY ("anonymousSessionId") REFERENCES "AnonymousSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscriber" ADD CONSTRAINT "Subscriber_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "AnonymousSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "Country" ADD CONSTRAINT "Country_regionSlug_fkey" FOREIGN KEY ("regionSlug") REFERENCES "Region"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedFlagCounter" ADD CONSTRAINT "RedFlagCounter_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedFlagSurvey" ADD CONSTRAINT "RedFlagSurvey_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
