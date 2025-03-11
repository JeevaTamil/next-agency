import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { prisma } from "@/prisma/client";
import { BillEntryWithComputedProps } from "@/types/common-types";
import { BillEntry } from "@prisma/client";
import { Box } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    billEntry: BillEntryWithComputedProps;
  };
}

const BillEntryDetailCard = async ({ params: { billEntry } }: Props) => {
  return (
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
{billEntry.paidAmount > 0 && (
              <Box>
                <Label htmlFor="debitNoteReturnAmount">
                  Debit Note Return Amount
                </Label>
                <Input
                  disabled
                  type="text"
                  id="debitNoteReturnAmount"
                  value={billEntry.debitNoteAmount}
                />
              </Box>
            )}
            {billEntry.paidAmount > 0 && (
              <Box>
                <Label htmlFor="paidAmount">Paid Amount</Label>
                <Input
                  disabled
                  type="text"
                  id="paidAmount"
                  value={billEntry.paidAmount}
                />
              </Box>
            )}

            <Box>
              <label htmlFor="balanceAmount">Balance Amount</label>
              <Input
                disabled
                type="text"
                id="balanceAmount"
                value={(
                  billEntry.grossAmount -
                  billEntry.paidAmount -
                  billEntry.debitNoteAmount
                ).toFixed(2)}
              />
            </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default BillEntryDetailCard;
