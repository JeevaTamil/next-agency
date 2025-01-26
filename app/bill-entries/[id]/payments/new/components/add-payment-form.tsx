"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Box } from "@radix-ui/themes";

import { paymentSchema } from "@/app/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BillEntryWithComputedProps } from "@/types/common-types";
import { Form } from "@/components/ui/form";

type paymentFormData = z.infer<typeof paymentSchema>;

const AddPaymentForm = ({
  billEntry,
}: {
  billEntry: BillEntryWithComputedProps;
}) => {
  const form = useForm<paymentFormData>({
    resolver: zodResolver(paymentSchema),
  });

  const onSubmit = form.handleSubmit(() => {
    console.log("form submitted");
  });

  return (
    <Card className="p-5">
      <Box className="max-w-5xl">
        <h3 className="my-3">Bill Entry details</h3>
        <Card className="p-5 m-3 space-y-4">
          <Box className="grid grid-cols-3 gap-4">
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
                value={billEntry.billDate.toDateString()}
              />
            </Box>

            <Box className="col-start-3">
              <Label htmlFor="unPaidDays">Un Paid Days</Label>
              <Input
                disabled
                type="text"
                id="unPaidDays"
                value={billEntry.unPaidDays}
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

            <Box>
              <Label htmlFor="grossAmount">Gross Amount</Label>
              <Input
                disabled
                type="text"
                id="grossAmount"
                value={billEntry.grossAmount}
              />
            </Box>

            <Box>
              <Label htmlFor="debitNoteReturnAmount">
                Debit Note Return Amount
              </Label>
              <Input
                disabled
                type="text"
                id="debitNoteReturnAmount"
                value={billEntry.grossAmount}
              />
            </Box>
          </Box>
        </Card>
      </Box>

      <Form {...form}>
        <form onSubmit={onSubmit}>
          <Box className="max-w-5xl">
            <h3 className="my-3">Add Payment</h3>
            <Card className="p-5 m-3 space-y-4">
              
            </Card>
          </Box>
        </form>
      </Form>
    </Card>
  );
};

export default AddPaymentForm;
