/*
  Warnings:

  - The values [Full_Time,Part_Time] on the enum `vacancy_jobType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `vacancy` MODIFY `jobType` ENUM('FullTime', 'Internship', 'Hybrid', 'PartTime', 'Freelance') NULL;
