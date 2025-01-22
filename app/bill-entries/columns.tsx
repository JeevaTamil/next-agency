"use client";

import { BillEntry } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<BillEntry>[] = [
  {
    accessorKey: "billDate",
    header: "Bill Date",
    cell: ({ row }) => {
      const billDate = format(new Date(row.getValue("billDate")), "dd/MM/yyyy");
      return <div>{billDate}</div>;
    },
  },
  {
    accessorKey: "billNumber",
    header: "Bill Number",
  },
  {
    accessorKey: "customer.name",
    header: "Customer",
  },
  {
    accessorKey: "supplier.name",
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
