/*
  Warnings:

  - You are about to drop the `Rents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Rents` DROP FOREIGN KEY `Rents_booksId_fkey`;

-- DropForeignKey
ALTER TABLE `Rents` DROP FOREIGN KEY `Rents_membersId_fkey`;

-- DropTable
DROP TABLE `Rents`;

-- CreateTable
CREATE TABLE `BorrowBooks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `booksId` INTEGER NOT NULL,
    `membersId` INTEGER NOT NULL,
    `borrowDate` DATETIME(3) NOT NULL,
    `returnDate` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BorrowBooks` ADD CONSTRAINT `BorrowBooks_booksId_fkey` FOREIGN KEY (`booksId`) REFERENCES `Books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BorrowBooks` ADD CONSTRAINT `BorrowBooks_membersId_fkey` FOREIGN KEY (`membersId`) REFERENCES `Members`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
