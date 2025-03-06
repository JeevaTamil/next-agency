"use client";
import { Customer, Supplier } from "@prisma/client";
import React, { useState } from "react";
import SupplierReportForm from "./supplier-report-form";
import GeneratePdfReport from "../../components/generate-pdf-report";
import { Box } from "@radix-ui/themes";

interface Params {
  suppliers: Supplier[];
}

const SupplierReportWrapper = ({ suppliers }: Params) => {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data: any) => {
    setFormData(data); // Store the form data in the parent state
    console.log("Received from child:", data);
  };

  return (
    <div>
      <Box className="grid space-y-4">
        <SupplierReportForm
          suppliers={suppliers}
          handleFormSubmit={handleFormSubmit}
        />

        <GeneratePdfReport data={formData} type="Supplier" />
      </Box>
    </div>
  );
};

export default SupplierReportWrapper;
