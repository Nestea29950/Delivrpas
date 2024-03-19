/*
  Warnings:

  - You are about to drop the column `orderId` on the `Dish` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Menu` table. All the data in the column will be lost.
  - Added the required column `dishId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menuId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Dish` DROP FOREIGN KEY `Dish_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `Menu` DROP FOREIGN KEY `Menu_orderId_fkey`;

-- AlterTable
ALTER TABLE `Dish` DROP COLUMN `orderId`;

-- AlterTable
ALTER TABLE `Menu` DROP COLUMN `orderId`;

-- AlterTable
ALTER TABLE `OrderItem` ADD COLUMN `dishId` INTEGER NOT NULL,
    ADD COLUMN `menuId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_dishId_fkey` FOREIGN KEY (`dishId`) REFERENCES `Dish`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
