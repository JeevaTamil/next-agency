-- DropForeignKey
ALTER TABLE `Payment` DROP FOREIGN KEY `Payment_bankId_fkey`;

-- DropIndex
DROP INDEX `Payment_bankId_fkey` ON `Payment`;

-- AlterTable
ALTER TABLE `Payment` MODIFY `bankId` INTEGER NULL,
    MODIFY `referenceNumber` VARCHAR(30) NULL;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_bankId_fkey` FOREIGN KEY (`bankId`) REFERENCES `Bank`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
