/*
  Warnings:

  - You are about to drop the column `mentorId` on the `MentoringBooking` table. All the data in the column will be lost.
  - Added the required column `idBook` to the `MentoringBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mentorProfileId` to the `MentoringBooking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `MentoringBooking` DROP FOREIGN KEY `MentoringBooking_mentorId_fkey`;

-- DropIndex
DROP INDEX `MentoringBooking_mentorId_fkey` ON `MentoringBooking`;

-- AlterTable
ALTER TABLE `MentoringBooking` DROP COLUMN `mentorId`,
    ADD COLUMN `idBook` VARCHAR(191) NOT NULL,
    ADD COLUMN `mentorProfileId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `MentoringBooking` ADD CONSTRAINT `MentoringBooking_mentorProfileId_fkey` FOREIGN KEY (`mentorProfileId`) REFERENCES `MentorProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
