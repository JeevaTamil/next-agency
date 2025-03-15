-- AlterTable
ALTER TABLE `Bank` ADD COLUMN `agencyId` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `BillEntry` ADD COLUMN `agencyId` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `Customer` ADD COLUMN `agencyId` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `DebitNote` ADD COLUMN `agencyId` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `Payment` ADD COLUMN `agencyId` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `Supplier` ADD COLUMN `agencyId` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `Transport` ADD COLUMN `agencyId` INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE `Agency` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_agencyId_fkey` FOREIGN KEY (`agencyId`) REFERENCES `Agency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supplier` ADD CONSTRAINT `Supplier_agencyId_fkey` FOREIGN KEY (`agencyId`) REFERENCES `Agency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transport` ADD CONSTRAINT `Transport_agencyId_fkey` FOREIGN KEY (`agencyId`) REFERENCES `Agency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BillEntry` ADD CONSTRAINT `BillEntry_agencyId_fkey` FOREIGN KEY (`agencyId`) REFERENCES `Agency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_agencyId_fkey` FOREIGN KEY (`agencyId`) REFERENCES `Agency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bank` ADD CONSTRAINT `Bank_agencyId_fkey` FOREIGN KEY (`agencyId`) REFERENCES `Agency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DebitNote` ADD CONSTRAINT `DebitNote_agencyId_fkey` FOREIGN KEY (`agencyId`) REFERENCES `Agency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
