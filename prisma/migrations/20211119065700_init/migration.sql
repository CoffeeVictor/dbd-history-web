-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "killerId" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Killer" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,

    CONSTRAINT "Killer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Survivor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,

    CONSTRAINT "Survivor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Map" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "realm" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Match_killerId_key" ON "Match"("killerId");

-- CreateIndex
CREATE UNIQUE INDEX "Match_mapId_key" ON "Match"("mapId");

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_killerId_fkey" FOREIGN KEY ("killerId") REFERENCES "Killer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Survivor" ADD CONSTRAINT "Survivor_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
