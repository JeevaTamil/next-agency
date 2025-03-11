-- CreateTable
CREATE TABLE `DebitNote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `billEntryId` INTEGER NOT NULL,
    `productQty` INTEGER NOT NULL,
    `lrNumber` VARCHAR(20) NOT NULL,
    `lrDate` DATE NOT NULL,
    `transportId` INTEGER NOT NULL,
    `returnAmount` DOUBLE NOT NULL,
    `taxType` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DebitNote` ADD CONSTRAINT `DebitNote_billEntryId_fkey` FOREIGN KEY (`billEntryId`) REFERENCES `BillEntry`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
