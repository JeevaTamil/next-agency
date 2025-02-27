-- CreateTable
CREATE TABLE `BillEntry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `billDate` DATETIME(3) NOT NULL,
    `billNumber` VARCHAR(20) NOT NULL,
    `customerId` INTEGER NOT NULL,
    `supplierId` INTEGER NOT NULL,
    `productQty` INTEGER NOT NULL,
    `lrNumber` VARCHAR(20) NOT NULL,
    `lrDate` DATETIME(3) NOT NULL,
    `transportId` INTEGER NOT NULL,
    `freight` DOUBLE NOT NULL,
    `netAmount` DOUBLE NOT NULL,
    `taxType` ENUM('CGST', 'SGST', 'IGST') NOT NULL,
    `grossAmount` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BillEntry` ADD CONSTRAINT `BillEntry_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BillEntry` ADD CONSTRAINT `BillEntry_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Supplier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BillEntry` ADD CONSTRAINT `BillEntry_transportId_fkey` FOREIGN KEY (`transportId`) REFERENCES `Transport`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
