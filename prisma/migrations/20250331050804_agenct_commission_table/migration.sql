-- CreateTable
CREATE TABLE `AgentCommission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `paymentId` INTEGER NOT NULL,
    `commissionAmount` DOUBLE NOT NULL,
    `agencyId` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `AgentCommission_paymentId_key`(`paymentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AgentCommission` ADD CONSTRAINT `AgentCommission_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `Payment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AgentCommission` ADD CONSTRAINT `AgentCommission_agencyId_fkey` FOREIGN KEY (`agencyId`) REFERENCES `Agency`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
