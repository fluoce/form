/*
  Warnings:

  - The `userAgent` column on the `Submit` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Submit" DROP COLUMN "userAgent",
ADD COLUMN     "userAgent" JSONB;
