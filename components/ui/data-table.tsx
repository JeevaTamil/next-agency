"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Button } from "./button";

import { Box } from "@radix-ui/themes";
import { DateRange } from "react-day-picker";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DatePickerWithRange } from "./date-picker-with-range";

const DataTableFilter = dynamic(() => import("./data-table-filter"));
const DateRangeFilter = dynamic(() => import("./date-range-filter"));

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterColumn?: string[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterColumn,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const isBillEntryPage = filterColumn?.includes("billId");
  // const hideIdColumn = isBillEntryPage ? { id: false } : {};

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting,
      // columnVisibility: {
      //   id: false,
      // },
    },
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
  });

  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range);
    table
      .getColumn("billDate")
      ?.setFilterValue(
        range?.from || range?.to ? [range?.from, range?.to] : undefined
      );
  };

  return (
    <div>
      <Box className="flex justify-between items-center pt-5">
        <DataTableFilter filterColumn={filterColumn ?? []} table={table} />
        <DatePickerWithRange date={dateRange} onChange={handleDateChange} />
      </Box>
      <div className="rounded-md border mt-5">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      // onClick={header.column.getToggleSortingHandler()}
                    >
                      <DataTableColumnHeader
                        key={header.id}
                        column={header.column}
                        title={
                          typeof header.column.columnDef.header === "string"
                            ? header.column.columnDef.header
                            : ""
                        }
                      />
                      {/* {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.getIsSorted() === "asc" ? " 🔼" : ""}
                      {header.column.getIsSorted() === "desc" ? " 🔽" : ""} */}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
