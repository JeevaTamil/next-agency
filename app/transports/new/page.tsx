import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import AddTransportForm from "./components/add-transport-form";

const NewTransportPage = () => {
  return (
    <Card className="max-w-md">
      <CardHeader>Add Transport</CardHeader>
      <CardContent>
        <AddTransportForm />
      </CardContent>
    </Card>
  );
};

export default NewTransportPage;
