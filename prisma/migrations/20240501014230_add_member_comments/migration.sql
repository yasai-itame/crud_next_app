-- AlterTable
ALTER TABLE `comment` ADD COLUMN `memberId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
