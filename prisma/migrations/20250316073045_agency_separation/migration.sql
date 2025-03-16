-- AlterTable
ALTER TABLE `billentry` ALTER COLUMN `agencyId` DROP DEFAULT;

-- AlterTable
ALTER TABLE `customer` ALTER COLUMN `agencyId` DROP DEFAULT;

-- AlterTable
ALTER TABLE `debitnote` ALTER COLUMN `agencyId` DROP DEFAULT;

-- AlterTable
ALTER TABLE `payment` ALTER COLUMN `agencyId` DROP DEFAULT;

-- AlterTable
ALTER TABLE `supplier` ALTER COLUMN `agencyId` DROP DEFAULT;
