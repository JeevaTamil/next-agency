"use client";

import { Supplier } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Supplier>[] = [
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
];
