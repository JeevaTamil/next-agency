"use client";
import { Supplier } from "@prisma/client";
import { Box } from "@radix-ui/themes";
import { useState } from "react";
import GeneratePdfReport from "../../components/generate-pdf-report";
import SupplierReportForm from "./supplier-report-form";

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
      <h1 className="text-2xl font-bold mb-5">Supplier Report</h1>
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
