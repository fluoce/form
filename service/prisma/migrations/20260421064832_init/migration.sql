/*
  Warnings:

  - The values [DELETED] on the enum `WorkspaceStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "WorkspaceStatus_new" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'ARCHIVED');
ALTER TABLE "public"."Workspace" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Workspace" ALTER COLUMN "status" TYPE "WorkspaceStatus_new" USING ("status"::text::"WorkspaceStatus_new");
ALTER TYPE "WorkspaceStatus" RENAME TO "WorkspaceStatus_old";
ALTER TYPE "WorkspaceStatus_new" RENAME TO "WorkspaceStatus";
DROP TYPE "public"."WorkspaceStatus_old";
ALTER TABLE "Workspace" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterTable
ALTER TABLE "Form" ALTER COLUMN "theme" SET DEFAULT 'DEFAULT';
