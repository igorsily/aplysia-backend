-- DropForeignKey
ALTER TABLE `profiles` DROP FOREIGN KEY `profiles_company_id_fkey`;

-- AlterTable
ALTER TABLE `profiles` MODIFY `company_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
