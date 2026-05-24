-- CreateEnum
CREATE TYPE "FormSubmitStatus" AS ENUM ('PARTIAL', 'COMPLETED');

-- CreateTable
CREATE TABLE "Submit" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "status" "FormSubmitStatus" NOT NULL DEFAULT 'PARTIAL',
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Submit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubmissionAnswer" (
    "id" TEXT NOT NULL,
    "submitId" TEXT NOT NULL,
    "fieldId" TEXT NOT NULL,
    "valueText" TEXT,
    "valueNumber" DOUBLE PRECISION,
    "valueBoolean" BOOLEAN,
    "valueJson" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubmissionAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Submit_formId_idx" ON "Submit"("formId");

-- CreateIndex
CREATE INDEX "SubmissionAnswer_submitId_idx" ON "SubmissionAnswer"("submitId");

-- CreateIndex
CREATE INDEX "SubmissionAnswer_fieldId_idx" ON "SubmissionAnswer"("fieldId");

-- CreateIndex
CREATE UNIQUE INDEX "SubmissionAnswer_submitId_fieldId_key" ON "SubmissionAnswer"("submitId", "fieldId");

-- AddForeignKey
ALTER TABLE "Submit" ADD CONSTRAINT "Submit_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionAnswer" ADD CONSTRAINT "SubmissionAnswer_submitId_fkey" FOREIGN KEY ("submitId") REFERENCES "Submit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionAnswer" ADD CONSTRAINT "SubmissionAnswer_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "FormField"("id") ON DELETE CASCADE ON UPDATE CASCADE;
