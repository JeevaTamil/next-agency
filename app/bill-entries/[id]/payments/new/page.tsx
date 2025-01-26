import { prisma } from "@/prisma/client";
import { differenceInDays } from "date-fns";
import AddPaymentForm from "./components/add-payment-form";

const NewPaymentPage = async ({ params }: { params: { id: string } }) => {
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
    const today = new Date();
    const billDate = new Date(billEntry.billDate);
    const unPaidDays = differenceInDays(today, billDate);

    const billEntryWithComputedProps = { ...billEntry, unPaidDays };

    return (
      <div>
        <AddPaymentForm billEntry={billEntryWithComputedProps} />
      </div>
    );
  }
};

export default NewPaymentPage;
