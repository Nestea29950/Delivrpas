/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nom` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_deliveryManId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_restaurantId_fkey`;

-- AlterTable
ALTER TABLE `Menu` ADD COLUMN `nom` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `User` (
    `deliveryManId` INTEGER NOT NULL,
    `customerId` INTEGER NOT NULL,
    `restaurantId` INTEGER NOT NULL,

    UNIQUE INDEX `User_deliveryManId_key`(`deliveryManId`),
    UNIQUE INDEX `User_customerId_key`(`customerId`),
    UNIQUE INDEX `User_restaurantId_key`(`restaurantId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_deliveryManId_fkey` FOREIGN KEY (`deliveryManId`) REFERENCES `DeliveryMan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
