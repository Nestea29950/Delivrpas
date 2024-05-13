/*
  Warnings:

  - You are about to drop the column `dishId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `menuId` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `data` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `OrderItem_dishId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `OrderItem_menuId_fkey`;

-- AlterTable
ALTER TABLE `OrderItem` DROP COLUMN `dishId`,
    DROP COLUMN `menuId`,
    ADD COLUMN `data` JSON NOT NULL;
