"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
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
import React from "react";
import { Button } from "./button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { BillEntry } from "@prisma/client";
import { Box } from "@radix-ui/themes";
import { format } from "date-fns";

const DataTableFilter = dynamic(() => import("./data-table-filter"));

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

  const generatePDF = () => {
    const doc = new jsPDF();
    // Set up header (example)
    doc.setFontSize(18);
    doc.text("My DataTable", 14, 20); // Title of the document

    // Add table header
    doc.setFontSize(12);
    const headers = columns
      .flatMap((column) => {
        console.log(`column headers : ${column.header}`);
        if (column != undefined) {
          return `${column.header}`;
        }
        return [];
      })
      .filter((header) => header !== undefined)
      .slice(0, -1);
    // const columnWidths = [60, 40, 80]; // Adjust based on your table columns

    autoTable(doc, {
      theme: "grid",
      head: [headers],
      headStyles: {
        halign: "center",
        valign: "middle",
      },
      body: table.getRowModel().rows.map((row) => {
        const entry = row.original as BillEntry;
        return [
          entry.id.toString(),
          format(new Date(entry.billDate), "dd-MM-yyyy"),
          entry.billNumber.toString(),
          entry.customer.name.toString(),
          entry.supplier.name.toString(),
          entry.netAmount.toString(),
          entry.taxType.toString(),
          entry.grossAmount.toString(),
          entry.unPaidDays.toString(),
        ];
      }),
      startY: 30,
      margin: { top: 30 },
    });

    doc.save("table.pdf");
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div>
      <Box className="flex justify-between items-center">
        <DataTableFilter filterColumn={filterColumn ?? []} table={table} />
        <Box>
          <Button variant="outline" onClick={generatePDF}>
            Generate Report
          </Button>
        </Box>
      </Box>
      <div className="rounded-md border mt-5">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
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
