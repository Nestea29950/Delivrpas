/*
  Warnings:

  - Made the column `adressePostal` on table `Restaurant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Restaurant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Restaurant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `Restaurant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Restaurant` MODIFY `adressePostal` BIGINT NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL;
