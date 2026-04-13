-- CreateEnum
CREATE TYPE "FormTheme" AS ENUM ('AMBER', 'BLUE', 'CYAN', 'EMERALD', 'FUCHSIA', 'GREEN', 'INDIGO', 'LIME', 'ORANGE', 'PINK', 'PURPLE', 'RED', 'ROSE', 'SKY', 'TEAL', 'VIOLET', 'YELLOW');

-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "description" TEXT,
ADD COLUMN     "theme" "FormTheme" NOT NULL DEFAULT 'BLUE',
ADD COLUMN     "title" TEXT;
