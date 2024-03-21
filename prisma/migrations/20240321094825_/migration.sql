/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `DeliveryMan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `DeliveryMan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `DeliveryMan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Customer` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `DeliveryMan` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Customer_email_key` ON `Customer`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `DeliveryMan_email_key` ON `DeliveryMan`(`email`);
