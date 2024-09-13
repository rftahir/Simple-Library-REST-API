/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Books` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Members` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Books_code_key` ON `Books`(`code`);

-- CreateIndex
CREATE UNIQUE INDEX `Members_code_key` ON `Members`(`code`);

-- AddForeignKey
ALTER TABLE `Rents` ADD CONSTRAINT `Rents_booksId_fkey` FOREIGN KEY (`booksId`) REFERENCES `Books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rents` ADD CONSTRAINT `Rents_membersId_fkey` FOREIGN KEY (`membersId`) REFERENCES `Members`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
