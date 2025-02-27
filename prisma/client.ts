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
      unPaidAmount: {
        async compute(billEntry) {
          const payments = await prisma.payment.findMany({
            where: {
              billEntryId: billEntry.id,
            },
          });

          const unPaidAmount =
            billEntry.grossAmount -
            payments.reduce((sum, p) => sum + p.transactionAmount, 0);

          return unPaidAmount;
        },
      },
    },
  },
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
