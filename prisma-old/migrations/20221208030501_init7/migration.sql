-- CreateTable
CREATE TABLE `reactors` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `active` BOOLEAN NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `department_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profiles` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `company_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `profiles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `collect_points` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `latitude` VARCHAR(191) NULL,
    `longitude` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `active` BOOLEAN NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `reactor_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `modules_profiles` (
    `id` VARCHAR(191) NOT NULL,
    `permission` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `module_id` VARCHAR(191) NOT NULL,
    `profile_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `physical_chemicals` (
    `id` VARCHAR(191) NOT NULL,
    `collect_date` DATE NOT NULL,
    `place` VARCHAR(191) NULL,
    `position` VARCHAR(191) NULL,
    `parameter` VARCHAR(191) NULL,
    `unit_parameter` VARCHAR(191) NULL,
    `result` DOUBLE NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `department_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `history_uploads` (
    `id` VARCHAR(191) NOT NULL,
    `name_file` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `company_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `collects` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `reactor_id` VARCHAR(191) NOT NULL,
    `collect_point_id` VARCHAR(191) NOT NULL,
    `responsible_id` VARCHAR(191) NOT NULL,
    `analyst_id` VARCHAR(191) NULL,
    `step` INTEGER NOT NULL,
    `sample_number` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'Pendente',
    `temperature` VARCHAR(191) NULL,
    `ph` VARCHAR(191) NULL,
    `oxygen` VARCHAR(191) NULL,
    `work_shift` VARCHAR(191) NULL,
    `analysis_time` DATETIME(3) NOT NULL,
    `first_bacterium_id` VARCHAR(191) NULL,
    `sec_bacterium_id` VARCHAR(191) NULL,
    `first_abundance` VARCHAR(191) NULL,
    `sec_abundance` VARCHAR(191) NULL,
    `first_filament_effect` VARCHAR(191) NULL,
    `sec_filament_effect` VARCHAR(191) NULL,
    `flake_compaction` VARCHAR(191) NULL,
    `irregular_flake_quantity` VARCHAR(191) NULL,
    `round_flake_quantity` VARCHAR(191) NULL,
    `small_flake` VARCHAR(191) NULL,
    `medium_flake` VARCHAR(191) NULL,
    `large_flake` VARCHAR(191) NULL,
    `suspended_cells` VARCHAR(191) NULL,
    `spirilis` VARCHAR(191) NULL,
    `tetrads` VARCHAR(191) NULL,
    `zooglea` VARCHAR(191) NULL,
    `fibers` VARCHAR(191) NULL,
    `oil` VARCHAR(191) NULL,
    `ink` VARCHAR(191) NULL,
    `quantity_small_colony` VARCHAR(191) NULL,
    `quantity_medium_colony` VARCHAR(191) NULL,
    `quantity_large_colony` VARCHAR(191) NULL,
    `number_amoeba` VARCHAR(191) NULL,
    `amoeba_activity` VARCHAR(191) NULL,
    `number_flagellate` VARCHAR(191) NULL,
    `flagellate_activity` VARCHAR(191) NULL,
    `quantity_small_ciliate` VARCHAR(191) NULL,
    `small_ciliate_activity` VARCHAR(191) NULL,
    `quantity_medium_ciliate` VARCHAR(191) NULL,
    `medium_ciliate_activity` VARCHAR(191) NULL,
    `quantity_large_ciliate` VARCHAR(191) NULL,
    `large_ciliate_activity` VARCHAR(191) NULL,
    `quantity_not_colony_ciliate` VARCHAR(191) NULL,
    `not_colony_ciliate_activity` VARCHAR(191) NULL,
    `quantity_out_peduncle_ciliate` VARCHAR(191) NULL,
    `out_peduncle_ciliate_activity` VARCHAR(191) NULL,
    `quantity_fixed_with_bubble_ciliate` VARCHAR(191) NULL,
    `fixed_with_bubble_ciliate_activity` VARCHAR(191) NULL,
    `quantity_fixed_colony_ciliate` VARCHAR(191) NULL,
    `fixed_colony_ciliate_activity` VARCHAR(191) NULL,
    `quantity_wandering_ciliate` VARCHAR(191) NULL,
    `wandering_ciliate_activity` VARCHAR(191) NULL,
    `quantity_carnivorous_ciliates` VARCHAR(191) NULL,
    `carnivorous_ciliates_activity` VARCHAR(191) NULL,
    `quantity_suction` VARCHAR(191) NULL,
    `suction_activity` VARCHAR(191) NULL,
    `quantity_thecameba` VARCHAR(191) NULL,
    `thecameba_activity` VARCHAR(191) NULL,
    `quantity_rotifers` VARCHAR(191) NULL,
    `rotifers_activity` VARCHAR(191) NULL,
    `quantity_nematodes` VARCHAR(191) NULL,
    `nematodes_activity` VARCHAR(191) NULL,
    `quantity_gastrotrichium` VARCHAR(191) NULL,
    `gastrotrichium_activity` VARCHAR(191) NULL,
    `quantity_annelids` VARCHAR(191) NULL,
    `annelids_activity` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_BacteriumToDepartment` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_BacteriumToDepartment_AB_unique`(`A`, `B`),
    INDEX `_BacteriumToDepartment_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `reactors` ADD CONSTRAINT `reactors_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `collect_points` ADD CONSTRAINT `collect_points_reactor_id_fkey` FOREIGN KEY (`reactor_id`) REFERENCES `reactors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `modules_profiles` ADD CONSTRAINT `modules_profiles_module_id_fkey` FOREIGN KEY (`module_id`) REFERENCES `modules`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `modules_profiles` ADD CONSTRAINT `modules_profiles_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `physical_chemicals` ADD CONSTRAINT `physical_chemicals_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `history_uploads` ADD CONSTRAINT `history_uploads_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `collects` ADD CONSTRAINT `collects_reactor_id_fkey` FOREIGN KEY (`reactor_id`) REFERENCES `reactors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `collects` ADD CONSTRAINT `collects_collect_point_id_fkey` FOREIGN KEY (`collect_point_id`) REFERENCES `collect_points`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `collects` ADD CONSTRAINT `collects_responsible_id_fkey` FOREIGN KEY (`responsible_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `collects` ADD CONSTRAINT `collects_analyst_id_fkey` FOREIGN KEY (`analyst_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `collects` ADD CONSTRAINT `collects_first_bacterium_id_fkey` FOREIGN KEY (`first_bacterium_id`) REFERENCES `bacteria`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `collects` ADD CONSTRAINT `collects_sec_bacterium_id_fkey` FOREIGN KEY (`sec_bacterium_id`) REFERENCES `bacteria`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BacteriumToDepartment` ADD CONSTRAINT `_BacteriumToDepartment_A_fkey` FOREIGN KEY (`A`) REFERENCES `bacteria`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BacteriumToDepartment` ADD CONSTRAINT `_BacteriumToDepartment_B_fkey` FOREIGN KEY (`B`) REFERENCES `departments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
