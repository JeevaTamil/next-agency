import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import AddBillEntryForm from "./components/add-bill-entry-form";

const NewBillEntryPage = () => {
  return (
    <Card className="max-w-md">
      <CardHeader>Add Bill Entry</CardHeader>
      <CardContent>
        <AddBillEntryForm />
      </CardContent>
    </Card>
  );
};

export default NewBillEntryPage;
