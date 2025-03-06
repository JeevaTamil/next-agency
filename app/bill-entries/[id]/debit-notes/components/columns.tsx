"use client";

import { Button } from "@/components/ui/button";
import { prisma } from "@/prisma/client";
import { DebitNote } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { format } from "date-fns";
import Link from "next/link";

export const columns: ColumnDef<DebitNote>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const lrDate = format(new Date(row.getValue("date")), "dd/MM/yyyy");
      return <div>{lrDate}</div>;
    },
  },
  {
    accessorKey: "billEntryId",
    header: "Bill Entry ID",
    cell: ({ row }) => {
      return (
        <div>
          <Button variant="link">
            <Link
              href={`/bill-entries/${row.getValue("billEntryId")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              row.getValue("billEntryId")
            </Link>
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "lrDate",
    header: "LR Date",
    cell: ({ row }) => {
      const lrDate = format(new Date(row.getValue("lrDate")), "dd/MM/yyyy");
      return <div>{lrDate}</div>;
    },
  },
  {
    accessorKey: "lrNumber",
    header: "LR Number",
  },
  {
    accessorKey: "productQty",
    header: "Product Qty",
  },
  {
    accessorKey: "transport.name",
    header: "Transport",
  },
  {
    accessorKey: "returnAmount",
    header: "Return Amount",
  },
  {
    accessorKey: "taxType",
    header: "Tax",
    cell: ({ row }) => {
      const returnTax = (row.getValue("returnAmount") as number) * 0.05;
      return <div>{returnTax}</div>;
    },
  },
  {
    accessorKey: "additionalNote",
    header: "Notes",
  },
];
