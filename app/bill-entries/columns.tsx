"use client";

import { BillEntry } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { prisma } from "@/prisma/client";

export const columns: ColumnDef<BillEntry>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "billDate",
    header: "Bill Date",
    cell: ({ row }) => {
      const billDate = format(new Date(row.getValue("billDate")), "dd/MM/yyyy");
      return <div>{billDate}</div>;
    },
  },
  {
    id: "Bill Number",
    accessorKey: "billNumber",
    header: "Bill Number",
  },
  {
    id: "Customer",
    accessorKey: "customer.name",
    header: "Customer",
  },
  {
    id: "Supplier",
    accessorKey: "supplier.name",
    header: "Supplier",
  },
  {
    accessorKey: "netAmount",
    header: "Net Amount",
    cell: ({ row }) => {
      row.getValue("unpaidDays");
      const netAmountWithSymbol = `₹ ${parseFloat(
        row.getValue("netAmount")
      ).toFixed(2)}`;
      return <div>{netAmountWithSymbol}</div>;
    },
  },
  {
    accessorKey: "taxType",
    header: "Tax Type",
  },
  {
    accessorKey: "grossAmount",
    header: "Gross Amount",
    cell: ({ row }) => {
      const grossAmountWithSymbol = `₹ ${parseFloat(
        row.getValue("grossAmount")
      ).toFixed(2)}`;
      return <div>{grossAmountWithSymbol}</div>;
    },
  },
  {
    accessorKey: "unPaidDays",
    header: "Un Paid Days",
  },
  // {
  //   header: "Un Paid Amount",
  //   cell: async ({ row }) => {
  //     const payments = await prisma.payment.findMany({
  //       where: {
  //         billEntryId: row.getValue("id"),
  //       },
  //     });

  //     const unPaidAmount =
  //       parseInt(row.getValue("grossAmount")) -
  //       payments.reduce((sum, p) => sum + p.transactionAmount, 0);

  //     return unPaidAmount;
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                const rowItemId = row.getValue("id");
                console.log(row.getAllCells());
                router.push(`/bill-entries/${rowItemId}`);
              }}
            >
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                const rowItemId = row.getValue("id");
                router.push(`/bill-entries/${rowItemId}/payments`);
              }}
            >
              Payments
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
