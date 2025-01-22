import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import AddBillEntryForm from "./components/add-bill-entry-form";
import { prisma } from "@/prisma/client";

const NewBillEntryPage = async () => {
  const customers = await prisma.customer.findMany();
  const suppliers = await prisma.supplier.findMany();
  const transports = await prisma.transport.findMany();
  console.log(customers);

  return (
    <Card className="max-w-5xl">
      <CardHeader>Add Bill Entry</CardHeader>
      <CardContent>
        <AddBillEntryForm
          customers={customers}
          suppliers={suppliers}
          transports={transports}
        />
      </CardContent>
    </Card>
  );
};

export default NewBillEntryPage;
