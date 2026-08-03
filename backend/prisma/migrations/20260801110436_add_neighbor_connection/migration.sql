-- CreateTable
CREATE TABLE "NeighborConnection" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "neighborId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NeighborConnection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NeighborConnection_userId_neighborId_key" ON "NeighborConnection"("userId", "neighborId");

-- AddForeignKey
ALTER TABLE "NeighborConnection" ADD CONSTRAINT "NeighborConnection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NeighborConnection" ADD CONSTRAINT "NeighborConnection_neighborId_fkey" FOREIGN KEY ("neighborId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
