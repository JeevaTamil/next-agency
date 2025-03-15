"use client";

import { BillEntry } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableRowActions } from "@/components/ui/data-table-row-actions";

export const columns: ColumnDef<BillEntry>[] = [
  {
    accessorKey: "billId",
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
    accessorKey: "taxAmount",
    header: "Tax Amount",
    cell: ({ row }) => {
      const taxAmountWithSymbol = `₹ ${parseFloat(
        row.getValue("taxAmount")
      ).toFixed(2)}`;
      return <div>{taxAmountWithSymbol}</div>;
    },
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
