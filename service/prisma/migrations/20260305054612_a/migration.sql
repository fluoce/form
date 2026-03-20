/*
  Warnings:

  - You are about to drop the column `title` on the `FormPage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FormPage" DROP COLUMN "title",
ADD COLUMN     "name" TEXT;
