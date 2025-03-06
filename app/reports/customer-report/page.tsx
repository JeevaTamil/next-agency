import { Box } from "@radix-ui/themes";
import GeneratePdfReport from "../components/generate-pdf-report";
import CustomerReportForm from "./components/customer-report-form";
import { prisma } from "@/prisma/client";
import { useState } from "react";
import CustomerReportWrapper from "./components/customer-report-wrapper";

const CustomerReport = async () => {
  const customers = await prisma.customer.findMany();
  console.log(customers);

  return (
    <Box>
      <CustomerReportWrapper customers={customers} />
    </Box>
  );
};

export default CustomerReport;
