-- DropForeignKey
ALTER TABLE `profile-permissions` DROP FOREIGN KEY `profile-permissions_permissionId_fkey`;

-- DropForeignKey
ALTER TABLE `profile-permissions` DROP FOREIGN KEY `profile-permissions_profileId_fkey`;

-- AddForeignKey
ALTER TABLE `profile-permissions` ADD CONSTRAINT `profile-permissions_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profile-permissions` ADD CONSTRAINT `profile-permissions_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
