-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_killerId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_mapId_fkey";

-- AddForeignKey
ALTER TABLE "Match" ADD FOREIGN KEY ("killerId") REFERENCES "Killer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE CASCADE;
