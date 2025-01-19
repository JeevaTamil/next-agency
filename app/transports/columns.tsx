"use client";

import { Transport } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Transport>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
];
