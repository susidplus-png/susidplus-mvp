/*
  Warnings:

  - A unique constraint covering the columns `[interactionId,authorId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Review_interactionId_authorId_key" ON "Review"("interactionId", "authorId");
