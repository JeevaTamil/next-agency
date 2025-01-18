/*
  Warnings:

  - You are about to drop the column `commission` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Customer` DROP COLUMN `commission`;

-- CreateTable
CREATE TABLE `Supplier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `address` TEXT NOT NULL,
    `city` VARCHAR(25) NOT NULL,
    `gst` VARCHAR(16) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `commission` FLOAT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
