"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { useRouter } from "next/navigation";

// import { labels } from "../data/data";
// import { taskSchema } from "../data/schema";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
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
        <DropdownMenuItem
          onClick={() => {
            const rowItemId = row.getValue("id");
            router.push(`/bill-entries/${rowItemId}/debit-notes`);
          }}
        >
          Debit Notes
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
