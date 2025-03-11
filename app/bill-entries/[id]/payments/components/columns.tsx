"use client";

import { prisma } from "@/prisma/client";
import { Payment } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { format } from "date-fns";

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const billDate = format(new Date(row.getValue("date")), "dd/MM/yyyy");
      return <div>{billDate}</div>;
    },
  },
  {
    accessorKey: "transactionAmount",
    header: "Amount",
  },
  {
    accessorKey: "bank.name",
    header: "Bank",
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
