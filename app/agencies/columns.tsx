"use client";

import { Agency } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Agency>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
];
