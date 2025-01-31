import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import AddBankForm from "./components/add-bank-form";
import { prisma } from "@/prisma/client";

const NewBankPage = async () => {
  

  return (
    <Card className="max-w-md">
      <CardHeader>Add Bank</CardHeader>
      <CardContent>
        <AddBankForm />
      </CardContent>
    </Card>
  );
};

export default NewBankPage;
