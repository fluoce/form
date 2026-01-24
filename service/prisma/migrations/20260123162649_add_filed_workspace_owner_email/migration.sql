/*
  Warnings:

  - Added the required column `ownerEmail` to the `Workspace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "ownerEmail" TEXT NOT NULL;
