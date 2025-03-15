/*
  Warnings:

  - A unique constraint covering the columns `[billId]` on the table `BillEntry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `billId` to the `BillEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BillEntry` ADD COLUMN `billId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `BillEntry_billId_key` ON `BillEntry`(`billId`);
