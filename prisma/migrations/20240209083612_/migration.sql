/*
  Warnings:

  - You are about to drop the column `name` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `delivryManId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `DelivryMan` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[deliveryManId]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `Dish` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryManId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_delivryManId_fkey`;

-- AlterTable
ALTER TABLE `Dish` ADD COLUMN `orderId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Menu` ADD COLUMN `orderId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `OrderItem` DROP COLUMN `name`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `delivryManId`,
    ADD COLUMN `deliveryManId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `DelivryMan`;

-- CreateTable
CREATE TABLE `DeliveryMan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Delivery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deliveryManId` INTEGER NOT NULL,
    `customerId` INTEGER NOT NULL,
    `restaurantId` INTEGER NOT NULL,
    `orderitemId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `user_deliveryManId_key` ON `user`(`deliveryManId`);

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_deliveryManId_fkey` FOREIGN KEY (`deliveryManId`) REFERENCES `DeliveryMan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `OrderItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dish` ADD CONSTRAINT `Dish_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `OrderItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Delivery` ADD CONSTRAINT `Delivery_deliveryManId_fkey` FOREIGN KEY (`deliveryManId`) REFERENCES `DeliveryMan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Delivery` ADD CONSTRAINT `Delivery_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Delivery` ADD CONSTRAINT `Delivery_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Delivery` ADD CONSTRAINT `Delivery_orderitemId_fkey` FOREIGN KEY (`orderitemId`) REFERENCES `OrderItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
