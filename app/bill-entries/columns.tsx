"use client";

import { BillEntry } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<BillEntry>[] = [
  {
    accessorKey: "billDate",
    header: "Bill Date",
  },
  {
    accessorKey: "billNumber",
    header: "Bill Number",
  },
  {
    accessorKey: "customerId",
    header: "Customer",
  },
  {
    accessorKey: "supplierId",
    header: "Supplier",
  },
  {
    accessorKey: "netAmount",
    header: "Net Amount",
  },
  {
    accessorKey: "taxType",
    header: "Tax Type",
  },
  {
    accessorKey: "grossAmount",
    header: "Gross Amount",
  },
];
