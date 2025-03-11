import { prisma } from "@/prisma/client";
import { differenceInDays } from "date-fns";
import React from "react";
import AddDebitNoteForm from "./components/add-debit-note-form";

const NewDebitNotePage = async ({ params }: { params: { id: string } }) => {
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

  const transports = await prisma.transport.findMany();
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

    return (
      <div>
        <AddDebitNoteForm
          billEntry={billEntryWithComputedProps}
          transports={transports}
        />
      </div>
    );
  }
};

export default NewDebitNotePage;
