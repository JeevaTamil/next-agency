-- DropForeignKey
ALTER TABLE `Bank` DROP FOREIGN KEY `Bank_agencyId_fkey`;

-- DropForeignKey
ALTER TABLE `BillEntry` DROP FOREIGN KEY `BillEntry_agencyId_fkey`;

-- DropForeignKey
ALTER TABLE `BillEntry` DROP FOREIGN KEY `BillEntry_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `BillEntry` DROP FOREIGN KEY `BillEntry_supplierId_fkey`;

-- DropForeignKey
ALTER TABLE `BillEntry` DROP FOREIGN KEY `BillEntry_transportId_fkey`;

-- DropForeignKey
ALTER TABLE `Customer` DROP FOREIGN KEY `Customer_agencyId_fkey`;

-- DropForeignKey
ALTER TABLE `DebitNote` DROP FOREIGN KEY `DebitNote_agencyId_fkey`;

-- DropForeignKey
ALTER TABLE `DebitNote` DROP FOREIGN KEY `DebitNote_billEntryId_fkey`;

-- DropForeignKey
ALTER TABLE `DebitNote` DROP FOREIGN KEY `DebitNote_transportId_fkey`;

-- DropForeignKey
ALTER TABLE `Payment` DROP FOREIGN KEY `Payment_agencyId_fkey`;

-- DropForeignKey
ALTER TABLE `Payment` DROP FOREIGN KEY `Payment_bankId_fkey`;

-- DropForeignKey
ALTER TABLE `Payment` DROP FOREIGN KEY `Payment_billEntryId_fkey`;

-- DropForeignKey
ALTER TABLE `Supplier` DROP FOREIGN KEY `Supplier_agencyId_fkey`;

-- DropForeignKey
ALTER TABLE `Transport` DROP FOREIGN KEY `Transport_agencyId_fkey`;

-- DropIndex
DROP INDEX `Bank_agencyId_fkey` ON `Bank`;

-- DropIndex
DROP INDEX `BillEntry_agencyId_fkey` ON `BillEntry`;

-- DropIndex
DROP INDEX `BillEntry_customerId_fkey` ON `BillEntry`;

-- DropIndex
DROP INDEX `BillEntry_supplierId_fkey` ON `BillEntry`;

-- DropIndex
DROP INDEX `BillEntry_transportId_fkey` ON `BillEntry`;

-- DropIndex
DROP INDEX `Customer_agencyId_fkey` ON `Customer`;

-- DropIndex
DROP INDEX `DebitNote_agencyId_fkey` ON `DebitNote`;

-- DropIndex
DROP INDEX `DebitNote_billEntryId_fkey` ON `DebitNote`;

-- DropIndex
DROP INDEX `DebitNote_transportId_fkey` ON `DebitNote`;

-- DropIndex
DROP INDEX `Payment_agencyId_fkey` ON `Payment`;

-- DropIndex
DROP INDEX `Payment_bankId_fkey` ON `Payment`;

-- DropIndex
DROP INDEX `Payment_billEntryId_fkey` ON `Payment`;

-- DropIndex
DROP INDEX `Supplier_agencyId_fkey` ON `Supplier`;

-- DropIndex
DROP INDEX `Transport_agencyId_fkey` ON `Transport`;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_agencyId_fkey` FOREIGN KEY (`agencyId`) REFERENCES `Agency`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supplier` ADD CONSTRAINT `Supplier_agencyId_fkey` FOREIGN KEY (`agencyId`) REFERENCES `Agency`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transport` ADD CONSTRAINT `Transport_agencyId_fkey` FOREIGN KEY (`agencyId`) REFERENCES `Agency`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BillEntry` ADD CONSTRAINT `BillEntry_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BillEntry` ADD CONSTRAINT `BillEntry_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Supplier`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BillEntry` ADD CONSTRAINT `BillEntry_transportId_fkey` FOREIGN KEY (`transportId`) REFERENCES `Transport`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BillEntry` ADD CONSTRAINT `BillEntry_agencyId_fkey` FOREIGN KEY (`agencyId`) REFERENCES `Agency`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_billEntryId_fkey` FOREIGN KEY (`billEntryId`) REFERENCES `BillEntry`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_bankId_fkey` FOREIGN KEY (`bankId`) REFERENCES `Bank`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_agencyId_fkey` FOREIGN KEY (`agencyId`) REFERENCES `Agency`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bank` ADD CONSTRAINT `Bank_agencyId_fkey` FOREIGN KEY (`agencyId`) REFERENCES `Agency`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DebitNote` ADD CONSTRAINT `DebitNote_billEntryId_fkey` FOREIGN KEY (`billEntryId`) REFERENCES `BillEntry`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DebitNote` ADD CONSTRAINT `DebitNote_transportId_fkey` FOREIGN KEY (`transportId`) REFERENCES `Transport`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DebitNote` ADD CONSTRAINT `DebitNote_agencyId_fkey` FOREIGN KEY (`agencyId`) REFERENCES `Agency`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
