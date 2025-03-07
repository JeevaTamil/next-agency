"use client";

import { Customer } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Customer>[] = [
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
];
