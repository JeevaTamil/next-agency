-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `address` TEXT NOT NULL,
    `city` VARCHAR(25) NOT NULL,
    `gst` VARCHAR(16) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Supplier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `address` TEXT NOT NULL,
    `city` VARCHAR(25) NOT NULL,
    `gst` VARCHAR(16) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `commission` VARCHAR(5) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
