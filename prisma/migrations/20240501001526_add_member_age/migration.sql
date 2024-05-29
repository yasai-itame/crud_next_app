/*
  Warnings:

  - Added the required column `age` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `member` ADD COLUMN `age` INTEGER NOT NULL;
