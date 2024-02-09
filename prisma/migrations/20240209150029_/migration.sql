/*
  Warnings:

  - You are about to alter the column `adressePostal` on the `Restaurant` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `Restaurant` MODIFY `adressePostal` INTEGER NOT NULL;
