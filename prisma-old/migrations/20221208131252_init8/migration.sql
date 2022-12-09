/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `collects` DROP FOREIGN KEY `collects_analyst_id_fkey`;

-- DropForeignKey
ALTER TABLE `collects` DROP FOREIGN KEY `collects_responsible_id_fkey`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cellphone` VARCHAR(191) NULL,
    `telephone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `profile_id` VARCHAR(191) NULL,
    `company_id` VARCHAR(191) NULL,
    `unity_id` VARCHAR(191) NULL,
    `department_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `collects` ADD CONSTRAINT `collects_responsible_id_fkey` FOREIGN KEY (`responsible_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `collects` ADD CONSTRAINT `collects_analyst_id_fkey` FOREIGN KEY (`analyst_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
