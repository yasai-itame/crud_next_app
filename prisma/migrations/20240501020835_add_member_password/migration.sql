/*
  Warnings:

  - Added the required column `password` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `member` ADD COLUMN `password` VARCHAR(191) NOT NULL;
