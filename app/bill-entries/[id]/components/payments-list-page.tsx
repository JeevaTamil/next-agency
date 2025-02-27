import { DataTable } from "@/components/ui/data-table";
import { prisma } from "@/prisma/client";
import { Box } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import { columns } from "./columns";

const PaymentsListPage = async ({ billEntryId }: { billEntryId: string }) => {
  const payments = await prisma.payment.findMany({
    where: {
      billEntryId: parseInt(billEntryId),
    },
    include: {
      bank: {
        select: {
          name: true,
        },
      },
    },
  });

  console.log(payments);

  if (payments.length === 0) {
    return <div className="pt-5">No Payments</div>;
  }

  return (
    <Box>
      <DataTable data={payments} columns={columns}></DataTable>
    </Box>
  );
};

export default PaymentsListPage;
