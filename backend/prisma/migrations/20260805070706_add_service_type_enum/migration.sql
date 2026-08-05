-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('FREE', 'PAID', 'BARTER');

-- AlterTable
ALTER TABLE "Service"
ALTER COLUMN "serviceType" DROP DEFAULT;

ALTER TABLE "Service"
ALTER COLUMN "serviceType" TYPE "ServiceType"
USING ("serviceType"::"ServiceType");

ALTER TABLE "Service"
ALTER COLUMN "serviceType" SET DEFAULT 'PAID';