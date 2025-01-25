-- CreateTable
CREATE TABLE `PaymentVoucher` (
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

-- CreateTable
CREATE TABLE `Bank` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PaymentVoucher` ADD CONSTRAINT `PaymentVoucher_billEntryId_fkey` FOREIGN KEY (`billEntryId`) REFERENCES `BillEntry`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentVoucher` ADD CONSTRAINT `PaymentVoucher_bankId_fkey` FOREIGN KEY (`bankId`) REFERENCES `Bank`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
