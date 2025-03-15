import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import AddAgencyForm from "./components/add-agency-form";
import { prisma } from "@/prisma/client";

const NewAgencyPage = async () => {
  return (
    <Card className="max-w-md">
      <CardHeader>Add Agency</CardHeader>
      <CardContent>
        <AddAgencyForm />
      </CardContent>
    </Card>
  );
};

export default NewAgencyPage;
