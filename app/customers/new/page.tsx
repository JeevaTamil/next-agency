import React from "react";
import AddCustomerForm from "../components/add-customer-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const NewCustomerPage = () => {
  return (
    <Card className="max-w-5xl">
      <CardHeader>Add Customer</CardHeader>
      <CardContent>
        <AddCustomerForm />
      </CardContent>
    </Card>
  );
};

export default NewCustomerPage;
