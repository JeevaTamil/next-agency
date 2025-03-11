import { DataTable } from "@/components/ui/data-table";
import { prisma } from "@/prisma/client";
import { Box } from "@radix-ui/themes";
import React from "react";
import { columns } from "./columns";

const DebitNoteListPage = async ({ billEntryId }: { billEntryId: string }) => {
  const debitNotes = await prisma.debitNote.findMany({
    where: {
      billEntryId: parseInt(billEntryId),
    },
    include: {
      transport: {
        select: {
          name: true,
        },
      },
    },
  });

  if (debitNotes.length === 0) {
    return <div className="pt-5">No Debit Notes</div>;
  }

  return (
    <Box>
      <DataTable data={debitNotes} columns={columns}></DataTable>
    </Box>
  );
};

export default DebitNoteListPage;
