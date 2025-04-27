-- AlterTable
ALTER TABLE `Education` MODIFY `startDate` DATE NOT NULL,
    MODIFY `endDate` DATE NOT NULL;

-- AlterTable
ALTER TABLE `ModulePurchase` ADD COLUMN `idTransaction` INTEGER NULL;

-- CreateTable
CREATE TABLE `voucher` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
