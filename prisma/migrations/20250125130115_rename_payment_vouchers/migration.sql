/*
  Warnings:

  - You are about to drop the `PaymentVoucher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `PaymentVoucher` DROP FOREIGN KEY `PaymentVoucher_bankId_fkey`;

-- DropForeignKey
ALTER TABLE `PaymentVoucher` DROP FOREIGN KEY `PaymentVoucher_billEntryId_fkey`;

-- DropTable
DROP TABLE `PaymentVoucher`;

-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `billEntryId` INTEGER NOT NULL,
    `transactionAmount` DOUBLE NOT NULL,
    `bankId` INTEGER NOT NULL,
    `mode` VARCHAR(10) NOT NULL,
    `referenceNumber` VARCHAR(30) NOT NULL,
    `additionalNote` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_billEntryId_fkey` FOREIGN KEY (`billEntryId`) REFERENCES `BillEntry`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_bankId_fkey` FOREIGN KEY (`bankId`) REFERENCES `Bank`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
