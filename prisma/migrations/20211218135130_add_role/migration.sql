-- AlterTable
ALTER TABLE "Killer" ADD COLUMN     "isPlayer" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Survivor" ADD COLUMN     "isPlayer" BOOLEAN NOT NULL DEFAULT false;
