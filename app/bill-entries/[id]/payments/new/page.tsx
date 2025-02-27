import { prisma } from "@/prisma/client";
import { differenceInDays } from "date-fns";
import AddPaymentForm from "./components/add-payment-form";

const NewPaymentPage = async ({ params }: { params: { id: string } }) => {
  const payments = await prisma.payment.findMany({
    where: {
      billEntryId: parseInt(params.id),
    },
  });

  const banks = await prisma.bank.findMany();
  const billEntry = await prisma.billEntry.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: {
      customer: {
        select: {
          name: true,
        },
      },
      supplier: {
        select: {
          name: true,
        },
      },
      transport: {
        select: {
          name: true,
        },
      },
    },
  });

  if (billEntry !== null) {
    let paidAmount = 0;
    if (payments && payments.length > 0) {
      paidAmount = payments.reduce((sum, p) => sum + p.transactionAmount, 0);
    }

    const today = new Date();
    const billDate = new Date(billEntry.billDate);
    const unPaidDays = differenceInDays(today, billDate);

    const billEntryWithComputedProps = { ...billEntry, unPaidDays, paidAmount };

    return (
      <div>
        <AddPaymentForm billEntry={billEntryWithComputedProps} banks={banks} />
      </div>
    );
  }
};

export default NewPaymentPage;
