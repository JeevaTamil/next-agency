/* 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/prisma/client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Card } from "@radix-ui/themes";
import { Box } from "lucide-react";
import { notFound } from "next/navigation";

const BillEntriesTable = async ({ id }: { id: string }) => {
  const billEntry = await prisma.billEntry.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      customer: {
        select: {
          name: true,
        },
      },
      supplier: {
        select: {
          name: true,
        },
      },
    },
  });

  if (billEntry === null) {
    return notFound();
  }

  return (
    <ScrollArea className="w-full h-full pb-10">
      <Box>
        <h3>Overview</h3>
        <Card className="my-3">
          <Table className="flex-col">
            <TableHeader>
              <TableRow>
                <TableHead>Header</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Bill Number</TableCell>
                <TableCell>{billEntry?.billNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bill Date</TableCell>
                <TableCell>
                  {billEntry?.billDate
                    ? new Date(billEntry.billDate).toLocaleDateString("en-GB")
                    : "N/A"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>{billEntry?.customer.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Supplier</TableCell>
                <TableCell>{billEntry?.supplier.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Transport</TableCell>
                <TableCell>{billEntry?.transportId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>LR Date</TableCell>
                <TableCell>
                  {billEntry?.lrDate
                    ? new Date(billEntry.lrDate).toLocaleDateString("en-GB")
                    : "N/A"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Freight</TableCell>
                <TableCell>{billEntry?.freight}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Net Amount</TableCell>
                <TableCell>{billEntry?.netAmount}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax Type</TableCell>
                <TableCell>{billEntry?.taxType}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gross Amount</TableCell>
                <TableCell>{billEntry?.grossAmount}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </Box>
    </ScrollArea>
  );
};

export default BillEntriesTable;
*/

"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BillEntry {
  billNumber: string;
  billDate: Date;
  customer: { name: string };
  supplier: { name: string };
  transport: { name: string };
  lrDate: Date;
  freight: number;
  netAmount: number;
  taxType: string;
  grossAmount: number;
}

const BillEntryTablePage = ({ billEntry }: { billEntry: BillEntry }) => {
  return (
    <ScrollArea className="w-1/3 h-full">
      <h3 className="pb-4">Overview</h3>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Header</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Bill Number</TableCell>
              <TableCell>{billEntry.billNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bill Date</TableCell>
              <TableCell>
                {new Date(billEntry.billDate).toLocaleDateString("en-GB")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>{billEntry.customer.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Supplier</TableCell>
              <TableCell>{billEntry.supplier.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Transport</TableCell>
              <TableCell>{billEntry.transport.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>LR Date</TableCell>
              <TableCell>
                {new Date(billEntry.lrDate).toLocaleDateString("en-GB")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Freight</TableCell>
              <TableCell>{billEntry.freight}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Net Amount</TableCell>
              <TableCell>
                ₹ {`${parseFloat(billEntry.netAmount.toString()).toFixed(2)}`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax Type</TableCell>
              <TableCell>{billEntry.taxType}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gross Amount</TableCell>
              <TableCell>
                ₹ {`${parseFloat(billEntry.grossAmount.toString()).toFixed(2)}`}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </ScrollArea>
  );
};

export default BillEntryTablePage;
