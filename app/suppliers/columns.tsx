"use client";

import { Supplier } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import SupplierRowActions from "./components/data-table-row-actions";

export const columns: ColumnDef<Supplier>[] = [
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
    accessorKey: "commission",
    header: "Commission %",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <SupplierRowActions row={row} />;
    },
  },
];
