import { prisma } from "@/prisma/client";
import { Box } from "@radix-ui/themes";
import { Suspense } from "react";
import BillEntryTablePage from "../components/bill-entries-table";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import PaymentsListPage from "./payments/components/payments-list-page";
import PaymentsPage from "./payments/page";
import DebitNotesPage from "./debit-notes/page";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Props {
  params: {
    id: string;
  };
}

const BillEntryDetailPage = async ({ params }: { params: { id: string } }) => {
  const billEntry = await prisma.billEntry.findUnique({
    where: {
      id: parseInt(params.id),
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
      transport: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!billEntry) {
    return notFound();
  }

  return (
    <Box>
      {/* <BillEntryTablePage billEntry={billEntry} /> */}

      <Box className="max-w-5xl">
        <h3 className="my-3">Bill Entry details</h3>
        <Card className="p-5 m-3 space-y-4">
          <Box className="grid grid-cols-4 gap-4">
            <Box className="col-start-1">
              <Label htmlFor="billNumber">Bill Number</Label>
              <Input
                disabled
                type="number"
                id="billNumber"
                value={billEntry.billNumber}
              />
            </Box>

            <Box className="col-start-2">
              <Label htmlFor="billDate">Bill Date</Label>
              <Input
                disabled
                type="text"
                id="billDate"
                value={new Date(billEntry.billDate).toLocaleDateString("en-GB")}
              />
            </Box>

            <Box>
              <Label htmlFor="customer">Customer</Label>
              <Input
                disabled
                type="text"
                id="customer"
                value={billEntry.customer.name}
              />
            </Box>

            <Box>
              <Label htmlFor="supplier">Supplier</Label>
              <Input
                disabled
                type="text"
                id="supplier"
                value={billEntry.supplier.name}
              />
            </Box>

            <Box className="col-start-1">
              <Label htmlFor="productQty">Product Quantity</Label>
              <Input
                disabled
                type="text"
                id="productQty"
                value={billEntry.productQty}
              />
            </Box>

            <Box>
              <Label htmlFor="lrNumber">LR Number</Label>
              <Input
                disabled
                type="text"
                id="lrNumber"
                value={billEntry.lrNumber}
              />
            </Box>

            <Box>
              <Label htmlFor="lrDate">LR Date</Label>
              <Input
                disabled
                type="text"
                id="lrDate"
                value={new Date(billEntry.lrDate).toLocaleDateString("en-GB")}
              />
            </Box>

            <Box>
              <Label htmlFor="transport">Transport</Label>
              <Input
                disabled
                type="text"
                id="transport"
                value={billEntry.transport.name}
              />
            </Box>

            <Box>
              <Label htmlFor="grossAmount">Gross Amount</Label>
              <Input
                disabled
                type="text"
                id="grossAmount"
                value={billEntry.grossAmount}
              />
            </Box>
          </Box>
        </Card>
      </Box>

      <Separator className="my-10" orientation="horizontal" />
      <Box className="my-5 ">
        <Box>
          <PaymentsPage params={{ id: params.id }} />
        </Box>

        <Separator className="my-10" orientation="horizontal" />

        <Box>
          <DebitNotesPage params={{ id: params.id }} />
        </Box>
      </Box>
    </Box>
  );
};

export default BillEntryDetailPage;
