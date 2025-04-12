"use client";

import { Customer } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import CustomerRowActions from "./components/data-table-row-actions";

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "gst",
    header: "GST",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <CustomerRowActions row={row} />;
    },
  },
];
