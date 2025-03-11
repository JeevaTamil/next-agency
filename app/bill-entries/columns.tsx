"use client";

import { BillEntry } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { differenceInDays, format, isWithinInterval } from "date-fns";

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
import { DataTableRowActions } from "@/components/ui/data-table-row-actions";

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
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      const dateA = new Date(rowA.getValue(columnId));
      const dateB = new Date(rowB.getValue(columnId));
      return dateA.getTime() - dateB.getTime();
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true; // No filter applied
      const billDate = new Date(row.getValue(columnId));
      const [start, end] = filterValue || [];

      if (start && billDate < new Date(start)) return false;
      if (end && billDate > new Date(end)) return false;
      return true;
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
    // id: "Net Amount",
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
    id: "Tax Type",
    accessorKey: "taxType",
    header: "Tax Type",
  },
  {
    // id: "Gross Amount",
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
    id: "unpaidDays",
    accessorKey: "unPaidDays",
    header: "Un Paid Days",

    // cell: ({ row }) => {
    //   const billDate = row.getValue("billDate") as Date;
    //   const unPaidDays = differenceInDays(new Date(), billDate);
    //   return <div className="flex items-center">{unPaidDays}</div>;
    // },
    // enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
