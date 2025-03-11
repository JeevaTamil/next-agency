-- AlterTable
ALTER TABLE `DebitNote` ADD COLUMN `additionalNote` TEXT NULL;

-- AddForeignKey
ALTER TABLE `DebitNote` ADD CONSTRAINT `DebitNote_transportId_fkey` FOREIGN KEY (`transportId`) REFERENCES `Transport`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
