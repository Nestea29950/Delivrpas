/*
  Warnings:

  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_delivryManId_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_restaurantId_fkey`;

-- DropTable
DROP TABLE `Transaction`;

-- CreateTable
CREATE TABLE `user` (
    `delivryManId` INTEGER NOT NULL,
    `customerId` INTEGER NOT NULL,
    `restaurantId` INTEGER NOT NULL,

    UNIQUE INDEX `user_delivryManId_key`(`delivryManId`),
    UNIQUE INDEX `user_customerId_key`(`customerId`),
    UNIQUE INDEX `user_restaurantId_key`(`restaurantId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_delivryManId_fkey` FOREIGN KEY (`delivryManId`) REFERENCES `DelivryMan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
