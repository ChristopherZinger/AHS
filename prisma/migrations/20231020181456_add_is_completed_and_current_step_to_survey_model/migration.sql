-- AlterTable
ALTER TABLE "Survey" 
ADD column "currentStep" INTEGER NOT NULL DEFAULT 0,
ADD column "isCompleted" BOOLEAN NOT NULL DEFAULT false;

-- Set currentStep
UPDATE "Survey"
SET "currentStep" = CASE 
           WHEN "data" is not null and "data"->'currentStep' is not null
           THEN cast("data"->>'currentStep' as integer )
           ELSE "currentStep"
         END;
         
        
-- set isCompleted
UPDATE "Survey"
SET "isCompleted" = CASE 
           WHEN "data" is not null and cast("data"->>'currentStep' as integer) = 5 
           THEN true
           ELSE false
         END;