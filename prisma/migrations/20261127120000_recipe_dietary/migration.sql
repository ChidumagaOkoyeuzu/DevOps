-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN "dietary" TEXT[] DEFAULT ARRAY[]::TEXT[];