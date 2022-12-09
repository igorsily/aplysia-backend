/*
  Warnings:

  - You are about to drop the column `companyId` on the `units` table. All the data in the column will be lost.
  - Added the required column `company_id` to the `units` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `units` DROP FOREIGN KEY `company_id`;

-- AlterTable
ALTER TABLE `units` DROP COLUMN `companyId`,
    ADD COLUMN `company_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `units` ADD CONSTRAINT `units_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
