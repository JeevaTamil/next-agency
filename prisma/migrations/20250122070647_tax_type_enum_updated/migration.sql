/*
  Warnings:

  - The values [C_IGST,SGST] on the enum `BillEntry_taxType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `BillEntry` MODIFY `taxType` ENUM('C_S_GST', 'IGST') NOT NULL;
