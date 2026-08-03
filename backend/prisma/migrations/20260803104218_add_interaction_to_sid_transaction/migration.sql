-- AlterTable
ALTER TABLE "SIDTransaction" ADD COLUMN     "interactionId" TEXT;

-- AddForeignKey
ALTER TABLE "SIDTransaction" ADD CONSTRAINT "SIDTransaction_interactionId_fkey" FOREIGN KEY ("interactionId") REFERENCES "Interaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
