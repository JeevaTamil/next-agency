/*
  Warnings:

  - The values [C_S_GST] on the enum `BillEntry_taxType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `BillEntry` MODIFY `taxType` ENUM('IGST', 'C_GST_S_GST') NOT NULL;
