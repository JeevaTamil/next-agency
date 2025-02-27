/*
  Warnings:

  - You are about to alter the column `taxType` on the `BillEntry` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE `BillEntry` MODIFY `taxType` VARCHAR(10) NOT NULL;
