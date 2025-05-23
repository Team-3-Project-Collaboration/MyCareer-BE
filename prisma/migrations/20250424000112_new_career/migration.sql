-- AlterTable
ALTER TABLE `User` MODIFY `dob` DATE NOT NULL,
    MODIFY `province` VARCHAR(191) NULL,
    MODIFY `city` VARCHAR(191) NULL,
    MODIFY `district` VARCHAR(191) NULL,
    MODIFY `role` ENUM('USER', 'ADMIN') NULL DEFAULT 'USER';
