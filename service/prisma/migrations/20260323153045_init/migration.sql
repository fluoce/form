/*
  Warnings:

  - A unique constraint covering the columns `[formPageId,position]` on the table `FormField` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[formId,position]` on the table `FormPage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FormField_formPageId_position_key" ON "FormField"("formPageId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "FormPage_formId_position_key" ON "FormPage"("formId", "position");
