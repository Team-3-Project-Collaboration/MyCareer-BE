-- AlterTable
ALTER TABLE `vacancy` ADD COLUMN `jobField` ENUM('Design', 'Software', 'Data', 'Animation', 'Other') NULL,
    ADD COLUMN `jobType` ENUM('Full_Time', 'Internship', 'Hybrid', 'Part_Time', 'Freelance') NULL;
