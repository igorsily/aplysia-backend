/*
  Warnings:

  - You are about to drop the column `social_reason` on the `departments` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `departments_social_reason_key` ON `departments`;

-- AlterTable
ALTER TABLE `departments` DROP COLUMN `social_reason`;
