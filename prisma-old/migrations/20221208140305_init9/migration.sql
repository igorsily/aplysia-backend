/*
  Warnings:

  - You are about to drop the column `social_reason` on the `units` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `units_social_reason_key` ON `units`;

-- AlterTable
ALTER TABLE `units` DROP COLUMN `social_reason`;
