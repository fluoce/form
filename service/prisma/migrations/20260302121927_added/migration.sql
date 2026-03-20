/*
  Warnings:

  - A unique constraint covering the columns `[workspaceId,slug]` on the table `Form` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Form_slug_key";

-- CreateTable
CREATE TABLE "FormPage" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "title" TEXT,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormField" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "formPageId" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormField_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FormPage_formId_idx" ON "FormPage"("formId");

-- CreateIndex
CREATE UNIQUE INDEX "FormPage_formId_position_key" ON "FormPage"("formId", "position");

-- CreateIndex
CREATE INDEX "FormField_formId_idx" ON "FormField"("formId");

-- CreateIndex
CREATE UNIQUE INDEX "FormField_formPageId_position_key" ON "FormField"("formPageId", "position");

-- CreateIndex
CREATE INDEX "Form_workspaceId_status_idx" ON "Form"("workspaceId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Form_workspaceId_slug_key" ON "Form"("workspaceId", "slug");

-- AddForeignKey
ALTER TABLE "FormPage" ADD CONSTRAINT "FormPage_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormField" ADD CONSTRAINT "FormField_formPageId_fkey" FOREIGN KEY ("formPageId") REFERENCES "FormPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormField" ADD CONSTRAINT "FormField_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;
