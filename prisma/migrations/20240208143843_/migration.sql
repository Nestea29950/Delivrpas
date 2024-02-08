/*
  Warnings:

  - You are about to drop the column `cardId` on the `Card` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[restaurantId]` on the table `Card` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `restaurantId` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Card` DROP FOREIGN KEY `Card_cardId_fkey`;

-- AlterTable
ALTER TABLE `Card` DROP COLUMN `cardId`,
    ADD COLUMN `restaurantId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Card_restaurantId_key` ON `Card`(`restaurantId`);

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
