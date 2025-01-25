import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { prisma } from "@/prisma/client";
import { Box } from "@radix-ui/themes";
import { differenceInDays } from "date-fns";
import { notFound, useRouter } from "next/navigation";

import { transportSchema, paymentSchema } from "@/app/zod-schema";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type paymentFormData = z.infer<typeof paymentSchema>;
type transportFormData = z.infer<typeof transportSchema>;

const AddPaymentForm = async () => {
  const form = useForm<transportFormData>({
    resolver: zodResolver(transportSchema),
  });

  const billEntry = await prisma.billEntry.findUnique({
    where: {
      id: 1,
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

  if (!billEntry) {
    return notFound();
  }

  const today = new Date();
  const billDate = new Date(billEntry.billDate);
  const unPaidDays = differenceInDays(today, billDate);

  // Add the computed property to the billEntry object
  const billEntryWithUnPaidDays = {
    ...billEntry,
    unPaidDays,
  };

  // const onSubmit = form.handleSubmit(() => {
  //   console.log("form submitted");
  // });

  return (
    // <Form {...form}>
    // <form onSubmit={onSubmit}>
    <Box className="max-w-5xl">
      <h3>Bill Entry details</h3>
      <Card className="p-5 space-y-4">
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
              value={billEntry.billDate.toLocaleDateString()}
            />
          </Box>

          <Box className="col-start-3">
            <Label htmlFor="unPaidDays">Un Paid Days</Label>
            <Input
              disabled
              type="text"
              id="unPaidDays"
              value={billEntryWithUnPaidDays.unPaidDays}
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
    // </form>
    // </Form>
  );
};

export default AddPaymentForm;
