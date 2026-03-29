/*
  Warnings:

  - Changed the type of `position` on the `FormPage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "FormPage" DROP COLUMN "position",
ADD COLUMN     "position" DECIMAL(65,30) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FormPage_formId_position_key" ON "FormPage"("formId", "position");
