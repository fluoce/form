-- DropIndex
DROP INDEX "FormField_formPageId_position_key";

-- DropIndex
DROP INDEX "FormPage_formId_position_key";

-- AlterTable
ALTER TABLE "FormField" ALTER COLUMN "position" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "FormPage" ALTER COLUMN "position" SET DATA TYPE TEXT;
