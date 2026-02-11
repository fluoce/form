/*
  Warnings:

  - Added the required column `userId` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Form_workspaceId_idx";

-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Form_workspaceId_userId_idx" ON "Form"("workspaceId", "userId");
