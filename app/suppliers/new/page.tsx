import React from "react";
import AddSupplierForm from "../components/add-supplier-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const NewSupplierPage = () => {
  return (
    <Card className="max-w-md">
      <CardHeader>Add Supplier</CardHeader>
      <CardContent><AddSupplierForm /></CardContent>
    </Card>
  );
};

export default NewSupplierPage;
