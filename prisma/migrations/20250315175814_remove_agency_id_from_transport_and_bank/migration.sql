/*
  Warnings:

  - You are about to drop the column `agencyId` on the `Bank` table. All the data in the column will be lost.
  - You are about to drop the column `agencyId` on the `Transport` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Bank` DROP FOREIGN KEY `Bank_agencyId_fkey`;

-- DropForeignKey
ALTER TABLE `Transport` DROP FOREIGN KEY `Transport_agencyId_fkey`;

-- DropIndex
DROP INDEX `Bank_agencyId_fkey` ON `Bank`;

-- DropIndex
DROP INDEX `Transport_agencyId_fkey` ON `Transport`;

-- AlterTable
ALTER TABLE `Bank` DROP COLUMN `agencyId`;

-- AlterTable
ALTER TABLE `Transport` DROP COLUMN `agencyId`;
