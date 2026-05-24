/*
  Warnings:

  - You are about to drop the column `userAgent` on the `Submit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Submit" DROP COLUMN "userAgent",
ADD COLUMN     "browser" TEXT,
ADD COLUMN     "device" TEXT,
ADD COLUMN     "os" TEXT;
