-- AlterTable
ALTER TABLE `Restaurant` ADD COLUMN `adressePostal` BIGINT NULL,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(191) NULL,
    ADD COLUMN `password` VARCHAR(191) NULL;
