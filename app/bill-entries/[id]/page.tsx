import { Separator } from "@/components/ui/separator";
import { prisma } from "@/prisma/client";
import { Box } from "@radix-ui/themes";
import { differenceInDays } from "date-fns";
import { notFound } from "next/navigation";
import BillEntryDetailCard from "./components/bill-entry-detail-card";
import DebitNotesPage from "./debit-notes/page";
import PaymentsPage from "./payments/page";

const BillEntryDetailPage = async ({ params }: { params: { id: string } }) => {
  const payments = await prisma.payment.findMany({
    where: {
      billEntryId: parseInt(params.id),
    },
  });

  const debitNotes = await prisma.debitNote.findMany({
    where: {
      billEntryId: parseInt(params.id),
    },
  });

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

    let debitNoteAmount = 0;
    if (debitNotes && debitNotes.length > 0) {
      debitNoteAmount = debitNotes.reduce((sum, p) => sum + p.returnAmount, 0);
    }

    const today = new Date();
    const billDate = new Date(billEntry.billDate);
    const unPaidDays = differenceInDays(today, billDate);

    const billEntryWithComputedProps = {
      ...billEntry,
      unPaidDays,
      paidAmount,
      debitNoteAmount,
    };

    if (!billEntry) {
      return notFound();
    }

    return (
      <Box>
        <BillEntryDetailCard
          params={{
            billEntry: billEntryWithComputedProps,
          }}
        />
        <Separator className="my-10" orientation="horizontal" />
        <Box className="my-5 ">
          <Box>
            <PaymentsPage params={{ id: params.id }} />
          </Box>

          <Separator className="my-10" orientation="horizontal" />

          <Box>
            <DebitNotesPage params={{ id: params.id }} />
          </Box>
        </Box>
      </Box>
    );
  }
};

export default BillEntryDetailPage;
