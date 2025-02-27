"use client";

import { Bank } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Bank>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
];
