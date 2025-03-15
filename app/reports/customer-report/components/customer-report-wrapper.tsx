"use client";
import { Customer } from "@prisma/client";
import { Box } from "@radix-ui/themes";
import { useState } from "react";
import GeneratePdfReport from "../../components/generate-pdf-report";
import CustomerReportForm from "./customer-report-form";

interface Params {
  customers: Customer[];
}

const CustomerReportWrapper = ({ customers }: Params) => {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data: any) => {
    setFormData(data); // Store the form data in the parent state
    console.log("Received from child:", data);
  };

  return (
    <div>
      <Box className="grid space-y-4">
        <CustomerReportForm
          customers={customers}
          handleFormSubmit={handleFormSubmit}
        />

        <GeneratePdfReport data={formData} type="Customer" />
      </Box>
    </div>
  );
};

export default CustomerReportWrapper;
