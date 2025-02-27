"use client";

import { Payment } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
// };

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "bankId",
    header: "Bank",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "transactionAmount",
    header: "Amount",
  },
  {
    accessorKey: "mode",
    header: "Mode",
  },
  {
    accessorKey: "referenceNumber",
    header: "Ref No",
  },
  {
    accessorKey: "additionalNote",
    header: "Notes",
  },
];
