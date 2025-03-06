import { PrismaClient } from "@prisma/client";
import { differenceInDays } from "date-fns";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

export const prismaExt = prisma.$extends({
  result: {
    billEntry: {
      unPaidDays: {
        needs: {
          billDate: true,
        },
        compute(billEntry) {
          return differenceInDays(new Date(), billEntry.billDate);
        },
      },
    },
  },
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function getBillEntryWithUnpaidAmount(id: number) {
  const billEntry = await prisma.billEntry.findUnique({
    where: { id },
    include: { payments: true }, // Fetch related payments directly
  });

  if (!billEntry) return null;

  const unPaidAmount =
    billEntry.grossAmount -
    billEntry.payments.reduce((sum, p) => sum + p.transactionAmount, 0);

  return { ...billEntry, unPaidAmount };
}
